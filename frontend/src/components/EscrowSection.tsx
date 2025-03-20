
import EscrowVisualizer from '@/components/EscrowVisualizer';
import { useFadeIn } from '@/utils/animations';

const EscrowSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" style={useFadeIn(0)}>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Secure Trading with Smart Contracts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our escrow system is built on blockchain technology, ensuring transparent and trustless transactions
          </p>
        </div>
        
        <EscrowVisualizer />
      </div>
    </section>
  );
};

export default EscrowSection;
