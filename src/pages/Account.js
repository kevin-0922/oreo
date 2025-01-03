import React, { useEffect , useState} from 'react';

import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';


function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

const Account = () => {
  const data={
      name: "哈哈"  ,
      phone: "0912-345-678",
      email: "example@mail.com",
      address: "台北市信義區信義路五段7號",
    }

  const orderData = [{
    id: "1234567890",
    date: "2024/03/20",
    shipDate: "2024/03/20",
    amount: "NT$ 999",
    status: "已送達",
  },{
    id: "1234567890",
    date: "2024/03/20",
    shipDate: "2024/03/20",
    amount: "NT$ 999",
    status: "已送達",
  }]
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(data);
  const [order, setOrder] = useState(orderData);

useEffect(() => {
  const checkAuth = async () => {
    // try{
    //   const response = await axiosInstance.get('/api/auth/check',{withCredentials: true});
    //   setUser(response.data.user);
    // }catch(error){
    //   console.error('Authentication check failed');
    //   setUser(data);
    // }
    setUser(data);
  }
  const getOrder = async () => {
    try{
      const response = await axiosInstance.get('/api/order/list',{withCredentials: true});
      setOrder(response.data.order);
    }catch(error){
      console.error('Order list failed');
    }
  }
  checkAuth();
  getOrder();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        帳戶設定
      </Typography>

      <Paper sx={{ width: '100%', mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="個人資料" />
          <Tab label="訂單記錄" />
        </Tabs>

        <TabPanel value={tabValue} index={0} >
          <Grid container spacing={3} sx={{ px: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="姓名" defaultValue={user.name} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="電話" defaultValue={user.phone} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="電子郵件"
                defaultValue={user.email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="地址"
                defaultValue={user.address}
                disabled
              />
            </Grid>
            
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>訂單編號</TableCell>
                  <TableCell>訂購日期</TableCell>
                  <TableCell>出貨日期</TableCell>
                  <TableCell>金額</TableCell>
                  <TableCell>狀態</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.shipDate}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

 
      </Paper>
    </Container>
  );
}

export default Account; 