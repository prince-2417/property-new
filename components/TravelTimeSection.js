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
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pf-primary mb-3">Location Intelligence</p>
          <h2 className="text-4xl font-black text-pf-heading tracking-tight">Search by travel times</h2>
        </div>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[32px] md:rounded-[48px] border border-slate-200 bg-white p-6 md:p-10 shadow-2xl shadow-slate-200/50">
            <div className="space-y-6 md:space-y-8">
              <div className="rounded-[24px] md:rounded-[32px] border border-slate-100 bg-slate-50 p-5 md:p-6">
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-black text-slate-900 mb-3 md:mb-4 uppercase tracking-widest">
                  <MapPin size={16} className="text-pf-primary" />
                  <span>Destination Point</span>
                </div>
                <div className="rounded-xl md:rounded-2xl border border-slate-200 bg-white px-4 md:px-6 py-3 md:py-4 text-sm shadow-inner">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where are you going?" 
                    className="w-full bg-transparent outline-none font-bold text-pf-heading placeholder:text-slate-300" 
                  />
                </div>
              </div>

              <div className="rounded-[24px] md:rounded-[32px] border border-slate-100 bg-slate-50 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 md:mb-8">
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1 md:mb-2">Max travel time</p>
                    <p className="text-2xl md:text-3xl font-black text-pf-primary tracking-tighter">{time} mins</p>
                  </div>
                  <button 
                    onClick={() => setIsPeak(!isPeak)}
                    className={`inline-flex items-center justify-center gap-3 rounded-full px-5 py-2.5 md:px-6 md:py-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                      isPeak ? 'bg-pf-heading text-white' : 'bg-white text-slate-400 border border-slate-100'
                    }`}
                  >
                    Peak hours
                    <div className={`h-2 w-2 rounded-full ${isPeak ? 'bg-pf-primary animate-pulse' : 'bg-slate-200'}`} />
                  </button>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="5"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pf-primary" 
                />
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  { id: 'Drive', icon: Car, label: 'Drive' },
                  { id: 'Metro', icon: Train, label: 'Metro' },
                  { id: 'Walk', icon: Footprints, label: 'Walk' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`rounded-2xl md:rounded-3xl border py-4 md:py-6 text-center transition-all duration-300 ${
                      mode === item.id 
                        ? 'border-pf-primary bg-pf-primary/5 text-pf-primary shadow-lg shadow-pf-primary/10' 
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                    }`}
                  >
                    <item.icon className="mx-auto mb-2 md:mb-3" size={24} />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>

              <button className="mt-2 w-full rounded-2xl md:rounded-[24px] bg-pf-primary px-6 py-4 md:px-8 md:py-5 text-[11px] md:text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-pf-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Find properties in range
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:gap-6">
            {topProperties.map((property) => (
              <div key={property.id} className="group rounded-[32px] md:rounded-[40px] border border-slate-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-2xl hover:border-pf-primary/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-slate-400">Available Now</span>
                  </div>
                  <span className="rounded-lg bg-pf-heading px-3 py-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">
                    Premium
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-pf-heading tracking-tight">AED {property.price}</div>
                    <div className="text-xs md:text-sm font-bold text-slate-400 mt-1">{property.location}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl border border-slate-100 flex items-center justify-center text-pf-primary hover:bg-pf-primary hover:text-white transition-all shadow-sm">
                      <Clock size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-8 flex items-center justify-between rounded-2xl md:rounded-3xl bg-slate-50 px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-pf-primary group-hover:bg-pf-primary/5 transition-colors">
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {time}m to {location} via {mode}
                  </span>
                  <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
