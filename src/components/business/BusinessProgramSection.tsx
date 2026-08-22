import React, { useState } from 'react';
import { 
  Handshake, 
  CheckCircle2, 
  FileText, 
  Download, 
  ShieldCheck, 
  PhoneCall, 
  Briefcase, 
  TrendingUp, 
  HelpCircle,
  Clock,
  Building2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface BusinessProgramSectionProps {
  onOpenConsultation: () => void;
}

export const BusinessProgramSection: React.FC<BusinessProgramSectionProps> = ({
  onOpenConsultation
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const steps = [
    { num: '01', title: 'Consultation & Feasibility', desc: 'Discuss your targeted city, floor space, daily production goals, and capital investment.' },
    { num: '02', title: 'Requirement Assessment', desc: 'Determine the exact machine capacity (Semi vs Automatic) and power grid requirements.' },
    { num: '03', title: 'Machinery Selection', desc: 'Select verified machines directly from our engineering partners with transparent pricing.' },
    { num: '04', title: 'On-Site Setup & Training', desc: 'Technician arrives at your workshop for mechanical commissioning and 2-day worker training.' },
    { num: '05', title: 'Raw Material Supply Support', desc: 'Guaranteed supply of premium grade bamboo sticks, charcoal powder, joss powder, and scents.' },
    { num: '06', title: '3-Year Agreement Signing', desc: 'Formalize the long-term partnership with clearly defined quality metrics and terms.' },
    { num: '07', title: 'Long-Term Support & Growth', desc: 'Continuous spare parts supply, quarterly maintenance visits, and marketing assistance.' }
  ];

  const handleDownloadBrochure = () => {
    // Generate text/pdf simulation download
    const element = document.createElement('a');
    const file = new Blob([
      `LUXMY AGARBATTI LIMITED - 3-YEAR BUSINESS PARTNERSHIP PROGRAM SUMMARY\n\n` +
      `Duration: 3 Years (Renewable upon mutual consent)\n` +
      `Scope: Agarbatti & Incense Manufacturing Ecosystem Setup\n\n` +
      `1. WHAT LUXMY PROVIDES:\n` +
      `- Direct access to ISO-certified machine manufacturers\n` +
      `- Standardized raw material supply chains (Bamboo sticks, binders, fragrance blends)\n` +
      `- On-site technician deployment for installation and operator training\n` +
      `- Technical helpline and 48-hour spare parts dispatch\n` +
      `- Optional Buy-Back / Distribution channel assistance based on QC grading\n\n` +
      `2. WHAT THE ENTREPRENEUR PROVIDES:\n` +
      `- Workshop space: 100-200 sq.ft for semi-automatic machine\n` +
      `- Power: Single phase 220V or 3-Phase commercial line\n` +
      `- Manpower: 1-2 operators per machine\n` +
      `- Quality adherence to standard moisture and stick diameter specs\n\n` +
      `Contact: corporate@luxmy.in | +91 12345 67890\n` +
      `Website: www.luxmyagarbatti.in`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Luxmy-3-Year-Business-Program-Overview.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="business-program" className="w-full py-12 sm:py-16 bg-[#FAF6F0] relative border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] border border-[#C5A059]/40 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <Handshake className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Incense Industry Entrepreneurship Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4A0E17]">
            Start or Expand Your Agarbatti Business
          </h2>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-sm sm:text-base">
            From initial factory floor layout to certified machinery procurement, raw material pipelines, and long-term business arrangement agreements.
          </p>
        </div>

        {/* 7-Step Journey Visual Roadmap */}
        <div className="mb-14">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A0E17] text-center mb-6">
            The 7-Step Manufacturing Setup Journey
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-3.5 border border-[#C5A059]/35 hover:border-[#B45309] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-[#4A0E17] text-[#E6CA85] text-xs font-bold flex items-center justify-center font-display">
                      {st.num}
                    </span>
                    {idx < steps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#B45309] opacity-30 hidden md:block" />
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1917] group-hover:text-[#6B1724]">
                    {st.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Year Long-Term Business Partnership Feature Box */}
        <div className="bg-gradient-to-br from-[#4A0E17] via-[#5B131F] to-[#3E0C15] rounded-2xl p-6 sm:p-10 text-white border-2 border-[#C5A059]/50 shadow-2xl relative overflow-hidden">
          
          {/* Background Motif Accent */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-radial from-[#C5A059]/20 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Overview & Pillars */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#E6CA85]/40 text-[#E6CA85] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Formal 3-Year Business Agreement</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF6F0] leading-tight">
                Long-Term Business Partnership & Manufacturing Contract
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Luxmy believes in building lasting regional manufacturing clusters. We establish formal contractual terms that secure your supply chain and provide technical stability as your production scales.
              </p>

              {/* Terms Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-black/25 border border-[#C5A059]/30 space-y-1">
                  <p className="font-bold text-[#E6CA85] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>What Luxmy Provides:</span>
                  </p>
                  <ul className="space-y-1 text-stone-300 text-[11px] list-disc list-inside">
                    <li>Certified machinery with warranty</li>
                    <li>Guaranteed raw material supply</li>
                    <li>On-site engineer installation</li>
                    <li>Buy-back / channel assistance</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-black/25 border border-[#C5A059]/30 space-y-1">
                  <p className="font-bold text-[#E6CA85] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>What You Provide:</span>
                  </p>
                  <ul className="space-y-1 text-stone-300 text-[11px] list-disc list-inside">
                    <li>100 - 200 sq. ft workshop space</li>
                    <li>220V / 415V power connection</li>
                    <li>Dedicated machine operators</li>
                    <li>Adherence to QC stick standards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Col: Download & Action Box */}
            <div className="lg:col-span-5 bg-[#FAF6F0] text-[#1C1917] p-6 rounded-xl border border-[#C5A059] shadow-lg space-y-4">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#4A0E17]">
                Ready to Review Partnership Terms?
              </h4>
              
              <p className="text-xs text-stone-600">
                Download the complete agreement guide detailing warranty terms, raw material pricing formula, and installation logistics.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={handleDownloadBrochure}
                  className="w-full py-2.5 px-4 bg-[#EFE8DC] hover:bg-[#E5DAC8] text-[#78350F] border border-[#C5A059]/50 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#B45309]" />
                  <span>{downloadSuccess ? 'Document Downloaded!' : 'Download Agreement Information'}</span>
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 px-4 bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#E6CA85]" />
                  <span>Book Business Consultation →</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-stone-500 text-center">
                * All contractual claims are subject to mutual signing and site verification.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
