from typing import List, Any
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator, AnyHttpUrl

class Settings(BaseSettings):
    PROJECT_NAME: str = "GlobeTrotter"
    API_V1_STR: str = "/api/v1"
    
    # Database - Read from environment variable
    DATABASE_URL: str
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: str | List[str]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("["):
                # Try to parse as JSON-like list
                import json
                try:
                    return json.loads(v)
                except json.JSONDecodeError:
                    pass
            return [i.strip() for i in v.split(",")]
        return v

    @field_validator("DATABASE_URL", mode="after")
    @classmethod
    def assemble_db_connection(cls, v: str) -> str:
        """Ensure async driver is used for PostgreSQL connections."""
        if v.startswith("postgresql://") and "asyncpg" not in v:
            v = v.replace("postgresql://", "postgresql+asyncpg://", 1)
        
        # Handle SSL mode parameters for asyncpg
        if "sslmode=" in v:
            v = v.replace("sslmode=require", "ssl=require")
            v = v.replace("sslmode=verify-full", "ssl=verify-full")
            v = v.replace("sslmode=verify-ca", "ssl=verify-ca")
        
        # Remove unsupported parameters for asyncpg
        if "channel_binding=" in v:
            v = v.replace("&channel_binding=require", "")
            v = v.replace("?channel_binding=require&", "?")
            v = v.replace("?channel_binding=require", "")
            v = v.replace("channel_binding=require&", "")
        
        return v

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
