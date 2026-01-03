from typing import Optional, List
from uuid import UUID
from datetime import date, time
from pydantic import BaseModel, ConfigDict
from decimal import Decimal
from app.schemas.common import City, Activity

# Stop Activity Schemas
class StopActivityBase(BaseModel):
    activity_id: UUID
    scheduled_time: Optional[time] = None
    notes: Optional[str] = None

class StopActivityCreate(StopActivityBase):
    pass

class StopActivityResponse(StopActivityBase):
    id: UUID
    stop_id: UUID
    activity: Optional[Activity] = None  # To show full activity details
    
    model_config = ConfigDict(from_attributes=True)

# Trip Stop Schemas
class TripStopBase(BaseModel):
    city_id: UUID
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    order_index: int

class TripStopCreate(TripStopBase):
    pass

class TripStopResponse(TripStopBase):
    id: UUID
    trip_id: UUID
    city: Optional[City] = None  # To show full city details
    activities: List[StopActivityResponse] = []
    
    model_config = ConfigDict(from_attributes=True)

# Expense Schemas
class TripExpenseBase(BaseModel):
    category: str
    amount: Decimal
    notes: Optional[str] = None

class TripExpenseCreate(TripExpenseBase):
    pass

class TripExpenseResponse(TripExpenseBase):
    id: UUID
    trip_id: UUID
    
    model_config = ConfigDict(from_attributes=True)

# Trip Schemas
class TripBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    cover_image: Optional[str] = None
    status: Optional[str] = "draft"
    is_public: Optional[bool] = False
    estimated_budget: Optional[Decimal] = None

class TripCreate(TripBase):
    pass

class TripUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    cover_image: Optional[str] = None
    status: Optional[str] = None
    is_public: Optional[bool] = None
    estimated_budget: Optional[Decimal] = None

class TripResponse(TripBase):
    id: UUID
    user_id: UUID
    share_token: Optional[str] = None
    stops: List[TripStopResponse] = []
    expenses: List[TripExpenseResponse] = []
    
    model_config = ConfigDict(from_attributes=True)
