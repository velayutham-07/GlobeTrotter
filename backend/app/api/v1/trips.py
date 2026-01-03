from typing import Any, List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.schemas.trip import TripCreate, TripUpdate, TripResponse
from app.models.user import User
from app.services import trip_service

router = APIRouter()

@router.get("/", response_model=List[TripResponse])
async def read_trips(
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve user's trips.
    """
    trips = await trip_service.get_user_trips(db, user_id=current_user.id, skip=skip, limit=limit)
    return trips

@router.post("/", response_model=TripResponse)
async def create_trip(
    *,
    db: AsyncSession = Depends(deps.get_db),
    trip_in: TripCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Create new trip.
    """
    trip = await trip_service.create_trip(db, trip_in, user_id=current_user.id)
    return trip

@router.get("/{trip_id}", response_model=TripResponse)
async def read_trip(
    *,
    db: AsyncSession = Depends(deps.get_db),
    trip_id: UUID,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get trip by ID.
    """
    trip = await trip_service.get_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.user_id != current_user.id and not trip.is_public:
        raise HTTPException(status_code=403, detail="Not authorized to access this trip")
    return trip

@router.put("/{trip_id}", response_model=TripResponse)
async def update_trip(
    *,
    db: AsyncSession = Depends(deps.get_db),
    trip_id: UUID,
    trip_in: TripUpdate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Update a trip.
    """
    trip = await trip_service.get_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this trip")
    
    trip = await trip_service.update_trip(db, trip_id, trip_in)
    return trip

@router.delete("/{trip_id}", response_model=Any)
async def delete_trip(
    *,
    db: AsyncSession = Depends(deps.get_db),
    trip_id: UUID,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Delete a trip.
    """
    trip = await trip_service.get_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this trip")
    
    success = await trip_service.delete_trip(db, trip_id)
    return {"success": success}
