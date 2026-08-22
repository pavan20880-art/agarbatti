import React from 'react';
import { Award, ShieldCheck, Cpu, Headphones, Handshake } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const pillars = [
    {
      title: 'PREMIUM QUALITY',
      subtitle: 'Finest raw materials',
      icon: <Award className="w-5 h-5 text-[#E6CA85]" />
    },
    {
      title: 'TRUSTED BRANDS',
      subtitle: 'Leading incense brands',
      icon: <ShieldCheck className="w-5 h-5 text-[#E6CA85]" />
    },
    {
      title: 'ADVANCED MACHINERY',
      subtitle: 'High performance machines',
      icon: <Cpu className="w-5 h-5 text-[#E6CA85]" />
    },
    {
      title: 'EXPERT SUPPORT',
      subtitle: 'End to end assistance',
      icon: <Headphones className="w-5 h-5 text-[#E6CA85]" />
    },
    {
      title: 'LONG TERM PARTNERSHIP',
      subtitle: 'Grow together',
      icon: <Handshake className="w-5 h-5 text-[#E6CA85]" />
    }
  ];

  return (
    <section className="w-full bg-[#4A0E17] text-white py-6 border-y-2 border-[#C5A059]/40 mt-12 sm:mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#C5A059]/20">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-3 first:pt-0"
            >
              <div className="w-10 h-10 rounded-full bg-[#6B1724] border border-[#C5A059]/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                {item.icon}
              </div>
              <div>
                <h4 className="font-display text-xs sm:text-sm font-bold tracking-wider text-[#E6CA85]">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-white/80 font-normal mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
