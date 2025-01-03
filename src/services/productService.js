import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});


export const getProducts = async (page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/api/products`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
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
*/ 


