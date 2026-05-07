'use client';
import { Bed, Bath, Maximize, Heart, CheckCircle, Phone, MessageCircle, Mail, Calendar, ArrowRight } from 'lucide-react';
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
      <div className="pf-card group overflow-hidden flex flex-col h-full bg-pf-surface border border-white/5 hover:border-white/20 transition-all duration-700">
        <div className="relative h-80 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition duration-[2s] group-hover:scale-110 group-hover:rotate-1"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-pf-surface via-transparent to-transparent opacity-60" />

          <div className="absolute left-6 top-6 flex flex-col gap-3">
            {property.verified && (
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white border border-white/10">
                Verified Collection
              </span>
            )}
          </div>

          <button 
            onClick={() => toggleSave(property.id)}
            className="absolute right-6 top-6 p-3 bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-white hover:text-black"
          >
            <Heart 
              size={16} 
              className={isSaved ? 'fill-white' : ''} 
            />
          </button>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pf-accent">{property.tag}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{property.location.split(',')[0]}</span>
          </div>

          <Link href={`/property/${property.id}`}>
            <h3 className="font-serif text-3xl text-white mb-6 leading-tight hover:italic hover:translate-x-1 transition-all">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-8 text-[11px] font-black text-white/40 mb-10 border-b border-white/5 pb-8">
            <div className="flex items-center gap-2">
              <Bed size={14} className="text-pf-accent" /> {property.beds}
            </div>
            <div className="flex items-center gap-2">
              <Bath size={14} className="text-pf-accent" /> {property.baths}
            </div>
            <div className="flex items-center gap-2">
              <Maximize size={14} className="text-pf-accent" /> {property.area}
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Price Guide</p>
                <p className="text-3xl font-normal text-white font-serif italic">AED {property.price}</p>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="p-4 bg-white text-black hover:bg-pf-accent hover:text-white transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/50 hover:border-white hover:text-white transition-all">
                WhatsApp
              </button>
              <button className="py-4 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/50 hover:border-white hover:text-white transition-all">
                Enquire Now
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
