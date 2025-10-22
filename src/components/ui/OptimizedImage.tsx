import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    if (onError) {
      onError(e);
    } else {
      // Default fallback
      const target = e.target as HTMLImageElement;
      target.src = '/src/assets/images/placeholder.png';
    }
  };

  // Generate responsive srcSet for different sizes
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('placeholder')) return undefined;

    // For external URLs, return as-is
    if (baseSrc.startsWith('http')) return undefined;

    // For local images, we could implement different sizes
    return undefined;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          ...(width && height && { aspectRatio: `${width}/${height}` })
        }}
      />
    </div>
  );
};

export default OptimizedImage;