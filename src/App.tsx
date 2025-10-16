import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import components
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NewArrivalPage from './pages/NewArrivalPage';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';


// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';

function AppContent() {
  const location = useLocation();

  // Define routes that should not have Header/Footer
  const noLayoutRoutes = ['/login', '/register', '/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowLayout = !noLayoutRoutes.includes(location.pathname) && !isAdminRoute;

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowLayout && <Header />}
      <main className={shouldShowLayout ? "flex-grow" : "min-h-screen"}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/new-arrival" element={<NewArrivalPage />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />


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
        </Routes>
      </main>
      {shouldShowLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;