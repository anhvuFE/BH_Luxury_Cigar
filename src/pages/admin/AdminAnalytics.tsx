import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineChartBar,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineDownload,
  HiOutlineRefresh,
  HiChevronDown
} from 'react-icons/hi';

const AdminAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('revenue');

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: '₫125,680,000',
      previous: '₫112,450,000',
      change: '+11.8%',
      trend: 'up',
      chartData: [
        { period: 'T1', value: 85000000 },
        { period: 'T2', value: 92000000 },
        { period: 'T3', value: 78000000 },
        { period: 'T4', value: 105000000 },
        { period: 'T5', value: 98000000 },
        { period: 'T6', value: 125680000 }
      ]
    },
    orders: {
      current: '2,468',
      previous: '2,156',
      change: '+14.5%',
      trend: 'up',
      chartData: [
        { period: 'T1', value: 1850 },
        { period: 'T2', value: 2100 },
        { period: 'T3', value: 1920 },
        { period: 'T4', value: 2350 },
        { period: 'T5', value: 2180 },
        { period: 'T6', value: 2468 }
      ]
    },
    customers: {
      current: '1,245',
      previous: '1,089',
      change: '+14.3%',
      trend: 'up',
      chartData: [
        { period: 'T1', value: 920 },
        { period: 'T2', value: 1050 },
        { period: 'T3', value: 980 },
        { period: 'T4', value: 1180 },
        { period: 'T5', value: 1120 },
        { period: 'T6', value: 1245 }
      ]
    }
  };

  const topProducts = [
    { name: 'Cohiba Robusto', revenue: '₫28,500,000', orders: 156, growth: '+23%' },
    { name: 'Montecristo No.2', revenue: '₫24,800,000', orders: 142, growth: '+18%' },
    { name: 'Davidoff Aniversario', revenue: '₫22,300,000', orders: 98, growth: '+31%' },
    { name: 'Romeo y Julieta', revenue: '₫19,600,000', orders: 134, growth: '+12%' },
    { name: 'Padron 1964', revenue: '₫17,900,000', orders: 89, growth: '+8%' }
  ];

  const salesByRegion = [
    { region: 'TP. Hồ Chí Minh', revenue: '₫45,200,000', percentage: 36, orders: 892 },
    { region: 'Hà Nội', revenue: '₫38,900,000', percentage: 31, orders: 734 },
    { region: 'Đà Nẵng', revenue: '₫18,500,000', percentage: 15, orders: 412 },
    { region: 'Cần Thơ', revenue: '₫12,800,000', percentage: 10, orders: 298 },
    { region: 'Khác', revenue: '₫10,280,000', percentage: 8, orders: 132 }
  ];

  const recentTransactions = [
    { id: 'TXN001', customer: 'Nguyễn Văn A', amount: '₫3,250,000', date: '2024-01-15', status: 'completed' },
    { id: 'TXN002', customer: 'Trần Thị B', amount: '₫2,800,000', date: '2024-01-14', status: 'completed' },
    { id: 'TXN003', customer: 'Lê Minh C', amount: '₫4,100,000', date: '2024-01-14', status: 'pending' },
    { id: 'TXN004', customer: 'Phạm Hoàng D', amount: '₫1,950,000', date: '2024-01-13', status: 'completed' },
    { id: 'TXN005', customer: 'Vũ Thị E', amount: '₫5,200,000', date: '2024-01-13', status: 'completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const SimpleChart = ({ data, color }: { data: any[], color: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
      <div className="flex items-end space-x-1 h-20">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-full ${color} rounded-t transition-all duration-500`}
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-1 font-body">{item.period}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-heading">
                Báo cáo & Phân tích
              </h1>
              <p className="mt-2 lg:mt-3 text-gray-600 font-body text-sm lg:text-lg">
                Theo dõi hiệu suất kinh doanh và xu hướng thị trường
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 lg:py-3 border border-gray-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 font-body text-sm lg:text-base"
              >
                <option value="week">7 ngày qua</option>
                <option value="month">30 ngày qua</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm này</option>
              </select>

              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-medium text-sm lg:text-base flex items-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <HiOutlineDownload className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineCurrencyDollar className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+11.8%</span>
              </div>
            </div>
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 font-body uppercase">Doanh thu</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">₫125,680,000</p>
              <p className="text-xs text-gray-500 font-body mt-1">So với tháng trước</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineShoppingBag className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+14.5%</span>
              </div>
            </div>
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 font-body uppercase">Đơn hàng</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">2,468</p>
              <p className="text-xs text-gray-500 font-body mt-1">So với tháng trước</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+14.3%</span>
              </div>
            </div>
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 font-body uppercase">Khách hàng</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">1,245</p>
              <p className="text-xs text-gray-500 font-body mt-1">So với tháng trước</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineChartBar className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+8.2%</span>
              </div>
            </div>
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 font-body uppercase">Tỷ lệ chuyển đổi</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">3.24%</p>
              <p className="text-xs text-gray-500 font-body mt-1">So với tháng trước</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Revenue Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 font-heading">Xu hướng doanh thu</h3>
                <p className="text-xs lg:text-sm text-gray-600 font-body">6 tháng gần đây</p>
              </div>
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="px-3 py-2 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
              >
                <option value="revenue">Doanh thu</option>
                <option value="orders">Đơn hàng</option>
                <option value="customers">Khách hàng</option>
              </select>
            </div>
            <SimpleChart
              data={analyticsData[selectedChart as keyof typeof analyticsData].chartData}
              color="bg-gradient-to-t from-blue-500 to-blue-400"
            />
          </div>

          {/* Top Products */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 font-heading">Sản phẩm bán chạy</h3>
                <p className="text-xs lg:text-sm text-gray-600 font-body">Top 5 sản phẩm</p>
              </div>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900 font-body">{product.name}</p>
                      <p className="text-xs text-gray-600 font-body">{product.orders} đơn hàng</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 font-body">{product.revenue}</p>
                    <p className="text-xs text-green-600 font-body">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Region & Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Sales by Region */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 font-heading">Doanh số theo khu vực</h3>
                <p className="text-xs lg:text-sm text-gray-600 font-body">Phân bổ theo địa phương</p>
              </div>
            </div>
            <div className="space-y-4">
              {salesByRegion.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900 font-body">{region.region}</span>
                      <span className="text-sm font-bold text-gray-900 font-body">{region.revenue}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>{region.orders} đơn hàng</span>
                      <span>{region.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 font-heading">Giao dịch gần đây</h3>
                <p className="text-xs lg:text-sm text-gray-600 font-body">5 giao dịch mới nhất</p>
              </div>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 font-body">{transaction.customer}</p>
                    <p className="text-xs text-gray-600 font-body">#{transaction.id} • {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 font-body">{transaction.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'completed' ? 'Hoàn thành' :
                       transaction.status === 'pending' ? 'Chờ xử lý' : 'Thất bại'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;