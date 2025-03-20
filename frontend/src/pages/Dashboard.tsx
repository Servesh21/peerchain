import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart2, 
  Wallet, 
  ExternalLink, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  ShieldAlert,
  RefreshCw,
  Copy,
  Plus
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useFadeIn } from '@/utils/animations';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation styles
  const headerAnimation = useFadeIn(0);
  const cardAnimation1 = useFadeIn(300);
  const cardAnimation2 = useFadeIn(400);
  const chartAnimation = useFadeIn(500);
  const transactionsAnimation = useFadeIn(600);
  
  // Mock portfolio data
  const portfolio = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 0.425,
      value: 18332.63,
      change: 2.4,
      color: '#F7931A'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: 3.75,
      value: 10864.95,
      change: -0.8,
      color: '#627EEA'
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      balance: 4250.00,
      value: 4250.00,
      change: 0.02,
      color: '#50AF95'
    },
    {
      id: 'binance',
      name: 'Binance Coin',
      symbol: 'BNB',
      balance: 12.5,
      value: 4836.75,
      change: 3.2,
      color: '#F3BA2F'
    }
  ];
  
  // Mock transactions
  const transactions = [
    {
      id: 'tx1',
      type: 'buy',
      coin: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.125,
      value: 5394.60,
      date: '2023-05-15T14:30:00Z',
      status: 'completed',
      counterparty: 'MoonTrader92'
    },
    {
      id: 'tx2',
      type: 'sell',
      coin: 'Ethereum',
      symbol: 'ETH',
      amount: 1.5,
      value: 4345.98,
      date: '2023-05-12T09:15:00Z',
      status: 'completed',
      counterparty: 'CryptoWhale44'
    },
    {
      id: 'tx3',
      type: 'buy',
      coin: 'Binance Coin',
      symbol: 'BNB',
      amount: 5.0,
      value: 1934.70,
      date: '2023-05-08T16:45:00Z',
      status: 'completed',
      counterparty: 'BlockchainMaster'
    },
    {
      id: 'tx4',
      type: 'sell',
      coin: 'Tether',
      symbol: 'USDT',
      amount: 1000.0,
      value: 1000.0,
      date: '2023-05-05T11:20:00Z',
      status: 'completed',
      counterparty: 'SatoshiFan'
    },
    {
      id: 'tx5',
      type: 'buy',
      coin: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.3,
      value: 12938.84,
      date: '2023-05-01T13:10:00Z',
      status: 'dispute',
      counterparty: 'CoinHunter'
    }
  ];
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Calculate total portfolio value
  const totalValue = portfolio.reduce((sum, coin) => sum + coin.value, 0);
  
  return (
    <>
      <Navbar />
      
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div 
            className="mb-12"
            style={headerAnimation}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <h1 className="text-4xl font-display font-bold mb-3">Dashboard</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">Manage your crypto portfolio and trades</p>
            </div>
            
            <div className="flex justify-end">
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                New Trade
              </Button>
            </div>
          </div>
          
          {/* Portfolio Summary Cards */}
          <div className="max-w-5xl mx-auto mb-16">
            <div 
              className="bg-card border border-border rounded-xl p-8 shadow-subtle"
              style={cardAnimation1}
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-muted-foreground text-sm font-medium mb-2">Total Portfolio Value</h2>
                  <p className="text-4xl font-display font-bold">${totalValue.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="space-y-5">
                {portfolio.map((coin) => (
                  <div key={coin.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="h-10 w-10 rounded-full flex items-center justify-center mr-4 text-white text-sm font-bold"
                        style={{ backgroundColor: coin.color }}
                      >
                        {coin.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <p className="font-medium text-lg">{coin.name}</p>
                        <p className="text-sm text-muted-foreground">{coin.balance} {coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">${coin.value.toLocaleString()}</p>
                      <p className={`text-sm flex items-center justify-end ${
                        coin.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {coin.change >= 0 ? 
                          <ArrowUp className="h-4 w-4 mr-1" /> : 
                          <ArrowDown className="h-4 w-4 mr-1" />
                        }
                        {Math.abs(coin.change)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full py-6 text-lg">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Withdraw
                </Button>
                <Button className="w-full py-6 text-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Deposit
                </Button>
              </div>
            </div>
          </div>
          
          {/* Price Chart */}

          
          {/* Transaction History */}
          <div className="bg-card border border-border rounded-xl shadow-subtle" style={transactionsAnimation}>
            <div className="p-6 border-b border-border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-display font-semibold">Transaction History</h2>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search transactions" 
                      className="pl-9 h-9 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-ring w-full md:w-[200px]"
                    />
                  </div>
                  
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Type</th>
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Asset</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Amount</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Value</th>
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Counterparty</th>
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    // Loading skeleton
                    Array(5).fill(0).map((_, index) => (
                      <tr key={index} className="border-b border-border">
                        {Array(8).fill(0).map((_, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4">
                            <div className="h-4 bg-muted rounded animate-pulse"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    // Actual transaction data
                    transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tx.type === 'buy' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {tx.type === 'buy' ? (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            )}
                            {tx.type === 'buy' ? 'Buy' : 'Sell'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {tx.coin} <span className="text-muted-foreground">({tx.symbol})</span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {tx.amount} {tx.symbol}
                        </td>
                        <td className="px-6 py-4 text-right">
                          ${tx.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs mr-2">
                              {tx.counterparty.substring(0, 1)}
                            </div>
                            <span>{tx.counterparty}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatDate(tx.date)}
                        </td>
                        <td className="px-6 py-4">
                          {tx.status === 'completed' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                              <ShieldAlert className="h-3 w-3 mr-1" />
                              Dispute
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 5 of 24 transactions</p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
