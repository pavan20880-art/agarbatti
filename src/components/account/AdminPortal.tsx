import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
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
  Users,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const { orders, bulkQuotes, consultations, updateOrderStatus, updateBulkQuoteStatus } = useOrders();
  const { allUsers } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'orders' | 'quotes' | 'consultations'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Filter users by search query
  const filteredUsers = allUsers.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.phone || '').includes(q) ||
      (u.businessName || '').toLowerCase().includes(q)
    );
  });

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
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                Luxmy Enterprise Cloud Hub & User Management
              </h3>
              <p className="text-[11px] text-[#E6CA85]/80">
                Live Cloud Sync • Real-time Cross-Device Database (Firebase)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Analytics Metric Cards */}
        <div className="bg-[#EFE8DC] p-4 sm:p-5 border-b border-[#C5A059]/30 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => setActiveTab('users')} 
            className={`p-3 rounded-xl border transition-all cursor-pointer ${activeTab === 'users' ? 'bg-white border-[#4A0E17] shadow-sm' : 'bg-white/80 border-[#C5A059]/30 hover:bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Signed-up Users</span>
              <Users className="w-4 h-4 text-[#C5A059]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#4A0E17]">{allUsers.length}</span>
            <span className="text-[10px] text-stone-500 block mt-0.5">Synced across devices</span>
          </div>

          <div 
            onClick={() => setActiveTab('orders')} 
            className={`p-3 rounded-xl border transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-white border-[#4A0E17] shadow-sm' : 'bg-white/80 border-[#C5A059]/30 hover:bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Orders</span>
              <Package className="w-4 h-4 text-[#C5A059]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#4A0E17]">{orders.length}</span>
            <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">₹{totalRevenue.toLocaleString()} Vol.</span>
          </div>

          <div 
            onClick={() => setActiveTab('quotes')} 
            className={`p-3 rounded-xl border transition-all cursor-pointer ${activeTab === 'quotes' ? 'bg-white border-[#4A0E17] shadow-sm' : 'bg-white/80 border-[#C5A059]/30 hover:bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">B2B Bulk Inquiries</span>
              <Briefcase className="w-4 h-4 text-[#B45309]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#B45309]">{bulkQuotes.length}</span>
            <span className="text-[10px] text-stone-500 block mt-0.5">Wholesale pipeline</span>
          </div>

          <div 
            onClick={() => setActiveTab('consultations')} 
            className={`p-3 rounded-xl border transition-all cursor-pointer ${activeTab === 'consultations' ? 'bg-white border-[#4A0E17] shadow-sm' : 'bg-white/80 border-[#C5A059]/30 hover:bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Machinery Bookings</span>
              <Layers className="w-4 h-4 text-[#78350F]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#78350F]">{consultations.length}</span>
            <span className="text-[10px] text-stone-500 block mt-0.5">Plant consultations</span>
          </div>
        </div>

        {/* Tab Controls & Search Bar */}
        <div className="px-6 pt-3 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-4 text-xs font-bold text-stone-600 overflow-x-auto">
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-2.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'users' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Signed-up Users ({allUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-2.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'orders' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Customer Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`pb-2.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quotes' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              B2B Bulk Quotes ({bulkQuotes.length})
            </button>
            <button
              onClick={() => setActiveTab('consultations')}
              className={`pb-2.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'consultations' ? 'border-[#4A0E17] text-[#4A0E17]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Machinery Consultations ({consultations.length})
            </button>
          </div>

          {activeTab === 'users' && (
            <div className="pb-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, phone, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:border-[#4A0E17] w-52 sm:w-64"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tab Content List */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-[#FAF6F0] space-y-3">
          
          {/* TAB 1: ALL SIGNED UP USERS */}
          {activeTab === 'users' && (
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="bg-white rounded-xl border border-stone-200 p-8 text-center">
                  <Users className="w-12 h-12 text-[#C5A059] mx-auto mb-3 opacity-60" />
                  <h4 className="font-serif text-base font-bold text-stone-800">No Signed-up Users Found</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                    When someone signs up from any phone or computer on your website, their account details will automatically appear here in real time.
                  </p>
                </div>
              ) : (
                filteredUsers.map((u, idx) => (
                  <div key={u.id || idx} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4A0E17] text-[#E6CA85] flex items-center justify-center font-bold text-sm font-serif">
                          {(u.fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-stone-900">{u.fullName}</h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6F0] border border-[#C5A059]/40 text-[#6B1724]">
                              {u.businessType || 'Customer'}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-stone-400">UID: {u.id}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 justify-end">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>Joined: {u.createdAt || 'Recent'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                      <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-2 rounded-lg border border-[#C5A059]/20">
                        <Phone className="w-3.5 h-3.5 text-[#6B1724]" />
                        <span className="font-medium">{u.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-2 rounded-lg border border-[#C5A059]/20">
                        <Mail className="w-3.5 h-3.5 text-[#6B1724]" />
                        <span className="truncate">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#FAF6F0] p-2 rounded-lg border border-[#C5A059]/20">
                        <Building2 className="w-3.5 h-3.5 text-[#6B1724]" />
                        <span className="truncate">{u.businessName || 'Individual / Retail'}</span>
                      </div>
                    </div>

                    {u.addresses && u.addresses.length > 0 && (
                      <div className="text-[11px] text-stone-500 flex items-start gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>
                          {u.addresses[0].street}, {u.addresses[0].city}, {u.addresses[0].state} - {u.addresses[0].pincode}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-xl border border-[#C5A059]/40 p-4 shadow-2xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#6B1724]">{ord.id}</span>
                      <span className="text-xs text-stone-500 ml-2 font-medium">
                        Customer: {ord.customer?.name || ord.deliveryAddress?.fullName} ({ord.customer?.phone || ord.deliveryAddress?.phone})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#4A0E17]">₹{ord.total.toLocaleString()}</span>
                      
                      {/* Change Status Dropdown */}
                      <select
                        value={ord.orderStatus}
                        onChange={(e: any) => updateOrderStatus(ord.id, e.target.value)}
                        className="py-1 px-2 text-xs font-bold rounded-md bg-[#FAF6F0] border border-[#C5A059]/40 text-stone-800"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Payment Confirmed">Payment Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600">
                    Address: {ord.deliveryAddress?.street}, {ord.deliveryAddress?.city}, {ord.deliveryAddress?.state} - {ord.deliveryAddress?.pincode}
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-700">
                    {ord.items.map((it, idx) => (
                      <span key={idx} className="bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#C5A059]/20">
                        {it.name} ({it.size}) x {it.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: B2B BULK QUOTES */}
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
                      <option value="Enquiry Submitted">Enquiry Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Completed">Completed</option>
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

          {/* TAB 4: MACHINERY CONSULTATIONS */}
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
                    Client: {c.fullName} ({c.phone}) • Machine: {c.interestedMachine}
                  </p>
                  <p className="text-xs text-stone-600">
                    Location: {c.city}, {c.state} • Budget: {c.investmentRange} • Production Goal: {c.expectedProduction}
                  </p>
                  {c.message && (
                    <p className="text-[11px] text-stone-500 italic">"{c.message}"</p>
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
