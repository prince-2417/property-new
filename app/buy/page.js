'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import { useListings } from '@/context/ListingContext';

export default function BuyPage() {
  const { listings } = useListings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    beds: '',
    priceRange: ''
  });

  const filteredProperties = listings.filter(property => {
    // Only show "For Sale" properties
    if (property.transaction !== 'For Sale') return false;

    // Category filter
    if (activeCategory !== 'All' && property.type !== activeCategory) return false;

    // Sub filters
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.beds) {
      if (filters.beds === '4' && parseInt(property.bedrooms) < 4) return false;
      if (filters.beds !== '4' && property.bedrooms.toString() !== filters.beds) return false;
    }
    if (filters.priceRange) {
      const price = parseInt(property.price.replace(/,/g, ''));
      if (filters.priceRange === '0-1000000' && price > 1000000) return false;
      if (filters.priceRange === '1000000-3000000' && (price < 1000000 || price > 3000000)) return false;
      if (filters.priceRange === '3000000-5000000' && (price < 3000000 || price > 5000000)) return false;
      if (filters.priceRange === '5000000+' && price < 5000000) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="bg-white border-b border-gray-100 py-12 mb-8">
          <div className="container mx-auto px-4">
            <nav className="flex mb-4 text-[10px] font-black text-pf-muted uppercase tracking-[0.2em]">
              <span className="hover:text-pf-primary transition cursor-pointer">UAE</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-pf-primary">Properties for sale</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black text-pf-heading mb-4 tracking-tight">Properties for sale in UAE</h1>
            <p className="text-pf-muted max-w-2xl font-medium leading-relaxed">Explore thousands of verified apartments, villas, and townhouses for sale across Dubai, Abu Dhabi, and beyond.</p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <FilterBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
            filters={filters}
            onFilterChange={setFilters}
          />
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Showing <span className="text-pf-heading font-black">{filteredProperties.length}</span> properties
                </p>
                <div className="flex items-center gap-3 text-sm font-black text-pf-heading">
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">Sort by:</span>
                  <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-pf-primary font-black">
                    <option>Newest</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                  </select>
                </div>
              </div>
              <PropertyGrid listings={filteredProperties} />
            </div>

            <aside className="w-full lg:w-96 space-y-8">
              <div className="rounded-[40px] p-8 border border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
                <div className="h-14 w-14 rounded-2xl bg-pf-primary/10 flex items-center justify-center text-pf-primary mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-pf-heading mb-3">Mortgage Estimate</h3>
                <p className="text-sm text-pf-muted mb-8 font-medium leading-relaxed">Get an instant estimate for your monthly repayments with our integrated calculator.</p>
                <div className="space-y-6">
                  <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-pf-primary w-2/3 shadow-[0_0_15px_rgba(239,33,48,0.3)]" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-pf-heading tracking-tight">AED 5,400 <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">/mo</span></span>
                    <button className="text-xs font-black text-pf-primary uppercase tracking-widest hover:underline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="rounded-[40px] p-8 border border-slate-100 bg-pf-primary text-white shadow-2xl shadow-pf-primary/20">
                <h3 className="text-xl font-black mb-3">Area Insights</h3>
                <p className="text-sm text-white/80 mb-8 font-medium leading-relaxed">Discover price trends and community highlights in this area to make an informed decision.</p>
                <button className="w-full py-4 rounded-2xl bg-white text-pf-primary text-sm font-black uppercase tracking-widest hover:scale-105 transition-all">Explore Trends</button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
