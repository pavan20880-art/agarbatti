import React from 'react';
import { Home, Package, Cog, ShoppingCart, MessageCircle, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface MobileNavProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentSection,
  onNavigate,
  onOpenDashboard,
  onOpenAuth
}) => {
  const { totalItemsCount, openCart } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#C5A059]/40 shadow-lg py-1 px-2">
      <div className="flex items-center justify-around text-[10px] font-semibold text-stone-700">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center p-1.5 transition-colors ${
            currentSection === 'home' ? 'text-[#6B1724]' : 'text-stone-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Products */}
        <button
          onClick={() => onNavigate('products')}
          className={`flex flex-col items-center p-1.5 transition-colors ${
            currentSection === 'products' ? 'text-[#6B1724]' : 'text-stone-600'
          }`}
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span>Products</span>
        </button>

        {/* Machines */}
        <button
          onClick={() => onNavigate('machines')}
          className={`flex flex-col items-center p-1.5 transition-colors ${
            currentSection === 'machines' ? 'text-[#6B1724]' : 'text-stone-600'
          }`}
        >
          <Cog className="w-5 h-5 mb-0.5" />
          <span>Machines</span>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center p-1.5 text-stone-600 hover:text-[#6B1724]"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#B45309] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* WhatsApp or Account */}
        {isAuthenticated ? (
          <button
            onClick={onOpenDashboard}
            className={`flex flex-col items-center p-1.5 transition-colors ${
              currentSection === 'account' ? 'text-[#6B1724]' : 'text-stone-600'
            }`}
          >
            <User className="w-5 h-5 mb-0.5 text-[#6B1724]" />
            <span>Account</span>
          </button>
        ) : (
          <a
            href="https://wa.me/911234567890?text=Hello%20Luxmy%20Agarbatti,%20I%20am%20interested%20in%20your%20incense%20and%20machinery."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-1.5 text-[#25D366]"
          >
            <MessageCircle className="w-5 h-5 mb-0.5" />
            <span>WhatsApp</span>
          </a>
        )}

      </div>
    </div>
  );
};
