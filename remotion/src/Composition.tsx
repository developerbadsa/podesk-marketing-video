import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  CAPTION_BEATS,
  CURSOR_EVENTS,
  DURATION_IN_FRAMES,
  FOCUS_COORDINATES,
  FPS,
  PRIVACY_MASKS,
  SCENE_TIMELINE,
  SCREEN_COORDINATES,
  SHOT_TIMELINE,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
  type CameraKeyframe,
  type CaptionBeat,
  type Point,
  type Rect,
  type ShotTimelineEntry,
} from "./timeline";

const COLORS = {
  ink: "#07131e",
  deepNavy: "#0c1c29",
  navy: "#102733",
  teal: "#20c7a0",
  mint: "#9ce9d8",
  white: "#f7fbfc",
  muted: "#bfd0d7",
  grid: "#cbf3e70a",
};

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const EASE_CAMERA = Easing.bezier(0.22, 0.72, 0.24, 1);
const media = (file: string) => staticFile("media/" + file);

const SHOTS = Object.fromEntries(SHOT_TIMELINE.map((entry) => [entry.id, entry])) as Record<
  string,
  ShotTimelineEntry
>;

const SCREENSHOT_SIZES: Record<string, { width: number; height: number }> = {
  "01-dashboard.png": SCREEN_COORDINATES.dashboard,
  "02-reorder-planning.png": SCREEN_COORDINATES.purchaseOrderCreation,
  "03-supplier-mapping.png": SCREEN_COORDINATES.supplierManagement,
  "06-order details.png": SCREEN_COORDINATES.purchaseOrderDetails,
  "07 24 hours live support system response within some minutes.png": SCREEN_COORDINATES.liveChat,
};

const getShot = (id: string): ShotTimelineEntry => {
  const entry = SHOTS[id];
  if (!entry) {
    throw new Error("Missing timeline shot: " + id);
  }
  return entry;
};

const rectAt = (keyframes: readonly CameraKeyframe[], frame: number): Rect => {
  if (keyframes.length === 0) {
    throw new Error("A screenshot shot requires camera keyframes.");
  }
  if (keyframes.length === 1 || frame <= keyframes[0].frame) {
    return keyframes[0].rect;
  }

  for (let index = 0; index < keyframes.length - 1; index += 1) {
    const current = keyframes[index];
    const next = keyframes[index + 1];
    if (frame <= next.frame) {
      const options = { ...CLAMP, easing: EASE_CAMERA };
      return {
        x: interpolate(frame, [current.frame, next.frame], [current.rect.x, next.rect.x], options),
        y: interpolate(frame, [current.frame, next.frame], [current.rect.y, next.rect.y], options),
        width: interpolate(
          frame,
          [current.frame, next.frame],
          [current.rect.width, next.rect.width],
          options,
        ),
        height: interpolate(
          frame,
          [current.frame, next.frame],
          [current.rect.height, next.rect.height],
          options,
        ),
      };
    }
  }

  return keyframes[keyframes.length - 1].rect;
};

const shotOpacity = (frame: number, startFrame: number, endFrame: number, fadeFrames = 8) => {
  if (frame < startFrame || frame >= endFrame) {
    return 0;
  }

  const fadeIn =
    startFrame === 0
      ? 1
      : interpolate(frame, [startFrame, startFrame + fadeFrames], [0, 1], CLAMP);
  const fadeOut =
    fadeFrames === 0
      ? 1
      : interpolate(frame, [endFrame - fadeFrames, endFrame], [1, 0], CLAMP);

  return Math.min(fadeIn, fadeOut);
};

type FocusCue = {
  box: Rect;
  startFrame: number;
  endFrame: number;
};

const cueOpacity = (frame: number, cue: FocusCue) => {
  if (frame < cue.startFrame || frame >= cue.endFrame) {
    return 0;
  }

  const fadeIn = interpolate(
    frame,
    [cue.startFrame, cue.startFrame + 3],
    [0, 0.94],
    CLAMP,
  );
  const fadeOut = interpolate(
    frame,
    [cue.endFrame - 4, cue.endFrame],
    [0.94, 0],
    CLAMP,
  );
  return Math.min(fadeIn, fadeOut);
};

const mapRect = (rect: Rect, camera: Rect, scale: number) => ({
  left: (rect.x - camera.x) * scale,
  top: (rect.y - camera.y) * scale,
  width: rect.width * scale,
  height: rect.height * scale,
});

const mapPoint = (point: Point, camera: Rect, scale: number) => ({
  x: (point.x - camera.x) * scale,
  y: (point.y - camera.y) * scale,
});

const FocusRing: React.FC<{ position: ReturnType<typeof mapRect>; opacity: number }> = ({
  position,
  opacity,
}) => (
  <div
    style={{
      position: "absolute",
      left: position.left,
      top: position.top,
      width: position.width,
      height: position.height,
      border: "3px solid " + COLORS.teal,
      borderRadius: 10,
      backgroundColor: "#20c7a00a",
      boxShadow: "0 0 0 4px #20c7a01c, 0 0 26px #20c7a055",
      boxSizing: "border-box",
      opacity,
      pointerEvents: "none",
    }}
  />
);

type CursorPath = {
  points: readonly Point[];
  clickFrame?: number;
};

const Cursor: React.FC<{
  frame: number;
  path: CursorPath;
  camera: Rect;
  scale: number;
}> = ({ frame, path, camera, scale }) => {
  const points = path.points;
  if (points.length < 2) {
    return null;
  }

  const first = points[0];
  const last = points[points.length - 1];
  const visibleUntil = (path.clickFrame ?? last.frame) + 12;
  if (frame < first.frame - 4 || frame > visibleUntil) {
    return null;
  }

  const options = { ...CLAMP, easing: EASE_CAMERA };
  const sourceX = interpolate(
    frame,
    points.map((point) => point.frame),
    points.map((point) => point.x),
    options,
  );
  const sourceY = interpolate(
    frame,
    points.map((point) => point.frame),
    points.map((point) => point.y),
    options,
  );
  const mapped = mapPoint({ x: sourceX, y: sourceY, frame }, camera, scale);
  const fadeIn = interpolate(frame, [first.frame - 4, first.frame], [0, 1], CLAMP);
  const fadeOut = interpolate(frame, [visibleUntil - 4, visibleUntil], [1, 0], CLAMP);
  const clickFrame = path.clickFrame;
  const press =
    clickFrame === undefined
      ? 1
      : interpolate(frame, [clickFrame - 1, clickFrame, clickFrame + 2], [1, 0.82, 1], CLAMP);
  const ripple =
    clickFrame === undefined
      ? 0
      : interpolate(frame, [clickFrame, clickFrame + 12], [0.78, 0], CLAMP);

  return (
    <>
      {clickFrame !== undefined && frame >= clickFrame ? (
        <div
          style={{
            position: "absolute",
            left: mapped.x - 20,
            top: mapped.y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid " + COLORS.mint,
            opacity: ripple,
            transform: "scale(" + (1 + (1 - ripple) * 1.45) + ")",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: mapped.x - 3,
          top: mapped.y - 3,
          width: 36,
          height: 43,
          zIndex: 6,
          opacity: Math.min(fadeIn, fadeOut),
          transform: "scale(" + press + ")",
          transformOrigin: "3px 3px",
          pointerEvents: "none",
        }}
      >
        <svg
          width="34"
          height="42"
          viewBox="0 0 34 42"
          aria-hidden="true"
          style={{ filter: "drop-shadow(1px 3px 4px #001018cc)" }}
        >
          <path
            d="M3 2.5 30.5 23 18.1 24.3 24.8 37.3 18.7 40 12.4 27.2 5.3 36.5Z"
            fill="#ffffff"
            stroke="#07131e"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

const ScreenshotViewport: React.FC<{
  shot: ShotTimelineEntry;
  frame: number;
  fadeFrames?: number;
  focusCues?: readonly FocusCue[];
  masks?: readonly Rect[];
  cursors?: readonly CursorPath[];
}> = ({ shot, frame, fadeFrames = 8, focusCues = [], masks = [], cursors = [] }) => {
  if (!shot.screenshotAsset || !shot.cameraPosition) {
    return null;
  }

  const size = SCREENSHOT_SIZES[shot.screenshotAsset];
  if (!size) {
    throw new Error("Missing native screenshot dimensions for " + shot.screenshotAsset);
  }

  const camera = rectAt(shot.cameraPosition.keyframes, frame);
  const panel = shot.cameraPosition.panel;
  const scale = Math.min(panel.width / camera.width, panel.height / camera.height);
  const contentWidth = camera.width * scale;
  const contentHeight = camera.height * scale;
  const offsetX = (panel.width - contentWidth) / 2;
  const offsetY = (panel.height - contentHeight) / 2;
  const opacity = shotOpacity(frame, shot.startFrame, shot.endFrame, fadeFrames);

  return (
    <div
      style={{
        position: "absolute",
        left: panel.x,
        top: panel.y,
        width: panel.width,
        height: panel.height,
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #c8e8e333",
        background: "linear-gradient(145deg, #f5f8fa 0%, #e7edf0 100%)",
        boxShadow: "0 28px 80px #0008, 0 0 55px #20c7a012",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: contentWidth,
          height: contentHeight,
          overflow: "hidden",
          borderRadius: 10,
        }}
      >
        <Img
          src={media(shot.screenshotAsset)}
          alt=""
          style={{
            position: "absolute",
            left: -camera.x * scale,
            top: -camera.y * scale,
            width: size.width * scale,
            height: size.height * scale,
            display: "block",
            maxWidth: "none",
          }}
        />
        {masks.map((mask, index) => {
          const position = mapRect(mask, camera, scale);
          return (
            <div
              key={shot.id + "-mask-" + index}
              style={{
                position: "absolute",
                left: position.left,
                top: position.top,
                width: position.width,
                height: position.height,
                borderRadius: 4,
                backgroundColor: "#f5f7f7",
                boxShadow: "0 0 0 1px #dfe7e8",
                pointerEvents: "none",
              }}
            />
          );
        })}
        {focusCues.map((cue, index) => {
          const opacityValue = cueOpacity(frame, cue);
          if (opacityValue <= 0) {
            return null;
          }
          return (
            <FocusRing
              key={shot.id + "-focus-" + index}
              position={mapRect(cue.box, camera, scale)}
              opacity={opacityValue}
            />
          );
        })}
        {cursors.map((cursorPath, index) => (
          <Cursor
            key={shot.id + "-cursor-" + index}
            frame={frame}
            path={cursorPath}
            camera={camera}
            scale={scale}
          />
        ))}
      </div>
    </div>
  );
};

const focusCue = (box: Rect, startFrame: number, endFrame: number): FocusCue => ({
  box,
  startFrame,
  endFrame,
});

const Backdrop: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = interpolate(frame, [0, DURATION_IN_FRAMES], [-26, 34], CLAMP);
  const glow = interpolate(frame, [0, DURATION_IN_FRAMES], [0.16, 0.31], CLAMP);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 64% 38%, #123b3e 0%, transparent 42%), linear-gradient(155deg, " +
          COLORS.ink +
          " 0%, " +
          COLORS.deepNavy +
          " 55%, #091722 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -100,
          opacity: 0.2,
          backgroundImage:
            "linear-gradient(" +
            COLORS.grid +
            " 1px, transparent 1px), linear-gradient(90deg, " +
            COLORS.grid +
            " 1px, transparent 1px)",
          backgroundSize: "78px 78px",
          transform: "translateY(" + drift + "px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -360,
          top: 450,
          width: 820,
          height: 820,
          borderRadius: "50%",
          border: "1px solid #52d5bd1c",
          boxShadow: "0 0 0 82px #52d5bd08, 0 0 0 164px #52d5bd05",
          opacity: glow,
          transform: "scale(" + (1 + 0.015 * Math.sin(frame / 48)) + ")",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 63%, #06111a66 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const AnimatedSpreadsheet: React.FC<{ frame: number }> = ({ frame }) => {
  const frameIn = spring({ frame: Math.max(0, frame - 4), fps: FPS, config: { damping: 18, stiffness: 92 } });
  const highlightedColumn =
    frame < 68 ? 1 : frame < 101 ? 2 : 3;
  const columnStartFrames = [0, 34, 68, 101];
  const columnEndFrames = [34, 58, 92, 128];
  const xPadding = 26;
  const tableWidth = 898;
  const columnWidth = tableWidth / 4;
  const topOfGrid = 160;
  const columnHeight = 440;
  const rows = [
    ["Canvas Tote", "18 units", "Northwind Supply", "PO-2411 · draft"],
    ["Coffee Beans", "3 units", "Westline Goods", "PO-2412 · due"],
    ["Gift Card", "4 units", "Acme Wholesale", "PO-2413 · review"],
    ["Notebook Set", "27 units", "Bright Paper Co.", "—"],
    ["Travel Mug", "6 units", "Harbor Goods", "PO-2414 · due"],
    ["Desk Lamp", "31 units", "Clearline Supply", "—"],
  ];
  const tabs = ["Stock", "Suppliers", "Purchase Orders"];
  const activeTab = frame < 68 ? 0 : frame < 101 ? 1 : 2;

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 610,
        width: 940,
        height: 720,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid #b6d3d933",
        background: "linear-gradient(150deg, #f8fbfc 0%, #eaf1f4 100%)",
        boxShadow: "0 35px 100px #0009, 0 0 60px #20c7a018",
        opacity: interpolate(frame, [0, 6], [0, 1], CLAMP),
        transform:
          "translateY(" +
          interpolate(frameIn, [0, 1], [54, 0]) +
          "px) scale(" +
          interpolate(frameIn, [0, 1], [0.96, 1]) +
          ")",
      }}
    >
      <div
        style={{
          height: 58,
          padding: "0 25px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid #d9e4e8",
          background: "#f4f8f9",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ec706b" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#e8b54f" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#63b98c" }} />
        <span
          style={{
            marginLeft: 13,
            color: "#5e7480",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          WORKBOOK
        </span>
      </div>
      <div
        style={{
          height: 62,
          padding: "0 24px",
          display: "flex",
          alignItems: "stretch",
          gap: 8,
          borderBottom: "1px solid #dae4e8",
          background: "#edf3f5",
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <div
              key={tab}
              style={{
                position: "relative",
                minWidth: index === 2 ? 210 : 145,
                padding: "0 14px",
                display: "grid",
                placeItems: "center",
                color: isActive ? "#0d5145" : "#738892",
                fontSize: 17,
                fontWeight: isActive ? 700 : 600,
                borderBottom: isActive ? "3px solid " + COLORS.teal : "3px solid transparent",
                boxSizing: "border-box",
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", padding: "28px 20px 18px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 6,
            marginBottom: 8,
          }}
        >
          {["ITEM", "ON HAND", "SUPPLIER", "PURCHASE ORDER"].map((label) => (
            <div
              key={label}
              style={{
                height: 48,
                padding: "14px 11px",
                boxSizing: "border-box",
                overflow: "hidden",
                whiteSpace: "nowrap",
                color: "#4e6873",
                background: "#e5edf0",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        {rows.map((row, rowIndex) => {
          const rowSpring = spring({
            frame: Math.max(0, frame - 10 - rowIndex * 4),
            fps: FPS,
            config: { damping: 20, stiffness: 98, mass: 0.75 },
          });
          return (
            <div
              key={row[0]}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 6,
                marginBottom: 7,
                opacity: rowSpring,
                transform: "translateX(" + interpolate(rowSpring, [0, 1], [35, 0]) + "px)",
              }}
            >
              {row.map((value, cellIndex) => (
                <div
                  key={value + cellIndex}
                  style={{
                    height: 56,
                    padding: "17px 11px",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    color: cellIndex === 1 && rowIndex === 2 ? "#a34542" : "#4d6570",
                    background: cellIndex === 1 && rowIndex === 2 ? "#fff0ec" : "#ffffff",
                    border: "1px solid #dbe5e9",
                    borderRadius: 5,
                    fontSize: 15,
                    fontWeight: cellIndex === 1 && rowIndex === 2 ? 700 : 550,
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: xPadding + highlightedColumn * columnWidth,
            top: topOfGrid,
            width: columnWidth,
            height: columnHeight,
            borderRadius: 10,
            border: "3px solid " + COLORS.teal,
            background: "#20c7a008",
            boxShadow: "0 0 0 5px #20c7a012, 0 0 22px #20c7a055",
            boxSizing: "border-box",
            opacity: interpolate(
              frame,
              [columnStartFrames[highlightedColumn], columnStartFrames[highlightedColumn] + 4, columnEndFrames[highlightedColumn] - 4, columnEndFrames[highlightedColumn]],
              [0, 0.9, 0.9, 0],
              CLAMP,
            ),
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 19,
          width: 44,
          height: 4,
          borderRadius: 999,
          background: COLORS.teal,
          boxShadow: "0 0 18px #20c7a099",
          opacity: interpolate(frame, [34, 47, 92, 112], [0, 0.9, 0.85, 0], CLAMP),
          transform: "translateX(" + interpolate(frame, [34, 47], [45, 0], CLAMP) + "px)",
        }}
      />
    </div>
  );
};

const VoiceCaption: React.FC<{ frame: number }> = ({ frame }) => {
  const beat = CAPTION_BEATS.find(
    (item: CaptionBeat) => frame >= item.startFrame && frame < item.endFrame,
  );
  if (!beat) {
    return null;
  }

  const inOpacity =
    beat.startFrame === 0
      ? interpolate(frame, [0, 3], [0, 1], CLAMP)
      : interpolate(frame, [beat.startFrame, beat.startFrame + 3], [0, 1], CLAMP);
  const outOpacity = interpolate(
    frame,
    [beat.endFrame - 3, beat.endFrame],
    [1, 0],
    CLAMP,
  );
  const localFrame = frame - beat.startFrame;
  const entrance = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 21, stiffness: 180, mass: 0.7 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 52,
        right: 52,
        bottom: 230,
        display: "flex",
        justifyContent: "center",
        zIndex: 15,
        opacity: Math.min(inOpacity, outOpacity),
        transform: "translateY(" + interpolate(entrance, [0, 1], [12, 0]) + "px)",
      }}
    >
      <div
        style={{
          maxWidth: 970,
          padding: "18px 27px",
          borderRadius: 15,
          border: "1px solid #9ce9d844",
          background: "#081822e8",
          boxShadow: "0 18px 50px #0007",
          color: COLORS.white,
          fontSize: 40,
          lineHeight: 1.18,
          fontWeight: 680,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        {beat.caption}
      </div>
    </div>
  );
};

const SpreadsheetScene: React.FC<{ frame: number }> = ({ frame }) => {
  const endFrame = SCENE_TIMELINE[0].endFrame;
  const opacity = shotOpacity(frame, 0, endFrame, 0);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 330,
          width: 920,
          height: 2,
          background: "linear-gradient(90deg, transparent, #20c7a055, transparent)",
          opacity: 0.7,
        }}
      />
      <AnimatedSpreadsheet frame={frame} />
    </AbsoluteFill>
  );
};

const DashboardAndPurchaseOrderScene: React.FC<{ frame: number }> = ({ frame }) => {
  const dashboard = getShot("dashboard-establishing-to-inventory");
  const supplier = getShot("supplier-management");
  const purchaseOrder = getShot("purchase-order-creation");
  const dashboardFocus = [
    focusCue(FOCUS_COORDINATES.dashboardStockHealth, 168, 188),
    focusCue(FOCUS_COORDINATES.dashboardTotalUnits, 168, 188),
  ];
  const supplierFocus = [focusCue(FOCUS_COORDINATES.supplierNameField, 198, 212)];
  const purchaseOrderFocus = [
    focusCue(FOCUS_COORDINATES.purchaseOrderCreateButton, 230, 248),
  ];
  const createCursor: CursorPath = {
    points: CURSOR_EVENTS.createPurchaseOrder.points,
    clickFrame: CURSOR_EVENTS.createPurchaseOrder.clickFrame,
  };

  return (
    <AbsoluteFill>
      <ScreenshotViewport
        shot={dashboard}
        frame={frame}
        fadeFrames={3}
        focusCues={dashboardFocus}
        masks={PRIVACY_MASKS.dashboard}
      />
      <ScreenshotViewport shot={supplier} frame={frame} fadeFrames={3} focusCues={supplierFocus} />
      <ScreenshotViewport
        shot={purchaseOrder}
        frame={frame}
        fadeFrames={3}
        focusCues={purchaseOrderFocus}
        cursors={[createCursor]}
      />
    </AbsoluteFill>
  );
};

const SupplierWorkflowScene: React.FC<{ frame: number }> = ({ frame }) => {
  const receiving = getShot("receiving-progress");
  const supplierSelector = getShot("purchase-order-supplier-selector");
  const print = getShot("print-purchase-order");
  const workflow = getShot("organized-workflow-overview");
  const receivingFocus = [
    focusCue(FOCUS_COORDINATES.receivingProgressCard, 356, 382),
  ];
  const supplierSelectorFocus = [
    focusCue(FOCUS_COORDINATES.purchaseOrderSupplierSelector, 329, 345),
  ];
  const printFocus = [
    focusCue(FOCUS_COORDINATES.printPurchaseOrderButton, 394, 407),
  ];
  const printCursor: CursorPath = {
    points: CURSOR_EVENTS.printPurchaseOrder.points,
    clickFrame: CURSOR_EVENTS.printPurchaseOrder.clickFrame,
  };
  const supplierCursor: CursorPath = {
    points: CURSOR_EVENTS.purchaseOrderSupplier.points,
  };

  return (
    <AbsoluteFill>
      <ScreenshotViewport
        shot={supplierSelector}
        frame={frame}
        fadeFrames={3}
        focusCues={supplierSelectorFocus}
        cursors={[supplierCursor]}
      />
      <ScreenshotViewport
        shot={receiving}
        frame={frame}
        fadeFrames={3}
        focusCues={receivingFocus}
        masks={PRIVACY_MASKS.purchaseOrderDetails}
      />
      <ScreenshotViewport
        shot={print}
        frame={frame}
        fadeFrames={4}
        focusCues={printFocus}
        cursors={[printCursor]}
        masks={PRIVACY_MASKS.purchaseOrderDetails}
      />
      <ScreenshotViewport
        shot={workflow}
        frame={frame}
        fadeFrames={4}
        masks={PRIVACY_MASKS.purchaseOrderDetails}
      />
    </AbsoluteFill>
  );
};

const LiveChatScene: React.FC<{ frame: number }> = ({ frame }) => {
  const chat = getShot("live-chat-widget");
  const focusCues = [
    focusCue(FOCUS_COORDINATES.liveChatHeading, 489, 538),
    focusCue(FOCUS_COORDINATES.liveChatInput, 539, 592),
  ];
  const cursor: CursorPath = {
    points: CURSOR_EVENTS.liveChatInput.points,
    clickFrame: CURSOR_EVENTS.liveChatInput.clickFrame,
  };
  const supportHighlight = interpolate(frame, [539, 550, 586, 600], [0, 0.28, 0.28, 0], CLAMP);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 380,
          width: 760,
          height: 1040,
          borderRadius: 38,
          background: "#20c7a0",
          filter: "blur(90px)",
          opacity: supportHighlight * 0.12,
          transform: "scale(" + (1 + supportHighlight * 0.04) + ")",
        }}
      />
      <ScreenshotViewport
        shot={chat}
        frame={frame}
        fadeFrames={9}
        focusCues={focusCues}
        cursors={[cursor]}
      />
    </AbsoluteFill>
  );
};

const BrandCtaScene: React.FC<{ frame: number }> = ({ frame }) => {
  const scene = SCENE_TIMELINE[4];
  const localFrame = Math.max(0, frame - scene.startFrame);
  const iconIn = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 15, stiffness: 105, mass: 0.86 },
  });
  const nameIn = spring({
    frame: Math.max(0, localFrame - 6),
    fps: FPS,
    config: { damping: 19, stiffness: 95, mass: 0.8 },
  });
  const shopifyStart = 46;
  const shopifyIn = spring({
    frame: Math.max(0, localFrame - shopifyStart),
    fps: FPS,
    config: { damping: 18, stiffness: 100, mass: 0.8 },
  });
  const glow = interpolate(localFrame, [0, 18, 70], [0, 0.74, 0.25], CLAMP);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 260,
          top: 265,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "#20c7a0",
          filter: "blur(105px)",
          opacity: glow * 0.09,
          transform: "scale(" + (0.9 + glow * 0.1) + ")",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 440,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 236,
            height: 236,
            borderRadius: 55,
            overflow: "hidden",
            boxShadow:
              "0 0 0 1px #ffffff20, 0 28px 85px #0009, 0 0 70px #20c7a0" +
              Math.round(glow * 90).toString(16).padStart(2, "0"),
            opacity: iconIn,
            transform:
              "translateY(" +
              interpolate(iconIn, [0, 1], [32, 0]) +
              "px) scale(" +
              interpolate(iconIn, [0, 1], [0.78, 1]) +
              ")",
          }}
        >
          <Img
            src={media("podesk-app-icon.png")}
            alt="PODesk app icon"
            style={{ width: 236, height: 236, display: "block" }}
          />
        </div>
        <div
          style={{
            marginTop: 39,
            color: COLORS.white,
            fontSize: 98,
            lineHeight: 1,
            fontWeight: 760,
            letterSpacing: "-0.055em",
            opacity: nameIn,
            transform:
              "translateY(" + interpolate(nameIn, [0, 1], [19, 0]) + "px)",
          }}
        >
          PODesk
        </div>
        <div
          style={{
            marginTop: 35,
            minHeight: 84,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: shopifyIn,
            transform:
              "translateY(" + interpolate(shopifyIn, [0, 1], [16, 0]) + "px)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 17,
              display: "grid",
              placeItems: "center",
              background: "#ffffff",
              boxShadow: "0 14px 35px #0005",
            }}
          >
            <Img
              src={media("shopify-mark.svg")}
              alt="Shopify"
              style={{ width: 42, height: 47, display: "block" }}
            />
          </div>
          <div>
            <div
              style={{
                color: COLORS.muted,
                fontSize: 20,
                lineHeight: 1.1,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Find PODesk on
            </div>
            <div
              style={{
                marginTop: 6,
                color: COLORS.white,
                fontSize: 35,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              Shopify App Store
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 34,
            color: "#b8d2d4",
            fontSize: 20,
            fontWeight: 560,
            letterSpacing: "0.01em",
            opacity: shopifyIn,
          }}
        >
          apps.shopify.com/podesk-purchase-orders
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 295,
          right: 295,
          top: 1260,
          height: 1,
          background: "linear-gradient(90deg, transparent, #20c7a077, transparent)",
          transform: "scaleX(" + interpolate(shopifyIn, [0, 1], [0.3, 1]) + ")",
        }}
      />
    </AbsoluteFill>
  );
};

export const PODeskPromo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        color: COLORS.white,
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <Backdrop frame={frame} />
      <SpreadsheetScene frame={frame} />
      <DashboardAndPurchaseOrderScene frame={frame} />
      <SupplierWorkflowScene frame={frame} />
      <LiveChatScene frame={frame} />
      <BrandCtaScene frame={frame} />
      <VoiceCaption frame={frame} />
      <Audio src={media("voiceover-v2-live-chat.mp3")} volume={1} />
    </AbsoluteFill>
  );
};

export const videoConfig = {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  fps: FPS,
  durationInFrames: DURATION_IN_FRAMES,
};
