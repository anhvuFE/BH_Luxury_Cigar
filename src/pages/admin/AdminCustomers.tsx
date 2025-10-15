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
              <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-heading">
                Quản lý khách hàng
              </h1>
              <p className="mt-2 lg:mt-3 text-gray-600 font-body text-sm lg:text-lg">
                Quản lý thông tin và theo dõi hoạt động của khách hàng
              </p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-medium text-sm lg:text-base flex items-center hover:shadow-lg transition-all duration-300 hover:scale-105 self-start sm:self-auto">
              <HiOutlinePlus className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Thêm khách hàng
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-xs lg:text-sm font-medium text-gray-600 font-body">Tổng khách hàng</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-xs lg:text-sm font-medium text-gray-600 font-body">Khách hàng hoạt động</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">142</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-xs lg:text-sm font-medium text-gray-600 font-body">Khách hàng mới (tháng)</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">23</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl lg:rounded-2xl flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-xs lg:text-sm font-medium text-gray-600 font-body">Chi tiêu trung bình</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 font-heading">₫2.8M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 p-4 lg:p-6 mb-6 lg:mb-8">
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
                  className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 font-body text-sm lg:text-base"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 lg:py-3 border border-gray-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 font-body text-sm lg:text-base"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 lg:py-3 border border-gray-200/50 rounded-xl lg:rounded-2xl hover:bg-gray-50 transition-colors duration-200 flex items-center"
              >
                <HiOutlineFilter className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                <span className="hidden sm:inline">Bộ lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Liên hệ
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Địa chỉ
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wider">
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
                  <tr key={customer.id} className="hover:bg-gray-50/30 transition-colors duration-200">
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl object-cover"
                          src={customer.avatar}
                          alt={customer.name}
                        />
                        <div className="ml-3 lg:ml-4">
                          <div className="text-sm lg:text-base font-semibold text-gray-900 font-body">
                            {customer.name}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500 font-body">
                            #{customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-900 font-body">{customer.email}</div>
                      <div className="text-sm text-gray-500 font-body">{customer.phone}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-gray-900 font-body hidden lg:table-cell">
                      {customer.address}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm lg:text-base font-semibold text-gray-900 font-body">
                      {customer.totalOrders}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm lg:text-base font-bold text-gray-900 font-body">
                      {customer.totalSpent}
                    </td>
                    <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 lg:px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                          <HiOutlineEye className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
                          <HiOutlinePencil className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                          <HiOutlineTrash className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50/30 px-4 lg:px-6 py-3 lg:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700 font-body mb-2 sm:mb-0">
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
                        ? 'bg-blue-500 text-white'
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