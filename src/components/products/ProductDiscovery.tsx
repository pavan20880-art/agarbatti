import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/mockData';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Flame, 
  ShoppingCart, 
  MessageCircle, 
  Eye, 
  Star, 
  Check, 
  Layers,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface ProductDiscoveryProps {
  onSelectProduct: (product: Product) => void;
  onOpenBulkOrder: (product: Product) => void;
  initialCategory?: string;
}

const FRAGRANCES = [
  'All Fragrances',
  'Sandalwood',
  'Rose',
  'Mogra',
  'Jasmine',
  'Oudh',
  'Lavender',
  'Sambrani',
  'Natural Herbal'
] as const;

const CATEGORIES = [
  'All Categories',
  'Agarbatti',
  'Dhoop Batti',
  'Dhoop Cones',
  'Sambrani / Dhoop Cups',
  'Karpur / Camphor',
  'Pooja Products'
] as const;

const BRANDS = [
  'All Brands',
  'Luxmy Signature',
  'Haridarshan',
  'Ullas Agarbatti'
] as const;

export const ProductDiscovery: React.FC<ProductDiscoveryProps> = ({
  onSelectProduct,
  onOpenBulkOrder,
  initialCategory
}) => {
  const { addItem } = useCart();
  const [selectedFragrance, setSelectedFragrance] = useState<string>('All Fragrances');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All Categories');
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Sync if initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory === 'All' ? 'All Categories' : initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Fragrance filter
      if (selectedFragrance !== 'All Fragrances' && p.fragrance !== selectedFragrance) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All Brands' && p.brand !== selectedBrand) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchFrag = p.fragrance.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchHindi = p.hindiName ? p.hindiName.toLowerCase().includes(q) : false;
        if (!matchName && !matchDesc && !matchFrag && !matchBrand && !matchHindi) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedFragrance, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizeOptions[0] || {
      size: 'Standard Pack',
      sticksCount: 80,
      price: product.price,
      bulkPrice: product.bulkPrice
    };
    addItem(product, defaultSize, 1, 'regular');
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  return (
    <section id="products" className="w-full py-12 sm:py-16 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DC] border border-[#C5A059]/40 text-[#78350F] text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Fragrance & Incense Catalog</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A0E17]">
            Discover Your Fragrance
          </h2>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-sm sm:text-base">
            Explore pure Mysore sandalwood, temple mogra, Himalayan loban, and organic karpur crafted with traditional Indian incense heritage.
          </p>
        </div>

        {/* Fragrance Filter Chips Bar */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Filter by Fragrance Note:</span>
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FRAGRANCES.map((frag) => {
              const isSelected = selectedFragrance === frag;
              return (
                <button
                  key={frag}
                  onClick={() => setSelectedFragrance(frag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#6B1724] text-white border-[#4A0E17] shadow-sm scale-105'
                      : 'bg-[#FAF6F0] text-stone-700 border-[#C5A059]/40 hover:bg-[#EFE8DC] hover:text-[#4A0E17]'
                  }`}
                >
                  {frag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Tabs & Search/Sort Bar */}
        <div className="bg-[#EFE8DC]/80 p-4 rounded-xl border border-[#C5A059]/30 mb-8 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A0E17] text-[#E6CA85] font-bold shadow-xs'
                      : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#4A0E17]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search, Brand Filter & Sorting Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-[#C5A059]/20">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, fragrance, brand or keyword..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#B45309]/50 text-stone-800 placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm bg-white rounded-lg border border-[#C5A059]/40 text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full py-2 pl-3 pr-8 text-xs sm:text-sm bg-white rounded-lg border border-[#C5A059]/40 text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#B45309]/50"
                >
                  <option value="featured">Sort: Featured & Bestsellers</option>
                  <option value="rating">Sort: Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <span>Showing <strong>{filteredProducts.length}</strong> premium incense items</span>
          {(selectedFragrance !== 'All Fragrances' || selectedCategory !== 'All Categories' || selectedBrand !== 'All Brands' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedFragrance('All Fragrances');
                setSelectedCategory('All Categories');
                setSelectedBrand('All Brands');
                setSearchQuery('');
              }}
              className="text-[#6B1724] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-[#C5A059]/30 max-w-lg mx-auto">
            <Flame className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No incense products found</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 mb-4">
              Try adjusting your fragrance or category filters to explore our complete collection.
            </p>
            <button
              onClick={() => {
                setSelectedFragrance('All Fragrances');
                setSelectedCategory('All Categories');
                setSelectedBrand('All Brands');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#6B1724] text-white text-xs font-bold rounded-lg"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedAnimationId === product.id;
              
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-xl overflow-hidden border border-[#C5A059]/35 hover:border-[#B45309] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-4/3 bg-[#F4EDE2] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      {product.isBestseller && (
                        <span className="px-2 py-0.5 rounded bg-[#4A0E17] text-[#E6CA85] text-[10px] font-bold tracking-wider uppercase shadow-xs">
                          Bestseller
                        </span>
                      )}
                      {product.isOrganic && (
                        <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                          Charcoal Free
                        </span>
                      )}
                    </div>

                    {/* Fragrance Tag */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#E6CA85]" />
                        <span>{product.fragrance}</span>
                      </span>
                    </div>

                    {/* Quick View Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#4A0E17] text-xs font-bold shadow-md flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    
                    <div>
                      {/* Brand & Category */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium mb-1">
                        <span className="text-[#78350F] font-semibold">{product.brand}</span>
                        <span>{product.category}</span>
                      </div>

                      {/* Name & Hindi Name */}
                      <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] group-hover:text-[#6B1724] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      {product.hindiName && (
                        <p className="text-[11px] text-[#8C6D2D] font-medium mt-0.5">
                          {product.hindiName}
                        </p>
                      )}

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                        <div className="flex items-center text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold ml-1 text-stone-800">{product.rating}</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">({product.reviewsCount})</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-[11px] text-stone-500">{product.burningTime}</span>
                      </div>
                    </div>

                    {/* Pricing & Bulk Indicator */}
                    <div className="pt-2 border-t border-stone-100">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-stone-500 font-medium">Regular: </span>
                          <span className="text-base sm:text-lg font-bold text-[#4A0E17]">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-stone-400 line-through ml-1.5">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                          In Stock
                        </span>
                      </div>

                      {/* Wholesale Bulk Tier Banner */}
                      <div className="mt-1.5 py-1 px-2 rounded bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center justify-between text-[11px]">
                        <span className="text-[#78350F] font-semibold flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#B45309]" />
                          <span>Bulk Wholesale:</span>
                        </span>
                        <span className="font-bold text-[#4A0E17]">
                          ₹{product.bulkPrice} <span className="text-[10px] font-normal text-stone-500">({product.bulkMinQty}+)</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#6B1724] hover:bg-[#4A0E17] text-white shadow-2xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      {/* Bulk Order Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBulkOrder(product);
                        }}
                        className="w-full py-2 rounded-lg text-xs font-bold bg-[#EFE8DC] hover:bg-[#E5DAC8] text-[#78350F] border border-[#C5A059]/40 flex items-center justify-center gap-1 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>Bulk Quote</span>
                      </button>

                    </div>

                    {/* Direct WhatsApp Enquiry Quick Button */}
                    <a
                      href={`https://wa.me/911234567890?text=Hello%20Luxmy,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-center text-[#25D366] hover:text-[#1ebd5a] font-semibold flex items-center justify-center gap-1 pt-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp Enquiry</span>
                    </a>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
