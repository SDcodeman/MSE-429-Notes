#!/usr/bin/env python3
"""
Stage 5b-v2: Refined image cropping — remove redundant text, keep only diagrams.

This script takes a crop manifest (JSON) and applies per-image crop boxes to isolate
diagram-only regions from slide images. Images classified as "remove" are deleted
and their references stripped from the corresponding HTML files.

Usage:
    python3 scripts/image_refine.py [--dry-run]

Manifest format (scripts/crop_manifest.json):
    [
      {"file": "ch2_p3.png", "action": "crop",
       "keep_region": {"top_pct": 0, "bottom_pct": 80, "left_pct": 25, "right_pct": 100},
       "reason": "3D coordinate frame on right, equation on left is redundant"},
      {"file": "ch2_p4.png", "action": "remove",
       "reason": "All text, no unique diagram"},
      {"file": "ch2_p5.png", "action": "keep",
       "reason": "Mostly diagram"}
    ]

What it does:
    - "crop": Crops image to keep_region percentages, saves over current file.
              Backs up the pre-crop version to images_refined_backup/ first.
    - "remove": Deletes the image file and removes the <div class="figure"> +
                <div class="figure-desc"> block from the HTML file.
    - "keep": No action taken.

Prerequisites:
    - Pillow: pip install Pillow
    - Backup of originals should already exist in images_originals/
"""

import json
import os
import re
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install Pillow")
    sys.exit(1)

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
IMAGES_DIR = PROJECT_ROOT / "html_output" / "assets" / "images"
BACKUP_DIR = PROJECT_ROOT / "html_output" / "assets" / "images_refined_backup"
HTML_DIR = PROJECT_ROOT / "html_output"
MANIFEST_PATH = PROJECT_ROOT / "scripts" / "crop_manifest.json"

# Map image prefix to HTML file
PREFIX_TO_HTML = {
    "ch2": "MSE429_Chapter_2.html",
    "ch3": "MSE492_Chapter_3.html",
    "ch4": "MSE492_Chapter_4.html",
    "ch5": "MSE492_Chapter_5.html",
}


def load_manifest():
    with open(MANIFEST_PATH) as f:
        return json.load(f)


def backup_image(filename):
    """Back up image before cropping."""
    BACKUP_DIR.mkdir(exist_ok=True)
    src = IMAGES_DIR / filename
    dst = BACKUP_DIR / filename
    if not dst.exists():
        shutil.copy2(src, dst)
        print(f"  Backed up: {filename}")


def crop_image(filename, keep_region):
    """Crop image to the specified percentage region."""
    img_path = IMAGES_DIR / filename
    img = Image.open(img_path)
    w, h = img.size

    left = int(w * keep_region["left_pct"] / 100)
    top = int(h * keep_region["top_pct"] / 100)
    right = int(w * keep_region["right_pct"] / 100)
    bottom = int(h * keep_region["bottom_pct"] / 100)

    cropped = img.crop((left, top, right, bottom))
    cropped.save(img_path, optimize=True)
    print(f"  Cropped: {filename} ({w}x{h} -> {cropped.size[0]}x{cropped.size[1]})")
    return cropped.size


def remove_image_from_html(filename):
    """Remove the figure div + figure-desc div for this image from HTML."""
    prefix = filename.split("_")[0]
    html_file = PREFIX_TO_HTML.get(prefix)
    if not html_file:
        print(f"  WARNING: No HTML mapping for prefix '{prefix}', skipping HTML edit")
        return False

    html_path = HTML_DIR / html_file
    html = html_path.read_text(encoding="utf-8")

    # Pattern: <div class="figure">\n      <img src="assets/images/FILENAME" ...>\n    </div>
    # Followed optionally by: \n    <div class="figure-desc">...</div>
    img_escaped = re.escape(filename)
    pattern = (
        r'\s*<div class="figure">\s*'
        r'<img\s+src="assets/images/' + img_escaped + r'"[^>]*>\s*'
        r'</div>'
        r'(\s*<div class="figure-desc">.*?</div>)?'
    )

    new_html, count = re.subn(pattern, "", html, flags=re.DOTALL)
    if count > 0:
        html_path.write_text(new_html, encoding="utf-8")
        print(f"  Removed from HTML: {filename} ({count} reference(s) in {html_file})")
        return True
    else:
        print(f"  WARNING: Could not find figure block for {filename} in {html_file}")
        return False


def delete_image(filename):
    """Delete the image file."""
    img_path = IMAGES_DIR / filename
    if img_path.exists():
        img_path.unlink()
        print(f"  Deleted: {filename}")


def main():
    dry_run = "--dry-run" in sys.argv

    if not MANIFEST_PATH.exists():
        print(f"ERROR: Manifest not found at {MANIFEST_PATH}")
        sys.exit(1)

    manifest = load_manifest()
    print(f"Loaded manifest: {len(manifest)} entries")

    stats = {"crop": 0, "remove": 0, "keep": 0, "error": 0}

    for entry in manifest:
        filename = entry["file"]
        action = entry["action"]
        reason = entry.get("reason", "")

        print(f"\n{filename}: {action} — {reason}")

        if action == "keep":
            stats["keep"] += 1
            continue

        if not (IMAGES_DIR / filename).exists():
            print(f"  ERROR: File not found, skipping")
            stats["error"] += 1
            continue

        if dry_run:
            if action == "crop":
                region = entry["keep_region"]
                print(f"  [DRY RUN] Would crop to: top={region['top_pct']}% bottom={region['bottom_pct']}% left={region['left_pct']}% right={region['right_pct']}%")
            elif action == "remove":
                print(f"  [DRY RUN] Would remove image and HTML reference")
            stats[action] += 1
            continue

        if action == "crop":
            backup_image(filename)
            crop_image(filename, entry["keep_region"])
            stats["crop"] += 1

        elif action == "remove":
            backup_image(filename)
            remove_image_from_html(filename)
            delete_image(filename)
            stats["remove"] += 1

    print(f"\n{'='*50}")
    print(f"Summary: {stats['crop']} cropped, {stats['remove']} removed, {stats['keep']} kept, {stats['error']} errors")
    if dry_run:
        print("(DRY RUN — no changes made)")


if __name__ == "__main__":
    main()
