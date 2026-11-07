#!/usr/bin/env python3
"""Generate ARTI PWA icon assets without external dependencies.

Renders the brand mark — a Wine Red tile carrying a Light Sand "A" — as PNG
files using only the standard library (struct + zlib). Edges are antialiased by
rendering at 4x and box-downsampling.

Usage: python3 tools/generate_icons.py
"""

from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

WINE = (158, 52, 80)  # #9e3450 — brand primary
SAND = (250, 246, 237)  # #faf6ed — brand surface

SUPERSAMPLE = 4
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "icons"

# Glyph geometry in normalised 0..1 coordinates.
APEX = (0.5, 0.17)
LEFT_FOOT = (0.175, 0.83)
RIGHT_FOOT = (0.825, 0.83)
BAR_LEFT = (0.315, 0.615)
BAR_RIGHT = (0.685, 0.615)
STROKE_HALF = 0.045
BAR_HALF = 0.037


def _distance_to_segment(
    px: float, py: float, ax: float, ay: float, bx: float, by: float
) -> float:
    dx, dy = bx - ax, by - ay
    length_squared = dx * dx + dy * dy
    if length_squared == 0.0:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / length_squared))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def _rounded_rect_contains(x: float, y: float, size: float, radius: float) -> bool:
    if x < 0 or y < 0 or x > size or y > size:
        return False
    cx = min(max(x, radius), size - radius)
    cy = min(max(y, radius), size - radius)
    if x == cx and y == cy:
        return True
    return math.hypot(x - cx, y - cy) <= radius


def _glyph_alpha(x: float, y: float) -> float:
    """Return 1.0 inside the "A" glyph, 0.0 outside (normalised coords)."""
    if _distance_to_segment(x, y, *APEX, *LEFT_FOOT) <= STROKE_HALF:
        return 1.0
    if _distance_to_segment(x, y, *APEX, *RIGHT_FOOT) <= STROKE_HALF:
        return 1.0
    if _distance_to_segment(x, y, *BAR_LEFT, *BAR_RIGHT) <= BAR_HALF:
        return 1.0
    return 0.0


def render(size: int, *, maskable: bool) -> bytes:
    """Render one icon and return raw RGB bytes."""
    big = size * SUPERSAMPLE
    radius = big * 0.22 if not maskable else 0.0
    glyph_scale = 0.78 if maskable else 1.0
    centre = 0.5

    rows: list[bytearray] = []
    for by in range(big):
        row = bytearray()
        for bx in range(big):
            if not maskable and not _rounded_rect_contains(
                bx + 0.5, by + 0.5, big, radius
            ):
                row.extend((0, 0, 0))
                continue

            gx = (bx + 0.5) / big
            gy = (by + 0.5) / big
            gx = (gx - centre) / glyph_scale + centre
            gy = (gy - centre) / glyph_scale + centre

            colour = SAND if _glyph_alpha(gx, gy) > 0.0 else WINE
            row.extend(colour)
        rows.append(row)

    # Box-downsample by SUPERSAMPLE for antialiased edges.
    out = bytearray()
    for y in range(size):
        for x in range(size):
            r = g = b = 0
            for dy in range(SUPERSAMPLE):
                row = rows[y * SUPERSAMPLE + dy]
                base = (x * SUPERSAMPLE) * 3
                for dx in range(SUPERSAMPLE):
                    offset = base + dx * 3
                    r += row[offset]
                    g += row[offset + 1]
                    b += row[offset + 2]
            count = SUPERSAMPLE * SUPERSAMPLE
            out.extend((r // count, g // count, b // count))
    return bytes(out)


def write_png(path: Path, size: int, rgb: bytes) -> None:
    """Write an 8-bit truecolour PNG."""
    raw = bytearray()
    stride = size * 3
    for y in range(size):
        raw.append(0)  # filter type 0 (None)
        raw.extend(rgb[y * stride : (y + 1) * stride])

    def chunk(tag: bytes, data: bytes) -> bytes:
        body = tag + data
        return (
            struct.pack(">I", len(data))
            + body
            + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)
        )

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    path.write_bytes(png)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    targets = [
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("icon-maskable-512.png", 512, True),
        ("apple-touch-icon.png", 180, True),
    ]
    for name, size, maskable in targets:
        write_png(OUTPUT_DIR / name, size, render(size, maskable=maskable))
        print(f"wrote {name} ({size}x{size})")


if __name__ == "__main__":
    main()
