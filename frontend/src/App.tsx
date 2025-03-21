
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Trade from "./pages/Trade";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import { Pyramid } from "lucide-react";
import Payment from "./pages/payment";

const queryClient = new QueryClient();

const App = () => {
  // Set dark/light mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/payment" element={<Payment/>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
