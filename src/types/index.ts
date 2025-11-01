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

// Re-export BlogPost from database.ts to maintain backward compatibility
export type { BlogPost } from './database';

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