import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.200', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              關於我們
            </Typography>
            <Typography variant="body2" color="text.secondary">
              我們致力於提供最優質的購物體驗
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              客戶服務
            </Typography>
            <Link component={RouterLink} to="/" color="text.secondary">
              隱私政策
            </Link>
            <br />
            <Link component={RouterLink} to="/" color="text.secondary">
              服務條款
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              聯絡我們
            </Typography>
            <Typography variant="body2" color="text.secondary">
              電話：(02) 1234-5678
              <br />
              Email：otterbossvic@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer; 