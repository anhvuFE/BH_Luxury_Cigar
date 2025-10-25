import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiChevronRight, HiChevronLeft, HiCheck } from 'react-icons/hi';
import { GiCigar, GiSmokeBomb } from 'react-icons/gi';
import { useToast } from '../hooks/useToast';
import { apiService } from '../services/api';

const ResetPasswordPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      showError('Liên kết không hợp lệ hoặc đã hết hạn');
      navigate('/forgot-password');
    }
  }, [token, email, navigate, showError]);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
  };

  const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);

    try {
      await apiService.post('/auth/resetpassword', {
        token,
        email,
        password
      });

      setIsSuccess(true);
      showSuccess('Đặt lại mật khẩu thành công!');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Có lỗi xảy ra. Vui lòng thử lại.'));
      showError('Đặt lại mật khẩu thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Dark Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Dark Premium Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/20"></div>
        </div>

        {/* Smoke Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-green-600 rounded-full blur-[180px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-green-700 rounded-full blur-[180px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <GiSmokeBomb className="absolute top-32 left-20 text-6xl text-green-600/10 rotate-12 animate-float" />
          <GiCigar className="absolute bottom-32 right-32 text-7xl text-green-600/10 -rotate-45 animate-float" style={{ animationDelay: '2s' }} />
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
                <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Glass Card */}
          <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-green-500/20 shadow-2xl p-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-3xl blur-lg"></div>

            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-600/30">
                <HiCheck className="w-10 h-10 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Thành công!
                </h2>
                <p className="text-gray-400 text-sm">
                  Mật khẩu của bạn đã được đặt lại thành công
                </p>
              </div>

              <div className="bg-black/30 border border-gray-700 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Hoàn tất
                </h3>
                <p className="text-gray-400 text-sm">
                  Bạn sẽ được chuyển hướng đến trang đăng nhập sau 3 giây...
                </p>
              </div>

              <Link
                to="/login"
                className="group w-full inline-flex items-center justify-center py-3.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-600/30"
              >
                Đăng nhập ngay
                <HiChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
                Đặt Lại Mật Khẩu
              </h2>
              <p className="text-gray-400 text-sm">
                Nhập mật khẩu mới cho tài khoản: <span className="text-amber-500">{email}</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-amber-500/70 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-500/70 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-amber-500/70 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-500/70 hover:text-amber-500 transition-colors"
                  >
                    {showConfirmPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                  </button>
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

              {/* Password Requirements */}
              <div className="bg-amber-900/20 backdrop-blur border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-gray-300 mb-2">Yêu cầu mật khẩu:</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li className={password.length >= 6 ? 'text-green-400' : ''}>
                        • Ít nhất 6 ký tự
                      </li>
                      <li className={password === confirmPassword && password.length > 0 ? 'text-green-400' : ''}>
                        • Mật khẩu xác nhận phải khớp
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword}
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
                    Đặt lại mật khẩu
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

export default ResetPasswordPage;
