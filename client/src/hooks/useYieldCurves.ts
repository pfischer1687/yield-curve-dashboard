import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listOrders, createOrder, fetchYieldCurve } from "../api/yieldcurve";
import type { Order } from "../types/yieldcurve";

interface CreateOrderInput {
  term: string;
  amount: number;
}

export const useYieldCurves = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery<Order[]>({
    queryKey: ["orders", userId],
    queryFn: () => listOrders(userId),
    enabled: !!userId,
  });

  const {
    data: yieldCurve,
    isLoading: yieldLoading,
    error: yieldError,
  } = useQuery({
    queryKey: ["yieldcurve", userId],
    queryFn: () => fetchYieldCurve(userId),
    enabled: !!userId,
  });

  const addOrder = useMutation({
    mutationFn: ({ term, amount }: CreateOrderInput) =>
      createOrder({ userId, term, amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", userId] });
    },
  });

  return {
    orders,
    ordersLoading,
    ordersError,
    yieldCurve,
    yieldLoading,
    yieldError,
    addOrder,
  };
};
