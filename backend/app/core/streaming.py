"""Server-Sent Events helpers for streaming responses.

Later steps stream model output, generation progress and agent activity over
this transport. The helper here keeps the framing logic in one place so every
future streaming endpoint emits well-formed events.
"""

from __future__ import annotations

import asyncio
import json
from collections.abc import AsyncIterator
from typing import Any

HEARTBEAT_INTERVAL_SECONDS = 15.0
EVENT_SEPARATOR = "\n\n"


def encode_sse(event: str, data: dict[str, Any]) -> str:
    """Encode a single Server-Sent Event frame."""
    payload = json.dumps(data, separators=(",", ":"), default=str)
    return f"event: {event}\ndata: {payload}{EVENT_SEPARATOR}"


async def heartbeat_stream(
    *,
    channel: str,
    max_duration_seconds: float = 300.0,
) -> AsyncIterator[str]:
    """Yield connection and heartbeat frames until the duration elapses.

    This is the transport-level foundation only. It emits no domain data.
    """
    yield encode_sse(
        "open",
        {
            "channel": channel,
            "message": "Event stream established.",
            "heartbeatIntervalSeconds": HEARTBEAT_INTERVAL_SECONDS,
        },
    )

    elapsed = 0.0
    while elapsed < max_duration_seconds:
        await asyncio.sleep(HEARTBEAT_INTERVAL_SECONDS)
        elapsed += HEARTBEAT_INTERVAL_SECONDS
        yield encode_sse("heartbeat", {"elapsedSeconds": elapsed})

    yield encode_sse("close", {"reason": "max_duration_reached"})
