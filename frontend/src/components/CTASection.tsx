import { Button } from '@/components/ui/button';
import { UserCog, Wallet } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface CTASectionProps {
  onRegister?: () => void;
  onLogin?: () => void;
}

const CTASection = ({ onRegister, onLogin }: CTASectionProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      navigate('/signin');
    }
  };
  
  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/signin');
    }
  };
  
  const handleDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-accent">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders on our secure platform. Start trading with confidence today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" onClick={handleDashboard}>
                <UserCog className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={handleRegister}>
                  <Wallet className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={handleLogin}>
                  Already have an account?
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
