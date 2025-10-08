import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cohiba Siglo VI',
    brand: 'Cohiba',
    price: 2500000,
    originalPrice: 2800000,
    image: '/src/assets/images/placeholder.svg',
    description: 'Cohiba Siglo VI là một trong những dòng xì gà cao cấp nhất của thương hiệu Cohiba, với hương vị phong phú và độ mạnh vừa phải.',
    inStock: true,
    isNew: true,
    isFeatured: true,
    category: 'Premium',
    specifications: {
      origin: 'Cuba',
      size: '6" x 52',
      strength: 'Medium to Full',
      wrapper: 'Cuban Wrapper',
      binder: 'Cuban Binder',
      filler: 'Cuban Filler'
    }
  },
  {
    id: '2',
    name: 'Montecristo No.2',
    brand: 'Montecristo',
    price: 1800000,
    image: '/src/assets/images/placeholder.svg',
    description: 'Montecristo No.2 là một torpedo cổ điển với hương vị đậm đà và cân bằng hoàn hảo.',
    inStock: true,
    isFeatured: true,
    category: 'Classic',
    specifications: {
      origin: 'Cuba',
      size: '6⅛" x 52',
      strength: 'Medium to Full',
      wrapper: 'Cuban Wrapper',
      binder: 'Cuban Binder',
      filler: 'Cuban Filler'
    }
  },
  {
    id: '3',
    name: 'Davidoff Winston Churchill',
    brand: 'Davidoff',
    price: 3200000,
    image: '/src/assets/images/placeholder.svg',
    description: 'Davidoff Winston Churchill là dòng xì gà cao cấp được tạo ra để tôn vinh vị Thủ tướng Anh vĩ đại.',
    inStock: true,
    isNew: true,
    category: 'Luxury',
    specifications: {
      origin: 'Dominican Republic',
      size: '7" x 47',
      strength: 'Medium',
      wrapper: 'Ecuadorian Connecticut',
      binder: 'Dominican',
      filler: 'Dominican'
    }
  },
  {
    id: '4',
    name: 'Arturo Fuente Opus X',
    brand: 'Arturo Fuente',
    price: 2800000,
    image: '/src/assets/images/placeholder.svg',
    description: 'Arturo Fuente Opus X là một trong những dòng xì gà Dominican được đánh giá cao nhất thế giới.',
    inStock: false,
    category: 'Limited Edition',
    specifications: {
      origin: 'Dominican Republic',
      size: '5⅝" x 46',
      strength: 'Full',
      wrapper: 'Dominican Wrapper',
      binder: 'Dominican Binder',
      filler: 'Dominican Filler'
    }
  },
  {
    id: '5',
    name: 'Padron 1964 Anniversary',
    brand: 'Padron',
    price: 2200000,
    image: '/src/assets/images/placeholder.svg',
    description: 'Padron 1964 Anniversary là dòng xì gà premium với hương vị phức tạp và đẳng cấp.',
    inStock: true,
    isFeatured: true,
    category: 'Anniversary',
    specifications: {
      origin: 'Nicaragua',
      size: '6" x 50',
      strength: 'Full',
      wrapper: 'Nicaraguan Maduro',
      binder: 'Nicaraguan',
      filler: 'Nicaraguan'
    }
  },
  {
    id: '6',
    name: 'Romeo y Julieta Churchill',
    brand: 'Romeo y Julieta',
    price: 1600000,
    image: '/src/assets/images/placeholder.svg',
    description: 'Romeo y Julieta Churchill là một classic với kích thước lớn và hương vị nhẹ nhàng.',
    inStock: true,
    category: 'Classic',
    specifications: {
      origin: 'Cuba',
      size: '7" x 47',
      strength: 'Medium',
      wrapper: 'Cuban Wrapper',
      binder: 'Cuban Binder',
      filler: 'Cuban Filler'
    }
  }
];

export const featuredProducts = products.filter(product => product.isFeatured);
export const newProducts = products.filter(product => product.isNew);