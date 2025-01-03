import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始檢查登入狀態
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check', { 
          withCredentials: true 
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Authentication check failed');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 登入
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', 
        { email, password }, 
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response?.data?.message || '登入失敗');
    }
  };

  // 登出
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { 
        withCredentials: true 
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 