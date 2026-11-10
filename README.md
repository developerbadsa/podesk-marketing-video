# PODesk Marketing Video Production Repository

This repository contains the production-ready brand assets, master audio, authentic screenshots, and technical blueprints for creating the official high-converting promotional video for **PODesk** (Shopify Purchase Order Management App).

- **GitHub Repository:** [https://github.com/developerbadsa/podesk-marketing-video.git](https://github.com/developerbadsa/podesk-marketing-video.git)
- **Live Shopify App Store Listing:** [https://apps.shopify.com/podesk-purchase-orders](https://apps.shopify.com/podesk-purchase-orders)
- **Default Branch:** `main`

---

## 1. Directory Structure

```text
podesk/
├── CLAUDE.md                   # Instructions & guardrails for Claude Code Cloud
├── README.md                   # Project overview and repository guide
├── PRODUCTION_PROMPT.md        # Remotion video blueprint & scene-by-scene script
├── ASSET_MANIFEST.csv          # Machine-readable inventory of all assets & privacy notes
├── ASSET_AUDIT.md              # Detailed technical audit of all media files
│
├── 01-Voiceover/               # Approved ElevenLabs master voiceover (voiceover.mp3)
├── 02-Brand-Assets/            # Official app icon (PNG) and Shopify mark (SVG)
├── 03-Original-App-Screenshots/# Authentic 1600x900 app screenshots from Shopify Admin
├── 04-Workflow-Screenshots/    # Purchase order details and receiving workflow captures
├── 05-Reference/               # Official Shopify App Store listing reference notes
└── 06-Output/                  # Designated destination for renders, previews & contact sheets
```

---

## 2. Asset Directory Guide & Naming Conventions

### `01-Voiceover/`
- `voiceover.mp3`: Master approved voiceover audio (17.633s, 529 frames @ 30 FPS). Generated via ElevenLabs with natural pacing, clear "P.O. Desk" pronunciation, and verified pauses.

### `02-Brand-Assets/`
- `podesk-app-icon.png`: Official high-resolution 512×512 PNG application icon.
- `shopify-mark.svg`: Official vector Shopify shopping bag mark (54×60). *Note: This is an icon mark, not a full text badge.*
- *Official Wordmark SVG:* Currently unavailable. Use typeset Inter/sans-serif typography alongside the icon.

### `03-Original-App-Screenshots/`
Authentic, unmodified 1600×900 PNG screenshots from the PODesk application:
- `01-dashboard.png`: Main dashboard with stock health, reorder alerts, and locations.
- `02-reorder-planning.png`: Reorder planning table with sales velocity math and suggested quantities.
- `03-supplier-mapping.png`: Supplier directory, SKU cost mapping, and vendor lead times.
- `04-stock-import.png`: CSV bulk import tool with validation preview table.
- `05-settings.png`: Store preferences, currency, PO prefix, and email configuration.

### `04-Workflow-Screenshots/`
- `01-purchase-order-details.png`: Purchase Order Details interface (PO reference `PO-20260911-161007-DPFR`) with line items, 100% receiving status, receipt audit logs, and `Print PO` action.  
  *Crucial: This is Purchase Order Details, NOT Product Details.*

### Missing / Optional Assets (Documented in Manifest)
- `product-details.png`: Missing. There is currently no confirmed dedicated product details screenshot.
- `po-print-preview.pdf`: Optional / Missing. Do not fabricate an unofficial PO document.

---

## 3. Privacy & Screenshot Handling Rules

1. **Unmodified Binaries:** Original screenshots must never be cropped, re-encoded, or altered on disk.
2. **Crop Windows & Chrome:** In the Remotion video composition (9:16 vertical), dynamically crop out Windows taskbars, browser URL bars, extensions, and personal bookmarks.
3. **Sensitive Data Masking:** In `04-Workflow-Screenshots/01-purchase-order-details.png`, the supplier email field contains `reopro190@gmail.com`. Apply a non-destructive blur or solid overlay in the Remotion composition.

---

## 4. Claude Code Cloud & Future Remotion Workflow

This repository is optimized for autonomous development with Claude Code Cloud:

1. **Bootstrap Remotion:**
   ```bash
   npx create-video --template blank
   npm install @remotion/cli @remotion/media-utils lucide-react
   ```
2. **Video Configuration:**
   - Width: `1080`
   - Height: `1920` (9:16)
   - FPS: `30`
   - DurationInFrames: `529`
3. **Execution Instructions:**
   Review `CLAUDE.md` and `PRODUCTION_PROMPT.md` for frame-accurate timing, camera pan/zoom coordinates, and caption synchronization.
4. **Export Location:**
   All rendered video files (`.mp4`) must be saved into `06-Output/final/`.

