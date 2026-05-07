'use client';
import { Bed, Bath, Maximize, Heart, CheckCircle, Phone, MessageCircle, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import BookingModal from './BookingModal';

export default function PropertyCard({ property }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toggleSave, savedProperties } = useListings();
  const isSaved = (savedProperties || []).includes(property.id);

  return (
    <>
      <div className="pf-card group overflow-hidden flex flex-col h-full bg-white border border-slate-100 hover:border-pf-primary/20 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] transition-all duration-500">
        <div className="relative h-72 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
          />

          <div className="absolute left-5 top-5 flex flex-col gap-2.5">
            {property.isSuperAgent && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-pf-primary animate-pulse" />
                SuperAgent
              </span>
            )}
            {property.verified && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur-md px-4 py-2 text-[10px] font-black uppercase tracking-widest text-pf-heading shadow-xl">
                <CheckCircle size={12} className="text-pf-primary fill-pf-primary/10" />
                Verified
              </span>
            )}
          </div>

          <button 
            onClick={() => toggleSave(property.id)}
            className="absolute right-5 top-5 rounded-2xl bg-white/90 p-3.5 shadow-xl backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-90"
          >
            <Heart 
              size={18} 
              className={`transition-colors ${isSaved ? 'fill-red-500 text-red-500' : 'text-pf-heading'}`} 
            />
          </button>

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-6 pt-20">
            <div className="text-2xl font-black text-white tracking-tight">
              AED {property.price}
              <span className="text-xs font-medium text-white/70 ml-2 uppercase tracking-widest">/ Yearly</span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-pf-primary">
            <span className="rounded-lg bg-pf-primary/5 px-3 py-1.5 border border-pf-primary/10">{property.tag}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-pf-muted">{property.location.split(',')[0]}</span>
          </div>

          <Link href={`/property/${property.id}`}>
            <h3 className="text-[19px] font-extrabold text-pf-heading mb-5 leading-[1.4] hover:text-pf-primary transition-colors line-clamp-2">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-6 text-[13px] font-bold text-slate-500 mb-8 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-2">
              <Bed size={18} className="text-pf-primary/40" /> {property.beds}
            </div>
            <div className="flex items-center gap-2">
              <Bath size={18} className="text-pf-primary/40" /> {property.baths}
            </div>
            <div className="flex items-center gap-2">
              <Maximize size={18} className="text-pf-primary/40" /> {property.area}
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="w-full relative group overflow-hidden rounded-2xl bg-pf-heading py-5 text-[11px] font-black uppercase tracking-[0.25em] text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pf-primary to-pf-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Calendar size={16} strokeWidth={2.5} /> 
                <span>Schedule Viewing</span>
              </div>
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white py-4 text-[10px] font-black uppercase tracking-widest text-pf-heading hover:border-pf-primary/30 hover:bg-pf-primary/5 hover:text-pf-primary transition-all">
                <MessageCircle size={14} strokeWidth={2.5} /> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white py-4 text-[10px] font-black uppercase tracking-widest text-pf-heading hover:border-pf-primary/30 hover:bg-pf-primary/5 hover:text-pf-primary transition-all">
                <Mail size={14} strokeWidth={2.5} /> Email
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
