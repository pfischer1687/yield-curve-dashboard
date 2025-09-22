import type { Order, OrderInput } from "../types/yieldcurve";
import { API_BASE } from "../config/api";
import { fetchJson } from "../utils/http";
import { buildHeaders } from "../utils/headers";

const YIELD_CURVE_ENDPOINT = `${API_BASE}/yieldcurve`;

export const fetchYieldCurve = async (
  userId: string,
): Promise<Record<string, number>> => {
  return fetchJson<Record<string, number>>(YIELD_CURVE_ENDPOINT, {
    headers: buildHeaders(userId),
  });
};

export const createOrder = async (orderInput: OrderInput): Promise<Order> => {
  return fetchJson<Order>(YIELD_CURVE_ENDPOINT, {
    method: "POST",
    headers: buildHeaders(orderInput.userId),
    body: JSON.stringify(orderInput),
  });
};

export const listOrders = async (userId: string): Promise<Order[]> => {
  return fetchJson<Order[]>(`${YIELD_CURVE_ENDPOINT}/orders`, {
    headers: buildHeaders(userId),
  });
};
