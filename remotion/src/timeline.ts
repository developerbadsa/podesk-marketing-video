export const FPS = 30;
export const DURATION_IN_FRAMES = 683;
export const PRICING_END_CARD_DURATION_IN_FRAMES = 270;
export const TOTAL_DURATION_IN_FRAMES = DURATION_IN_FRAMES + PRICING_END_CARD_DURATION_IN_FRAMES;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;

export const frameAt = (seconds: number) => Math.round(seconds * FPS);

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
  frame: number;
};

export type CameraKeyframe = {
  frame: number;
  rect: Rect;
};

export type CaptionBeat = {
  startFrame: number;
  endFrame: number;
  spokenPhrase: string;
  caption: string;
};

export type TranscriptSegment = {
  startSeconds: number;
  endSeconds: number;
  startFrame: number;
  endFrame: number;
  text: string;
};

export type ShotTimelineEntry = {
  id: string;
  sceneId: string;
  startFrame: number;
  endFrame: number;
  spokenPhrase: string;
  caption: string;
  screenshotAsset: string | null;
  targetElement: string;
  focusCoordinates: readonly Rect[];
  cursorPath: {
    points: readonly Point[];
    clickFrame?: number;
  } | null;
  cameraPosition: {
    keyframes: readonly CameraKeyframe[];
    panel: Rect;
  } | null;
};

export const TRANSCRIPT: TranscriptSegment[] = [
  {
    startSeconds: 0,
    endSeconds: 4.28,
    startFrame: 0,
    endFrame: frameAt(4.28),
    text: "Still jumping between a stock sheet, a supplier list, and your purchase orders?",
  },
  {
    startSeconds: 4.8,
    endSeconds: 9.9,
    startFrame: frameAt(4.8),
    endFrame: frameAt(9.9),
    text: "PO Desk brings inventory, suppliers, and purchase orders together inside Shopify.",
  },
  {
    startSeconds: 10.52,
    endSeconds: 15.52,
    startFrame: frameAt(10.52),
    endFrame: frameAt(15.52),
    text: "Build the purchase orders, track what arrives, print it, all in one organized workflow.",
  },
  {
    startSeconds: 16.32,
    endSeconds: 19.66,
    startFrame: frameAt(16.32),
    endFrame: frameAt(19.66),
    text: "Need a hand? PO Desk offers 24-hour live chat support.",
  },
  {
    startSeconds: 20.22,
    endSeconds: 22.38,
    startFrame: frameAt(20.22),
    endFrame: frameAt(22.38),
    text: "Find PO Desk on the Shopify App Store.",
  },
];

export const CAPTION_BEATS: CaptionBeat[] = [
  { startFrame: frameAt(0), endFrame: frameAt(1.12), spokenPhrase: "Still jumping between", caption: "Still jumping between" },
  { startFrame: frameAt(1.12), endFrame: frameAt(1.94), spokenPhrase: "a stock sheet", caption: "a stock sheet" },
  { startFrame: frameAt(2.28), endFrame: frameAt(3.02), spokenPhrase: "a supplier list", caption: "a supplier list" },
  { startFrame: frameAt(3.36), endFrame: frameAt(4.28), spokenPhrase: "and your purchase orders?", caption: "and your purchase orders?" },
  { startFrame: frameAt(4.8), endFrame: frameAt(6.16), spokenPhrase: "PO Desk brings inventory", caption: "PO Desk brings inventory" },
  { startFrame: frameAt(6.6), endFrame: frameAt(7.02), spokenPhrase: "suppliers", caption: "suppliers" },
  { startFrame: frameAt(7.44), endFrame: frameAt(8.12), spokenPhrase: "and purchase orders", caption: "and purchase orders" },
  { startFrame: frameAt(8.12), endFrame: frameAt(8.56), spokenPhrase: "together", caption: "together" },
  { startFrame: frameAt(8.56), endFrame: frameAt(9.9), spokenPhrase: "inside Shopify", caption: "inside Shopify" },
  { startFrame: frameAt(10.52), endFrame: frameAt(11.36), spokenPhrase: "Build the purchase orders", caption: "Build the purchase orders" },
  { startFrame: frameAt(11.86), endFrame: frameAt(12.56), spokenPhrase: "Track what arrives", caption: "Track what arrives" },
  { startFrame: frameAt(13.24), endFrame: frameAt(13.52), spokenPhrase: "print it", caption: "Print it" },
  { startFrame: frameAt(13.84), endFrame: frameAt(15.52), spokenPhrase: "all in one organized workflow", caption: "All in one organized workflow" },
  { startFrame: frameAt(16.32), endFrame: frameAt(16.7), spokenPhrase: "Need a hand", caption: "Need a hand?" },
  { startFrame: frameAt(17.12), endFrame: frameAt(17.96), spokenPhrase: "PO Desk offers", caption: "PO Desk offers" },
  { startFrame: frameAt(17.96), endFrame: frameAt(19.66), spokenPhrase: "24-hour live chat support", caption: "24-hour live chat support" },
  { startFrame: frameAt(20.22), endFrame: frameAt(22.38), spokenPhrase: "Find PO Desk on the Shopify App Store", caption: "Find PO Desk on the Shopify App Store" },
];

export const SCENE_TIMELINE = [
  { id: "spreadsheet-hook", name: "Spreadsheet Hook", startFrame: 0, endFrame: frameAt(4.8) },
  { id: "dashboard-purchase-orders", name: "Dashboard & Purchase Orders", startFrame: frameAt(4.8), endFrame: frameAt(10.52) },
  { id: "supplier-workflow", name: "Supplier Workflow", startFrame: frameAt(10.52), endFrame: frameAt(15.2) },
  { id: "live-chat", name: "24-Hour Live Chat", startFrame: frameAt(15.2), endFrame: frameAt(20.22) },
  { id: "brand-cta", name: "Brand CTA", startFrame: frameAt(20.22), endFrame: DURATION_IN_FRAMES },
  {
    id: "pricing-end-card",
    name: "Pricing End Card",
    startFrame: DURATION_IN_FRAMES,
    endFrame: TOTAL_DURATION_IN_FRAMES,
  },
];

export const SCREEN_COORDINATES = {
  dashboard: { width: 1914, height: 992 },
  purchaseOrderCreation: { width: 1913, height: 986 },
  supplierManagement: { width: 1915, height: 987 },
  purchaseOrderDetails: { width: 1913, height: 988 },
  liveChat: { width: 1917, height: 993 },
} as const;

export const SOURCE_REGIONS = {
  dashboardEstablishing: { x: 0, y: 100, width: 1914, height: 820 },
  dashboardInventoryCards: { x: 435, y: 218, width: 615, height: 122 },
  supplierContactForm: { x: 320, y: 180, width: 970, height: 440 },
  purchaseOrderCreateButton: { x: 295, y: 710, width: 230, height: 80 },
  purchaseOrderShopifyContext: { x: 0, y: 90, width: 1913, height: 830 },
  purchaseOrderSupplierFields: { x: 280, y: 145, width: 773, height: 125 },
  purchaseOrderReceivingSection: { x: 200, y: 250, width: 1040, height: 350 },
  purchaseOrderReceivingMetrics: { x: 300, y: 315, width: 900, height: 220 },
  purchaseOrderPrintAction: { x: 1500, y: 150, width: 340, height: 160 },
  purchaseOrderWorkflowOverview: { x: 210, y: 125, width: 1030, height: 470 },
  liveChatWidget: { x: 1530, y: 420, width: 375, height: 495 },
} as const;

export const FOCUS_COORDINATES = {
  dashboardStockHealth: { x: 455, y: 228, width: 286, height: 101 },
  dashboardTotalUnits: { x: 755, y: 228, width: 285, height: 101 },
  supplierNameField: { x: 327, y: 308, width: 473, height: 37 },
  purchaseOrderCreateButton: { x: 328, y: 725, width: 167, height: 36 },
  purchaseOrderSupplierSelector: { x: 328, y: 215, width: 715, height: 38 },
  receivingProgressCard: { x: 972, y: 402, width: 198, height: 119 },
  printPurchaseOrderButton: { x: 1578, y: 188, width: 112, height: 46 },
  liveChatHeading: { x: 1535, y: 437, width: 343, height: 56 },
  liveChatInput: { x: 1546, y: 815, width: 277, height: 56 },
} as const;

export const PRIVACY_MASKS = {
  dashboard: [
    { x: 526, y: 150, width: 270, height: 48 },
    { x: 1087, y: 430, width: 222, height: 47 },
    { x: 1087, y: 532, width: 222, height: 47 },
    { x: 1087, y: 635, width: 222, height: 47 },
  ],
  purchaseOrderDetails: [
    { x: 1252, y: 188, width: 120, height: 25 },
  ],
} as const;

export const CURSOR_EVENTS = {
  createPurchaseOrder: {
    points: [
      { x: 650, y: 600, frame: frameAt(7.6) },
      { x: 412, y: 743, frame: frameAt(7.87) },
    ],
    clickFrame: frameAt(7.9),
  },
  purchaseOrderSupplier: {
    points: [
      { x: 350, y: 270, frame: frameAt(10.87) },
      { x: 680, y: 234, frame: frameAt(11.1) },
    ],
  },
  printPurchaseOrder: {
    points: [
      { x: 1525, y: 290, frame: frameAt(13.0) },
      { x: 1634, y: 211, frame: frameAt(13.36) },
    ],
    clickFrame: frameAt(13.36),
  },
  liveChatInput: {
    points: [
      { x: 1538, y: 750, frame: frameAt(18.78) },
      { x: 1684, y: 843, frame: frameAt(19.35) },
    ],
    clickFrame: frameAt(19.35),
  },
} as const;

export const SHOT_TIMELINE: ShotTimelineEntry[] = [
  {
    id: "spreadsheet-hook",
    sceneId: "spreadsheet-hook",
    startFrame: 0,
    endFrame: frameAt(4.8),
    spokenPhrase: "Still jumping between a stock sheet, a supplier list, and your purchase orders?",
    caption: "Still jumping between a stock sheet, a supplier list, and your purchase orders?",
    screenshotAsset: null,
    targetElement: "Animated spreadsheet columns and rows",
    focusCoordinates: [],
    cursorPath: null,
    cameraPosition: null,
  },
  {
    id: "dashboard-establishing",
    sceneId: "dashboard-purchase-orders",
    startFrame: frameAt(4.8),
    endFrame: frameAt(5.5),
    spokenPhrase: "PO Desk brings",
    caption: "PO Desk brings",
    screenshotAsset: "01-dashboard.png",
    targetElement: "Full PODesk dashboard establishing view",
    focusCoordinates: [],
    cursorPath: null,
    cameraPosition: {
      keyframes: [{ frame: frameAt(4.8), rect: SOURCE_REGIONS.dashboardEstablishing }],
      panel: { x: 45, y: 620, width: 990, height: 520 },
    },
  },
  {
    id: "dashboard-inventory-cards",
    sceneId: "dashboard-purchase-orders",
    startFrame: frameAt(5.27),
    endFrame: frameAt(6.6),
    spokenPhrase: "inventory",
    caption: "PO Desk brings inventory",
    screenshotAsset: "01-dashboard.png",
    targetElement: "Stock Health and Total Units metric cards",
    focusCoordinates: [FOCUS_COORDINATES.dashboardStockHealth, FOCUS_COORDINATES.dashboardTotalUnits],
    cursorPath: null,
    cameraPosition: {
      keyframes: [{ frame: frameAt(5.27), rect: SOURCE_REGIONS.dashboardInventoryCards }],
      panel: { x: 55, y: 729, width: 840, height: 200 },
    },
  },
  {
    id: "supplier-management",
    sceneId: "dashboard-purchase-orders",
    startFrame: frameAt(6.5),
    endFrame: frameAt(7.6),
    spokenPhrase: "suppliers",
    caption: "suppliers",
    screenshotAsset: "03-supplier-mapping.png",
    targetElement: "Supplier name input in Supplier Details & Terms",
    focusCoordinates: [FOCUS_COORDINATES.supplierNameField],
    cursorPath: null,
    cameraPosition: {
      keyframes: [{ frame: frameAt(6.5), rect: SOURCE_REGIONS.supplierContactForm }],
      panel: { x: 55, y: 650, width: 970, height: 540 },
    },
  },
  {
    id: "purchase-order-creation",
    sceneId: "dashboard-purchase-orders",
    startFrame: frameAt(7.4),
    endFrame: frameAt(10.87),
    spokenPhrase: "and purchase orders; together inside Shopify; build the purchase orders",
    caption: "and purchase orders; together inside Shopify; Build the purchase orders",
    screenshotAsset: "02-reorder-planning.png",
    targetElement: "Create purchase order button, then supplier selector",
    focusCoordinates: [FOCUS_COORDINATES.purchaseOrderCreateButton, FOCUS_COORDINATES.purchaseOrderSupplierSelector],
    cursorPath: {
      points: CURSOR_EVENTS.createPurchaseOrder.points,
      clickFrame: CURSOR_EVENTS.createPurchaseOrder.clickFrame,
    },
    cameraPosition: {
      keyframes: [
        { frame: frameAt(7.4), rect: SOURCE_REGIONS.purchaseOrderShopifyContext },
        { frame: frameAt(7.65), rect: SOURCE_REGIONS.purchaseOrderCreateButton },
        { frame: frameAt(8.45), rect: SOURCE_REGIONS.purchaseOrderCreateButton },
        { frame: frameAt(8.75), rect: SOURCE_REGIONS.purchaseOrderShopifyContext },
        { frame: frameAt(10.5), rect: SOURCE_REGIONS.purchaseOrderShopifyContext },
      ],
      panel: { x: 65, y: 665, width: 950, height: 520 },
    },
  },
  {
    id: "purchase-order-supplier-selector",
    sceneId: "supplier-workflow",
    startFrame: frameAt(10.87),
    endFrame: frameAt(11.7),
    spokenPhrase: "Build the purchase orders",
    caption: "Build the purchase orders",
    screenshotAsset: "02-reorder-planning.png",
    targetElement: "Supplier selector on the Create Purchase Order form",
    focusCoordinates: [FOCUS_COORDINATES.purchaseOrderSupplierSelector],
    cursorPath: {
      points: CURSOR_EVENTS.purchaseOrderSupplier.points,
    },
    cameraPosition: {
      keyframes: [{ frame: frameAt(10.87), rect: SOURCE_REGIONS.purchaseOrderSupplierFields }],
      panel: { x: 70, y: 815, width: 940, height: 210 },
    },
  },
  {
    id: "receiving-progress",
    sceneId: "supplier-workflow",
    startFrame: frameAt(11.7),
    endFrame: frameAt(13.0),
    spokenPhrase: "Track what arrives",
    caption: "Track what arrives",
    screenshotAsset: "06-order details.png",
    targetElement: "Receiving Progress card with received quantity and percentage",
    focusCoordinates: [FOCUS_COORDINATES.receivingProgressCard],
    cursorPath: null,
    cameraPosition: {
      keyframes: [
        { frame: frameAt(11.7), rect: SOURCE_REGIONS.purchaseOrderReceivingSection },
        { frame: frameAt(11.86), rect: SOURCE_REGIONS.purchaseOrderReceivingMetrics },
      ],
      panel: { x: 70, y: 710, width: 940, height: 350 },
    },
  },
  {
    id: "print-purchase-order",
    sceneId: "supplier-workflow",
    startFrame: frameAt(12.9),
    endFrame: frameAt(13.85),
    spokenPhrase: "print it",
    caption: "Print it",
    screenshotAsset: "06-order details.png",
    targetElement: "Print PO button",
    focusCoordinates: [FOCUS_COORDINATES.printPurchaseOrderButton],
    cursorPath: {
      points: CURSOR_EVENTS.printPurchaseOrder.points,
      clickFrame: CURSOR_EVENTS.printPurchaseOrder.clickFrame,
    },
    cameraPosition: {
      keyframes: [{ frame: frameAt(12.9), rect: SOURCE_REGIONS.purchaseOrderPrintAction }],
      panel: { x: 90, y: 690, width: 900, height: 425 },
    },
  },
  {
    id: "organized-workflow-overview",
    sceneId: "supplier-workflow",
    startFrame: frameAt(13.6),
    endFrame: frameAt(15.2),
    spokenPhrase: "all in one organized workflow",
    caption: "All in one organized workflow",
    screenshotAsset: "06-order details.png",
    targetElement: "Purchase order line items, receiving status, and receipt history",
    focusCoordinates: [],
    cursorPath: null,
    cameraPosition: {
      keyframes: [{ frame: frameAt(13.6), rect: SOURCE_REGIONS.purchaseOrderWorkflowOverview }],
      panel: { x: 55, y: 665, width: 970, height: 445 },
    },
  },
  {
    id: "live-chat-widget",
    sceneId: "live-chat",
    startFrame: frameAt(15.2),
    endFrame: frameAt(20.22),
    spokenPhrase: "Need a hand? PO Desk offers 24-hour live chat support",
    caption: "Need a hand? 24-hour live chat support",
    screenshotAsset: "07 24 hours live support system response within some minutes.png",
    targetElement: "PODesk Support heading and message input",
    focusCoordinates: [FOCUS_COORDINATES.liveChatHeading, FOCUS_COORDINATES.liveChatInput],
    cursorPath: {
      points: CURSOR_EVENTS.liveChatInput.points,
      clickFrame: CURSOR_EVENTS.liveChatInput.clickFrame,
    },
    cameraPosition: {
      keyframes: [{ frame: frameAt(15.2), rect: SOURCE_REGIONS.liveChatWidget }],
      panel: { x: 145, y: 435, width: 790, height: 1015 },
    },
  },
  {
    id: "brand-cta",
    sceneId: "brand-cta",
    startFrame: frameAt(20.22),
    endFrame: DURATION_IN_FRAMES,
    spokenPhrase: "Find PO Desk on the Shopify App Store",
    caption: "Find PO Desk on the Shopify App Store",
    screenshotAsset: null,
    targetElement: "Original PODesk app icon and authentic Shopify mark",
    focusCoordinates: [],
    cursorPath: null,
    cameraPosition: null,
  },
];
