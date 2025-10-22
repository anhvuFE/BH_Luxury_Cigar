import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineGlobe,
  HiOutlineMail
} from 'react-icons/hi';
import Select from '../../components/common/Select';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

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
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://ui-avatars.com/api/?name=Xuan+Anh&background=f59e0b&color=fff"
                        alt="Avatar"
                        className="h-20 w-20 rounded-full"
                      />
                      <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50">
                        Đổi ảnh đại diện
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          defaultValue="Xuan Anh"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="admin@gmail.com"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
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
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Đổi mật khẩu</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mật khẩu hiện tại
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mật khẩu mới
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Xác nhận mật khẩu mới
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                          Cập nhật mật khẩu
                        </button>
                      </div>
                    </div>
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
                          src="/src/assets/images/logo.png"
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