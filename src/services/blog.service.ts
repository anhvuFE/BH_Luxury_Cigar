import apiService from './api';
import { API_ENDPOINTS } from '../config/api';
import type { BlogPost } from '../types/database';

export interface BlogFilters {
  status?: 'draft' | 'published';
  author_id?: string;
  search?: string;
  page?: number;
  limit?: number;
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
    return apiService.get<PaginatedBlogPosts>(API_ENDPOINTS.BLOG.LIST, filters as any);
  }

  async getPublished(filters?: Omit<BlogFilters, 'status'>): Promise<PaginatedBlogPosts> {
    return apiService.get<PaginatedBlogPosts>(API_ENDPOINTS.BLOG.PUBLISHED, filters as any);
  }

  async getById(id: string): Promise<BlogPost> {
    return apiService.get<BlogPost>(API_ENDPOINTS.BLOG.GET(id));
  }

  async getBySlug(slug: string): Promise<BlogPost> {
    return apiService.get<BlogPost>(API_ENDPOINTS.BLOG.GET_BY_SLUG(slug));
  }

  async create(data: Partial<BlogPost>): Promise<BlogPost> {
    return apiService.post<BlogPost>(API_ENDPOINTS.BLOG.CREATE, data);
  }

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    return apiService.put<BlogPost>(API_ENDPOINTS.BLOG.UPDATE(id), data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete(API_ENDPOINTS.BLOG.DELETE(id));
  }
}

export const blogService = new BlogService();
export default blogService;