import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePencil,
  HiOutlineKey,
  HiOutlineShoppingBag,
  HiOutlineCog,
  HiOutlineSave,
  HiOutlineX,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi';
import authService from '../services/auth.service';
import { useToast } from '../hooks/useToast';
import { API_CONFIG } from '../config/api';
import type { Order } from '../types/database';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProfilePage: React.FC = () => {
  const { showSuccess, showError } = useToast();

  // Helper function for safe date formatting
  const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return 'Không có thông tin';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Không có thông tin' : date.toLocaleDateString('vi-VN');
  };
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  // Tab-specific states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [tabLoading, setTabLoading] = useState(false);

  // Avatar upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadUserProfile();
    loadOrders(); // Load orders immediately to show count in activity cards
    loadTotalSpending(); // Load total spending for activity cards
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);

      // Check if user is authenticated first
      if (!authService.isAuthenticated()) {
        setError('Bạn chưa đăng nhập');
        return;
      }

      // Try to fetch from API first
      try {
        const response = await authService.request('/profile');
        // Backend returns {success: true, data: user}
        const profile = (response as { data?: User } & User).data || (response as User);
        setUser(profile);
        setEditForm({
          name: profile.name || '',
          phone: profile.phone || '',
          address: {
            street: profile.address?.street || '',
            city: profile.address?.city || '',
            state: profile.address?.state || '',
            zipCode: profile.address?.zipCode || '',
            country: profile.address?.country || '',
          },
        });
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(profile));
        localStorage.setItem('userRole', profile.role);
      } catch (apiError) {
        console.warn('API fetch failed, using localStorage:', apiError);

        // Fallback to localStorage if API fails
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const localUser = JSON.parse(userData);
            setUser(localUser);
            setEditForm({
              name: localUser.name || '',
              phone: localUser.phone || '',
              address: {
                street: localUser.address?.street || '',
                city: localUser.address?.city || '',
                state: localUser.address?.state || '',
                zipCode: localUser.address?.zipCode || '',
                country: localUser.address?.country || '',
              },
            });
          } catch (parseError) {
            console.error('Error parsing localStorage user data:', parseError);
            setError('Dữ liệu người dùng bị lỗi');
          }
        } else {
          setError('Không tìm thấy thông tin người dùng');
        }
      }
    } catch (err: unknown) {
      setError('Không thể tải thông tin người dùng');
      console.error('Profile load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await authService.request('/auth/updatedetails', {
        method: 'PUT',
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone,
          address: editForm.address
        }),
      });

      setIsEditing(false);
      // Update local user state with response
      const updatedUser = (response as { data?: User } & User).data || (response as User);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      showSuccess('Cập nhật thông tin thành công!');
    } catch (error: unknown) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Không thể cập nhật thông tin';
      showError(errorMessage);
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditForm({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || '',
        },
      });
    }
    setIsEditing(false);
  };

  // Load total spending
  const loadTotalSpending = async () => {
    try {
      const response = await authService.request('/orders/myorders/total');
      const data = (response as any).data || response;
      setTotalSpending(data.totalSpent || 0);
    } catch (error) {
      setTotalSpending(0);
    }
  };

  // Load orders
  const loadOrders = async () => {
    try {
      setTabLoading(true);
      let response;

      try {
        response = await authService.request('/orders/myorders');
      } catch (error) {
        // Fallback to order service
        const { orderService } = await import('../services/order.service');
        response = await orderService.getUserOrders();
      }

      const ordersData = (response as { data?: Order[] } & Order[]).data || (response as Order[]) || [];
      setOrders(ordersData);
    } catch (error) {
      setOrders([]);
    } finally {
      setTabLoading(false);
    }
  };


  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setTabLoading(true);
      await authService.request('/auth/updatepassword', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setError(null);
      showSuccess('Đổi mật khẩu thành công!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Đổi mật khẩu thất bại';
      setError(errorMessage);
    } finally {
      setTabLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh hợp lệ');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File ảnh không được vượt quá 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);

      // Create FormData with all current profile data plus avatar
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      formData.append('name', user?.name || '');
      formData.append('phone', user?.phone || '');
      if (user?.address) {
        formData.append('address', JSON.stringify(user.address));
      }

      // Upload to profile endpoint using PUT method
      const response = await authService.upload('/profile', formData, 'PUT');

      // Update user state
      const updatedUser = (response as { data?: User } & User).data || (response as User);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Clean up
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(null);
      showSuccess('Cập nhật ảnh đại diện thành công!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Upload ảnh thất bại';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // Cancel avatar upload
  const handleCancelUpload = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Role-based redirect for admin
  if (user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiOutlineCog className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Tài khoản Admin</h3>
          <p className="text-gray-600 mb-6 font-body">
            Bạn đang đăng nhập với quyền quản trị viên. Vui lòng sử dụng trang quản trị để quản lý hệ thống.
          </p>
          <div className="space-y-3">
            <Link
              to="/admin"
              className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-body font-medium"
            >
              Đi tới trang quản trị
            </Link>
            <Link
              to="/"
              className="block w-full text-gray-600 hover:text-amber-600 transition-colors font-body"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-body">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4 font-body">{error || 'Không tìm thấy thông tin người dùng'}</p>
          <Link
            to="/login"
            className="text-amber-600 hover:text-amber-700 transition-colors font-body"
          >
            Đăng nhập lại
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.3'%3E%3Cpath d='M20 0L24.5 15.5L40 20L24.5 24.5L20 40L15.5 24.5L0 20L15.5 15.5L20 0Z' fill='white'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar Section */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm shadow-2xl">
                  {previewUrl || user.avatar ? (
                    <img
                      src={previewUrl || (user.avatar?.startsWith('http') ? user.avatar : `${API_CONFIG.BASE_URL}${user.avatar}`)}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HiOutlineUser className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white/80" />
                    </div>
                  )}
                </div>

                {/* Upload Controls - Fixed positioning */}
                <div className="absolute -bottom-1 -right-1">
                  {selectedFile ? (
                    <div className="flex gap-1">
                      <button
                        onClick={handleAvatarUpload}
                        disabled={uploading}
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
                        title="Lưu ảnh"
                      >
                        {uploading ? (
                          <div className="w-2 h-2 sm:w-3 sm:h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <HiOutlineSave className="w-2 h-2 sm:w-3 sm:h-3" />
                        )}
                      </button>
                      <button
                        onClick={handleCancelUpload}
                        disabled={uploading}
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
                        title="Hủy"
                      >
                        <HiOutlineX className="w-2 h-2 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 text-white rounded-full shadow-xl cursor-pointer transition-all flex items-center justify-center backdrop-blur-sm">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <HiOutlinePencil className="w-2 h-2 sm:w-3 sm:h-3" />
                    </label>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="text-center lg:text-left flex-1 lg:ml-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4 tracking-tight">
                  {user.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    {user.role === 'user' ? 'Thành viên VIP' : 'Quản trị viên'}
                  </span>
                  <span className="text-amber-200/90 font-body text-sm sm:text-base">
                    Thành viên từ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 mb-3 sm:mb-4">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'profile'
                    ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50/30'
                }`}
              >
                <HiOutlineUser className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Thông tin cá nhân</span>
                <span className="sm:hidden">Hồ sơ</span>
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'password'
                    ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50/30'
                }`}
              >
                <HiOutlineKey className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Đổi mật khẩu</span>
                <span className="sm:hidden">Mật khẩu</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'orders'
                    ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50/30'
                }`}
              >
                <HiOutlineClipboardList className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Đơn hàng của tôi</span>
                <span className="sm:hidden">Đơn hàng</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            {activeTab === 'profile' && (
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
                      Thông Tin Cá Nhân
                    </h2>
                    <p className="text-gray-600 font-body mt-1 text-sm sm:text-base">
                      Cập nhật thông tin để nhận được dịch vụ tốt nhất
                    </p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center justify-center px-4 sm:px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-body font-medium text-sm sm:text-base"
                    >
                      <HiOutlinePencil className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={handleCancel}
                        className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-body font-medium text-sm sm:text-base"
                      >
                        <HiOutlineX className="w-4 h-4 mr-2" />
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center justify-center px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg font-body font-medium text-sm sm:text-base"
                      >
                        <HiOutlineSave className="w-4 h-4 mr-2" />
                        Lưu
                      </button>
                    </div>
                  )}
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-body">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={isEditing ? editForm.name : user.name}
                      onChange={(e) => isEditing && setEditForm({...editForm, name: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg font-body text-gray-700 transition-all duration-300 ${
                        isEditing
                          ? 'border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3 font-body">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiOutlineMail className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                        </div>
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-amber-200 rounded-lg bg-amber-50/30 text-gray-700 font-body text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3 font-body">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiOutlinePhone className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                        </div>
                        <input
                          type="tel"
                          value={isEditing ? editForm.phone : (user.phone || '')}
                          onChange={(e) => isEditing && setEditForm({...editForm, phone: e.target.value})}
                          placeholder={isEditing ? "Nhập số điện thoại" : "Chưa cập nhật"}
                          readOnly={!isEditing}
                          className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border rounded-lg font-body text-gray-700 transition-all duration-300 text-sm sm:text-base ${
                            isEditing
                              ? 'border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6 font-heading">
                    Hoạt động gần đây
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Đơn hàng */}
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold font-heading">{orders.length}</p>
                          <p className="text-amber-100 font-medium font-body">Đơn hàng đã đặt</p>
                        </div>
                        <HiOutlineShoppingBag className="w-12 h-12 text-amber-200" />
                      </div>
                    </div>

                    {/* Tổng chi tiêu */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold font-heading">
                            {totalSpending.toLocaleString('vi-VN')}đ
                          </p>
                          <p className="text-green-100 font-medium font-body">Tổng chi tiêu</p>
                        </div>
                        <HiOutlineCurrencyDollar className="w-12 h-12 text-green-200" />
                      </div>
                    </div>

                    {/* Thành viên từ */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold font-heading">
                            {new Date(user.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                          </p>
                          <p className="text-blue-100 font-medium font-body">Thành viên từ</p>
                        </div>
                        <HiOutlineCalendar className="w-12 h-12 text-blue-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Password Change Tab */}
            {activeTab === 'password' && (
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
                    Đổi Mật Khẩu
                  </h2>
                  <p className="text-gray-600 font-body mt-1 text-sm sm:text-base">
                    Cập nhật mật khẩu để bảo mật tài khoản
                  </p>
                </div>

                <form onSubmit={handlePasswordChange} className="max-w-md mx-auto space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-body">
                      Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 sm:py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-body text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPasswords.current ? (
                          <HiOutlineEyeOff className="w-5 h-5" />
                        ) : (
                          <HiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-body">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        required
                        minLength={6}
                        className="w-full px-4 py-2.5 sm:py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-body text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPasswords.new ? (
                          <HiOutlineEyeOff className="w-5 h-5" />
                        ) : (
                          <HiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 font-body">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        required
                        minLength={6}
                        className="w-full px-4 py-2.5 sm:py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-body text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPasswords.confirm ? (
                          <HiOutlineEyeOff className="w-5 h-5" />
                        ) : (
                          <HiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={tabLoading}
                    className="w-full py-2.5 sm:py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-body font-medium disabled:opacity-50 text-sm sm:text-base"
                  >
                    {tabLoading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                  </button>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
                    Đơn Hàng Của Tôi
                  </h2>
                  <p className="text-gray-600 font-body mt-1 text-sm sm:text-base">
                    Theo dõi trạng thái đơn hàng và lịch sử mua hàng
                  </p>
                </div>

                {tabLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-body">Đang tải đơn hàng...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 font-body text-sm sm:text-base">
                              Đơn hàng #{order.id?.slice(-8)}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-body">
                              {formatDate(order.createdAt || order.created_at)}
                            </p>
                          </div>
                          <span className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-medium font-body self-start">
                            {order.orderStatus || order.status || 'pending'}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-amber-600 font-heading">
                          {(order.totalPrice || order.total_amount)?.toLocaleString('vi-VN')} VNĐ
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HiOutlineShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-body text-lg mb-6">Chưa có đơn hàng nào</p>
                    <Link
                      to="/collections"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-body font-medium"
                    >
                      Khám phá sản phẩm
                    </Link>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-amber-600 transition-colors font-body"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;