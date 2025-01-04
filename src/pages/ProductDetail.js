import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById, addToCart, addProductReview, addToFavorite, removeFromFavorite } from '../services/productService';
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
  const { favorites, setFavorites } = useFavorite();
  const { isAuthenticated } = useAuth();
  const isFavorite = favorites.some(item => item.id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError('無法載入商品資訊');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setSubmitLoading(true);  // 設定載入狀態，防止重複提交
      await addToCart(product.id, quantity);  // 發送加入購物車請求到後端
      alert('商品已加入購物車');  // 顯示成功訊息
    } catch (error) {
      console.error('加入購物車失敗:', error);  // 在控制台顯示錯誤詳情
      alert('加入購物車失敗，請稍後再試');  // 顯示錯誤訊息給用戶
    } finally {
      setSubmitLoading(false);  // 重設載入狀態
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();  // 防止表單預設提交行為
    try {
      setSubmitLoading(true);  // 設定載入狀態，防止重複提交
      const response = await addProductReview(product.id, reviewRating, reviewComment);  // 發送評論請求到後端
      const updatedProduct = await getProductById(id);  // 重新獲取商品資訊以更新評論列表
      setProduct(updatedProduct);  // 更新商品資訊狀態
      setReviewComment('');  // 清空評論輸入框
      setReviewRating(5);  // 重置評分為 5 星
      alert(response.message);  // 顯示成功訊息
    } catch (error) {
      console.error('評論送出失敗:', error);  // 在控制台顯示錯誤詳情
      alert(error.message);  // 顯示錯誤訊息給用戶
    } finally {
      setSubmitLoading(false);  // 重設載入狀態
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
        setFavorites(prev => prev.filter(item => item.id !== product.id));
        alert('商品已從收藏移除');
      } else {
        await addToFavorite(product.id);
        setFavorites(prev => [...prev, product]);
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
            {product.reviews?.map((review) => (
              <React.Fragment key={review.id}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ mr: 2 }}>{review.username[0]}</Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" variant="subtitle1" sx={{ mr: 1 }}>
                          {review.username}
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
                        {review.comment}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail; 