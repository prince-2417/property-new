'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import BookingDetailsModal from '@/components/BookingDetailsModal';
import { ExternalLink, ArrowUpRight, Calendar } from 'lucide-react';

export default function PlatformBookings() {
  const { bookings } = useListings();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const totalRevenue = bookings.length * 5000;

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Revenue Activity</p>
          <h1 className="font-serif italic text-5xl text-white">Booking <span className="font-normal not-italic">Ledger</span></h1>
        </div>
        
        <div className="bg-pf-surface border border-white/5 px-10 py-6">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Projected Revenue</p>
          <p className="font-serif italic text-3xl text-pf-accent">AED {totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-pf-surface border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                <th className="px-12 py-8">Reference</th>
                <th className="px-12 py-8">Residence Details</th>
                <th className="px-12 py-8">Stakeholders</th>
                <th className="px-12 py-8 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-12 py-32 text-center">
                    <p className="text-white/10 font-serif italic text-2xl">No transaction activity recorded</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-white/5 transition-all duration-500">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/10">
                        <span>#{booking.id.slice(0, 8)}</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <p className="font-serif text-2xl text-white group-hover:italic transition-all leading-tight mb-2">{booking.propertyTitle}</p>
                      <div className="flex items-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-widest">
                        <Calendar size={12} className="text-pf-accent" /> {booking.viewingDate} <span className="text-white/10">|</span> {booking.viewingTime}
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-8 w-8 bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
                            {booking.customerName[0]}
                          </div>
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-white">{booking.customerName}</p>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Client</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-8 w-8 bg-pf-accent/10 border border-pf-accent/20 flex items-center justify-center text-[10px] font-black text-pf-accent">
                            {booking.ownerName[0]}
                          </div>
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-white">{booking.ownerName}</p>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Advisor</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <button 
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsDetailsOpen(true);
                        }}
                        className="inline-flex items-center gap-3 px-6 py-3 text-[9px] font-black uppercase tracking-widest border border-white/10 text-white/40 hover:border-white hover:text-white transition-all group/btn"
                      >
                        Details <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
