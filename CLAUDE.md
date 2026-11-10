# PODesk Marketing Video — Instructions for Claude Code Sessions

This repository contains the verified production assets and specifications for producing the official PODesk short-form promotional video using **React, TypeScript, and Remotion**.

Future Claude Code sessions must strictly follow these foundational rules:

---

## 1. Golden Rules of Visual Authenticity

1. **Single Source of Truth:** Treat the supplied original screenshots in `03-Original-App-Screenshots/` and `04-Workflow-Screenshots/` as the single visual source of truth for PODesk.
2. **Never AI-Generate or Recreate the App Interface:** Do not use image generation models (DALL-E, Midjourney, Imagen, etc.) or HTML/CSS canvas replicas to hallucinate or redraw the PODesk dashboard, buttons, tables, forms, or data. The real Shopify Polaris interface must be shown as-is.
3. **Preserve UI Text & Details:** Never alter original text, product names, SKUs, inventory counts, or calculation numbers.
4. **No Fake Data:** Never inject fabricated merchant outcome metrics (e.g. "Saved $10,000", "500+ stores", "Guaranteed 0% stockouts").
5. **Brand Integrity:** Use `02-Brand-Assets/podesk-app-icon.png` combined with clean, professionally typeset "PODesk" typography (Inter font). Never fabricate an unofficial vector wordmark SVG.

---

## 2. Audio & Timing Rules

1. **Approved Master Voiceover:** Use `01-Voiceover/voiceover.mp3` exclusively. It is the approved ElevenLabs master audio (duration: ~17.633 seconds, exactly 529 frames at 30 FPS).
2. **Never Re-record or Truncate Audio:** All animations, captions, and transitions must synchronize frame-by-frame to this audio.
3. **Frame-Accurate Milestones (30 FPS, 529 total frames):**
   - **Scene 1 (Hook):** Frames 0 – 96 (00:00.000 – 00:03.200) | *"Still managing Shopify reorders in spreadsheets?"*
   - **Scene 2 (Reorder Solution):** Frames 105 – 315 (00:03.500 – 00:10.500) | *"P.O. Desk helps you review reorder suggestions, and turn selected items into a draft purchase order, right inside Shopify!"*
   - **Scene 3 (Workflow):** Frames 324 – 438 (00:10.800 – 00:14.600) | *"Review the supplier, print your P.O., and keep the whole workflow organized."*
   - **Scene 4 (CTA):** Frames 450 – 529 (00:15.000 – 00:17.633) | *"Explore P.O. Desk on the Shopify App Store."*

---

## 3. Remotion Architecture & Tech Stack

When implementing the Remotion codebase in this repository:

1. **Framework:** React 18/19, TypeScript, Remotion (latest stable).
2. **Resolution & Canvas:** Vertical **9:16 (1080 × 1920)** at **30 FPS**.
3. **Component Modularity:** Build cleanly separated, reusable Remotion components:
   - `components/ScreenshotViewport.tsx` — Handles high-DPI scaling, smooth pan/zoom (Ken Burns interpolation via `interpolate` / `spring`), and browser chrome masking.
   - `components/CursorMotion.tsx` — Natural cubic-bezier cursor movements with click squish effects.
   - `components/FocusRing.tsx` — Contextual pulse/highlight overlays drawing the viewer's eye to key UI rows or buttons.
   - `components/Captions.tsx` — Word-level or phrase-level animated typography with high-contrast backing pills for mobile readability.
   - `components/SpreadsheetGraphic.tsx` — Native Remotion vector/CSS animation of a chaotic spreadsheet for Scene 1 (no external stock video).
   - `components/EndCard.tsx` — Clean closing card with PODesk icon, typeset wordmark, Shopify mark, and official App Store destination.
4. **Dependencies:** Keep dependencies minimal. Avoid heavy external 3D libraries or convoluted state management. Rely on Remotion core primitives (`Sequence`, `Composition`, `interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`).
5. **Asset Separation:** Source assets must remain in their original directories (`01-` to `05-`). All build artifacts and renders go into `06-Output/`.

---

## 4. Screenshot Framing & Privacy Enforcement

1. **Original Files Unmodified:** Never re-encode, compress, or edit original PNG files in `03-` or `04-`.
2. **Crop Browser Chrome:** The screenshots are 1600×900 landscape. In the 9:16 vertical composition, use zoom (e.g. 1.8x – 2.5x) and panning to focus on the active UI cards, naturally excluding Windows taskbars, browser URL bars, extensions, and personal bookmarks.
3. **Non-Destructive Privacy Masks:**
   - In `04-Workflow-Screenshots/01-purchase-order-details.png`, the supplier email field contains `reopro190@gmail.com`. Apply a subtle Remotion blur/solid fill overlay directly in the composition layer over this field.
   - Ensure development store identifiers (`test-store-fgyympec.myshopify.com`) are cropped or masked.

---

## 5. Pre-Render Validation Workflow

Before triggering a final render:
1. Verify asset file paths against `ASSET_MANIFEST.csv`.
2. Generate an asset contact sheet or preview stills for each scene transition.
3. Validate typography, caption sync, and audio levels (`voiceover.mp3` normalized with subtle background bed if used).
4. Verify that the call-to-action points to the official live listing: `https://apps.shopify.com/podesk-purchase-orders`.

