import React, { createContext, useState } from 'react';
import { signupUser, loginUser, setAuthToken } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, username: null });

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      const { token, refresh_token, username: returnedUsername } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('username', returnedUsername);
      setAuth({ isAuthenticated: true, token, username: returnedUsername });
      setAuthToken(token);
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, message: 'Login not successful' };
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await signupUser(username, password);
      const { token, refresh_token, username: returnedUsername } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('username', returnedUsername);
      setAuth({ isAuthenticated: true, token, username: returnedUsername });
      setAuthToken(token);
      return { success: true };
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      return { success: false, message: 'Signup not successful' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setAuth({ isAuthenticated: false, username: null });

    window.location.href = '/login'; 
  };
  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
