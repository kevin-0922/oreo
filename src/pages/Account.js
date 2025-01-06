import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

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
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});


const Account = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      console.log("開始取得訂單");
      try {
        const response = await axiosInstance.get('/api/order');
        console.log(response.data);
        if (response.data.status === "SUCCESS" && Array.isArray(response.data.data)) {
          setOrder(response.data.data);
          console.log(response.data.data);
        } else {
          setOrder([]);
        }
      } catch (error) {
        console.error('Order list failed:', error);
        setOrder([]);
      }
    };

    if (user) {
      getOrder();
    }
  }, [user]);

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
              <TextField 
                fullWidth 
                label="姓名" 
                value={user?.name || ''}
                disabled 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="電話" 
                value={user?.phone || ''} 
                disabled 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="電子郵件"
                value={user?.email || ''}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="地址"
                value={user?.address || ''}
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
                {Array.isArray(order) && order.length > 0 ? (
                  order.map((orderItem) => (
                    <TableRow key={orderItem.id}>
                      <TableCell>{orderItem.id}</TableCell>
                      <TableCell>{new Date(orderItem.date).toLocaleDateString('zh-TW')}</TableCell>
                      <TableCell>{orderItem.shipDate?orderItem.shipDate:'準備中'}</TableCell>
                      <TableCell>{orderItem.totalPrice}</TableCell>
                      <TableCell>{orderItem.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      尚無訂單記錄
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

 
      </Paper>
    </Container>
  );
}

export default Account; 