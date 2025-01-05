import React, { useEffect, useState } from 'react';
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
  Skeleton,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getProducts } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useFavorite } from '../context/FavoriteContext';
import BundlesHeader from '../img/Bundles_header.png';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorite();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products } = await getProducts();
        setFeaturedProducts(products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
          backgroundImage: `url(${BundlesHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <Typography variant="h2" gutterBottom>
            歡迎光臨我們的Oreo樂趣屋
          </Typography>
          <Typography variant="h5">
            發現最新的商品和優惠
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
            onClick={() => navigate('/products')}
          >
            立即購物
          </Button>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          熱門商品
        </Typography>
        <Grid container spacing={4}>
        
          {loading
            ? Array.from(new Array(4)).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : featuredProducts.slice(0, 4).map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <Card>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                      />
                      {user && (
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'white',
                          }}
                          onClick={() => toggleFavorite(product)}
                        >
                          
                        </IconButton>
                      )}
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
                        color="primary"
                        sx={{ mt: 2 }}
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
    </>
  );
}

export default Home; 