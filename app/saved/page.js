'use client';
import Navbar from '@/components/Navbar';
import PropertyGrid from '@/components/PropertyGrid';
import Footer from '@/components/Footer';
import { useListings } from '@/context/ListingContext';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';

export default function SavedPropertiesPage() {
  const { listings, savedProperties } = useListings();
  
  const savedList = listings.filter(p => savedProperties.includes(p.id));

  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="container mx-auto px-4 py-32">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-pf-primary/10 flex items-center justify-center text-pf-primary shadow-inner">
              <Heart size={24} className="fill-pf-primary" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-pf-primary font-black">Your Collection</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-pf-heading tracking-tight leading-tight">Saved Properties</h1>
          <p className="text-pf-muted font-bold mt-4 uppercase tracking-widest text-xs">Total {savedList.length} properties in your wishlist</p>
        </div>

        {savedList.length === 0 ? (
          <div className="rounded-[48px] bg-white border border-slate-100 p-20 text-center shadow-2xl shadow-slate-200/50">
            <div className="mx-auto h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-8">
              <Search size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Your collection is empty</h2>
            <p className="text-slate-400 font-medium mb-10 max-w-md mx-auto leading-relaxed">
              Explore the most exclusive properties in the UAE and save your favorites to view them later.
            </p>
            <Link 
              href="/buy"
              className="inline-flex items-center gap-3 rounded-2xl bg-pf-primary px-10 py-5 text-sm font-black text-white shadow-2xl shadow-pf-primary/20 hover:scale-105 transition-all"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <PropertyGrid listings={savedList} />
        )}
      </main>

      <Footer />
    </div>
  );
}
