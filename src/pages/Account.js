import React from 'react';
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

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function Account() {
  const [tabValue, setTabValue] = React.useState(0);

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
          <Tab label="付款方式" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="姓名" defaultValue="王小明" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="電話" defaultValue="0912-345-678" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="電子郵件"
                defaultValue="example@mail.com"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="地址"
                defaultValue="台北市信義區信義路五段7號"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained">儲存變更</Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>訂單編號</TableCell>
                  <TableCell>日期</TableCell>
                  <TableCell>金額</TableCell>
                  <TableCell>狀態</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3].map((order) => (
                  <TableRow key={order}>
                    <TableCell>#{order}2345</TableCell>
                    <TableCell>2024/03/20</TableCell>
                    <TableCell>NT$ 999</TableCell>
                    <TableCell>已送達</TableCell>
                    <TableCell>
                      <Button size="small">查看詳情</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                已儲存的付款方式
              </Typography>
              {/* 付款方式列表 */}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained">新增付款方式</Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Account; 