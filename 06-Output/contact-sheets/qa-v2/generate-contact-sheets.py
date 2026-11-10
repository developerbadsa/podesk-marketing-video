from pathlib import Path
import cv2
from PIL import Image, ImageDraw, ImageFont

video = Path("../06-Output/previews/podesk-draft-v2.mp4")
out_dir = Path("../06-Output/contact-sheets/qa-v2")
frames_dir = out_dir / "frames"
frames_dir.mkdir(parents=True, exist_ok=True)
scenes = {
    "scene-1-spreadsheet": [
        (0, "Hook: Still jumping between"),
        (34, "a stock sheet"),
        (58, "stock phrase ends"),
        (68, "a supplier list"),
        (92, "supplier phrase ends"),
        (101, "purchase orders"),
        (128, "hook phrase ends"),
        (143, "scene exit"),
    ],
    "scene-2-dashboard-po": [
        (144, "dashboard entrance / inventory sentence"),
        (150, "dashboard establish"),
        (167, "inventory metrics focus"),
        (188, "metric focus exit"),
        (198, "supplier screenshot reveal / suppliers"),
        (205, "supplier field focus"),
        (223, "purchase order screenshot / and purchase orders"),
        (237, "Create PO cursor click"),
        (244, "together"),
        (257, "inside Shopify"),
        (263, "PO Shopify context"),
        (297, "inside Shopify phrase ends"),
        (315, "scene exit"),
    ],
    "scene-3-supplier-workflow": [
        (316, "scene entrance / Build purchase orders"),
        (327, "supplier selector focus"),
        (341, "supplier selector hold"),
        (356, "Track what arrives / receiving focus"),
        (377, "receiving phrase ends"),
        (387, "Print PO shot reveal"),
        (394, "Print PO focus"),
        (401, "Print PO cursor click"),
        (408, "workflow overview transition"),
        (415, "All in one organized workflow"),
        (455, "scene exit"),
    ],
    "scene-4-live-chat": [
        (456, "Live Chat scene entrance"),
        (465, "full widget reveal"),
        (490, "Need a hand / heading focus"),
        (501, "Need a hand ends"),
        (514, "PO Desk offers"),
        (539, "24-hour live chat support / input focus"),
        (563, "cursor moves to message input"),
        (581, "message input cursor click"),
        (590, "support phrase ends"),
        (606, "scene exit"),
    ],
    "scene-5-brand-cta": [
        (607, "Brand CTA / Find PO Desk"),
        (612, "PODesk reveal"),
        (653, "Shopify App Store phrase"),
        (671, "CTA phrase ends"),
        (682, "final frame"),
    ],
}
cap = cv2.VideoCapture(str(video))
if not cap.isOpened():
    raise RuntimeError("Unable to open rendered draft")
if int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) != 683:
    raise RuntimeError("Draft does not contain the expected 683 frames")

font_path = Path("C:/Windows/Fonts/segoeui.ttf")
font = ImageFont.truetype(str(font_path), 18) if font_path.exists() else ImageFont.load_default()
tile_width = 360
tile_height = 640
label_height = 38
for scene, picks in scenes.items():
    tiles = []
    for frame_number, label in picks:
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
        ok, bgr = cap.read()
        if not ok:
            raise RuntimeError(f"Cannot decode frame {frame_number}")
        frame_path = frames_dir / f"frame-{frame_number:03d}.png"
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
        source = Image.fromarray(rgb)
        source.save(frame_path)
        thumb = source.resize((tile_width, tile_height), Image.Resampling.LANCZOS)
        tile = Image.new("RGB", (tile_width, tile_height + label_height), "#07131e")
        tile.paste(thumb, (0, label_height))
        draw = ImageDraw.Draw(tile)
        draw.text((10, 9), f"{frame_number:03d}  {label}", fill="#dffbf4", font=font)
        tiles.append(tile)

    columns = 3
    rows = (len(tiles) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * tile_width, rows * (tile_height + label_height)), "#101f2a")
    for index, tile in enumerate(tiles):
        x = (index % columns) * tile_width
        y = (index // columns) * (tile_height + label_height)
        sheet.paste(tile, (x, y))
    sheet.save(out_dir / f"{scene}.jpg", quality=95)

cap.release()
print(f"Rendered {sum(len(items) for items in scenes.values())} contact frames and {len(scenes)} scene sheets.")
