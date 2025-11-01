import React from 'react';
import { HiX, HiCalendar, HiEye, HiTag, HiUser } from 'react-icons/hi';
import type { BlogPost } from '../../types/database';

interface BlogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost;
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ isOpen, onClose, blog }) => {
  if (!isOpen) return null;

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('vi-VN');
  };

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
              <h3 className="text-lg leading-6 font-medium text-gray-900">Chi tiết bài viết</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {/* Featured Image */}
            {blog.image && (
              <div className="mb-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg';
                  }}
                />
              </div>
            )}

            {/* Title and Slug */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500">Slug: {blog.slug}</p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <HiTag className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Danh mục</p>
                  <p className="text-sm font-medium text-gray-900">{blog.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <HiUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Tác giả</p>
                  <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <HiEye className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Lượt xem</p>
                  <p className="text-sm font-medium text-gray-900">{blog.viewsCount || blog.views || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <HiCalendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Trạng thái</p>
                  <span
                    className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 ${
                      blog.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {blog.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Mô tả ngắn</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{blog.excerpt}</p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Nội dung</h3>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Ngày tạo</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(blog.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Cập nhật lần cuối</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(blog.updatedAt)}</p>
              </div>
              {blog.publishDate && (
                <div>
                  <p className="text-xs text-gray-500">Ngày xuất bản</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(blog.publishDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:w-auto sm:text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailModal;