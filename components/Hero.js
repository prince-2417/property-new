'use client';
import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Hero({ onSearch }) {
  const [activeTab, setActiveTab] = useState('Buy');
  const [filters, setFilters] = useState({
    location: '',
    type: 'Apartment',
    beds: 'Any'
  });

  const handleSearch = () => {
    onSearch?.(filters);
    // Smooth scroll to results
    document.getElementById('listings-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2070" 
          alt="Dubai Skyline" 
          className="h-full w-full object-cover opacity-60 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-3 rounded-full bg-pf-primary/20 border border-pf-primary/30 px-4 py-2 text-pf-primary mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pf-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pf-primary"></span>
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black">Find your ideal home in UAE</p>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              Discover the <span className="text-pf-primary">Perfect</span> <br />
              Place to Live.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-12 max-w-xl font-medium">
              Explore thousands of verified listings for sale and rent with exclusive insights and advanced filtering.
            </p>

            <div className="rounded-[40px] bg-white/10 border border-white/20 shadow-2xl p-8 backdrop-blur-2xl">
              <div className="flex gap-10 border-b border-white/10 mb-8">
                {['Buy', 'Rent', 'Commercial'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-5 text-sm font-black uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-pf-primary' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-pf-primary rounded-full animate-in fade-in slide-in-from-bottom-1" />
                    )}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_0.6fr]">
                <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 focus-within:bg-white/10 focus-within:border-pf-primary transition-all group">
                  <Search size={22} className="text-white/40 group-focus-within:text-pf-primary" />
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Location</p>
                    <input 
                      type="text" 
                      value={filters.location}
                      onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                      placeholder="City or community" 
                      className="w-full bg-transparent border-none outline-none text-sm font-black text-white placeholder:text-white/30" 
                    />
                  </div>
                </div>

                <div className="relative group rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden">
                  <select 
                    value={filters.type}
                    onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                  >
                    <option className="bg-slate-900 text-white" value="Apartment">Apartment</option>
                    <option className="bg-slate-900 text-white" value="Villa">Villa</option>
                    <option className="bg-slate-900 text-white" value="Townhouse">Townhouse</option>
                    <option className="bg-slate-900 text-white" value="Penthouse">Penthouse</option>
                  </select>
                  <div className="flex items-center justify-between gap-4 px-6 py-4 relative z-10">
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Type</p>
                      <span className="text-sm font-black text-white">{filters.type}</span>
                    </div>
                    <ChevronDown size={18} className="text-white/40 group-hover:text-pf-primary transition-colors" />
                  </div>
                </div>

                <div className="relative group rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden">
                  <select 
                    value={filters.beds}
                    onChange={(e) => setFilters(f => ({ ...f, beds: e.target.value }))}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                  >
                    <option className="bg-slate-900 text-white" value="Any">Any</option>
                    <option className="bg-slate-900 text-white" value="1">1 Bed</option>
                    <option className="bg-slate-900 text-white" value="2">2 Beds</option>
                    <option className="bg-slate-900 text-white" value="3">3 Beds</option>
                    <option className="bg-slate-900 text-white" value="4">4+ Beds</option>
                  </select>
                  <div className="flex items-center justify-between gap-4 px-6 py-4 relative z-10">
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Beds</p>
                      <span className="text-sm font-black text-white">{filters.beds === 'Any' ? 'Any' : `${filters.beds} Beds`}</span>
                    </div>
                    <ChevronDown size={18} className="text-white/40 group-hover:text-pf-primary transition-colors" />
                  </div>
                </div>

                <button 
                  onClick={handleSearch}
                  className="bg-pf-primary text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-pf-primary/40 hover:scale-105 active:scale-95 transition-all py-5 ring-offset-slate-900 focus:ring-2 focus:ring-pf-primary"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:grid gap-6 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-pf-primary flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black text-pf-primary uppercase tracking-widest">Market Insights</p>
                  <h3 className="text-xl font-black text-white">Market is Up</h3>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="rounded-3xl bg-white/5 border border-white/5 p-6">
                  <p className="text-4xl font-black text-white tracking-tighter">342+</p>
                  <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">New Listings Today</p>
                </div>
                <div className="rounded-3xl bg-white/5 border border-white/5 p-6">
                  <p className="text-4xl font-black text-white tracking-tighter">4.9/5</p>
                  <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
