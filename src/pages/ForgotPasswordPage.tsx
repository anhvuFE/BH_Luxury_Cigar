import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useToast } from '../hooks/useToast';

const ForgotPasswordPage: React.FC = () => {
  const { showSuccess } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      console.log('Reset password email sent to:', email);
    }, 1500);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccess('Email đã được gửi lại!');
    }, 1000);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/src/assets/images/logo.png"
                alt="BH Luxury Cigar"
                className="h-16 w-auto mx-auto hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineMail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 font-heading">
              Kiểm tra email
            </h2>
            <p className="mt-2 text-gray-600 font-body">
              Chúng tôi đã gửi liên kết đặt lại mật khẩu đến
            </p>
            <p className="font-medium text-amber-600 font-inter">{email}</p>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 p-8">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                  Bước tiếp theo
                </h3>
                <p className="text-gray-600 text-sm font-body leading-relaxed">
                  Vui lòng kiểm tra hộp thư email (kể cả thư mục spam) và nhấp vào liên kết
                  để đặt lại mật khẩu của bạn.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 font-medium font-inter disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    'Gửi lại email'
                  )}
                </button>

                <Link
                  to="/login"
                  className="group w-full inline-flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <HiChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500 font-inter">
              Không nhận được email?{' '}
              <Link to="/contact" className="text-amber-600 hover:text-amber-700">
                Liên hệ hỗ trợ
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-50/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-8">
            <img
              src="/src/assets/images/logo.png"
              alt="BH Luxury Cigar"
              className="h-16 w-auto mx-auto hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 font-heading">
            Quên Mật Khẩu
          </h2>
          <p className="mt-2 text-gray-600 font-body">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="h-5 w-5 text-amber-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50/30 transition-all duration-300 font-inter"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-4 border border-amber-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 font-inter">
                    Chúng tôi sẽ gửi cho bạn một liên kết an toàn để đặt lại mật khẩu.
                    Vui lòng kiểm tra cả thư mục spam.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Gửi liên kết đặt lại
                  <HiChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="group inline-flex items-center text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors font-inter"
            >
              <HiChevronLeft className="mr-1 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Quay lại đăng nhập
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 font-inter">
            Cần hỗ trợ?{' '}
            <Link to="/contact" className="text-amber-600 hover:text-amber-700">
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;