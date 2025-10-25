#!/bin/bash

# Script to create luxury products via API
# Make sure your backend server is running before executing this script

API_BASE_URL="http://localhost:3000/api"

echo "Creating luxury products..."

# Product 1: Cragganmore 12 Y.O Speyside Single Malt
curl -X POST "${API_BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CRAGGANMORE 12 Y.O SPEYSIDE SINGLE MALT",
    "brand": "Cragganmore",
    "price": 1740000,
    "category": "Whisky",
    "description": "Gạt tàn gốm cao cấp từ thương hiệu S.T. Dupont phối hợp với Fender, thiết kế độc quyền và sang trọng.",
    "specifications": {
      "origin": "Scotland",
      "age": "12 years",
      "type": "Single Malt",
      "region": "Speyside",
      "alcohol": "40%"
    },
    "inStock": true,
    "isNew": true,
    "isFeatured": true,
    "image": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=400"
  }'

echo ""

# Product 2: JW Blue Label Ghost & Rare Port Dundas
curl -X POST "${API_BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JW BLUE LABEL GHOST & RARE PORT DUNDAS",
    "brand": "JW Whisky",
    "price": 5746000,
    "category": "Whisky",
    "description": "Johnnie Walker Blue Label Ghost and Rare Port Dundas - phiên bản giới hạn với hương vị độc đáo và quý hiếm.",
    "specifications": {
      "origin": "Scotland",
      "type": "Blended Scotch",
      "series": "Ghost & Rare",
      "distillery": "Port Dundas",
      "alcohol": "43.8%"
    },
    "inStock": true,
    "isNew": true,
    "isFeatured": true,
    "image": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=400"
  }'

echo ""

# Product 3: Bật Lửa Chấm Xi Gà S.T. Dupont Fender Ligne 2
curl -X POST "${API_BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bật Lửa Chấm Xi Gà S.T. Dupont Fender Ligne 2",
    "brand": "S.T. DUPONT",
    "price": 57244000,
    "category": "Accessories",
    "description": "Bật lửa cao cấp từ thương hiệu S.T. Dupont kết hợp với Fender, thiết kế sang trọng với họa tiết độc đáo.",
    "specifications": {
      "model": "Ligne 2",
      "collaboration": "Fender",
      "material": "Metal cao cấp",
      "finish": "Lacquer đen với họa tiết vàng",
      "type": "Cigar Lighter"
    },
    "inStock": true,
    "isNew": true,
    "isFeatured": true,
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400"
  }'

echo ""

# Product 4: BẬT LỬA CHẤM XI GÀ S.T. DUPONT Behike Le Grand
curl -X POST "${API_BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "BẬT LỬA CHẤM XI GÀ S.T. DUPONT Behike Le Grand",
    "brand": "S.T. DUPONT",
    "price": 57244000,
    "category": "Accessories",
    "description": "Bật lửa cao cấp S.T. Dupont phiên bản Behike Le Grand, thiết kế sang trọng với finish vàng đặc biệt.",
    "specifications": {
      "model": "Behike Le Grand",
      "material": "Metal cao cấp",
      "finish": "Gold-plated",
      "series": "Limited Edition",
      "type": "Cigar Lighter"
    },
    "inStock": true,
    "isNew": true,
    "isFeatured": true,
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400"
  }'

echo ""

# Product 5: BÚT BI S.T. DUPONT Classique
curl -X POST "${API_BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "BÚT BI S.T. DUPONT Classique",
    "brand": "S.T. DUPONT",
    "price": 12650000,
    "category": "Accessories",
    "description": "Bút bi cao cấp S.T. Dupont dòng Classique, thiết kế tinh tế và sang trọng cho những người sành điệu.",
    "specifications": {
      "model": "Classique",
      "type": "Ballpoint Pen",
      "material": "Metal cao cấp",
      "finish": "Polished Chrome",
      "mechanism": "Twist action"
    },
    "inStock": true,
    "isNew": false,
    "isFeatured": true,
    "image": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=400"
  }'

echo ""
echo "All products have been created successfully!"
echo "Please check your admin panel to verify the products."