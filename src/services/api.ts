import axios from 'axios';
import { API_CONFIG } from '../config/api';

interface RequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

class ApiService {
  private axiosInstance: any;
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');

    // Create axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: `${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}`,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle 401 Unauthorized specifically
        if (error.response?.status === 401) {
          this.clearToken();
          // Optionally redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        // Enhance error message
        const message = error.response?.data?.message ||
                       error.response?.data?.error ||
                       error.message ||
                       'An unexpected error occurred';

        return Promise.reject(new Error(message));
      }
    );
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Generic request method
  async request(endpoint: string, options = {}) {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        ...options,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // HTTP method shortcuts
  async get(endpoint: string, params?: Record<string, any>) {
    try {
      const response = await this.axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint: string, body?: any, options?: RequestOptions) {
    try {
      const response = await this.axiosInstance.post(endpoint, body, {
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint: string, body?: any, options?: RequestOptions) {
    try {
      const response = await this.axiosInstance.put(endpoint, body, {
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint: string, body?: any, options?: RequestOptions) {
    try {
      const response = await this.axiosInstance.patch(endpoint, body, {
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint: string, params?: Record<string, any>) {
    try {
      const response = await this.axiosInstance.delete(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // File upload with multipart/form-data
  async upload(endpoint: string, formData: FormData, method: string = 'POST') {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        method: method,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Download file
  async download(endpoint: string, filename?: string) {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        responseType: 'blob',
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename || 'download');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;