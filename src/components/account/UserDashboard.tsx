import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { PRODUCTS } from '../../data/mockData';
import { 
  User, 
  Package, 
  Layers, 
  Briefcase, 
  Heart, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Settings,
  Flame,
  FileText
} from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface UserDashboardProps {
  onClose: () => void;
  onExploreProducts: () => void;
  onOpenAdmin: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onClose,
  onExploreProducts,
  onOpenAdmin
}) => {
  const { user, logout, toggleSaveProduct } = useAuth();
  const { orders, bulkQuotes, consultations } = useOrders();

  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'consultations' | 'saved' | 'profile'>('orders');

  if (!user) return null;

  const savedProducts = PRODUCTS.filter((p) => user.savedProductIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-5xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Ornate Header */}
        <div className="bg-[#4A0E17] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E6CA85] text-[#4A0E17] font-serif font-bold text-base flex items-center justify-center border border-white">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                {user.fullName}
              </h3>
              <p className="text-xs text-[#E6CA85]/80">
                {user.businessName ? `${user.businessName} • ` : ''}{user.role === 'admin' ? 'Super Admin' : 'Customer / Retail Partner'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user.role === 'admin' && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-lg bg-[#B45309] text-white text-xs font-bold hover:bg-[#92400E] flex items-center gap-1 shadow-xs"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-60 bg-[#EFE8DC] p-3 sm:p-4 border-r border-[#C5A059]/30 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-[#4A0E17] text-[#E6CA85] shadow-xs'
                  : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'quotes'
                  ? 'bg-[#4A0E17] text-[#E6CA85] shadow-xs'
                  : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Bulk Quotes ({bulkQuotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('consultations')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'consultations'
                  ? 'bg-[#4A0E17] text-[#E6CA85] shadow-xs'
                  : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Consultations ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'saved'
                  ? 'bg-[#4A0E17] text-[#E6CA85] shadow-xs'
                  : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Saved Items ({savedProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-[#4A0E17] text-[#E6CA85] shadow-xs'
                  : 'text-stone-700 hover:bg-white/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Address</span>
            </button>

            <div className="md:mt-auto pt-2 border-t border-[#C5A059]/20 hidden md:block">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full p-2.5 rounded-xl text-left text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>

          {/* Main Tab Content Area */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-[#FAF6F0]">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                    Your Order History & Tracking
                  </h4>
                  <span className="text-xs text-stone-500">{orders.length} orders placed</span>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-[#C5A059]/30">
                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-stone-700">No orders placed yet</p>
                    <p className="text-xs text-stone-500 mt-1">Explore our authentic sandalwood and mogra incense sticks.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreProducts();
                      }}
                      className="mt-3 px-4 py-2 bg-[#4A0E17] text-white text-xs font-bold rounded-lg shadow"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white rounded-xl border border-[#C5A059]/40 p-4 sm:p-5 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                          <div>
                            <span className="text-xs font-bold text-[#6B1724] font-mono">{ord.id}</span>
                            <span className="text-xs text-stone-400 ml-2">
                              • Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'in-transit' || ord.status === 'dispatched'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              Status: {ord.status}
                            </span>
                            <span className="text-xs font-bold text-[#4A0E17]">
                              ₹{ord.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Order Timeline Visual */}
                        <div className="py-2">
                          <div className="flex items-center justify-between text-[11px] text-stone-600 font-semibold relative">
                            <div className="text-center">
                              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1 text-[10px]">✓</div>
                              <span>Confirmed</span>
                            </div>
                            <div className="text-center">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto mb-1 text-[10px] ${
                                ['packing', 'dispatched', 'in-transit', 'delivered'].includes(ord.status)
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-200 text-stone-500'
                              }`}>
                                {['packing', 'dispatched', 'in-transit', 'delivered'].includes(ord.status) ? '✓' : '2'}
                              </div>
                              <span>Packing</span>
                            </div>
                            <div className="text-center">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto mb-1 text-[10px] ${
                                ['dispatched', 'in-transit', 'delivered'].includes(ord.status)
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-200 text-stone-500'
                              }`}>
                                {['dispatched', 'in-transit', 'delivered'].includes(ord.status) ? '✓' : '3'}
                              </div>
                              <span>Dispatched</span>
                            </div>
                            <div className="text-center">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto mb-1 text-[10px] ${
                                ord.status === 'delivered'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-200 text-stone-500'
                              }`}>
                                {ord.status === 'delivered' ? '✓' : '4'}
                              </div>
                              <span>Delivered</span>
                            </div>
                          </div>
                        </div>

                        {/* Items Preview */}
                        <div className="space-y-1.5 pt-2 border-t border-stone-100">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs text-stone-700">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{it.product.name}</span>
                                <span className="text-stone-400">({it.selectedSize.size})</span>
                                <span className="text-stone-500">x {it.quantity}</span>
                              </div>
                              <span className="font-bold text-[#4A0E17]">
                                ₹{(it.unitPrice * it.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Courier Details */}
                        {ord.trackingNumber && (
                          <div className="p-2.5 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 flex flex-wrap items-center justify-between text-xs">
                            <div>
                              <span className="text-stone-500">Courier Partner: </span>
                              <strong className="text-stone-800">{ord.courierPartner}</strong>
                              <span className="text-stone-400 mx-1.5">•</span>
                              <span className="text-stone-500">AWB Track: </span>
                              <strong className="text-[#6B1724] font-mono">{ord.trackingNumber}</strong>
                            </div>
                            <span className="text-emerald-700 font-semibold">
                              Est. Delivery: {ord.estimatedDelivery}
                            </span>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BULK QUOTES TAB */}
            {activeTab === 'quotes' && (
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                  Wholesale & Bulk Quotations
                </h4>
                {bulkQuotes.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-[#C5A059]/30">
                    <Layers className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-stone-700">No active quotation requests</p>
                    <p className="text-xs text-stone-500 mt-1">Submit a bulk inquiry for wholesale carton pricing.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bulkQuotes.map((q) => (
                      <div key={q.id} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#6B1724] font-mono">{q.id}</span>
                            <h5 className="font-serif font-bold text-stone-800 text-sm mt-0.5">{q.productName}</h5>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            q.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {q.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-600 bg-[#FAF6F0] p-2.5 rounded-lg">
                          <div>• Volume: <strong>{q.quantityBoxes} Boxes</strong></div>
                          <div>• City: <strong>{q.deliveryCity}</strong></div>
                          <div>• Target: <strong>{q.targetDate}</strong></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CONSULTATIONS TAB */}
            {activeTab === 'consultations' && (
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                  Machinery & Business Consultations
                </h4>
                {consultations.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-[#C5A059]/30">
                    <Briefcase className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-stone-700">No scheduled consultations</p>
                    <p className="text-xs text-stone-500 mt-1">Book an appointment with a Luxmy manufacturing specialist.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {consultations.map((c) => (
                      <div key={c.id} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#6B1724] font-mono">{c.id}</span>
                          <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-stone-800">
                          Topic: {c.topic} {c.interestedMachine ? `(${c.interestedMachine})` : ''}
                        </p>
                        <div className="text-xs text-stone-600">
                          Preferred Slot: <strong>{c.preferredDate} ({c.preferredSlot})</strong> • Location: <strong>{c.city}, {c.state}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SAVED ITEMS TAB */}
            {activeTab === 'saved' && (
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                  Saved Fragrances & Products
                </h4>
                {savedProducts.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-[#C5A059]/30">
                    <Heart className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-stone-700">No saved items yet</p>
                    <p className="text-xs text-stone-500 mt-1">Click the heart icon on any product to save it to your wishlist.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedProducts.map((p) => (
                      <div key={p.id} className="bg-white rounded-xl border border-[#C5A059]/30 p-3 flex gap-3 items-center">
                        <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-stone-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-stone-800 truncate">{p.name}</p>
                          <p className="text-[11px] text-[#78350F]">{p.fragrance}</p>
                          <p className="text-xs font-bold text-[#4A0E17]">₹{p.price}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveProduct(p.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE & ADDRESS TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border border-[#C5A059]/40 p-5 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17]">
                  Account Profile & Verified Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 block uppercase font-bold text-[10px]">Full Name</span>
                    <span className="text-stone-800 font-bold">{user.fullName}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block uppercase font-bold text-[10px]">Email Address</span>
                    <span className="text-stone-800 font-bold">{user.email}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block uppercase font-bold text-[10px]">Mobile Number</span>
                    <span className="text-stone-800 font-bold">{user.phone}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block uppercase font-bold text-[10px]">Business / Firm</span>
                    <span className="text-stone-800 font-bold">{user.businessName || 'Individual Customer'}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block uppercase font-bold text-[10px]">GSTIN Number</span>
                    <span className="text-stone-800 font-mono font-bold">{user.gstNumber || 'Not Registered'}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block uppercase font-bold text-[10px]">Default Address</span>
                    <span className="text-stone-800">
                      {user.address?.street}, {user.address?.city}, {user.address?.state} - {user.address?.pincode}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
