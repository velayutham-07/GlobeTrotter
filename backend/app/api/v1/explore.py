from typing import Any, List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.api import deps
from app.schemas.common import City, Activity
from app.models.city import City as CityModel
from app.models.activity import Activity as ActivityModel

router = APIRouter()

@router.get("/cities", response_model=List[City])
async def search_cities(
    *,
    db: AsyncSession = Depends(deps.get_db),
    q: Optional[str] = None,
    region: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
) -> Any:
    """
    Search for cities.
    """
    stmt = select(CityModel)
    
    if q:
        stmt = stmt.where(
            or_(
                CityModel.name.ilike(f"%{q}%"),
                CityModel.country.ilike(f"%{q}%")
            )
        )
    
    if region:
        stmt = stmt.where(CityModel.region == region)
        
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/activities", response_model=List[Activity])
async def search_activities(
    *,
    db: AsyncSession = Depends(deps.get_db),
    q: Optional[str] = None,
    city_id: Optional[str] = None,
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
) -> Any:
    """
    Search for activities.
    """
    stmt = select(ActivityModel)
    
    if q:
        stmt = stmt.where(ActivityModel.name.ilike(f"%{q}%"))
        
    if city_id:
        stmt = stmt.where(ActivityModel.city_id == city_id)
        
    if category:
        stmt = stmt.where(ActivityModel.category == category)
        
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()
