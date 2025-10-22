import apiService from './api';
import { API_ENDPOINTS } from '../config/api';
import type { Product } from '../types/database';

export interface ProductFilters {
  category_id?: string;
  brand?: string;
  price_min?: number;
  price_max?: number;
  is_featured?: boolean;
  is_new?: boolean;
  search?: string;
  sort_by?: 'name' | 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class ProductService {
  async getAll(filters?: ProductFilters): Promise<PaginatedProducts> {
    const response = await apiService.get<ApiResponse<Product[]>>(API_ENDPOINTS.PRODUCTS.LIST, filters as Record<string, string | number | boolean>);

    // Transform backend response to match frontend interface
    return {
      data: response.data.map(p => ({ ...p, id: p._id })),
      total: response.count || response.data.length,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      totalPages: Math.ceil((response.count || response.data.length) / (filters?.limit || 10))
    };
  }

  async getById(id: string): Promise<Product> {
    const response = await apiService.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.GET(id));
    return response.data;
  }

  async getBySlug(slug: string): Promise<Product> {
    return apiService.get<Product>(API_ENDPOINTS.PRODUCTS.GET_BY_SLUG(slug));
  }

  async getFeatured(limit: number = 6): Promise<Product[]> {
    const response = await apiService.get<ApiResponse<Product[]>>(API_ENDPOINTS.PRODUCTS.LIST, {
      isFeatured: true,
      limit
    });
    return response.data;
  }

  async search(query: string, filters?: ProductFilters): Promise<PaginatedProducts> {
    return apiService.get<PaginatedProducts>(API_ENDPOINTS.PRODUCTS.SEARCH, {
      q: query,
      ...filters,
    });
  }

  async create(data: Partial<Product>): Promise<Product> {
    return apiService.post<Product>(API_ENDPOINTS.PRODUCTS.CREATE, data);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return apiService.put<Product>(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  }

  async uploadImage(productId: string, file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return apiService.upload<{ url: string }>(
      `${API_ENDPOINTS.PRODUCTS.UPDATE(productId)}/image`,
      formData
    );
  }
}

export const productService = new ProductService();
export default productService;