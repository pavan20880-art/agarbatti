import React from 'react';
import { ShieldCheck, Heart, Sparkles, Factory, Users, CheckCircle2 } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';
import { TESTIMONIALS } from '../../data/mockData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-12 sm:py-16 bg-[#FAF6F0] relative border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] border border-[#C5A059]/40 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Heritage & Engineering Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A0E17]">
            About Luxmy Agarbatti Limited
          </h2>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-sm sm:text-base">
            Dedicated to honoring the sacred botanical traditions of Indian incense while providing modern automated engineering tools for the next generation of incense manufacturers.
          </p>
        </div>

        {/* 2-Column Story: Heritage + Modern Ecosystem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#4A0E17]">
              The Bridge Between Vedic Heritage & Precision Automation
            </h3>
            
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              For centuries, the burning of agarbatti and dhoop has been central to Indian daily rituals, meditation, and temple worship. From the sandalwood groves of Karnataka to the floral gardens of Kannauj, India possesses the world’s richest aromatic botanical heritage.
            </p>

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              Yet, modern agarbatti entrepreneurs often face significant bottlenecks: inconsistent raw materials, unverified machine vendors, high maintenance downtimes, and fragmented retail channels.
            </p>

            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              <strong>Luxmy Agarbatti Limited</strong> was founded to solve this exact gap. We are not just an incense brand—we are an <em>incense-industry ecosystem partner</em> providing certified heavy machinery, standardized natural raw materials, and complete business mentoring.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/30">
                <span className="font-bold text-[#4A0E17] block">Pure Formulations</span>
                <span className="text-stone-600 text-[11px]">Charcoal-free flora bases and authentic essential oils.</span>
              </div>
              <div className="p-3 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/30">
                <span className="font-bold text-[#4A0E17] block">Empowering Makers</span>
                <span className="text-stone-600 text-[11px]">Training micro-enterprises and women self-help groups.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C5A059]/50 shadow-xl bg-[#2B090E]">
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
                alt="Luxmy Incense Craftsmanship"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs text-[#E6CA85] uppercase font-bold tracking-wider">
                    Our Mission
                  </span>
                  <p className="font-serif text-lg font-bold">
                    "Elevating Indian incense craftsmanship to global benchmarks through pure aromas and high-precision engineering."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonials from Entrepreneurs & Wholesale Partners */}
        <div className="pt-8 border-t border-[#C5A059]/30">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A0E17]">
              Voices from Our Partner Network
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Real feedback from retail stockists and manufacturing unit owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl p-5 border border-[#C5A059]/35 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-[#4A0E17]">{t.name}</h5>
                    <p className="text-[11px] text-stone-500">{t.location}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#78350F] bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#C5A059]/30">
                    {t.businessType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
