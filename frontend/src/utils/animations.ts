
import { useEffect, useState } from 'react';

// Fade-in animation for elements as they enter viewport
export const useFadeIn = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  };
};

// Staggered animation for lists of items
export const useStaggered = (index: number, baseDelay: number = 100) => {
  return useFadeIn(baseDelay + (index * 100));
};

// Hover animation for interactive elements
export const getHoverStyles = (defaultScale: number = 1, hoverScale: number = 1.03) => {
  return {
    transform: `scale(${defaultScale})`,
    transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
    ':hover': {
      transform: `scale(${hoverScale})`,
    }
  };
};

// Page transition effect
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

// Pulse animation for loading states
export const usePulse = (isActive: boolean = true) => {
  return isActive ? 'animate-pulse-soft' : '';
};
