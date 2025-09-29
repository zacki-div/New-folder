import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// État initial
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Actions
const authActions = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case authActions.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case authActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case authActions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Créer le contexte
const AuthContext = createContext();

// Provider du contexte
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialiser l'authentification au démarrage
  useEffect(() => {
    const initAuth = async () => {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      
      try {
        const isAuthenticated = await authService.initialize();
        
        if (isAuthenticated) {
          const user = authService.getCurrentUser();
          dispatch({ type: authActions.LOGIN_SUCCESS, payload: user });
        } else {
          dispatch({ type: authActions.LOGOUT });
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        dispatch({ type: authActions.LOGOUT });
      } finally {
        dispatch({ type: authActions.SET_LOADING, payload: false });
      }
    };

    initAuth();
  }, []);

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const handleAuthStateChange = (event) => {
      const { isAuthenticated, user } = event.detail;
      
      if (isAuthenticated) {
        dispatch({ type: authActions.LOGIN_SUCCESS, payload: user });
      } else {
        dispatch({ type: authActions.LOGOUT });
      }
    };

    const handleProfileUpdate = (event) => {
      const { user } = event.detail;
      dispatch({ type: authActions.UPDATE_USER, payload: user });
    };

    window.addEventListener('auth_state_changed', handleAuthStateChange);
    window.addEventListener('profile_updated', handleProfileUpdate);

    return () => {
      window.removeEventListener('auth_state_changed', handleAuthStateChange);
      window.removeEventListener('profile_updated', handleProfileUpdate);
    };
  }, []);

  // Actions
  const login = async (email, password) => {
    dispatch({ type: authActions.SET_LOADING, payload: true });
    dispatch({ type: authActions.CLEAR_ERROR });
    
    try {
      const response = await authService.login(email, password);
      // L'événement auth_state_changed se chargera de mettre à jour l'état
      return response;
    } catch (error) {
      dispatch({ type: authActions.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: authActions.SET_LOADING, payload: true });
    dispatch({ type: authActions.CLEAR_ERROR });
    
    try {
      const response = await authService.register(userData);
      // L'événement auth_state_changed se chargera de mettre à jour l'état
      return response;
    } catch (error) {
      dispatch({ type: authActions.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    dispatch({ type: authActions.SET_LOADING, payload: true });
    
    try {
      await authService.logout();
      // L'événement auth_state_changed se chargera de mettre à jour l'état
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Forcer la déconnexion locale même en cas d'erreur
      dispatch({ type: authActions.LOGOUT });
    }
  };

  const updateProfile = async (profileData) => {
    dispatch({ type: authActions.CLEAR_ERROR });
    
    try {
      const response = await authService.updateProfile(profileData);
      // L'événement profile_updated se chargera de mettre à jour l'état
      return response;
    } catch (error) {
      dispatch({ type: authActions.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    dispatch({ type: authActions.CLEAR_ERROR });
    
    try {
      const response = await authService.changePassword(currentPassword, newPassword);
      return response;
    } catch (error) {
      dispatch({ type: authActions.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: authActions.CLEAR_ERROR });
  };

  // Valeur du contexte
  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  
  return context;
};

export default AuthContext;
