import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook pour faire défiler vers le haut lors des changements de route
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll vers le haut de la page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Animation fluide
    });
  }, [pathname]); // Se déclenche à chaque changement de route
}

export default useScrollToTop;
