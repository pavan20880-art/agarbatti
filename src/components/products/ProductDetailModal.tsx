import React, { useState } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/mockData';
import { 
  X, 
  Star, 
  ShoppingCart, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Check, 
  Layers, 
  Package, 
  Flame, 
  Info,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onOpenBulkOrder: (p: Product) => void;
  onOpenCheckoutDirect?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  onOpenBulkOrder,
  onOpenCheckoutDirect
}) => {
  if (!product) return null;

  const { addItem, openCart } = useCart();
  const { isProductSaved, toggleSaveProduct } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [orderMode, setOrderMode] = useState<'regular' | 'bulk'>('regular');
  const [addedNotice, setAddedNotice] = useState(false);

  const activeSize = product.sizeOptions[selectedSizeIndex] || {
    size: 'Standard',
    sticksCount: 80,
    price: product.price,
    bulkPrice: product.bulkPrice
  };

  const isSaved = isProductSaved(product.id);

  const unitPrice = orderMode === 'bulk' ? activeSize.bulkPrice : activeSize.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, activeSize, quantity, orderMode);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, activeSize, quantity, orderMode);
    onClose();
    if (onOpenCheckoutDirect) {
      onOpenCheckoutDirect();
    } else {
      openCart();
    }
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.fragrance === product.fragrance)
  ).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Luxmy Agarbatti Limited,\nI am interested in buying:\n- Product: ${product.name}\n- Size: ${activeSize.size}\n- Quantity: ${quantity} units\n- Mode: ${orderMode.toUpperCase()}\nPlease share final quotation and availability.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-4xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Ornate Header Bar */}
        <div className="bg-[#4A0E17] text-white px-5 py-3 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <span className="text-[#E6CA85] text-xs uppercase font-bold tracking-widest font-display">
              {product.brand}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-white/80">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F4EDE2] border border-[#C5A059]/40 shadow-sm">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Save Product Heart */}
                <button
                  onClick={() => toggleSaveProduct(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-md text-stone-700 hover:text-rose-600 transition-colors"
                  title="Save to Favorites"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                {/* Charcoal free / organic tag */}
                {product.isOrganic && (
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 text-[10px] font-bold uppercase tracking-wider">
                    100% Charcoal Free
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#B45309] shadow-sm scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Fragrance Notes Box */}
              <div className="bg-[#EFE8DC]/90 p-3.5 rounded-xl border border-[#C5A059]/30 text-xs space-y-2">
                <p className="font-bold text-[#4A0E17] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Fragrance Notes Pyramid</span>
                </p>
                <div className="space-y-1 text-stone-700">
                  <p><strong className="text-[#78350F]">Top:</strong> {product.fragranceNotes.top}</p>
                  <p><strong className="text-[#78350F]">Heart:</strong> {product.fragranceNotes.heart}</p>
                  <p><strong className="text-[#78350F]">Base:</strong> {product.fragranceNotes.base}</p>
                </div>
              </div>

            </div>

            {/* Right Column: Product Specs, Size Selector & Ordering */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider">
                    Fragrance: {product.fragrance}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-stone-800">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount} verified reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4A0E17] mt-1">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-xs sm:text-sm text-[#8C6D2D] font-medium">
                    {product.hindiName}
                  </p>
                )}
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Order Mode Selector: Regular vs Wholesale Bulk */}
              <div className="p-3 bg-white rounded-xl border border-[#C5A059]/40 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  Select Order Type:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setOrderMode('regular');
                      setQuantity(1);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-left transition-all border ${
                      orderMode === 'regular'
                        ? 'bg-[#4A0E17] text-white border-[#4A0E17] shadow-xs'
                        : 'bg-[#FAF6F0] text-stone-700 border-[#C5A059]/30 hover:bg-[#EFE8DC]'
                    }`}
                  >
                    <p className="font-bold">🛒 Regular Order</p>
                    <p className="text-[10px] font-normal opacity-90">Personal & small pooja quantities</p>
                  </button>

                  <button
                    onClick={() => {
                      setOrderMode('bulk');
                      setQuantity(product.bulkMinQty);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-left transition-all border ${
                      orderMode === 'bulk'
                        ? 'bg-[#B45309] text-white border-[#B45309] shadow-xs'
                        : 'bg-[#FAF6F0] text-stone-700 border-[#C5A059]/30 hover:bg-[#EFE8DC]'
                    }`}
                  >
                    <p className="font-bold">📦 Bulk / Wholesale</p>
                    <p className="text-[10px] font-normal opacity-90">Min. {product.bulkMinQty} units (Save up to 40%)</p>
                  </button>
                </div>
              </div>

              {/* Size & Packaging Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Available Packaging & Pack Sizes:</span>
                  <span className="text-[11px] font-normal text-stone-500">Burning: {product.burningTime}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {product.sizeOptions.map((opt, idx) => {
                    const isSelected = selectedSizeIndex === idx;
                    const displayPrice = orderMode === 'bulk' ? opt.bulkPrice : opt.price;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-2.5 rounded-lg text-left transition-all border ${
                          isSelected
                            ? 'bg-[#EFE8DC] border-[#B45309] shadow-xs ring-1 ring-[#B45309]'
                            : 'bg-white border-stone-200 hover:border-[#C5A059]'
                        }`}
                      >
                        <p className="text-xs font-bold text-stone-800">{opt.size}</p>
                        <p className="text-[11px] text-stone-500">{opt.sticksCount} sticks approx</p>
                        <p className="text-xs font-extrabold text-[#4A0E17] mt-1">
                          ₹{displayPrice} <span className="text-[10px] font-normal text-stone-500">/ unit</span>
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector & Price Breakdown */}
              <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-[#C5A059]/50 rounded-lg bg-white overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(orderMode === 'bulk' ? product.bulkMinQty : 1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:bg-[#EFE8DC] font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-stone-900 min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-[#EFE8DC] font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Total Amount:</span>
                  <span className="text-xl font-serif font-bold text-[#4A0E17]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-400 block">+ 5% GST calculated at checkout</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Buy Now / Direct Checkout */}
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buy Now →</span>
                </button>
              </div>

              {/* Bulk Quotation & WhatsApp Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 text-xs">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBulkOrder(product);
                  }}
                  className="text-[#78350F] hover:text-[#4A0E17] font-semibold underline flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Request Custom Bulk Quotation Form →</span>
                </button>

                <a
                  href={`https://wa.me/911234567890?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-[#1ebd5a] font-bold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Enquiry</span>
                </a>
              </div>

            </div>

          </div>

          {/* You May Also Like Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-[#C5A059]/30">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#4A0E17] mb-3">
                You May Also Like (Recommended Pairings)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedSizeIndex(0);
                      setSelectedImageIndex(0);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-[#C5A059]/30 hover:border-[#B45309] flex items-center gap-3 cursor-pointer shadow-2xs hover:shadow-xs transition-all"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-800 truncate">{rel.name}</p>
                      <p className="text-[11px] text-[#78350F]">{rel.fragrance}</p>
                      <p className="text-xs font-bold text-[#4A0E17]">₹{rel.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
