
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, ChevronDown, LogIn, User, Bell, Sun, Moon,
  Wallet, Shield, BarChart2, LogOut, Settings, UserCog
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Navigate to sign in page
  const handleSignIn = () => {
    navigate('/signin');
  };

  // Navigate to sign in page with register tab active
  const handleGetStarted = () => {
    navigate('/signin');
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Get user initial for avatar
  const getUserInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : '?';
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm border-b border-border'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-xl">PeerChain</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/trade" active={location.pathname === "/trade"}>
            Trade
          </NavLink>
          <NavLink to="/dashboard" active={location.pathname === "/dashboard"}>
            Dashboard
          </NavLink>
        </div>
        
        {/* Auth Buttons & Theme Switch */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 rounded-full hover:bg-secondary transition-colors p-1">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">{getUserInitial()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/trade')}>
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>My Trades</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" className="flex items-center" onClick={handleSignIn}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </Button>
              
              <Button className="animate-pulse-soft" onClick={handleGetStarted}>
                Get Started
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {isAuthenticated && (
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">{getUserInitial()}</AvatarFallback>
            </Avatar>
          )}
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 pt-20 pb-6 px-6 bg-background z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/trade" label="Trade" />
          <MobileNavLink to="/dashboard" label="Dashboard" />
          
          <div className="border-t border-border my-2 pt-2"></div>
          
          <MobileDropdownItem icon={<Shield className="h-5 w-5" />} label="Escrow System" />
          <MobileDropdownItem icon={<User className="h-5 w-5" />} label="Arbitration" />
          <MobileDropdownItem icon={<BarChart2 className="h-5 w-5" />} label="Analytics" />
          
          <div className="border-t border-border my-2 pt-2"></div>
          
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-4 py-3">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="bg-primary text-primary-foreground">{getUserInitial()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
              
              <MobileNavLink to="/settings" label="Settings" />
              
              <Button 
                variant="outline" 
                className="w-full justify-center mt-2" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full justify-center" onClick={handleSignIn}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              
              <Button className="w-full justify-center animate-pulse-soft" onClick={handleGetStarted}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({ 
  to, 
  active, 
  children 
}: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg transition-colors ${
      active 
        ? 'text-foreground bg-secondary' 
        : 'text-foreground/80 hover:text-foreground hover:bg-secondary/60'
    }`}
  >
    {children}
  </Link>
);

// Desktop Dropdown Item Component
const DropdownItem = ({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode; 
  label: string;
}) => (
  <Link
    to="#"
    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
  >
    <span className="mr-2 text-muted-foreground">{icon}</span>
    {label}
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ 
  to, 
  label 
}: { 
  to: string; 
  label: string;
}) => (
  <Link
    to={to}
    className="px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-lg font-medium"
  >
    {label}
  </Link>
);

// Mobile Dropdown Item Component
const MobileDropdownItem = ({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode; 
  label: string;
}) => (
  <Link
    to="#"
    className="flex items-center px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
  >
    <span className="mr-3 text-primary">{icon}</span>
    <span className="text-lg">{label}</span>
  </Link>
);

export default Navbar;
