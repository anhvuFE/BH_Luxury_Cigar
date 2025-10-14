export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  brand: string;
  category_id: string;
  sku: string;
  price: number;
  compare_price?: number;
  cost_price?: number;
  stock: number;
  low_stock_threshold: number;
  track_quantity: boolean;
  allow_backorder: boolean;
  featured_image?: string;
  image_gallery?: unknown[];
  videos?: unknown[];
  specifications?: Record<string, unknown>;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  status: 'active' | 'draft' | 'archived';
  is_visible: boolean;
  is_featured: boolean;
  is_new: boolean;
  views: number;
  sales_count: number;
  average_rating: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  created_by?: string;

  // Relations
  category?: Category;
  reviews?: Review[];
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  preferences?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author_id: string;
  featured_image?: string;
  gallery_images?: string[];
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;

  // Relations
  author?: UserProfile;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  shipping_address: Record<string, unknown>;
  billing_address?: Record<string, unknown>;
  notes?: string;
  tracking_number?: string;
  coupon_code?: string;
  created_at: string;
  updated_at: string;

  // Relations
  user?: UserProfile;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_snapshot: Record<string, unknown>;
  created_at: string;

  // Relations
  order?: Order;
  product?: Product;
}

export interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;

  // Relations
  user?: UserProfile;
  product?: Product;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title?: string;
  comment?: string;
  is_verified: boolean;
  is_approved: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;

  // Relations
  product?: Product;
  user?: UserProfile;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  minimum_amount?: number;
  maximum_discount?: number;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  valid_from: string;
  valid_until: string;
  applicable_products?: string[];
  applicable_categories?: string[];
  created_at: string;
  updated_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;

  // Relations
  user?: UserProfile;
  product?: Product;
}

export interface Newsletter {
  id: string;
  email: string;
  is_active: boolean;
  preferences?: Record<string, unknown>;
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  category: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  event_type: string;
  event_data: Record<string, unknown>;
  user_id?: string;
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface Inventory {
  id: string;
  product_id: string;
  quantity_available: number;
  quantity_reserved: number;
  reorder_level: number;
  last_restocked?: string;
  updated_at: string;

  // Relations
  product?: Product;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, unknown>;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // Relations
  product?: Product;
}

// Database Response Types
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      user_profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'created_at' | 'updated_at' | 'last_login'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at' | 'last_login'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id' | 'created_at'>;
        Update: Partial<Omit<OrderItem, 'id' | 'created_at'>>;
      };
      carts: {
        Row: Cart;
        Insert: Omit<Cart, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Cart, 'id' | 'created_at' | 'updated_at'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Review, 'id' | 'created_at' | 'updated_at'>>;
      };
      coupons: {
        Row: Coupon;
        Insert: Omit<Coupon, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Coupon, 'id' | 'created_at' | 'updated_at'>>;
      };
      wishlists: {
        Row: Wishlist;
        Insert: Omit<Wishlist, 'id' | 'created_at'>;
        Update: Partial<Omit<Wishlist, 'id' | 'created_at'>>;
      };
      newsletter_subscribers: {
        Row: Newsletter;
        Insert: Omit<Newsletter, 'id' | 'subscribed_at'>;
        Update: Partial<Omit<Newsletter, 'id' | 'subscribed_at'>>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, 'id' | 'updated_at'>;
        Update: Partial<Omit<SiteSetting, 'id' | 'updated_at'>>;
      };
      analytics: {
        Row: Analytics;
        Insert: Omit<Analytics, 'id' | 'created_at'>;
        Update: Partial<Omit<Analytics, 'id' | 'created_at'>>;
      };
      inventory: {
        Row: Inventory;
        Insert: Omit<Inventory, 'id' | 'updated_at'>;
        Update: Partial<Omit<Inventory, 'id' | 'updated_at'>>;
      };
      product_variants: {
        Row: ProductVariant;
        Insert: Omit<ProductVariant, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProductVariant, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};