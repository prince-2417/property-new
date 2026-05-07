'use client';
import PropertyCard from './PropertyCard';
import { Building2 } from 'lucide-react';

export default function PropertyGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-pf-surface border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-pf-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="text-white/10 mb-8 relative z-10">
          <Building2 size={64} className="mx-auto" />
        </div>
        <h3 className="text-3xl font-serif italic text-pf-heading relative z-10">No residences found</h3>
        <p className="text-white/30 mt-4 font-medium uppercase tracking-[0.2em] text-[10px] relative z-10">Refine your search criteria for alternative options</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {listings.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
