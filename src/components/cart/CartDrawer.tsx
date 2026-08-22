import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag,
  CheckCircle
} from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onOpenAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onOpenAuth
}) => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    subtotal, 
    tax, 
    shipping, 
    discount,
    appliedCoupon,
    total,
    totalItemsCount 
  } = useCart();

  const { isAuthenticated } = useAuth();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="relative w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl border-l-2 border-[#C5A059]/40 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#4A0E17] text-white px-5 py-4 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E6CA85]" />
            <h3 className="font-display text-sm sm:text-base font-bold tracking-wider text-[#E6CA85]">
              Your Shopping Cart ({totalItemsCount})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#EFE8DC] px-4 py-2 border-b border-[#C5A059]/30 text-xs">
          {subtotal >= 499 ? (
            <p className="text-emerald-800 font-bold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              <span>🎉 Congratulations! You unlocked Free Delivery!</span>
            </p>
          ) : (
            <p className="text-stone-700">
              Add <strong className="text-[#6B1724]">₹{499 - subtotal}</strong> more for Free Shipping!
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EFE8DC] border border-[#C5A059]/40 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-800">
                Your cart is empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our signature Mysore Sandalwood, Royal Rose, and Vedic Dhoop collections.
              </p>
              <button
                onClick={closeCart}
                className="px-5 py-2 rounded-lg bg-[#4A0E17] text-[#E6CA85] text-xs font-bold shadow hover:bg-[#5B131F] mt-2 cursor-pointer transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 border border-[#C5A059]/30 shadow-2xs flex gap-3 relative"
              >
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-lg object-cover bg-[#F4EDE2] flex-shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#78350F]">
                        {item.brand}
                      </span>
                      <h5 className="text-xs font-bold text-[#1C1917] truncate max-w-[170px]">
                        {item.name}
                      </h5>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500">
                    Size: <strong>{item.size}</strong> • {item.orderType === 'bulk' ? '📦 Bulk Tier' : '🛒 Retail'}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 rounded-md bg-[#FAF6F0]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Unit Total Price */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#4A0E17]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-400 block">
                        ₹{item.price}/each
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#C5A059]/30 space-y-3">
            
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  </span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST Tax (5%):</span>
                <span className="font-semibold text-stone-900">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery / Shipping:</span>
                <span className="font-semibold text-stone-900">
                  {shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 text-sm font-bold text-[#4A0E17]">
                <span>Grand Total:</span>
                <span className="text-base font-serif">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-[11px] text-stone-400 hover:text-rose-600 underline cursor-pointer"
              >
                Clear Cart
              </button>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 rounded-xl bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A059]/40"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#E6CA85]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Secure Checkout with Razorpay / UPI / COD</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
