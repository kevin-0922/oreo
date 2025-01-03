import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  // 從 localStorage 讀取收藏
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // 保存收藏到 localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === product.id);
      if (exists) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
} 