import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FPS = 30;
const DURATION = 683;
const C = {
  ink: "#07131E",
  navy: "#0C1C29",
  slate: "#132A38",
  teal: "#20C7A0",
  mint: "#8DE5D1",
  white: "#F7FBFC",
  muted: "#B8C8D0",
  red: "#F06A69",
};

const image = (name: string) => staticFile(`media/${name}`);

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const fadeFor = (frame: number, duration: number) =>
  interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], clamp);

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const ScreenTitle: React.FC<{
  kicker: string;
  title: string;
  detail?: string;
  frame: number;
  duration: number;
}> = ({ kicker, title, detail, frame, duration }) => {
  const entrance = spring({ frame, fps: FPS, config: { damping: 20, stiffness: 100, mass: 0.8 } });
  const opacity = fadeFor(frame, duration);

  return (
    <div
      style={{
        position: "absolute",
        left: 86,
        right: 86,
        top: 196,
        opacity,
        transform: `translateY(${interpolate(entrance, [0, 1], [35, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 24 }}>
        <div
          style={{
            width: 34,
            height: 3,
            background: C.teal,
            boxShadow: `0 0 18px ${C.teal}99`,
          }}
        />
        <span
          style={{
            font: "700 20px/1 Segoe UI, Arial, sans-serif",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.mint,
          }}
        >
          {kicker}
        </span>
      </div>
      <div
        style={{
          color: C.white,
          font: "750 68px/1.03 Segoe UI, Arial, sans-serif",
          letterSpacing: "-0.045em",
          maxWidth: 910,
          textWrap: "balance",
        }}
      >
        {title}
      </div>
      {detail ? (
        <div
          style={{
            marginTop: 20,
            color: C.muted,
            font: "450 27px/1.35 Segoe UI, Arial, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          {detail}
        </div>
      ) : null}
    </div>
  );
};

const CaptionPill: React.FC<{ frame: number; children: React.ReactNode; accent?: boolean }> = ({
  frame,
  children,
  accent,
}) => {
  const pop = spring({ frame, fps: FPS, config: { damping: 16, stiffness: 140 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 86,
        bottom: 155,
        padding: "16px 22px",
        borderRadius: 14,
        border: `1px solid ${accent ? "#20C7A077" : "#FFFFFF2A"}`,
        background: accent ? "#0C332E" : "#0A1822E8",
        color: accent ? C.mint : C.white,
        boxShadow: "0 16px 42px #0007",
        font: "700 25px/1.15 Segoe UI, Arial, sans-serif",
        letterSpacing: "-0.015em",
        opacity: interpolate(pop, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(pop, [0, 1], [16, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Backdrop: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = interpolate(frame, [0, DURATION], [-30, 55], clamp);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 76% ${22 + drift * 0.12}%, #123A3B 0%, transparent 40%), linear-gradient(152deg, ${C.ink} 0%, ${C.navy} 54%, #091722 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(#B5F4E60B 1px, transparent 1px), linear-gradient(90deg, #B5F4E60B 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          transform: `translateY(${drift}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -290,
          top: 500,
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid #52D5BD20",
          boxShadow: "0 0 0 72px #52D5BD08, 0 0 0 144px #52D5BD05",
          transform: `scale(${1 + 0.025 * Math.sin(frame / 45)})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, transparent 55%, #06111AEF 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const SceneMask: React.FC<{ frame: number; duration: number; children: React.ReactNode }> = ({
  frame,
  duration,
  children,
}) => (
  <AbsoluteFill style={{ opacity: fadeFor(frame, duration) }}>{children}</AbsoluteFill>
);

type FocusBox = { x: number; y: number; width: number; height: number; label?: string };
type PrivacyMask = { x: number; y: number; width: number; height: number };

const FocusRing: React.FC<{ frame: number; box: FocusBox; delay?: number }> = ({
  frame,
  box,
  delay = 0,
}) => {
  const local = Math.max(0, frame - delay);
  const reveal = spring({ frame: local, fps: FPS, config: { damping: 18, stiffness: 120 } });
  const pulse = 1 + 0.025 * Math.sin(local / 5);
  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.width,
        height: box.height,
        border: "3px solid #24D2AE",
        borderRadius: 12,
        boxShadow: "0 0 0 5px #24D2AE22, 0 0 30px #20C7A077",
        opacity: interpolate(reveal, [0, 1], [0, 0.95]),
        transform: `scale(${pulse})`,
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    >
      {box.label ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -43,
            whiteSpace: "nowrap",
            padding: "7px 11px",
            color: C.ink,
            background: C.mint,
            borderRadius: 8,
            font: "700 15px/1 Segoe UI, Arial, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {box.label}
        </div>
      ) : null}
    </div>
  );
};

const Cursor: React.FC<{ frame: number; points: { x: number; y: number; at: number }[]; clickAt?: number }> = ({
  frame,
  points,
  clickAt,
}) => {
  const start = points[0];
  const end = points[points.length - 1];
  const x = interpolate(frame, [start.at, end.at], [start.x, end.x], { ...clamp, easing: ease });
  const y = interpolate(frame, [start.at, end.at], [start.y, end.y], { ...clamp, easing: ease });
  const press = clickAt === undefined ? 1 : interpolate(frame, [clickAt - 2, clickAt, clickAt + 2], [1, 0.82, 1], clamp);
  const halo = clickAt === undefined ? 0 : interpolate(frame, [clickAt, clickAt + 12], [0.9, 0], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 42, height: 50, transform: `scale(${press})`, zIndex: 8 }}>
      {clickAt !== undefined ? (
        <div
          style={{
            position: "absolute",
            left: -12,
            top: -12,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2px solid #32E0B7",
            opacity: halo,
            transform: `scale(${1 + (1 - halo) * 1.4})`,
          }}
        />
      ) : null}
      <svg width="34" height="42" viewBox="0 0 34 42" style={{ filter: "drop-shadow(1px 3px 4px #001018AA)" }}>
        <path d="M3 2.5 30.5 23 18.1 24.3 24.8 37.3 18.7 40 12.4 27.2 5.3 36.5Z" fill="#FFFFFF" stroke="#07131E" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const ScreenshotViewport: React.FC<{
  file: string;
  frame: number;
  cameraX: number;
  cameraY: number;
  scale?: number;
  focus?: FocusBox[];
  redactions?: PrivacyMask[];
  cursor?: { points: { x: number; y: number; at: number }[]; clickAt?: number };
  maskDevStore?: boolean;
  viewportTop?: number;
  viewportHeight?: number;
}> = ({
  file,
  frame,
  cameraX,
  cameraY,
  scale = 1,
  focus = [],
  redactions = [],
  cursor,
  maskDevStore = false,
  viewportTop = 615,
  viewportHeight = 765,
}) => {
  const inFrame = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 90, mass: 0.9 } });
  const left = interpolate(inFrame, [0, 1], [cameraX + 90, cameraX]);
  const opacity = interpolate(inFrame, [0, 1], [0, 1]);
  const zoom = interpolate(inFrame, [0, 1], [scale * 0.97, scale]);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: viewportTop,
        width: 1080,
        height: viewportHeight,
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid #C2E7E12E",
        background: "#EAF0F2",
        boxShadow: "0 35px 90px #0008, 0 0 45px #18B99A1A",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          left,
          top: cameraY,
          width: 1600,
          height: 900,
          transform: `scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        <Img src={image(file)} style={{ width: 1600, height: 900, display: "block" }} />
        {focus.map((box, index) => <FocusRing key={`${box.x}-${index}`} frame={frame} box={box} delay={16 + index * 7} />)}
        {redactions.map((mask) => (
          <div
            key={`${mask.x}-${mask.y}`}
            style={{
              position: "absolute",
              left: mask.x,
              top: mask.y,
              width: mask.width,
              height: mask.height,
              background: "#F7F8F8",
              borderRadius: 4,
            }}
          />
        ))}
        {maskDevStore ? (
          <div
            style={{
              position: "absolute",
              left: 440,
              top: 133,
              width: 240,
              height: 25,
              background: "#FFFFFF",
              borderRadius: 4,
            }}
          />
        ) : null}
        {cursor ? (
          <Cursor frame={frame} points={cursor.points} clickAt={cursor.clickAt} />
        ) : null}
      </div>
    </div>
  );
};

const Spreadsheet: React.FC<{ frame: number }> = ({ frame }) => {
  const entrance = spring({ frame: Math.max(0, frame - 8), fps: FPS, config: { damping: 16, stiffness: 80 } });
  const rotation = interpolate(frame, [0, 120], [-2.5, 0.8], clamp);
  const rows = 8;
  const cols = 5;
  const labels = ["SKU", "STOCK", "REORDER", "SUPPLIER", "ETA"];
  return (
    <div
      style={{
        position: "absolute",
        left: 104,
        top: 724,
        width: 900,
        height: 585,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid #91B3B433",
        background: "linear-gradient(145deg,#F7FAFB,#DFE8EC)",
        boxShadow: "0 40px 110px #0008",
        transform: `perspective(1500px) rotate(${rotation}deg) translateY(${interpolate(entrance, [0, 1], [100, 0])}px) scale(${interpolate(entrance, [0, 1], [0.92, 1])})`,
        opacity: interpolate(entrance, [0, 1], [0, 1]),
      }}
    >
      <div style={{ height: 68, padding: "0 25px", display: "flex", alignItems: "center", gap: 12, background: "#EFF4F5", borderBottom: "1px solid #B9C9CF" }}>
        <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#ED6A6A" }} />
        <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#E8B44C" }} />
        <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#65B989" }} />
        <span style={{ marginLeft: 16, color: "#4B6470", font: "600 17px Segoe UI, Arial, sans-serif", letterSpacing: "0.03em" }}>REORDER WORKSHEET</span>
        <div style={{ marginLeft: "auto", width: 12, height: 12, borderRadius: "50%", background: C.red, boxShadow: `0 0 18px ${C.red}` }} />
      </div>
      <div style={{ padding: "25px 22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 9 }}>
          {labels.map((label) => <div key={label} style={{ height: 45, padding: "13px 10px", boxSizing: "border-box", background: "#E7EEF1", color: "#4D6874", font: "700 13px Segoe UI, Arial, sans-serif", letterSpacing: ".12em" }}>{label}</div>)}
        </div>
        {Array.from({ length: rows }).map((_, row) => {
          const rowIn = spring({ frame: Math.max(0, frame - 15 - row * 4), fps: FPS, config: { damping: 18, stiffness: 90 } });
          return (
            <div key={row} style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 6, opacity: rowIn, transform: `translateX(${interpolate(rowIn, [0, 1], [42, 0])}px)` }}>
              {Array.from({ length: cols }).map((__, col) => {
                const risk = row === 2 && col === 1;
                const flagged = row === 4 && col === 2;
                const fill = risk ? "#FFE4E1" : flagged ? "#FFF1D1" : row % 2 ? "#FFFFFF" : "#F7FAFB";
                return <div key={col} style={{ height: 43, padding: "12px 10px", boxSizing: "border-box", overflow: "hidden", whiteSpace: "nowrap", background: fill, color: risk ? "#B54445" : "#657D87", font: `${risk || flagged ? 700 : 500} 14px Segoe UI, Arial, sans-serif` }}>{col === 0 ? `SKU-${104 + row}` : col === 1 ? (risk ? "LOW" : `${18 - row * 2}`) : col === 2 ? (flagged ? "REVIEW" : `${row + 6} units`) : col === 3 ? "Vendor" : "—"}</div>;
              })}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 666, top: 180, width: 86, height: 5, background: C.red, borderRadius: 9, transform: `translateX(${interpolate(frame, [50, 90], [70, 0], clamp)}px)`, opacity: interpolate(frame, [40, 55, 78, 100], [0, 0.8, 0.8, 0], clamp), boxShadow: `0 0 18px ${C.red}` }} />
    </div>
  );
};

const SceneSpreadsheet: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 138;
  const textIn = spring({ frame: Math.max(0, frame - 6), fps: FPS, config: { damping: 18, stiffness: 110 } });
  const flash = interpolate(frame, [118, 137], [0, 1], clamp);
  return (
    <SceneMask frame={frame} duration={duration}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 57%,#153B46 0%,transparent 62%)" }} />
      <div style={{ position: "absolute", left: 86, top: 300, opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [20, 0])}px)` }}>
        <div style={{ color: C.mint, font: "700 19px Segoe UI, Arial, sans-serif", letterSpacing: ".2em" }}>THE REORDER SPREADSHEET</div>
        <div style={{ marginTop: 20, maxWidth: 930, color: C.white, font: "750 68px/1.02 Segoe UI, Arial, sans-serif", letterSpacing: "-.045em" }}>Stock sheet. Supplier list.<br />Where’s that PO?</div>
        <div style={{ marginTop: 23, color: C.muted, font: "450 26px Segoe UI, Arial, sans-serif" }}>A familiar search through one more tab.</div>
      </div>
      <Spreadsheet frame={frame} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg,#0C1C29 0%,transparent 65%),linear-gradient(0deg,#0C1C29 0%,transparent 42%)`, opacity: 0.37 }} />
      <div style={{ position: "absolute", inset: 0, background: C.teal, opacity: flash, mixBlendMode: "screen" }} />
    </SceneMask>
  );
};

const SceneDashboardOrders: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 204;
  const split = 78;
  const local = Math.max(0, frame - split);
  const dashboardOpacity = interpolate(frame, [split - 8, split + 8], [1, 0], clamp);
  const orderOpacity = 1 - dashboardOpacity;
  return (
    <SceneMask frame={frame} duration={duration}>
      <AbsoluteFill style={{ opacity: dashboardOpacity }}>
        <ScreenTitle
          frame={frame}
          duration={duration}
          kicker="PODesk · Shopify"
          title="See stock at a glance."
          detail="Inventory, locations, and buying activity—together."
        />
        <ScreenshotViewport
          file="01-dashboard.png"
          frame={frame}
          cameraX={-215}
          cameraY={-55}
          scale={1.04}
          viewportTop={615}
          viewportHeight={765}
          maskDevStore
          focus={[{ x: 460, y: 175, width: 800, height: 92, label: "Inventory overview" }]}
        />
        <CaptionPill frame={frame}>Inventory, locations, buying activity</CaptionPill>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: orderOpacity }}>
        <ScreenTitle
          frame={local}
          duration={duration}
          kicker="Create purchase orders"
          title="Build the order in Shopify."
          detail="A real PO creation screen, ready for the next step."
        />
        <ScreenshotViewport
          file="02-reorder-planning.png"
          frame={local}
          cameraX={-205}
          cameraY={-75}
          scale={1.08}
          viewportTop={615}
          viewportHeight={765}
          focus={[{ x: 263, y: 590, width: 155, height: 48, label: "Create purchase order" }]}
          cursor={{ points: [{ x: 680, y: 550, at: 36 }, { x: 395, y: 610, at: 58 }, { x: 330, y: 610, at: 67 }], clickAt: 69 }}
        />
        <CaptionPill frame={local} accent>Create purchase orders inside Shopify</CaptionPill>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 86, right: 86, top: 1500, height: 1, background: "linear-gradient(90deg,#20C7A000,#20C7A077,#20C7A000)" }} />
    </SceneMask>
  );
};

const SceneSupplierWorkflow: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 135;
  const local = Math.max(0, frame - 52);
  const supplierOpacity = interpolate(frame, [44, 60], [1, 0], clamp);
  const orderOpacity = 1 - supplierOpacity;
  return (
    <SceneMask frame={frame} duration={duration}>
      <AbsoluteFill style={{ opacity: supplierOpacity }}>
        <ScreenTitle
          frame={frame}
          duration={duration}
          kicker="Supplier management"
          title="Keep supplier details close."
          detail="A clear home for suppliers and their buying terms."
        />
        <ScreenshotViewport
          file="03-supplier-mapping.png"
          frame={frame}
          cameraX={-185}
          cameraY={-100}
          scale={1.06}
          viewportTop={615}
          viewportHeight={610}
          focus={[{ x: 280, y: 255, width: 1120, height: 170, label: "Supplier details & terms" }]}
        />
        <CaptionPill frame={frame}>Supplier records & buying terms</CaptionPill>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: orderOpacity }}>
        <ScreenTitle
          frame={local}
          duration={duration}
          kicker="Purchase order details"
          title="Follow receiving. Print the PO."
          detail="The real order view, with receiving progress and print actions."
        />
        <ScreenshotViewport
          file="06-order details.png"
          frame={local}
          cameraX={-440}
          cameraY={-132}
          scale={1.08}
          viewportTop={615}
          viewportHeight={765}
          focus={[
            { x: 780, y: 345, width: 220, height: 135, label: "Receiving progress" },
            { x: 1305, y: 150, width: 130, height: 55, label: "Print PO" },
          ]}
          redactions={[{ x: 1052, y: 166, width: 104, height: 23 }]}
          cursor={{ points: [{ x: 1060, y: 470, at: 18 }, { x: 1395, y: 178, at: 45 }, { x: 1380, y: 178, at: 60 }], clickAt: 62 }}
        />
        <CaptionPill frame={local}>Receiving status · Print PO</CaptionPill>
      </AbsoluteFill>
    </SceneMask>
  );
};

const SceneLiveChat: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 168;
  const glow = interpolate(frame, [20, 50, 160], [0, 0.8, 0.35], clamp);
  return (
    <SceneMask frame={frame} duration={duration}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 77% 50%,#147B6A${Math.round(glow * 40).toString(16).padStart(2, "0")} 0%,transparent 55%)` }} />
      <ScreenTitle
        frame={frame}
        duration={duration}
        kicker="Support, inside PODesk"
        title="Need a hand? We’re here."
        detail="24-hour live chat support, right in the workflow."
      />
      <ScreenshotViewport
        file="07 24 hours live support system response within some minutes.png"
        frame={frame}
        cameraX={-505}
        cameraY={-117}
        scale={1.14}
        viewportTop={600}
        viewportHeight={840}
        focus={[
          { x: 1280, y: 360, width: 285, height: 52, label: "PODesk Support" },
          { x: 1285, y: 685, width: 280, height: 65, label: "Message input" },
        ]}
        redactions={[{ x: 1052, y: 166, width: 104, height: 23 }]}
        cursor={{ points: [{ x: 1060, y: 520, at: 40 }, { x: 1390, y: 710, at: 95 }, { x: 1390, y: 710, at: 125 }], clickAt: 127 }}
      />
      <div style={{ position: "absolute", left: 86, bottom: 150, padding: "15px 22px", color: C.mint, background: "#0C332E", border: "1px solid #20C7A077", borderRadius: 14, font: "750 25px/1.1 Segoe UI, Arial, sans-serif", letterSpacing: "-.01em", opacity: interpolate(frame, [18, 32, 156, 168], [0, 1, 1, 0], clamp) }}>24-HOUR LIVE CHAT SUPPORT</div>
    </SceneMask>
  );
};

const SceneBrandCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 92;
  const { fps } = useVideoConfig();
  const iconSpring = spring({ frame: Math.max(0, frame - 7), fps, config: { damping: 13, stiffness: 105, mass: 0.9 } });
  const textSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 18, stiffness: 90 } });
  const glow = interpolate(frame, [10, 28, 92], [0, 0.75, 0.25], clamp);
  return (
    <SceneMask frame={frame} duration={duration}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 42%,#118F79${Math.round(glow * 55).toString(16).padStart(2, "0")} 0%, transparent 38%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 430, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 224, height: 224, borderRadius: 58, overflow: "hidden", boxShadow: `0 0 0 1px #FFFFFF20, 0 28px 80px #0008, 0 0 68px #20C7A0${Math.round(glow * 70).toString(16).padStart(2, "0")}`, transform: `scale(${interpolate(iconSpring, [0, 1], [0.6, 1])}) rotate(${interpolate(iconSpring, [0, 1], [-8, 0])}deg)`, opacity: iconSpring }}>
          <Img src={image("podesk-app-icon.png")} style={{ width: 224, height: 224 }} />
        </div>
        <div style={{ marginTop: 35, color: C.white, font: "760 88px/1 Segoe UI, Arial, sans-serif", letterSpacing: "-.055em", opacity: textSpring, transform: `translateY(${interpolate(textSpring, [0, 1], [20, 0])}px)` }}>PODesk</div>
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 16, opacity: textSpring }}>
          <div style={{ width: 70, height: 70, borderRadius: 16, background: "#FFFFFF", display: "grid", placeItems: "center", overflow: "hidden" }}>
            <Img src={image("shopify-mark.svg")} style={{ width: 42, height: 47 }} />
          </div>
          <div style={{ color: C.white, font: "650 28px/1.2 Segoe UI, Arial, sans-serif" }}>Explore on the<br /><span style={{ color: C.mint }}>Shopify App Store</span></div>
        </div>
        <div style={{ marginTop: 34, padding: "15px 21px", borderRadius: 12, border: "1px solid #8DE5D155", background: "#0C242F", color: "#D8EBEC", font: "600 20px/1 Segoe UI, Arial, sans-serif", letterSpacing: ".01em", opacity: interpolate(textSpring, [0, 1], [0, 1]) }}>apps.shopify.com/podesk-purchase-orders</div>
      </div>
      <div style={{ position: "absolute", left: 330, right: 330, bottom: 220, height: 1, background: "linear-gradient(90deg,transparent,#20C7A088,transparent)", transform: `scaleX(${interpolate(textSpring, [0, 1], [0.2, 1])})` }} />
    </SceneMask>
  );
};

export const PODeskPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const transitions = [
    { from: 0, duration: 138, component: <SceneSpreadsheet /> },
    { from: 126, duration: 204, component: <SceneDashboardOrders /> },
    { from: 318, duration: 135, component: <SceneSupplierWorkflow /> },
    { from: 441, duration: 168, component: <SceneLiveChat /> },
    { from: 597, duration: 86, component: <SceneBrandCTA /> },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, fontFamily: "Segoe UI, Arial, sans-serif", overflow: "hidden" }}>
      <Backdrop frame={frame} />
      {transitions.map(({ from, duration, component }) => (
        <Sequence key={from} from={from} durationInFrames={duration} premountFor={Math.min(30, from)}>
          {component}
        </Sequence>
      ))}
      <Audio src={image("voiceover-v2-live-chat.mp3")} />
    </AbsoluteFill>
  );
};

export const videoConfig = { width: 1080, height: 1920, fps: FPS, durationInFrames: DURATION };
