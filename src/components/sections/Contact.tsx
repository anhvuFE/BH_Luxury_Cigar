import React, { useState } from 'react';
import { storeInfo } from '../../data/storeData';
import {
  FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope, FaStore, FaStar,
  FaCheck, FaExclamationTriangle, FaArrowRight, FaMap, FaBook
} from 'react-icons/fa';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-2xl text-dark" />,
      title: 'Điện thoại',
      value: storeInfo.phone,
      action: `tel:${storeInfo.phone}`,
      description: 'Gọi ngay để được tư vấn'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-dark" />,
      title: 'Địa chỉ cửa hàng',
      value: storeInfo.address,
      action: `https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`,
      description: 'Xem trên bản đồ'
    },
    {
      icon: <FaClock className="text-2xl text-dark" />,
      title: 'Giờ mở cửa',
      value: storeInfo.openingHours || 'Thứ 2 - Chủ nhật: 9:00 - 22:00',
      action: '',
      description: 'Thời gian phục vụ'
    },
    {
      icon: <FaEnvelope className="text-2xl text-dark" />,
      title: 'Email',
      value: storeInfo.email || 'info@bhluxurycigar.com',
      action: `mailto:${storeInfo.email || 'info@bhluxurycigar.com'}`,
      description: 'Gửi email cho chúng tôi'
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto animate-fadeInUp">
          <div className="divider-gold mb-8"></div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-lg md:text-xl text-gold-light leading-relaxed font-light">
            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
          </p>
        </div>

        {/* Refined Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group"
              style={{animationDelay: `${index * 150}ms`}}
            >
              <div className="bg-gradient-luxury text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gold border-opacity-20 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gold bg-opacity-20 rounded-lg flex items-center justify-center mx-auto group-hover:bg-opacity-30 transition-all duration-300">
                    {method.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center">
                  <h4 className="font-serif text-lg font-bold mb-3 text-gold group-hover:text-white transition-colors duration-300">{method.title}</h4>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{method.value}</p>

                  {method.action ? (
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : '_self'}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="inline-flex items-center justify-center text-gold hover:text-white transition-colors duration-300 text-xs font-medium uppercase tracking-wider px-4 py-2 border border-gold border-opacity-30 rounded-lg hover:bg-gold hover:bg-opacity-10"
                    >
                      {method.description}
                      <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">{method.description}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Store Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-premium p-8 bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20">
              <h3 className="font-serif text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-gold mr-3">🏪</span>
                {storeInfo.name}
              </h3>

              <div className="space-y-4 mb-8">
                <p className="text-gray-300 leading-relaxed font-light">
                  {storeInfo.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <span className="text-gold text-lg group-hover:scale-110 transition-transform duration-300">📍</span>
                  <span className="text-gray-300 text-sm">{storeInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <span className="text-gold text-lg group-hover:scale-110 transition-transform duration-300">📞</span>
                  <a href={`tel:${storeInfo.phone}`} className="text-gray-300 text-sm hover:text-gold transition-colors duration-300">
                    {storeInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <span className="text-gold text-lg group-hover:scale-110 transition-transform duration-300">⏰</span>
                  <span className="text-gray-300 text-sm">{storeInfo.openingHours}</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-luxury backdrop-blur-lg p-6 rounded-xl border-l-4 border-gold">
              <h4 className="font-serif text-lg font-bold text-white mb-4 flex items-center">
                <FaStar className="text-gold mr-2 text-lg" />
                Tại sao chọn BH Luxury Cigar?
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center">
                  <FaCheck className="text-gold mr-2 font-bold" />
                  Sản phẩm chính hãng 100%
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold mr-2 font-bold" />
                  Tư vấn chuyên nghiệp
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold mr-2 font-bold" />
                  Bảo quản đúng tiêu chuẩn
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold mr-2 font-bold" />
                  Dịch vụ sau bán hàng tốt
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold mr-2 font-bold" />
                  Không gian thưởng thức sang trọng
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8 bg-gradient-luxury backdrop-blur-lg border border-gold border-opacity-20">
              <h3 className="font-serif text-2xl font-bold text-white mb-6">Gửi tin nhắn cho chúng tôi</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gold mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-lg focus:border-gold focus:ring-0 bg-black bg-opacity-30 backdrop-blur-sm text-white placeholder-gray-400"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-lg focus:border-gold focus:ring-0 bg-black bg-opacity-30 backdrop-blur-sm text-white placeholder-gray-400"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-lg focus:border-gold focus:ring-0 bg-black bg-opacity-30 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gold mb-2">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-lg focus:border-gold focus:ring-0 resize-vertical bg-black bg-opacity-30 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn ${isSubmitting ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`}
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg flex items-center">
                    <span className="text-xl mr-3">✅</span>
                    <div>
                      <strong>Tin nhắn đã được gửi thành công!</strong>
                      <p className="text-sm mt-1">Chúng tôi sẽ liên hệ lại với bạn sớm nhất.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center">
                    <span className="text-xl mr-3">❌</span>
                    <div>
                      <strong>Có lỗi xảy ra khi gửi tin nhắn.</strong>
                      <p className="text-sm mt-1">Vui lòng thử lại hoặc liên hệ trực tiếp qua điện thoại.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-6">Hoặc liên hệ trực tiếp:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${storeInfo.phone}`}
                  className="btn btn-primary flex items-center justify-center space-x-2"
                >
                  <FaPhone />
                  <span>Gọi ngay: {storeInfo.phone}</span>
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary flex items-center justify-center space-x-2"
                >
                  <FaMap />
                  <span>Chỉ đường</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Visit Us CTA */}
        <div className="mt-16">
          <div className="bg-gradient-luxury text-white p-12 rounded-2xl shadow-2xl text-center">
            <h3 className="font-serif text-3xl font-bold mb-4">
              Chào mừng bạn đến với {storeInfo.name}
            </h3>
            <p className="text-gold-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm cigar tuyệt vời nhất.
              Hãy ghé thăm cửa hàng để khám phá bộ sưu tập đa dạng và nhận được tư vấn chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaMap className="mr-2" /> Xem bản đồ
              </a>
              <button
                onClick={() => {
                  const aboutSection = document.querySelector('#about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn btn-secondary"
              >
                <FaBook className="mr-2" /> Tìm hiểu về chúng tôi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;