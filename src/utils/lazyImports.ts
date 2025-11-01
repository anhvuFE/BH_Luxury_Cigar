import { lazy, type ComponentType } from 'react';

type LazyImport = () => Promise<{ default: ComponentType<object> }>;

// Critical optimization: Add prefetch hints for likely next pages
const createLazyComponent = (importFn: LazyImport, prefetch = false) => {
  const Component = lazy(importFn);

  // Prefetch for likely navigation paths
  if (prefetch && typeof window !== 'undefined') {
    // Prefetch after initial load
    setTimeout(() => {
      importFn().catch(() => {
        // Ignore prefetch errors
      });
    }, 2000);
  }

  return Component;
};

// Admin Pages - Heavy, only load when accessed
export const AdminDashboard = createLazyComponent(() => import('../pages/admin/AdminDashboard'));
export const AdminProducts = createLazyComponent(() => import('../pages/admin/AdminProducts'));
export const AdminOrders = createLazyComponent(() => import('../pages/admin/AdminOrders'));
export const AdminCustomers = createLazyComponent(() => import('../pages/admin/AdminCustomers'));
export const AdminAnalytics = createLazyComponent(() => import('../pages/admin/AdminAnalytics'));
export const AdminSettings = createLazyComponent(() => import('../pages/admin/AdminSettings'));
export const AdminBlogs = createLazyComponent(() => import('../pages/admin/AdminBlogs'));

// High priority pages - Prefetch for better UX
export const ProfilePage = createLazyComponent(() => import('../pages/ProfilePage'), true);
export const CartPage = createLazyComponent(() => import('../pages/CartPage'), true);
export const GuidePage = createLazyComponent(() => import('../pages/GuidePage'), true);
export const AboutPage = createLazyComponent(() => import('../pages/AboutPage'), true);

// Medium priority pages
export const ProductDetailPage = createLazyComponent(() => import('../pages/ProductDetailPage'));
export const BlogPage = createLazyComponent(() => import('../pages/BlogPage'));

// Auth pages - Load only when needed
export const LoginPage = createLazyComponent(() => import('../pages/LoginPage'));
export const RegisterPage = createLazyComponent(() => import('../pages/RegisterPage'));
export const ForgotPasswordPage = createLazyComponent(() => import('../pages/ForgotPasswordPage'));
export const ResetPasswordPage = createLazyComponent(() => import('../pages/ResetPasswordPage'));
