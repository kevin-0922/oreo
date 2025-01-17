import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, searchProducts } from '../services/productService';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Pagination,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      const categoryNames = response.data.data.map(category => category.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };
  fetchCategories();
}, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(page);
        let filteredProducts = data.products;
        
        // 在前端進行搜尋過濾
        if (searchQuery) {
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // 根據選中的分類過濾商品
        if (selectedCategories.length > 0) {
          filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
          );
        }

        // 只顯示前四個商品
        const limitedProducts = filteredProducts.slice(0, 100);
        
        setProducts(limitedProducts);
        setTotalPages(Math.ceil(data.total / 20));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategories, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setPage(1); // 重置頁碼
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // 重置頁碼
  };

  if (loading) return (
    <Container sx={{ py: 4 }}>
      <Typography>載入中...</Typography>
    </Container>
  );

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* 過濾側邊欄 */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              商品分類
            </Typography>
            <FormGroup>
              {Array.isArray(categories) && categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </Card>
        </Grid>

        {/* 商品列表 */}
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            placeholder="搜尋商品..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ mb: 3 }}
          />
          
          {!Array.isArray(products) || products.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              沒有找到相關商品
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {Array.isArray(products) && products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography 
                          gutterBottom 
                          variant="h6" 
                          sx={{
                            height: '64px',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            mt: 1
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {product.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          NT$ {product.price}
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          查看詳情
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductList; 