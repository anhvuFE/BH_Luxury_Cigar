import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_CONFIG } from '../../config/api';
import { useAdminProfile } from '../../hooks/useAdminProfile';
import analyticsService from '../../services/analytics.service';
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiMenu,
  HiX,
  HiOutlineBell,
  HiOutlineSearch
} from 'react-icons/hi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface TodayStats {
  newOrders: number;
  revenue: number;
}

interface ApiResponse {
  success: boolean;
  data: {
    todayStats?: TodayStats;
  };
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { userProfile, loadUserProfile, updateProfile } = useAdminProfile();
  const [todayStats, setTodayStats] = useState<TodayStats>({ newOrders: 0, revenue: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // Load today's statistics
  const loadTodayStats = async () => {
    try {
      setStatsLoading(true);
      const response = await analyticsService.getDashboard('today');

      const apiResponse = response as ApiResponse;
      if (apiResponse && apiResponse.success) {
        const data = apiResponse.data;
        setTodayStats({
          newOrders: data.todayStats?.newOrders || 0,
          revenue: data.todayStats?.revenue || 0
        });
      } else {
        // Fallback to mock data if API fails
        setTodayStats({ newOrders: 12, revenue: 2400000 });
      }
    } catch (error) {
      console.error('Failed to load today stats:', error);
      // Fallback to mock data
      setTodayStats({ newOrders: 12, revenue: 2400000 });
    } finally {
      setStatsLoading(false);
    }
  };

  // Load stats on component mount
  useEffect(() => {
    loadTodayStats();
  }, []);

  // Format currency for display
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `₫${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `₫${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₫${(value / 1000).toFixed(1)}K`;
    }
    return `₫${value.toLocaleString('vi-VN')}`;
  };

  // Listen for profile updates from settings page
  useEffect(() => {
    const handleProfileUpdate = (event: CustomEvent) => {
      const { avatar, name } = event.detail;
      updateProfile({ avatar, name });
    };

    window.addEventListener('profileUpdated', handleProfileUpdate as EventListener);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate as EventListener);
    };
  }, [updateProfile]);

  // Reload profile when navigating to settings
  useEffect(() => {
    if (location.pathname === '/admin/settings') {
      setTimeout(() => {
        loadUserProfile();
      }, 200);
    }
  }, [location.pathname, loadUserProfile]);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HiOutlineHome },
    { name: 'Sản phẩm', href: '/admin/products', icon: HiOutlineShoppingBag },
    { name: 'Đơn hàng', href: '/admin/orders', icon: HiOutlineDocumentText },
    { name: 'Khách hàng', href: '/admin/customers', icon: HiOutlineUsers },
    { name: 'Báo cáo', href: '/admin/analytics', icon: HiOutlineChartBar },
    { name: 'Cài đặt', href: '/admin/settings', icon: HiOutlineCog },
  ];

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-gray-800 hover:bg-gray-700 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <HiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent
              navigation={navigation}
              isActivePath={isActivePath}
              todayStats={todayStats}
              statsLoading={statsLoading}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <SidebarContent
            navigation={navigation}
            isActivePath={isActivePath}
            todayStats={todayStats}
            statsLoading={statsLoading}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-amber-100">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 hover:text-amber-600 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 lg:hidden transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 lg:px-6 flex justify-between items-center">
            <div className="flex-1 flex max-w-xs lg:max-w-md">
              <div className="w-full flex lg:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-amber-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3 lg:pl-4">
                    <HiOutlineSearch className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <input
                    className="block w-full h-10 pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Tìm kiếm..."
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="ml-3 lg:ml-6 flex items-center space-x-2 lg:space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
                <HiOutlineBell className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="absolute -top-1 -right-1 h-2 w-2 lg:h-3 lg:w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Profile dropdown */}
              <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 hover:bg-amber-50 transition-colors cursor-pointer">
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-amber-200"
                  src={userProfile.avatar && userProfile.avatar.trim() ?
                    (userProfile.avatar.startsWith('http') ?
                      userProfile.avatar :
                      `${API_CONFIG.BASE_URL}${userProfile.avatar}`
                    ) :
                    "https://ui-avatars.com/api/?name=" + encodeURIComponent(userProfile.name) + "&background=f59e0b&color=fff"
                  }
                  alt="Admin"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userProfile.name) + "&background=f59e0b&color=fff";
                  }}
                />
                <div className="ml-2 lg:ml-3 hidden sm:block">
                  <span className="text-sm font-semibold text-gray-800">{userProfile.name}</span>
                  <p className="text-xs text-gray-500 hidden lg:block">{userProfile.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar content component
const SidebarContent: React.FC<{
  navigation: NavigationItem[];
  isActivePath: (path: string) => boolean;
  todayStats: TodayStats;
  statsLoading: boolean;
  formatCurrency: (value: number) => string;
}> = ({ navigation, isActivePath, todayStats, statsLoading, formatCurrency }) => {
  return (
    <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-6">
          <Link to="/" className="flex items-center">
            <img
              className="h-10 w-auto"
              src="/images/logo.png"
              alt="BH Luxury Cigar"
            />
            <div className="ml-3">
              <span className="text-xl font-bold text-gray-900">Admin</span>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                <div className={`mr-3 flex-shrink-0 ${isActive ? '' : ''}`}>
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-amber-600'
                    }`}
                  />
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Stats Card */}
        <div className="mx-4 mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Thống kê hôm nay</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Đơn hàng mới</span>
              {statsLoading ? (
                <div className="w-6 h-4 bg-amber-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-sm font-bold text-amber-600">{todayStats.newOrders}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Doanh thu</span>
              {statsLoading ? (
                <div className="w-12 h-4 bg-amber-200 rounded animate-pulse"></div>
              ) : (
                <span className="text-sm font-bold text-amber-600">{formatCurrency(todayStats.revenue)}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <Link
          to="/login"
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <HiOutlineLogout className="h-5 w-5 mr-3 text-gray-400" />
          <span>Đăng xuất</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminLayout;