from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    is_completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    is_completed: Optional[bool] = None

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
