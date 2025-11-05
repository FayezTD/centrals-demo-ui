/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, LoginCredentials } from '../types';
import authService from '../services/authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      const user = authService.getUser();

      if (token && user) {
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.success) {
        const user = authService.getUser();
        const token = authService.getToken();
        
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });

        return { success: true, message: response.message || 'Login successful' };
      }

      return { success: false, message: response.message || 'Login failed' };
    } catch (error: any) {
      return { success: false, message: error.message || 'An error occurred during login' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const checkAuth = async (): Promise<boolean> => {
    const isValid = await authService.checkSession();
    if (!isValid) {
      await logout();
    }
    return isValid;
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};