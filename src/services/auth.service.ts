import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

class AuthService {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    if (response.token) {
      apiService.setToken(response.token);
    }

    return response;
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    if (response.token) {
      apiService.setToken(response.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      apiService.clearToken();
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiService.get<{success: boolean; data: User}>(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiService.put<User>(API_ENDPOINTS.AUTH.PROFILE, data);
  }

  async forgotPassword(email: string): Promise<void> {
    return apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
  }

  async refreshToken(): Promise<AuthResponse> {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  async request<T = unknown>(endpoint: string, options?: RequestInit): Promise<T> {
    return apiService.request<T>(endpoint, options as Record<string, unknown>);
  }

  async upload<T = unknown>(endpoint: string, formData: FormData, method: string = 'POST'): Promise<T> {
    return apiService.upload<T>(endpoint, formData, method);
  }

  async download(endpoint: string, filename?: string): Promise<void> {
    return apiService.download(endpoint, filename);
  }
}

export const authService = new AuthService();
export default authService;