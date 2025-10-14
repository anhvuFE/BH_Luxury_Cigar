-- BH Luxury Cigar E-commerce Database Schema
-- Run this script in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    parent_id UUID REFERENCES categories(id),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    brand VARCHAR(255) NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    sku VARCHAR(100) UNIQUE NOT NULL,

    -- Pricing
    price DECIMAL(12,2) NOT NULL,
    compare_price DECIMAL(12,2),
    cost_price DECIMAL(12,2),

    -- Inventory
    stock INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    track_quantity BOOLEAN DEFAULT true,
    allow_backorder BOOLEAN DEFAULT false,

    -- Images & Media
    featured_image VARCHAR(500),
    image_gallery JSONB DEFAULT '[]'::jsonb,
    videos JSONB DEFAULT '[]'::jsonb,

    -- Cigar Specifications
    specifications JSONB DEFAULT '{}'::jsonb,

    -- SEO & Marketing
    meta_title VARCHAR(255),
    meta_description TEXT,
    tags TEXT[] DEFAULT '{}',

    -- Status & Visibility
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
    is_visible BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,

    -- Analytics
    views INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Users profiles table (extends Supabase auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    display_name VARCHAR(255),
    phone_number VARCHAR(20),
    avatar_url VARCHAR(500),
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
    is_active BOOLEAN DEFAULT true,

    -- Preferences
    preferences JSONB DEFAULT '{
        "cigar_strength": null,
        "favorite_brands": [],
        "newsletter": false
    }'::jsonb,

    -- Addresses
    addresses JSONB DEFAULT '[]'::jsonb,

    -- Metadata
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    last_login_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    gallery JSONB DEFAULT '[]'::jsonb,

    -- Author & Publishing
    author_id UUID NOT NULL REFERENCES auth.users(id),
    author_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,

    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    tags TEXT[] DEFAULT '{}',
    categories TEXT[] DEFAULT '{}',

    -- Social & Engagement
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog comments table
CREATE TABLE blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    author_id UUID REFERENCES auth.users(id),
    parent_id UUID REFERENCES blog_comments(id),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carts table
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    session_id VARCHAR(255),

    -- Pricing
    subtotal DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    shipping_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) DEFAULT 0,

    coupon_code VARCHAR(100),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days'
);

-- Cart items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(12,2) NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(cart_id, product_id)
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id),

    -- Customer Information
    customer_info JSONB NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,

    -- Pricing
    subtotal DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    shipping_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,

    -- Payment
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cod', 'bank_transfer', 'momo', 'vnpay', 'credit_card')),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_details JSONB DEFAULT '{}'::jsonb,

    -- Fulfillment
    order_status VARCHAR(50) DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_method VARCHAR(255),
    tracking_number VARCHAR(255),

    -- Discounts
    coupon_code VARCHAR(100),
    discount_type VARCHAR(50) CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),

    -- Notes
    customer_notes TEXT,
    admin_notes TEXT,

    -- Timeline
    completed_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    product_name VARCHAR(500) NOT NULL,
    product_image VARCHAR(500),
    sku VARCHAR(100) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    quantity INTEGER NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    specifications JSONB DEFAULT '{}'::jsonb
);

-- Order status history table
CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    note TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    order_id UUID REFERENCES orders(id),

    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,

    -- Media
    images JSONB DEFAULT '[]'::jsonb,

    -- Moderation
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    is_verified_purchase BOOLEAN DEFAULT false,

    -- Engagement
    helpful_count INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupons table
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('percentage', 'fixed_amount', 'free_shipping')),
    value DECIMAL(12,2) NOT NULL,

    -- Usage Limits
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    usage_limit_per_customer INTEGER,

    -- Conditions
    minimum_amount DECIMAL(12,2),
    applicable_products UUID[] DEFAULT '{}',
    applicable_categories UUID[] DEFAULT '{}',

    -- Validity
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Wishlists table
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_ids UUID[] DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id)
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
    tags TEXT[] DEFAULT '{}',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Site settings table
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- General
    site_name VARCHAR(255) DEFAULT 'BH Luxury Cigar',
    site_description TEXT,
    logo_url VARCHAR(500),
    favicon_url VARCHAR(500),

    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    social_media JSONB DEFAULT '{}'::jsonb,

    -- Business
    business_hours VARCHAR(255),
    currency VARCHAR(10) DEFAULT 'VND',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',

    -- E-commerce
    allow_guest_checkout BOOLEAN DEFAULT true,
    require_account_for_purchase BOOLEAN DEFAULT false,
    auto_approve_reviews BOOLEAN DEFAULT false,
    low_stock_threshold INTEGER DEFAULT 5,

    -- Shipping
    free_shipping_threshold DECIMAL(12,2),
    shipping_rates JSONB DEFAULT '[]'::jsonb,

    -- Tax
    tax_enabled BOOLEAN DEFAULT false,
    tax_rate DECIMAL(5,4) DEFAULT 0,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Analytics table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('daily', 'weekly', 'monthly')),
    date DATE NOT NULL,

    -- Sales Analytics
    revenue DECIMAL(12,2) DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    average_order_value DECIMAL(12,2) DEFAULT 0,
    refunds_amount DECIMAL(12,2) DEFAULT 0,

    -- Product Analytics
    product_views INTEGER DEFAULT 0,
    top_selling_products JSONB DEFAULT '[]'::jsonb,

    -- Customer Analytics
    new_customers INTEGER DEFAULT 0,
    returning_customers INTEGER DEFAULT 0,
    total_customers INTEGER DEFAULT 0,

    -- Traffic Analytics
    visitors INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,

    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(type, date)
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_is_new ON products(is_new);
CREATE INDEX idx_products_created_at ON products(created_at);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);

CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wishlists_updated_at BEFORE UPDATE ON wishlists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can only see and edit their own carts
CREATE POLICY "Users can view own carts" ON carts FOR SELECT USING (auth.uid() = user_id OR session_id IS NOT NULL);
CREATE POLICY "Users can update own carts" ON carts FOR UPDATE USING (auth.uid() = user_id OR session_id IS NOT NULL);
CREATE POLICY "Users can insert own carts" ON carts FOR INSERT WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL);

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see and edit their own reviews
CREATE POLICY "Users can view own reviews" ON reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see and edit their own wishlists
CREATE POLICY "Users can view own wishlists" ON wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wishlists" ON wishlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlists" ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access for products, categories, blog posts
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone can view approved reviews" ON reviews FOR SELECT USING (status = 'approved');

-- Insert sample site settings
INSERT INTO site_settings (
    site_name,
    site_description,
    email,
    phone,
    address,
    social_media,
    business_hours,
    free_shipping_threshold,
    shipping_rates
) VALUES (
    'BH Luxury Cigar',
    'Chuyên cung cấp xì gà cao cấp và phụ kiện xì gà chính hãng',
    'info@bhluxurycigar.com',
    '+84 123 456 789',
    '123 Đường ABC, Quận 1, TP.HCM',
    '{"facebook": "https://facebook.com/bhluxurycigar", "instagram": "https://instagram.com/bhluxurycigar"}',
    'Thứ 2 - Chủ nhật: 9:00 - 22:00',
    1000000,
    '[
        {"name": "Giao hàng tiêu chuẩn", "description": "2-3 ngày làm việc", "price": 50000, "estimated_days": "2-3 ngày", "is_active": true},
        {"name": "Giao hàng nhanh", "description": "1 ngày làm việc", "price": 100000, "estimated_days": "1 ngày", "is_active": true}
    ]'
);

-- Success message
DO $$
BEGIN
    RAISE NOTICE '🎉 BH Luxury Cigar database schema created successfully!';
    RAISE NOTICE '📊 Created tables: categories, products, user_profiles, blog_posts, orders, carts, reviews, coupons, wishlists, newsletter_subscribers, site_settings, analytics';
    RAISE NOTICE '🔒 Row Level Security enabled for user data';
    RAISE NOTICE '🚀 Ready to start building your cigar ecommerce!';
END $$;