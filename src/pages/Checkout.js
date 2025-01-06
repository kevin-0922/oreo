import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { getCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const steps = ["運送資訊", "付款方式", "確認訂單"];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        console.log(response);
        setCartItems(response || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  // 運送資訊表單狀態
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // 付款方式狀態
  const [paymentMethod, setPaymentMethod] = useState("");

  // 表單錯誤狀態
  const [errors, setErrors] = useState({});

  const { cart = [] } = useCart();

  // 計算總金額
  const shippingFee = 60; // 運費

  // 處理運送資訊表單變更
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 清除該欄位的錯誤訊息
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // 驗證運送資訊
  const validateShippingInfo = () => {
    const newErrors = {};
    if (!shippingInfo.name) newErrors.name = "請輸入姓名";
    if (!shippingInfo.phone) newErrors.phone = "請輸入電話";
    if (!shippingInfo.email) newErrors.email = "請輸入電子郵件";
    if (!shippingInfo.address) newErrors.address = "請輸入地址";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 驗證付款方式
  const validatePaymentMethod = () => {
    if (!paymentMethod) {
      setErrors({ payment: "請選擇付款方式" });
      return false;
    }
    return true;
  };

  // 添加確認付款處理函數
  const handleConfirmPayment = async () => {
    try {
      setSubmitLoading(true);
      const orderData = {
        // "shippingInfo": shippingInfo,
        // "paymentMethod": paymentMethod,
        // "items": cartItems,
        // "totalAmount": calculateTotal() + shippingFee
        name: shippingInfo.name,
        phone: shippingInfo.phone,
        email: shippingInfo.email,
        address: shippingInfo.address,
      };

      const orderDataALL = {
        shippingInfo: shippingInfo,
        paymentMethod: paymentMethod,
        items: cartItems,
        totalAmount: calculateTotal() + shippingFee,
      };
      console.log(orderData);

      const response = await axiosInstance.post("/api/order/", orderData);

      if (response.data.status === "SUCCESS") {
        alert("訂單建立成功");
        // 清空購物車並導向訂單確認頁面
        navigate("/order-confirmation", {
          state: {
            orderId: response.data.orderId,
            orderDetails: orderDataALL,
          },
        });
      } else {
        alert("訂單建立失敗，請稍後再試");

        setSubmitLoading(false);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("訂單建立失敗，請稍後再試");
      setSubmitLoading(false);
    }
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
        // 最後確認步驟，執行確認付款
        handleConfirmPayment();
        return; // 直接返回，不執行後續的 setActiveStep
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
                      setErrors((prev) => ({ ...prev, payment: "" }));
                    }}
                  >
                    <FormControlLabel value="cashOnDelivery" control={<Radio />} label="取貨付款" />
                  </RadioGroup>
                  {errors.payment && <FormHelperText>{errors.payment}</FormHelperText>}
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
                  <Typography>
                    付款方式：
                    {paymentMethod === "cashOnDelivery" ? "取貨付款" : ""}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                {activeStep > 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    上一步
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1 && submitLoading}
                >
                  {activeStep === steps.length - 1
                    ? submitLoading
                      ? "處理中..."
                      : "確認付款"
                    : "下一步"}
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
                    <Typography>NT$ {item.price * item.quantity}</Typography>
                  </ListItem>
                ))}

                <Divider sx={{ my: 2 }} />

                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="小計" />
                  <Typography>NT$ {calculateTotal()}</Typography>
                </ListItem>

                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="運費" />
                  <Typography>NT$ {shippingFee}</Typography>
                </ListItem>

                <Divider sx={{ my: 2 }} />

                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary={<Typography variant="h6">總計</Typography>} />
                  <Typography variant="h6" color="primary">
                    NT$ {calculateTotal() + shippingFee}
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
