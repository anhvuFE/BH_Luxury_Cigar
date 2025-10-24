import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

// Import components
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './hooks/useToast';
import { CartProvider } from './contexts/CartContext';

// Critical pages (loaded immediately)
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';

// Lazy loaded imports
import {
  ProfilePage,
  CartPage,
  BlogPage,
  GuidePage,
  AboutPage,
  ProductDetailPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AdminDashboard,
  AdminProducts,
  AdminOrders,
  AdminCustomers,
  AdminAnalytics,
  AdminSettings
} from './utils/lazyImports';
import { PageLoader } from './components/ui/LoadingSpinner';

function AppContent() {
  const location = useLocation();

  // Define routes that should not have Header/Footer
  const noLayoutRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowLayout = !noLayoutRoutes.includes(location.pathname) && !isAdminRoute;

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowLayout && <Header />}
      <main className={shouldShowLayout ? "flex-grow pt-20" : "min-h-screen"}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* User Profile */}
          <Route path="/profile" element={<ProfilePage />} />


          {/* Admin Pages - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          </Routes>
        </Suspense>
      </main>
      {shouldShowLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <ScrollToTop />
          <AppContent />
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;