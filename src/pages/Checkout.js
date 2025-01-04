import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useCart } from '../context/CartContext';


const steps = ['運送資訊', '付款方式', '確認訂單'];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  
  // 運送資訊表單狀態
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  
  // 付款方式狀態
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // 表單錯誤狀態
  const [errors, setErrors] = useState({});

  const { cart = [] } = useCart();
  
  // 計算總金額
  const subtotal = (cart || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 60;  // 運費
  const total = subtotal + shippingFee;  // 總計

  // 處理運送資訊表單變更
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 驗證運送資訊
  const validateShippingInfo = () => {
    const newErrors = {};
    if (!shippingInfo.name) newErrors.name = '請輸入姓名';
    if (!shippingInfo.phone) newErrors.phone = '請輸入電話';
    if (!shippingInfo.email) newErrors.email = '請輸入電子郵件';
    if (!shippingInfo.address) newErrors.address = '請輸入地址';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 驗證付款方式
  const validatePaymentMethod = () => {
    if (!paymentMethod) {
      setErrors({ payment: '請選擇付款方式' });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    let canProceed = false;

    switch (activeStep) {
      case 0:
        canProceed = validateShippingInfo();
        break;
      case 1:
        canProceed = validatePaymentMethod();
        break;
      case 2:
        // 最後確認步驟，可以直接進行
        canProceed = true;
        break;
      default:
        break;
    }

    if (canProceed) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        結帳
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {activeStep === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="姓名"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleShippingInfoChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="電話"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="電子郵件"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="地址"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      required
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && (
                <FormControl component="fieldset" error={!!errors.payment}>
                  <FormLabel component="legend">付款方式</FormLabel>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setErrors(prev => ({ ...prev, payment: '' }));
                    }}
                  >
                    <FormControlLabel
                      value="cashOnDelivery"
                      control={<Radio />}
                      label="取貨付款"
                    />
                  </RadioGroup>
                  {errors.payment && (
                    <FormHelperText>{errors.payment}</FormHelperText>
                  )}
                </FormControl>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    訂單明細
                  </Typography>
                  <Typography>姓名：{shippingInfo.name}</Typography>
                  <Typography>電話：{shippingInfo.phone}</Typography>
                  <Typography>電子郵件：{shippingInfo.email}</Typography>
                  <Typography>地址：{shippingInfo.address}</Typography>
                  <Typography>付款方式：
                    {paymentMethod === 'cashOnDelivery' ? '取貨付款' : ''}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                {activeStep > 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    上一步
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? undefined : handleNext}
                >
                  {activeStep === steps.length - 1 ? '確認付款' : '下一步'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                訂單摘要
              </Typography>
              <List>
                {(cart || []).map((item) => (
                  <ListItem key={item.id} sx={{ py: 1 }}>
                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          {item.name} × {item.quantity}
                        </Typography>
                      }
                    />
                    <Typography>
                      NT$ {item.price * item.quantity}
                    </Typography>
                  </ListItem>
                ))}
                
                <Divider sx={{ my: 2 }} />
                
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="小計" />
                  <Typography>
                    NT$ {subtotal}
                  </Typography>
                </ListItem>
                
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="運費" />
                  <Typography>
                    NT$ {shippingFee}
                  </Typography>
                </ListItem>
                
                <Divider sx={{ my: 2 }} />
                
                <ListItem sx={{ py: 1 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="h6">
                        總計
                      </Typography>
                    }
                  />
                  <Typography variant="h6" color="primary">
                    NT$ {total}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
    </Container>
  );
}

export default Checkout; 