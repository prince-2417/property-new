// Force deployment - Fixed build errors
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import PopularProjectsSection from '@/components/PopularProjectsSection';
import SearchByAreaSection from '@/components/SearchByAreaSection';
import TravelTimeSection from '@/components/TravelTimeSection';
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

      <section id="listings-results" className="container mx-auto px-4 py-24">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-pf-primary font-extrabold mb-4">Curated Collection</p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-pf-heading tracking-tighter leading-tight">Elite Residences</h2>
          </div>
          <button className="px-10 py-5 rounded-2xl bg-pf-heading text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-pf-primary hover:translate-y-[-2px] transition-all shadow-2xl shadow-slate-200">
            Explore All Listings
          </button>
        </div>

        <FilterBar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          filters={filters}
          onFilterChange={setFilters}
        />
        <PropertyGrid listings={filteredProperties} />
      </section>

      <PopularProjectsSection />
      
      <SearchByAreaSection />

      <TravelTimeSection />

      <Footer />
      </main>
    </div>
  );
}

