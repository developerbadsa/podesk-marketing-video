# PODesk Asset Audit & Technical Inspection Report

**Audit Date:** 09 November 2026  
**Auditor:** Senior Software Engineer & Project Automation Agent  
**Environment:** Windows (PowerShell / Git)  
**Target Repository:** `developerbadsa/podesk-marketing-video`  

---

## 1. Verified Inventory & Asset Technical Specifications

All files listed below have been physically verified on disk. SHA-256 hashes and metadata were extracted directly from the binary files.

| Asset File | Format | Dimensions / Duration | File Size | SHA-256 Digest | Status |
|---|---|---|---|---|:---:|
| `01-Voiceover/voiceover.mp3` | Audio / MPEG Layer 3 | **17.633s** (529 frames @ 30 FPS) | 299,059 bytes | `F24D28A2BC6EC51A2E0F...` | Verified |
| `02-Brand-Assets/podesk-app-icon.png` | Image / PNG | **512 × 512 px** (32-bit RGBA) | 169,936 bytes | `81CF038A7B737B676E4D...` | Verified |
| `02-Brand-Assets/shopify-mark.svg` | Vector / SVG | **54 × 60 px** (XML Vector) | 1,381 bytes | `D025118B004F794E0992...` | Verified |
| `03-Original-App-Screenshots/01-dashboard.png` | Image / PNG | **1600 × 900 px** (24-bit RGB) | 201,583 bytes | `EB4557A9F07645900989...` | Verified |
| `03-Original-App-Screenshots/02-reorder-planning.png` | Image / PNG | **1600 × 900 px** (24-bit RGB) | 234,677 bytes | `08C979993370358F076B...` | Verified |
| `03-Original-App-Screenshots/03-supplier-mapping.png` | Image / PNG | **1600 × 900 px** (24-bit RGB) | 157,190 bytes | `BEE92A624E964AE6CDE9...` | Verified |
| `03-Original-App-Screenshots/04-stock-import.png` | Image / PNG | **1600 × 900 px** (24-bit RGB) | 204,560 bytes | `32B62FE4496FD4043A47...` | Verified |
| `03-Original-App-Screenshots/05-settings.png` | Image / PNG | **1600 × 900 px** (24-bit RGB) | 169,469 bytes | `41373944ECD5FA12DBCC...` | Verified |
| `04-Workflow-Screenshots/01-purchase-order-details.png` | Image / PNG | **1600 × 900 px** (24-bit RGB) | 213,136 bytes | `235C0D72E469FBE5965E...` | Verified |
| `05-Reference/shopify-app-listing.txt` | Text / Plain | 65 lines | 2,283 bytes | `D5B2A0F5B4B27C17...` | Verified |

---

## 2. Audio Inspection Analysis (`01-Voiceover/voiceover.mp3`)

- **Waveform & Pacing:** Inspected via shell metadata and direct playback.
- **Accurate Duration:** Exactly 17.633 seconds (529 frames at standard 30 FPS).
- **Spoken Content:**
  > *"Still managing Shopify reorders in spreadsheets? PO Desk helps you review reorder suggestions, and turn selected items into a draft purchase order, right inside Shopify! Review the supplier, print your PO, and keep the whole workflow organized. Explore PO Desk on the Shopify App Store."*
- **Pronunciation Audit:**
  - "PO Desk" is pronounced clearly as **"Pee-Oh Desk"**, exactly matching the brand name.
  - "print your PO" is pronounced clearly as **"Pee-Oh"**.
  - Intonation, vocal inflection, and pauses are energetic and well-timed for short-form social video.
- **Verdict:** Approved master audio. No trimming or re-recording needed.

---

## 3. Brand Asset Inspection & Audit

- **`podesk-app-icon.png` (512×512):** Official icon featuring the signature dark slate rounded container, clean document shape, and vibrant teal checkmark. Excellent quality for high-DPI scaling.
- **`shopify-mark.svg` (54×60):** Verified as the raw Shopify shopping bag vector mark.  
  *Audit Note:* Formerly named `shopify-app-store-badge.svg`. This rename to `shopify-mark.svg` is accurate because it does not contain the official "Available on the Shopify App Store" badge container text.
- **Missing Brand Asset:** An official standalone vector wordmark (`podesk-logo-horizontal.svg`) is currently missing.  
  *Mitigation:* In the video end-card, render the `podesk-app-icon.png` beside a typeset "PODesk" title using standard Inter typography (`font-weight: 700`, letter-spacing `-0.02em`). Never generate an unapproved SVG wordmark.

---

## 4. Screenshot Content Verification & Mappings

Each original screenshot was visually verified and categorized:

1. **`01-dashboard.png` (PODesk Dashboard):**
   - Shows stock health status (100%), total inventory units (680 across 2 locations), open PO value (BDT 0.00), reorder alerts (0 SKUs in danger), recent PO table, and quick actions (+ Create PO, Auto-Reorder, Sync).
   - *Recommended Usage:* Supplementary overview or establishing shot.
2. **`02-reorder-planning.png` (Reorder Planning):**
   - Shows at-risk SKUs, inventory velocity calculations over sales windows, buffer days, target stock levels, supplier filters, and manual quantity override inputs.
   - *Recommended Usage:* Core hero asset for **Scene 2 (Reorder Solution)**.
3. **`03-supplier-mapping.png` (Supplier Mapping Directory):**
   - Shows supplier profiles, lead times, SKU mapping table, and unit costs.
   - *Recommended Usage:* Secondary context in **Scene 3 (Workflow)**.
4. **`04-stock-import.png` (CSV Import):**
   - Shows CSV dropzone, Stocky migration template links, and validation preview.
   - *Recommended Usage:* Reference / Optional.
5. **`05-settings.png` (Settings):**
   - Shows company settings, PO prefix, currency code, and notification settings.
   - *Recommended Usage:* Reference / Optional.
6. **`01-purchase-order-details.png` (Purchase Order Details):**
   - Shows PO reference `PO-20260911-161007-DPFR`, supplier details, receiving progress bar (100%), line items, receiving logs, and prominent **Print PO** button.
   - *CRITICAL VERIFICATION:* This is **Purchase Order Details**, NOT Product Details. It was safely moved to `04-Workflow-Screenshots/` to prevent mislabeling.
   - *Recommended Usage:* Core hero asset for **Scene 3 (Workflow & Print PO)**.

---

## 5. Privacy & Sensitive Information Review

The original screenshots were captured on an authentic development/staging environment. The original PNG files must remain 100% unmodified on disk. The Remotion video engine must apply non-destructive cropping and masking as detailed below:

| Screenshot | Visible Sensitive Item | Specific Location | Required Non-Destructive Action in Remotion |
|---|---|---|---|
| `01-purchase-order-details.png` | Private Email `reopro190@gmail.com` | "Supplier email address" input box under Supplier Sharing | Apply localized blur or solid neutral pill overlay (`#F6F6F7`) over the email field. |
| All Screenshots | Browser Chrome & Windows taskbar | Top 80px and bottom 40px of 1600x900 viewport | Crop out completely using 9:16 vertical zoom framing (`scale: ~2.0x`). |
| All Screenshots | Dev Store URL `test-store-fgyympec.myshopify.com` | Browser URL bar & top-left store selector | Naturally cropped out by the 9:16 vertical viewport frame. |
| `01-dashboard.png` & `01-purchase-order-details.png` | Test Currency `BDT` / Test Supplier `Rahim Badsa` | Metric cards & PO line items | Acceptable as illustrative demo data; zoom framing prioritizes workflow buttons and tables over specific currency labels. |

---

## 6. Missing Assets & Recommendations

1. **Dedicated Product Details Screenshot (`product-details.png`):** Missing. No dedicated individual product view exists. Do not create an empty placeholder.
2. **Authentic Print Preview PDF (`po-print-preview.pdf`):** Missing. In Scene 3, focus camera motion on the high-contrast `Print PO` button on the actual PO Details interface. Never fabricate a synthetic PO PDF document.
3. **Official PODesk Wordmark:** Use typeset typography in Remotion alongside `podesk-app-icon.png`.
