import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export interface CartItem {
  productId: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  quantity: number;
  addedAt: string;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  count: number;
  totalItems: number;
  itemsPrice: number;
  data: CartItem[];
}

class CartService {
  async getCart(): Promise<CartResponse> {
    return apiService.get<CartResponse>(API_ENDPOINTS.CART.GET);
  }

  async addItem(productId: string, quantity: number = 1): Promise<CartResponse> {
    return apiService.post(API_ENDPOINTS.CART.ADD_ITEM, {
      productId,
      quantity
    });
  }

  async updateItem(productId: string, quantity: number): Promise<{ success: boolean; message: string }> {
    return apiService.post(API_ENDPOINTS.CART.ADD_ITEM, {
      productId,
      quantity
    });
  }

  async removeItem(productId: string): Promise<{ success: boolean; message: string }> {
    return apiService.delete(API_ENDPOINTS.CART.REMOVE_ITEM(productId));
  }

  async clearCart(): Promise<{ success: boolean; message: string }> {
    return apiService.delete(API_ENDPOINTS.CART.CLEAR);
  }
}

export const cartService = new CartService();
export default cartService;