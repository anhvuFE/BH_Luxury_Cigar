import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail, HiOutlineLockClosed, HiChevronRight } from 'react-icons/hi';
import { GiCigar, GiCigarette, GiSmokeBomb } from 'react-icons/gi';
import { authService } from '../services/auth.service';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('userRole', response.user.role);

      // Redirect based on role
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else if (response.user.role === 'staff') {
        navigate('/admin');
      } else {
        navigate('/'); // User goes to homepage
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Đăng nhập thất bại. Vui lòng thử lại.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Dark Mysterious Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1527933053326-89d1746b76b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Dark Cigar Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      </div>

      {/* Floating Smoke Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-600 rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-700 rounded-full blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Cigar Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GiCigar className="absolute top-10 left-10 text-6xl text-amber-600/10 rotate-45 animate-float" />
        <GiCigarette className="absolute top-40 right-20 text-8xl text-amber-600/10 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <GiCigar className="absolute bottom-20 left-1/4 text-7xl text-amber-600/10 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Login Container */}
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
          {/* Glow Effects */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Đăng Nhập
              </h2>
              <p className="text-gray-400 text-sm">
                Chào mừng bạn trở lại với BH Luxury Cigar
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 backdrop-blur border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
                {error}
              </div>
            )}

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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/0 to-amber-600/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
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
                    className="w-full pl-12 pr-12 py-4 bg-black/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
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
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/0 to-amber-600/0 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-black/30 border-gray-700 rounded text-amber-500 focus:ring-amber-500/20"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
                  Quên mật khẩu?
                </Link>
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
                    Đăng Nhập
                    <HiChevronRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/40 text-gray-400">Hoặc</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <span className="text-gray-400">Bạn chưa có tài khoản? </span>
                <Link to="/register" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                  Đăng ký ngay
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
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

export default LoginPage;