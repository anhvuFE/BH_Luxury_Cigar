import React, { useState } from 'react';
import { HiExclamation } from 'react-icons/hi';
import type { BlogPost } from '../../types/database';
import blogService from '../../services/blog.service';
import { useToast } from '../../hooks/useToast';

interface BlogDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blog: BlogPost;
}

const BlogDeleteModal: React.FC<BlogDeleteModalProps> = ({ isOpen, onClose, onSuccess, blog }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const blogId = blog.id || blog._id;
      if (!blogId) {
        throw new Error('Blog ID is missing');
      }
      await blogService.delete(blogId);
      showToast('Xóa bài viết thành công!', 'success');
      onSuccess();
    } catch (error: any) {
      showToast(error.message || 'Không thể xóa bài viết', 'error');
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <HiExclamation className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Xác nhận xóa bài viết
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Bạn có chắc chắn muốn xóa bài viết <strong>{blog.title}</strong> không?
                    Hành động này không thể hoàn tác.
                  </p>

                  {/* Blog Info */}
                  <div className="mt-4 bg-gray-50 p-3 rounded-md">
                    <dl className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <dt className="text-gray-500">Danh mục:</dt>
                        <dd className="text-gray-900">{blog.category}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-gray-500">Tác giả:</dt>
                        <dd className="text-gray-900">{blog.author}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-gray-500">Trạng thái:</dt>
                        <dd>
                          <span
                            className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 ${
                              blog.isPublished
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {blog.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                          </span>
                        </dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-gray-500">Lượt xem:</dt>
                        <dd className="text-gray-900">{blog.viewsCount || blog.views || 0}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang xóa...' : 'Xóa bài viết'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDeleteModal;