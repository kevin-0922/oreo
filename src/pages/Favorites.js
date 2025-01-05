import React, { useEffect } from 'react';
import { useFavorite } from '../context/FavoriteContext';
import { removeFromFavorite } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';


function Favorites() {
  const { favorites, loading, refetchFavorites } = useFavorite();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    if (!productId) {
      console.error('無效的商品ID');
      alert('移除收藏失敗，請稍後再試');
      return;
    }

    try {
      const response = await removeFromFavorite(productId);
      if (response.status === "SUCCESS") {
        alert('商品已從收藏移除');
        await refetchFavorites();
      } else {
        throw new Error('移除失敗');
      }
    } catch (error) {
      console.error('移除收藏失敗:', error);
      alert('移除收藏失敗，請稍後再試');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>請先登入以查看收藏清單</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          前往登入
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <div>載入中...</div>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        我的收藏
      </Typography>
      {(!favorites || favorites.length === 0) ? (
        <Box>
          <Typography>尚無收藏商品</Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            去逛逛
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((product) => (
            <Grid item key={product.id || product.productId} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    NT$ {product.price}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/products/${product.id || product.productId}`)}
                      sx={{ mr: 1 }}
                    >
                      查看詳情
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(product.id || product.productId)}
                    >
                      取消收藏
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites; 