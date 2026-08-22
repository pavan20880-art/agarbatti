import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Heart, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { OrnamentalDivider } from './OrnamentalDivider';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="w-full bg-[#2B090E] text-stone-300 pt-16 pb-20 lg:pb-12 border-t-2 border-[#C5A059]/40 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-parchment opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-[#C5A059]/20">
          
          {/* Col 1: Brand & Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6CA85] to-[#B45309] border border-white flex items-center justify-center p-2 shadow-md">
                <Sparkles className="w-5 h-5 text-[#4A0E17]" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E6CA85] tracking-wide">
                  LUXMY AGARBATTI LIMITED
                </h3>
                <p className="text-[10px] text-white/60 tracking-widest uppercase">
                  Where Indian Tradition Meets Modern Technology
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              An Indian incense-industry ecosystem connecting sacred Vedic aromatic traditions with precision automated manufacturing machinery and sustainable long-term enterprise programs.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-[#3E0C15] border border-[#C5A059]/30 text-[#E6CA85] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>ISO 9001 Certified Network</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#3E0C15] border border-[#C5A059]/30 text-[#E6CA85] font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>100% Charcoal-Free Lines</span>
              </span>
            </div>

            <div className="pt-2 text-xs space-y-1.5 text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E6CA85] flex-shrink-0 mt-0.5" />
                <span><strong>Corporate Office:</strong> GIDC Industrial Estate, Phase 2, Vatva, Ahmedabad, Gujarat - 382445</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E6CA85] flex-shrink-0" />
                <span>Helpline Hours: Mon – Sat: 09:00 AM – 07:00 PM IST</span>
              </p>
            </div>
          </div>

          {/* Col 2: Incense Products */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#E6CA85] uppercase tracking-wider">
              Incense Catalog
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Mysore Sandalwood Agarbatti
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Royal Rose & Temple Mogra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Charcoal-Free Flora Sticks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Vedic Dhoop Cones & Cups
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Organic Bhimseni Camphor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  B2B Wholesale Carton Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Machinery & Tech */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#E6CA85] uppercase tracking-wider">
              Machinery & Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('machines')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Semi-Automatic Agarbatti Extruders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('machines')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  High-Speed Fully Automatic Lines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('machines')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Hydraulic Dhoop Cone Presses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('machines')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Rotary Camphor Tablet Punching
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('machine-partners')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Verified Manufacturer Network
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="hover:text-[#E6CA85] transition-colors text-left font-semibold text-[#E6CA85]"
                >
                  Book Machine Demo / Consultation →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Business Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#E6CA85] uppercase tracking-wider">
              Business Program
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('business-program')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  3-Year Long-Term Agreement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('business-program')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  7-Step Setup Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brands')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Haridarshan & Ullas Partnerships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Entrepreneur Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#E6CA85] transition-colors text-left"
                >
                  Manufacturing FAQs
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://wa.me/911234567890?text=Hello%20Luxmy,%20I%20want%20to%20connect%20with%20your%20commercial%20team."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebd5a] transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Compliance & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Luxmy Agarbatti Limited. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Agreement</span>
            <span>•</span>
            <span>GST Compliance: 24AAACL1987P1Z2</span>
            <span>•</span>
            <span>CIN: U24246GJ2020PLC114890</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
