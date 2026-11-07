"""ARTI backend service foundation.

This FastAPI application is the boundary where future AI capabilities will live:
model integrations, image and video generation, web search, agent orchestration
and streaming endpoints.

Step 01 intentionally implements no AI behaviour. What ships here is the
architecture: application factory, settings, CORS policy, health probe, a
placeholder API router, and a Server-Sent Events streaming primitive that the
Next.js layer can consume.
"""

from app.core.config import settings

__all__ = ["settings"]
