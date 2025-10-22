import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService, { type CartItem } from '../services/cart.service';
import { useToast } from '../hooks/useToast';

interface ProductInfo {
  name?: string;
  brand?: string;
  price?: number;
  image?: string;
  featured_image?: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  totalPrice: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number, productInfo?: ProductInfo) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: (silent?: boolean) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Export useCart hook separately to fix fast refresh warning
const useCartHook = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { useCartHook as useCart };

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_STORAGE_KEY = 'bh_luxury_cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showSuccess } = useToast();

  // Load cart data on mount
  useEffect(() => {
    loadCart();
  }, []); // loadCart is stable as it doesn't depend on state

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0 || cartCount > 0) {
      saveCartToLocalStorage();
    }
  }, [cart, cartCount, totalPrice]); // saveCartToLocalStorage is stable

  const saveCartToLocalStorage = () => {
    const cartData = {
      cart,
      cartCount,
      totalPrice,
      timestamp: Date.now()
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  };

  const loadCartFromLocalStorage = (): boolean => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData.cart || []);
        setCartCount(cartData.cartCount || 0);
        setTotalPrice(cartData.totalPrice || 0);
        return true;
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return false;
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const loadCart = async () => {
    // Always load from localStorage first
    loadCartFromLocalStorage();
  };

  const refreshCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();

      setCart(response.data || []);
      setCartCount(response.count || response.totalItems || 0);
      setTotalPrice(response.itemsPrice || 0);
    } catch (error) {
      console.error('Error loading cart:', error);
      // Don't show error toast for initial load
      setCart([]);
      setCartCount(0);
      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1, productInfo?: ProductInfo) => {
    // Always use localStorage for cart storage
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
      setCartCount(cartCount + quantity);
      setTotalPrice(totalPrice + (updatedCart[existingItemIndex].price * quantity));
    } else {
      // Add new item - try to get product info from the calling component
      const newItem: CartItem = {
        productId,
        name: productInfo?.name || `Product ${productId}`,
        brand: productInfo?.brand,
        price: productInfo?.price || 0,
        image: productInfo?.image || productInfo?.featured_image,
        quantity,
        addedAt: new Date().toISOString()
      };
      setCart([...cart, newItem]);
      setCartCount(cartCount + quantity);
      setTotalPrice(totalPrice + (newItem.price * quantity));
    }

    showSuccess('Đã thêm vào giỏ hàng!');
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    // Always use localStorage
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      const oldQuantity = updatedCart[existingItemIndex].quantity;
      updatedCart[existingItemIndex].quantity = quantity;

      setCart(updatedCart);
      setCartCount(cartCount - oldQuantity + quantity);
      setTotalPrice(totalPrice - (updatedCart[existingItemIndex].price * oldQuantity) + (updatedCart[existingItemIndex].price * quantity));

      showSuccess('Đã cập nhật giỏ hàng!');
    }
  };

  const removeFromCart = async (productId: string) => {
    // Always use localStorage
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      const itemToRemove = cart[existingItemIndex];
      const updatedCart = cart.filter(item => item.productId !== productId);

      setCart(updatedCart);
      setCartCount(cartCount - itemToRemove.quantity);
      setTotalPrice(totalPrice - (itemToRemove.price * itemToRemove.quantity));

      showSuccess('Đã xóa khỏi giỏ hàng!');
    }
  };

  const clearCart = async (silent = false) => {
    // Always use localStorage
    setCart([]);
    setCartCount(0);
    setTotalPrice(0);
    clearLocalStorage();

    if (!silent) {
      showSuccess('Đã xóa toàn bộ giỏ hàng!');
    }
  };

  const value: CartContextType = {
    cart,
    cartCount,
    totalPrice,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};