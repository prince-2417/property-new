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
    <section className="bg-pf-background py-32 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Intelligence</p>
          <h2 className="editorial-heading text-pf-heading">Location <br /><span className="italic font-light text-white">Insights</span></h2>
        </div>

        <div className="grid gap-20 lg:grid-cols-[1fr_1.3fr]">
          <div className="pf-card p-12 bg-pf-surface border-white/5 shadow-2xl">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-widest px-1">
                  <MapPin size={16} className="text-pf-accent" />
                  <span>Destination</span>
                </div>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?" 
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-6 text-[15px] font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none" 
                />
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-black text-white/20 mb-3">Travel Window</p>
                    <p className="text-4xl font-normal text-white font-serif italic tracking-tight">{time} <span className="text-lg">mins</span></p>
                  </div>
                  <button 
                    onClick={() => setIsPeak(!isPeak)}
                    className={`btn-pill px-6 py-3 text-[9px] ${
                      isPeak ? 'bg-white text-black' : 'border border-white/10 text-white/30'
                    }`}
                  >
                    Peak hours
                  </button>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  step="5"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  className="w-full h-px bg-white/10 appearance-none cursor-pointer accent-white" 
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { id: 'Drive', icon: Car, label: 'Drive' },
                  { id: 'Metro', icon: Train, label: 'Metro' },
                  { id: 'Walk', icon: Footprints, label: 'Walk' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`py-8 flex flex-col items-center justify-center border transition-all duration-500 ${
                      mode === item.id 
                        ? 'border-white text-white' 
                        : 'border-white/5 text-white/20 hover:border-white/20'
                    }`}
                  >
                    <item.icon className="mb-4" size={24} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">{item.label}</span>
                  </button>
                ))}
              </div>

              <button className="w-full btn-pill btn-primary text-black py-6">
                Discover Residences in Range
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {topProperties.map((property) => (
              <div key={property.id} className="pf-card p-10 bg-pf-surface border-white/5 hover:border-white/20 transition-all duration-700">
                <div className="flex justify-between items-end">
                  <div className="space-y-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{property.location}</p>
                    <h3 className="font-serif text-3xl text-white leading-tight group-hover:italic transition-all">AED {property.price}</h3>
                  </div>
                  <div className="h-16 w-16 border border-white/10 flex items-center justify-center text-pf-accent">
                    <Clock size={24} />
                  </div>
                </div>
                
                <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    <span className="text-pf-accent italic font-serif text-xl normal-case">{time}m</span>
                    <span className="opacity-30">to</span>
                    <span>{location}</span>
                    <span className="opacity-30">via</span>
                    <span>{mode}</span>
                  </div>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
