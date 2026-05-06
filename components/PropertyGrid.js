'use client';
import PropertyCard from './PropertyCard';

export default function PropertyGrid({ listings }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
        <div className="text-slate-300 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No properties found</h3>
        <p className="text-slate-500 mt-2 font-medium">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
