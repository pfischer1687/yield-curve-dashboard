import { useYieldCurves } from "../hooks/useYieldCurves";
import { OrderInput } from "./OrderInput";
import { Spinner } from "./Spinner";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  type ChartOptions,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Props {
  userId: string;
}

const YieldCurveDashboard = ({ userId }: Props) => {
  const {
    yieldCurve,
    yieldLoading,
    yieldError,
    orders,
    ordersLoading,
    addOrder,
  } = useYieldCurves(userId);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#111827",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Term to Maturity",
          color: "#111827",
          font: {
            weight: "bold" as const,
          },
        },
        ticks: { color: "#111827" },
        grid: { color: "#E5E7EB" },
      },
      y: {
        title: {
          display: true,
          text: "Yield (%)",
          color: "#111827",
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          color: "#111827",
          callback(tickValue: string | number): string {
            return `${tickValue}%`;
          },
        },
        grid: { color: "#E5E7EB" },
      },
    },
  } satisfies ChartOptions<"line">;

  const chartData = {
    labels: yieldCurve ? Object.keys(yieldCurve) : [],
    datasets: [
      {
        label: "Yield Curve",
        data: yieldCurve ? Object.values(yieldCurve) : [],
        fill: false,
        borderColor: "rgb(99, 102, 241)",
      },
    ],
  };

  return (
    <div className="bg-gray-900 h-screen overflow-hidden px-6 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-4 h-full lg:grid-cols-2 lg:grid-rows-2">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-white text-xl font-semibold mb-4 text-center h-3">
            Yield Curve Plot
          </h2>

          <div className="h-64">
            {yieldLoading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : yieldError ? (
              <p className="text-center text-red-500">
                Error loading yield curve
              </p>
            ) : yieldCurve ? (
              <div className="relative h-58 w-full bg-white rounded-lg overflow-hidden">
                <div className="absolute inset-0 p-4">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">
            Create Order
          </h3>
          <OrderInput
            onAdd={(order) => addOrder.mutate(order)}
            loading={addOrder.isPending}
          />
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-md overflow-y-auto">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">
            Existing Orders
          </h3>
          {ordersLoading && <p className="text-gray-400">Loading orders...</p>}
          {orders && orders.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {orders.map((order) => (
                <li key={order.id} className="py-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>{order.term}</span>
                    <span>{order.amount}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YieldCurveDashboard;
