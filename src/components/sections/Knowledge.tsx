import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import { HiOutlineBookOpen, HiOutlineGlobeAlt, HiOutlineCollection, HiOutlineLightningBolt, HiOutlineCalendar, HiChevronRight, HiOutlineMail } from 'react-icons/hi';

const Knowledge: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading relative">
            <span className="relative">
              Kiến Thức <span className="text-amber-600 relative">
                <span className="absolute inset-0 bg-amber-200/30 -skew-x-12 rounded-lg"></span>
                <span className="relative">Xì Gà</span>
              </span>
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Khám phá thế giới xì gà qua những bài viết chuyên sâu, hướng dẫn và chia sẻ kinh nghiệm
            từ các chuyên gia.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-amber-100 hover:border-amber-200 hover:scale-105">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 sm:h-44 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 sm:px-3 text-xs sm:text-sm rounded-full font-medium shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                  <HiOutlineCalendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0 text-amber-500" />
                  <span className="truncate">{formatDate(post.publishDate || '')}</span>
                  <span className="mx-1 sm:mx-2 text-amber-400">•</span>
                  <span className="truncate text-amber-600 font-medium">{post.author}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-amber-700 transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.slug}`}
                  className="group/link inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-xs sm:text-sm"
                >
                  Đọc thêm
                  <HiChevronRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            to="/blog"
            className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 sm:px-8 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-500 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Xem Tất Cả Bài Viết
            <HiChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Knowledge Categories */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">
              Chủ Đề Kiến Thức
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Tìm hiểu về các chủ đề khác nhau liên quan đến thế giới xì gà cao cấp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer border border-amber-100 hover:border-amber-200 hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-lg">
                <HiOutlineBookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Hướng Dẫn</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Cách thưởng thức và bảo quản xì gà đúng cách</p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer border border-amber-100 hover:border-amber-200 hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-lg">
                <HiOutlineGlobeAlt className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Xuất Xứ</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Tìm hiểu về các vùng trồng thuốc lá nổi tiếng</p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer border border-amber-100 hover:border-amber-200 hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-lg">
                <HiOutlineCollection className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Thương Hiệu</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Khám phá lịch sử các thương hiệu xì gà nổi tiếng</p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer border border-amber-100 hover:border-amber-200 hover:scale-105">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-lg">
                <HiOutlineLightningBolt className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Kỹ Thuật</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Quy trình sản xuất và nghệ thuật cuốn xì gà</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white shadow-2xl border border-amber-400">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Nhận Tin Tức Mới Nhất
            </h3>
            <p className="text-amber-100 mb-6 sm:mb-8 text-sm sm:text-base">
              Đăng ký để nhận những bài viết mới nhất về kiến thức xì gà,
              tin tức sản phẩm và ưu đãi đặc biệt.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base shadow-lg"
              />
              <button className="group bg-white text-amber-600 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center">
                <HiOutlineMail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Đăng Ký
              </button>
            </div>

            <p className="text-amber-100 text-xs sm:text-sm mt-3 sm:mt-4">
              Chúng tôi tôn trọng quyền riêng tư của bạn và sẽ không spam email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Knowledge;