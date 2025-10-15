import React, { useState } from 'react';
import { seedCompleteData } from '../seeds/complete-seed';

const AdminSeedPage: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      setError(null);
      setSeedResult(null);

      console.log('🚀 Starting database seeding...');
      const result = await seedCompleteData();

      setSeedResult(result);
      console.log('✅ Seeding completed successfully!', result);
    } catch (err: any) {
      console.error('❌ Seeding failed:', err);
      setError(err.message || 'Seeding failed');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🛠️ Admin - Database Management
          </h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Cảnh báo
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Thao tác này sẽ thêm dữ liệu mẫu vào database. Chỉ nên chạy một lần duy nhất.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleSeedData}
              disabled={isSeeding}
              className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                isSeeding
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105'
              } transition-all duration-200`}
            >
              {isSeeding ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang seed dữ liệu...
                </div>
              ) : (
                '🌱 Seed Database với Dữ Liệu Mẫu'
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Lỗi</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {seedResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Thành công! 🎉
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Database đã được seed thành công với dữ liệu mẫu:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>📂 {seedResult.categories?.length || 0} danh mục sản phẩm</li>
                      <li>🛍️ {seedResult.products?.length || 0} sản phẩm với ảnh thật</li>
                      <li>📝 {seedResult.blogPosts?.length || 0} bài viết với ảnh featured</li>
                      <li>👤 1 tài khoản admin</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-blue-800 font-medium">
                        ✅ Bây giờ bạn có thể xem sản phẩm trên trang chủ với dữ liệu thật!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📋 Thông tin Seed Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <p><strong>Categories:</strong> 6 danh mục chính</p>
                  <p><strong>Products:</strong> Phụ kiện xì gà với ảnh thật</p>
                  <p><strong>Images:</strong> Từ /src/assets/images/</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Blog Posts:</strong> 2 bài viết chi tiết</p>
                  <p><strong>SEO:</strong> Meta tags đầy đủ</p>
                  <p><strong>Content:</strong> Tiếng Việt hoàn chỉnh</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200"
            >
              ← Về trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSeedPage;