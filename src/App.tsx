import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileNav } from './components/common/MobileNav';

import { HeroSection } from './components/hero/HeroSection';
import { ExploreCards } from './components/hero/ExploreCards';
import { TrustBar } from './components/hero/TrustBar';

import { ProductDiscovery } from './components/products/ProductDiscovery';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { BulkOrderModal } from './components/products/BulkOrderModal';

import { MachinerySection } from './components/machines/MachinerySection';
import { MachineryPartners } from './components/machines/MachineryPartners';

import { BusinessProgramSection } from './components/business/BusinessProgramSection';
import { BrandShowcase } from './components/brands/BrandShowcase';
import { AboutSection } from './components/about/AboutSection';
import { FaqSection } from './components/about/FaqSection';

import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ConsultationModal } from './components/consultation/ConsultationModal';
import { UserDashboard } from './components/account/UserDashboard';
import { AdminPortal } from './components/account/AdminPortal';
import { AuthModal } from './components/account/AuthModal';

import { Product } from './types';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bulkProduct, setBulkProduct] = useState<Product | null>(null);
  const [consultationMachine, setConsultationMachine] = useState<string | undefined>(undefined);
  
  // Modals state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Category filter state passed to product section
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All Categories');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectExploreCard = (target: 'products' | 'machines' | 'business-program' | 'partners') => {
    if (target === 'partners') {
      scrollToSection('brands');
    } else {
      scrollToSection(target);
    }
  };

  const handleOpenConsultation = (machineName?: string) => {
    setConsultationMachine(machineName);
    setIsConsultationOpen(true);
  };

  const handleSelectBrand = (brandName: string) => {
    scrollToSection('products');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-800 flex flex-col selection:bg-[#E6CA85] selection:text-[#4A0E17]">
      
      {/* Main Header */}
      <Header
        onNavigate={scrollToSection}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenConsultation={() => handleOpenConsultation()}
        activeSection={activeSection}
      />

      <main className="flex-1 w-full pb-16 lg:pb-0">
        
        {/* 1. Immersive Hero Section */}
        <HeroSection
          onExploreProducts={() => scrollToSection('products')}
          onExploreMachinery={() => scrollToSection('machines')}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 2. Explore Luxmy 4-Card Portal */}
        <ExploreCards onSelectCard={handleSelectExploreCard} />

        {/* 3. 5-Pillar Trust & Quality Bar */}
        <TrustBar />

        {/* 4. Product Discovery Section */}
        <ProductDiscovery
          initialCategory={productCategoryFilter}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenBulkOrder={(p) => setBulkProduct(p)}
        />

        {/* 5. Machinery Solutions & 5-Step Machine Finder */}
        <MachinerySection
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 6. Machinery Partner Engineering Network */}
        <MachineryPartners
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 7. Business Program & 3-Year Agreement Section */}
        <BusinessProgramSection
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 8. Trusted Partner Brands Showcase */}
        <BrandShowcase
          onSelectBrand={handleSelectBrand}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 9. About Luxmy & Sacred Heritage Story */}
        <AboutSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav
        currentSection={activeSection}
        onNavigate={scrollToSection}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* MODALS */}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenBulkOrder={(p) => {
            setSelectedProduct(null);
            setBulkProduct(p);
          }}
          onOpenCheckoutDirect={() => {
            setSelectedProduct(null);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {/* Bulk / Wholesale Order Modal */}
      {bulkProduct && (
        <BulkOrderModal
          product={bulkProduct}
          onClose={() => setBulkProduct(null)}
        />
      )}

      {/* Machinery Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationMachine(undefined);
        }}
        prefilledMachine={consultationMachine}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Checkout & Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Customer Account Dashboard */}
      {isDashboardOpen && (
        <UserDashboard
          onClose={() => setIsDashboardOpen(false)}
          onExploreProducts={() => {
            setIsDashboardOpen(false);
            scrollToSection('products');
          }}
          onOpenAdmin={() => {
            setIsDashboardOpen(false);
            setIsAdminOpen(true);
          }}
        />
      )}

      {/* Admin Operations Portal */}
      {isAdminOpen && (
        <AdminPortal
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <MainAppContent />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
