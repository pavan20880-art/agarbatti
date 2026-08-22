import React from 'react';
import { ArrowRight, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onExploreMachinery: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onExploreMachinery,
  onOpenConsultation
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F4EDE2] to-[#FAF6F0] pt-6 pb-12 sm:pb-16 border-b border-[#C5A059]/30">
      
      {/* Subtle Background Pattern & Ambient Lighting */}
      <div className="absolute inset-0 bg-parchment opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-br from-[#E6CA85]/20 via-[#B45309]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Text Content */}
        <div className="text-center max-w-3xl mx-auto pt-2 pb-6 sm:pb-8">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DC] border border-[#C5A059]/50 text-[#78350F] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>LUXMY AGARBATTI LIMITED</span>
          </div>

          <OrnamentalDivider className="my-2" variant="gold" />

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#4A0E17] font-bold tracking-tight leading-[1.18] drop-shadow-2xs">
            Where Indian Tradition <br />
            <span className="text-[#8C6D2D] font-normal italic">
              Meets Modern Technology
            </span>
          </h1>

          {/* Golden Lotus Motif */}
          <div className="flex justify-center my-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#B45309]">
              <path d="M12 2C13 7 16 10 20 12C16 14 13 17 12 22C11 17 8 14 4 12C8 10 11 7 12 2Z" fill="#B45309" opacity="0.85" />
            </svg>
          </div>

          {/* Subheading */}
          <p className="text-stone-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Premium incense products, trusted brands and advanced machinery solutions for your agarbatti business.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
            {/* Primary CTA: Explore Products */}
            <button
              onClick={onExploreProducts}
              className="px-6 sm:px-8 py-3 rounded-full bg-[#5B131F] hover:bg-[#430C15] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer border border-[#C5A059]/40"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Explore Machinery */}
            <button
              onClick={onExploreMachinery}
              className="px-6 sm:px-8 py-3 rounded-full bg-[#FAF6F0] hover:bg-[#EFE8DC] text-[#78350F] text-sm sm:text-base font-bold shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer border-2 border-[#C5A059]"
            >
              <span>Explore Machinery</span>
              <ArrowRight className="w-4 h-4 text-[#B45309] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Subtle CTA: Talk to a consultant */}
          <div className="mt-4">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#78350F] hover:text-[#4A0E17] font-semibold underline underline-offset-4 hover:decoration-[#B45309] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Talk to a Manufacturing Consultant →</span>
            </button>
          </div>

        </div>

        {/* Hero Visual Composition: Indian Tradition (Left) blended with Modern Automation (Right) */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl mt-4 sm:mt-6 bg-[#2B090E]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] sm:min-h-[460px] relative">
            
            {/* LEFT SIDE: Indian Incense Tradition */}
            <div className="relative overflow-hidden group min-h-[220px] lg:min-h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85"
                alt="Indian Temple & Incense Tradition"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E0C15] via-[#3E0C15]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#3E0C15]/30 lg:to-[#3E0C15]" />
              
              {/* Atmospheric Traditional Overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-xs z-10">
                <span className="px-2.5 py-1 rounded bg-[#4A0E17]/90 text-[#E6CA85] text-[11px] font-bold uppercase tracking-wider border border-[#C5A059]/40 inline-block mb-1.5 backdrop-blur-xs">
                  Tradition & Heritage
                </span>
                <p className="text-white font-serif text-lg sm:text-xl font-bold leading-tight drop-shadow-md">
                  Vedic Formulations, Pure Flora & Sacred Resins
                </p>
              </div>

              {/* Animated Incense Smoke Effect */}
              <div className="absolute bottom-16 left-12 w-16 h-32 pointer-events-none opacity-70">
                <div className="w-3 h-24 bg-gradient-to-t from-[#FAF6F0] via-white/50 to-transparent rounded-full filter blur-xs animate-smoke" />
                <div className="w-2 h-20 bg-gradient-to-t from-[#E6CA85] via-white/40 to-transparent rounded-full filter blur-xs animate-smoke-delayed -ml-1 -mt-8" />
              </div>
            </div>

            {/* RIGHT SIDE: Modern Agarbatti Machinery */}
            <div className="relative overflow-hidden group min-h-[220px] lg:min-h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                alt="Modern Agarbatti Manufacturing Machinery"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E0C15] via-[#3E0C15]/40 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-[#3E0C15]/30 lg:to-[#3E0C15]" />
              
              {/* Modern Tech Overlay */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-xs text-right z-10">
                <span className="px-2.5 py-1 rounded bg-[#B45309]/90 text-white text-[11px] font-bold uppercase tracking-wider border border-[#E6CA85]/40 inline-block mb-1.5 backdrop-blur-xs">
                  Modern Engineering
                </span>
                <p className="text-white font-serif text-lg sm:text-xl font-bold leading-tight drop-shadow-md">
                  High-Precision Automated Machinery & Scalable Output
                </p>
              </div>
            </div>

            {/* Seamless Center Golden Emblem & Blend */}
            <div className="hidden lg:flex absolute inset-y-0 left-1/2 -translate-x-1/2 w-32 items-center justify-center pointer-events-none z-20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E6CA85] to-[#B45309] border-2 border-white shadow-xl flex items-center justify-center p-3">
                <Sparkles className="w-8 h-8 text-[#4A0E17] animate-pulse" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
