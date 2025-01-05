import axiosInstance from '../utils/axiosInstance';

// 獲取購物車內容
export const getCart = async () => {
  try {
    const response = await axiosInstance.get('/api/cart');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// 加入購物車 - 修改為與 productService.js 一致的格式
export const addToCart = async (productId, quantity) => {
  try {
    const response = await axiosInstance.post('/api/cart', {
      "productId": productId,
      "amount": quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// 更新購物車商品數量
export const updateCartItem = async (productId, amount) => {
  try {
    const response = await axiosInstance.put(`/api/cart/${productId}`, {
      "amount": amount
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// 移除購物車商品
export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/api/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// 清空購物車
export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete('/api/cart');
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

/*
API 格式說明：

1. 獲取購物車
GET /api/cart
Response: {
  "status": "SUCCESS",
  "message": "成功獲取購物車",
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "商品名稱",
        "price": 100,
        "image": "商品圖片URL",
        "amount": 2
      }
    ],
    "total": 200
  }
}

2. 加入購物車
POST /api/cart
Request: {
  "productId": number,
  "amount": number
}
Response: {
  "status": "SUCCESS",
  "message": "成功加入購物車",
  "data": {
    "id": 1,
    "productId": 1,
    "amount": 2
  }
}

3. 更新購物車商品數量
PUT /api/cart/:productId
Request: {
  "amount": number
}
Response: {
  "status": "SUCCESS",
  "message": "成功更新購物車",
  "data": {
    "id": 1,
    "productId": 1,
    "amount": 3
  }
}

4. 移除購物車商品
DELETE /api/cart/:productId
Response: {
  "status": "SUCCESS",
  "message": "成功移除商品",
  "data": null
}

5. 清空購物車
DELETE /api/cart
Response: {
  "status": "SUCCESS",
  "message": "成功清空購物車",
  "data": null
}

錯誤響應格式：
{
  "status": "ERROR",
  "message": "錯誤訊息",
  "data": null
}
*/ 