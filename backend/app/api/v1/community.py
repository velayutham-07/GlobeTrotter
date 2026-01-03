from typing import Any
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.api import deps
from app.schemas.trip import TripResponse
from app.models.trip import Trip, TripStop, StopActivity
from app.models.user import User
from app.services import trip_service

router = APIRouter()

@router.get("/shared/{share_token}", response_model=TripResponse)
async def read_shared_trip(
    share_token: str,
    db: AsyncSession = Depends(deps.get_db),
) -> Any:
    """
    Get a shared trip by token.
    """
    stmt = (
        select(Trip)
        .where(Trip.share_token == share_token)
        .options(
            selectinload(Trip.stops).selectinload(TripStop.city),
            selectinload(Trip.stops).selectinload(TripStop.activities).selectinload(StopActivity.activity),
            selectinload(Trip.expenses)
        )
    )
    result = await db.execute(stmt)
    trip = result.scalars().first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    return trip

@router.post("/copy/{trip_id}", response_model=TripResponse)
async def copy_trip(
    trip_id: UUID,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Copy a public trip to your own trips.
    """
    # 1. Fetch original trip
    stmt = (
        select(Trip)
        .where(Trip.id == trip_id)
        .options(
            selectinload(Trip.stops).selectinload(TripStop.activities)
        )
    )
    result = await db.execute(stmt)
    original_trip = result.scalars().first()
    
    if not original_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    if not original_trip.is_public and original_trip.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to copy this trip")

    # 2. Create new trip
    new_trip = Trip(
        user_id=current_user.id,
        name=f"Copy of {original_trip.name}",
        description=original_trip.description,
        cover_image=original_trip.cover_image,
        estimated_budget=original_trip.estimated_budget,
        status="draft"
    )
    db.add(new_trip)
    await db.flush() # Get ID

    # 3. Copy stops and activities
    for stop in original_trip.stops:
        new_stop = TripStop(
            trip_id=new_trip.id,
            city_id=stop.city_id,
            order_index=stop.order_index,
            # Dates might need adjustment, but keeping null/same for now
        )
        db.add(new_stop)
        await db.flush()
        
        for activity in stop.activities:
            new_activity = StopActivity(
                stop_id=new_stop.id,
                activity_id=activity.activity_id,
                # scheduled_time=activity.scheduled_time,
                notes=activity.notes
            )
            db.add(new_activity)
            
    await db.commit()
    
    # Return full trip
    return await trip_service.get_trip(db, new_trip.id)
