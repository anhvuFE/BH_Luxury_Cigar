import { API_CONFIG } from '../config/api';

/**
 * Convert a stored image path or filename into a browser-ready URL.
 * Falls back to the provided placeholder when no path is available.
 */
export const resolveImageUrl = (
  imagePath?: string,
  fallback: string = '/images/default-product.svg'
): string => {
  if (!imagePath || imagePath.trim() === '') {
    return fallback;
  }

  const trimmedPath = imagePath.trim();

  if (trimmedPath.startsWith('http') || trimmedPath.startsWith('data:')) {
    return trimmedPath;
  }

  if (trimmedPath.startsWith('/uploads')) {
    return `${API_CONFIG.BASE_URL}${trimmedPath}`;
  }

  if (trimmedPath.startsWith('/')) {
    return trimmedPath;
  }

  return `${API_CONFIG.BASE_URL}/uploads/products/${trimmedPath}`;
};
