
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ArrowDown, 
  ArrowUp, 
  ChevronDown, 
  Filter, 
  Search, 
  Wallet, 
  Shield, 
  RefreshCw,
  CircleDollarSign,
  Clock,
  CreditCard,
  Check,
  Shuffle,
  Star,
  ChevronRight,
  Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import PriceChart from '@/components/PriceChart';
import { useFadeIn } from '@/utils/animations';

const Trade = () => {
  const [tradeType, setTradeType] = useState('buy');
  const [selectedCurrency, setSelectedCurrency] = useState({
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43156.78,
    change: 2.4,
    color: '#F7931A'
  });
  
  // Animation styles
  const headerAnimation = useFadeIn(0);
  const chartAnimation = useFadeIn(200);
  const formAnimation = useFadeIn(400);
  const offersAnimation = useFadeIn(600);
  
  // Mock available cryptocurrencies
  const currencies = [
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
  
  // Mock payment methods
  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: <CircleDollarSign className="h-4 w-4" /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'paypal', name: 'PayPal', icon: <Wallet className="h-4 w-4" /> }
  ];
  
  // Mock trade offers
  const offers = [
    {
      id: 'offer1',
      type: 'sell',
      user: 'CryptoTrader42',
      price: 43250.00,
      limit: { min: 0.01, max: 0.5 },
      available: 1.25,
      payment: 'Bank Transfer',
      rating: 4.95,
      trades: 235,
      completion: 98.5,
      response: 12
    },
    {
      id: 'offer2',
      type: 'sell',
      user: 'SatoshiLover',
      price: 43150.00,
      limit: { min: 0.005, max: 0.75 },
      available: 0.85,
      payment: 'PayPal',
      rating: 4.8,
      trades: 178,
      completion: 97.2,
      response: 8
    },
    {
      id: 'offer3',
      type: 'sell',
      user: 'BlockchainMaster',
      price: 43075.25,
      limit: { min: 0.01, max: 1.0 },
      available: 2.5,
      payment: 'Bank Transfer',
      rating: 5.0,
      trades: 412,
      completion: 99.1,
      response: 5
    },
    {
      id: 'offer4',
      type: 'buy',
      user: 'CoinCollector',
      price: 43300.00,
      limit: { min: 0.01, max: 0.25 },
      available: 0.25,
      payment: 'Bank Transfer',
      rating: 4.75,
      trades: 124,
      completion: 96.8,
      response: 15
    },
    {
      id: 'offer5',
      type: 'buy',
      user: 'BitcoinWhale',
      price: 43350.00,
      limit: { min: 0.05, max: 2.0 },
      available: 5.0,
      payment: 'Credit/Debit Card',
      rating: 4.9,
      trades: 356,
      completion: 98.2,
      response: 10
    },
    {
      id: 'offer6',
      type: 'buy',
      user: 'CryptoEnthusiast',
      price: 43200.00,
      limit: { min: 0.01, max: 0.5 },
      available: 1.0,
      payment: 'PayPal',
      rating: 4.85,
      trades: 193,
      completion: 97.5,
      response: 7
    }
  ];
  
  // Filter offers based on selected trade type
  const filteredOffers = offers.filter(offer => offer.type === (tradeType === 'buy' ? 'sell' : 'buy'));
  
  return (
    <>
      <Navbar />
      
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div 
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
            style={headerAnimation}
          >
            <div>
              <h1 className="text-3xl font-display font-bold">P2P Trading</h1>
              <p className="text-muted-foreground">Find the best offers to buy and sell cryptocurrencies</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Create Offer
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Price Chart */}
            <div className="lg:col-span-2" style={chartAnimation}>
              <PriceChart coinId={selectedCurrency.id} />
            </div>
            
            {/* Right column - Trade Form */}
            <div 
              className="bg-card border border-border rounded-xl p-6 shadow-subtle h-full"
              style={formAnimation}
            >
              <h2 className="text-xl font-display font-semibold mb-6">Start Trading</h2>
              
              {/* Buy/Sell Tabs */}
              <div className="mb-6">
                <Tabs 
                  value={tradeType} 
                  onValueChange={setTradeType} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger 
                      value="buy" 
                      className={`flex items-center ${tradeType === 'buy' ? 'text-green-500' : ''}`}
                    >
                      <ArrowDown className={`mr-2 h-4 w-4 ${tradeType === 'buy' ? 'text-green-500' : ''}`} />
                      Buy
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sell" 
                      className={`flex items-center ${tradeType === 'sell' ? 'text-red-500' : ''}`}
                    >
                      <ArrowUp className={`mr-2 h-4 w-4 ${tradeType === 'sell' ? 'text-red-500' : ''}`} />
                      Sell
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Currency selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Select Cryptocurrency
                </label>
                <div className="relative">
                  <button 
                    className="w-full flex items-center justify-between p-3 border border-input rounded-lg bg-transparent hover:bg-secondary/50 transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold"
                        style={{ backgroundColor: selectedCurrency.color }}
                      >
                        {selectedCurrency.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <p className="font-medium">{selectedCurrency.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedCurrency.symbol}</p>
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                  
                  {/* Dropdown Menu (hidden by default) */}
                  <div className="hidden absolute left-0 mt-1 w-full origin-top-left rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 z-20 p-1">
                    {currencies.map(currency => (
                      <button
                        key={currency.id}
                        className="flex items-center w-full p-2 rounded-md text-left hover:bg-secondary transition-colors"
                        onClick={() => setSelectedCurrency(currency)}
                      >
                        <div 
                          className="h-6 w-6 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold"
                          style={{ backgroundColor: currency.color }}
                        >
                          {currency.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <p className="font-medium">{currency.name}</p>
                          <p className="text-xs text-muted-foreground">${currency.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Amount
                </label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    min="0" 
                    step="0.01"
                    className="pr-16"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-muted-foreground">{selectedCurrency.symbol}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Min: 0.001 {selectedCurrency.symbol}</span>
                  <span>Max: 2.0 {selectedCurrency.symbol}</span>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      className="flex flex-col items-center justify-center p-3 border border-input rounded-lg bg-transparent hover:bg-secondary/50 transition-colors text-center"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        {method.icon}
                      </div>
                      <span className="text-xs">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Trade Info */}
              <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-medium">${selectedCurrency.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fee</span>
                  <span className="font-medium">0.15%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCurrency.symbol}
              </Button>
              
              <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2" />
                <span>Protected by our escrow system</span>
              </div>
            </div>
          </div>
          
          {/* Available Offers */}
          <div 
            className="mt-8 bg-card border border-border rounded-xl shadow-subtle"
            style={offersAnimation}
          >
            <div className="p-6 border-b border-border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-display font-semibold flex items-center">
                  <Shuffle className="mr-2 h-5 w-5 text-primary" />
                  Available {tradeType === 'buy' ? 'Sell' : 'Buy'} Offers
                </h2>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search offers" 
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
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Advertiser</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Price</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Limit</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Available</th>
                    <th className="text-left text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Payment</th>
                    <th className="text-center text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Trade Info</th>
                    <th className="text-right text-muted-foreground font-medium text-xs uppercase tracking-wider px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-muted-foreground">
                        <div className="flex flex-col items-center">
                          <Wallet className="h-12 w-12 mb-3 text-muted-foreground/50" />
                          <p className="mb-2">No offers available</p>
                          <p className="text-sm">Try changing your filters or check back later</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOffers.map(offer => (
                      <tr key={offer.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm mr-3">
                              {offer.user.substring(0, 1)}
                            </div>
                            <div>
                              <p className="font-medium">{offer.user}</p>
                              <div className="flex items-center text-sm">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                                <span>{offer.rating}</span>
                                <span className="mx-1 text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{offer.trades} trades</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          ${offer.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div>
                            <p>${(offer.limit.min * offer.price).toLocaleString()} - ${(offer.limit.max * offer.price).toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              {offer.limit.min} - {offer.limit.max} BTC
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {offer.available} BTC
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary">
                            {offer.payment === 'Bank Transfer' && <CircleDollarSign className="h-3 w-3 mr-1.5" />}
                            {offer.payment === 'PayPal' && <Wallet className="h-3 w-3 mr-1.5" />}
                            {offer.payment === 'Credit/Debit Card' && <CreditCard className="h-3 w-3 mr-1.5" />}
                            {offer.payment}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-6">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground mb-1">Completion</p>
                              <p className="font-medium flex items-center justify-center text-green-500">
                                <Check className="h-3 w-3 mr-1" />
                                {offer.completion}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground mb-1">Response</p>
                              <p className="font-medium flex items-center justify-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                {offer.response} min
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button>
                            {tradeType === 'buy' ? 'Buy' : 'Sell'}
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-border">
              <div className="bg-accent/40 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Trading Safely</h3>
                  <p className="text-sm text-muted-foreground">
                    All trades are protected by our escrow system. Cryptocurrency is locked in our secure smart contract until both parties confirm the transaction is complete. 
                    If any issues arise, our dispute resolution system is available to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Trade;
