import React from 'react';
import { HiChevronLeft, HiChevronRight, HiDotsHorizontal } from 'react-icons/hi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false
}) => {
  // Handle page change with scroll to top
  const handlePageChange = (page: number) => {
    onPageChange(page);
    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // Calculate items range for current page
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers for desktop (limit to avoid overflow)
  const getDesktopPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Reduced from 7 to 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Calculate middle pages around current
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if too close to start or end
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Generate mobile page numbers (simplified)
  const getMobilePageNumbers = () => {
    const pages: (number | string)[] = [];

    // For mobile, only show prev + current + next
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);

    return pages;
  };

  // Always show pagination if there are items, even with 1 page
  if (totalItems <= 0) {
    return null;
  }

  const desktopPageNumbers = getDesktopPageNumbers();
  const mobilePageNumbers = getMobilePageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      {/* Items info */}
      <div className="text-sm text-gray-600">
        Hiển thị <span className="font-medium text-gray-900">{startItem}</span> đến{' '}
        <span className="font-medium text-gray-900">{endItem}</span> trong tổng số{' '}
        <span className="font-medium text-gray-900">{totalItems}</span> sản phẩm
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          <HiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:block ml-1">Trước</span>
        </button>

        {/* Simple page numbers - Always show compact version */}
        <div className="flex">
          {/* Show first page if not in current range */}
          {currentPage > 2 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                disabled={loading}
                className="relative inline-flex items-center px-3 py-2 text-sm font-medium border bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              >
                1
              </button>
              {currentPage > 3 && (
                <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  ...
                </span>
              )}
            </>
          )}

          {/* Show previous page */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={loading}
              className="relative inline-flex items-center px-3 py-2 text-sm font-medium border bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current page */}
          <button
            disabled
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium border z-10 bg-amber-50 border-amber-500 text-amber-600"
          >
            {currentPage}
          </button>

          {/* Show next page */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={loading}
              className="relative inline-flex items-center px-3 py-2 text-sm font-medium border bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              {currentPage + 1}
            </button>
          )}

          {/* Show last page if not in current range */}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  ...
                </span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={loading}
                className="relative inline-flex items-center px-3 py-2 text-sm font-medium border bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          <span className="hidden sm:block mr-1">Sau</span>
          <HiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;