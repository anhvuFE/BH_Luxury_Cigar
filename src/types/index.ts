export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
  specifications: {
    origin: string;
    size: string;
    strength: string;
    wrapper: string;
    binder: string;
    filler: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  category: string;
  slug: string;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  hours?: string;
}

export interface ContactInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}