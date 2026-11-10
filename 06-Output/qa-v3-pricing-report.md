# PODesk Pricing End Card — QA Report

## Export

- Final: `final/podesk-final-v3-pricing.mp4`
- Review preview: `previews/podesk-pricing-review-v3.mp4`
- Final pricing frame: `contact-sheets/qa-v3-pricing/final-end-card.png` (1080 × 1920)
- Video: H.264, 1080 × 1920, 30 FPS, 953 frames, 31.7667 seconds
- Audio: AAC track; source voiceover remains 22.753 seconds, followed by the silent pricing hold

## Pricing content checked

- Headline: “START FREE. UPGRADE WHEN YOU GROW.”
- Supporting line: “Paid plans starting at just $9.99/month.”
- Free: $0/month; up to 250 SKUs; up to 10 purchase orders/month; 1 location
- Pro: $9.99/month; up to 1,500 SKUs; up to 100 purchase orders/month; up to 3 locations
- Growth: $19.99/month; unlimited SKUs, purchase orders, and locations
- Shopify App Store mark, CTA, and app URL remain visible on the end card
- The Free plan is the dominant tier. No beta, trial, expiry, or limited-time wording appears.

## Preservation and visual review

- The original 683-frame advertisement remains ahead of a new 270-frame (9-second) silent pricing end card.
- `voiceover-v2-live-chat.mp3` was not regenerated or changed. The source file and Remotion media copy have the same SHA-256: `02100CD58CC273E86A65256ECB283AA482E34C204E3080930668F09119144CD9`.
- The existing product scenes, cursor actions, screenshots, camera movements, and spoken CTA remain in the same positions. Sampled frames 0, 150, 300, 456, and 600 match the previous final render pixel-for-pixel; frame 682 differs by a mean of 0.05 pixel values after re-encoding.
- The 1080 × 1920 pricing frame was inspected for text fit, price hierarchy, visibility of all plan limits, transition overlap, and Shopify CTA placement. The initial long crossfade was shortened so the previous brand icon does not linger behind the pricing headline.
- The pricing scene and existing scenes contain no people, faces, bodies, hands, characters, avatars, or mascots.
- `npm run lint` passed (ESLint and TypeScript).
