import { useState, useEffect } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface PaginationState {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

interface PaginationControls {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotalItems: (total: number) => void;
  reset: () => void;
}

export const usePagination = (options: PaginationOptions = {}) => {
  const {
    initialPage = 1,
    initialLimit = 9
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [totalItems, setTotalItems] = useState(0);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / limit);

  // Handle page change
  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle limit change and reset to page 1
  const setLimit = (newLimit: number) => {
    setLimitState(newLimit);
    setCurrentPage(1);
  };

  // Reset pagination
  const reset = () => {
    setCurrentPage(initialPage);
    setLimitState(initialLimit);
    setTotalItems(0);
  };

  // No callback - let parent components handle pagination changes via useEffect

  const state: PaginationState = {
    currentPage,
    limit,
    totalPages,
    totalItems
  };

  const controls: PaginationControls = {
    setPage,
    setLimit,
    setTotalItems,
    reset
  };

  return {
    ...state,
    ...controls
  };
};