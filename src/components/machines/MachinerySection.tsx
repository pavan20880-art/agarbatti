import React, { useState } from 'react';
import { Machine } from '../../types';
import { MACHINES } from '../../data/mockData';
import { 
  Cog, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Briefcase, 
  ArrowRight, 
  Check, 
  X,
  PhoneCall,
  Sliders
} from 'lucide-react';
import { MachineFinder } from './MachineFinder';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface MachinerySectionProps {
  onOpenConsultation: (machineName?: string) => void;
  initialFilter?: string;
}

export const MachinerySection: React.FC<MachinerySectionProps> = ({
  onOpenConsultation,
  initialFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter || 'All Machines');
  const [activeMachineModal, setActiveMachineModal] = useState<Machine | null>(null);

  React.useEffect(() => {
    if (initialFilter) {
      setSelectedCategory(initialFilter);
    }
  }, [initialFilter]);

  const categories = [
    'All Machines',
    'Semi-Automatic Machines',
    'Fully Automatic Machines',
    'Dhoop Cone Machines',
    'Camphor Tablet Punching'
  ];

  const filteredMachines = MACHINES.filter((m) => {
    if (selectedCategory !== 'All Machines' && m.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <section id="machines" className="w-full py-12 sm:py-16 bg-[#FAF6F0] relative border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Transition Heading: From Tradition to Technology */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] border border-[#C5A059]/40 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Industrial Engineering & Plant Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A0E17]">
            From Tradition to Technology
          </h2>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-sm sm:text-base">
            Build your high-yield agarbatti manufacturing setup with heavy-gauge semi-automatic extruders, hydraulic presses, and verified manufacturer warranties.
          </p>
        </div>

        {/* 5-Step Interactive Machine Finder Wizard */}
        <MachineFinder
          onOpenConsultation={onOpenConsultation}
          onSelectMachine={(id) => {
            const mach = MACHINES.find((m) => m.id === id);
            if (mach) setActiveMachineModal(mach);
          }}
        />

        {/* Machine Catalog Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-12 mb-6 border-b border-[#C5A059]/30 pb-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A0E17]">
              Certified Agarbatti Machinery Catalogue
            </h3>
            <p className="text-xs text-stone-500">
              Direct factory supply with installation & operator training included
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A0E17] text-[#E6CA85] shadow-xs'
                      : 'bg-[#EFE8DC] text-stone-700 hover:bg-[#E5DAC8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMachines.map((machine) => (
            <div
              key={machine.id}
              onClick={() => setActiveMachineModal(machine)}
              className="group bg-white rounded-2xl border border-[#C5A059]/40 hover:border-[#B45309] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Image & Quick Badges */}
              <div className="relative aspect-16/9 bg-[#F4EDE2] overflow-hidden">
                <img
                  src={machine.images[0]}
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="px-2.5 py-1 rounded bg-[#4A0E17] text-[#E6CA85] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {machine.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#E6CA85]" />
                  <span>Output: {machine.speedSticksPerMin}</span>
                </div>
              </div>

              {/* Machine Specs Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-semibold text-[#78350F]">{machine.manufacturer}</span>
                    <span className="font-mono">{machine.modelNumber}</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#6B1724] transition-colors line-clamp-2">
                    {machine.name}
                  </h4>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {machine.description}
                  </p>
                </div>

                {/* Key Spec Grid Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-[#FAF6F0] p-3 rounded-xl border border-[#C5A059]/25">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Capacity</span>
                    <span className="font-bold text-stone-800 text-[11px] truncate block">{machine.capacityKgPerHour}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Power Required</span>
                    <span className="font-bold text-stone-800 text-[11px] truncate block">{machine.powerHP}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Warranty</span>
                    <span className="font-bold text-emerald-800 text-[11px] truncate block">{machine.warranty}</span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-stone-500 block">Ex-Factory Price Estimate:</span>
                    <span className="text-base font-bold text-[#4A0E17]">
                      {machine.priceRange}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation(machine.name);
                      }}
                      className="px-4 py-2 bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Machine Details Modal */}
      {activeMachineModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="relative bg-[#FAF6F0] w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#4A0E17] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C5A059]/30">
              <div>
                <span className="text-[10px] text-[#E6CA85] uppercase tracking-widest font-bold font-display">
                  {activeMachineModal.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">
                  {activeMachineModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveMachineModal(null)}
                className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
              
              {/* Top Details & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-5">
                  <div className="aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-[#C5A059]/40">
                    <img
                      src={activeMachineModal.images[0]}
                      alt={activeMachineModal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-[#EFE8DC] border border-[#C5A059]/30 text-xs space-y-1">
                    <p><strong>Manufacturer:</strong> {activeMachineModal.manufacturer}</p>
                    <p><strong>Warranty:</strong> {activeMachineModal.warranty}</p>
                    <p><strong>Approx Investment:</strong> {activeMachineModal.approxInvestment}</p>
                  </div>
                </div>

                <div className="sm:col-span-7 space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#4A0E17]">
                    Engineering Overview & Applications
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {activeMachineModal.description}
                  </p>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-1.5">
                      Key Highlights & Components:
                    </h5>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {activeMachineModal.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Complete Specifications Table */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#4A0E17] mb-2 uppercase tracking-wider">
                  Technical Specifications & Utilities
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[#C5A059]/40 bg-white">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-stone-100">
                      {Object.entries(activeMachineModal.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAF6F0]' : 'bg-white'}>
                          <td className="py-2 px-3 font-semibold text-stone-600 w-1/3">{key}</td>
                          <td className="py-2 px-3 font-bold text-stone-900">{val}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-2 px-3 font-semibold text-stone-600">Installation & Training</td>
                        <td className="py-2 px-3 text-stone-800">{activeMachineModal.installationSupport}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-stone-500 block">Ex-Factory Price:</span>
                  <span className="text-lg font-serif font-bold text-[#4A0E17]">
                    {activeMachineModal.priceRange}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const name = activeMachineModal.name;
                      setActiveMachineModal(null);
                      onOpenConsultation(name);
                    }}
                    className="px-5 py-2.5 bg-[#4A0E17] hover:bg-[#5B131F] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Book Machine Consultation</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
