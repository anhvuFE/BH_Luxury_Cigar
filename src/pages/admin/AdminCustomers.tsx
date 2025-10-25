import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService, type Customer } from '../../services/admin.service';
import {
  HiOutlineUsers,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineExclamationCircle
} from 'react-icons/hi';
import Select from '../../components/common/Select';


const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const customersData = await adminService.getCustomers();
        setCustomers(customersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Không thể tải danh sách khách hàng. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'vip':
        return 'VIP';
      default:
        return status;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };


  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats from real data
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const newCustomers = customers.filter(c => {
    const joinDate = new Date(c.joinDate);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return joinDate > monthAgo;
  }).length;
  const avgSpent = customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Quản lý khách hàng
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600">
                Quản lý thông tin và theo dõi hoạt động của khách hàng
              </p>
            </div>
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 sm:py-2 bg-amber-600 text-white rounded-lg font-medium text-sm hover:bg-amber-700 transition-colors">
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              Thêm khách hàng
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-amber-100 p-8 text-center mb-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-amber-600 rounded-full" role="status">
              <span className="sr-only">Đang tải...</span>
            </div>
            <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg border border-red-200 p-6 mb-8">
            <div className="flex items-center">
              <HiOutlineExclamationCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Lỗi tải dữ liệu</h3>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <HiOutlineUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Tổng khách hàng</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{totalCustomers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <HiOutlineUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Hoạt động</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{activeCustomers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <HiOutlineUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Mới (tháng)</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{newCustomers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                  <HiOutlineUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="ml-2 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Chi tiêu TB</p>
                  <p className="text-sm sm:text-xl font-bold text-gray-900">{formatPrice(avgSpent)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-amber-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <Select
                value={filterStatus}
                onChange={(value) => setFilterStatus(value as string)}
                options={[
                  { value: 'all', label: 'Tất cả trạng thái' },
                  { value: 'active', label: 'Hoạt động' },
                  { value: 'inactive', label: 'Không hoạt động' },
                  { value: 'vip', label: 'VIP' }
                ]}
                variant="filled"
                size="md"
              />

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <HiOutlineFilter className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Bộ lọc</span>
                <span className="sm:hidden">Lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Customers Cards */}
        {!loading && !error && (
          <div className="lg:hidden space-y-4 mb-6">
            {currentCustomers.map((customer) => (
              <div key={customer._id} className="bg-white rounded-xl border border-amber-100 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=f59e0b&color=fff`}
                      alt={customer.name}
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-900">{customer.name}</h3>
                      <p className="text-xs text-gray-500">#{customer._id}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors">
                      <HiOutlineEye className="w-4 h-4" />
                    </button>
                    <button className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors">
                      <HiOutlinePencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Liên hệ</p>
                    <p className="text-sm text-gray-900">{customer.email}</p>
                    {customer.phone && <p className="text-xs text-gray-500">{customer.phone}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Đơn hàng</p>
                        <p className="text-sm font-semibold text-gray-900">{customer.orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Chi tiêu</p>
                        <p className="text-sm font-bold text-amber-600">{formatPrice(customer.totalSpent)}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {currentCustomers.length === 0 && (
              <div className="bg-white rounded-xl border border-amber-100 p-8 text-center">
                <p className="text-gray-500">Không có khách hàng nào</p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Pagination */}
        {!loading && !error && currentCustomers.length > 0 && (
          <div className="lg:hidden bg-white rounded-xl border border-amber-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="text-sm text-gray-700 font-medium">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredCustomers.length)} / {filteredCustomers.length} khách hàng
              </p>
            </div>
          </div>
        )}

        {/* Desktop Customers Table */}
        {!loading && !error && (
          <div className="hidden lg:block bg-white rounded-xl border border-amber-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="bg-amber-50 border-b border-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Liên hệ
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Địa chỉ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Chi tiêu
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Trạng thái
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {currentCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=f59e0b&color=fff`}
                          alt={customer.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{customer._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      {customer.phone && <div className="text-sm text-gray-500">{customer.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 hidden lg:table-cell">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {formatPrice(customer.totalSpent)}
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {getStatusText(customer.status)}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors">
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                        <button className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors">
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Desktop Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              Hiển thị <span className="font-semibold">{startIndex + 1}</span> đến{' '}
              <span className="font-semibold">{Math.min(endIndex, filteredCustomers.length)}</span> trong tổng số{' '}
              <span className="font-semibold">{filteredCustomers.length}</span> khách hàng
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === page
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;