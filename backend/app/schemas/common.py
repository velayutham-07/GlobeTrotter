from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from decimal import Decimal

# City Schemas
class CityBase(BaseModel):
    name: str
    country: str
    region: Optional[str] = None
    image_url: Optional[str] = None
    cost_index: Optional[str] = None
    rating: Optional[float] = 0.0
    description: Optional[str] = None

class CityCreate(CityBase):
    pass

class City(CityBase):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)

# Activity Schemas
class ActivityBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    duration_minutes: Optional[int] = None
    cost: Optional[Decimal] = None
    category: Optional[str] = None

class ActivityCreate(ActivityBase):
    city_id: UUID

class Activity(ActivityBase):
    id: UUID
    city_id: UUID
    
    model_config = ConfigDict(from_attributes=True)
