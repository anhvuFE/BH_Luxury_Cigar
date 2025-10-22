import { useState, useEffect } from 'react';
import type { Product } from '../types/database';
import productService, { type ProductFilters } from '../services/product.service';

export interface UseProductsOptions extends ProductFilters {
  autoFetch?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(options.page || 1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll({
        ...options,
        page: currentPage,
      });
      setProducts(response.data);
      setTotalPages(response.totalPages);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, options.autoFetch]);

  const refetch = () => fetchProducts();

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    products,
    loading,
    error,
    totalPages,
    currentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    refetch,
    nextPage,
    prevPage,
  };
}

export function useFeaturedProducts(limit: number = 6) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cacheKey = `featured_products_${limit}`;
        const cachedData = sessionStorage.getItem(cacheKey);
        const cacheTime = sessionStorage.getItem(`${cacheKey}_time`);

        // Use cache if less than 3 minutes old
        if (cachedData && cacheTime && Date.now() - parseInt(cacheTime) < 180000) {
          setProducts(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const data = await productService.getFeatured(limit);
        setProducts(data);

        // Cache the result
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString());
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch featured products';
        setError(errorMessage);
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit]);

  return { products, loading, error };
}

export function useProduct(idOrSlug: string, isSlug: boolean = false) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!idOrSlug || idOrSlug.trim() === '' || idOrSlug === '__skip__') {
        setLoading(false);
        setError(null);
        setProduct(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = isSlug
          ? await productService.getBySlug(idOrSlug)
          : await productService.getById(idOrSlug);
        setProduct(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product';
        setError(errorMessage);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idOrSlug, isSlug]);

  return { product, loading, error };
}

export function useProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, filters?: ProductFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.search(query, filters);
      setProducts(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search products';
      setError(errorMessage);
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setProducts([]);
    setError(null);
  };

  return { products, loading, error, search, clearResults };
}

export function useNewProducts(limit: number = 10) {
  const { products, loading, error } = useProducts({
    is_new: true,
    limit,
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  return { products, loading, error };
}