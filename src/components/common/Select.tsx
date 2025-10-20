import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  label?: string;
  error?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Chọn...",
  disabled = false,
  size = 'md',
  variant = 'default',
  className = '',
  label,
  error,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const variantClasses = {
    default: 'bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-500 shadow-sm hover:shadow-md',
    outlined: 'bg-white border-gray-300 text-gray-900 hover:border-amber-400 focus:border-amber-500 focus:ring-amber-500 shadow-sm hover:shadow-md',
    filled: 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-900 hover:from-white hover:to-gray-50 focus:bg-white focus:border-amber-500 focus:ring-amber-500 shadow-sm hover:shadow-md'
  };

  const baseClasses = `
    relative w-full border rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
    appearance-none cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
    ${className}
  `.trim();

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2 ${error ? 'text-red-700' : 'text-gray-700'}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Custom Select Button */}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={baseClasses}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <HiChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              } ${error ? 'text-red-500' : 'text-gray-400'}`}
            />
          </span>
        </button>

        {/* Custom Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-auto animate-in slide-in-from-top-2 duration-200">
            <div className="py-1">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full text-left transition-all duration-150 focus:outline-none focus:bg-amber-50 ${
                    option.value === value
                      ? 'bg-amber-100 text-amber-900 font-semibold border-l-4 border-amber-500'
                      : 'text-gray-900 hover:bg-amber-50 hover:text-amber-900'
                  } ${
                    size === 'sm'
                      ? 'px-3 py-2 text-xs'
                      : size === 'lg'
                        ? 'px-4 py-3 text-base'
                        : 'px-4 py-2.5 text-sm'
                  } ${
                    index === 0 ? 'rounded-t-xl' : ''
                  } ${
                    index === options.length - 1 ? 'rounded-b-xl' : ''
                  }`}
                >
                  <span className="flex items-center">
                    <span className="truncate">{option.label}</span>
                    {option.value === value && (
                      <span className="ml-auto text-amber-600">✓</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;