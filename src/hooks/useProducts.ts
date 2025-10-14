import { useState, useEffect } from 'react';
import { ProductService } from '../services/supabase';
import type { Product } from '../types/database';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getAll({ active_only: true });
        setProducts(data || []);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getFeatured();
        setProducts(data || []);
      } catch (err) {
        setError('Failed to fetch featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { products, loading, error };
}

export function useNewProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        // Get recent products (created within last 30 days)
        const data = await ProductService.getAll({ active_only: true, limit: 10 });
        const newProducts = data?.filter(product => {
          const createdDate = new Date(product.created_at);
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          return createdDate > thirtyDaysAgo;
        }) || [];
        setProducts(newProducts);
      } catch (err) {
        setError('Failed to fetch new products');
        console.error('Error fetching new products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return { products, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // Get all products and find by id (since we don't have a getById method)
        const products = await ProductService.getAll({ active_only: true });
        const data = products?.find(p => p.id === id) || null;
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}