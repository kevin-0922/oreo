import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById, addProductReview, addToFavorite, removeFromFavorite, getFavorites } from '../services/productService';
import { addToCart } from '../services/cartService';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import { useFavorite } from '../context/FavoriteContext';
import { useAuth } from '../context/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const { favorites = [], setFavorites } = useFavorite();
  const { isAuthenticated, token } = useAuth();
  const isFavorite = product && favorites.some(item => item.productId === product.id);

  useEffect(() => {
    const fetchProductAndFavoriteStatus = async () => {
      try {
        setLoading(true);
        const [productResponse, favoritesResponse] = await Promise.all([
          getProductById(id),
          isAuthenticated ? getFavorites() : Promise.resolve({ data: { data: [] } })
        ]);
        console.log(productResponse);
        setProduct(productResponse.data);
        
        if (isAuthenticated) {
          const favoritesList = favoritesResponse.data.data || [];
          setFavorites(favoritesList);
        }
        
      } catch (error) {
        setError('無法載入商品資訊');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndFavoriteStatus();
  }, [id, setFavorites, isAuthenticated]);
  /*{
    "status": "SUCCESS",
    "message": "取得商品資訊成功",
    "data": {
        "id": 1,
        "name": "巧心蛋糕(192g)",
        "price": 99,
        "categoryId": 1,
        "category": "巧心蛋糕",
        "image": "https://b2eimg.pxec.com.tw/00117705/47c3d5537b614f35b43d9a1013fba29f.png",
        "amount": 20,
        "reviews": []
    }
}*/

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('請先登入');
      return;
    }

    try {
      setSubmitLoading(true);
      await addToCart(product.id, quantity);
      alert('商品已加入購物車');
    } catch (error) {
      alert('加入購物車失敗，請稍後再試');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('請先登入');
      return;
    }

    try {
      setSubmitLoading(true);
      const response = await addProductReview(product.id, reviewRating, reviewComment);
      
      // 更新商品資訊，包含新的評論
      const updatedProductResponse = await getProductById(id);
      setProduct(updatedProductResponse.data);
      
      // 清空表單
      setReviewComment('');
      setReviewRating(5);
      alert('評論已送出');
    } catch (error) {
      console.error('評論送出失敗:', error);
      alert(error.response?.data?.message || '評論送出失敗，請稍後再試');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      alert('請先登入');
      return;
    }

    try {
      if (isFavorite) {
        await removeFromFavorite(product.id);
        // 確保過濾掉已移除的商品
        setFavorites(prev => Array.isArray(prev) ? prev.filter(item => item.productId !== product.id) : []);
        alert('商品已從收藏移除');
      } else {
        await addToFavorite(product.id);
        // 確保新增商品到收藏清單
        setFavorites(prev => Array.isArray(prev) ? [...prev, { 
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        }] : [{
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        }]);
        alert('商品已加入收藏');
      }
    } catch (error) {
      console.error('收藏操作失敗:', error);
      alert('操作失敗，請稍後再試');
    }
  };

  if (loading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>找不到商品</div>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            NT$ {product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <TextField
              type="number"
              label="數量"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: 100, mr: 2 }}
            />
            <Button 
              variant="contained" 
              size="large"
              onClick={handleAddToCart}
            >
              加入購物車
            </Button>
          </Box>

          <Button 
            variant={isFavorite ? "contained" : "outlined"}
            color={isFavorite ? "primary" : "default"}
            onClick={handleFavorite}
            sx={{ m: 0}}
          >
            {isFavorite ? '取消收藏' : '加入收藏'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            商品描述
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmitReview} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              新增評論
            </Typography>
            <Rating
              value={reviewRating}
              onChange={(event, newValue) => {
                setReviewRating(newValue);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              label="評論內容"
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={submitLoading}
            >
              {submitLoading ? '送出中...' : '送出評論'}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            商品評價
          </Typography>
          <List>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start">
                    <Avatar sx={{ mr: 2 }}>
                      {review.username ? review.username[0] : '?'}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography component="span" variant="subtitle1" sx={{ mr: 1 }}>
                            {review.username || '匿名用戶'}
                          </Typography>
                          <Rating value={review.rating} readOnly size="small" />
                        </Box>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {review.comment || '無評論內容'}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
                目前還沒有評價
              </Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail; 