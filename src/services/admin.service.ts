import { apiService } from './api';

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
  _id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  description?: string;
  specifications?: Record<string, string>;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip';
  joinDate: string;
  avatar?: string;
}

class AdminService {
  // Dashboard Stats
  async getDashboardStats(): Promise<AdminStats> {
    try {
      const [products, orders, customers] = await Promise.all([
        this.getProducts(),
        this.getOrders(),
        this.getCustomers()
      ]);

      // Calculate stats from data
      const totalRevenue = orders.reduce((sum, order) => {
        const amount = parseFloat(order.total.replace(/[^0-9]/g, ''));
        return sum + amount;
      }, 0);

      const recentOrders = orders.slice(0, 5);
      const topProducts = products.slice(0, 3);

      return {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        totalRevenue,
        recentOrders,
        topProducts,
        monthlyRevenue: totalRevenue,
        newCustomers: customers.filter(c => {
          const joinDate = new Date(c.joinDate);
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
  async getProducts(): Promise<Product[]> {
    try {
      const response = await apiService.get('/products');
      return response.data.map((product: any) => ({
        _id: product._id,
        name: product.name,
        brand: product.brand || 'Unknown',
        price: product.price,
        image: product.image,
        category: product.category || 'Uncategorized',
        inStock: product.inStock,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        description: product.description,
        specifications: product.specifications
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const response = await apiService.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      const response = await apiService.put(`/products/${id}`, productData);
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
  async getCustomers(): Promise<Customer[]> {
    try {
      // Mock data since users endpoint might require auth
      const mockCustomers: Customer[] = [
        {
          _id: '1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@gmail.com',
          phone: '0901234567',
          orders: 12,
          totalSpent: 45600000,
          status: 'active',
          joinDate: '2023-06-15',
          avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=f59e0b&color=fff'
        },
        {
          _id: '2',
          name: 'Trần Thị B',
          email: 'tranthib@gmail.com',
          phone: '0912345678',
          orders: 8,
          totalSpent: 28400000,
          status: 'active',
          joinDate: '2023-08-20',
          avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=f59e0b&color=fff'
        },
        {
          _id: '3',
          name: 'Lê Minh C',
          email: 'leminhc@gmail.com',
          phone: '0923456789',
          orders: 15,
          totalSpent: 67250000,
          status: 'vip',
          joinDate: '2023-03-10',
          avatar: 'https://ui-avatars.com/api/?name=Le+Minh+C&background=f59e0b&color=fff'
        }
      ];
      return mockCustomers;
    } catch (error) {
      console.error('Error fetching customers:', error);
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