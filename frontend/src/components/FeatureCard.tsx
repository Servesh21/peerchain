import { useFadeIn } from '@/utils/animations';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  // Apply staggered animation based on index
  const delay = 300 + (index * 150);
  const animationStyle = useFadeIn(delay);
  
  return (
    <div 
      className="bg-card hover:bg-card/80 border border-border rounded-xl p-6 shadow-subtle hover:shadow-card transition-all duration-300 card-hover"
      style={animationStyle}
    >
      <div className="p-3 rounded-lg bg-primary/10 inline-flex items-center justify-center mb-4">
        {icon}
      </div>
      
      <h3 className="text-xl font-display font-semibold mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
