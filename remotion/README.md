# PODesk Promo Remotion Project

A frame-accurate portrait product advertisement for PODesk.

## Video specification

- 1080 × 1920 (9:16)
- 30 FPS
- 953 frames (683-frame original ad plus a 270-frame silent pricing end card)
- Voiceover: 01-Voiceover/voiceover-v2-live-chat.mp3 (22.753 seconds)
- H.264 MP4 output

## Build and render

From this directory, run: npm ci, npm run lint, or npm run dev.

Preview render: npm run render:preview
Final render: npm run render:final

The preview script writes ../06-Output/previews/podesk-pricing-review-v3.mp4. The final script writes ../06-Output/final/podesk-final-v3-pricing.mp4. These scripts write versioned pricing outputs and leave the earlier v2 exports intact.

## Source layout

- src/Composition.tsx — scenes, native motion graphics, captions, camera crop mapping, cursor, highlights, masks, and audio.
- src/timeline.ts — transcript segments, caption beats, native screenshot dimensions, source-coordinate crops, focus targets, cursor events, scene timing, and shot records.
- public/media/ — unchanged copies of the selected latest screenshots, PODesk icon, Shopify bag mark, and v2 voiceover.

## Scene order

1. Spreadsheet Hook
2. Dashboard & Purchase Orders
3. Supplier Workflow
4. 24-Hour Live Chat
5. Brand CTA
6. Silent three-tier pricing end card, with the original Shopify App Store CTA

The pricing end card leads with the $0/month Free plan and its limits, then shows Pro at $9.99/month and Growth at $19.99/month. The Free plan is not presented as a trial or promotion. The voiceover and original five-scene section remain unchanged.

The spreadsheet at the opening is an illustrative problem-state graphic. 02-reorder-planning.png is the actual Purchase Order creation form; it is used for that workflow and is not presented as a reorder recommendation table. A dedicated reorder recommendation screenshot was not supplied.

All supplied screenshots remain unmodified. The video uses native-coordinate crop windows and non-destructive privacy overlays. No human figures, faces, bodies, hands, avatars, characters, or mascots are used.
