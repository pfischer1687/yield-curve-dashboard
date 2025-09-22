from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OrderCreate(BaseModel):
    term: str
    amount: float


class OrderRead(BaseModel):
    id: int
    term: str
    amount: float
    created_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)
