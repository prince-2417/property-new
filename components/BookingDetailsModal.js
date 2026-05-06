'use client';
import { X, Calendar, Clock, User, Phone, Mail, Building2, CreditCard, ShieldCheck, Tag } from 'lucide-react';

export default function BookingDetailsModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="bg-slate-50 px-10 py-8 flex items-center justify-between border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pf-primary px-2 py-1 bg-pf-primary/5 rounded-md">
                Booking ID: {booking.id}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 px-2 py-1 bg-green-50 rounded-md border border-green-100">
                Paid AED 5,000
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Booking Details</h2>
          </div>
          <button 
            onClick={onClose}
            className="rounded-2xl bg-white p-3 text-slate-400 hover:text-pf-primary hover:scale-110 active:scale-95 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Property Section */}
          <div className="flex gap-6 items-start">
            <div className="h-24 w-32 shrink-0 overflow-hidden rounded-2xl shadow-lg">
              <img src={booking.propertyImage} className="h-full w-full object-cover" alt="" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Property Information</p>
              <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">{booking.propertyTitle}</h3>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-pf-primary" /> {booking.viewingDate}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-pf-primary" /> {booking.viewingTime}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Customer Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <User size={18} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Customer Info</h4>
              </div>
              <div className="space-y-4 px-1">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Name</p>
                  <p className="font-bold text-slate-700">{booking.customerName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-bold text-slate-700">{booking.customerPhone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-bold text-slate-700">{booking.customerEmail}</p>
                </div>
              </div>
            </div>

            {/* Owner Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-pf-primary/5 rounded-xl text-pf-primary">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Property Owner</h4>
              </div>
              <div className="space-y-4 px-1">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Owner Name</p>
                  <p className="font-bold text-slate-700">{booking.ownerName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-600">
                    Verified Owner
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="text-slate-400" size={20} />
                <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Payment Information</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">TXN_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
              <p className="text-sm font-bold text-slate-500">Booking Fee (Non-refundable)</p>
              <p className="text-xl font-black text-pf-primary">AED 5,000.00</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            Close Details
          </button>
          <button className="px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
