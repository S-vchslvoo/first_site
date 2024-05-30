import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') === 'true');

  const setUserIsAdmin = (isAdmin) => {
    setIsAdmin(isAdmin);
    localStorage.setItem('admin', isAdmin.toString());
  };

  const handleSuccessfulLogin = (token, userId, isAdmin) => {
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
    if (isAdmin !== undefined) {
      setUserIsAdmin(isAdmin);
    }
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
  };

  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    setAuthHeader(token);

    return () => {
      setAuthHeader(null);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, userId, handleSuccessfulLogin, handleLogout, setUserIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext, useAuth };
