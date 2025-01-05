import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Box,
  TextField,
  Divider,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../services/cartService';

function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 獲取購物車內容
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await getCart();
        setCartItems(response.data.items || []);
      } catch (error) {
        setError('無法載入購物車');
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  // 更新商品數量
  const handleUpdateQuantity = async (productId, amount) => {
    try {
      if (amount < 1) return;
      await updateCartItem(productId, amount);
      // 更新本地狀態
      setCartItems(prev => 
        prev.map(item => 
          item.productId === productId 
            ? { ...item, amount: amount }
            : item
        )
      );
    } catch (error) {
      alert('更新數量失敗，請稍後再試');
      console.error('Error updating quantity:', error);
    }
  };

  // 移除商品
  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      // 更新本地狀態
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (error) {
      alert('移除商品失敗，請稍後再試');
      console.error('Error removing item:', error);
    }
  };

  // 計算總金額
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Container sx={{ py: 4 }}>
      <Typography color="error">{error}</Typography>
    </Container>
  );

  if (!isAuthenticated) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>請先登入以查看購物車</Typography>
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

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography gutterBottom>購物車是空的</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          繼續購物
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        購物車
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.productId} sx={{ mb: 2 }}>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.image}
                    alt={item.name}
                    sx={{ objectFit: 'contain' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="primary" gutterBottom>
                      NT$ {item.price}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.amount}
                        onChange={(e) => 
                          handleUpdateQuantity(item.productId, parseInt(e.target.value))
                        }
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ width: 80 }}
                      />
                      <IconButton 
                        color="error" 
                        sx={{ ml: 2 }}
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              訂單摘要
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>小計</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    NT$ {calculateTotal()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>運費</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">NT$ 60</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">總計</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right">
                  NT$ {calculateTotal() + 60}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              onClick={() => navigate('/checkout')}
              disabled={cartItems.length === 0}
            >
              前往結帳
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart; 