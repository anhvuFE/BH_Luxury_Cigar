import apiService from './api';
import { API_ENDPOINTS } from '../config/api';
import type { Category } from '../types/database';

class CategoryService {
  async getAll(): Promise<Category[]> {
    return apiService.get<Category[]>(API_ENDPOINTS.CATEGORIES.LIST);
  }

  async getById(id: string): Promise<Category> {
    return apiService.get<Category>(API_ENDPOINTS.CATEGORIES.GET(id));
  }

  async getBySlug(slug: string): Promise<Category> {
    return apiService.get<Category>(API_ENDPOINTS.CATEGORIES.GET_BY_SLUG(slug));
  }

  async create(data: Partial<Category>): Promise<Category> {
    return apiService.post<Category>(API_ENDPOINTS.CATEGORIES.CREATE, data);
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    return apiService.put<Category>(API_ENDPOINTS.CATEGORIES.UPDATE(id), data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete(API_ENDPOINTS.CATEGORIES.DELETE(id));
  }
}

export const categoryService = new CategoryService();
export default categoryService;