'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import { useListings } from '@/context/ListingContext';
import { Calculator, Map as MapIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
    if (property.transaction !== 'For Rent') return false;
    if (activeCategory !== 'All' && property.type !== activeCategory) return false;
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
    <div className="min-h-screen bg-pf-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-32">
        <section className="relative min-h-[60vh] flex items-center py-24 mb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" 
              alt="Elite Rentals" 
              className="h-full w-full object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100 grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-pf-background/20 via-transparent to-pf-background" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <nav className="flex mb-12 text-[10px] font-black text-white/40 uppercase tracking-[0.5em] animate-in fade-in slide-in-from-left-4 duration-1000">
              <Link href="/" className="hover:text-pf-accent transition">UAE</Link>
              <span className="mx-4 text-white/10">/</span>
              <span className="text-pf-accent">Properties for rent</span>
            </nav>
            <div className="max-w-4xl space-y-8">
              <h1 className="font-serif italic text-6xl md:text-8xl text-pf-heading leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Properties for <br />
                <span className="font-normal not-italic text-white">Rent in UAE</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/40 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                Find your perfect rental home from thousands of verified listings including apartments, villas, and short-term rentals.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6">
          <FilterBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
            filters={filters}
            onFilterChange={setFilters}
          />
          
          <div className="flex flex-col xl:flex-row gap-20">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                  Rental Collection <span className="text-pf-accent mx-2">•</span> <span className="text-white">{filteredProperties.length} Options</span>
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Sort By</span>
                  <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-pf-accent font-black text-[10px] uppercase tracking-widest outline-none">
                    <option className="bg-pf-surface">Recommended</option>
                    <option className="bg-pf-surface">Value: Low to High</option>
                    <option className="bg-pf-surface">Value: High to Low</option>
                  </select>
                </div>
              </div>
              <PropertyGrid listings={filteredProperties} />
            </div>

            <aside className="w-full xl:w-[450px] space-y-12">
              {/* Rent vs Buy Card */}
              <div className="bg-pf-surface border border-white/5 p-12 relative overflow-hidden group transition-all duration-700 hover:border-pf-accent/30">
                <div className="flex items-center justify-between mb-10">
                  <div className="h-14 w-14 bg-pf-accent/10 flex items-center justify-center text-pf-accent border border-pf-accent/20">
                    <Calculator size={24} />
                  </div>
                  <ArrowUpRight size={20} className="text-white/10 group-hover:text-pf-accent transition-colors" />
                </div>
                <h3 className="font-serif italic text-3xl text-pf-heading mb-4">Rent vs Buy</h3>
                <p className="text-[13px] text-white/40 mb-10 font-medium leading-relaxed">
                  Should you keep renting or is it time to buy your own home? Get a detailed financial comparison.
                </p>
                <Link 
                  href="/tools"
                  className="w-full py-5 flex items-center justify-center gap-3 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
                >
                  Analyze Finances <ArrowUpRight size={16} />
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
