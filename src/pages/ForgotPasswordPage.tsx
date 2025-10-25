import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { GiCigar, GiSmokeBomb } from 'react-icons/gi';
import { useToast } from '../hooks/useToast';
import { apiService } from '../services/api';

const ForgotPasswordPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiService.post('/auth/forgotpassword', { email });
      setIsEmailSent(true);
      showSuccess('Email đã được gửi thành công!');
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Có lỗi xảy ra. Vui lòng thử lại.');
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await apiService.post('/auth/forgotpassword', { email });
      showSuccess('Email đã được gửi lại!');
    } catch (error: unknown) {
      showError(getErrorMessage(error, 'Có lỗi xảy ra khi gửi lại email.'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Dark Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Dark Premium Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-900/20"></div>
        </div>

        {/* Smoke Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-amber-600 rounded-full blur-[180px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-amber-700 rounded-full blur-[180px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GiSmokeBomb className="absolute top-32 left-20 text-6xl text-amber-600/10 rotate-12 animate-float" />
          <GiCigar className="absolute bottom-32 right-32 text-7xl text-amber-600/10 -rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-md w-full mx-4">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block group">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="BH Luxury Cigar"
                  className="h-16 w-auto mx-auto filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Glass Card */}
          <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-amber-500/20 shadow-2xl p-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 rounded-3xl blur-lg"></div>

            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-600/30">
                <HiOutlineMail className="w-10 h-10 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Kiểm tra email
                </h2>
                <p className="text-gray-400 text-sm">
                  Chúng tôi đã gửi liên kết đặt lại mật khẩu đến
                </p>
                <p className="font-medium text-amber-500 mt-1">{email}</p>
              </div>

              <div className="bg-black/30 border border-gray-700 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Bước tiếp theo
                </h3>
                <p className="text-gray-400 text-sm">
                  Vui lòng kiểm tra hộp thư email (kể cả thư mục spam) và nhấp vào liên kết
                  để đặt lại mật khẩu của bạn.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full py-3.5 bg-black/30 border border-amber-500/30 text-amber-500 rounded-xl hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300 font-medium disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    'Gửi lại email'
                  )}
                </button>

                <Link
                  to="/login"
                  className="group w-full inline-flex items-center justify-center py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-amber-600/30"
                >
                  <HiChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Quay lại đăng nhập
                </Link>
              </div>

              <p className="text-xs text-gray-500">
                Không nhận được email?{' '}
                <Link to="/guide" className="text-amber-500 hover:text-amber-400">
                  Liên hệ hỗ trợ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Dark Mysterious Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1617638120751-92d272ce9b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Dark Smoke Background"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-900/20"></div>
      </div>

      {/* Animated Smoke Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-amber-700 rounded-full blur-[200px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-600 rounded-full blur-[200px] opacity-10 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Cigar Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GiCigar className="absolute top-20 right-20 text-7xl text-amber-600/10 rotate-12 animate-float" />
        <GiSmokeBomb className="absolute bottom-40 left-20 text-6xl text-amber-600/10 -rotate-45 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Container */}
      <div className="relative max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="BH Luxury Cigar"
                className="h-20 w-auto mx-auto filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </Link>
        </div>

        {/* Glass Card Effect */}
        <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-amber-500/20 shadow-2xl p-10">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Quên Mật Khẩu
              </h2>
              <p className="text-gray-400 text-sm">
                Nhập email để nhận liên kết đặt lại mật khẩu
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-5 w-5 text-amber-500/70 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/0 to-amber-600/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/20 backdrop-blur border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-3 text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-amber-900/20 backdrop-blur border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="ml-3 text-sm text-gray-300">
                    Chúng tôi sẽ gửi cho bạn một liên kết an toàn để đặt lại mật khẩu.
                    Vui lòng kiểm tra cả thư mục spam.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-600/30"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Gửi liên kết đặt lại
                    <HiChevronRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>

              {/* Back to login */}
              <div className="text-center pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  <HiChevronLeft className="mr-1 w-4 h-4" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Cần hỗ trợ?{' '}
            <Link to="/guide" className="text-amber-500 hover:text-amber-400">
              Xem hướng dẫn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
