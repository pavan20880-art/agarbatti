import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShoppingCart, 
  User as UserIcon, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Cog, 
  Flame, 
  Briefcase, 
  ShieldCheck, 
  FileText, 
  Package,
  Layers,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onNavigate: (sectionId: string, extra?: any) => void;
  onOpenConsultation: (machineName?: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenDashboard: (tab?: string) => void;
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenAuth,
  onOpenDashboard,
  onOpenAdmin,
  onOpenSearch,
  currentSection
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemsCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [machinesDropdown, setMachinesDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { 
      id: 'products', 
      label: 'Products', 
      hasDropdown: true,
      subItems: [
        { label: 'Agarbatti (Incense Sticks)', category: 'Agarbatti', icon: '🪔' },
        { label: 'Dhoop Batti & Sticks', category: 'Dhoop Batti', icon: '🌿' },
        { label: 'Dhoop Cones & Backflow', category: 'Dhoop Cones', icon: '⛰️' },
        { label: 'Sambrani & Dhoop Cups', category: 'Sambrani / Dhoop Cups', icon: '🏺' },
        { label: 'Karpur / Pure Camphor', category: 'Karpur / Camphor', icon: '✨' },
        { label: 'Pooja Products & Havan', category: 'Pooja Products', icon: '🔥' },
        { label: 'View Full Incense Catalog →', category: 'All', icon: '📦' }
      ]
    },
    { id: 'brands', label: 'Brands' },
    { 
      id: 'machines', 
      label: 'Machines', 
      hasDropdown: true,
      subItems: [
        { label: 'Semi-Automatic Machines', filter: 'Semi-Automatic Machines', icon: '⚙️' },
        { label: 'Fully Automatic Machines', filter: 'Fully Automatic Machines', icon: '⚡' },
        { label: 'Dhoop Cone & Cup Machines', filter: 'Dhoop Cone Machines', icon: '🏺' },
        { label: 'Camphor Punching Machines', filter: 'Camphor Tablet Punching', icon: '💠' },
        { label: 'Machine Manufacturers Network', target: 'machine-partners', icon: '🏭' },
        { label: 'Interactive Machine Finder Tool', target: 'machine-finder', icon: '🎯' }
      ]
    },
    { id: 'business-program', label: 'Business Program' },
    { id: 'partners', label: 'Partners' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Heritage Info Strip */}
      <div className="bg-[#4A0E17] text-[#E6CA85] text-xs py-1.5 px-4 sm:px-8 border-b border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E6CA85] animate-pulse" />
              <span>Where Indian Tradition Meets Modern Technology</span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/80">3-Year Long-Term Business Agreement & Buy-Back Support</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <button
              onClick={onOpenAdmin}
              className="text-[#E6CA85] hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors"
              title="Admin Order & Inquiries Portal"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Staff Portal</span>
            </button>
            <span className="text-white/30">•</span>
            <a
              href="tel:+911234567890"
              className="flex items-center gap-1.5 text-white/90 hover:text-[#E6CA85] font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E6CA85]" />
              <span>+91 12345 67890</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#C5A059]/30' 
            : 'bg-[#FAF6F0] py-3.5 border-b border-[#C5A059]/25'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Sanskrit Tagline */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Ornate Gold Lotus Logo Emblem */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6B1724] to-[#3E0C15] border border-[#C5A059] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                {/* Stylized Lotus Petals */}
                <path d="M24 6C25.5 14 31 19 38 21C31 23 25.5 28 24 36C22.5 28 17 23 10 21C17 19 22.5 14 24 6Z" fill="#E6CA85" />
                <path d="M24 16C25 21 28 24 32 25C28 26 25 29 24 34C23 29 20 26 16 25C20 24 23 21 24 16Z" fill="#B45309" />
                <circle cx="24" cy="25" r="2.5" fill="#FAF6F0" />
                <path d="M24 38C29 38 34 40 37 43H11C14 40 19 38 24 38Z" fill="#C5A059" opacity="0.8" />
              </svg>
              <div className="absolute inset-0 rounded-full border border-[#E6CA85]/40 animate-ping opacity-20 pointer-events-none" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display tracking-[0.18em] text-xl sm:text-2xl font-extrabold text-[#4A0E17] leading-none">
                  LUXMY
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#78350F] font-semibold mt-0.5">
                AGARBATTI LIMITED
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8C6D2D] font-medium tracking-tight -mt-0.5">
                सुगंध परंपरा की, विश्वास आपका
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              
              if (item.hasDropdown) {
                const isProducts = item.id === 'products';
                const isMachines = item.id === 'machines';
                const isOpen = isProducts ? productsDropdown : machinesDropdown;
                const setOpen = isProducts ? setProductsDropdown : setMachinesDropdown;

                return (
                  <div 
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-[#6B1724] font-bold border-b-2 border-[#6B1724]'
                          : 'text-[#1C1917]/85 hover:text-[#6B1724]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 w-72 bg-[#FAF6F0] rounded-lg shadow-xl border border-[#C5A059]/40 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="py-1">
                          {item.subItems?.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setOpen(false);
                                if (isProducts) {
                                  onNavigate('products', { category: sub.category });
                                } else {
                                  if (sub.target) {
                                    onNavigate(sub.target);
                                  } else {
                                    onNavigate('machines', { filter: sub.filter });
                                  }
                                }
                              }}
                              className="w-full text-left px-3 py-2.5 rounded-md hover:bg-[#EFE8DC] transition-colors flex items-center justify-between text-xs sm:text-sm text-[#1C1917] group"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-base">{sub.icon}</span>
                                <span className="font-medium group-hover:text-[#6B1724]">{sub.label}</span>
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#6B1724] transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-[#6B1724] font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#6B1724]'
                      : 'text-[#1C1917]/85 hover:text-[#6B1724]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-[#1C1917]/80 hover:text-[#6B1724] hover:bg-[#EFE8DC] transition-colors"
              title="Search Products & Machines"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full text-[#1C1917]/80 hover:text-[#6B1724] hover:bg-[#EFE8DC] transition-colors"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-[#B45309] text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              {isAuthenticated && user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setUserDropdown(true)}
                  onMouseLeave={() => setUserDropdown(false)}
                >
                  <button
                    onClick={() => onOpenDashboard()}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE8DC] hover:bg-[#E5DAC8] text-xs font-semibold text-[#4A0E17] border border-[#C5A059]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#6B1724] text-white flex items-center justify-center text-[10px] font-bold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {user.fullName.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#6B1724]" />
                  </button>

                  {userDropdown && (
                    <div className="absolute right-0 top-full w-56 bg-[#FAF6F0] rounded-lg shadow-xl border border-[#C5A059]/40 p-2 z-50 animate-in fade-in duration-150">
                      <div className="px-3 py-2 border-b border-[#C5A059]/20">
                        <p className="text-xs font-bold text-[#4A0E17] truncate">{user.fullName}</p>
                        <p className="text-[11px] text-[#78350F] truncate">{user.email || user.phone}</p>
                        {user.businessName && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#E6CA85]/40 text-[#4A0E17] text-[10px] font-semibold rounded">
                            B2B Wholesale
                          </span>
                        )}
                      </div>
                      <div className="py-1 text-xs">
                        <button
                          onClick={() => {
                            setUserDropdown(false);
                            onOpenDashboard('overview');
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-[#EFE8DC] flex items-center gap-2 text-[#1C1917]"
                        >
                          <Layers className="w-3.5 h-3.5 text-[#6B1724]" />
                          <span>My Account Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdown(false);
                            onOpenDashboard('orders');
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-[#EFE8DC] flex items-center gap-2 text-[#1C1917]"
                        >
                          <Package className="w-3.5 h-3.5 text-[#6B1724]" />
                          <span>My Orders</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdown(false);
                            onOpenDashboard('bulk');
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-[#EFE8DC] flex items-center gap-2 text-[#1C1917]"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-[#6B1724]" />
                          <span>My Bulk Quotations</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdown(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-rose-50 text-rose-700 flex items-center gap-2 mt-1 border-t border-[#C5A059]/20"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#4A0E17] hover:bg-[#EFE8DC] border border-[#C5A059]/40 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>

            {/* Direct Phone Call Button (from reference image) */}
            <a
              href="tel:+911234567890"
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4A0E17] text-white text-xs font-bold shadow-sm hover:bg-[#5B131F] transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#E6CA85]" />
              <span>+91 12345 67890</span>
            </a>

            {/* Primary Header CTA: Book Consultation */}
            <button
              onClick={() => onOpenConsultation()}
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#B45309] to-[#D97706] text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#1C1917] hover:bg-[#EFE8DC]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] bg-black/50 z-40 backdrop-blur-sm">
          <div className="bg-[#FAF6F0] w-full max-w-sm h-full overflow-y-auto p-5 border-r border-[#C5A059]/40 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#C5A059]/30 flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#78350F] tracking-widest">
                  LUXMY NAVIGATION
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Sign In block if guest */}
              {!isAuthenticated && (
                <div className="p-3 bg-[#EFE8DC] rounded-lg border border-[#C5A059]/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#4A0E17]">Customer Portal</p>
                    <p className="text-[11px] text-stone-600">Track orders & bulk quotes</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="px-3 py-1 bg-[#6B1724] text-white text-xs font-semibold rounded-full"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.id);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold flex items-center justify-between ${
                      currentSection === item.id
                        ? 'bg-[#6B1724] text-white'
                        : 'text-[#1C1917] hover:bg-[#EFE8DC]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-[#C5A059]/30 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#B45309] to-[#D97706] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow"
              >
                <Briefcase className="w-4 h-4" />
                <span>Book Business Consultation</span>
              </button>

              <a
                href="https://wa.me/911234567890?text=Hello%20Luxmy%20Agarbatti,%20I%20am%20interested%20in%20your%20incense%20products%20and%20machinery."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
