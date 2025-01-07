import axiosInstance from '../utils/axiosInstance';



export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`/api/products`);
    return {
      products: response.data.data || [],
      total: response.data.data?.length || 0
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      total: 0
    };
  }
};


export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }

};

// 加入購物車
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

// 新增商品評論
export const addProductReview = async (productId, rating, comment) => {
  try {
    const response = await axiosInstance.post('/api/products/review', {
      "productId": productId,
      "rating": rating,
      "comment": comment
    });
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// 新增收藏商品
export const addToFavorite = async (productId) => {
  try {
    const response = await axiosInstance.post(`/api/favorites/${productId}`, {
      productId
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// 移除收藏商品
export const removeFromFavorite = async (productId) => {
  if (!productId) {
    throw new Error('Product ID is required');
  }
  
  try {
    const response = await axiosInstance.delete(`/api/favorites/${productId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

// 獲取收藏清單
export const getFavorites = async () => {
  try {
    const response = await axiosInstance.get('/api/favorites');
    //console.log('Favorites response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

// 後端API格式說明：

/*
1. 獲取商品列表
GET /api/products?page=1&limit=20
Response: {
  products: [
    {
      id: 1,
      name: "商品名稱",
      price: 3999,
      description: "商品描述",
      image: "https://api.example.com/images/product1.jpg",
      category: "電子產品"
    }
  ],
  total: 80
}

2. 獲取單個商品
GET /api/products/:id
Response: {
  id: 1,
  name: "商品名稱",
  price: 3999,
  description: "商品描述",
  image: "https://api.example.com/images/product1.jpg",
  category: "電子產品",
  reviews: [
    {
      id: 1,
      userId: 1,
      username: "用戶1",
      rating: 5,
      comment: "很好的商品"
    }
  ]
}

4. 獲取商品分類
GET /api/categories
Response: {
  categories: [
    "電子產品",
    "服飾",
    "家居",
    "食品",
    "運動",
    "美妝",
    "書籍",
    "玩具"
  ]
}

5. 加入購物車
POST /api/cart/add
Request: {
  productId: number,
  quantity: number
}
Response: {
  success: true,
  message: "商品已加入購物車"
}

6. 新增商品評論
POST /api/products/reviews
Request: {
  productId: number,
  rating: number,
  comment: string
}
Response: {
  success: true,
  message: "評論已新增",
  review: {
    id: number,
    productId: number,
    userId: number,
    username: string,
    rating: number,
    comment: string,
    createdAt: string
  }
}

7. 新增收藏
POST /api/favorites/add
Request: {
  productId: number
}
Response: {
  success: true,
  message: "商品已加入收藏"
}

8. 移除收藏
DELETE /api/favorites/remove/:productId
Response: {
  success: true,
  message: "商品已從收藏移除"
}

9. 獲取收藏清單
GET /api/favorites
Response: {
  favorites: [
    {
      id: number,
      name: string,
      price: number,
      description: string,
      image: string,
      category: string
    }
  ]
}
*/ 

