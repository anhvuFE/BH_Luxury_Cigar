import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-amber-500 rounded-full animate-spin`}></div>
    </div>
  );
};

// Page Loading Component
export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 font-body">Đang tải...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;