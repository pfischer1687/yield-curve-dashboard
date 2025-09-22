import { useState } from "react";

interface OrderInputProps {
  onAdd: (order: { term: string; amount: number }) => void;
  loading?: boolean;
}

export const OrderInput = ({ onAdd, loading = false }: OrderInputProps) => {
  const [term, setTerm] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term || amount === "") return;
    onAdd({ term, amount: Number(amount) });
    setTerm("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Term (e.g. 10Y)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        maxLength={10}
      />
      <input
        type="number"
        inputMode="decimal"
        step="any"
        className="w-full appearance-none px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <button
        type="submit"
        disabled={!term.trim() || isNaN(Number(amount)) || loading}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};
