import datetime
from typing import Optional

from fastapi_users import schemas
from fastapi_users.schemas import PYDANTIC_V2
from sqlalchemy import Date


class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    is_active: bool
    is_superuser: bool
    is_verified: bool
    first_name: str | None = None
    last_name: str | None = None
    date_registration: datetime.date | None = None


class UserCreate(schemas.BaseUserCreate):
    email: str
    password: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    first_name: str | None = None
    last_name: str | None = None
    date_registration: datetime.date | None = None


class UserUpdate(schemas.BaseUserUpdate):
    pass
