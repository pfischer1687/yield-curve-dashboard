from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from yieldcurve.api.v1.schemas.yieldcurve import OrderCreate, OrderRead
from yieldcurve.api.v1.services.yieldcurve import YieldCurveService
from yieldcurve.core.auth import get_current_user
from yieldcurve.db.models.user import User
from yieldcurve.db.session import get_db

router = APIRouter()


def get_yield_curve_service() -> YieldCurveService:
    return YieldCurveService()


@router.get("/")
async def fetch_yield_curve(
    service: YieldCurveService = Depends(get_yield_curve_service),
) -> dict[str, float]:
    return service.fetch_yield_curve()


@router.post("/")
async def create_order(
    order: OrderCreate,
    db: AsyncSession = Depends(get_db),
    service: YieldCurveService = Depends(get_yield_curve_service),
    user: User = Depends(get_current_user),
) -> OrderRead:
    return await service.create_order(db, order, user)


@router.get("/orders")
async def list_orders(
    db: AsyncSession = Depends(get_db),
    service: YieldCurveService = Depends(get_yield_curve_service),
    user: User = Depends(get_current_user),
) -> list[OrderRead]:
    return await service.get_all_orders(db, user)
