import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../services/api';

const StoreContext = createContext();

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { symbol: '₹', rate: 83.2, label: 'INR (₹)' },
};

export const StoreProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('aestic_theme') || 'dark');

  // Currency state
  const [currency, setCurrency] = useState('USD');

  // Products & Categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  // Cart & Wishlist state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aestic_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aestic_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Modals & UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('aestic_theme', theme);
  }, [theme]);

  // Persist cart and wishlist
  useEffect(() => {
    localStorage.setItem('aestic_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aestic_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch Products & Categories from API
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      if (selectedCategory && selectedCategory !== 'all') queryParams.append('category', selectedCategory);
      if (priceRange[0] > 0) queryParams.append('minPrice', priceRange[0]);
      if (priceRange[1] < 1500) queryParams.append('maxPrice', priceRange[1]);
      if (minRating > 0) queryParams.append('rating', minRating);
      if (sortBy) queryParams.append('sort', sortBy);

      const data = await apiCall(`/products?${queryParams.toString()}`);
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products from backend:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiCall('/products/categories');
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Toast notifier
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Format currency helper
  const formatPrice = (amountInUSD) => {
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = amountInUSD * curr.rate;
    return `${curr.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    setCart((prevCart) => {
      const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
      const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Standard';

      const existingIndex = prevCart.findIndex(
        (item) => item.product._id === product._id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo code validation
  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'AESTIC10') {
      setAppliedPromo({ code: 'AESTIC10', discountPercent: 10 });
      showToast('Promo code AESTIC10 applied! 10% discount added.');
      return true;
    } else if (code.toUpperCase() === 'LUXURY20') {
      setAppliedPromo({ code: 'LUXURY20', discountPercent: 20 });
      showToast('Promo code LUXURY20 applied! 20% discount added.');
      return true;
    } else {
      showToast('Invalid promo code', 'error');
      return false;
    }
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => item._id !== product._id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  // Totals calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08; // 8% tax
  const shippingFee = cartSubtotal > 150 || cart.length === 0 ? 0 : 15.0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + estimatedTax + shippingFee);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1500]);
    setMinRating(0);
    setSortBy('newest');
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        setTheme,
        currency,
        setCurrency,
        formatPrice,
        products,
        categories,
        loadingProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        resetFilters,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cartSubtotal,
        discountAmount,
        estimatedTax,
        shippingFee,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        quickViewProduct,
        setQuickViewProduct,
        lastOrder,
        setLastOrder,
        toastMessage,
        showToast,
        fetchProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
