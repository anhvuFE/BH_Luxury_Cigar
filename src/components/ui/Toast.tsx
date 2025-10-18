import React, { useEffect, useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineInformationCircle, HiOutlineXCircle, HiX } from 'react-icons/hi';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto remove after duration
    const timer = setTimeout(() => {
      handleRemove();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <HiOutlineCheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <HiOutlineXCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <HiOutlineExclamationCircle className="w-5 h-5 text-amber-600" />;
      case 'info':
        return <HiOutlineInformationCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <HiOutlineInformationCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-gradient-to-r from-green-50 to-green-100 border-green-200';
      case 'error':
        return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'warning':
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-amber-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out mb-3
        ${isVisible && !isRemoving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isRemoving ? 'translate-x-full opacity-0 scale-95' : ''}
      `}
    >
      <div
        className={`
          flex items-start p-4 rounded-xl border shadow-lg backdrop-blur-sm
          ${getBackgroundColor()}
          min-w-[320px] max-w-[400px]
        `}
      >
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium font-inter ${getTextColor()}`}>
            {toast.message}
          </p>
        </div>

        <button
          onClick={handleRemove}
          className="flex-shrink-0 ml-3 p-1 rounded-lg hover:bg-black/5 transition-colors"
        >
          <HiX className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};