export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  BASE_PATH: import.meta.env.VITE_API_BASE_PATH || '/api',
  TIMEOUT: 30000,
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
    LIST: '/users',
    GET: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
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
    USER_ORDERS: '/orders/user',
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
    LIST: '/blog/posts',
    GET: (id: string) => `/blog/posts/${id}`,
    GET_BY_SLUG: (slug: string) => `/blog/posts/slug/${slug}`,
    CREATE: '/blog/posts',
    UPDATE: (id: string) => `/blog/posts/${id}`,
    DELETE: (id: string) => `/blog/posts/${id}`,
    PUBLISHED: '/blog/posts/published',
  },

  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    SALES: '/analytics/sales',
    PRODUCTS: '/analytics/products',
    CUSTOMERS: '/analytics/customers',
  },
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${endpoint}`;
};