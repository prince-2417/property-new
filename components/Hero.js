'use client';
import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Hero({ onSearch }) {
  const [filters, setFilters] = useState({
    location: '',
    type: 'Apartment',
    beds: 'Any'
  });

  const handleSearch = () => {
    onSearch?.(filters);
    document.getElementById('listings-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  
  return (
    <section className="relative min-h-[110vh] flex items-center pt-20 pb-10 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Residence" 
          className="h-full w-full object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100 grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-pf-background/20 via-transparent to-pf-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* <div className="inline-flex items-center gap-4 py-2 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="h-2 w-2 rounded-full bg-pf-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">ELYSE RESIDENCE • COLLECTION 2024</span>
          </div> */}

          <h1 className="editorial-heading text-pf-heading animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 text-4xl sm:text-6xl md:text-8xl">
            Elevating the <br />
            <span className="italic font-light opacity-80">Standard of Luxury</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            A curated selection of the most exclusive residences across the UAE's most prestigious locations.
          </p>
        </div>

        {/* Minimalist Search Bar */}
        <div className="mt-16 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
          <div className="pf-card p-4 md:p-6 bg-white/[0.03] backdrop-blur-3xl border-white/5 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full px-6 py-4 flex flex-col gap-1 border-r border-white/10">
              <span className="text-[10px] font-black text-pf-heading/50 uppercase tracking-widest">Location</span>
              <input 
                type="text" 
                placeholder="Where would you like to live?"
                className="bg-transparent border-none outline-none text-pf-heading font-medium placeholder:text-pf-heading/40 w-full text-base"
                value={filters.location}
                onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
              />
            </div>
            <div className="w-full md:w-56 px-6 py-4 flex flex-col gap-1 border-r border-white/10 relative">
              <span className="text-[10px] font-black text-pf-heading/50 uppercase tracking-widest">Type</span>
              <select 
                className="bg-transparent border-none outline-none text-pf-heading font-medium cursor-pointer w-full text-base appearance-none relative z-10"
                value={filters.type}
                onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
              >
                <option value="Apartment" className="bg-pf-surface text-pf-heading">Apartment</option>
                <option value="Villa" className="bg-pf-surface text-pf-heading">Villa</option>
                <option value="Penthouse" className="bg-pf-surface text-pf-heading">Penthouse</option>
                <option value="Townhouse" className="bg-pf-surface text-pf-heading">Townhouse</option>
              </select>
              <div className="absolute right-6 bottom-5 pointer-events-none text-pf-heading/30">
                <ChevronDown size={14} />
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto btn-pill btn-primary px-14 py-6 text-black hover:bg-pf-accent hover:text-white transition-all shadow-2xl"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <button className="btn-pill btn-primary text-black">
            Explore Projects
          </button>
          <button className="btn-pill btn-outline">
            Private Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
