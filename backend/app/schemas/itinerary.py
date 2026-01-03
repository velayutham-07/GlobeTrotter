from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel
from app.schemas.trip import TripStopResponse, StopActivityResponse

class ItineraryResponse(BaseModel):
    trip_id: UUID
    stops: List[TripStopResponse]

class ActivitySchedule(BaseModel):
    stop_id: UUID
    activity_id: UUID
    scheduled_time: Optional[str] = None # Expecting HH:MM format string or null
    notes: Optional[str] = None
