'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import PropertyGrid from '@/components/PropertyGrid';
import { useListings } from '@/context/ListingContext';
import { Calculator, TrendingUp, ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';

export default function BuyPage() {
  const { listings } = useListings();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMortgageDetails, setShowMortgageDetails] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    beds: '',
    priceRange: ''
  });

  const filteredProperties = listings.filter(property => {
    if (property.transaction !== 'For Sale') return false;
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
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070" 
              alt="Elite Residences" 
              className="h-full w-full object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100 grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-pf-background/20 via-transparent to-pf-background" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <nav className="flex mb-12 text-[10px] font-black text-white/40 uppercase tracking-[0.5em] animate-in fade-in slide-in-from-left-4 duration-1000">
              <Link href="/" className="hover:text-pf-accent transition">UAE</Link>
              <span className="mx-4 text-white/10">/</span>
              <span className="text-pf-accent">Properties for sale</span>
            </nav>
            <div className="max-w-4xl space-y-8">
              <h1 className="font-serif italic text-6xl md:text-8xl text-pf-heading leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Properties for <br />
                <span className="font-normal not-italic text-white">Sale in UAE</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/40 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                Explore thousands of verified apartments, villas, and townhouses for sale across Dubai, Abu Dhabi, and beyond.
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
                  Curated Inventory <span className="text-pf-accent mx-2">•</span> <span className="text-white">{filteredProperties.length} Results</span>
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Sort By</span>
                  <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-pf-accent font-black text-[10px] uppercase tracking-widest outline-none">
                    <option className="bg-pf-surface">Newest Arrival</option>
                    <option className="bg-pf-surface">Value: Low to High</option>
                    <option className="bg-pf-surface">Value: High to Low</option>
                  </select>
                </div>
              </div>
              <PropertyGrid listings={filteredProperties} cols={2} />
            </div>

            <aside className="w-full xl:w-[450px] space-y-12">
              {/* Mortgage Card */}
              <div className="bg-pf-surface border border-white/5 p-12 relative overflow-hidden group transition-all duration-700 hover:border-pf-accent/30">
                <div className="flex items-center justify-between mb-10">
                  <div className="h-14 w-14 bg-pf-accent/10 flex items-center justify-center text-pf-accent border border-pf-accent/20">
                    <Calculator size={24} />
                  </div>
                  <ArrowUpRight size={20} className="text-white/10 group-hover:text-pf-accent transition-colors" />
                </div>
                <h3 className="font-serif italic text-3xl text-pf-heading mb-4">Mortgage Estimate</h3>
                <p className="text-[13px] text-white/40 mb-10 font-medium leading-relaxed">
                  Get an instant estimate for your monthly repayments with our integrated calculator.
                </p>
                
                <div className="space-y-8">
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Estimated Repayment</p>
                      <p className="text-3xl font-serif italic text-white tracking-tight">AED 5,400 <span className="text-[10px] font-sans not-italic text-white/20 uppercase tracking-widest">/mo</span></p>
                    </div>
                    <button 
                      onClick={() => setShowMortgageDetails(true)}
                      className="text-[10px] font-black text-pf-accent uppercase tracking-widest hover:text-white transition-colors border-b border-pf-accent/30 pb-1"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Mortgage Details Expansion */}
                {showMortgageDetails && (
                  <div className="absolute inset-0 bg-pf-surface z-20 p-12 flex flex-col justify-between animate-in fade-in slide-in-from-right duration-500">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="font-serif italic text-2xl text-pf-heading">Repayment Breakdown</h4>
                      <button onClick={() => setShowMortgageDetails(false)} className="text-white/20 hover:text-white">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between text-[11px] font-medium border-b border-white/5 pb-4">
                        <span className="text-white/40">Principal & Interest</span>
                        <span className="text-white">AED 4,850</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-medium border-b border-white/5 pb-4">
                        <span className="text-white/40">Property Tax</span>
                        <span className="text-white">AED 350</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-medium border-b border-white/5 pb-4">
                        <span className="text-white/40">Home Insurance</span>
                        <span className="text-white">AED 200</span>
                      </div>
                    </div>
                    <button className="btn-pill btn-primary w-full py-4 text-black text-[11px]">Contact Advisor</button>
                  </div>
                )}
              </div>

              {/* Area Insights Card */}
              <div className="bg-pf-accent border border-pf-accent p-12 group transition-all duration-700 hover:bg-pf-heading">
                <div className="flex items-center justify-between mb-10">
                  <div className="h-14 w-14 bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <h3 className="font-serif italic text-3xl text-white mb-4">Area Insights</h3>
                <p className="text-[13px] text-white/70 mb-10 font-medium leading-relaxed">
                  Discover price trends and community highlights in this area to make an informed decision.
                </p>
                <Link 
                  href="/tools"
                  className="w-full py-5 flex items-center justify-center gap-3 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500"
                >
                  Explore Trends <ArrowUpRight size={16} />
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
