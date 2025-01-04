import React from 'react';
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

function Favorites() {
  const { favorites, setFavorites, loading } = useFavorite();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    try {
      await removeFromFavorite(productId);
      // 從本地狀態移除
      setFavorites(prev => prev.filter(item => item.id !== productId));
      alert('商品已從收藏移除');
    } catch (error) {
      console.error('移除收藏失敗:', error);
      alert('移除收藏失敗，請稍後再試');
    }
  };

  if (loading) return <div>載入中...</div>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        我的收藏
      </Typography>
      {favorites.length === 0 ? (
        <Typography>尚無收藏商品</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
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
                      onClick={() => navigate(`/products/${product.id}`)}
                      sx={{ mr: 1 }}
                    >
                      查看詳情
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(product.id)}
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