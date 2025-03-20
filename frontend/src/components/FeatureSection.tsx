import { 
  ArrowRight, 
  Shield, 
  UserCog, 
  LineChart, 
  Globe,
  Lock,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';
import { useFadeIn } from '@/utils/animations';

interface FeatureSectionProps {
  onGetStarted: () => void;
}

const FeatureSection = ({ onGetStarted }: FeatureSectionProps) => {
  // Features data
  const features = [
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: 'Escrow-Based Trading',
      description: 'Our smart contract escrow system ensures secure transactions between buyers and sellers with no third-party involvement.'
    },
    {
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      title: 'Multiple Payment Methods',
      description: 'Support for bank transfers, credit cards, PayPal, and other regional payment options for fiat-to-crypto exchanges.'
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: 'Cross-Chain Support',
      description: 'Trade across multiple blockchains including Ethereum, Binance Smart Chain, and Polygon with optimized gas fees.'
    },
    {
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: 'Advanced Security',
      description: 'State-of-the-art security with 2FA, Web3 wallet integration, and encrypted communications for maximum protection.'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" style={useFadeIn(0)}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Powerful Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our decentralized exchange comes packed with everything you need for secure crypto trading
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12" style={useFadeIn(800)}>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="group"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
