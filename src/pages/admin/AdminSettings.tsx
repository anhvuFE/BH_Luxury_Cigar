import React, { useState, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlineCamera,
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi';
import authService from '../../services/auth.service';
import { API_CONFIG } from '../../config/api';
import Select from '../../components/common/Select';
import { useAdminProfile } from '../../hooks/useAdminProfile';

type UploadAvatarResponse = { avatar?: string };

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { userProfile, loadUserProfile, updateProfile } = useAdminProfile();
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const getApiErrorMessage = (error: unknown, fallback: string) => {
    const defaultMessage = error instanceof Error && error.message ? error.message : fallback;
    if (typeof error === 'object' && error !== null) {
      const apiError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      return apiError.response?.data?.message || apiError.message || defaultMessage;
    }
    return defaultMessage;
  };


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Vui lòng chọn file ảnh hợp lệ' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Kích thước file không được vượt quá 5MB' });
        return;
      }

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload the image
      uploadAvatar(file);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);
      setMessage(null);

      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('name', userProfile.name);
      formData.append('phone', userProfile.phone);

      const response = await authService.upload<UploadAvatarResponse | { data: UploadAvatarResponse }>('/profile', formData, 'PUT');
      const updatedUser = 'data' in response ? response.data : response;

      // Update shared profile
      updateProfile({ avatar: updatedUser.avatar });

      // Trigger header refresh
      window.dispatchEvent(new CustomEvent('profileUpdated', {
        detail: { avatar: updatedUser.avatar, name: userProfile.name }
      }));

      setMessage({ type: 'success', text: 'Cập nhật ảnh đại diện thành công!' });
    } catch (error: unknown) {
      console.error('Failed to upload avatar:', error);
      setMessage({
        type: 'error',
        text: getApiErrorMessage(error, 'Không thể tải lên ảnh đại diện')
      });
      // Reset preview on error
      setAvatarPreview(userProfile.avatar || '');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setMessage(null);

      await authService.request('/auth/updatedetails', {
        method: 'PUT',
        body: JSON.stringify({
          name: userProfile.name,
          phone: userProfile.phone
        })
      });

      // Trigger header refresh
      window.dispatchEvent(new CustomEvent('profileUpdated', {
        detail: { name: userProfile.name }
      }));

      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
    } catch (error: unknown) {
      console.error('Failed to update profile:', error);
      setMessage({
        type: 'error',
        text: getApiErrorMessage(error, 'Không thể cập nhật thông tin')
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    updateProfile({ [field]: value });
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
      return;
    }

    try {
      setPasswordLoading(true);
      setMessage(null);

      await authService.request('/auth/updatepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
    } catch (error: unknown) {
      console.error('Failed to change password:', error);
      setMessage({
        type: 'error',
        text: getApiErrorMessage(error, 'Đổi mật khẩu thất bại')
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordInputChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const tabs = [
    { id: 'profile', name: 'Thông tin cá nhân', icon: HiOutlineUser },
    { id: 'notifications', name: 'Thông báo', icon: HiOutlineBell },
    { id: 'security', name: 'Bảo mật', icon: HiOutlineShieldCheck },
    { id: 'site', name: 'Cấu hình website', icon: HiOutlineGlobe },
    { id: 'email', name: 'Email', icon: HiOutlineMail },
  ];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cài đặt</h1>
          <p className="text-gray-600">Quản lý cài đặt hệ thống và tài khoản</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64">
            <div className="bg-white rounded-xl border border-amber-100">
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-amber-600 text-white'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-amber-100 p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin cá nhân</h2>

                  {message && (
                    <div className={`mb-4 p-3 rounded-lg border ${
                      message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={avatarPreview ? avatarPreview : (userProfile.avatar && userProfile.avatar.trim() ?
                            (userProfile.avatar.startsWith('http') ?
                              userProfile.avatar :
                              `${API_CONFIG.BASE_URL}${userProfile.avatar}`
                            ) :
                            "https://ui-avatars.com/api/?name=" + encodeURIComponent(userProfile.name) + "&background=f59e0b&color=fff"
                          )}
                          alt="Avatar"
                          className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userProfile.name) + "&background=f59e0b&color=fff";
                          }}
                        />
                        {uploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <HiOutlineCamera className="h-4 w-4" />
                          {uploading ? 'Đang tải lên...' : 'Đổi ảnh đại diện'}
                        </button>
                        <p className="text-xs text-gray-500">JPG, PNG tối đa 5MB</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userProfile.email}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="0123456789"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vai trò
                        </label>
                        <input
                          type="text"
                          value="Administrator"
                          disabled
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => loadUserProfile()}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleProfileUpdate}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Cài đặt thông báo</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">Đơn hàng mới</p>
                        <p className="text-sm text-gray-500">Nhận thông báo khi có đơn hàng mới</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">Khách hàng mới</p>
                        <p className="text-sm text-gray-500">Nhận thông báo khi có khách hàng đăng ký mới</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">Sản phẩm hết hàng</p>
                        <p className="text-sm text-gray-500">Nhận cảnh báo khi sản phẩm sắp hết</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">Email báo cáo hàng tuần</p>
                        <p className="text-sm text-gray-500">Nhận báo cáo doanh thu qua email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Bảo mật</h2>

                  {message && (
                    <div className={`mb-4 p-3 rounded-lg border ${
                      message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {message.text}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <HiOutlineShieldCheck className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Xác thực 2 yếu tố</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Bảo vệ tài khoản của bạn với lớp bảo mật bổ sung
                          </p>
                          <button className="mt-2 text-sm text-amber-600 hover:text-amber-700 font-medium">
                            Kích hoạt ngay →
                          </button>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handlePasswordChange}>
                      <h3 className="font-medium text-gray-900 mb-4">Đổi mật khẩu</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mật khẩu hiện tại
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                              required
                              className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              disabled={passwordLoading}
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('current')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.current ? (
                                <HiOutlineEyeOff className="w-4 h-4" />
                              ) : (
                                <HiOutlineEye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mật khẩu mới
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                              required
                              minLength={6}
                              className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              disabled={passwordLoading}
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('new')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.new ? (
                                <HiOutlineEyeOff className="w-4 h-4" />
                              ) : (
                                <HiOutlineEye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Xác nhận mật khẩu mới
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                              required
                              minLength={6}
                              className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              disabled={passwordLoading}
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('confirm')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.confirm ? (
                                <HiOutlineEyeOff className="w-4 h-4" />
                              ) : (
                                <HiOutlineEye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={passwordLoading}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {passwordLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                          {passwordLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'site' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Cấu hình website</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên website
                      </label>
                      <input
                        type="text"
                        defaultValue="BH Luxury Cigar"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả website
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Chuyên cung cấp xì gà cao cấp nhập khẩu chính hãng"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo website
                      </label>
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/logo.png"
                          alt="Logo"
                          className="h-16 w-auto"
                        />
                        <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50">
                          Thay đổi logo
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                        Hủy
                      </button>
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Cài đặt email</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Server
                      </label>
                      <input
                        type="text"
                        placeholder="smtp.gmail.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Port
                        </label>
                        <input
                          type="text"
                          placeholder="587"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mã hóa
                        </label>
                        <Select
                          value="TLS"
                          onChange={() => {}}
                          options={[
                            { value: 'TLS', label: 'TLS' },
                            { value: 'SSL', label: 'SSL' },
                            { value: 'None', label: 'None' }
                          ]}
                          variant="filled"
                          size="md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email gửi
                      </label>
                      <input
                        type="email"
                        placeholder="noreply@bhluxurycigar.com"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                        Gửi email test
                      </button>
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                        Lưu cài đặt
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
