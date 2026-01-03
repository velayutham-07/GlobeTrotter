import uuid
from sqlalchemy import String, Float, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class City(Base):
    __tablename__ = "cities"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, index=True, nullable=False)
    country: Mapped[str] = mapped_column(String, nullable=False)
    region: Mapped[str] = mapped_column(String, nullable=True)
    image_url: Mapped[str] = mapped_column(String, nullable=True)
    cost_index: Mapped[str] = mapped_column(String, nullable=True)  # budget, moderate, expensive, luxury
    rating: Mapped[float] = mapped_column(Float, default=0.0)
    description: Mapped[str] = mapped_column(Text, nullable=True)

    # Relationships
    activities = relationship("Activity", back_populates="city", cascade="all, delete-orphan")
    trip_stops = relationship("TripStop", back_populates="city")
