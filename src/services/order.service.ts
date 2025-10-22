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

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface CreateOrderDto {
  items: {
    product_id: string;
    quantity: number;
  }[];
  shipping_address: ShippingAddress;
  payment_method: string;
  itemsPrice?: number;
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
}

class OrderService {
  async getAll(): Promise<Order[]> {
    return apiService.get<Order[]>(API_ENDPOINTS.ORDERS.LIST);
  }

  async getById(id: string): Promise<Order> {
    return apiService.get<Order>(API_ENDPOINTS.ORDERS.GET(id));
  }

  async getUserOrders(): Promise<Order[]> {
    return apiService.get<Order[]>(API_ENDPOINTS.ORDERS.USER_ORDERS);
  }

  async create(data: CreateOrderDto): Promise<Order> {
    return apiService.post<Order>(API_ENDPOINTS.ORDERS.CREATE, data);
  }

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    return apiService.patch<Order>(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status });
  }

  async cancel(id: string): Promise<Order> {
    return this.updateStatus(id, 'cancelled');
  }
}

export const orderService = new OrderService();
export default orderService;