import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/common/Modal';
import Select from '../../components/common/Select';
import { useToast } from '../../hooks/useToast';
import {
  adminService,
  type Customer,
  type CustomerStats,
  type PaginationMeta,
  type CustomerDetailResponse
} from '../../services/admin.service';
import { resolveImageUrl } from '../../utils/image';
import {
  HiOutlineUsers,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineExclamationCircle
} from 'react-icons/hi';

const getInitials = (name: string) => {
  if (!name) return '??';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('');
};

const getAddressDisplay = (address?: Customer['address']) => {
  if (!address) return 'Chưa cập nhật';
  const parts = [
    address.street,
    address.city,
    address.state,
    address.country
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Chưa cập nhật';
};

const getCustomerIdentifier = (customer: Customer | null | undefined) => {
  if (!customer) return '';
  return customer.id || customer._id || '';
};

type CustomerMetrics = {
  orderCount: number;
  totalSpent: number;
};

const AdminCustomers: React.FC = () => {
  const { showError, showSuccess } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [pagination, setPagination] = useState<(PaginationMeta & { pages?: number }) | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [customerDetail, setCustomerDetail] = useState<CustomerDetailResponse | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);
  const [customerMetrics] = useState<Record<string, CustomerMetrics>>({});
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const VIP_SPENDING_THRESHOLD = 50_000_000; // ~50M VND
  const itemsPerPage = 10;

  const getAvatarUrl = useCallback((customer: Customer) => {
    const source = customer.avatar || customer.image || '';
    if (!source) {
      return null;
    }
    return resolveImageUrl(source);
  }, []);

  const closeModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setCustomerDetail(null);
    setSelectedCustomer(null);
  };

  const handleViewCustomer = async (customer: Customer) => {
    const id = getCustomerIdentifier(customer);
    if (!id) {
      showError('Không xác định được khách hàng');
      return;
    }

    setSelectedCustomer(customer);
    setViewModalOpen(true);
    setViewLoading(true);
    try {
      const detail = await adminService.getCustomerById(id);
      setCustomerDetail(detail);
    } catch (error) {
      console.error('Failed to load customer detail:', error);
      showError('Không thể tải thông tin khách hàng');
      setCustomerDetail(null);
    } finally {
      setViewLoading(false);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditForm({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: {
        street: customer.address?.street || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        zipCode: customer.address?.zipCode || '',
        country: customer.address?.country || ''
      }
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (field: keyof typeof editForm, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof typeof editForm.address, value: string) => {
    setEditForm(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSaveCustomer = async () => {
    if (!selectedCustomer) return;
    const id = getCustomerIdentifier(selectedCustomer);
    if (!id) {
      showError('Không xác định được khách hàng');
      return;
    }

    try {
      setEditLoading(true);
      const payload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim(),
        address: {
          street: editForm.address.street.trim(),
          city: editForm.address.city.trim(),
          state: editForm.address.state.trim(),
          zipCode: editForm.address.zipCode.trim(),
          country: editForm.address.country.trim()
        }
      };

      const updated = await adminService.updateCustomer(id, payload);

      setCustomers(prev =>
        prev.map(customer =>
          getCustomerIdentifier(customer) === getCustomerIdentifier(updated)
            ? { ...customer, ...updated }
            : customer
        )
      );
      showSuccess('Cập nhật thông tin khách hàng thành công!');
      setEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update customer:', error);
      showError('Không thể cập nhật khách hàng');
    } finally {
      setEditLoading(false);
    }
  };

  const handleToggleStatus = async (customer: Customer) => {
    const id = getCustomerIdentifier(customer);
    if (!id) {
      showError('Không xác định được khách hàng');
      return;
    }

    try {
      setStatusLoadingId(id);
      const nextStatus = !(customer.isActive ?? true);
      const updated = await adminService.updateCustomerStatus(id, nextStatus);
      setCustomers(prev =>
        prev.map(item =>
          getCustomerIdentifier(item) === getCustomerIdentifier(updated)
            ? { ...item, ...updated }
            : item
        )
      );
      showSuccess(`Đã ${nextStatus ? 'mở khóa' : 'khóa'} tài khoản khách hàng`);
      await fetchCustomers();
    } catch (error) {
      console.error('Failed to toggle status:', error);
      showError('Không thể cập nhật trạng thái khách hàng');
    } finally {
      setStatusLoadingId(null);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, debouncedSearchTerm]);

  const getCustomerStatus = useCallback((customer: Customer): 'active' | 'inactive' | 'vip' => {
    if (customer.isActive === false) {
      return 'inactive';
    }
    if ((customer.totalSpent || 0) >= VIP_SPENDING_THRESHOLD) {
      return 'vip';
    }
    return 'active';
  }, [VIP_SPENDING_THRESHOLD]);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const isVipFilter = filterStatus === 'vip';
      const statusFilter = filterStatus === 'active' || filterStatus === 'inactive'
        ? filterStatus
        : undefined;

      const response = await adminService.getCustomers({
        page: isVipFilter ? 1 : currentPage,
        limit: isVipFilter ? 100 : itemsPerPage,
        status: statusFilter,
        search: debouncedSearchTerm || undefined,
        includeStats: true,
        sortField: isVipFilter ? 'totalSpent' : undefined,
        sortOrder: isVipFilter ? 'desc' : undefined
      });

      const normalizedCustomers = (response.customers || []).map((customer) => ({
        ...customer,
        totalSpent: customer.totalSpent ?? 0,
        orderCount: customer.orderCount ?? customer.orders ?? 0,
        isActive: customer.isActive ?? true,
        joinDate: customer.joinDate || (customer as unknown as { createdAt?: string }).createdAt || ''
      }));

      setCustomers(normalizedCustomers);
      setStats(response.stats ?? null);
      if (isVipFilter) {
        setPagination({
          page: 1,
          pages: 1,
          limit: normalizedCustomers.length || itemsPerPage,
          total: normalizedCustomers.length
        });
      } else {
        setPagination(response.pagination ?? null);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Không thể tải danh sách khách hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, filterStatus, itemsPerPage]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

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


  const displayCustomers = useMemo(() => {
    if (filterStatus === 'all') {
      return customers;
    }
    return customers.filter((customer) => getCustomerStatus(customer) === filterStatus);
  }, [customers, filterStatus, getCustomerStatus]);

  // Disable additional metrics fetching since main API already provides totalOrders and totalSpent
  // useEffect(() => {
  //   const fetchMetricsForCustomers = async () => {
  //     const idsToFetch = customers
  //       .map((customer) => getCustomerIdentifier(customer))
  //       .filter((id): id is string => Boolean(id && !customerMetrics[id]));

  //     if (!idsToFetch.length) return;

  //     try {
  //       // Use the new order summary endpoint for accurate metrics
  //       const responses = await Promise.all(idsToFetch.map((id) => adminService.getUserOrderSummary(id)));
  //       const updates: Record<string, CustomerMetrics> = {};

  //       responses.forEach((summary, index) => {
  //         const id = idsToFetch[index];
  //         if (!id || !summary) return;
  //         updates[id] = {
  //           orderCount: summary.orderCount ?? 0,
  //           totalSpent: summary.totalSpent ?? 0
  //         };
  //       });

  //       if (Object.keys(updates).length) {
  //         setCustomerMetrics((prev) => ({ ...prev, ...updates }));
  //       }
  //     } catch (error) {
  //       console.error('Failed to load customer metrics:', error);
  //     }
  //   };

  //   fetchMetricsForCustomers();
  // }, [customers, customerMetrics]);

  const totalCustomersValue = stats?.totalCustomers ?? (pagination?.total ?? customers.length);
  const activeCustomersValue = stats?.activeCustomers ?? customers.filter((customer) => getCustomerStatus(customer) === 'active').length;
  const newCustomersValue = stats?.newCustomersThisMonth ?? 0;
  const averageSpentValue = stats?.averageSpent ?? (customers.length > 0
    ? customers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0) / customers.length
    : 0);

  const totalPages = pagination?.pages ?? 1;
  const currentPageIndex = pagination?.page ?? currentPage;
  const pageLimit = pagination?.limit ?? itemsPerPage;
  const totalItems = pagination?.total ?? displayCustomers.length;
  const showingFrom = totalItems === 0 ? 0 : (currentPageIndex - 1) * pageLimit + 1;
  const showingTo = totalItems === 0 ? 0 : showingFrom + displayCustomers.length - 1;
  const detailUser = customerDetail?.user;
  const detailMetrics = customerDetail?.metrics;
  const detailStatusBreakdown = detailMetrics?.statusBreakdown || [];
  const detailRecentOrders = customerDetail?.recentOrders || [];
  const hasDetail = Boolean(detailUser);

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
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{totalCustomersValue}</p>
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
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{activeCustomersValue}</p>
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
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{newCustomersValue}</p>
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
                  <p className="text-sm sm:text-xl font-bold text-gray-900">{formatPrice(averageSpentValue)}</p>
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
            {displayCustomers.map((customer, index) => {
              const status = getCustomerStatus(customer);
              const customerKey = customer.id || customer._id || `${customer.email || 'customer'}-${index}`;
              const metrics = customerMetrics[customerKey];
              const totalOrders = customer.totalOrders ?? customer.orderCount ?? customer.orders ?? metrics?.orderCount ?? 0;
              const totalSpent = customer.totalSpent ?? metrics?.totalSpent ?? 0;
              const customerIdLabel = customer.id || customer._id || 'N/A';
              const avatarUrl = getAvatarUrl(customer);
              return (
                <div key={customerKey} className="bg-white rounded-xl border border-amber-100 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      {avatarUrl ? (
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={avatarUrl}
                          alt={customer.name}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 font-semibold flex items-center justify-center">
                          {getInitials(customer.name)}
                        </div>
                      )}
                      <div className="ml-3">
                        <h3 className="text-sm font-semibold text-gray-900">{customer.name}</h3>
                        <p className="text-xs text-gray-500">#{customerIdLabel}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors"
                        onClick={() => handleViewCustomer(customer)}
                        title="Xem chi tiết"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors"
                        onClick={() => handleEditCustomer(customer)}
                        title="Chỉnh sửa"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            customer.isActive === false
                              ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                          }`}
                          onClick={() => handleToggleStatus(customer)}
                          disabled={statusLoadingId === customerKey}
                          title={customer.isActive === false ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                        >
                          {statusLoadingId === customerKey ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : customer.isActive === false ? (
                            <HiOutlineLockOpen className="w-4 h-4" />
                          ) : (
                            <HiOutlineLockClosed className="w-4 h-4" />
                          )}
                        </button>
                    </div>
                  </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Liên hệ</p>
                        <p className="text-sm text-gray-900">{customer.email}</p>
                        {customer.phone && <p className="text-xs text-gray-500">{customer.phone}</p>}
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Địa chỉ</p>
                        <p className="text-sm text-gray-900">{getAddressDisplay(customer.address)}</p>
                      </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <div>
                          <p className="text-xs text-gray-500">Đơn hàng</p>
                          <p className="text-sm font-semibold text-gray-900">{totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Chi tiêu</p>
                          <p className="text-sm font-bold text-amber-600">{formatPrice(totalSpent)}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {displayCustomers.length === 0 && (
              <div className="bg-white rounded-xl border border-amber-100 p-8 text-center">
                <p className="text-gray-500">Không có khách hàng nào</p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Pagination */}
        {!loading && !error && displayCustomers.length > 0 && totalPages > 1 && (
          <div className="lg:hidden bg-white rounded-xl border border-amber-100 p-4 mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max((pagination?.page ?? 1) - 1, 1))}
                disabled={(pagination?.page ?? 1) === 1}
                className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="text-sm text-gray-700 font-medium">
                Trang {pagination?.page ?? 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min((pagination?.page ?? 1) + 1, totalPages))}
                disabled={(pagination?.page ?? 1) === totalPages}
                className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                Hiển thị {showingFrom} - {showingTo} / {totalItems} khách hàng
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
                {displayCustomers.map((customer, index) => {
                  const status = getCustomerStatus(customer);
                  const customerKey = customer.id || customer._id || `${customer.email || 'customer'}-${index}`;
                  const metrics = customerMetrics[customerKey];
                  const totalOrders = customer.totalOrders ?? customer.orderCount ?? customer.orders ?? metrics?.orderCount ?? 0;
                  const totalSpent = customer.totalSpent ?? metrics?.totalSpent ?? 0;
                  const customerIdLabel = customer.id || customer._id || 'N/A';
                  const avatarUrl = getAvatarUrl(customer);
                  return (
                    <tr key={customerKey} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {avatarUrl ? (
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={avatarUrl}
                            alt={customer.name}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-amber-100 text-amber-700 font-semibold flex items-center justify-center text-lg">
                            {getInitials(customer.name)}
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{customerIdLabel}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      {customer.phone && <div className="text-sm text-gray-500">{customer.phone}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 hidden lg:table-cell">
                      {getAddressDisplay(customer.address)}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {totalOrders}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {formatPrice(totalSpent)}
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                        {getStatusText(status)}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors"
                          onClick={() => handleViewCustomer(customer)}
                          title="Xem chi tiết"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors"
                          onClick={() => handleEditCustomer(customer)}
                          title="Chỉnh sửa"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-1 rounded transition-colors ${
                            customer.isActive === false
                              ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                          }`}
                          onClick={() => handleToggleStatus(customer)}
                          disabled={statusLoadingId === customerKey}
                          title={customer.isActive === false ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                        >
                          {statusLoadingId === customerKey ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : customer.isActive === false ? (
                            <HiOutlineLockOpen className="w-4 h-4" />
                          ) : (
                            <HiOutlineLockClosed className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Desktop Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              Hiển thị <span className="font-semibold">{showingFrom}</span> đến{' '}
              <span className="font-semibold">{showingTo}</span> trong tổng số{' '}
              <span className="font-semibold">{totalItems}</span> khách hàng
            </div>
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max((pagination?.page ?? 1) - 1, 1))}
                  disabled={(pagination?.page ?? 1) === 1}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const activePage = pagination?.page ?? 1;
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (activePage <= 3) {
                      page = i + 1;
                    } else if (activePage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = activePage - 2 + i;
                    }

                    if (page < 1 || page > totalPages) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          activePage === page
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
                  onClick={() => setCurrentPage(Math.min((pagination?.page ?? 1) + 1, totalPages))}
                  disabled={(pagination?.page ?? 1) === totalPages}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        )}
      </div>

      {/* View Customer Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={closeModals}
        title={selectedCustomer ? `Thông tin khách hàng - ${selectedCustomer.name}` : 'Thông tin khách hàng'}
        size="xl"
      >
        {viewLoading ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Đang tải dữ liệu khách hàng...</p>
          </div>
        ) : hasDetail ? (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Thông tin liên hệ</h4>
                <p className="text-lg font-semibold text-gray-900">{detailUser?.name}</p>
                <p className="text-gray-600">{detailUser?.email}</p>
                {detailUser?.phone && <p className="text-gray-600">{detailUser.phone}</p>}
                <p className="text-sm text-gray-500 mt-2">
                  Địa chỉ: {getAddressDisplay(detailUser?.address)}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Thống kê</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Đơn hàng</p>
                    <p className="text-xl font-semibold text-gray-900">{detailMetrics?.orderCount ?? 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Đã thanh toán</p>
                    <p className="text-xl font-semibold text-gray-900">{detailMetrics?.paidOrders ?? 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tổng chi tiêu</p>
                    <p className="text-xl font-semibold text-amber-600">{formatPrice(detailMetrics?.totalSpent || 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Giá trị trung bình</p>
                    <p className="text-xl font-semibold text-gray-900">{formatPrice(detailMetrics?.averageOrderValue || 0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {detailStatusBreakdown.length ? (
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Trạng thái đơn hàng</h4>
                <div className="flex flex-wrap gap-2">
                  {detailStatusBreakdown.map((item) => (
                    <span
                      key={item.status}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                    >
                      {getStatusText(item.status)}: <span className="font-semibold ml-1">{item.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-3">Đơn hàng gần đây</h4>
              {detailRecentOrders.length ? (
                <div className="space-y-3">
                  {detailRecentOrders.map((order) => (
                    <div
                      key={order._id || order.orderNumber || order.createdAt}
                      className="bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">#{order.orderNumber || order._id}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-amber-600">{formatPrice(order.totalPrice)}</p>
                        <p className="text-xs text-gray-500">{getStatusText(order.orderStatus)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Khách hàng chưa có đơn hàng nào.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-600">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={closeModals}
        title={selectedCustomer ? `Chỉnh sửa khách hàng - ${selectedCustomer.name}` : 'Chỉnh sửa khách hàng'}
        size="lg"
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.name}
                onChange={(e) => handleEditChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.email}
                onChange={(e) => handleEditChange('email', e.target.value)}
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.phone}
                onChange={(e) => handleEditChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quốc gia</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã bưu chính</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={editForm.address.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={closeModals}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveCustomer}
              disabled={editLoading}
              className="px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {editLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminCustomers;
