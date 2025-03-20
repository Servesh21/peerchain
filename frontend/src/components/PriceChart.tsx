
import { useState, useEffect } from 'react';
import { useFadeIn } from '@/utils/animations';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';

interface PriceChartProps {
  coinId?: string;
  timeRange?: '1d' | '1w' | '1m' | '1y';
}

const PriceChart = ({ coinId = 'bitcoin', timeRange = '1d' }: PriceChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState({
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43156.78,
    change: 2.4,
    color: '#F7931A'
  });
  const [selectedRange, setSelectedRange] = useState<'1d' | '1w' | '1m' | '1y'>(timeRange);
  
  // Generate mock data on component mount
  useEffect(() => {
    setIsLoading(true);
    
    // Generate random price data
    const generateData = () => {
      const newData = [];
      let baseValue = selectedCoin.id === 'bitcoin' ? 42000 : 2700;
      const volatility = selectedCoin.id === 'bitcoin' ? 2000 : 150;
      const dataPoints = selectedRange === '1d' ? 24 : 
                         selectedRange === '1w' ? 7 : 
                         selectedRange === '1m' ? 30 : 12;
      
      const timeUnit = selectedRange === '1d' ? 'hour' : 
                       selectedRange === '1w' ? 'day' : 
                       selectedRange === '1m' ? 'day' : 'month';
      
      for (let i = 0; i < dataPoints; i++) {
        // Create some randomness
        baseValue += (Math.random() - 0.45) * volatility * 0.08;
        
        newData.push({
          time: i,
          timeLabel: `${i+1} ${timeUnit}${i !== 0 ? 's' : ''}`,
          price: parseFloat(baseValue.toFixed(2))
        });
      }
      
      setData(newData);
      setIsLoading(false);
    };
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      generateData();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedCoin.id, selectedRange]);
  
  // Function to change selected coin
  const changeCoin = (coin: any) => {
    setSelectedCoin(coin);
  };
  
  // Animation
  const chartAnimation = useFadeIn(200);
  
  // Coin options
  const coins = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43156.78,
      change: 2.4,
      color: '#F7931A'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2897.32,
      change: -0.8,
      color: '#627EEA'
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change: 0.02,
      color: '#50AF95'
    },
    {
      id: 'binance',
      name: 'Binance Coin',
      symbol: 'BNB',
      price: 386.94,
      change: 3.2,
      color: '#F3BA2F'
    }
  ];
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-3 rounded-lg shadow-md border border-border">
          <p className="text-sm font-medium">{`${payload[0].payload.timeLabel}`}</p>
          <p className="text-base font-semibold text-primary">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div 
      className="bg-card border border-border rounded-xl p-4 shadow-subtle h-full"
      style={chartAnimation}
    >
      {/* Chart header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div>
          {/* Coin selector */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary transition-colors">
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: selectedCoin.color }}
              >
                {selectedCoin.symbol.substring(0, 1)}
              </div>
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-left">{selectedCoin.name}</p>
                  <p className="text-xs text-muted-foreground text-left">{selectedCoin.symbol}</p>
                </div>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute left-0 mt-1 w-full origin-top-left rounded-lg bg-popover shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform scale-95 group-hover:scale-100 z-20">
              <div className="p-1">
                {coins.map(coin => (
                  <button
                    key={coin.id}
                    className={`flex items-center space-x-2 w-full p-2 rounded-md text-left ${
                      selectedCoin.id === coin.id 
                        ? 'bg-secondary' 
                        : 'hover:bg-secondary'
                    } transition-colors`}
                    onClick={() => changeCoin(coin)}
                  >
                    <div 
                      className="h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.substring(0, 1)}
                    </div>
                    <span>{coin.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-4">
          {/* Price info */}
          <div className="text-right">
            <p className="text-2xl font-display font-bold">${selectedCoin.price.toLocaleString()}</p>
            <p className={`text-sm flex items-center justify-end ${
              selectedCoin.change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {selectedCoin.change >= 0 ? 
                <ArrowUp className="h-3 w-3 mr-1" /> : 
                <ArrowDown className="h-3 w-3 mr-1" />
              }
              {Math.abs(selectedCoin.change)}%
            </p>
          </div>
          
          {/* Time range selector */}
          <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
            {(['1d', '1w', '1m', '1y'] as const).map((range) => (
              <button
                key={range}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedRange === range 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary-foreground/10'
                }`}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-72 w-full mt-4">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedCoin.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={selectedCoin.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis 
                dataKey="time" 
                tickFormatter={(value) => {
                  if (selectedRange === '1d') return `${value}h`;
                  if (selectedRange === '1w') return `D${value}`;
                  if (selectedRange === '1m') return `${value}d`;
                  return `M${value}`;
                }}
                tick={{ fontSize: 12, fill: '#888' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={['dataMin - 100', 'dataMax + 100']} 
                tick={{ fontSize: 12, fill: '#888' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={selectedCoin.color} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1000}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
