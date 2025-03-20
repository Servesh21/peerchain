
import { useState, useEffect } from 'react';
import { useFadeIn } from '@/utils/animations';
import { Check, ArrowRightCircle, Wallet, CreditCard, ShieldCheck } from 'lucide-react';

const EscrowVisualizer = () => {
  const [step, setStep] = useState(0);
  const maxSteps = 4;
  
  // Animate through steps automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % (maxSteps + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const containerStyle = useFadeIn(300);
  
  return (
    <div 
      className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-subtle relative overflow-hidden"
      style={containerStyle}
    >
      {/* Background effect */}
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="relative">
        <h3 className="text-2xl font-display font-semibold mb-6">How Our Escrow System Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side: steps */}
          <div className="space-y-6">
            <StepItem 
              number={1}
              title="Buyer Initiates Trade"
              description="Buyer selects a sell offer and locks cryptocurrency in the escrow smart contract."
              isActive={step >= 1}
              isCompleted={step > 1}
              icon={<Wallet className="h-5 w-5" />}
            />
            
            <div className="h-10 border-l-2 border-dashed border-border ml-4"></div>
            
            <StepItem 
              number={2}
              title="Seller Confirms"
              description="Seller is notified and accepts the trade request to proceed."
              isActive={step >= 2}
              isCompleted={step > 2}
              icon={<Check className="h-5 w-5" />}
            />
            
            <div className="h-10 border-l-2 border-dashed border-border ml-4"></div>
            
            <StepItem 
              number={3}
              title="Payment Transfer"
              description="Buyer sends fiat payment through their preferred payment method."
              isActive={step >= 3}
              isCompleted={step > 3}
              icon={<CreditCard className="h-5 w-5" />}
            />
            
            <div className="h-10 border-l-2 border-dashed border-border ml-4"></div>
            
            <StepItem 
              number={4}
              title="Release Crypto"
              description="Seller confirms payment receipt, and smart contract releases crypto to buyer."
              isActive={step >= 4}
              isCompleted={step > 4}
              icon={<ShieldCheck className="h-5 w-5" />}
            />
          </div>
          
          {/* Right side: visualization */}
          <div className="bg-secondary rounded-lg p-6 relative min-h-[340px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {step === 0 && (
                <div className="text-center animate-fade-in">
                  <ShieldCheck className="h-16 w-16 text-primary/70 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Secure Escrow Trading</h3>
                  <p className="text-muted-foreground">Our smart contracts ensure your assets are protected during every trade</p>
                </div>
              )}
              
              {step === 1 && (
                <div className="w-full animate-fade-in">
                  <div className="bg-card p-4 rounded-lg border border-border mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-medium">Buy Bitcoin (BTC)</div>
                      <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">Available</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Amount:</div>
                      <div className="text-right font-medium">0.5 BTC</div>
                      <div className="text-muted-foreground">Price:</div>
                      <div className="text-right font-medium">$43,150 USD</div>
                      <div className="text-muted-foreground">Payment:</div>
                      <div className="text-right font-medium">Bank Transfer</div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 flex items-center">
                    <Wallet className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <p className="text-sm">Locking 0.5 BTC in escrow smart contract...</p>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="w-full animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center mr-3">
                        <span className="font-medium">B</span>
                      </div>
                      <div>
                        <p className="font-medium">Buyer</p>
                        <p className="text-xs text-muted-foreground">Rating: 4.9/5</p>
                      </div>
                    </div>
                    
                    <ArrowRightCircle className="h-6 w-6 text-primary mx-2" />
                    
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center mr-3">
                        <span className="font-medium">S</span>
                      </div>
                      <div>
                        <p className="font-medium">Seller</p>
                        <p className="text-xs text-muted-foreground">Rating: 4.8/5</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-border text-center animate-pulse-soft">
                    <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium">Seller Confirmed</p>
                    <p className="text-sm text-muted-foreground mt-1">Trade #BTC-5843 has been accepted by the seller</p>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="w-full animate-fade-in">
                  <div className="bg-card p-4 rounded-lg border border-border mb-4">
                    <h4 className="font-medium mb-3">Payment Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Name:</span>
                        <span className="font-medium">Global Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="font-medium">John D.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium">XXXX-XXXX-8742</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">$21,575.00 USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reference:</span>
                        <span className="font-medium">BTC-5843</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800/30 flex items-center">
                    <CreditCard className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">Please make payment within 30 minutes</p>
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div className="w-full animate-fade-in">
                  <div className="text-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium">Transaction Complete!</h3>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-border space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">Confirmed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono text-xs">0x8Fd72...e39A</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cryptocurrency:</span>
                      <span>0.5 BTC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Value:</span>
                      <span>$21,575.00 USD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Time:</span>
                      <span>Just now</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step item component
const StepItem = ({ 
  number, 
  title, 
  description, 
  isActive,
  isCompleted,
  icon
}: { 
  number: number; 
  title: string; 
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <div className={`flex ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity duration-500`}>
      <div 
        className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-300 ${
          isCompleted
            ? 'bg-primary text-primary-foreground'
            : isActive
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'bg-secondary text-muted-foreground'
        }`}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : number}
      </div>
      <div>
        <div className="flex items-center mb-1">
          <h4 className="font-medium mr-2">{title}</h4>
          <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>
            {icon}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default EscrowVisualizer;
