import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HiOutlineShoppingBag,
  HiOutlineShare,
  HiMinus,
  HiPlus
} from 'react-icons/hi';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/useToast';
import { resolveImageUrl } from '../utils/image';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const { addToCart, loading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Fetch product data (hooks must be called before any returns)
  // Don't fetch if ID is invalid or undefined
  const shouldFetch = id && id.trim() !== '' && id !== 'undefined';
  const { product, loading, error } = useProduct(shouldFetch ? id : '__skip__', false);

  useEffect(() => {
    if (error && !loading) {
      showError('Không thể tải thông tin sản phẩm');
    }
  }, [error, loading, showError]);

  // Reset image errors when product changes
  useEffect(() => {
    setImageErrors(new Set());
  }, [product]);

  // Early return if no ID or invalid ID
  if (!shouldFetch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-4xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ID sản phẩm không hợp lệ</h2>
          <p className="text-gray-600 mb-6">Không thể tải thông tin sản phẩm với ID này.</p>
          <button
            onClick={() => navigate('/collections')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }


  // Add to cart
  const handleAddToCart = async () => {
    if (!product || !product.id) return;
    await addToCart(product.id, quantity, product);
  };


  // Share product
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Đã sao chép link sản phẩm!');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getProductImages = () => {
    if (!product) return [];

    const images = [];
    if (product.images && product.images.length > 0) {
      images.push(...product.images);
    } else if (product.image) {
      images.push(product.image);
    } else if (product.featured_image) {
      images.push(product.featured_image);
    }

    if (images.length === 0) {
      return ['/assets/images/placeholder.png'];
    }

    return images.map((img) => resolveImageUrl(img, '/assets/images/placeholder.png'));
  };

  const productImages = getProductImages();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-4xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={() => navigate('/collections')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Quay lại danh sách sản phẩm
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.inStock === false || (product.stock !== undefined && product.stock <= 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-amber-600"
              >
                Trang chủ
              </button>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <button
                onClick={() => navigate('/collections')}
                className="text-gray-500 hover:text-amber-600"
              >
                Sản phẩm
              </button>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={imageErrors.has(selectedImageIndex) ? '/assets/images/placeholder.png' : productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={() => {
                  if (!imageErrors.has(selectedImageIndex)) {
                    setImageErrors(prev => new Set([...prev, selectedImageIndex]));
                  }
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-amber-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={imageErrors.has(index) ? '/assets/images/placeholder.png' : image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain bg-gray-50"
                      onError={() => {
                        if (!imageErrors.has(index)) {
                          setImageErrors(prev => new Set([...prev, index]));
                        }
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col space-y-6 lg:h-full">
            <div className="flex-1 space-y-6">
              {/* Brand */}
              {product.brand && (
                <div className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200/50 rounded-full text-sm font-medium">
                  {product.brand}
                </div>
              )}

              {/* Product Name & Description */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                {product.description && (
                  <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
                )}
              </div>

              {/* Price & Stock Section */}
              <div className="flex items-center justify-between py-4 border-y border-gray-100">
                {/* Price */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.compare_price && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.compare_price)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  isOutOfStock
                    ? 'bg-red-50 text-red-600'
                    : 'bg-green-50 text-green-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    isOutOfStock ? 'bg-red-400' : 'bg-green-400'
                  }`}></div>
                  {isOutOfStock ? 'Hết hàng' : 'Còn hàng'}
                  {product.stock !== undefined && !isOutOfStock && (
                    <span className="ml-1">({product.stock})</span>
                  )}
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Thông số kỹ thuật</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="text-gray-500 capitalize text-sm">{key}:</span>
                        <span className="text-gray-900 font-medium text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Section - Always at bottom */}
            <div className="mt-auto space-y-4">
              {!isOutOfStock ? (
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Số lượng:</label>
                    <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <HiMinus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2.5 font-medium text-base min-w-[60px] text-center border-x border-gray-200">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2.5 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        disabled={product.stock !== undefined && quantity >= product.stock}
                      >
                        <HiPlus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <HiOutlineShoppingBag className="w-5 h-5" />
                    <span>{cartLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}</span>
                  </button>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <div className="text-red-600 font-medium mb-1">Sản phẩm hết hàng</div>
                  <p className="text-red-500 text-sm">Vui lòng liên hệ để được tư vấn thêm</p>
                </div>
              )}

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center space-x-2 py-2.5 text-gray-500 hover:text-amber-600 transition-colors border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50/50"
              >
                <HiOutlineShare className="w-4 h-4" />
                <span className="text-sm">Chia sẻ sản phẩm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
