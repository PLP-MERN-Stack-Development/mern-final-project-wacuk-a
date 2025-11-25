import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import { authAPI } from '../services/api'; // Uncomment when backend is ready

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'patient' | 'doctor';
  county: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app start
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('telemedicine_token');
      if (token) {
        try {
          // TODO: Verify token with backend
          // For now, we'll just clear invalid tokens
          console.log('Found existing token, would verify with backend');
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('telemedicine_token');
        }
      }
      setIsLoading(false);
    };

    checkExistingAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // TODO: Uncomment when backend is ready
      // const response = await authAPI.login(email, password);
      // const { user: userData, token } = response;
      
      // Mock response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        userType: 'patient',
        county: 'Nairobi'
      };
      const mockToken = 'mock_jwt_token';
      
      // In real app: setUser(userData);
      setUser(mockUser);
      localStorage.setItem('telemedicine_token', mockToken);
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      
      // TODO: Uncomment when backend is ready
      // const response = await authAPI.register(userData);
      // const { user: newUser, token } = response;
      
      // Mock response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        userType: userData.userType,
        county: userData.county
      };
      const mockToken = 'mock_jwt_token';
      
      // In real app: setUser(newUser);
      setUser(mockUser);
      localStorage.setItem('telemedicine_token', mockToken);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('telemedicine_token');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
