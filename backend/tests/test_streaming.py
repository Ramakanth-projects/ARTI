"""Tests for the Server-Sent Events framing helper."""

from app.core.streaming import encode_sse


def test_encode_sse_produces_valid_frame() -> None:
    frame = encode_sse("heartbeat", {"at": "2026-01-01T00:00:00Z"})
    assert frame.startswith("event: heartbeat\n")
    assert frame.endswith("\n\n")
    assert '"at":"2026-01-01T00:00:00Z"' in frame
