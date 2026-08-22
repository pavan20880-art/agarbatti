import React, { useState } from 'react';
import { 
  Target, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  Cog, 
  TrendingUp, 
  ShieldCheck, 
  Factory,
  Layers
} from 'lucide-react';
import { MACHINES } from '../../data/mockData';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface MachineFinderProps {
  onOpenConsultation: (machineName?: string) => void;
  onSelectMachine: (machineId: string) => void;
}

export const MachineFinder: React.FC<MachineFinderProps> = ({
  onOpenConsultation,
  onSelectMachine
}) => {
  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState('Agarbatti');
  const [scale, setScale] = useState('Small (30-50 kg/day)');
  const [budget, setBudget] = useState('Under ₹5 lakh');
  const [locationState, setLocationState] = useState('Gujarat');
  const [locationCity, setLocationCity] = useState('Ahmedabad');
  const [experience, setExperience] = useState('No previous experience (First time setup)');

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Matched machine based on selections
  const recommendedMachine = MACHINES[0]; // SpeedMaster-400 or TurboMax-650

  return (
    <div id="machine-finder" className="w-full bg-gradient-to-br from-[#FAF6F0] to-[#EFE8DC] p-5 sm:p-8 rounded-2xl border-2 border-[#C5A059]/40 shadow-xl my-8">
      
      {/* Wizard Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6CA85]/30 border border-[#C5A059]/50 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
          <Target className="w-3.5 h-3.5 text-[#B45309]" />
          <span>Interactive Machinery Recommendation Wizard</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E17]">
          Find Your Agarbatti Manufacturing Setup
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Answer 5 quick questions to calculate your ideal machine category, power setup, and investment feasibility.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-[#B45309] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {[1, 2, 3, 4, 5].map((s) => {
            const isCompleted = step > s;
            const isCurrent = step === s;
            return (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-[#4A0E17] text-[#E6CA85]'
                      : isCurrent
                      ? 'bg-[#B45309] text-white ring-4 ring-[#E6CA85]/50 scale-110'
                      : 'bg-white text-stone-400 border border-stone-300'
                  }`}
                >
                  {isCompleted ? '✓' : s}
                </div>
                <span className="text-[10px] font-semibold text-stone-500 mt-1 hidden sm:block">
                  Step {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="max-w-xl mx-auto bg-white rounded-xl p-5 sm:p-7 border border-[#C5A059]/35 shadow-sm min-h-[280px] flex flex-col justify-between">
        
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider">Step 1 of 5</span>
              <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                What product do you plan to manufacture?
              </h4>
              <p className="text-xs text-stone-500">Select your primary production focus:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Agarbatti (Incense Sticks)', desc: '8" & 9" standard bamboo sticks', icon: '🪔' },
                { label: 'Dhoop Batti & Sticks', desc: 'Charcoal-free round & dry dhoop', icon: '🌿' },
                { label: 'Dhoop Cones & Backflow', desc: 'Hydraulic high density cones', icon: '⛰️' },
                { label: 'Sambrani / Dhoop Cups', desc: 'Resin filled ritual cups', icon: '🏺' },
                { label: 'Camphor / Karpur Tablets', desc: 'Rotary compressed tablets', icon: '✨' },
                { label: 'Multi-Product Integrated Unit', desc: 'Agarbatti + Dhoop combo setup', icon: '🏭' }
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setProductType(opt.label)}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    productType === opt.label
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/30 text-[#4A0E17]'
                      : 'border-stone-200 hover:border-[#C5A059] text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-xs font-bold">{opt.label}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 pl-7">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider">Step 2 of 5</span>
              <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                What daily production scale are you targeting?
              </h4>
              <p className="text-xs text-stone-500">Based on an 8-hour single shift:</p>
            </div>

            <div className="space-y-2.5">
              {[
                { val: 'Small (30-50 kg/day)', desc: 'Ideal for home setup / micro enterprise (1 machine, 1 operator)' },
                { val: 'Medium (100-200 kg/day)', desc: 'High-output semi-automatic or 2-machine cluster' },
                { val: 'Large (500+ kg/day)', desc: 'Commercial automated lines with high-speed dryers' },
                { val: 'Commercial / Export (1+ Ton/day)', desc: 'Full factory turnkey automated conveyor system' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setScale(opt.val)}
                  className={`w-full p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    scale === opt.val
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/30'
                      : 'border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <p className="text-xs font-bold text-[#4A0E17]">{opt.val}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider">Step 3 of 5</span>
              <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                What is your approximate investment budget?
              </h4>
              <p className="text-xs text-stone-500">Includes machine cost, raw materials, and initial working capital:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { val: 'Under ₹5 lakh', badge: 'Entry-Level' },
                { val: '₹5 – 10 lakh', badge: 'Growth Unit' },
                { val: '₹10 – 25 lakh', badge: 'Commercial' },
                { val: '₹25 lakh+', badge: 'Industrial Plant' },
                { val: 'Not sure (Need guidance)', badge: 'Consultation' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setBudget(opt.val)}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    budget === opt.val
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/30'
                      : 'border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#B45309]">{opt.badge}</span>
                  <p className="text-xs font-bold text-stone-800 mt-0.5">{opt.val}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider">Step 4 of 5</span>
              <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                Where will your manufacturing unit operate?
              </h4>
              <p className="text-xs text-stone-500">Helps us assign nearby technical engineers for installation:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">State:</label>
                <input
                  type="text"
                  value={locationState}
                  onChange={(e) => setLocationState(e.target.value)}
                  placeholder="e.g. Gujarat, Karnataka, UP, MP"
                  className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#C5A059]/50 rounded-lg text-stone-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">City / District:</label>
                <input
                  type="text"
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  placeholder="e.g. Ahmedabad, Bengaluru, Varanasi"
                  className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#C5A059]/50 rounded-lg text-stone-800 font-semibold"
                />
              </div>
            </div>

            <div className="p-3 bg-[#EFE8DC] rounded-lg text-xs text-stone-600 border border-[#C5A059]/30">
              <span className="font-bold text-[#4A0E17]">Engineer Network:</span> Luxmy certified technicians provide on-site setup across all major industrial clusters in India.
            </div>
          </div>
        )}

        {/* STEP 5 (Recommendation & Summary) */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recommended Manufacturing Path</span>
              </span>
              <h4 className="font-serif text-lg font-bold text-[#4A0E17] mt-0.5">
                Your Recommended Next Step
              </h4>
              <p className="text-xs text-stone-600">
                Based on your requirements for <strong>{productType}</strong> at <strong>{scale}</strong> with budget <strong>{budget}</strong> in <strong>{locationCity}, {locationState}</strong>:
              </p>
            </div>

            {/* Recommended Machinery Card */}
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#B45309]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#78350F]">{recommendedMachine.manufacturer}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#6B1724] text-white rounded">
                  Best Fit Model
                </span>
              </div>
              <p className="text-xs font-bold text-[#4A0E17]">{recommendedMachine.name}</p>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-1 border-t border-[#C5A059]/20">
                <div>• Capacity: {recommendedMachine.capacityKgPerHour}</div>
                <div>• Power: {recommendedMachine.powerHP}</div>
                <div>• Manpower: {recommendedMachine.requiredManpower}</div>
                <div>• Warranty: {recommendedMachine.warranty}</div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 italic">
              * Note: Machine suitability depends on local raw material grading and power availability. We recommend discussing directly with a Luxmy technical consultant.
            </p>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenConsultation(recommendedMachine.name)}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#B45309] to-[#D97706] hover:opacity-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Book Feasibility Consultation →</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
