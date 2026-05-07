'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { MapPin, Car, Train, Footprints, ChevronRight, Clock } from 'lucide-react';

export default function TravelTimeSection() {
  const { listings } = useListings();
  const [location, setLocation] = useState('Burj Khalifa');
  const [time, setTime] = useState(15);
  const [mode, setMode] = useState('Drive');
  const [isPeak, setIsPeak] = useState(true);

  const topProperties = listings.slice(0, 3);

  return (
    <section className="bg-slate-50 py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.5em] text-pf-primary mb-4">Smart Search</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-pf-heading tracking-tighter">Location Intelligence</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="rounded-[48px] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">
                  <MapPin size={16} className="text-pf-primary" />
                  <span>Desired Destination</span>
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where are you going?" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-[15px] font-bold text-pf-heading placeholder:text-slate-300 focus:bg-white focus:border-pf-primary focus:ring-4 focus:ring-pf-primary/5 transition-all outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-2">Max travel time</p>
                    <p className="text-4xl font-black text-pf-primary tracking-tighter">{time} <span className="text-lg">mins</span></p>
                  </div>
                  <button 
                    onClick={() => setIsPeak(!isPeak)}
                    className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all ${
                      isPeak ? 'bg-pf-heading text-white shadow-xl shadow-pf-heading/20' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    Peak hours
                    <div className={`h-2 w-2 rounded-full ${isPeak ? 'bg-pf-primary animate-pulse' : 'bg-slate-300'}`} />
                  </button>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="5"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-pf-primary" 
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'Drive', icon: Car, label: 'Drive' },
                  { id: 'Metro', icon: Train, label: 'Metro' },
                  { id: 'Walk', icon: Footprints, label: 'Walk' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`rounded-3xl border-2 py-6 text-center transition-all duration-300 ${
                      mode === item.id 
                        ? 'border-pf-primary bg-pf-primary/[0.03] text-pf-primary' 
                        : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <item.icon className="mx-auto mb-3" size={24} strokeWidth={2.5} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>

              <button className="w-full rounded-[24px] bg-pf-primary py-6 text-[13px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-pf-primary/30 hover:bg-pf-secondary hover:translate-y-[-2px] active:translate-y-0 transition-all">
                Search Properties In Range
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {topProperties.map((property) => (
              <div key={property.id} className="group rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-2xl hover:border-pf-primary/20 transition-all duration-500 overflow-hidden relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] uppercase tracking-widest font-black text-slate-400">Perfect Match</span>
                  </div>
                  <span className="rounded-xl bg-pf-primary/5 border border-pf-primary/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-pf-primary">
                    Luxury Listing
                  </span>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-3xl font-black text-pf-heading tracking-tight mb-2">AED {property.price}</div>
                    <div className="text-[15px] font-bold text-slate-400">{property.location}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-pf-primary border border-slate-100">
                      <Clock size={22} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-between rounded-2xl bg-pf-primary/5 px-6 py-5 text-[11px] font-black uppercase tracking-[0.15em] text-pf-primary group-hover:bg-pf-primary group-hover:text-white transition-all duration-300">
                  <span className="flex items-center gap-3">
                    <Clock size={16} strokeWidth={2.5} />
                    {time} mins to {location} via {mode}
                  </span>
                  <ChevronRight size={20} strokeWidth={2.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
