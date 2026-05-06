'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import { useListings } from '@/context/ListingContext';

export default function RentPage() {
  const { listings } = useListings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    beds: '',
    priceRange: ''
  });

  const filteredProperties = listings.filter(property => {
    // Only show "For Rent" properties
    if (property.transaction !== 'For Rent') return false;

    // Category filter
    if (activeCategory !== 'All' && property.type !== activeCategory) return false;

    // Sub filters
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.beds) {
      const propertyBeds = property.bedrooms || property.beds || 0;
      if (filters.beds === '4' && parseInt(propertyBeds) < 4) return false;
      if (filters.beds !== '4' && propertyBeds.toString() !== filters.beds) return false;
    }
    if (filters.priceRange) {
      const price = parseInt(property.price.replace(/,/g, ''));
      // Adjust price logic for rent (prices are usually lower, but let's use the same ranges for consistency or simplify)
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
              <span className="text-pf-primary">Properties for rent</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black text-pf-heading mb-4 tracking-tight">Properties for rent in UAE</h1>
            <p className="text-pf-muted max-w-2xl font-medium leading-relaxed">Find your perfect rental home from thousands of verified listings including apartments, villas, and short-term rentals.</p>
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
                  Showing <span className="text-pf-heading font-black">{filteredProperties.length}</span> rental options
                </p>
                <div className="flex items-center gap-3 text-sm font-black text-pf-heading">
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">Sort by:</span>
                  <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-pf-primary font-black">
                    <option>Recommended</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                  </select>
                </div>
              </div>
              <PropertyGrid listings={filteredProperties} />
            </div>

            <aside className="w-full lg:w-96 space-y-8">
              <div className="rounded-[40px] p-8 border border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
                <h3 className="text-xl font-black text-pf-heading mb-3">Rent vs Buy</h3>
                <p className="text-sm text-pf-muted mb-8 font-medium leading-relaxed">Should you keep renting or is it time to buy your own home? Get a detailed comparison.</p>
                <button className="w-full py-4 rounded-2xl bg-pf-primary text-white text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-pf-primary/20">Use Calculator</button>
              </div>

              <div className="rounded-[40px] p-8 border border-slate-100 bg-slate-900 text-white shadow-2xl shadow-slate-900/20">
                <h3 className="text-xl font-black mb-3">Rental Price Map</h3>
                <p className="text-sm text-white/70 mb-8 font-medium leading-relaxed">See how much others are paying for rent in different neighborhoods across the UAE.</p>
                <button className="w-full py-4 rounded-2xl bg-white text-slate-900 text-sm font-black uppercase tracking-widest hover:scale-105 transition-all">View Price Map</button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
