"""Foundation tests for the ARTI backend.

These exercise real application code paths: the app factory, router
registration, and the health response. No mocks are used.
"""

from fastapi.testclient import TestClient

from app.main import API_PREFIX, create_app

client = TestClient(create_app())


def test_health_reports_ok() -> None:
    response = client.get(f"{API_PREFIX}/health")
    assert response.status_code == 200

    body = response.json()
    assert body["status"] == "ok"
    assert body["application"] == "ARTI API"
    assert body["integrations"]["supabase"] in {"configured", "not_configured"}


def test_health_never_leaks_secrets() -> None:
    """The health payload must contain configuration state only, never values."""
    body = client.get(f"{API_PREFIX}/health").json()
    serialized = str(body)
    assert "service_role" not in serialized
    assert "supabase_url" not in serialized
    assert "eyJ" not in serialized  # JWTs start with this prefix.


def test_security_headers_are_present() -> None:
    response = client.get(f"{API_PREFIX}/health")
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["Referrer-Policy"] == "strict-origin-when-cross-origin"


def test_unknown_route_returns_404() -> None:
    assert client.get("/does-not-exist").status_code == 404
