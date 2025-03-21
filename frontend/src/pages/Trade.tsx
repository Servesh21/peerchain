import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Transaction {
  _id: string;
  sender: string;
  to: string;
  value: string;
  status: string;
  hash: string;
}

const API_BASE_URL = "http://localhost:5500/api/blockchain";

const Trade: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // Fetch user wallet address from backend
  const { data: walletAddress } = useQuery({
    queryKey: ["walletAddress"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5500/api/user/wallet"); // Assuming API returns { walletAddress }
      return response.data.walletAddress;
    },
  });

  // Fetch wallet balance
  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ["walletBalance", walletAddress],
    queryFn: async () => {
      if (!walletAddress) return null;
      const response = await axios.get(`${API_BASE_URL}/balance/${walletAddress}`);
      return response.data.balance;
    },
    enabled: !!walletAddress,
  });

  // Fetch transactions
  const { data: transactions, refetch: refetchTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      return response.data;
    },
  });

  // Handle buy/sell transactions
  const mutation = useMutation({
    mutationFn: async ({ to, value }: { to: string; value: string }) => {
      return axios.post(`${API_BASE_URL}/transaction`, {
        sender: walletAddress,
        to,
        value,
      });
    },
    onSuccess: () => {
      alert("Transaction successful!");
      refetchBalance();
      refetchTransactions();
    },
    onError: (error) => {
      console.error("Transaction failed:", error);
      alert("Transaction failed! Check the console for details.");
    },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Crypto Trade</h1>

      {walletAddress && (
        <div className="p-3 bg-gray-800 rounded-md">
          <p>💰 Wallet: {walletAddress}</p>
          <p>💰 Balance: {balance ? `${balance} ETH` : "Loading..."}</p>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium">Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient address"
          className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
        />

        <label className="block mt-2 text-sm font-medium">Amount (ETH):</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mt-1 block w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
        />

        <button
          onClick={() => mutation.mutate({ to: recipient, value: amount })}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Processing..." : "Send Transaction"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6">Transaction History</h2>
      {transactions && transactions.length > 0 ? (
        <ul className="space-y-2">
          {transactions.map((tx: Transaction) => (
            <li key={tx._id} className="p-3 bg-gray-800 rounded-md">
              <p><strong>From:</strong> {tx.sender}</p>
              <p><strong>To:</strong> {tx.to}</p>
              <p><strong>Amount:</strong> {tx.value} ETH</p>
              <p><strong>Status:</strong> {tx.status}</p>
              <p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View on Etherscan
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Trade;
