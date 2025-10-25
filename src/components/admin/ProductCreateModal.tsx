import React, { useState, useRef } from 'react';
import Modal from '../common/Modal';
import Select from '../common/Select';
import { type Product, adminService } from '../../services/admin.service';
import { HiOutlineUpload } from 'react-icons/hi';

interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: Product) => void;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isOpen,
  onClose,
  onProductCreated
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    specifications: '',
    inStock: true,
    isNew: false,
    isFeatured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Vui lòng chọn file ảnh hợp lệ' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Kích thước file không được vượt quá 5MB' }));
        return;
      }

      setImageFile(file);
      setErrors(prev => ({ ...prev, image: '' }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.brand.trim()) newErrors.brand = 'Thương hiệu là bắt buộc';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Giá phải là số dương';
    }
    if (!formData.category.trim()) newErrors.category = 'Danh mục là bắt buộc';
    if (!imageFile) newErrors.image = 'Vui lòng chọn hình ảnh cho sản phẩm';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      let uploadedImagePath = '';

      if (imageFile) {
        try {
          const uploadResponse = await adminService.uploadProductImage(imageFile);
          uploadedImagePath = uploadResponse.path;
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          setErrors(prev => ({
            ...prev,
            image: 'Không thể tải ảnh lên. Vui lòng thử lại.'
          }));
          return;
        }
      }

      // Prepare product data according to backend schema
      const productData = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
        category: formData.category.trim(),
        description: formData.description.trim() || '',
        specifications: (() => {
          try {
            return formData.specifications.trim() ? JSON.parse(formData.specifications.trim()) : {};
          } catch {
            return { description: formData.specifications.trim() };
          }
        })(),
        inStock: formData.inStock,
        isNew: formData.isNew,
        isFeatured: formData.isFeatured,
        image: uploadedImagePath,
        images: uploadedImagePath ? [uploadedImagePath] : []
      };

      // Create product
      const newProduct = await adminService.createProduct(productData);
      onProductCreated(newProduct);

      // Reset form
      setFormData({
        name: '',
        brand: '',
        price: '',
        originalPrice: '',
        category: '',
        description: '',
        specifications: '',
        inStock: true,
        isNew: false,
        isFeatured: false,
      });
      setImageFile(null);
      setImagePreview('');
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      setErrors({ general: 'Không thể tạo sản phẩm. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      specifications: '',
      inStock: true,
      isNew: false,
      isFeatured: false,
    });
    setImageFile(null);
    setImagePreview('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Thêm sản phẩm mới" size="2xl">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Hình ảnh sản phẩm
          </label>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 bg-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  <HiOutlineUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 text-center">Click để chọn ảnh</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium"
              >
                {imagePreview ? 'Đổi ảnh' : 'Chọn ảnh'}
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Chọn ảnh JPG hoặc PNG có kích thước tối đa 5MB để hiển thị sản phẩm một cách tốt nhất.
              </p>
              {errors.image && (
                <p className="text-sm text-red-600 mt-2 font-medium">{errors.image}</p>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên sản phẩm *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.name ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thương hiệu *
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.brand ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Nhập thương hiệu"
            />
            {errors.brand && (
              <p className="text-xs text-red-600 mt-1">{errors.brand}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá (VNĐ) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.price ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="0"
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-xs text-red-600 mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá gốc (VNĐ)
            </label>
            <input
              type="number"
              value={formData.originalPrice}
              onChange={(e) => handleInputChange('originalPrice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="0"
              min="0"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">Để trống nếu giống giá bán</p>
          </div>

          <div>
            <Select
              label="Danh mục *"
              value={formData.category}
              onChange={(value) => handleInputChange('category', value as string)}
              options={[
                { value: '', label: 'Chọn danh mục' },
                { value: 'Cuban Cigars', label: 'Cuban Cigars' },
                { value: 'Dominican Cigars', label: 'Dominican Cigars' },
                { value: 'Nicaraguan Cigars', label: 'Nicaraguan Cigars' },
                { value: 'Honduran Cigars', label: 'Honduran Cigars' },
                { value: 'Premium Cigars', label: 'Premium Cigars' },
                { value: 'Accessories', label: 'Accessories' },
                { value: 'Humidors', label: 'Humidors' },
                { value: 'Cutters', label: 'Cutters' },
                { value: 'Lighters', label: 'Lighters' },
                { value: 'Whisky', label: 'Whisky' },
                { value: 'Spirits', label: 'Spirits' },
                { value: 'Wine', label: 'Wine' }
              ]}
              placeholder="Chọn danh mục"
              error={errors.category}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thông số kỹ thuật
          </label>
          <textarea
            value={formData.specifications}
            onChange={(e) => handleInputChange('specifications', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder='{"origin": "Cuba", "size": "6x50", "strength": "Medium"}'
          />
          <p className="text-xs text-gray-500 mt-1">Nhập JSON format hoặc để trống</p>
        </div>

        {/* Status Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => handleInputChange('inStock', e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
              Còn hàng
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNew"
              checked={formData.isNew}
              onChange={(e) => handleInputChange('isNew', e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="isNew" className="ml-2 block text-sm text-gray-700">
              Sản phẩm mới
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
              Sản phẩm nổi bật
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
          </button>
        </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductCreateModal;
