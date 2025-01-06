import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';

function OrderConfirmation() {
  const location = useLocation();
  const { orderId, orderDetails } = location.state || {};

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          訂單確認
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          訂單編號：{orderId}
        </Typography>
        
        {/* 顯示訂單詳細資訊 */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            運送資訊
          </Typography>
          <Typography>收件人：{orderDetails?.shippingInfo?.name}</Typography>
          <Typography>電話：{orderDetails?.shippingInfo?.phone}</Typography>
          <Typography>地址：{orderDetails?.shippingInfo?.address}</Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            付款資訊
          </Typography>
          <Typography>
            付款方式：{orderDetails?.paymentMethod === 'cashOnDelivery' ? '取貨付款' : ''}
          </Typography>
          <Typography>總金額：NT$ {orderDetails?.totalAmount}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OrderConfirmation; 