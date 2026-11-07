"""Application settings loaded from the environment.

Values are read once at import time and validated with Pydantic. Secrets are
never given defaults, so a misconfigured deployment fails loudly rather than
silently running with a placeholder credential.
"""

from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "ARTI API"
    app_version: str = "0.1.0"
    environment: str = Field(default="development")
    debug: bool = Field(default=False)

    # Host and port used when running the service directly.
    host: str = "0.0.0.0"
    port: int = 8000

    # Comma-separated list of origins allowed to call this API. The Next.js
    # frontend origin must be listed explicitly; a wildcard is rejected.
    cors_origins: str = "http://localhost:3000"

    # Optional. Populated in a later step when AI providers are integrated.
    supabase_url: str | None = None
    supabase_service_role_key: str | None = None

    @field_validator("cors_origins")
    @classmethod
    def reject_wildcard_origin(cls, value: str) -> str:
        origins = [origin.strip() for origin in value.split(",") if origin.strip()]
        if "*" in origins:
            raise ValueError("CORS_ORIGINS must list explicit origins; '*' is not permitted.")
        return ",".join(origins)

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return the cached settings instance."""
    return Settings()


settings = get_settings()
