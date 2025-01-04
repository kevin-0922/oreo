export const shopData = {
  products: [
    {
      id: 1,
      name: '智慧手錶 Pro',
      price: 3999,
      description: '具備健康監測、運動追蹤等多項功能的智慧手錶',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      category: '電子產品',
      reviews: [
        {
          id: 1,
          userId: 1,
          username: '王小明',
          rating: 5,
          comment: '功能非常齊全，電池續航力也很好！'
        },
        {
          id: 2,
          userId: 2,
          username: '李小華',
          rating: 4,
          comment: '整體很滿意，但價格稍微偏高'
        }
      ]
    },
    {
      id: 2,
      name: '無線藍牙耳機',
      price: 2499,
      description: '高音質無線耳機，支援降噪功能',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: '電子產品',
      reviews: [
        {
          id: 3,
          userId: 3,
          username: '張小芳',
          rating: 5,
          comment: '音質超棒，戴起來也很舒適'
        }
      ]
    },
    {
      id: 3,
      name: '休閒連帽上衣',
      price: 799,
      description: '柔軟舒適的棉質連帽上衣',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      category: '服飾',
      reviews: []
    },
    {
      id: 4,
      name: '簡約風書櫃',
      price: 3200,
      description: '現代簡約設計，實用的收納空間',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156',
      category: '家居',
      reviews: [
        {
          id: 4,
          userId: 4,
          username: '陳大文',
          rating: 4,
          comment: '組裝簡單，質感不錯'
        }
      ]
    },
    {
      id: 5,
      name: '有機蔬果箱',
      price: 999,
      description: '新鮮有機蔬果，每週配送到府',
      image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6',
      category: '食品',
      reviews: []
    },
    {
      id: 6,
      name: '瑜伽墊',
      price: 880,
      description: '環保材質，防滑耐用',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      category: '運動',
      reviews: []
    },
    {
      id: 7,
      name: '保濕精華液',
      price: 1280,
      description: '深層保濕，改善肌膚乾燥',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
      category: '美妝',
      reviews: []
    },
    {
      id: 8,
      name: '暢銷小說集',
      price: 499,
      description: '精選暢銷小說合輯',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
      category: '書籍',
      reviews: []
    },
    {
      id: 9,
      name: '積木套裝',
      price: 1599,
      description: '創意積木，適合親子同樂',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b',
      category: '玩具',
      reviews: []
    },
    {
      id: 10,
      name: '智慧型手機',
      price: 15999,
      description: '最新款智慧型手機，搭載強大效能',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      category: '電子產品',
      reviews: []
    }
  ],
  categories: [
    '電子產品',
    '服飾',
    '家居',
    '食品',
    '運動',
    '美妝',
    '書籍',
    '玩具'
  ]
};

// 模擬分頁功能
export const getProducts = (page = 1, limit = 20) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    products: shopData.products.slice(start, end),
    total: shopData.products.length
  };
};

// 模擬獲取單個商品
export const getProductById = (id) => {
  return shopData.products.find(product => product.id === Number(id));
};

// 模擬獲取分類
export const getCategories = () => {
  return { categories: shopData.categories };
};