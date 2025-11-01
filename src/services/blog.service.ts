import apiService from './api';
import { API_ENDPOINTS } from '../config/api';
import type { BlogPost } from '../types/database';

export interface BlogFilters {
  category?: string;
  isPublished?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface BlogApiResponse {
  success: boolean;
  data: BlogPost | BlogPost[];
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  message?: string;
}

export interface PaginatedBlogPosts {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class BlogService {
  async getAll(filters?: BlogFilters): Promise<PaginatedBlogPosts> {
    // Clean up undefined values before sending
    const cleanFilters: Record<string, string | number | boolean> = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          cleanFilters[key] = value;
        }
      });
    }

    const response = await apiService.get<BlogApiResponse>(API_ENDPOINTS.BLOG.LIST, Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined);

    if (response && typeof response === 'object' && 'data' in response) {
      const apiResponse = response as BlogApiResponse;
      return {
        data: Array.isArray(apiResponse.data) ? apiResponse.data : [],
        total: apiResponse.total || 0,
        page: apiResponse.page || 1,
        limit: filters?.limit || 10,
        totalPages: apiResponse.pages || 1
      };
    }

    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    };
  }

  async getPublished(filters?: Omit<BlogFilters, 'isPublished'>): Promise<PaginatedBlogPosts> {
    return this.getAll({ ...filters, isPublished: true });
  }

  async getById(id: string): Promise<BlogPost> {
    const response = await apiService.get<BlogApiResponse>(API_ENDPOINTS.BLOG.GET(id));

    if (response && typeof response === 'object' && 'data' in response) {
      const apiResponse = response as BlogApiResponse;
      return apiResponse.data as BlogPost;
    }

    throw new Error('Invalid response format');
  }

  async getBySlug(slug: string): Promise<BlogPost> {
    const response = await apiService.get<BlogApiResponse>(API_ENDPOINTS.BLOG.GET_BY_SLUG(slug));

    if (response && typeof response === 'object' && 'data' in response) {
      const apiResponse = response as BlogApiResponse;
      return apiResponse.data as BlogPost;
    }

    throw new Error('Invalid response format');
  }

  async create(data: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiService.post<BlogApiResponse>(API_ENDPOINTS.BLOG.CREATE, data);

    if (response && typeof response === 'object' && 'data' in response) {
      const apiResponse = response as BlogApiResponse;
      return apiResponse.data as BlogPost;
    }

    throw new Error('Invalid response format');
  }

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiService.put<BlogApiResponse>(API_ENDPOINTS.BLOG.UPDATE(id), data);

    if (response && typeof response === 'object' && 'data' in response) {
      const apiResponse = response as BlogApiResponse;
      return apiResponse.data as BlogPost;
    }

    throw new Error('Invalid response format');
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(API_ENDPOINTS.BLOG.DELETE(id));
  }
}

export const blogService = new BlogService();
export default blogService;