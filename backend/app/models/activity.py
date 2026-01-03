import uuid
from sqlalchemy import String, Float, Integer, Text, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    city_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("cities.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    image_url: Mapped[str] = mapped_column(String, nullable=True)
    duration_minutes: Mapped[int] = mapped_column(Integer, nullable=True)
    cost: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    category: Mapped[str] = mapped_column(String, nullable=True)  # sightseeing, food, adventure, culture, etc.

    # Relationships
    city = relationship("City", back_populates="activities")
    stop_activities = relationship("StopActivity", back_populates="activity")
