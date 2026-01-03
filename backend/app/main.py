from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1 import auth, trips, itinerary, explore, profile, community

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(trips.router, prefix=f"{settings.API_V1_STR}/trips", tags=["Trips"])
app.include_router(itinerary.router, prefix=f"{settings.API_V1_STR}/itinerary", tags=["Itinerary"])
app.include_router(explore.router, prefix=f"{settings.API_V1_STR}/explore", tags=["Explore"])
app.include_router(profile.router, prefix=f"{settings.API_V1_STR}/profile", tags=["Profile"])
app.include_router(community.router, prefix=f"{settings.API_V1_STR}/community", tags=["Community"])

@app.get("/")
async def root():
    return {"message": "Welcome to GlobeTrotter API"}
