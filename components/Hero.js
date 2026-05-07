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
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-[#0f172a]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2070" 
          alt="Dubai Skyline" 
          className="h-full w-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] items-center">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center gap-3 rounded-full bg-pf-primary/10 border border-pf-primary/20 px-5 py-2.5 text-pf-primary mb-10 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pf-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pf-primary"></span>
              </span>
              <p className="text-[11px] uppercase tracking-[0.4em] font-extrabold">Exclusive Real Estate in UAE</p>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-8 tracking-tighter">
              Your Journey to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pf-primary to-pf-accent">Luxury Living</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-12 max-w-xl font-medium">
              Experience the pinnacle of real estate with our curated collection of verified premium properties.
            </p>

            <div className="rounded-[32px] md:rounded-[48px] bg-white/5 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-6 md:p-10 backdrop-blur-3xl">
              <div className="flex gap-8 md:gap-12 border-b border-white/5 mb-8 overflow-x-auto scrollbar-hide whitespace-nowrap">
                {['Buy', 'Rent', 'Commercial'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-5 text-[12px] font-black uppercase tracking-[0.2em] transition-all relative ${
                      activeTab === tab ? 'text-pf-primary' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pf-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr_0.6fr]">
                <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4.5 focus-within:bg-white/[0.07] focus-within:border-pf-primary/50 transition-all group">
                  <Search size={20} className="text-white/30 group-focus-within:text-pf-primary" />
                  <div className="flex-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1.5">Location</p>
                    <input 
                      type="text" 
                      value={filters.location}
                      onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                      placeholder="City, Community, Project" 
                      className="w-full bg-transparent border-none outline-none text-[15px] font-bold text-white placeholder:text-white/20" 
                    />
                  </div>
                </div>

                <div className="relative group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] transition-all overflow-hidden">
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
                  <div className="flex items-center justify-between gap-4 px-6 py-4.5 relative z-10">
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1.5">Property Type</p>
                      <span className="text-[15px] font-bold text-white">{filters.type}</span>
                    </div>
                    <ChevronDown size={16} className="text-white/30 group-hover:text-pf-primary transition-colors" />
                  </div>
                </div>

                <div className="relative group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] transition-all overflow-hidden">
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
                  <div className="flex items-center justify-between gap-4 px-6 py-4.5 relative z-10">
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1.5">Bedrooms</p>
                      <span className="text-[15px] font-bold text-white">{filters.beds === 'Any' ? 'Any' : `${filters.beds} Beds`}</span>
                    </div>
                    <ChevronDown size={16} className="text-white/30 group-hover:text-pf-primary transition-colors" />
                  </div>
                </div>

                <button 
                  onClick={handleSearch}
                  className="bg-pf-primary text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-pf-primary/30 hover:bg-pf-secondary hover:scale-[1.02] active:scale-[0.98] transition-all py-5"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:grid gap-8 animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
            <div className="rounded-[40px] border border-white/10 bg-white/[0.02] p-10 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-5 mb-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pf-primary to-pf-accent flex items-center justify-center text-white shadow-lg shadow-pf-primary/20">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-pf-primary uppercase tracking-[0.3em] mb-1">Market Insights</p>
                  <h3 className="text-2xl font-black text-white tracking-tight">Market Outlook</h3>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="rounded-3xl bg-white/[0.03] border border-white/5 p-8 transition-colors hover:bg-white/[0.05]">
                  <p className="text-5xl font-black text-white tracking-tighter">342+</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-[0.2em]">New Listings Today</p>
                </div>
                <div className="rounded-3xl bg-white/[0.03] border border-white/5 p-8 transition-colors hover:bg-white/[0.05]">
                  <p className="text-5xl font-black text-white tracking-tighter">4.9/5</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-[0.2em]">User Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap gap-8 md:gap-16 border-t border-white/10 pt-10">
          {[
            { label: 'Total Properties', value: '12k+' },
            { label: 'Happy Customers', value: '8k+' },
            { label: 'Verified Agents', value: '450+' },
            { label: 'Awards Won', value: '25+' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
