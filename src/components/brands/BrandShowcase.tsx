import React from 'react';
import { BrandPartner } from '../../types';
import { BRAND_PARTNERS } from '../../data/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Award, HeartHandshake, MapPin } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface BrandShowcaseProps {
  onSelectBrand: (brandName: string) => void;
  onOpenConsultation: () => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  onSelectBrand,
  onOpenConsultation
}) => {
  const brandImages: Record<string, string> = {
    'brand-luxmy-signature': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    'brand-haridarshan': 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    'brand-ullas': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    'brand-mangaldeep': 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
    'brand-cycle-heritage': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
  };

  return (
    <section id="brands" className="w-full py-12 sm:py-16 bg-[#FAF6F0] relative border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] border border-[#C5A059]/40 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Curated Incense Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A0E17]">
            Trusted Partner Brands
          </h2>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-sm sm:text-base">
            Discover iconic Indian incense houses trusted across millions of households and temples for authentic fragrance notes and pure burning experience.
          </p>
        </div>

        {/* Featured Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BRAND_PARTNERS.slice(0, 3).map((brand) => (
            <div
              key={brand.id}
              className="group bg-white rounded-2xl border-2 border-[#C5A059]/35 hover:border-[#B45309] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Banner / Image */}
              <div className="relative h-44 bg-[#F4EDE2] overflow-hidden">
                <img
                  src={brandImages[brand.id] || brandImages['brand-luxmy-signature']}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Brand Logo & Name */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6CA85] block">
                      Est. {brand.established}
                    </span>
                    <h3 className="font-serif text-xl font-bold tracking-tight">
                      {brand.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-xs p-1.5 border border-[#C5A059] flex items-center justify-center font-display font-black text-[#4A0E17] text-xs text-center shadow">
                    {brand.logo}
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#78350F] italic mb-1.5">
                    "{brand.tagline}"
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {brand.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-2">
                    <MapPin className="w-3 h-3 text-[#B45309]" />
                    <span>{brand.location}</span>
                  </div>

                  {/* Highlights */}
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1.5">
                      Signature Categories:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.productCategories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-[#FAF6F0] border border-[#C5A059]/30 text-stone-700 text-[11px] font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <button
                    onClick={() => onSelectBrand(brand.name)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Explore {brand.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-2 text-[11px] font-bold text-stone-600 hover:text-[#4A0E17] text-center block transition-colors"
                  >
                    Enquire for Brand Distributorship / Dealership →
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Partnership Banner */}
        <div className="mt-12 bg-[#EFE8DC] rounded-xl p-6 border border-[#C5A059]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-[#B45309] flex-shrink-0" />
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#4A0E17]">
                Are You an Established Incense Brand or Manufacturer?
              </h4>
              <p className="text-xs text-stone-600">
                List your certified product catalog or machinery models on the Luxmy national network.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2 bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs font-bold rounded-lg shadow cursor-pointer"
          >
            Apply for Brand Partnership
          </button>
        </div>

      </div>
    </section>
  );
};
