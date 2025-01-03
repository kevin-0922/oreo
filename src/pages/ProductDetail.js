import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/productService';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      },
    });
  };

  if (!product) return <div>載入中...</div>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            NT$ {product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <TextField
              type="number"
              label="數量"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: 100, mr: 2 }}
            />
            <Button 
              variant="contained" 
              size="large"
              onClick={handleAddToCart}
            >
              加入購物車
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            商品評價
          </Typography>
          <List>
            {[1, 2, 3].map((review) => (
              <React.Fragment key={review}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ mr: 2 }}>U</Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" variant="subtitle1" sx={{ mr: 1 }}>
                          用戶 {review}
                        </Typography>
                        <Rating value={5} readOnly size="small" />
                      </Box>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        很好的商品，品質優良...
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail; 