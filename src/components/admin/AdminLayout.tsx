import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-amber-50/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl shadow-2xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-black/20 hover:bg-black/30 transition-all duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <HiX className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent navigation={navigation} isActivePath={isActivePath} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <SidebarContent navigation={navigation} isActivePath={isActivePath} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 lg:h-20 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
          <button
            className="px-4 lg:px-6 border-r border-gray-200/50 text-gray-500 hover:text-amber-600 hover:bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 lg:hidden transition-all duration-200"
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
                    className="block w-full h-10 lg:h-12 pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 bg-gray-50/70 border border-gray-200/50 rounded-xl lg:rounded-2xl text-sm lg:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-300 font-body transition-all duration-200"
                    placeholder="Tìm kiếm..."
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="ml-3 lg:ml-6 flex items-center space-x-2 lg:space-x-4">
              {/* Notifications */}
              <button className="relative bg-gray-50/70 p-2 lg:p-3 rounded-xl lg:rounded-2xl text-gray-500 hover:text-amber-600 hover:bg-amber-50/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 group">
                <HiOutlineBell className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="absolute -top-1 -right-1 h-2 w-2 lg:h-3 lg:w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Profile dropdown */}
              <div className="flex items-center bg-gray-50/70 rounded-xl lg:rounded-2xl px-2 lg:px-4 py-1 lg:py-2 hover:bg-amber-50/70 transition-all duration-200 cursor-pointer group">
                <img
                  className="h-8 w-8 lg:h-10 lg:w-10 rounded-lg lg:rounded-xl object-cover ring-2 ring-white shadow-md"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin"
                />
                <div className="ml-2 lg:ml-3 hidden sm:block">
                  <span className="text-xs lg:text-sm font-semibold text-gray-800 font-body group-hover:text-amber-700 transition-colors duration-200">Xuan Anh</span>
                  <p className="text-xs text-gray-500 font-body hidden lg:block">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gradient-to-br from-white/50 to-gray-50/30">
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
  navigation: any[];
  isActivePath: (path: string) => boolean;
}> = ({ navigation, isActivePath }) => {
  return (
    <div className="flex flex-col h-0 flex-1 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20">
      {/* Logo */}
      <div className="flex-1 flex flex-col pt-8 pb-6 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 lg:px-6 mb-6 lg:mb-8">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img
                className="h-8 lg:h-10 w-auto filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                src="/src/assets/images/logo.png"
                alt="BH Luxury Cigar"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="ml-2 lg:ml-3">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-heading">Admin</span>
              <p className="text-xs text-gray-500 font-body">Dashboard</p>
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
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/25 transform scale-[1.02]'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 hover:scale-[1.01] hover:shadow-md'
                }`}
              >
                <div className={`mr-4 flex-shrink-0 p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 shadow-lg'
                    : 'bg-gray-100 group-hover:bg-amber-100 group-hover:shadow-md'
                }`}>
                  <item.icon
                    className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-amber-600'
                    }`}
                  />
                </div>
                <span className="font-body font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Stats Card */}
        <div className="mx-3 lg:mx-4 mt-4 lg:mt-6 p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl border border-blue-100">
          <h4 className="text-xs lg:text-sm font-semibold text-gray-800 font-body mb-2">Thống kê hôm nay</h4>
          <div className="space-y-1 lg:space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 font-body">Đơn hàng mới</span>
              <span className="text-xs lg:text-sm font-bold text-blue-600 font-body">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 font-body">Doanh thu</span>
              <span className="text-xs lg:text-sm font-bold text-green-600 font-body">₫2.4M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200/50">
        <Link
          to="/login"
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-300 group hover:scale-[1.01] hover:shadow-md"
        >
          <div className="mr-4 p-2 bg-gray-100 group-hover:bg-red-100 rounded-xl transition-all duration-300">
            <HiOutlineLogout className="h-5 w-5 text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
          </div>
          <span className="font-body font-medium">Đăng xuất</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminLayout;