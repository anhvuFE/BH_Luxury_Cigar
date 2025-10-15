import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import components
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NewArrivalPage from './pages/NewArrivalPage';
import AdminSeedPage from './pages/AdminSeedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';







function AppContent() {
  const location = useLocation();

  // Define routes that should not have Header/Footer
  const noLayoutRoutes = ['/login', '/register', '/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/seed';
  const shouldShowLayout = !noLayoutRoutes.includes(location.pathname) && !isAdminRoute;

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowLayout && <Header />}
      <main className={shouldShowLayout ? "flex-grow" : "min-h-screen"}>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />

          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/new-arrival" element={<NewArrivalPage />} />
          <Route path="/admin/seed" element={<AdminSeedPage />} />
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