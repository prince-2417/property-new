'use client';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ activeCategory, onCategoryChange, filters, onFilterChange }) {
  const categories = ['All', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial'];

  const handleSubFilterChange = (name, value) => {
    onFilterChange?.({ ...filters, [name]: value });
  };

  return (
    <div className="mb-14 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange?.(cat)}
            className={`flex-shrink-0 rounded-2xl px-8 py-4 text-[12px] font-black transition-all duration-300 uppercase tracking-[0.2em] ${
              activeCategory === cat 
                ? 'bg-pf-primary text-white shadow-[0_12px_24px_-8px_rgba(37,99,235,0.5)] scale-[1.02]' 
                : 'border border-slate-100 bg-white text-slate-400 hover:border-pf-primary/30 hover:text-pf-primary hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-4 p-3 bg-white/50 backdrop-blur-md rounded-[32px] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.05)]">
        {/* Area Filter */}
        <div className="relative group rounded-2xl border border-slate-100 bg-white hover:border-pf-primary/30 transition-all overflow-hidden p-1">
          <select 
            value={filters?.location || ''}
            onChange={(e) => handleSubFilterChange('location', e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
          >
            <option value="">Any Area</option>
            <option value="Dubai Marina">Dubai Marina</option>
            <option value="Downtown Dubai">Downtown Dubai</option>
            <option value="Palm Jumeirah">Palm Jumeirah</option>
            <option value="Business Bay">Business Bay</option>
            <option value="JVC">JVC</option>
          </select>
          <div className="flex items-center justify-between px-6 py-4 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Neighborhood</span>
              <span className={`text-[14px] font-bold ${filters?.location ? 'text-pf-primary' : 'text-pf-heading'}`}>
                {filters?.location || 'Select Area'}
              </span>
            </div>
            <ChevronDown size={18} className="text-slate-300 group-hover:text-pf-primary transition-colors" />
          </div>
        </div>

        {/* Price Filter */}
        <div className="relative group rounded-2xl border border-slate-100 bg-white hover:border-pf-primary/30 transition-all overflow-hidden p-1">
          <select 
            value={filters?.priceRange || ''}
            onChange={(e) => handleSubFilterChange('priceRange', e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
          >
            <option value="">Any Price</option>
            <option value="0-1000000">Under 1M AED</option>
            <option value="1000000-3000000">1M - 3M AED</option>
            <option value="3000000-5000000">3M - 5M AED</option>
            <option value="5000000+">5M+ AED</option>
          </select>
          <div className="flex items-center justify-between px-6 py-4 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Budget Range</span>
              <span className={`text-[14px] font-bold ${filters?.priceRange ? 'text-pf-primary' : 'text-pf-heading'}`}>
                {filters?.priceRange ? filters.priceRange.replace('-', ' - ') : 'Any Price'}
              </span>
            </div>
            <ChevronDown size={18} className="text-slate-300 group-hover:text-pf-primary transition-colors" />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="relative group rounded-2xl border border-slate-100 bg-white hover:border-pf-primary/30 transition-all overflow-hidden p-1">
          <select 
            value={filters?.beds || ''}
            onChange={(e) => handleSubFilterChange('beds', e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
          >
            <option value="">Any Beds</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
          <div className="flex items-center justify-between px-6 py-4 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Space Needed</span>
              <span className={`text-[14px] font-bold ${filters?.beds ? 'text-pf-primary' : 'text-pf-heading'}`}>
                {filters?.beds ? `${filters.beds} Bedrooms` : 'Any Size'}
              </span>
            </div>
            <ChevronDown size={18} className="text-slate-300 group-hover:text-pf-primary transition-colors" />
          </div>
        </div>

        <button className="flex items-center justify-between rounded-2xl bg-pf-heading px-8 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-white hover:bg-pf-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-200 group">
          <span>Apply Filter</span>
          <SlidersHorizontal size={18} className="group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </div>

  );
}
