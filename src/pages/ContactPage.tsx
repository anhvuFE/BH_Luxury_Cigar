import React, { useState } from 'react';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineClock, HiOutlinePaperAirplane } from 'react-icons/hi';
import { storeInfo } from '../data/storeData';
import { useToast } from '../hooks/useToast';
import Select from '../components/common/Select';

const ContactPage: React.FC = () => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    showSuccess('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Page Header */}
        <div className="text-center mb-16 sm:mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-block mb-6">
              <span className="text-amber-600 font-medium text-sm tracking-widest uppercase bg-amber-50 px-4 py-2 rounded-full">Kết nối với chúng tôi</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-8 font-heading">
              Liên <span className="font-bold text-amber-600 relative">
                <span className="absolute inset-0 bg-amber-200/30 -skew-x-12 rounded-lg"></span>
                <span className="relative">Hệ</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body">
              Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn về các sản phẩm xì gà cao cấp
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Thông Tin Liên Hệ</h2>

            {/* Store Info */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-8 mb-8 shadow-lg border border-amber-100 hover:shadow-2xl transition-all duration-500">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse"></span>
                {storeInfo.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Địa chỉ</p>
                    <p className="text-gray-600">{storeInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Số điện thoại</p>
                    <a href={`tel:${storeInfo.phone}`} className="text-primary-600 hover:text-primary-700">
                      {storeInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href={`mailto:${storeInfo.email}`} className="text-primary-600 hover:text-primary-700">
                      {storeInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Giờ mở cửa</p>
                    <div className="text-gray-600 space-y-1">
                      <p>Thứ 2 - Thứ 6: 9:00 - 18:00</p>
                      <p>Thứ 7 - Chủ nhật: 9:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-6 shadow-sm border border-amber-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <HiOutlineClock className="w-5 h-5 text-amber-600 mr-2" />
                Lưu ý quan trọng
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Chúng tôi khuyến khích khách hàng đến cửa hàng trực tiếp để được tư vấn và trải nghiệm sản phẩm tốt nhất.</p>
                <p>• Vui lòng gọi trước để đảm bảo sản phẩm có sẵn.</p>
                <p>• Chúng tôi cung cấp dịch vụ tư vấn chuyên nghiệp về các loại xì gà phù hợp với từng khách hàng.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-amber-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <HiOutlinePaperAirplane className="w-6 h-6 text-amber-600 mr-3" />
              Gửi Tin Nhắn
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/30 transition-all duration-300 hover:bg-amber-50/50"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/30 transition-all duration-300 hover:bg-amber-50/50"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/30 transition-all duration-300 hover:bg-amber-50/50"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <Select
                    id="subject"
                    label="Chủ đề"
                    value={formData.subject}
                    onChange={(value) => setFormData(prev => ({ ...prev, subject: value as string }))}
                    options={[
                      { value: 'product-inquiry', label: 'Hỏi về sản phẩm' },
                      { value: 'consultation', label: 'Tư vấn' },
                      { value: 'complaint', label: 'Khiếu nại' },
                      { value: 'partnership', label: 'Hợp tác' },
                      { value: 'other', label: 'Khác' }
                    ]}
                    placeholder="Chọn chủ đề"
                    variant="filled"
                    size="lg"
                    className="bg-amber-50/30 border-amber-200 hover:bg-amber-50/50 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tin nhắn *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                  placeholder="Nhập nội dung tin nhắn..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-500 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center group"
              >
                <HiOutlinePaperAirplane className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
            <HiOutlineLocationMarker className="w-6 h-6 text-amber-600 mr-3" />
            Vị Trí Cửa Hàng
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.969286!2d106.3178!3d20.9385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU2JzE4LjYiTiAxMDbCsDE5JzA0LjEiRQ!5e0!3m2!1svi!2s!4v1634567890123!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BH Luxury Cigar Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;