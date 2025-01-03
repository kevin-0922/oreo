import React from 'react';
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
} from '@mui/material';

const steps = ['運送資訊', '付款方式', '確認訂單'];

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
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
                    <TextField fullWidth label="姓名" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="電話" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="電子郵件" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="地址" required />
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && (
                <FormControl component="fieldset">
                  <FormLabel component="legend">付款方式</FormLabel>
                  <RadioGroup defaultValue="credit">
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label="信用卡"
                    />
                    <FormControlLabel
                      value="transfer"
                      control={<Radio />}
                      label="銀行轉帳"
                    />
                  </RadioGroup>
                </FormControl>
              )}

              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    訂單明細
                  </Typography>
                  {/* 訂單明細內容 */}
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
              {/* 訂單摘要內容 */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Checkout; 