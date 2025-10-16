import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: any;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: any;
}

export interface CreateOrderDto {
  items: {
    product_id: string;
    quantity: number;
  }[];
  shipping_address: any;
  payment_method: string;
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