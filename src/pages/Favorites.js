import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavorite } from '../context/FavoriteContext';

function Favorites() {
  const { favorites, toggleFavorite } = useFavorite();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          您還沒有收藏任何商品
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          去逛逛
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        我的收藏
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'white',
                  }}
                  onClick={() => toggleFavorite(product)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  NT$ {product.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  查看詳情
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Favorites; 