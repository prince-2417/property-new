'use client';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ activeCategory, onCategoryChange, filters, onFilterChange }) {
  const categories = ['All', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial'];

  const handleSubFilterChange = (name, value) => {
    onFilterChange?.({ ...filters, [name]: value });
  };

  return (
    <div className="mb-20 space-y-12">
      <div className="flex items-center gap-10 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange?.(cat)}
            className={`flex-shrink-0 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 relative pb-4 ${
              activeCategory === cat 
                ? 'text-white' 
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <div className="absolute bottom-0 left-0 w-full h-px bg-pf-accent animate-in slide-in-from-left duration-500" />
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-px bg-white/5 lg:grid-cols-4 border border-white/5 shadow-2xl">
        {/* Area Filter */}
        <div className="relative group bg-pf-surface hover:bg-[#1a1a1a] transition-all overflow-hidden">
          <select 
            value={filters?.location || ''}
            onChange={(e) => handleSubFilterChange('location', e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
          >
            <option value="">Any Area</option>
            <option value="Dubai Marina">Dubai Marina</option>
            <option value="Downtown Dubai">Downtown Dubai</option>
            <option value="Palm Jumeirah">Palm Jumeirah</option>
          </select>
          <div className="flex items-center justify-between px-8 py-6 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Location</span>
              <span className="text-[13px] font-medium text-white">
                {filters?.location || 'Select Area'}
              </span>
            </div>
            <ChevronDown size={14} className="text-white/20 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Price Filter */}
        <div className="relative group bg-pf-surface hover:bg-[#1a1a1a] transition-all overflow-hidden">
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
          <div className="flex items-center justify-between px-8 py-6 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Price Range</span>
              <span className="text-[13px] font-medium text-white">
                {filters?.priceRange ? filters.priceRange.replace('-', ' - ') : 'Any Price'}
              </span>
            </div>
            <ChevronDown size={14} className="text-white/20 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="relative group bg-pf-surface hover:bg-[#1a1a1a] transition-all overflow-hidden">
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
          <div className="flex items-center justify-between px-8 py-6 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Bedrooms</span>
              <span className="text-[13px] font-medium text-white">
                {filters?.beds ? `${filters.beds} Bedrooms` : 'Any Size'}
              </span>
            </div>
            <ChevronDown size={14} className="text-white/20 group-hover:text-white transition-colors" />
          </div>
        </div>

        <button className="flex items-center justify-center gap-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-pf-accent hover:text-white transition-all">
          Apply Filter
        </button>
      </div>
    </div>
  );
}
