import { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceChart = ({ coinId = "BTC" }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState("1m"); // Default: Monthly Report
  const [summary, setSummary] = useState({ maxPrice: 0, minPrice: 0, avgPrice: 0 });

  // Fetch CryptoCompare Data for Monthly/Yearly Reports
  const fetchData = async (timeRange) => {
    setIsLoading(true);
    try {
      const interval = timeRange === "1m" ? "1d" : "1w"; // "1d" for daily, "1w" for weekly data
      const limit = timeRange === "1m" ? 30 : 52; // 30 days for 1 month, 52 weeks for 1 year

      const response = await axios.get(`https://api.binance.com/api/v3/klines`, {
        params: {
          symbol: `${coinId}USDT`.toUpperCase(), // Ensure symbol is in uppercase
          interval: interval, // Interval: daily or weekly
          limit: limit, // Fetch data for the last 30 days or 52 weeks
        },
      });

      const formattedData = response.data.map((entry) => ({
        time: new Date(entry[0]).toLocaleDateString(), // Convert timestamp to readable date
        price: parseFloat(entry[4]), // Closing price of that period
      }));

      // Compute summary (Min, Max, Average)
      const prices = formattedData.map((d) => d.price);
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);

      // Update state
      setData(formattedData);
      setSummary({ maxPrice, minPrice, avgPrice});
    } catch (error) {
      console.error("Error fetching historical price data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Data When Component Mounts or Time Range Changes
  useEffect(() => {
    let isMounted = true;
    fetchData(selectedRange).then(() => {
      if (!isMounted) return;
    });
    return () => {
      isMounted = false;
    };
  }, [selectedRange]);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-lg">
      {/* Time Range Selector */}
      <div className="flex items-center gap-2 mb-4">
    <h1 className="text-2xl font-bold">Bitcoin Price Chart</h1>
  </div>
      <div className="flex justify-center space-x-2 mb-4">
        {["1m", "1y"].map((range) => (
          <button
            key={range}
            className={`px-4 py-2 text-sm rounded-md font-semibold transition ${
              selectedRange === range ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range === "1m" ? "Monthly Report" : "Yearly Report"}
          </button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="h-72 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#555" }} />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} tickFormatter={(value) => `$${value}`} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#4F46E5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Summary Section */}
      {!isLoading && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
          <p>📈 Highest Price: <strong>${summary.maxPrice.toLocaleString()}</strong></p>
          <p>📉 Lowest Price: <strong>${summary.minPrice.toLocaleString()}</strong></p>
          <p>📊 Average Price: <strong>${summary.avgPrice.toLocaleString()}</strong></p>
        </div>
      )}
    </div>
  );
};

export default PriceChart;