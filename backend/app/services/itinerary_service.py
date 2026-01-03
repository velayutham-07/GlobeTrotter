from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.models.trip import TripStop, StopActivity
from app.schemas.trip import TripStopCreate, StopActivityCreate

async def add_stop(db: AsyncSession, trip_id: UUID, stop_in: TripStopCreate) -> TripStop:
    db_stop = TripStop(
        trip_id=trip_id,
        city_id=stop_in.city_id,
        order_index=stop_in.order_index,
        start_date=stop_in.start_date,
        end_date=stop_in.end_date
    )
    db.add(db_stop)
    await db.commit()
    await db.refresh(db_stop)
    # Reload with city for response
    result = await db.execute(
        select(TripStop)
        .where(TripStop.id == db_stop.id)
        .options(selectinload(TripStop.city))
    )
    return result.scalars().first()

async def remove_stop(db: AsyncSession, stop_id: UUID) -> bool:
    result = await db.execute(select(TripStop).where(TripStop.id == stop_id))
    stop = result.scalars().first()
    if not stop:
        return False
    await db.delete(stop)
    await db.commit()
    return True

async def add_activity(db: AsyncSession, stop_id: UUID, activity_in: StopActivityCreate) -> StopActivity:
    db_activity = StopActivity(
        stop_id=stop_id,
        activity_id=activity_in.activity_id,
        scheduled_time=activity_in.scheduled_time,
        notes=activity_in.notes
    )
    db.add(db_activity)
    await db.commit()
    await db.refresh(db_activity)
    # Reload with activity details
    result = await db.execute(
        select(StopActivity)
        .where(StopActivity.id == db_activity.id)
        .options(selectinload(StopActivity.activity))
    )
    return result.scalars().first()

async def remove_activity(db: AsyncSession, stop_activity_id: UUID) -> bool:
    result = await db.execute(select(StopActivity).where(StopActivity.id == stop_activity_id))
    activity = result.scalars().first()
    if not activity:
        return False
    await db.delete(activity)
    await db.commit()
    return True
