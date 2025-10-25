import { API_ENDPOINTS } from '../config/api';
import authService from './auth.service';

interface ExportOptions {
  period: string;
  format?: 'xlsx' | 'csv' | 'pdf';
  startDate?: string;
  endDate?: string;
}

class AnalyticsService {
  async getDashboard(period: string = 'month') {
    return authService.request(`${API_ENDPOINTS.ANALYTICS.DASHBOARD}?period=${period}`);
  }

  async getSales(period: string = 'month') {
    return authService.request(`${API_ENDPOINTS.ANALYTICS.SALES}?period=${period}`);
  }

  async getProducts(period: string = 'month') {
    return authService.request(`${API_ENDPOINTS.ANALYTICS.PRODUCTS}?period=${period}`);
  }

  async getCustomers(period: string = 'month') {
    return authService.request(`${API_ENDPOINTS.ANALYTICS.CUSTOMERS}?period=${period}`);
  }

  async exportReport(options: ExportOptions): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('period', options.period);
      if (options.format) params.append('format', options.format);
      if (options.startDate) params.append('startDate', options.startDate);
      if (options.endDate) params.append('endDate', options.endDate);

      const endpoint = `${API_ENDPOINTS.ANALYTICS.EXPORT}?${params.toString()}`;

      // Generate filename based on period and date
      const date = new Date().toISOString().split('T')[0];
      const format = options.format || 'xlsx';
      const filename = `BH_Luxury_Cigar_Analytics_${options.period}_${date}.${format}`;

      // Use the download method from authService
      await authService.download(endpoint, filename);
    } catch (error) {
      console.error('Failed to export analytics report:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;