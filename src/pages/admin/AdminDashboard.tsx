import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineChartBar
} from 'react-icons/hi';

const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      name: 'Doanh thu tháng này',
      value: '₫125,680,000',
      change: '+12.5%',
      changeType: 'increase',
      subtitle: 'so với tháng trước',
      icon: HiOutlineCurrencyDollar,
    },
    {
      name: 'Tổng đơn hàng',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      subtitle: 'đơn hàng mới',
      icon: HiOutlineShoppingBag,
    },
    {
      name: 'Khách hàng mới',
      value: '89',
      change: '+15.3%',
      changeType: 'increase',
      subtitle: 'khách hàng',
      icon: HiOutlineUsers,
    },
    {
      name: 'Tỷ lệ chuyển đổi',
      value: '3.24%',
      change: '+2.1%',
      changeType: 'increase',
      subtitle: 'hiệu suất',
      icon: HiOutlineTrendingUp,
    },
  ];

  const recentOrders = [
    {
      id: 'DH001',
      customer: 'Nguyễn Văn A',
      product: 'Cohiba Robusto',
      amount: '₫2,850,000',
      status: 'delivered',
      time: '2 giờ trước'
    },
    {
      id: 'DH002',
      customer: 'Trần Thị B',
      product: 'Montecristo No.2',
      amount: '₫3,200,000',
      status: 'shipping',
      time: '5 giờ trước'
    },
    {
      id: 'DH003',
      customer: 'Lê Minh C',
      product: 'Davidoff Aniversario',
      amount: '₫4,100,000',
      status: 'pending',
      time: '1 ngày trước'
    },
    {
      id: 'DH004',
      customer: 'Phạm Hoàng D',
      product: 'Romeo y Julieta',
      amount: '₫1,950,000',
      status: 'delivered',
      time: '2 ngày trước'
    },
  ];

  const topProducts = [
    {
      name: 'Cohiba Robusto',
      sales: 45,
      revenue: '₫28,250,000',
      stock: 12,
      trend: 'up',
      image: '/src/assets/images/pro1.png'
    },
    {
      name: 'Montecristo No.2',
      sales: 38,
      revenue: '₫21,600,000',
      stock: 8,
      trend: 'up',
      image: '/src/assets/images/pro2.png'
    },
    {
      name: 'Davidoff Aniversario',
      sales: 29,
      revenue: '₫18,900,000',
      stock: 15,
      trend: 'down',
      image: '/src/assets/images/pro3.png'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <HiOutlineCheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipping':
        return <HiOutlineTruck className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <HiOutlineClock className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Đã giao';
      case 'shipping':
        return 'Đang giao';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 bg-gradient-to-br from-amber-50/30 via-white to-amber-50/20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Xin chào Xuan Anh, chào mừng trở lại với BH Luxury Cigar Admin
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.name}
              className="bg-white rounded-2xl border border-amber-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-amber-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                  <stat.icon className="w-6 h-6 text-amber-700" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <HiOutlineTrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">
                {stat.name}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Orders - 2 columns */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
                <p className="text-sm text-gray-600 mt-1">Theo dõi đơn hàng mới nhất</p>
              </div>
              <button className="text-amber-600 hover:text-amber-700 text-sm font-medium hover:bg-amber-50 px-3 py-1 rounded-lg transition-colors">
                Xem tất cả
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-gradient-to-r from-amber-50/30 to-transparent rounded-xl hover:from-amber-50/50 transition-all duration-300 border border-transparent hover:border-amber-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                        <span className="text-amber-700 font-bold text-sm">
                          {order.customer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                        <p className="text-xs text-gray-500 mt-1">#{order.id} · {order.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 mb-2">{order.amount}</p>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="text-xs font-medium text-gray-700">
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products - 1 column */}
          <div className="bg-white rounded-2xl border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Top sản phẩm</h2>
                <p className="text-sm text-gray-600 mt-1">Bán chạy nhất</p>
              </div>
              <button className="p-2 hover:bg-amber-50 rounded-lg transition-colors">
                <HiOutlineChartBar className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-amber-50/30 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                      'bg-gradient-to-br from-amber-600 to-amber-700'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-600">{product.sales} sold</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">Kho: {product.stock}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">{product.revenue}</p>
                    <div className="flex items-center justify-end mt-1">
                      {product.trend === 'up' ? (
                        <HiOutlineTrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <HiOutlineTrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {product.trend === 'up' ? '+5%' : '-3%'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 font-medium text-sm rounded-lg hover:from-amber-100 hover:to-amber-200 transition-all duration-300">
              Xem tất cả sản phẩm
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group p-6 bg-white rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-1">Thêm sản phẩm mới</h3>
                <p className="text-sm text-gray-600">Cập nhật kho hàng</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                <HiOutlineShoppingBag className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </button>

          <button className="group p-6 bg-white rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-1">Báo cáo doanh thu</h3>
                <p className="text-sm text-gray-600">Xem chi tiết</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                <HiOutlineChartBar className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </button>

          <button className="group p-6 bg-white rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-1">Quản lý khách hàng</h3>
                <p className="text-sm text-gray-600">CRM & hỗ trợ</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                <HiOutlineUsers className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;