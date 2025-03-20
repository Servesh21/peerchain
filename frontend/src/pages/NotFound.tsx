
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="text-center max-w-md">
        <div className="mx-auto h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        
        <h1 className="text-5xl font-display font-bold mb-3">404</h1>
        <p className="text-xl text-foreground mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
