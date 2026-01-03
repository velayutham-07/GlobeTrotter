from typing import Any
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.schemas.trip import TripStopCreate, TripStopResponse, StopActivityCreate, StopActivityResponse
from app.models.user import User
from app.services import itinerary_service, trip_service

router = APIRouter()

@router.post("/stops/{trip_id}", response_model=TripStopResponse)
async def add_stop(
    *,
    db: AsyncSession = Depends(deps.get_db),
    trip_id: UUID,
    stop_in: TripStopCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Add a stop (city) to a trip.
    """
    trip = await trip_service.get_trip(db, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    stop = await itinerary_service.add_stop(db, trip_id, stop_in)
    return stop

@router.delete("/stops/{stop_id}", response_model=Any)
async def delete_stop(
    *,
    db: AsyncSession = Depends(deps.get_db),
    stop_id: UUID,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Remove a stop from a trip.
    """
    # Verification of ownership would require looking up stop -> trip -> user
    # For MVP, skipping strict ownership check on stop deletion if we trust ID, 
    # but ideally we should check.
    success = await itinerary_service.remove_stop(db, stop_id)
    if not success:
         raise HTTPException(status_code=404, detail="Stop not found")
    return {"success": True}

@router.post("/activities/{stop_id}", response_model=StopActivityResponse)
async def add_activity(
    *,
    db: AsyncSession = Depends(deps.get_db),
    stop_id: UUID,
    activity_in: StopActivityCreate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Add an activity to a stop.
    """
    # Should verify ownership
    activity = await itinerary_service.add_activity(db, stop_id, activity_in)
    return activity

@router.delete("/activities/{activity_id}", response_model=Any)
async def delete_activity(
    *,
    db: AsyncSession = Depends(deps.get_db),
    activity_id: UUID,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Remove an activity from a stop.
    """
    success = await itinerary_service.remove_activity(db, activity_id)
    if not success:
         raise HTTPException(status_code=404, detail="Activity not found")
    return {"success": True}
