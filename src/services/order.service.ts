import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Order {
  _id: string;
  id?: string;
  orderNumber?: string;
  user: string | User;
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  totalPrice: number;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  items: OrderItem[];
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  id?: string;
  name: string;
  price: number;
  image?: string;
  brand?: string;
}

export interface OrderItem {
  product: string | Product;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CreateOrderDto {
  items: {
    product: string;
    name?: string;
    price?: number;
    quantity: number;
    image?: string;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice?: number;
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  message?: string;
}

class OrderService {
  async getAll(params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<Order[]>> {
    return apiService.get<ApiResponse<Order[]>>(API_ENDPOINTS.ORDERS.LIST, params);
  }

  async getById(id: string): Promise<ApiResponse<Order>> {
    return apiService.get<ApiResponse<Order>>(API_ENDPOINTS.ORDERS.GET(id));
  }

  async getUserOrders(): Promise<ApiResponse<Order[]>> {
    return apiService.get<ApiResponse<Order[]>>(API_ENDPOINTS.ORDERS.USER_ORDERS);
  }

  async getUserTotal(): Promise<ApiResponse<{ totalOrders: number; totalItems: number; totalSpent: number }>> {
    return apiService.get<ApiResponse<{ totalOrders: number; totalItems: number; totalSpent: number }>>(API_ENDPOINTS.ORDERS.USER_TOTAL);
  }

  async getStats(): Promise<ApiResponse<OrderStats>> {
    return apiService.get<ApiResponse<OrderStats>>('/orders/stats');
  }

  async create(data: CreateOrderDto): Promise<ApiResponse<Order>> {
    return apiService.post<ApiResponse<Order>>(API_ENDPOINTS.ORDERS.CREATE, data);
  }

  async updateStatus(id: string, orderStatus: Order['orderStatus'], trackingNumber?: string): Promise<ApiResponse<Order>> {
    return apiService.put<ApiResponse<Order>>(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { orderStatus, trackingNumber });
  }

  async updateToPaid(id: string, paymentData: { id: string; status: string; updateTime: string; emailAddress: string }): Promise<ApiResponse<Order>> {
    return apiService.put<ApiResponse<Order>>(`/orders/${id}/pay`, paymentData);
  }

  async cancel(id: string, reason?: string): Promise<ApiResponse<Order>> {
    return apiService.put<ApiResponse<Order>>(`/orders/${id}/cancel`, { reason });
  }
}

export const orderService = new OrderService();
export default orderService;

// Re-export interfaces to ensure they're available
export type { Order, OrderStats, User, Product, OrderItem, ShippingAddress, CreateOrderDto, ApiResponse };