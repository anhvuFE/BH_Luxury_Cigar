import { supabase } from '../lib/supabase';
import type {
  Order,
  Database
} from '../types/database';

export class CategoryService {
  static async getAll(active_only = true) {
    let query = supabase.from('categories').select('*');

    if (active_only) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query.order('sort_order');

    if (error) throw error;
    return data;
  }

  static async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (error) throw error;
    return data;
  }

  static async create(category: Database['public']['Tables']['categories']['Insert']) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, updates: Database['public']['Tables']['categories']['Update']) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export class ProductService {
  static async getAll(options: {
    category_id?: string;
    featured_only?: boolean;
    active_only?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `);

    if (options.category_id) {
      query = query.eq('category_id', options.category_id);
    }

    if (options.featured_only) {
      query = query.eq('is_featured', true);
    }

    if (options.active_only !== false) {
      query = query.eq('status', 'active');
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        reviews:reviews(*, user:user_profiles(*))
      `)
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (error) throw error;
    return data;
  }

  static async getFeatured(limit = 6) {
    return this.getAll({ featured_only: true, limit });
  }

  static async search(searchTerm: string, limit = 20) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .eq('status', 'active')
      .limit(limit);

    if (error) throw error;
    return data;
  }

  static async create(product: Database['public']['Tables']['products']['Insert']) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, updates: Database['public']['Tables']['products']['Update']) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export class UserService {
  static async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProfile(userId: string, updates: Database['public']['Tables']['user_profiles']['Update']) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createProfile(profile: Database['public']['Tables']['user_profiles']['Insert']) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export class BlogService {
  static async getAll(options: {
    status?: 'published' | 'draft' | 'archived';
    featured_only?: boolean;
    limit?: number;
    offset?: number;
  } = {}) {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:user_profiles(*)
      `);

    if (options.status) {
      query = query.eq('status', options.status);
    } else {
      query = query.eq('status', 'published');
    }

    if (options.featured_only) {
      query = query.eq('is_featured', true);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query.order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:user_profiles(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return data;
  }

  static async create(post: Database['public']['Tables']['blog_posts']['Insert']) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, updates: Database['public']['Tables']['blog_posts']['Update']) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

export class CartService {
  static async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('carts')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }

  static async addItem(userId: string, productId: string, quantity: number) {
    const { data: existingItem } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      return this.updateQuantity(existingItem.id, existingItem.quantity + quantity);
    }

    const { data, error } = await supabase
      .from('carts')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(cartItemId);
    }

    const { data, error } = await supabase
      .from('carts')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async removeItem(cartItemId: string) {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  }

  static async clearCart(userId: string) {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  }
}

export class OrderService {
  static async create(order: Database['public']['Tables']['orders']['Insert'], items: Omit<Database['public']['Tables']['order_items']['Insert'], 'order_id'>[]) {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) throw itemsError;

    return { order: orderData, items: itemsData };
  }

  static async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*, product:products(*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*, product:products(*)),
        user:user_profiles(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateStatus(orderId: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export class ReviewService {
  static async getByProductId(productId: string, options: { approved_only?: boolean; limit?: number } = {}) {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        user:user_profiles(*)
      `)
      .eq('product_id', productId);

    if (options.approved_only !== false) {
      query = query.eq('is_approved', true);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async create(review: Database['public']['Tables']['reviews']['Insert']) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getProductRatingStats(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
      .eq('is_approved', true);

    if (error) throw error;

    if (!data || data.length === 0) {
      return { average: 0, count: 0 };
    }

    const total = data.reduce((sum, review) => sum + review.rating, 0);
    const average = total / data.length;

    return { average: Math.round(average * 10) / 10, count: data.length };
  }
}

export class CouponService {
  static async getByCode(code: string) {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('status', 'active')
      .lte('valid_from', new Date().toISOString())
      .gte('valid_until', new Date().toISOString())
      .single();

    if (error) throw error;
    return data;
  }

  static async validateCoupon(code: string, orderTotal: number, productIds: string[] = [], categoryIds: string[] = []) {
    const coupon = await this.getByCode(code);

    if (coupon.minimum_amount && orderTotal < coupon.minimum_amount) {
      throw new Error(`Minimum order amount required: ${coupon.minimum_amount}`);
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      throw new Error('Coupon usage limit exceeded');
    }

    if (coupon.applicable_products && coupon.applicable_products.length > 0) {
      const hasApplicableProduct = productIds.some(id => coupon.applicable_products!.includes(id));
      if (!hasApplicableProduct) {
        throw new Error('Coupon not applicable to cart items');
      }
    }

    if (coupon.applicable_categories && coupon.applicable_categories.length > 0) {
      const hasApplicableCategory = categoryIds.some(id => coupon.applicable_categories!.includes(id));
      if (!hasApplicableCategory) {
        throw new Error('Coupon not applicable to cart items');
      }
    }

    return coupon;
  }

  static async incrementUsage(couponId: string) {
    const { data, error } = await supabase
      .rpc('increment_coupon_usage', { coupon_id: couponId });

    if (error) throw error;
    return data;
  }
}

export class WishlistService {
  static async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }

  static async addItem(userId: string, productId: string) {
    const { data: existing } = await supabase
      .from('wishlists')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existing) {
      return existing;
    }

    const { data, error } = await supabase
      .from('wishlists')
      .insert({
        user_id: userId,
        product_id: productId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async removeItem(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  }
}

export class NewsletterService {
  static async subscribe(email: string, preferences?: Record<string, unknown>) {
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      if (!existing.is_active) {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .update({
            is_active: true,
            preferences,
            unsubscribed_at: null
          })
          .eq('email', email)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
      return existing;
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        preferences,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async unsubscribe(email: string) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}