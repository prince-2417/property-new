'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import BookingDetailsModal from '@/components/BookingDetailsModal';
import { ExternalLink } from 'lucide-react';

export default function PlatformBookings() {
  const { bookings } = useListings();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const totalRevenue = bookings.length * 5000;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Booking Management</h1>
          <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Oversee all property viewings</p>
        </div>
      </div>

      <div className="rounded-[48px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-10 bg-slate-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Platform Bookings</h2>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Global Transaction Activity</p>
          </div>
          <span className="rounded-full bg-green-50 px-6 py-2 text-sm font-black text-green-600 border border-green-100">
            AED {totalRevenue.toLocaleString()} Total
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-10 py-6">Booking ID</th>
                <th className="px-10 py-6">Property</th>
                <th className="px-10 py-6">Customer</th>
                <th className="px-10 py-6">Owner</th>
                <th className="px-10 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-10 py-24 text-center">
                    <p className="text-slate-300 font-black text-lg uppercase tracking-widest">No Bookings Yet</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-7">
                      <span className="font-mono text-xs font-bold text-slate-400">{booking.id}</span>
                    </td>
                    <td className="px-10 py-7">
                      <p className="font-black text-slate-900 leading-tight">{booking.propertyTitle}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{booking.viewingDate} @ {booking.viewingTime}</p>
                    </td>
                    <td className="px-10 py-7">
                      <p className="font-bold text-slate-700">{booking.customerName}</p>
                      <p className="text-xs text-slate-400">{booking.customerEmail}</p>
                    </td>
                    <td className="px-10 py-7">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">
                        {booking.ownerName}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button 
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsDetailsOpen(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-pf-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-pf-primary hover:bg-pf-primary hover:text-white transition-all border border-pf-primary/10"
                      >
                        <ExternalLink size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        booking={selectedBooking} 
      />
    </div>
  );
}
