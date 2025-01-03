const products = [
  {
    id: 1,
    name: '智慧手錶 Pro',
    price: 3999,
    description: '具備健康監測、運動追蹤等多項功能的智慧手錶',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    category: '電子產品',
  },
  // ... 移除其他靜態產品
];

function generateProducts() {
  const categories = ['電子產品', '服飾', '家居', '食品', '運動', '美妝', '書籍', '玩具'];
  const productTypes = {
    '電子產品': [
      { name: '智慧手錶', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12' },
      { name: '無線耳機', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
      { name: '智慧手機', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
      { name: '平板電腦', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0' },
      { name: '筆記型電腦', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853' },
      { name: '智慧音箱', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230' },
      { name: '攝影機', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32' },
      { name: '遊戲機', image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128' },
    ],
    '服飾': [
      { name: '休閒上衣', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' },
      { name: '牛仔褲', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d' },
      { name: '運動外套', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea' },
      { name: '針織衫', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105' },
      { name: '連身裙', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c' },
      { name: '西裝外套', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf' },
      { name: '運動褲', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2' },
    ],
    '家居': [
      { name: '沙發', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc' },
      { name: '床墊', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c' },
      { name: '餐桌', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88' },
      { name: '檯燈', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c' },
      { name: '書櫃', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156' },
      { name: '地毯', image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a' },
      { name: '窗簾', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f' },
    ],
    '食品': [
      { name: '有機蔬果', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6' },
      { name: '零食', image: 'https://images.unsplash.com/photo-1599629954294-16b394a8ba35' },
      { name: '飲料', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846' },
      { name: '咖啡豆', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e' },
      { name: '麵包', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
      { name: '巧克力', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834' },
    ],
    '運動': [
      { name: '瑜伽墊', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
      { name: '啞鈴', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61' },
      { name: '運動鞋', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
      { name: '跑步機', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f' },
      { name: '健身球', image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77' },
      { name: '運動手環', image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558' },
    ],
    '美妝': [
      { name: '護膚品', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b' },
      { name: '化妝品', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9' },
      { name: '香水', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601' },
      { name: '面膜', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908' },
      { name: '美甲用品', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371' },
      { name: '美髮用品', image: 'https://images.unsplash.com/photo-1522336284037-91f7da073525' },
    ],
    '書籍': [
      { name: '小說', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c' },
      { name: '教科書', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6' },
      { name: '雜誌', image: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8' },
      { name: '漫畫', image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806' },
      { name: '童書', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' },
      { name: '藝術書', image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090' },
    ],
    '玩具': [
      { name: '積木', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b' },
      { name: '玩偶', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088' },
      { name: '遙控車', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f' },
      { name: '益智玩具', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1' },
      { name: '模型', image: 'https://images.unsplash.com/photo-1558507652-2d9626c4e67a' },
      { name: '桌遊', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09' },
    ],
  };

  // 生成商品的其餘邏輯保持不變
  const generatedProducts = [];
  for (let i = 1; i <= 80; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const productType = productTypes[category][Math.floor(Math.random() * productTypes[category].length)];
    const variant = Math.floor(Math.random() * 100);
    
    generatedProducts.push({
      id: i,
      name: `${productType.name} ${variant}`,
      price: Math.floor(Math.random() * 9901) + 100,
      description: `高品質的${productType.name}，提供最佳的使用體驗。`,
      image: productType.image,
      category: category,
    });
  }
  return generatedProducts;
}

const allProducts = generateProducts();

export const getProducts = (page = 1, limit = 20) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    products: allProducts.slice(start, end),
    total: allProducts.length,
  };
};

export const getProductById = (id) => {
  return allProducts.find((product) => product.id === Number(id));
};

export const searchProducts = (query) => {
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );
}; 