import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
  HiChevronRight,
  HiOutlineEye
} from 'react-icons/hi';

const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      name: 'Tổng doanh thu',
      value: '₫125,680,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: HiOutlineCurrencyDollar,
    },
    {
      name: 'Đơn hàng',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: HiOutlineShoppingBag,
    },
    {
      name: 'Khách hàng',
      value: '89',
      change: '+15.3%',
      changeType: 'increase',
      icon: HiOutlineUsers,
    },
    {
      name: 'Tỷ lệ chuyển đổi',
      value: '3.24%',
      change: '+2.1%',
      changeType: 'increase',
      icon: HiOutlineTrendingUp,
    },
  ];

  const recentOrders = [
    { id: 'DH001', customer: 'Nguyễn Văn A', product: 'Cohiba Robusto', amount: '₫2,850,000', status: 'Đã giao' },
    { id: 'DH002', customer: 'Trần Thị B', product: 'Montecristo No.2', amount: '₫3,200,000', status: 'Đang giao' },
    { id: 'DH003', customer: 'Lê Minh C', product: 'Davidoff Aniversario', amount: '₫4,100,000', status: 'Chờ xử lý' },
    { id: 'DH004', customer: 'Phạm Hoàng D', product: 'Romeo y Julieta', amount: '₫1,950,000', status: 'Đã giao' },
  ];

  const topProducts = [
    { name: 'Cohiba Robusto', sales: 45, revenue: '₫128,250,000', image: '/src/assets/images/pro1.png' },
    { name: 'Montecristo No.2', sales: 38, revenue: '₫121,600,000', image: '/src/assets/images/pro2.png' },
    { name: 'Davidoff Aniversario', sales: 29, revenue: '₫118,900,000', image: '/src/assets/images/pro3.png' },
    { name: 'Romeo y Julieta', sales: 32, revenue: '₫62,400,000', image: '/src/assets/images/pro4.png' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return 'bg-green-100 text-green-800';
      case 'Đang giao':
        return 'bg-blue-100 text-blue-800';
      case 'Chờ xử lý':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-heading">Dashboard</h1>
              <p className="mt-2 lg:mt-3 text-gray-600 font-body text-sm lg:text-lg">Chào mừng trở lại, Xuan Anh! Đây là tổng quan về cửa hàng của bạn.</p>
            </div>
            <div className="flex items-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl px-3 lg:px-4 py-2 shadow-lg border border-white/20">
                <span className="text-xs lg:text-sm text-gray-600 font-body">Hôm nay</span>
                <p className="text-sm lg:text-lg font-bold text-gray-800 font-body">{new Date().toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-8 lg:mb-12">
          {stats.map((stat, index) => (
            <div key={stat.name} className="group bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 p-4 lg:p-8 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 hover:bg-white/90">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-gray-600 font-body uppercase tracking-wide truncate">{stat.name}</p>
                  <p className="text-xl lg:text-3xl font-bold text-gray-900 font-heading mt-1 lg:mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${
                  index === 0 ? 'from-green-500 to-emerald-600' :
                  index === 1 ? 'from-blue-500 to-indigo-600' :
                  index === 2 ? 'from-purple-500 to-pink-600' :
                  'from-amber-500 to-orange-600'
                } rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0">
                <span className={`text-xs lg:text-sm font-semibold px-2 py-1 rounded-full ${
                  stat.changeType === 'increase' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs lg:text-sm text-gray-500 sm:ml-2 lg:ml-3 font-body">so với tháng trước</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
          {/* Recent Orders */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 p-4 lg:p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">Đơn hàng gần đây</h2>
                <p className="text-xs lg:text-sm text-gray-600 font-body mt-1">Các đơn hàng mới nhất</p>
              </div>
              <button className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl font-medium text-xs lg:text-sm flex items-center font-body hover:shadow-lg transition-all duration-300 hover:scale-105 self-start sm:self-auto">
                <span className="hidden sm:inline">Xem tất cả</span>
                <span className="sm:hidden">Xem</span>
                <HiChevronRight className="ml-1 lg:ml-2 w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <div className="space-y-3 lg:space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="group flex items-center justify-between p-3 lg:p-6 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl lg:rounded-2xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border border-gray-100/50">
                  <div className="flex items-center space-x-2 lg:space-x-4 flex-1 min-w-0">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-white font-bold text-xs lg:text-sm flex-shrink-0">
                      {order.customer.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 font-body text-sm lg:text-base truncate">{order.customer}</p>
                      <p className="text-xs lg:text-sm text-gray-600 font-body truncate">{order.product}</p>
                      <p className="text-xs text-gray-500 font-body">#{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-bold text-gray-900 font-body text-sm lg:text-lg">{order.amount}</p>
                    <span className={`inline-flex px-2 lg:px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 p-4 lg:p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 space-y-3 sm:space-y-0">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">Sản phẩm bán chạy</h2>
                <p className="text-xs lg:text-sm text-gray-600 font-body mt-1">Top sản phẩm trong tháng</p>
              </div>
              <button className="group bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl font-medium text-xs lg:text-sm flex items-center font-body hover:shadow-lg transition-all duration-300 hover:scale-105 self-start sm:self-auto">
                <span className="hidden sm:inline">Xem báo cáo</span>
                <span className="sm:hidden">Báo cáo</span>
                <HiChevronRight className="ml-1 lg:ml-2 w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <div className="space-y-3 lg:space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="group flex items-center p-3 lg:p-6 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl lg:rounded-2xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border border-gray-100/50">
                  <div className="flex-shrink-0 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl object-cover shadow-lg"
                    />
                    <div className={`absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-blue-500'
                    } rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-3 lg:ml-6 flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 font-body text-sm lg:text-lg truncate">{product.name}</p>
                    <p className="text-xs lg:text-sm text-gray-600 font-body">{product.sales} đã bán</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-bold text-gray-900 font-body text-sm lg:text-lg">{product.revenue}</p>
                    <div className="flex items-center justify-end text-xs text-gray-500 mt-1">
                      <span className={`w-2 h-2 ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-amber-600' :
                        'bg-blue-500'
                      } rounded-full mr-1 lg:mr-2`}></span>
                      <span className="hidden sm:inline">Hạng </span>#{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 lg:mt-16">
          <div className="text-center mb-6 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-heading">Thao tác nhanh</h2>
            <p className="text-gray-600 font-body mt-2 text-sm lg:text-base">Truy cập nhanh các chức năng quan trọng</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 cursor-pointer hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold font-heading mb-2">Thêm sản phẩm</h3>
                  <p className="text-blue-100 text-xs lg:text-sm font-body leading-relaxed">Thêm sản phẩm mới vào cửa hàng với đầy đủ thông tin</p>
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 flex-shrink-0 self-start sm:self-center">
                  <HiOutlineShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 cursor-pointer hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold font-heading mb-2">Xem báo cáo</h3>
                  <p className="text-green-100 text-xs lg:text-sm font-body leading-relaxed">Phân tích doanh thu và hiệu suất kinh doanh</p>
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 flex-shrink-0 self-start sm:self-center">
                  <HiOutlineTrendingUp className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-500 via-pink-600 to-rose-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold font-heading mb-2">Quản lý khách hàng</h3>
                  <p className="text-purple-100 text-xs lg:text-sm font-body leading-relaxed">Xem và quản lý thông tin khách hàng</p>
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 flex-shrink-0 self-start sm:self-center">
                  <HiOutlineUsers className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;