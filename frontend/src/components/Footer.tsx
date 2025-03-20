
import { Wallet } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">

        
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PeerChain. All rights reserved.</p>
        </div>
      
    </footer>
  );
};

export default Footer;
