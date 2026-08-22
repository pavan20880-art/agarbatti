import React, { useState } from 'react';
import { Product } from '../../types';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { X, Layers, CheckCircle2, ShieldCheck, FileText, Send } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface BulkOrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export const BulkOrderModal: React.FC<BulkOrderModalProps> = ({ product, onClose }) => {
  const { requestBulkQuote } = useOrders();
  const { user } = useAuth();

  const [quantityBoxes, setQuantityBoxes] = useState<number>(product?.bulkMinQty || 50);
  const [cartonCount, setCartonCount] = useState<number>(2);
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || '');
  const [contactName, setContactName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp || user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [deliveryCity, setDeliveryCity] = useState('Ahmedabad');
  const [deliveryState, setDeliveryState] = useState('Gujarat');
  const [targetDate, setTargetDate] = useState('2026-09-15');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  if (!product && !submittedQuoteId) return null;

  const approxUnitPrice = product ? product.bulkPrice : 110;
  const estimatedTotal = quantityBoxes * approxUnitPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !phone) {
      alert('Please enter contact person name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const quote = await requestBulkQuote({
        productName: product?.name || 'Custom Incense Assortment',
        brand: product?.brand || 'Luxmy Signature',
        category: product?.category || 'Agarbatti',
        quantityBoxes,
        cartonCount,
        targetDate,
        businessName: businessName || `${contactName} Enterprises`,
        gstNumber: gstNumber || undefined,
        contactName,
        phone,
        whatsapp: whatsapp || phone,
        email: email || `${phone}@luxmy.in`,
        deliveryCity,
        deliveryState,
        additionalNotes
      });
      setSubmittedQuoteId(quote.id);
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
            <Layers className="w-5 h-5 text-[#E6CA85]" />
            <h3 className="font-display text-sm sm:text-base font-bold tracking-wider text-[#E6CA85]">
              B2B Bulk & Wholesale Quotation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedQuoteId ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#4A0E17]">
              Bulk Quotation Request Submitted!
            </h3>

            <p className="text-sm text-stone-700 max-w-md mx-auto">
              Your inquiry reference number is <strong className="text-[#6B1724]">{submittedQuoteId}</strong>.
              A Luxmy B2B regional account specialist will contact you with wholesale tiers, sample kit dispatches, and freight terms.
            </p>

            <div className="p-4 rounded-xl bg-[#EFE8DC] border border-[#C5A059]/30 text-xs text-left max-w-md mx-auto space-y-1.5">
              <p><strong>Item:</strong> {product?.name}</p>
              <p><strong>Quantity:</strong> {quantityBoxes} Boxes ({cartonCount} Master Cartons)</p>
              <p><strong>Destination:</strong> {deliveryCity}, {deliveryState}</p>
              <p><strong>Estimated Range:</strong> ₹{estimatedTotal.toLocaleString()} + GST (Exact freight & volume discounts applied on quotation)</p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#4A0E17] text-white text-xs font-bold rounded-lg shadow"
              >
                Back to Catalogue
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            
            {/* Product Summary Banner */}
            {product && (
              <div className="p-3 rounded-xl bg-[#EFE8DC] border border-[#C5A059]/40 flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase text-[#78350F]">{product.brand}</span>
                  <p className="text-xs font-bold text-[#4A0E17] truncate">{product.name}</p>
                  <p className="text-[11px] text-stone-600">
                    Bulk Baseline: ₹{product.bulkPrice}/box (Min {product.bulkMinQty} units)
                  </p>
                </div>
              </div>
            )}

            {/* Quantity & Carton Volume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Total Boxes Required:
                </label>
                <input
                  type="number"
                  min={product?.bulkMinQty || 20}
                  value={quantityBoxes}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuantityBoxes(val);
                    setCartonCount(Math.max(1, Math.ceil(val / 50)));
                  }}
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Approx. Master Cartons:
                </label>
                <input
                  type="number"
                  min={1}
                  value={cartonCount}
                  onChange={(e) => setCartonCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                />
              </div>
            </div>

            {/* Business Details */}
            <div className="pt-2 border-t border-stone-200">
              <p className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2.5">
                Business & Contact Information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Business / Store Name:
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Mahadev Traders & Pooja Store"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    GST Number (Optional):
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    placeholder="24AAACP1234F1Z5"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Contact Person Name *:
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Phone / Mobile *:
                  </label>
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
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    WhatsApp Number:
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="business@example.com"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Delivery City:
                  </label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Delivery State:
                  </label>
                  <input
                    type="text"
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Custom Requirements (Packaging, Custom Branding, Target Delivery Timeline):
              </label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Mention any specific fragrance mix, festival delivery deadline or packaging requirements..."
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 block">Estimated Baseline:</span>
                <span className="text-base font-bold text-[#4A0E17]">
                  ₹{estimatedTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Request Bulk Quotation'}</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
