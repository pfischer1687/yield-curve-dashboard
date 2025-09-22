import xml.etree.ElementTree as ET

import requests
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from yieldcurve.api.v1.schemas.yieldcurve import OrderCreate, OrderRead
from yieldcurve.db.models.user import User
from yieldcurve.db.models.yieldcurve import Order

YIELD_XML_URL = (
    "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml"
    "?data=daily_treasury_yield_curve&field_tdr_date_value=all"
)


class YieldCurveService:
    @staticmethod
    def fetch_yield_curve() -> dict[str, float]:
        resp = requests.get(YIELD_XML_URL)
        resp.raise_for_status()
        xml = resp.content
        root = ET.fromstring(xml)

        entries = root.findall(r".//{http://www.w3.org/2005/Atom}entry")
        if not entries:
            raise RuntimeError("No entries in yield curve XML feed")

        latest = entries[-1]
        fields = latest.findall(r".//{http://schemas.microsoft.com/ado/2007/08/dataservices/metadata}properties")[0]

        curve = {}
        for child in fields:
            tag = child.tag
            text = child.text
            if text is None:
                continue

            try:
                value = float(text)
            except ValueError:
                continue

            if "BC_1MONTH" in tag:
                curve["1M"] = value
            elif "BC_2MONTH" in tag:
                curve["2M"] = value
            elif "BC_3MONTH" in tag:
                curve["3M"] = value
            elif "BC_6MONTH" in tag:
                curve["6M"] = value
            elif "BC_1YEAR" in tag:
                curve["1Y"] = value
            elif "BC_2YEAR" in tag:
                curve["2Y"] = value
            elif "BC_3YEAR" in tag:
                curve["3Y"] = value
            elif "BC_5YEAR" in tag:
                curve["5Y"] = value
            elif "BC_7YEAR" in tag:
                curve["7Y"] = value
            elif "BC_10YEAR" in tag:
                curve["10Y"] = value
            elif "20YEAR" in tag:
                curve["20Y"] = value
            elif "30YEAR" in tag:
                curve["30Y"] = value
        return curve

    @staticmethod
    async def create_order(db: AsyncSession, order: OrderCreate, user: User) -> OrderRead:
        new_order = Order(term=order.term, amount=order.amount, user_id=user.id)
        db.add(new_order)
        await db.commit()
        await db.refresh(new_order)
        return OrderRead.model_validate(new_order)

    @staticmethod
    async def get_all_orders(db: AsyncSession, user: User) -> list[OrderRead]:
        stmt = select(Order).filter(Order.user_id == user.id).order_by(Order.id)
        result = await db.execute(stmt)
        orders = result.scalars().all()
        return [OrderRead.model_validate(order) for order in orders]
