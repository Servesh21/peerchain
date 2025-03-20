
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import EscrowSection from '@/components/EscrowSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  
  // Handle scroll button click
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      window.scrollTo({
        top: featuresSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Handle auth modal
  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  };
  
  return (
    <>
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection onGetStarted={() => openAuthModal('register')}/>
        
        {/* Features Section */}
        <FeatureSection onGetStarted={() => openAuthModal('register')} />
        
        {/* Escrow Explainer Section */}
        <EscrowSection />
        
        {/* CTA Section */}
        <CTASection 
          onRegister={() => openAuthModal('register')}
          onLogin={() => openAuthModal('login')}
        />
        
        {/* Footer */}
        <Footer />
      </main>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultTab={authTab}
      />
    </>
  );
};

export default Index;
