// Force deployment - Fixed build errors
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import TravelTimeSection from '@/components/TravelTimeSection';
import SearchByAreaSection from '@/components/SearchByAreaSection';
import Footer from '@/components/Footer';
import { useListings } from '@/context/ListingContext';

export default function Home() {
  const { listings } = useListings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    beds: '',
    priceRange: ''
  });

  const filteredProperties = listings.filter(property => {
    // Category filter (from FilterBar buttons)
    if (activeCategory !== 'All' && property.type !== activeCategory) return false;

    // Sub filters (Area, Price, Beds)
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.beds) {
      const propertyBeds = property.bedrooms || property.beds || 0;
      if (filters.beds === '4' && parseInt(propertyBeds) < 4) return false;
      if (filters.beds !== '4' && propertyBeds.toString() !== filters.beds) return false;
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
      <main>
        <Navbar />
        <Hero onSearch={setFilters} />

      <section id="listings-results" className="container mx-auto px-4 py-16">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-pf-primary font-black mb-3">Verified listings</p>
            <h2 className="text-4xl md:text-5xl font-black text-pf-heading tracking-tight leading-tight">Discover premium properties</h2>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-pf-primary transition-all shadow-xl shadow-slate-200">View all listings</button>
        </div>

        <FilterBar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          filters={filters}
          onFilterChange={setFilters}
        />
        <PropertyGrid listings={filteredProperties} />
      </section>

      <TravelTimeSection />

      <Footer />
      </main>
    </div>
  );
}
