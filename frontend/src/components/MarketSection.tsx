
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PriceChart from '@/components/PriceChart';
import { useFadeIn } from '@/utils/animations';

const MarketSection = () => {
  return (
    <section className="py-20 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" style={useFadeIn(0)}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Live Market Prices</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with real-time cryptocurrency prices and market trends
          </p>
        </div>
        
        <div className="mb-8" style={useFadeIn(300)}>
          <PriceChart />
        </div>
        
        <div className="text-center" style={useFadeIn(500)}>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="group">
              View Full Market Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
