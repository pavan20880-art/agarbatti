import React from 'react';
import { ArrowRight, Flame, Cog, Handshake, Users, Sparkles } from 'lucide-react';

interface ExploreCardsProps {
  onSelectCard: (target: 'products' | 'machines' | 'business-program' | 'partners') => void;
}

export const ExploreCards: React.FC<ExploreCardsProps> = ({ onSelectCard }) => {
  const cards = [
    {
      id: 'products',
      title: 'INCENSE PRODUCTS',
      subtitle: 'A wide range of agarbatti, dhoop, karpur & more',
      cta: 'Explore Products',
      icon: <Flame className="w-6 h-6 text-[#B45309]" />,
      bgImage: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80',
      badge: 'B2C & Wholesale'
    },
    {
      id: 'machines',
      title: 'MACHINERY SOLUTIONS',
      subtitle: 'Semi automatic agarbatti making machines & more',
      cta: 'Explore Machines',
      icon: <Cog className="w-6 h-6 text-[#78350F]" />,
      bgImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      badge: 'Manufacturing Tech'
    },
    {
      id: 'business-program',
      title: 'BUSINESS PROGRAM',
      subtitle: '3+ Years partnership & business support',
      cta: 'Learn More',
      icon: <Handshake className="w-6 h-6 text-[#6B1724]" />,
      bgImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
      badge: 'Buy-Back Support'
    },
    {
      id: 'partners',
      title: 'OUR PARTNERS',
      subtitle: 'Trusted brands & machine manufacturers',
      cta: 'Meet Partners',
      icon: <Users className="w-6 h-6 text-[#8C6D2D]" />,
      bgImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
      badge: 'Verified Network'
    }
  ] as const;

  return (
    <section className="relative -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectCard(card.id)}
            className="group relative bg-[#FAF6F0] rounded-2xl p-5 sm:p-6 border-2 border-[#C5A059]/40 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Top Subtle Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFEB] via-white/80 to-[#FAF6F0] z-0" />
            
            {/* Subtle Texture Image at Bottom */}
            <div className="absolute bottom-0 inset-x-0 h-28 opacity-15 group-hover:opacity-25 transition-opacity z-0 overflow-hidden">
              <img
                src={card.bgImage}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Card Content */}
            <div className="relative z-10 space-y-3">
              {/* Icon & Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#EFE8DC] border border-[#C5A059]/50 flex items-center justify-center shadow-xs group-hover:bg-[#E6CA85]/40 transition-colors">
                  {card.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4A0E17]/10 text-[#6B1724]">
                  {card.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-display tracking-wider text-base sm:text-lg font-bold text-[#4A0E17] group-hover:text-[#6B1724] transition-colors">
                  {card.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Arrow Circle Button */}
            <div className="relative z-10 pt-4 mt-2 flex items-center justify-between border-t border-[#C5A059]/25">
              <span className="text-xs font-bold text-[#78350F] group-hover:text-[#4A0E17] transition-colors">
                {card.cta}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#EFE8DC] border border-[#C5A059] flex items-center justify-center group-hover:bg-[#6B1724] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-[#6B1724] group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Subtle Gold Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C5A059]/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};
