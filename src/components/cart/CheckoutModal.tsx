import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  AlertCircle,
  MessageCircle,
  Building,
  User,
  Phone
} from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOpenDashboard
}) => {
  const { items, subtotal, taxAmount, shippingFee, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated, login, signup } = useAuth();
  const { createOrder } = useOrders();

  // Step state: 'auth' | 'shipping' | 'payment' | 'success'
  const [currentStep, setCurrentStep] = useState<'auth' | 'shipping' | 'payment' | 'success'>(
    isAuthenticated ? 'shipping' : 'auth'
  );

  // Auth sub-form state
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Shipping form state
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || 'Ahmedabad');
  const [state, setState] = useState(user?.address?.state || 'Gujarat');
  const [pincode, setPincode] = useState(user?.address?.pincode || '380001');
  const [landmark, setLandmark] = useState(user?.address?.landmark || '');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || '');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  // Sync auth state
  React.useEffect(() => {
    if (isAuthenticated && currentStep === 'auth') {
      setCurrentStep('shipping');
      if (user) {
        setFullName(user.fullName);
        setPhone(user.phone);
        if (user.address) {
          setStreet(user.address.street);
          setCity(user.address.city);
          setState(user.address.state);
          setPincode(user.address.pincode);
          setLandmark(user.address.landmark || '');
        }
        if (user.businessName) setBusinessName(user.businessName);
        if (user.gstNumber) setGstNumber(user.gstNumber);
      }
    }
  }, [isAuthenticated, user]);

  if (!isOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (authMode === 'login') {
        const ok = await login(authEmail, authPassword);
        if (!ok) setAuthError('Invalid credentials. Please check your email/phone and password.');
      } else {
        if (!authFullName || !authPhone || !authEmail) {
          setAuthError('Please fill all required fields');
          return;
        }
        await signup(authFullName, authEmail, authPhone, authPassword);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city || !pincode) {
      alert('Please fill all required shipping fields.');
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate Razorpay / UPI Gateway verification delay
      await new Promise((res) => setTimeout(res, 1200));

      const newOrder = await createOrder(
        items,
        {
          street,
          city,
          state,
          pincode,
          landmark,
          recipientName: fullName,
          recipientPhone: phone
        },
        paymentMethod,
        subtotal,
        taxAmount,
        shippingFee,
        totalAmount
      );

      setPlacedOrderId(newOrder.id);
      setCurrentStep('success');
      clearCart();

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A0E17', '#E6CA85', '#B45309', '#25D366']
        });
      } catch (err) {
        // Safe fallback
      }

    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Ornate Header */}
        <div className="bg-[#4A0E17] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E6CA85]" />
            <h3 className="font-display text-sm sm:text-base font-bold tracking-wider text-[#E6CA85]">
              Luxmy Agarbatti Secure Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Unless on Success screen) */}
        {currentStep !== 'success' && (
          <div className="bg-[#EFE8DC] px-6 py-2.5 border-b border-[#C5A059]/30 flex items-center justify-between text-xs font-semibold text-stone-600">
            <div className={`flex items-center gap-1.5 ${currentStep === 'auth' ? 'text-[#6B1724] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#E6CA85] flex items-center justify-center text-[10px]">1</span>
              <span>Account</span>
            </div>
            <span>→</span>
            <div className={`flex items-center gap-1.5 ${currentStep === 'shipping' ? 'text-[#6B1724] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#E6CA85] flex items-center justify-center text-[10px]">2</span>
              <span>Delivery</span>
            </div>
            <span>→</span>
            <div className={`flex items-center gap-1.5 ${currentStep === 'payment' ? 'text-[#6B1724] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#E6CA85] flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: AUTHENTICATION */}
          {currentStep === 'auth' && (
            <div className="space-y-4 max-w-md mx-auto">
              <div className="text-center">
                <h4 className="font-serif text-xl font-bold text-[#4A0E17]">
                  {authMode === 'signup' ? 'Create Account for Order Tracking' : 'Sign In to Your Luxmy Account'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Save your delivery addresses, track courier dispatches, and access wholesale pricing.
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={authFullName}
                      onChange={(e) => setAuthFullName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra Sharma"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                    required
                  />
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile Number (for SMS & OTP updates) *</label>
                    <input
                      type="tel"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Password *</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>{authMode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-2 border-t border-stone-200 text-xs">
                {authMode === 'signup' ? (
                  <p className="text-stone-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthMode('login')}
                      className="text-[#6B1724] font-bold hover:underline"
                    >
                      Sign In here
                    </button>
                  </p>
                ) : (
                  <p className="text-stone-600">
                    New customer?{' '}
                    <button
                      onClick={() => setAuthMode('signup')}
                      className="text-[#6B1724] font-bold hover:underline"
                    >
                      Create Account
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {currentStep === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B45309]" />
                  <span>Delivery Address & Recipient Details</span>
                </h4>
                <span className="text-xs text-stone-500">Logged in as {user?.fullName}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Mobile *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address / Building / Flat *</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Plot No. 42, GIDC Industrial Estate, Phase 2"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near Laxmi Temple"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Business / Firm Name (Optional)</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Mahadev Pooja Emporium"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">GSTIN for Tax Invoice (Optional)</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    placeholder="24AAACP1234F1Z5"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 uppercase"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Return to Cart
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {currentStep === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#B45309]" />
                  <span>Select Payment Method</span>
                </h4>
                <span className="text-xs font-bold text-[#4A0E17]">
                  Total: ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2.5">
                
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/20'
                      : 'bg-white border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#4A0E17]">Instant UPI / QR Code</p>
                        <p className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Zero Surcharge
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-[#C5A059]/30 text-xs">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Enter UPI VPA ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-3 py-1.5 text-xs bg-white rounded border border-[#C5A059]/40"
                      />
                    </div>
                  )}
                </div>

                {/* Cards / Net Banking Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/20'
                      : 'bg-white border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4A0E17]">Credit / Debit Card / Net Banking</p>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, RuPay, HDFC, SBI, ICICI</p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery / Bank RTGS */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/20'
                      : 'bg-white border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4A0E17]">Cash on Delivery (COD) / Bank Transfer</p>
                      <p className="text-[11px] text-stone-500">Pay cash upon courier arrival</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Order Summary Recap */}
              <div className="p-3 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/30 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Cart Items ({items.length}):</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>GST (5%):</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-[#4A0E17] text-sm pt-1 border-t border-[#C5A059]/30">
                  <span>Total Payable:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep('shipping')}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-lg bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E6CA85]" />
                  <span>{isProcessing ? 'Authorizing Payment...' : `Pay ₹${totalAmount.toLocaleString()} & Confirm`}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER CONFIRMATION / SUCCESS */}
          {currentStep === 'success' && (
            <div className="text-center p-4 sm:p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#4A0E17]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Thank you for choosing Luxmy Agarbatti Limited. Your sacred incense package is being prepared with Vedic purity.
                </p>
              </div>

              <div className="p-4 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/40 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between font-bold text-[#4A0E17] pb-1 border-b border-[#C5A059]/30">
                  <span>Order Reference:</span>
                  <span className="font-mono text-[#6B1724]">{placedOrderId}</span>
                </div>
                <p><strong>Recipient:</strong> {fullName} ({phone})</p>
                <p><strong>Delivery City:</strong> {city}, {state} - {pincode}</p>
                <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
                <p><strong>Total Paid:</strong> ₹{totalAmount.toLocaleString()} (Tax Invoice Generated)</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenDashboard();
                  }}
                  className="px-5 py-2.5 bg-[#4A0E17] text-[#E6CA85] text-xs font-bold rounded-lg shadow hover:bg-[#5B131F] cursor-pointer"
                >
                  View in Customer Dashboard →
                </button>

                <a
                  href={`https://wa.me/911234567890?text=Hello%20Luxmy,%20I%20have%20placed%20order%20${placedOrderId}.%20Please%20confirm%20dispatch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 hover:bg-[#1ebd5a]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Dispatch Updates</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
