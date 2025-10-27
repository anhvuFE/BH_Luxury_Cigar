import { apiService } from './api';
import { API_ENDPOINTS } from '../config/api';

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: Order[];
  topProducts: Product[];
  monthlyRevenue: number;
  newCustomers: number;
  conversionRate: number;
}

export interface Order {
  _id: string;
  customer: string;
  email: string;
  products: number;
  total: string;
  payment: 'paid' | 'pending' | 'failed';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface Product {
  id: string;
  _id?: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category: string;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  orders?: number;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  orderCount?: number;
  totalSpent?: number;
  averageOrderValue?: number;
  lastOrderDate?: string;
  isActive?: boolean;
  joinDate?: string;
  avatar?: string | null;
  image?: string | null;
  totalOrders?: number;
}

export interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomersThisMonth: number;
  averageSpent: number;
  totalRevenueFromCustomers: number;
}

interface CustomersResponse {
  data: Customer[];
  pagination: PaginationMeta & { pages: number };
  stats?: CustomerStats;
}

export interface CustomerDetailResponse {
  user: Customer;
  metrics: {
    orderCount: number;
    paidOrders: number;
    totalSpent: number;
    lastOrderDate: string | null;
    averageOrderValue: number;
    statusBreakdown: Array<{ status: string; count: number }>;
  };
  recentOrders: Array<{
    _id?: string;
    orderNumber?: string;
    totalPrice: number;
    orderStatus: string;
    createdAt: string;
    isPaid: boolean;
  }>;
}

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: 'active' | 'inactive';
  search?: string;
  includeStats?: boolean;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages?: number;
}

class AdminService {
  // Dashboard Stats
  async getDashboardStats(): Promise<AdminStats> {
    try {
      // Get products response to get total count
      const allProductsResponse = await apiService.get<{ total?: number }>('/products');
      const totalProducts = allProductsResponse.total || 0;

      const [topProductsResponse, orders, customerPayload] = await Promise.all([
        this.getProducts(1, 3), // Get first 3 for topProducts
        this.getOrders(),
        this.getCustomers({ page: 1, limit: 100, includeStats: true })
      ]);

      const products = topProductsResponse.data;
      const customers = customerPayload.customers;
      const customerStats = customerPayload.stats;

      // Calculate stats from data
      const totalRevenue = orders.reduce((sum, order) => {
        const amount = parseFloat(order.total.replace(/[^0-9]/g, ''));
        return sum + amount;
      }, 0);

      const recentOrders = orders.slice(0, 5);
      const topProducts = products.slice(0, 3);

      return {
        totalProducts,
        totalOrders: orders.length,
        totalCustomers: customerStats?.totalCustomers ?? customers.length,
        totalRevenue,
        recentOrders,
        topProducts,
        monthlyRevenue: totalRevenue,
        newCustomers: customerStats?.newCustomersThisMonth ?? customers.filter(c => {
          if (!c.joinDate) return false;
          const joinDate = new Date(c.joinDate);
          if (Number.isNaN(joinDate.getTime())) return false;
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return joinDate > monthAgo;
        }).length,
        conversionRate: 3.24
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Products
  async getProducts(page?: number, limit?: number): Promise<{ data: Product[]; total: number; pagination: PaginationMeta }> {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      if (limit) params.append('limit', limit.toString());

      const url = `/products${params.toString() ? `?${params.toString()}` : ''}`;
      return apiService.get<{ data: Product[]; total: number; pagination: PaginationMeta }>(url);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductsTotal(): Promise<number> {
    try {
      const response = await apiService.get<{ total: number }>('/products?limit=1');
      return response.total;
    } catch (error) {
      console.error('Error fetching products total:', error);
      throw error;
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const response = await apiService.post<{ data: Product }>('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      const response = await apiService.put<{ data: Product }>(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await apiService.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async uploadProductImage(file: File): Promise<{ filename: string; path: string; url: string }> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await apiService.upload<{ data: { filename: string; path: string; url: string } }>('/products/upload', formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw error;
    }
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    try {
      // Mock data since orders endpoint requires auth
      // In real app, this would be: const response = await apiService.get('/orders');
      const mockOrders: Order[] = [
        {
          _id: 'DH001',
          customer: 'Nguyễn Văn A',
          email: 'nguyenvana@gmail.com',
          products: 2,
          total: '₫5,700,000',
          payment: 'paid',
          status: 'delivered',
          date: '2024-01-15'
        },
        {
          _id: 'DH002',
          customer: 'Trần Thị B',
          email: 'tranthib@gmail.com',
          products: 1,
          total: '₫3,200,000',
          payment: 'paid',
          status: 'shipped',
          date: '2024-01-15'
        },
        {
          _id: 'DH003',
          customer: 'Lê Minh C',
          email: 'leminhc@gmail.com',
          products: 3,
          total: '₫8,250,000',
          payment: 'pending',
          status: 'pending',
          date: '2024-01-14'
        }
      ];
      return mockOrders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Customers
  async getCustomers(params: GetCustomersParams = {}): Promise<{
    customers: Customer[];
    pagination: PaginationMeta & { pages: number };
    stats?: CustomerStats;
  }> {
    try {
      const query: Record<string, string | number | boolean> = {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        role: params.role ?? 'user',
        includeStats: params.includeStats ?? true
      };

      if (params.status) {
        query.status = params.status;
      }

      if (params.search) {
        query.search = params.search;
      }

      if (params.sortField) {
        query.sortField = params.sortField;
      }

      if (params.sortOrder) {
        query.sortOrder = params.sortOrder;
      }

      const response = await apiService.get<CustomersResponse>(API_ENDPOINTS.USERS.LIST, query);

      return {
        customers: response.data || [],
        pagination: response.pagination || {
          page: Number(query.page) || 1,
          limit: Number(query.limit) || 10,
          pages: 1,
          total: response.data?.length || 0
        },
        stats: response.stats
      };
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async getCustomerById(id: string): Promise<CustomerDetailResponse> {
    try {
      const response = await apiService.get<{ data: CustomerDetailResponse }>(API_ENDPOINTS.USERS.GET(id));
      return response.data || response;
    } catch (error) {
      console.error('Error fetching customer detail:', error);
      throw error;
    }
  }

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    try {
      const response = await apiService.put<{ data: Customer }>(API_ENDPOINTS.USERS.UPDATE(id), data);
      return response.data || response;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  async updateCustomerStatus(id: string, isActive: boolean): Promise<Customer> {
    try {
      const response = await apiService.patch<{ data: Customer }>(API_ENDPOINTS.USERS.STATUS(id), { isActive });
      return response.data || response;
    } catch (error) {
      console.error('Error updating customer status:', error);
      throw error;
    }
  }

  async getUserOrderSummary(id: string): Promise<{ orderCount: number; totalSpent: number }> {
    try {
      const response = await apiService.get<{ data: { orderCount: number; totalSpent: number } }>(`/users/${id}/orders/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user order summary:', error);
      throw error;
    }
  }

  // Analytics
  async getAnalytics() {
    try {
      const stats = await this.getDashboardStats();

      return {
        overview: {
          totalRevenue: stats.totalRevenue,
          totalOrders: stats.totalOrders,
          totalCustomers: stats.totalCustomers,
          avgOrderValue: stats.totalRevenue / stats.totalOrders
        },
        monthlyData: [
          { month: 'Jan', revenue: 125680000, orders: 156, customers: 89 },
          { month: 'Feb', revenue: 148920000, orders: 184, customers: 102 },
          { month: 'Mar', revenue: 132450000, orders: 167, customers: 95 },
          { month: 'Apr', revenue: 156780000, orders: 198, customers: 118 },
          { month: 'May', revenue: 143290000, orders: 175, customers: 108 },
          { month: 'Jun', revenue: 167340000, orders: 210, customers: 125 }
        ],
        topCategories: [
          { name: 'Cuban Cigars', revenue: 89450000, percentage: 45.2 },
          { name: 'Dominican Cigars', revenue: 67320000, percentage: 34.1 },
          { name: 'Nicaraguan Cigars', revenue: 28670000, percentage: 14.5 },
          { name: 'Accessories', revenue: 12560000, percentage: 6.2 }
        ]
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
}

export const adminService = new AdminService();
