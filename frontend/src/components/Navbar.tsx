import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, ChevronDown, LogIn, User, Bell, Sun, Moon,
  Wallet, Shield, BarChart2, LogOut, Settings, UserCog
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user, isAuthenticated, logout } = useAuth();
  
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
  
  // Navigate to registration page
  const handleGetStarted = () => {
    navigate('/signin');
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Get user initial for avatar
  const getUserInitial = () => {
    if (!user?.username) return '?';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm border-b border-border'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-xl">PeerChain</span>
        </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 ml-10">
            <NavLink to="/" active={location.pathname === '/'}>
              Home
            </NavLink>
            
            {/* Show these links only when authenticated */}
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>
                  Dashboard
                </NavLink>
                <NavLink to="/trade" active={location.pathname === '/trade'}>
                  Trade
                </NavLink>
              </>
            )}
          </div>

          {/* Right Side Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6 ml-auto">
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-base">
                      No new notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-base">{getUserInitial()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-base">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/dashboard">
                      <DropdownItem icon={<BarChart2 className="h-5 w-5" />} label="Dashboard" />
                    </Link>
                    <Link to="/wallet">
                      <DropdownItem icon={<Wallet className="h-5 w-5" />} label="Wallet" />
                    </Link>
                    <Link to="/settings">
                      <DropdownItem icon={<Settings className="h-5 w-5" />} label="Settings" />
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 text-base">
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Button variant="ghost" onClick={handleSignIn} className="text-base">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
                <Button onClick={handleGetStarted} className="text-base">
                  Get Started
                </Button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" label="Home" />
              {isAuthenticated && (
                <>
                  <MobileNavLink to="/dashboard" label="Dashboard" />
                  <MobileNavLink to="/trade" label="Trade" />
                </>
              )}
              
              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getUserInitial()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.username}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link to="/dashboard">
                        <MobileDropdownItem icon={<BarChart2 className="h-4 w-4" />} label="Dashboard" />
                      </Link>
                      <Link to="/wallet">
                        <MobileDropdownItem icon={<Wallet className="h-4 w-4" />} label="Wallet" />
                      </Link>
                      <Link to="/settings">
                        <MobileDropdownItem icon={<Settings className="h-4 w-4" />} label="Settings" />
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-500"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" onClick={handleSignIn}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                    <Button className="w-full" onClick={handleGetStarted}>
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper Components
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
    className={`text-base font-medium transition-colors hover:text-primary ${
      active ? 'text-primary' : 'text-muted-foreground'
    }`}
  >
    {children}
  </Link>
);

const DropdownItem = ({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode; 
  label: string;
}) => (
  <DropdownMenuItem>
    <span className="flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </span>
  </DropdownMenuItem>
);

const MobileNavLink = ({ 
  to, 
  label 
}: { 
  to: string; 
  label: string;
}) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
  >
    {label}
  </Link>
);

const MobileDropdownItem = ({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode; 
  label: string;
}) => (
  <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary">
    {icon}
    <span>{label}</span>
  </button>
);

export default Navbar;
