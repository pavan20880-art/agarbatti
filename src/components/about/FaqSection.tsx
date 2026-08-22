import React, { useState } from 'react';
import { FAQS } from '../../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = ['All', 'Products', 'Machines', 'Business', 'Account'];

  const filteredFaqs = FAQS.map((faq, idx) => ({ ...faq, originalIndex: idx })).filter((f) => {
    if (selectedCategory !== 'All' && f.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-12 sm:py-16 bg-[#EFE8DC]/50 relative border-t border-[#C5A059]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C5A059]/40 text-[#78350F] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Frequently Asked Questions</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#4A0E17]">
            Got Questions? We Have Answers.
          </h3>

          <OrnamentalDivider className="my-2" variant="gold" />

          <p className="text-stone-600 text-xs sm:text-sm">
            Everything you need to know about our incense products, machinery setup, 3-year business program, and delivery timelines.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#4A0E17] text-[#E6CA85] border-[#4A0E17] shadow-xs'
                    : 'bg-white text-stone-700 border-[#C5A059]/30 hover:bg-[#FAF6F0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqIndex === faq.originalIndex;
            return (
              <div
                key={faq.originalIndex}
                className="bg-white rounded-xl border border-[#C5A059]/35 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.originalIndex)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6F0]/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#B45309] font-mono">
                      Q:
                    </span>
                    <span className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">
                      {faq.q}
                    </span>
                  </div>
                  <div className="text-stone-400 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#B45309]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 bg-[#FAF6F0]/40 leading-relaxed space-y-2">
                    <p>{faq.a}</p>
                    <span className="text-[10px] uppercase font-bold text-[#78350F] tracking-wider block pt-1">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-8 text-center bg-white p-5 rounded-xl border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-sm font-bold text-[#4A0E17]">
              Still have questions about setting up your factory?
            </h4>
            <p className="text-xs text-stone-500">
              Our technical advisors are available on WhatsApp and Phone from 9 AM to 7 PM.
            </p>
          </div>

          <a
            href="https://wa.me/911234567890?text=Hello%20Luxmy,%20I%20have%20a%20question%20regarding%20agarbatti%20machinery."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
