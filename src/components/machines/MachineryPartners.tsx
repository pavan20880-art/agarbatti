import React from 'react';
import { MACHINE_MANUFACTURERS } from '../../data/mockData';
import { Factory, ShieldCheck, Award, MapPin, ArrowRight } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface MachineryPartnersProps {
  onOpenConsultation: () => void;
}

export const MachineryPartners: React.FC<MachineryPartnersProps> = ({ onOpenConsultation }) => {
  return (
    <section id="machine-partners" className="w-full py-12 sm:py-16 bg-[#EFE8DC]/60 relative border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C5A059]/40 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Factory className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Industrial Engineering Partners</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17]">
            Our Machinery Manufacturing Network
          </h3>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-xs sm:text-sm">
            Luxmy connects you directly with ISO-certified machine engineering hubs in Coimbatore, Rajkot, Surat, and Indore with zero broker commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MACHINE_MANUFACTURERS.map((mfg) => (
            <div
              key={mfg.id}
              className="bg-white rounded-xl p-5 border border-[#C5A059]/35 hover:border-[#B45309] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/50 flex items-center justify-center font-display font-black text-[#4A0E17] text-sm">
                    {mfg.logo}
                  </div>
                  {mfg.isoCertified && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>ISO 9001</span>
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1917]">
                    {mfg.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#B45309]" />
                    <span>{mfg.location}</span>
                  </p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                    {mfg.description}
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-1 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase text-stone-400">Core Engineering:</span>
                  <div className="flex flex-wrap gap-1">
                    {mfg.specialties.map((sp, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#FAF6F0] text-stone-700 text-[10px] rounded border border-[#C5A059]/20">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  <strong>{mfg.machinesSupplied}+</strong> setups active
                </span>
                <button
                  onClick={onOpenConsultation}
                  className="text-xs font-bold text-[#6B1724] hover:text-[#4A0E17] flex items-center gap-1 group"
                >
                  <span>Connect</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
