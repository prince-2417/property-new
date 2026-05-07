// Force deployment - Fixed build errors
'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import PopularProjectsSection from '@/components/PopularProjectsSection';
import SearchByAreaSection from '@/components/SearchByAreaSection';
import TravelTimeSection from '@/components/TravelTimeSection';
import Footer from '@/components/Footer';
import { useListings } from '@/context/ListingContext';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();
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

      <section id="listings-results" className="reveal container mx-auto px-4 py-24">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Curated Collection</p>
            <h2 className="editorial-heading text-pf-heading">Elite <br /><span className="italic font-light text-white">Residences</span></h2>
          </div>
          <button className="btn-pill btn-primary">
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

      <div className="reveal">
        <PopularProjectsSection />
      </div>
      <div className="reveal">
        <SearchByAreaSection />
      </div>
      <div className="reveal">
        <TravelTimeSection />
      </div>
      <div className="reveal">
        <Footer />
      </div>
      </main>
    </div>
  );
}

