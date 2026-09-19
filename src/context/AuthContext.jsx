import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('aestic_token') || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const userData = await apiCall('/auth/me');
          setUser(userData);
        } catch (err) {
          console.warn('Session expired or invalid token');
          logout();
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      localStorage.setItem('aestic_token', data.token);
      setUser(data);
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    setAuthError(null);
    try {
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      setToken(data.token);
      localStorage.setItem('aestic_token', data.token);
      setUser(data);
      return data;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('aestic_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authError,
        setAuthError,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
