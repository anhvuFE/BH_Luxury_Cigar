import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import blogService from '../../services/blog.service';
import type { BlogFilters } from '../../services/blog.service';
import type { BlogPost } from '../../types/database';
import { useToast } from '../../hooks/useToast';
import { HiPlus, HiPencilAlt, HiTrash, HiEye, HiSearch } from 'react-icons/hi';
import BlogCreateModal from '../../components/admin/BlogCreateModal';
import BlogEditModal from '../../components/admin/BlogEditModal';
import BlogDeleteModal from '../../components/admin/BlogDeleteModal';
import BlogDetailModal from '../../components/admin/BlogDetailModal';
import Select from '../../components/common/Select';

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]); // Cache all blogs
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState<BlogFilters>({
    page: 1,
    limit: 10,
  });
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all');
  const { showToast } = useToast();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Load all blogs once
  const loadAllBlogs = async () => {
    try {
      setLoading(true);
      const queryFilters: BlogFilters = {
        page: 1,
        limit: 1000, // Get all blogs at once
        category: selectedCategory || undefined,
        isPublished: selectedStatus === 'all' ? undefined : selectedStatus === 'published',
      };

      const response = await blogService.getAll(queryFilters);
      setAllBlogs(response.data);

      // Apply initial filtering
      filterAndPaginateBlogs(response.data, searchQuery, filters.page);
    } catch (error) {
      showToast('Không thể tải danh sách bài viết', 'error');
      console.error('Failed to load blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and paginate blogs
  const filterAndPaginateBlogs = useCallback((blogsData: BlogPost[], search: string, page: number) => {
    setSearching(true);

    // Apply search filter
    let filteredData = blogsData;
    if (search && search.trim() !== '') {
      const searchTerm = search.toLowerCase().trim();
      filteredData = blogsData.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm) ||
        blog.excerpt?.toLowerCase().includes(searchTerm) ||
        blog.content?.toLowerCase().includes(searchTerm) ||
        blog.author?.toLowerCase().includes(searchTerm) ||
        blog.category?.toLowerCase().includes(searchTerm)
      );
    }

    // Calculate pagination
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setBlogs(paginatedData);
    setTotalBlogs(filteredData.length);
    setTotalPages(Math.ceil(filteredData.length / limit));

    setTimeout(() => setSearching(false), 100);
  }, [filters.limit]);

  // Load blogs on mount and when filters change
  useEffect(() => {
    loadAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedStatus]);

  // Handle search with debounce
  useEffect(() => {
    if (allBlogs.length === 0) return;

    const timer = setTimeout(() => {
      filterAndPaginateBlogs(allBlogs, searchQuery, 1);
      setFilters(prev => ({ ...prev, page: 1 }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, allBlogs, filterAndPaginateBlogs]);

  // Handle page change
  useEffect(() => {
    if (allBlogs.length === 0) return;
    filterAndPaginateBlogs(allBlogs, filters.search || '', filters.page || 1);
  }, [filters.page, filters.search, allBlogs, filterAndPaginateBlogs]);

  // CRUD Handlers
  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDelete = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const handleView = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDetailModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    loadAllBlogs();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedBlog(null);
    loadAllBlogs();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
    loadAllBlogs();
  };

  // Format date
  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  // Categories list - matching backend categories
  const categories = [
    { value: 'News', label: 'Tin tức' },
    { value: 'How-To', label: 'Hướng dẫn' },
    { value: 'Lifestyle', label: 'Phong cách sống' },
    { value: 'Reviews', label: 'Đánh giá' },
    { value: 'Interviews', label: 'Phỏng vấn' },
    { value: 'Pairings', label: 'Kết hợp' },
    { value: 'Education', label: 'Kiến thức' }
  ];

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
            <p className="mt-2 text-sm text-gray-700">
              Quản lý tất cả bài viết trên blog
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <HiPlus className="-ml-1 mr-2 h-5 w-5" />
              Tạo bài viết
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className={`h-5 w-5 ${searching ? 'text-amber-500' : 'text-gray-400'} transition-colors`} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all hover:border-gray-400"
            />
            {searching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
              </div>
            )}
          </div>

          {/* Category filter */}
          <Select
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value as string)}
            options={[
              { value: '', label: 'Tất cả danh mục' },
              ...categories
            ]}
            placeholder="Chọn danh mục"
            size="md"
            variant="default"
          />

          {/* Status filter */}
          <Select
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as 'all' | 'published' | 'draft')}
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'published', label: 'Đã xuất bản' },
              { value: 'draft', label: 'Bản nháp' }
            ]}
            placeholder="Chọn trạng thái"
            size="md"
            variant="default"
          />

          {/* Results info */}
          <div className="flex items-center justify-end text-sm text-gray-700">
            Hiển thị {blogs.length} / {totalBlogs} bài viết
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden lg:block bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tác giả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                    </div>
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    Không tìm thấy bài viết nào
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id || blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-10 w-16 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.jpg';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium line-clamp-1">
                        {blog.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {blog.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          blog.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {blog.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.viewsCount || blog.views || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleView(blog)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Xem chi tiết"
                        >
                          <HiEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-amber-600 hover:text-amber-800"
                          title="Chỉnh sửa"
                        >
                          <HiPencilAlt className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog)}
                          className="text-red-600 hover:text-red-800"
                          title="Xóa"
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy bài viết nào
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id || blog._id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4">
                  {/* Image and Title Row */}
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-20 w-32 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.jpg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">{blog.slug}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {blog.category}
                        </span>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {blog.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Tác giả:</span>
                      <span className="ml-1 text-gray-900">{blog.author}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Lượt xem:</span>
                      <span className="ml-1 text-gray-900">{blog.views || 0}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Ngày tạo:</span>
                      <span className="ml-1 text-gray-900">{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleView(blog)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      title="Xem chi tiết"
                    >
                      <HiEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <HiPencilAlt className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      title="Xóa"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
                disabled={filters.page === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  filters.page === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Trước
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
                disabled={filters.page === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  filters.page === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sau
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị{' '}
                  <span className="font-medium">{(filters.page! - 1) * filters.limit! + 1}</span> đến{' '}
                  <span className="font-medium">
                    {Math.min(filters.page! * filters.limit!, totalBlogs)}
                  </span>{' '}
                  trong <span className="font-medium">{totalBlogs}</span> kết quả
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {/* Previous button */}
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
                    disabled={filters.page === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                      filters.page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Trước
                  </button>

                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= filters.page! - 1 && pageNumber <= filters.page! + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setFilters({ ...filters, page: pageNumber })}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNumber === filters.page
                              ? 'z-10 bg-amber-50 border-amber-500 text-amber-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === filters.page! - 2 && pageNumber > 1) ||
                      (pageNumber === filters.page! + 2 && pageNumber < totalPages)
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {/* Next button */}
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
                    disabled={filters.page === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                      filters.page === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    Sau
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {isCreateModalOpen && (
        <BlogCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {isEditModalOpen && selectedBlog && (
        <BlogEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBlog(null);
          }}
          onSuccess={handleEditSuccess}
          blog={selectedBlog}
        />
      )}

      {isDeleteModalOpen && selectedBlog && (
        <BlogDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedBlog(null);
          }}
          onSuccess={handleDeleteSuccess}
          blog={selectedBlog}
        />
      )}

      {isDetailModalOpen && selectedBlog && (
        <BlogDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedBlog(null);
          }}
          blog={selectedBlog}
        />
      )}
    </AdminLayout>
  );
};

export default AdminBlogs;