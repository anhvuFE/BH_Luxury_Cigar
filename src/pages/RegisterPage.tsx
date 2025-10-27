import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhone,
  HiChevronRight
} from 'react-icons/hi';
import { GiCigar, GiCigarette, GiSmokeBomb } from 'react-icons/gi';
import { authService } from '../services/auth.service';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      };

      await authService.register(registerData);

      // Auto login after successful registration
      const loginResponse = await authService.login({
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('user', JSON.stringify(loginResponse.user));
      localStorage.setItem('userRole', loginResponse.user.role);

      navigate('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-12">
      {/* Dark Mysterious Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Dark Premium Background"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-900/20"></div>
      </div>

      {/* Animated Smoke Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-amber-700 rounded-full blur-[200px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-600 rounded-full blur-[200px] opacity-10 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-800 rounded-full blur-[250px] opacity-5 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating Cigar Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GiCigar className="absolute top-20 left-10 text-7xl text-amber-600/10 rotate-45 animate-float" />
        <GiCigarette className="absolute top-1/3 right-10 text-6xl text-amber-600/10 -rotate-12 animate-float" style={{ animationDelay: '1.5s' }} />
        <GiSmokeBomb className="absolute bottom-40 left-1/3 text-8xl text-amber-600/10 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
        <GiCigar className="absolute bottom-20 right-1/4 text-6xl text-amber-600/10 -rotate-45 animate-float" style={{ animationDelay: '4.5s' }} />
      </div>

      {/* Register Container */}
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

        {/* Glass Card Effect */}
        <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-amber-500/20 shadow-2xl p-8">
          {/* Subtle Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-amber-800/20 rounded-3xl blur-lg"></div>

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Tạo Tài Khoản
              </h2>
              <p className="text-gray-400 text-sm">
                Tham gia cộng đồng yêu thích xì gà cao cấp
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 backdrop-blur border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Họ và tên
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineUser className="h-5 w-5 text-amber-500/70 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Số điện thoại
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlinePhone className="h-5 w-5 text-amber-500/70 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="0912345678"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Mật khẩu
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
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5 text-gray-500 hover:text-amber-500 transition-colors" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5 text-gray-500 hover:text-amber-500 transition-colors" />
                    )}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5 text-gray-500 hover:text-amber-500 transition-colors" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5 text-gray-500 hover:text-amber-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-1 bg-black/30 border-gray-700 rounded text-amber-500 focus:ring-amber-500/20"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  Tôi đồng ý với <span className="text-amber-500 hover:text-amber-400 cursor-pointer">điều khoản dịch vụ</span> và <span className="text-amber-500 hover:text-amber-400 cursor-pointer">chính sách bảo mật</span>
                </label>
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
                    Đăng Ký
                    <HiChevronRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <span className="text-gray-400">Đã có tài khoản? </span>
                <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                  Đăng nhập ngay
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-amber-500 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;