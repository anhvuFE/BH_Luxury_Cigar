import React, { useState, useEffect, useRef } from 'react';
import { HiX, HiUpload, HiPhotograph } from 'react-icons/hi';
import type { BlogPost } from '../../types/database';
import blogService from '../../services/blog.service';
import uploadService from '../../services/upload.service';
import { useToast } from '../../hooks/useToast';

interface BlogEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blog: BlogPost;
}

const BlogEditModal: React.FC<BlogEditModalProps> = ({ isOpen, onClose, onSuccess, blog }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    category: '',
    isPublished: false,
  });

  const categories = [
    'News',
    'How-To',
    'Lifestyle',
    'Reviews',
    'Interviews',
    'Pairings',
    'Education'
  ];

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        image: blog.image || '',
        author: blog.author || 'Admin',
        category: blog.category || 'Kiến thức cigar',
        isPublished: blog.isPublished || false,
      });
    }
  }, [blog]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn file ảnh', 'error');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Kích thước ảnh không được vượt quá 5MB', 'error');
      return;
    }

    try {
      setUploadingImage(true);
      const imageUrl = await uploadService.uploadImage(file);
      setFormData({
        ...formData,
        image: imageUrl,
      });
      showToast('Upload ảnh thành công!', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Không thể upload ảnh', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.content || !formData.image) {
      showToast('Vui lòng điền đầy đủ thông tin', 'error');
      return;
    }

    try {
      setLoading(true);
      const blogId = blog.id || blog._id;
      if (!blogId) {
        throw new Error('Blog ID is missing');
      }
      await blogService.update(blogId, formData);
      showToast('Cập nhật bài viết thành công!', 'success');
      onSuccess();
    } catch (error: any) {
      showToast(error.message || 'Không thể cập nhật bài viết', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Chỉnh sửa bài viết</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="Nhập tiêu đề bài viết"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="sm:col-span-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    Slug (URL thân thiện)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="duong-dan-bai-viet"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Danh mục <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Tác giả
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="Tên tác giả"
                  />
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Hình ảnh <span className="text-red-500">*</span>
                  </label>

                  {/* Upload buttons */}
                  <div className="mt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
                          Đang upload...
                        </>
                      ) : (
                        <>
                          <HiPhotograph className="-ml-1 mr-2 h-5 w-5" />
                          Chọn từ máy tính
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* URL input */}
                  <div className="mt-3">
                    <label className="block text-xs text-gray-500 mb-1">Hoặc nhập URL hình ảnh:</label>
                    <div className="flex rounded-md shadow-sm">
                      <input
                        type="url"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <HiUpload className="h-5 w-5" />
                      </span>
                    </div>
                  </div>

                  {/* Image preview */}
                  {formData.image && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Xem trước:</p>
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-32 w-auto object-cover rounded-md border border-gray-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-2">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Mô tả ngắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="excerpt"
                    id="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="Mô tả ngắn về bài viết (hiển thị trong danh sách)"
                    required
                  />
                </div>

                {/* Content */}
                <div className="sm:col-span-2">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Nội dung bài viết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows={10}
                    value={formData.content}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="Nội dung chi tiết của bài viết (hỗ trợ HTML)"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Hỗ trợ HTML cơ bản: &lt;p&gt;, &lt;br&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;a&gt;, &lt;img&gt;
                  </p>
                </div>

                {/* Publish Status */}
                <div className="sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                      Xuất bản
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Nếu không chọn, bài viết sẽ được lưu dưới dạng bản nháp
                  </p>
                </div>

                {/* Stats Info */}
                {blog && (
                  <div className="sm:col-span-2 bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Thông tin bài viết</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Lượt xem:</span> {blog.viewsCount || blog.views || 0}
                      </div>
                      <div>
                        <span className="font-medium">Ngày tạo:</span>{' '}
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang cập nhật...' : 'Cập nhật'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogEditModal;