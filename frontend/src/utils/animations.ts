import { useEffect, useState, useRef } from 'react';

// Fade-in animation for elements as they enter viewport
export const useFadeIn = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: 'translateY(20px)',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            setStyle({
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            });
          }, delay);
          observer.unobserve(entry.target);
          return () => clearTimeout(timeoutId);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return { ref, style };
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
