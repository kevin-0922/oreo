import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getFavorites } from '../services/productService';

const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // 當用戶登入狀態改變時，重新獲取收藏清單
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const data = await getFavorites();
          setFavorites(data.favorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFavorites([]);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const value = {
    favorites,
    setFavorites,
    loading
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
} 