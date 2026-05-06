'use client';
import { Bed, Bath, Maximize, Heart, CheckCircle, Phone, MessageCircle, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import BookingModal from './BookingModal';

export default function PropertyCard({ property }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="pf-card group overflow-hidden flex flex-col h-full bg-white border border-gray-100 hover:border-pf-primary/30 hover:shadow-2xl transition-all duration-500">
        {/* ... existing card content ... */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {property.isSuperAgent && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-pf-primary px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-pf-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                SuperAgent
              </span>
            )}
            {property.verified && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#ffc107] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-pf-heading shadow-xl shadow-yellow-500/10">
                <CheckCircle size={12} className="fill-pf-heading text-white" />
                TrueCheck™
              </span>
            )}
          </div>

          <button className="absolute right-4 top-4 rounded-2xl bg-white/90 p-3 shadow-xl backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-90">
            <Heart size={18} className="text-pf-heading" />
          </button>

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
            <div className="text-2xl font-black text-white tracking-tight">
              AED {property.price}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-pf-primary">
            <span className="rounded-md bg-pf-primary/5 px-2 py-1">{property.tag}</span>
            <span className="h-1 w-1 rounded-full bg-pf-primary/30" />
            <span className="text-pf-muted">{property.location.split(',')[0]}</span>
          </div>

          <Link href={`/property/${property.id}`}>
            <h3 className="text-lg font-bold text-pf-heading mb-4 leading-snug hover:text-pf-primary transition-colors line-clamp-2">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-4 text-sm font-bold text-pf-muted mb-6 border-b border-gray-50 pb-6">
            <div className="flex items-center gap-1.5">
              <Bed size={18} className="text-pf-muted/60" /> {property.beds}
            </div>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Bath size={18} className="text-pf-muted/60" /> {property.baths}
            </div>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Maximize size={18} className="text-pf-muted/60" /> {property.area}
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-pf-heading py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-pf-heading/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar size={18} /> Book Viewing
            </button>
            
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 py-3 text-[10px] font-black uppercase tracking-widest text-pf-heading hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                <MessageCircle size={14} /> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 py-3 text-[10px] font-black uppercase tracking-widest text-pf-heading hover:bg-pf-primary/5 transition-all">
                <Mail size={14} /> Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        property={property}
      />
    </>
  );
}
