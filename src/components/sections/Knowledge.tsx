import React, { useState } from 'react';
import { cigarKnowledge } from '../../data/storeData';
import { FaThermometerHalf, FaTint, FaCut, FaFire, FaClock, FaPhone, FaBook } from 'react-icons/fa';

const Knowledge: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const categories = ['All', 'Basics', 'History', 'Production', 'Tasting', 'Storage'];

  const filteredArticles = cigarKnowledge.filter(article =>
    selectedCategory === 'All' || article.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Basics': return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      );
      case 'History': return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
      case 'Production': return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
      case 'Tasting': return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 2v2.5c0 1.38-1.12 2.5-2.5 2.5S4 5.88 4 4.5V2h5zm6.5 12.5c1.38 0 2.5-1.12 2.5-2.5V2h-5v10.5c0 1.38 1.12 2.5 2.5 2.5zM12 13.5c-3.31 0-6 2.69-6 6v1.5h12V19.5c0-3.31-2.69-6-6-6z"/>
        </svg>
      );
      case 'Storage': return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12-1.5H9V6h10v1zm0 9H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM7 19.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12-1.5H9v-1h10v1z"/>
        </svg>
      );
      default: return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        </svg>
      );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Basics': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'History': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Production': return 'bg-green-100 text-green-700 border-green-200';
      case 'Tasting': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Storage': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gold-light text-dark border-gold';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'Basics': return 'Cơ bản';
      case 'History': return 'Lịch sử';
      case 'Production': return 'Sản xuất';
      case 'Tasting': return 'Nếm thử';
      case 'Storage': return 'Bảo quản';
      default: return category;
    }
  };

  const toggleExpanded = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  return (
    <section id="knowledge" className="py-20 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto animate-fadeInUp">
          <div className="divider-gold mb-8"></div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Kiến thức về Cigar
          </h2>
          <p className="text-lg md:text-xl text-gold-light leading-relaxed font-light">
            Khám phá thế giới cigar qua những bài viết chuyên sâu về lịch sử, kỹ thuật sản xuất và cách thưởng thức
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <div className="bg-gradient-luxury backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gold border-opacity-20">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Danh mục kiến thức</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
            </div>

            {/* Horizontal Nav with Mobile Scroll */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-4 min-w-max px-4 md:px-0 md:justify-center">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative overflow-hidden rounded-xl px-6 py-3 font-medium transition-all duration-500 border-2 flex items-center space-x-2 whitespace-nowrap transform hover:scale-105 hover:-translate-y-1 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-gold to-gold-light text-black border-gold shadow-xl shadow-gold/50 scale-105'
                      : 'bg-black bg-opacity-30 text-gold-light border-gold border-opacity-20 hover:border-gold hover:bg-opacity-50 hover:text-white backdrop-blur-sm hover:shadow-lg hover:shadow-gold/20'
                  }`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-full group-hover:top-full bg-gradient-to-b from-transparent via-white/10 to-transparent transition-all duration-1000 transform skew-y-12"></div>

                  {/* Icon */}
                  <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {category === 'All' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      </svg>
                    ) : getCategoryIcon(category)}
                  </div>

                  {/* Label */}
                  <span className="text-sm font-semibold transition-all duration-300 group-hover:tracking-wide">
                    {category === 'All' ? 'Tất cả' : getCategoryName(category)}
                  </span>

                  {/* Active indicator with animation */}
                  {selectedCategory === category && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dark to-transparent animate-pulse"></div>
                  )}

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm"></div>
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Articles */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredArticles.map((article: any, index) => (
            <div
              key={article.id}
              className="card group bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 animate-fadeInUp interactive-card hover-glow animate-cardFloat"
              style={{animationDelay: `${index * 150}ms`}}
            >
              {/* Article Header */}
              <div className="p-6 border-b border-gold border-opacity-20">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center space-x-2 ${getCategoryColor(article.category)}`}>
                    <div className="flex-shrink-0">{getCategoryIcon(article.category)}</div>
                    <span>{getCategoryName(article.category)}</span>
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FaClock className="text-gold mr-1" />
                    {article.readTime} phút đọc
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {article.title}
                </h3>
              </div>

              {/* Article Content */}
              <div className="p-6 bg-black bg-opacity-30 backdrop-blur-sm">
                <div className={`text-gray-300 leading-relaxed font-light ${
                  expandedArticle === article.id ? '' : 'line-clamp-4'
                }`}>
                  {article.content}
                </div>

                <button
                  onClick={() => toggleExpanded(article.id)}
                  className="read-more-btn mt-4 text-gold hover:text-gold-dark font-medium transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>{expandedArticle === article.id ? 'Thu gọn' : 'Đọc thêm'}</span>
                  <span className={`transition-transform duration-300 ${expandedArticle === article.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No articles message */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6 opacity-50 text-gold"><FaBook /></div>
            <h3 className="font-serif text-2xl font-semibold text-gray-600 mb-4">
              Không có bài viết nào trong danh mục này
            </h3>
            <p className="text-gray-500 mb-8">
              Hãy thử chọn danh mục khác để khám phá thêm kiến thức
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="btn btn-secondary"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}

        {/* Luxury Quick Tips Section */}
        <div className="relative">
          {/* Background with texture */}
          <div className="bg-gradient-dark py-20 px-8 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold opacity-5 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold opacity-5 rounded-full translate-x-12 translate-y-12"></div>

            <div className="relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <h3 className="font-serif text-4xl font-bold text-white mb-6">
                    Bí quyết từ chuyên gia
                  </h3>
                  <div className="divider-gold mx-auto mb-4"></div>
                  <p className="text-gold-light text-lg font-light max-w-2xl mx-auto">
                    Những kiến thức cần thiết để bắt đầu hành trình khám phá thế giới cigar cao cấp
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: <FaThermometerHalf className="text-4xl" />,
                    title: 'Nhiệt độ lý tưởng',
                    tip: '18-21°C là nhiệt độ tốt nhất để bảo quản cigar',
                    detail: 'Nhiệt độ ổn định giúp cigar giữ được hương vị và chất lượng tối ưu'
                  },
                  {
                    icon: <FaTint className="text-4xl" />,
                    title: 'Độ ẩm phù hợp',
                    tip: 'Duy trì độ ẩm 65-72% trong humidor',
                    detail: 'Độ ẩm đúng cách giúp cigar không bị khô hoặc quá ẩm'
                  },
                  {
                    icon: <FaCut className="text-4xl" />,
                    title: 'Cắt đúng cách',
                    tip: 'Cắt khoảng 2-3mm từ đầu cigar',
                    detail: 'Sử dụng dao cắt chuyên dụng để có cut hoàn hảo'
                  },
                  {
                    icon: <FaFire className="text-4xl" />,
                    title: 'Châm từ từ',
                    tip: 'Xoay cigar đều khi châm để cháy đồng đều',
                    detail: 'Châm chậm rãi để đảm bảo cháy đều và hương vị tốt nhất'
                  }
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="group"
                  >
                    <div className="bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20 rounded-2xl p-8 hover:shadow-gold-lg transition-all duration-300 h-full">
                      <div className="flex items-start space-x-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gold bg-opacity-20 rounded-xl flex items-center justify-center text-white group-hover:bg-opacity-30 transition-all duration-300">
                            {tip.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h4 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                            {tip.title}
                          </h4>
                          <p className="text-gold text-base font-medium mb-2">
                            {tip.tip}
                          </p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {tip.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="text-center mt-16">
                <p className="text-gold-light mb-6 text-lg">
                  Muốn tìm hiểu thêm về nghệ thuật cigar?
                </p>
                <button
                  onClick={() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn btn-primary transform hover:scale-105"
                >
                  Tư vấn với chuyên gia
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Consultation CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-luxury text-white p-12 rounded-2xl shadow-2xl">
            <h3 className="font-serif text-3xl font-bold mb-4">
              Muốn tìm hiểu thêm?
            </h3>
            <p className="text-gold-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Ghé thăm cửa hàng để được tư vấn trực tiếp từ các chuyên gia và trải nghiệm thực tế
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn btn-primary"
              >
                Liên hệ chúng tôi
              </button>
              <button
                onClick={() => {
                  const aboutSection = document.querySelector('#about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn btn-secondary"
              >
                Tìm hiểu về cửa hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Knowledge;