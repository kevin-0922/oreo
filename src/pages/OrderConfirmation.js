import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OrderConfirmation() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          訂單已確認
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          感謝您的購買！您的訂單編號是 #12345
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            預計送達時間
          </Typography>
          <Typography variant="body1" color="text.secondary">
            2024年3月25日
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              運送資訊
            </Typography>
            <Typography variant="body1" color="text.secondary">
              王小明
              <br />
              台北市信義區信義路五段7號
              <br />
              電話：0912-345-678
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              付款資訊
            </Typography>
            <Typography variant="body1" color="text.secondary">
              信用卡付款
              <br />
              卡號末四碼：1234
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/account"
          >
            查看訂單
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/products"
          >
            繼續購物
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default OrderConfirmation; 