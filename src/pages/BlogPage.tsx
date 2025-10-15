import React from 'react';
import { blogPosts } from '../data/blog';
import type { BlogPost } from '../types';
import { HiChevronRight } from 'react-icons/hi';

const BlogPage: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Page Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block mb-4">
            <span className="text-amber-600 font-medium text-sm tracking-widest uppercase">Blog & Tin tức</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6 font-heading">
            Kiến Thức <span className="font-bold text-amber-600">Xì Gà</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
            Khám phá thế giới xì gà qua những bài viết chuyên sâu, hướng dẫn và chia sẻ kinh nghiệm từ các chuyên gia
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {blogPosts.map((post: BlogPost) => (
            <article key={post.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{formatDate(post.publishDate)}</span>
                  <span className="mx-2 text-amber-400">•</span>
                  <span className="text-amber-600 font-medium">{post.author}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm group/link"
                >
                  Đọc thêm
                  <svg className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Featured Article */}
        {blogPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-heading">Bài Viết Nổi Bật</h2>
            <div className="bg-gradient-to-br from-amber-50/50 to-white rounded-3xl p-8 shadow-lg border border-amber-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 text-xs rounded-full mr-3 shadow-lg">
                      {blogPosts[0].category}
                    </span>
                    <span>{formatDate(blogPosts[0].publishDate)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-body leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <a
                    href={`/blog/${blogPosts[0].slug}`}
                    className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    Đọc bài viết
                    <HiChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;