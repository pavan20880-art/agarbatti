import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Briefcase, 
  PhoneCall, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck,
  Building,
  Send
} from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledMachine?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledMachine
}) => {
  const { bookConsultation } = useOrders();
  const { user } = useAuth();

  const [topic, setTopic] = useState(
    prefilledMachine ? 'Machinery Purchase & Setup' : 'New Agarbatti Factory Setup'
  );
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState('Ahmedabad');
  const [state, setState] = useState('Gujarat');
  const [investmentBudget, setInvestmentBudget] = useState('₹5 – 10 lakh');
  const [preferredDate, setPreferredDate] = useState('2026-09-02');
  const [preferredSlot, setPreferredSlot] = useState('11:00 AM - 01:00 PM');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please enter your full name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const booking = await bookConsultation({
        fullName,
        phone,
        email: email || `${phone}@luxmy.in`,
        city,
        state,
        topic,
        investmentBudget,
        preferredDate,
        preferredSlot,
        message,
        interestedMachine: prefilledMachine
      });
      setSubmittedBookingId(booking.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#4A0E17] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-[#E6CA85]" />
            <h3 className="font-display text-sm sm:text-base font-bold tracking-wider text-[#E6CA85]">
              Book Agarbatti Manufacturing Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedBookingId ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#4A0E17]">
              Consultation Slot Booked!
            </h3>

            <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto">
              Your appointment booking reference is <strong className="text-[#6B1724]">{submittedBookingId}</strong>.
              A senior Luxmy manufacturing engineer will connect with you on phone/WhatsApp at your chosen slot.
            </p>

            <div className="p-4 rounded-xl bg-[#EFE8DC] border border-[#C5A059]/30 text-xs text-left max-w-md mx-auto space-y-1.5">
              <p><strong>Topic:</strong> {topic} {prefilledMachine ? `(${prefilledMachine})` : ''}</p>
              <p><strong>Scheduled Slot:</strong> {preferredDate} at {preferredSlot}</p>
              <p><strong>Client:</strong> {fullName} ({phone})</p>
              <p><strong>Location:</strong> {city}, {state}</p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#4A0E17] text-white text-xs font-bold rounded-lg shadow"
              >
                Close & Return to Website
              </button>

              <a
                href={`https://wa.me/911234567890?text=Hello%20Luxmy,%20I%20have%20booked%20consultation%20${submittedBookingId}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 hover:bg-[#1ebd5a]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            
            {prefilledMachine && (
              <div className="p-3 rounded-lg bg-[#EFE8DC] border border-[#C5A059]/40 text-xs">
                <span className="text-[#78350F] font-bold">Selected Machinery: </span>
                <span className="font-bold text-[#4A0E17]">{prefilledMachine}</span>
              </div>
            )}

            {/* Consultation Topic */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Consultation Agenda / Topic *:
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
              >
                <option value="New Agarbatti Factory Setup">New Agarbatti Factory Setup (Turnkey)</option>
                <option value="Machinery Purchase & Setup">Machinery Purchase & Technical Specifications</option>
                <option value="Raw Material & Fragrance Supply Partnership">Raw Material & Fragrance Supply Partnership</option>
                <option value="3-Year Business Agreement Inquiry">3-Year Long-Term Business Agreement</option>
                <option value="Brand Distributorship / Dealership">Brand Distributorship / Wholesale Stockist</option>
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Patel"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone / Mobile *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Planned Investment Budget</label>
                <select
                  value={investmentBudget}
                  onChange={(e) => setInvestmentBudget(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                >
                  <option value="Under ₹5 lakh">Under ₹5 lakh (Micro Unit)</option>
                  <option value="₹5 – 10 lakh">₹5 – 10 lakh (Semi-Automatic Plant)</option>
                  <option value="₹10 – 25 lakh">₹10 – 25 lakh (Commercial Setup)</option>
                  <option value="₹25 lakh+">₹25 lakh+ (Industrial Automated Line)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your City / District *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  required
                />
              </div>
            </div>

            {/* Appointment Slot */}
            <div className="pt-2 border-t border-stone-200">
              <p className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2.5">
                Preferred Consultation Schedule:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Time Window</label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  >
                    <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                    <option value="05:00 PM - 07:00 PM">Evening (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tell us about your workshop space, power supply, or specific questions:
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention if you have existing space, electricity line type, or required daily output..."
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Booking Appointment...' : 'Confirm Consultation Slot'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
