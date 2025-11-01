export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  BASE_PATH: import.meta.env.VITE_API_BASE_PATH || '/api',
  TIMEOUT: 10000, // Reduced from 30s to 10s for faster failures
};

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgotpassword',
    RESET_PASSWORD: '/auth/reset-password',
    UPDATE_DETAILS: '/auth/updatedetails',
    UPDATE_PASSWORD: '/auth/updatepassword',
  },

  // User endpoints
  USERS: {
    LIST: '/auth/users',
    GET: (id: string) => `/auth/users/${id}`,
    CREATE: '/auth/users',
    UPDATE: (id: string) => `/auth/users/${id}`,
    DELETE: (id: string) => `/auth/users/${id}`,
    PROFILE: '/users/profile',
    STATS: '/auth/users/stats',
    STATUS: (id: string) => `/users/${id}/status`,
  },

  // Product endpoints
  PRODUCTS: {
    LIST: '/products',
    GET: (id: string) => `/products/${id}`,
    GET_BY_SLUG: (slug: string) => `/products/slug/${slug}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    FEATURED: '/products/featured',
    SEARCH: '/products/search',
    FAVORITES: '/products/favorites',
    CHECK_FAVORITE: (id: string) => `/products/${id}/favorite`,
    ADD_FAVORITE: (id: string) => `/products/${id}/favorite`,
    REMOVE_FAVORITE: (id: string) => `/products/${id}/favorite`,
  },

  // Category endpoints
  CATEGORIES: {
    LIST: '/categories',
    GET: (id: string) => `/categories/${id}`,
    GET_BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },

  // Order endpoints
  ORDERS: {
    LIST: '/orders',
    GET: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
    USER_ORDERS: '/orders/myorders',
    USER_TOTAL: '/orders/myorders/total',
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
  },

  // Cart endpoints
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart',
    UPDATE_ITEM: (id: string) => `/cart/${id}`,
    REMOVE_ITEM: (id: string) => `/cart/${id}`,
    CLEAR: '/cart',
  },

  // Blog endpoints
  BLOG: {
    LIST: '/blogs',
    GET: (id: string) => `/blogs/${id}`,
    GET_BY_SLUG: (slug: string) => `/blogs/slug/${slug}`,
    CREATE: '/blogs',
    UPDATE: (id: string) => `/blogs/${id}`,
    DELETE: (id: string) => `/blogs/${id}`,
    PUBLISHED: '/blogs',
    FEATURED: '/blogs/featured',
    RECENT: '/blogs/recent',
  },

  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    SALES: '/analytics/sales',
    PRODUCTS: '/analytics/products',
    CUSTOMERS: '/analytics/customers',
    EXPORT: '/analytics/export',
  },
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${endpoint}`;
};
