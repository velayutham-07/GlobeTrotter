from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload

from app.models.trip import Trip, TripStop, TripExpense
from app.models.city import City
from app.models.activity import Activity
from app.schemas.trip import TripCreate, TripUpdate

async def get_user_trips(db: AsyncSession, user_id: UUID, skip: int = 0, limit: int = 100) -> List[Trip]:
    stmt = (
        select(Trip)
        .where(Trip.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .order_by(Trip.start_date.asc())
        .options(
            selectinload(Trip.stops).selectinload(TripStop.city),
            selectinload(Trip.expenses)
        )
    )
    result = await db.execute(stmt)
    return result.scalars().all()

async def get_trip(db: AsyncSession, trip_id: UUID) -> Optional[Trip]:
    stmt = (
        select(Trip)
        .where(Trip.id == trip_id)
        .options(
            selectinload(Trip.stops).selectinload(TripStop.city),
            selectinload(Trip.stops).selectinload(TripStop.activities).selectinload(stop_activity_rel => stop_activity_rel.activity), # Correct way to load nested?
             # Actually, stop.activities -> StopActivity. activity field in StopActivity schema uses StopActivity.activity relationship.
             # So we need to load Trip -> stops -> activities (StopActivity) -> activity (Activity)
        )
    )
    # The relationship chain is: Trip.stops -> TripStop.activities -> StopActivity.activity
    # SQLAlchemy syntax: selectinload(Trip.stops).selectinload(TripStop.activities).selectinload(StopActivity.activity)
    
    stmt = (
        select(Trip)
        .where(Trip.id == trip_id)
        .options(
            selectinload(Trip.stops).selectinload(TripStop.city),
            selectinload(Trip.stops).selectinload(TripStop.activities).selectinload("activity"), # Use string name if class not imported or circular
            selectinload(Trip.expenses)
        )
    )
    
    result = await db.execute(stmt)
    return result.scalars().first()

async def create_trip(db: AsyncSession, trip_in: TripCreate, user_id: UUID) -> Trip:
    db_trip = Trip(
        **trip_in.model_dump(),
        user_id=user_id
    )
    db.add(db_trip)
    await db.commit()
    await db.refresh(db_trip)
    return db_trip

async def update_trip(db: AsyncSession, trip_id: UUID, trip_in: TripUpdate) -> Optional[Trip]:
    trip = await get_trip(db, trip_id)
    if not trip:
        return None
    
    update_data = trip_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(trip, field, value)
        
    db.add(trip)
    await db.commit()
    await db.refresh(trip)
    return trip

async def delete_trip(db: AsyncSession, trip_id: UUID) -> bool:
    trip = await get_trip(db, trip_id)
    if not trip:
        return False
        
    await db.delete(trip)
    await db.commit()
    return True
