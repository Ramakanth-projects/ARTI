"""Health and readiness endpoints."""

from __future__ import annotations

from datetime import UTC, datetime

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.core.config import settings
from app.core.streaming import heartbeat_stream

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, object]:
    """Liveness probe.

    Reports configuration state as booleans only. No environment values are
    echoed, so the response is safe to expose.
    """
    return {
        "status": "ok",
        "application": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "timestamp": datetime.now(UTC).isoformat(),
        "integrations": {
            "supabase": "configured" if settings.supabase_url else "not_configured",
        },
    }


@router.get("/events")
async def events() -> StreamingResponse:
    """Server-Sent Events channel.

    Emits connection and heartbeat frames only. Domain streaming arrives with
    the features that need it.
    """
    return StreamingResponse(
        heartbeat_stream(channel="arti-api-events"),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
