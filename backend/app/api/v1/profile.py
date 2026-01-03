from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.schemas.user import UserUpdate, UserResponse
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=UserResponse)
async def read_profile(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user profile.
    """
    return current_user

@router.put("/", response_model=UserResponse)
async def update_profile(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_in: UserUpdate,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Update current user profile.
    """
    update_data = user_in.model_dump(exclude_unset=True)
    if "password" in update_data and update_data["password"]:
        # We need to hash password if it's being updated
        from app.core.security import get_password_hash
        hashed_password = get_password_hash(update_data["password"])
        del update_data["password"]
        current_user.password_hash = hashed_password
        
    for field, value in update_data.items():
        if field != "password":
            setattr(current_user, field, value)
            
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    return current_user
