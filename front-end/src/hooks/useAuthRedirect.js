import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const requireAuth = (callback, redirectTo = '/signup') => {
    return (...args) => {
      if (!isAuthenticated) {
        navigate(redirectTo);
        return;
      }
      
      // Si l'utilisateur est connecté, exécuter la fonction originale
      if (callback) {
        return callback(...args);
      }
    };
  };

  const checkAuthAndExecute = (callback, redirectTo = '/signup') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    
    if (callback) {
      callback();
    }
    return true;
  };

  return {
    requireAuth,
    checkAuthAndExecute,
    isAuthenticated
  };
};
