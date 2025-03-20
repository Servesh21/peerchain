
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  LogIn, Mail, Lock, User, UserPlus, Eye, EyeOff, X, Wallet,
  Shield
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating auth success
    console.log('Authentication submitted:', { email, password });
    
    // Close the modal after "successful" auth
    setTimeout(() => {
      onClose();
    }, 1000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-display">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription>
            {activeTab === 'login' 
              ? 'Sign in to access your account and portfolio.'
              : 'Join thousands of traders on our secure platform.'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" className="flex items-center">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <button 
                      type="button" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" type="button" className="flex items-center justify-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  MetaMask
                </Button>
                <Button variant="outline" type="button" className="flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  WalletConnect
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <Input 
                      id="reg-name" 
                      type="text" 
                      placeholder="John Doe"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="name@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input 
                      id="reg-password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" type="button" className="flex items-center justify-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  MetaMask
                </Button>
                <Button variant="outline" type="button" className="flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  WalletConnect
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" className="w-full sm:w-auto" onClick={handleSubmit}>
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
