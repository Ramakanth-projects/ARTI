"""FastAPI application factory.

Run locally with:

    uvicorn app.main:app --reload --port 8000

The factory pattern keeps configuration, middleware and router registration in
one place so tests can build an isolated instance.
"""

from __future__ import annotations

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings

logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)

API_PREFIX = "/api/v1"

SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}


def create_app() -> FastAPI:
    """Build and configure the ARTI API application."""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description=(
            "ARTI backend foundation. Step 01 provides the service architecture; "
            "AI capabilities are added in later steps."
        ),
        docs_url="/docs" if settings.debug else None,
        redoc_url=None,
        openapi_url="/openapi.json" if settings.debug else None,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def add_security_headers(request, call_next):
        response = await call_next(request)
        for header, value in SECURITY_HEADERS.items():
            response.headers.setdefault(header, value)
        return response

    app.include_router(api_router, prefix=API_PREFIX)

    @app.get("/", include_in_schema=False)
    async def root() -> dict[str, str]:
        return {
            "service": settings.app_name,
            "version": settings.app_version,
            "docs": f"{API_PREFIX}/health",
        }

    return app


app = create_app()
