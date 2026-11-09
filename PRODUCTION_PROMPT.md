# PODesk Commercial Video — Remotion Production Master Prompt

> **Target Agent / Environment:** Claude Code Cloud & React Remotion Engine  
> **Master Audio:** `01-Voiceover/voiceover.mp3`  
> **Destination Format:** Instagram Reels / TikTok / YouTube Shorts (Vertical 9:16)  
> **Official Live App Store Listing:** https://apps.shopify.com/podesk-purchase-orders  

---

## 1. Technical Specifications

| Parameter | Value | Notes |
|---|---|---|
| **Orientation** | Vertical (9:16) | Native mobile short-form video |
| **Resolution** | 1080 × 1920 pixels | Full HD vertical canvas |
| **Frame Rate** | 30 FPS | Constant frame rate |
| **Duration** | 529 frames (~17.633s) | Exact match to `voiceover.mp3` |
| **Codec & Container** | H.264 / MP4 | High profile, AAC audio @ 320 kbps |
| **Tech Stack** | React, TypeScript, Remotion | Component-driven, frame-accurate animation |

---

## 2. Visual Palette & Aesthetic Guidelines

- **Primary SaaS Tone:** Dark modern navy (`#0B0F19`), deep slate (`#1E293B`), and crisp white (`#FFFFFF`).
- **Accent Brand Color:** Vibrant Shopify-adjacent teal / emerald (`#008060` / `#059669` / `#10B981`) matching the PODesk app icon checkmark.
- **Card Shadows & Depth:** Soft diffuse drop shadows (`0 20px 40px -15px rgba(0,0,0,0.3)`) to separate desktop UI cards from ambient background.
- **Typography:** Inter or system sans-serif (`font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Heavy weights (700/800) for captions with subtle contrast backing pills for mobile readability.
- **Motion Dynamics:** Physics-based springs (`damping: 15, mass: 0.8, stiffness: 100`) or cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) for buttery zooms and panning.

---

## 3. Scene-by-Scene Timeline & Execution Blueprint

### Scene 1: The Spreadsheet Problem (Hook)
* **Frames:** 0 – 96 (00:00.000 – 00:03.200) | **Duration:** 3.200s (96 frames)
* **Voiceover:** *"Still managing Shopify reorders in spreadsheets?"*
* **Audio Cue:** Conversational, inquisitive, relatable hook.
* **Visual Direction:**
  - Build a sleek, animated chaotic spreadsheet graphic using native Remotion vector/CSS elements (cells with messy formulas, out-of-stock highlights in red `#EF4444`, and overdue PO dates).
  - Subtle camera drift or shake suggesting operational headache.
  - Quick seamless motion whip/zoom transition into the clean PODesk interface at Frame 90.
* **On-Screen Captions:**
  - Frame 0–45: `Still managing Shopify reorders...`
  - Frame 45–96: `...in SPREADSHEETS?` (Highlighted with high contrast)

---

### Scene 2: Reorder Planning & Solution
* **Frames:** 97 – 315 (00:03.233 – 00:10.500) | **Duration:** 7.267s (218 frames)
* **Voiceover:** *"P.O. Desk helps you review reorder suggestions, and turn selected items into a draft purchase order, right inside Shopify!"*
* **Asset:** `03-Original-App-Screenshots/02-reorder-planning.png`
* **Visual Direction:**
  - Frame 97–180: Smooth camera zoom (scale: 2.1x) centering on the Reorder Planning table rows showing product variants, inventory quantities, and calculated reorder velocity.
  - Frame 180–240: Contextual focus ring pulses around the suggested reorder quantity and velocity metrics.
  - Frame 240–315: Simulated mouse cursor glides smoothly across the screen, hovers over the target row / selection checkbox, performs a realistic click animation (scale squish `0.9`), and pans toward the primary action button.
* **On-Screen Captions:**
  - Frame 97–190: `Automated Reorder Suggestions`
  - Frame 190–315: `Turn Selected Items into Draft POs`
* **Constraint:** Do not fabricate UI controls not present in `02-reorder-planning.png`.

---

### Scene 3: Supplier Workflow & Printing
* **Frames:** 316 – 449 (00:10.533 – 00:14.967) | **Duration:** 4.433s (133 frames)
* **Voiceover:** *"Review the supplier, print your P.O., and keep the whole workflow organized."*
* **Assets:**
  - Transition from `03-Original-App-Screenshots/03-supplier-mapping.png` (brief flash: 316–360)
  - Into `04-Workflow-Screenshots/01-purchase-order-details.png` (361–449)
* **Visual Direction:**
  - Camera zooms into the Purchase Order Details card (`PO-20260911-161007-DPFR`), showcasing supplier information, 100% receiving progress bar, and line item calculations.
  - Smooth pan up-right to highlight the actual `Print PO` button. A focus highlight illuminates the button as the voiceover says *"print your P.O."*.
* **Critical Privacy Mask:**
  - A subtle non-destructive blur or neutral pill overlay MUST cover the supplier email field (`reopro190@gmail.com`) located in the Supplier Sharing section.
* **On-Screen Captions:**
  - Frame 316–380: `Review Supplier Details`
  - Frame 381–449: `Print & Track Purchase Orders`
* **Constraint:** Do not fabricate an artificial standalone print preview document unless authentic assets are provided.

---

### Scene 4: Call to Action (End Card)
* **Frames:** 450 – 529 (00:15.000 – 00:17.633) | **Duration:** 2.633s (79 frames)
* **Voiceover:** *"Explore P.O. Desk on the Shopify App Store."*
* **Assets:**
  - `02-Brand-Assets/podesk-app-icon.png`
  - `02-Brand-Assets/shopify-mark.svg`
* **Visual Direction:**
  - Camera pulls back into an elegant, high-converting SaaS end card.
  - PODesk app icon springs in with a subtle glow, accompanied by a clean, typeset "PODesk" wordmark.
  - Shopify bag mark appears alongside bold text: `"Available on the Shopify App Store"`.
  - Subtle interactive URL pill or search bar animates at the bottom: `apps.shopify.com/podesk-purchase-orders`.
* **On-Screen Captions:**
  - Frame 450–529: `Explore PODesk on the Shopify App Store`

---

## 4. Critical Screenshot Handling Rules

1. **Unmodified Binaries:** The source images in `03-Original-App-Screenshots/` and `04-Workflow-Screenshots/` must never be altered, compressed, or overwritten.
2. **Crop Windows/Chrome:** Using Remotion CSS/framing (`overflow: hidden`, dynamic coordinate offsets), crop out browser title bars, URL search fields, Windows taskbars, and personal profile icons.
3. **Keep Interface Sharp:** When zooming into 1600×900 screenshots inside a 1080×1920 canvas, ensure interpolation uses high-quality filtering (`image-rendering: auto`, crisp scaling without pixelation).
4. **Legibility First:** Maintain clear contrast between on-screen caption text and underlying screenshot backgrounds at all times.
