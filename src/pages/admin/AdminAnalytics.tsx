import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineChartBar,
  HiOutlineTrendingUp,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineDownload
} from 'react-icons/hi';
import Select from '../../components/common/Select';
import analyticsService from '../../services/analytics.service';

interface ChartData {
  period: string;
  value: number;
}

interface MetricData {
  current: string;
  previous: string;
  change: string;
  trend: string;
  chartData?: ChartData[];
}

interface AnalyticsData {
  revenue: MetricData;
  orders: MetricData;
  customers: MetricData;
  conversionRate: MetricData;
}

interface ApiResponse {
  success: boolean;
  data: {
    analytics: AnalyticsData;
    topProducts?: TopProduct[];
    salesByRegion?: SalesByRegion[];
    recentTransactions?: RecentTransaction[];
  };
}

interface TopProduct {
  name: string;
  revenue: string;
  orders: number;
  growth: string;
}

interface SalesByRegion {
  region: string;
  revenue: string;
  percentage: number;
  orders: number;
}

interface RecentTransaction {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: string;
}

const AdminAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('revenue');
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [salesByRegion, setSalesByRegion] = useState<SalesByRegion[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load analytics data from API
  const loadAnalyticsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch analytics data from dashboard endpoint
      const dashboardData = await analyticsService.getDashboard(selectedPeriod);

      // Set analytics data from API response
      const response = dashboardData as ApiResponse;
      if (response.success) {
        const responseData = response.data;

        setAnalyticsData(responseData.analytics);
        setTopProducts(responseData.topProducts || []);
        setSalesByRegion(responseData.salesByRegion || []);
        setRecentTransactions(responseData.recentTransactions || []);
      } else {
        console.warn('Analytics API response not successful:', dashboardData);
        throw new Error('API response not successful');
      }

    } catch (error: unknown) {
      console.error('Failed to load analytics data:', error);

      const errorResponse = error as { response?: { status: number } };
      if (errorResponse?.response?.status === 404) {
        setError('API analytics chưa được triển khai. Hiển thị dữ liệu mẫu.');
      } else if (errorResponse?.response?.status === 401 || errorResponse?.response?.status === 403) {
        setError('Bạn không có quyền truy cập dữ liệu analytics.');
      } else {
        setError('Không thể tải dữ liệu phân tích. Hiển thị dữ liệu mẫu.');
      }

      // Fallback to mock data if API fails
      setAnalyticsData({
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
        },
        conversionRate: {
          current: '3.24%',
          previous: '2.99%',
          change: '+8.2%',
          trend: 'up'
        }
      });

      setTopProducts([
        { name: 'Cohiba Robusto', revenue: '₫28,500,000', orders: 156, growth: '+23%' },
        { name: 'Montecristo No.2', revenue: '₫24,800,000', orders: 142, growth: '+18%' },
        { name: 'Davidoff Aniversario', revenue: '₫22,300,000', orders: 98, growth: '+31%' },
        { name: 'Romeo y Julieta', revenue: '₫19,600,000', orders: 134, growth: '+12%' },
        { name: 'Padron 1964', revenue: '₫17,900,000', orders: 89, growth: '+8%' }
      ]);

      setSalesByRegion([
        { region: 'TP. Hồ Chí Minh', revenue: '₫45,200,000', percentage: 36, orders: 892 },
        { region: 'Hà Nội', revenue: '₫38,900,000', percentage: 31, orders: 734 },
        { region: 'Đà Nẵng', revenue: '₫18,500,000', percentage: 15, orders: 412 },
        { region: 'Cần Thơ', revenue: '₫12,800,000', percentage: 10, orders: 298 },
        { region: 'Khác', revenue: '₫10,280,000', percentage: 8, orders: 132 }
      ]);

      setRecentTransactions([
        { id: 'TXN001', customer: 'Nguyễn Văn A', amount: '₫3,250,000', date: '2024-01-15', status: 'completed' },
        { id: 'TXN002', customer: 'Trần Thị B', amount: '₫2,800,000', date: '2024-01-14', status: 'completed' },
        { id: 'TXN003', customer: 'Lê Minh C', amount: '₫4,100,000', date: '2024-01-14', status: 'pending' },
        { id: 'TXN004', customer: 'Phạm Hoàng D', amount: '₫1,950,000', date: '2024-01-13', status: 'completed' },
        { id: 'TXN005', customer: 'Vũ Thị E', amount: '₫5,200,000', date: '2024-01-13', status: 'completed' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedPeriod]);

  // Load data on mount and when period changes
  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

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

  const handleExportReport = async () => {
    try {
      setIsExporting(true);
      await analyticsService.exportReport({
        period: selectedPeriod,
        format: 'xlsx'
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Không thể xuất báo cáo. Vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePeriodChange = (value: string | number) => {
    setSelectedPeriod(value as string);
  };

  const SimpleChart = ({ data, color }: { data: ChartData[], color: string }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <div className="h-32 flex items-center justify-center text-gray-500">
          Không có dữ liệu biểu đồ
        </div>
      );
    }

    const maxValue = Math.max(...data.map(d => d.value));

    return (
      <div className="w-full">
        {/* Simple chart with fixed height */}
        <div className="h-24 flex items-end space-x-2 border-b border-gray-200 px-2">
          {data.map((item, index) => {
            const heightPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            const heightPx = Math.max(4, (heightPercent / 100) * 80); // Max 80px height

            return (
              <div key={`chart-${item.period}-${index}`} className="flex-1 flex flex-col items-center group">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10 transition-opacity">
                  {item.period}: ₫{(item.value / 1000000).toFixed(1)}M
                </div>

                {/* Bar */}
                <div
                  className={`w-full ${color} rounded-t hover:opacity-80 transition-opacity cursor-pointer`}
                  style={{ height: `${heightPx}px` }}
                  title={`${item.period}: ₫${item.value.toLocaleString('vi-VN')}`}
                />
              </div>
            );
          })}
        </div>

        {/* Labels */}
        <div className="flex space-x-2 mt-2 px-2">
          {data.map((item, index) => (
            <div key={`label-${item.period}-${index}`} className="flex-1 text-center">
              <span className="text-xs text-gray-600">{item.period}</span>
            </div>
          ))}
        </div>
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
              <h1 className="text-3xl font-bold text-gray-900">
                Báo cáo & Phân tích
              </h1>
              <p className="mt-2 text-gray-600">
                Theo dõi hiệu suất kinh doanh và xu hướng thị trường
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                options={[
                  { value: 'week', label: '7 ngày qua' },
                  { value: 'month', label: '30 ngày qua' },
                  { value: 'quarter', label: 'Quý này' },
                  { value: 'year', label: 'Năm này' }
                ]}
                variant="filled"
                size="md"
                disabled={isLoading}
              />

              <button
                onClick={handleExportReport}
                disabled={isExporting}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang xuất...
                  </>
                ) : (
                  <>
                    <HiOutlineDownload className="w-5 h-5 mr-2" />
                    Xuất báo cáo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-amber-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800">{error}</p>
                </div>
              </div>
              <button
                onClick={loadAnalyticsData}
                disabled={isLoading}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang tải...' : 'Thử lại'}
              </button>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <HiOutlineCurrencyDollar className="w-6 h-6 text-white" />
              </div>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
              ) : (
                <div className={`flex items-center ${analyticsData?.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{analyticsData?.revenue.change}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">Doanh thu</p>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{analyticsData?.revenue.current}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <HiOutlineShoppingBag className="w-6 h-6 text-white" />
              </div>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
              ) : (
                <div className={`flex items-center ${analyticsData?.orders.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{analyticsData?.orders.change}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">Đơn hàng</p>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{analyticsData?.orders.current}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-white" />
              </div>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
              ) : (
                <div className={`flex items-center ${analyticsData?.customers.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{analyticsData?.customers.change}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">Khách hàng</p>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{analyticsData?.customers.current}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <HiOutlineChartBar className="w-6 h-6 text-white" />
              </div>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
              ) : (
                <div className={`flex items-center ${analyticsData?.conversionRate.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <HiOutlineTrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{analyticsData?.conversionRate.change}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">Tỷ lệ chuyển đổi</p>
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mt-1"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{analyticsData?.conversionRate.current}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Xu hướng doanh thu</h3>
                <p className="text-sm text-gray-600">6 tháng gần đây</p>
              </div>
              <Select
                value={selectedChart}
                onChange={(value) => setSelectedChart(value as string)}
                options={[
                  { value: 'revenue', label: 'Doanh thu' },
                  { value: 'orders', label: 'Đơn hàng' },
                  { value: 'customers', label: 'Khách hàng' }
                ]}
                variant="filled"
                size="md"
              />
            </div>
            {isLoading ? (
              <div className="w-full">
                <div className="h-24 flex items-end space-x-2 border-b border-gray-200 px-2">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={`chart-loading-${index}`} className="flex-1">
                      <div
                        className="w-full bg-gray-200 rounded-t animate-pulse"
                        style={{ height: `${Math.random() * 60 + 10}px` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 mt-2 px-2">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={`chart-label-loading-${index}`} className="flex-1 text-center">
                      <div className="w-6 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : analyticsData && analyticsData[selectedChart as keyof typeof analyticsData] ? (
              (() => {
                const chartConfig = analyticsData[selectedChart as keyof typeof analyticsData] as MetricData;
                if (chartConfig && chartConfig.chartData && Array.isArray(chartConfig.chartData) && chartConfig.chartData.length > 0) {
                  return (
                    <SimpleChart
                      data={chartConfig.chartData}
                      color={selectedChart === 'revenue' ? 'bg-green-600' :
                             selectedChart === 'orders' ? 'bg-blue-600' : 'bg-purple-600'}
                    />
                  );
                } else {
                  return (
                    <div className="h-24 flex items-center justify-center text-gray-500">
                      Không có dữ liệu biểu đồ
                    </div>
                  );
                }
              })()
            ) : (
              <div className="h-24 flex items-center justify-center text-gray-500">
                Không có dữ liệu để hiển thị
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Sản phẩm bán chạy</h3>
                <p className="text-sm text-gray-600">Top 5 sản phẩm</p>
              </div>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeleton for top products
                <>{[1, 2, 3, 4, 5].map((index) => (
                  <div key={`product-loading-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="ml-3">
                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}</>
              ) : topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div key={`product-${index}-${product.name}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.orders} đơn hàng</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
                      <p className="text-xs text-green-600">{product.growth}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không có dữ liệu sản phẩm
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sales by Region & Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Sales by Region */}
          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Doanh số theo khu vực</h3>
                <p className="text-sm text-gray-600">Phân bổ theo địa phương</p>
              </div>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <>{[1, 2, 3, 4, 5].map((index) => (
                  <div key={`region-loading-${index}`} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full animate-pulse" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}</>
              ) : salesByRegion.length > 0 ? (
                salesByRegion.map((region, index) => (
                  <div key={`region-${index}-${region.region}`} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{region.region}</span>
                        <span className="text-sm font-bold text-gray-900">{region.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>{region.orders} đơn hàng</span>
                        <span>{region.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${region.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không có dữ liệu khu vực
                </div>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Giao dịch gần đây</h3>
                <p className="text-sm text-gray-600">5 giao dịch mới nhất</p>
              </div>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <>{[1, 2, 3, 4, 5].map((index) => (
                  <div key={`transaction-loading-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="text-right">
                      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}</>
              ) : recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <div key={`${transaction.id}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{transaction.customer}</p>
                      <p className="text-xs text-gray-600">#{transaction.id} • {transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{transaction.amount}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'completed' ? 'Hoàn thành' :
                         transaction.status === 'pending' ? 'Chờ xử lý' : 'Thất bại'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không có giao dịch gần đây
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;