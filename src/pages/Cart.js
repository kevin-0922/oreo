import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: parseInt(quantity) },
    });
  };

  const handleRemoveItem = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id,
    });
  };

  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        購物車
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {state.items.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.image}
                    alt={item.name}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1" color="primary">
                      NT$ {item.price}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => 
                          handleUpdateQuantity(item.id, e.target.value)
                        }
                        sx={{ width: 80 }}
                      />
                      <IconButton 
                        color="error" 
                        sx={{ ml: 2 }}
                        onClick={() => handleRemoveItem(item.id)}
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
              disabled={state.items.length === 0}
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