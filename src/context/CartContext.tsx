import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    sizeOption: { size: string; sticksCount: number; price: number; bulkPrice: number },
    quantity: number,
    orderType: 'regular' | 'bulk',
    cartonCount?: number
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  couponCode: string;
  appliedCoupon: { code: string; discountPercent: number; name: string } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'luxmy_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; name: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to sync cart state', e);
    }
  }, [items]);

  const addItem = (
    product: Product,
    sizeOption: { size: string; sticksCount: number; price: number; bulkPrice: number },
    quantity: number,
    orderType: 'regular' | 'bulk',
    cartonCount?: number
  ) => {
    const unitPrice = orderType === 'bulk' ? sizeOption.bulkPrice : sizeOption.price;
    const itemUniqueKey = `${product.id}-${sizeOption.size}-${orderType}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemUniqueKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          cartonCount: cartonCount ? (updated[existingIndex].cartonCount || 0) + cartonCount : undefined
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemUniqueKey,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          fragrance: product.fragrance,
          size: sizeOption.size,
          sticksCount: sizeOption.sticksCount,
          price: unitPrice,
          quantity,
          image: product.images[0] || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
          orderType,
          cartonCount
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LUXMY10') {
      setAppliedCoupon({ code: 'LUXMY10', discountPercent: 10, name: '10% Welcome Heritage Discount' });
      setCouponCode('LUXMY10');
      return { success: true, message: 'Applied 10% Welcome Heritage Discount!' };
    }
    if (clean === 'BULK15' || clean === 'WHOLESALE') {
      setAppliedCoupon({ code: clean, discountPercent: 15, name: '15% Merchant Partner Discount' });
      setCouponCode(clean);
      return { success: true, message: 'Applied 15% Merchant Partner Discount!' };
    }
    return { success: false, message: 'Invalid coupon code. Try LUXMY10 for 10% off.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST for incense / pooja samagri
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 60;
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const total = Math.max(0, subtotal + tax + shipping - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        tax,
        shipping,
        discount,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
