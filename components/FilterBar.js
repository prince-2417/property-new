'use client';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ activeCategory, onCategoryChange, filters, onFilterChange }) {
  const categories = ['All', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial'];

  const handleSubFilterChange = (name, value) => {
    onFilterChange?.({ ...filters, [name]: value });
  };

  return (
    <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50">
      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0 md:flex-wrap md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange?.(cat)}
            className={`flex-shrink-0 rounded-full px-6 py-3 text-[12px] md:text-[13px] font-black transition-all duration-300 uppercase tracking-widest ${
              activeCategory === cat 
                ? 'bg-pf-primary text-white shadow-xl shadow-pf-primary/20 scale-105' 
                : 'border border-slate-100 bg-slate-50 text-slate-400 hover:border-pf-primary/30 hover:bg-white hover:text-pf-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Area Filter */}
        <div className="relative group rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-pf-primary/30 transition-all overflow-hidden">
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
          <div className="flex items-center justify-between px-5 py-3.5 relative z-10">
            <span className={`text-sm font-black uppercase tracking-widest ${filters?.location ? 'text-pf-primary' : 'text-slate-400'}`}>
              {filters?.location || 'Area'}
            </span>
            <ChevronDown size={18} className="text-slate-300 group-hover:text-pf-primary" />
          </div>
        </div>

        {/* Price Filter */}
        <div className="relative group rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-pf-primary/30 transition-all overflow-hidden">
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
          <div className="flex items-center justify-between px-5 py-3.5 relative z-10">
            <span className={`text-sm font-black uppercase tracking-widest ${filters?.priceRange ? 'text-pf-primary' : 'text-slate-400'}`}>
              {filters?.priceRange ? filters.priceRange.replace('-', ' - ') : 'Price'}
            </span>
            <ChevronDown size={18} className="text-slate-300 group-hover:text-pf-primary" />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="relative group rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-pf-primary/30 transition-all overflow-hidden">
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
          <div className="flex items-center justify-between px-5 py-3.5 relative z-10">
            <span className={`text-sm font-black uppercase tracking-widest ${filters?.beds ? 'text-pf-primary' : 'text-slate-400'}`}>
              {filters?.beds ? `${filters.beds} Beds` : 'Bedrooms'}
            </span>
            <ChevronDown size={18} className="text-slate-300 group-hover:text-pf-primary" />
          </div>
        </div>

        <button className="flex items-center justify-between rounded-2xl border border-pf-primary bg-pf-primary px-6 py-3.5 text-[13px] font-black uppercase tracking-[0.2em] text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pf-primary/20">
          <span>More Filters</span>
          <SlidersHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
