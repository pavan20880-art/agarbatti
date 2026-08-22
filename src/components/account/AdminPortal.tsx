import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { 
  ShieldCheck, 
  Package, 
  Layers, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Truck, 
  X, 
  Search,
  Filter,
  DollarSign,
  Users
} from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const { orders, bulkQuotes, consultations, updateOrderStatus, updateBulkQuoteStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'consultations'>('orders');

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-5xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Admin Top Bar */}
        <div className="bg-[#2B090E] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#E6CA85]" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
              Luxmy Enterprise Operations & Order Management
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Quick Analytics Metric Cards */}
        <div className="bg-[#EFE8DC] p-4 sm:p-5 border-b border-[#C5A059]/30 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Orders</span>
            <span className="text-xl font-serif font-bold text-[#4A0E17]">{orders.length}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Revenue</span>
            <span className="text-xl font-serif font-bold text-emerald-800">₹{totalRevenue.toLocaleString()}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">B2B Bulk Inquiries</span>
            <span className="text-xl font-serif font-bold text-[#B45309]">{bulkQuotes.length}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#C5A059]/30">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Consultation Bookings</span>
            <span className="text-xl font-serif font-bold text-[#78350F]">{consultations.length}</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 bg-white border-b border-stone-200 flex gap-4 text-xs font-bold text-stone-600">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'quotes' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
            }`}
          >
            B2B Bulk Quotes ({bulkQuotes.length})
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'consultations' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
            }`}
          >
            Machinery Consultations ({consultations.length})
          </button>
        </div>

        {/* Tab Content List */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-[#FAF6F0] space-y-3">
          
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-2xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#6B1724]">{ord.id}</span>
                      <span className="text-xs text-stone-500 ml-2 font-medium">Recipient: {ord.shippingAddress.recipientName} ({ord.shippingAddress.recipientPhone})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#4A0E17]">₹{ord.totalAmount.toLocaleString()}</span>
                      
                      {/* Change Status Dropdown */}
                      <select
                        value={ord.status}
                        onChange={(e: any) => updateOrderStatus(ord.id, e.target.value)}
                        className="py-1 px-2 text-xs font-bold rounded-md bg-[#FAF6F0] border border-[#C5A059]/40 text-stone-800"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="packing">Packing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600">
                    Address: {ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-700">
                    {ord.items.map((it, idx) => (
                      <span key={idx} className="bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#C5A059]/20">
                        {it.product.name} ({it.selectedSize.size}) x {it.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-3">
              {bulkQuotes.map((q) => (
                <div key={q.id} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#6B1724]">{q.id}</span>
                      <h5 className="text-xs font-bold text-stone-800">{q.productName} — {q.quantityBoxes} Boxes</h5>
                    </div>
                    <select
                      value={q.status}
                      onChange={(e: any) => updateBulkQuoteStatus(q.id, e.target.value)}
                      className="py-1 px-2 text-xs font-bold rounded-md bg-[#FAF6F0] border border-[#C5A059]/40"
                    >
                      <option value="received">Received</option>
                      <option value="under-review">Under Review</option>
                      <option value="quoted">Quoted</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="text-xs text-stone-600">
                    Contact: <strong>{q.contactName}</strong> ({q.phone}, {q.email}) • Firm: <strong>{q.businessName}</strong> (GST: {q.gstNumber || 'N/A'})
                  </div>
                  <div className="text-[11px] text-stone-500">
                    City: {q.deliveryCity}, {q.deliveryState} • Target Delivery: {q.targetDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'consultations' && (
            <div className="space-y-3">
              {consultations.map((c) => (
                <div key={c.id} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#6B1724]">{c.id}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-stone-800">
                    Client: {c.fullName} ({c.phone}) • Topic: {c.topic}
                  </p>
                  <p className="text-xs text-stone-600">
                    Preferred Slot: {c.preferredDate} ({c.preferredSlot}) • Location: {c.city}, {c.state}
                  </p>
                  {c.interestedMachine && (
                    <p className="text-[11px] text-[#78350F]">Machine Interest: {c.interestedMachine}</p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
