import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  HiOutlineUsers,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar: string;
}

const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  const customers: Customer[] = [
    {
      id: 'CUS001',
      name: 'Nguyễn Văn An',
      email: 'nguyen.van.an@email.com',
      phone: '+84 912 345 678',
      address: 'Quận 1, TP.HCM',
      totalOrders: 15,
      totalSpent: '₫42,750,000',
      joinDate: '2023-08-15',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'CUS002',
      name: 'Trần Thị Bình',
      email: 'tran.thi.binh@email.com',
      phone: '+84 987 654 321',
      address: 'Quận 3, TP.HCM',
      totalOrders: 8,
      totalSpent: '₫25,600,000',
      joinDate: '2023-09-22',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e2ea3d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'CUS003',
      name: 'Lê Minh Châu',
      email: 'le.minh.chau@email.com',
      phone: '+84 901 234 567',
      address: 'Quận 7, TP.HCM',
      totalOrders: 22,
      totalSpent: '₫68,900,000',
      joinDate: '2023-06-10',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'CUS004',
      name: 'Phạm Hoàng Đức',
      email: 'pham.hoang.duc@email.com',
      phone: '+84 913 456 789',
      address: 'Quận 2, TP.HCM',
      totalOrders: 5,
      totalSpent: '₫12,300,000',
      joinDate: '2023-10-05',
      status: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'CUS005',
      name: 'Vũ Thị Hương',
      email: 'vu.thi.huong@email.com',
      phone: '+84 908 765 432',
      address: 'Quận Bình Thạnh, TP.HCM',
      totalOrders: 12,
      totalSpent: '₫36,800,000',
      joinDate: '2023-07-28',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'CUS006',
      name: 'Hoàng Văn Giang',
      email: 'hoang.van.giang@email.com',
      phone: '+84 915 678 901',
      address: 'Quận Tân Bình, TP.HCM',
      totalOrders: 18,
      totalSpent: '₫54,200,000',
      joinDate: '2023-05-12',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý khách hàng
              </h1>
              <p className="mt-2 text-gray-600">
                Quản lý thông tin và theo dõi hoạt động của khách hàng
              </p>
            </div>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-amber-700 transition-colors self-start sm:self-auto">
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              Thêm khách hàng
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng khách hàng</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Khách hàng hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Khách hàng mới (tháng)</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-amber-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chi tiêu trung bình</p>
                <p className="text-2xl font-bold text-gray-900">₫2.8M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-amber-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
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
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              >
                <HiOutlineFilter className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Bộ lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
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
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={customer.avatar}
                          alt={customer.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 hidden lg:table-cell">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {customer.totalSpent}
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
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

          {/* Pagination */}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
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
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;