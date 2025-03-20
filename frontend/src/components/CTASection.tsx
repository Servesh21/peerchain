
import { Button } from '@/components/ui/button';
import { UserCog, Wallet } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface CTASectionProps {
  onRegister?: () => void;
  onLogin?: () => void;
}

const CTASection = ({ onRegister, onLogin }: CTASectionProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  
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
        <div className="text-center max-w-3xl mx-auto" style={useFadeIn(0)}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Start Trading Crypto Peer-to-Peer?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Join thousands of users already trading securely on our platform. Create your account in minutes and start your crypto journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="text-base font-medium group"
                onClick={handleDashboard}
              >
                <Wallet className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="text-base font-medium group"
                  onClick={handleRegister}
                >
                  <UserCog className="mr-2 h-5 w-5" />
                  Create Free Account
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-base font-medium"
                  onClick={handleLogin}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Sign In
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
