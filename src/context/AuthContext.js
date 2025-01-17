import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

  // 初始檢查登入狀態
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/check', { 
          withCredentials: true 
        });
        if (response.data.status === "SUCCESS") {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 登入
  const login = async (email, password) => {
    const data = {
      "email": email,
      "password": password
    }
    console.log("開始登入");
    console.log('API URL:', process.env.REACT_APP_API_URL);
    try {
      console.log(data);
      const response = await axiosInstance.post('/api/auth/login', data, {
        withCredentials: true
      });
      if (response.data.status === "SUCCESS") {
        setUser(response.data.data);
        alert('登入成功');
      } else {
        throw new Error(response.data.message || '登入失敗');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || '登入失敗');
    }
  };

  // 登出
  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout', {}, { 
        withCredentials: true 
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed');
      alert('登出失敗');
    }

  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
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