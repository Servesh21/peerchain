
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Shuffle, BarChart2 } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';

const HeroSection = () => {
  const [heroStats, setHeroStats] = useState({
    trades: 0,
    volume: 0,
    users: 0
  });
  
  // Animate stats counters on load
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroStats(prev => {
        return {
          trades: prev.trades < 25000 ? prev.trades + 500 : 25000,
          volume: prev.volume < 150 ? prev.volume + 3 : 150,
          users: prev.users < 10000 ? prev.users + 200 : 10000
        };
      });
    }, 30);
    
    // Clear interval when all numbers reach max
    if (heroStats.trades === 25000 && 
        heroStats.volume === 150 && 
        heroStats.users === 10000) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [heroStats]);
  
  // Animation styles
  const titleStyle = useFadeIn(100);
  const subtitleStyle = useFadeIn(300);
  const ctaStyle = useFadeIn(500);
  const statsStyle = useFadeIn(700);
  const imageStyle = useFadeIn(400);
  
  return (
    <div className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-transparent dark:from-accent/10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left lg:pr-8">
            <div 
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6"
              style={useFadeIn(0)}
            >
              Decentralized P2P Exchange
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
              style={titleStyle}
            >
              Trade Crypto <span className="text-primary">Securely</span> Without Intermediaries
            </h1>
            
            <p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              style={subtitleStyle}
            >
              Buy and sell cryptocurrencies directly with other users through our secure escrow-based platform. No middlemen, no excessive fees.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12" style={ctaStyle}>
              <Button size="lg" className="group font-medium text-base">
                Start Trading
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="font-medium text-base">
                Explore Features
              </Button>
            </div>
            
            {/* Stats Row */}
            <div 
              className="grid grid-cols-3 gap-4 text-center lg:text-left"
              style={statsStyle}
            >
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-display font-bold">
                  {heroStats.trades.toLocaleString()}+
                </p>
                <p className="text-sm text-muted-foreground">Trades Completed</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-display font-bold">
                  ${heroStats.volume.toLocaleString()}M+
                </p>
                <p className="text-sm text-muted-foreground">Trading Volume</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-display font-bold">
                  {heroStats.users.toLocaleString()}+
                </p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Hero Image/Illustration */}
          <div className="relative" style={imageStyle}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-primary/5 animate-pulse-soft" />
            </div>
            
            {/* Main Platform Preview */}
            <div className="relative bg-card shadow-card rounded-xl p-4 border border-border backdrop-blur-sm glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Live Exchange</h3>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  Active
                </span>
              </div>
              
              {/* Preview Content */}
              <div className="space-y-4">
                {/* Top currencies */}
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="col-span-2 font-medium">Currency</div>
                  <div className="text-right font-medium">Price</div>
                  <div className="text-right font-medium">Change</div>
                  
                  <div className="col-span-2 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-crypto-bitcoin flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">₿</span>
                    </div>
                    <span>Bitcoin</span>
                  </div>
                  <div className="text-right">$43,156</div>
                  <div className="text-right text-green-500">+2.4%</div>
                  
                  <div className="col-span-2 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-crypto-ethereum flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">Ξ</span>
                    </div>
                    <span>Ethereum</span>
                  </div>
                  <div className="text-right">$2,897</div>
                  <div className="text-right text-red-500">-0.8%</div>
                </div>
                
                {/* Feature cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-secondary p-3 rounded-lg">
                    <Shield className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs font-medium">Escrow Protection</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <Shuffle className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs font-medium">P2P Trading</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <BarChart2 className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs font-medium">Analytics</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-1/4 -left-12 bg-card p-3 rounded-lg shadow-lg border border-border glass animate-bounce" style={{ animationDuration: '10s' }}>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-crypto-binance flex items-center justify-center">
                  <span className="text-black text-xs font-bold">BNB</span>
                </div>
                <div>
                  <p className="text-sm font-medium">BNB</p>
                  <p className="text-xs text-green-500">+3.2%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 -right-6 bg-card p-3 rounded-lg shadow-lg border border-border glass animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-crypto-tether flex items-center justify-center">
                  <span className="text-white text-xs font-bold">USDT</span>
                </div>
                <div>
                  <p className="text-sm font-medium">USDT</p>
                  <p className="text-xs text-muted-foreground">$1.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
