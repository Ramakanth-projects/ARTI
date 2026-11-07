"""API router composition.

Versioned routers are mounted under ``/api/v1``. Later steps add routers here
(chats, images, videos, search, projects, agents) without touching the
application factory.
"""

from fastapi import APIRouter

from app.api import health

api_router = APIRouter()
api_router.include_router(health.router)
