#!/usr/bin/env python3
"""Responsive verification for the ARTI shell.

Loads the running application at representative device viewports and asserts
there is no horizontal overflow, no clipped navigation, and that key controls
are tappable and reachable. Uses the system Chromium build via Playwright.

Usage: python3 tools/verify_responsive.py [base_url]
"""

from __future__ import annotations

import json
import sys

from playwright.sync_api import sync_playwright

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"

# (label, width, height, device_scale_factor, is_mobile, has_touch)
VIEWPORTS = [
    ("Small phone (iPhone SE)", 320, 568, 2, True, True),
    ("Narrow phone (Galaxy S8)", 360, 740, 3, True, True),
    ("Large phone (iPhone 14 Pro Max)", 430, 932, 3, True, True),
    ("Phone landscape", 740, 360, 3, True, True),
    ("Tablet portrait (iPad Mini)", 768, 1024, 2, True, True),
    ("Tablet landscape (iPad Air)", 1024, 820, 2, True, True),
    ("Laptop (Windows 1366)", 1366, 768, 1, False, False),
    ("Desktop (1920)", 1920, 1080, 1, False, False),
    ("Wide desktop (2560)", 2560, 1440, 1, False, False),
]

ROUTES = ["/", "/chats", "/magic", "/projects"]

OVERFLOW_PROBE = """() => {
  const doc = document.documentElement;
  const body = document.body;
  return {
    docScrollWidth: doc.scrollWidth,
    docClientWidth: doc.clientWidth,
    bodyScrollWidth: body.scrollWidth,
    innerWidth: window.innerWidth,
  };
}"""

failures: list[str] = []
results: list[dict] = []


def main() -> int:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path="/usr/bin/chromium",
            args=["--no-sandbox", "--disable-dev-shm-usage"],
        )

        for label, width, height, dsf, is_mobile, has_touch in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                device_scale_factor=dsf,
                is_mobile=is_mobile,
                has_touch=has_touch,
            )
            page = context.new_page()
            console_errors: list[str] = []
            page.on(
                "console",
                lambda msg: console_errors.append(msg.text)
                if msg.type == "error"
                else None,
            )
            page.on("pageerror", lambda err: console_errors.append(str(err)))

            for route in ROUTES:
                page.goto(f"{BASE_URL}{route}", wait_until="networkidle")
                probe = page.evaluate(OVERFLOW_PROBE)
                overflow = probe["docScrollWidth"] - probe["innerWidth"]

                entry = {
                    "viewport": label,
                    "size": f"{width}x{height}",
                    "route": route,
                    "overflow_px": overflow,
                    "errors": len(console_errors),
                }
                results.append(entry)

                if overflow > 1:
                    failures.append(
                        f"{label} {route}: horizontal overflow of {overflow}px"
                    )

            # Interaction checks on the home page at this viewport.
            page.goto(f"{BASE_URL}/", wait_until="networkidle")

            main_box = page.locator("#main-content").bounding_box()
            if main_box and main_box["width"] < 200:
                failures.append(f"{label}: main content narrower than 200px")

            if width < 1024:
                trigger = page.get_by_role("button", name="Open navigation")
                if trigger.count() == 0:
                    failures.append(f"{label}: mobile nav trigger missing")
                else:
                    box = trigger.bounding_box()
                    if box and (box["width"] < 44 or box["height"] < 44):
                        failures.append(
                            f"{label}: nav trigger smaller than 44px ({box['width']}x{box['height']})"
                        )
                    trigger.click()
                    page.wait_for_timeout(350)
                    dialog = page.get_by_role("dialog", name="Navigation")
                    if not dialog.is_visible():
                        failures.append(f"{label}: mobile drawer did not open")
                    else:
                        drawer = dialog.bounding_box()
                        if drawer and drawer["x"] < -1:
                            failures.append(f"{label}: drawer positioned off-screen")
                        page.keyboard.press("Escape")
                        page.wait_for_timeout(250)
                        if dialog.is_visible():
                            failures.append(f"{label}: Escape did not close drawer")
            else:
                sidebar = page.get_by_role("complementary").first
                if sidebar.count() == 0:
                    failures.append(f"{label}: desktop sidebar missing")
                elif not sidebar.is_visible():
                    failures.append(f"{label}: desktop sidebar not visible")

            # Skip link must be reachable by keyboard.
            page.goto(f"{BASE_URL}/", wait_until="networkidle")
            page.keyboard.press("Tab")
            focused = page.evaluate("() => document.activeElement?.textContent ?? ''")
            if "Skip to main content" not in focused:
                failures.append(f"{label}: skip link not first in tab order")

            if console_errors:
                failures.append(
                    f"{label}: console errors -> {console_errors[:2]}"
                )

            context.close()

        browser.close()

    print(json.dumps(results, indent=2))

    print("\n" + "=" * 62)
    if failures:
        print(f"RESPONSIVE VERIFICATION: FAIL ({len(failures)} issue(s))")
        for item in failures:
            print(f"  - {item}")
        return 1

    print(
        f"RESPONSIVE VERIFICATION: PASS "
        f"({len(VIEWPORTS)} viewports x {len(ROUTES)} routes, no overflow, "
        f"no console errors)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
