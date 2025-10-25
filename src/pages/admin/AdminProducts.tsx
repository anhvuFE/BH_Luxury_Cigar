import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService, type Product } from '../../services/admin.service';
import { resolveImageUrl } from '../../utils/image';
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye
} from 'react-icons/hi';
import { useToast } from '../../hooks/useToast';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import ProductDetailModal from '../../components/admin/ProductDetailModal';
import ProductCreateModal from '../../components/admin/ProductCreateModal';
import ProductEditModal from '../../components/admin/ProductEditModal';
import ProductDeleteModal from '../../components/admin/ProductDeleteModal';

const getProductIdentifier = (product: Product) => product.id || product._id || '';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const AdminProducts: React.FC = () => {
  const { showSuccess } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  // Stock counts
  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [newProductsCount, setNewProductsCount] = useState(0);

  // Modal states
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
    fetchStockCounts();
  }, []);

  // Fetch all products to calculate stock counts
  const fetchStockCounts = async () => {
    try {
      // Get all products by setting a high limit to get all products
      const allProductsResponse = await adminService.getProducts(1, 1000);
      const allProducts = allProductsResponse.data;

      const inStock = allProducts.filter(p => p.inStock !== false).length;
      const outOfStock = allProducts.filter(p => p.inStock === false).length;
      const newProducts = allProducts.filter(p => p.isNew === true).length;

      setInStockCount(inStock);
      setOutOfStockCount(outOfStock);
      setNewProductsCount(newProducts);
    } catch (err) {
      console.error('Error fetching stock counts:', err);
    }
  };

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getProducts(page, itemsPerPage);
      setProducts(response.data);
      setTotalProducts(response.total);
      setTotalPages(response.pagination.total);
      setCurrentPage(page);
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCreateProduct = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // CRUD operations
  const onProductCreated = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    fetchStockCounts(); // Refresh stock counts
    showSuccess('Tạo sản phẩm thành công!');
  };

  const onProductUpdated = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => {
      const currentId = getProductIdentifier(p);
      const updatedId = getProductIdentifier(updatedProduct);
      return currentId === updatedId ? updatedProduct : p;
    }));
    fetchStockCounts(); // Refresh stock counts
    showSuccess('Cập nhật sản phẩm thành công!');
  };

  const onProductDeleted = (productId: string) => {
    setProducts(prev => prev.filter(p => getProductIdentifier(p) !== productId));
    fetchStockCounts(); // Refresh stock counts
    showSuccess('Xóa sản phẩm thành công!');
  };

  // Extract unique categories from products
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const getStatusColor = (inStock: boolean) => {
    return inStock
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getStatusText = (inStock: boolean) => {
    return inStock ? 'Còn hàng' : 'Hết hàng';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' ||
                          (selectedStatus === 'inStock' && product.inStock) ||
                          (selectedStatus === 'outOfStock' && !product.inStock);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600">Quản lý tất cả sản phẩm trong cửa hàng</p>
            </div>
            <button
              onClick={handleCreateProduct}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 sm:py-2 rounded-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
            >
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Lỗi</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => {
                    void fetchProducts();
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <HiOutlineEye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Tổng sản phẩm</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <HiOutlineEye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Còn hàng</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{inStockCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <HiOutlineEye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Hết hàng</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{outOfStockCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-amber-100 p-3 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <HiOutlineEye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Sản phẩm mới</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{newProductsCount}</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-amber-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value as string)}
              options={categories.map(category => ({
                value: category,
                label: category === 'all' ? 'Tất cả danh mục' : category
              }))}
              variant="filled"
              size="md"
            />

            {/* Status Filter */}
            <Select
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value as string)}
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'inStock', label: 'Còn hàng' },
                { value: 'outOfStock', label: 'Hết hàng' }
              ]}
              variant="filled"
              size="md"
            />

            {/* Advanced Filter Button */}
            <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors">
              <HiOutlineFilter className="w-5 h-5 mr-2" />
              Lọc nâng cao
            </button>
          </div>
        </div>

        {/* Products Table - Desktop */}
        <div className="hidden md:block bg-white rounded-xl border border-amber-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-amber-50 border-b border-amber-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Thương hiệu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Nhãn
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-body">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={getProductIdentifier(product)} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={resolveImageUrl(product.image)}
                            alt={product.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/default-product.svg';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: #{product.id?.slice(-6) || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.inStock || false)}`}>
                        {getStatusText(product.inStock || false)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {product.isNew && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Mới
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Nổi bật
                          </span>
                        )}
                        {!product.isNew && !product.isFeatured && (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors"
                          title="Xem chi tiết"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-amber-600 hover:text-amber-700 p-1 hover:bg-amber-50 rounded transition-colors"
                          title="Chỉnh sửa"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-1-1m1 1l-1 1M6 5l1-1m-1 1l1 1"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Không có sản phẩm</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'Không tìm thấy sản phẩm phù hợp với bộ lọc'
                  : 'Chưa có sản phẩm nào được thêm'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Trước
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Sau
                </button>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalProducts}
                itemsPerPage={itemsPerPage}
                onPageChange={fetchProducts}
                loading={loading}
              />
            </div>
          )}
        </div>

        {/* Products Cards - Mobile */}
        <div className="md:hidden space-y-4 mb-6">
          {filteredProducts.map((product) => (
            <div key={getProductIdentifier(product)} className="bg-white rounded-xl border border-amber-100 p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={resolveImageUrl(product.image, '/images/default-product.svg')}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/default-product.svg';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                  <p className="text-xs text-gray-500">ID: #{getProductIdentifier(product)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                  <div className="flex items-center justify-end mt-3 space-x-2">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <HiOutlinePencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Mobile */}
        {filteredProducts.length > 0 && (
          <div className="md:hidden mb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalProducts}
              itemsPerPage={itemsPerPage}
              onPageChange={fetchProducts}
              loading={loading}
            />
          </div>
        )}
          </>
        )}

        {/* Modals */}
        <ProductDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          product={selectedProduct}
        />

        <ProductCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onProductCreated={onProductCreated}
        />

        <ProductEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProduct}
          onProductUpdated={onProductUpdated}
        />

        <ProductDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          product={selectedProduct}
          onProductDeleted={onProductDeleted}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
