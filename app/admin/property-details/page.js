'use client';
import { useListings } from '@/context/ListingContext';
import { Trash2, MapPin, ArrowUpRight } from 'lucide-react';

export default function PropertyDetailsAdmin() {
  const { listings, deleteListing } = useListings();

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Asset Management</p>
          <h1 className="font-serif italic text-5xl text-pf-heading">Platform <span className="font-normal not-italic">Inventory</span></h1>
        </div>
        
        <div className="bg-pf-surface border border-white/5 px-10 py-6">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Total Assets</p>
          <p className="font-serif italic text-3xl text-pf-accent">{listings.length} Residences</p>
        </div>
      </div>

      <div className="bg-pf-surface border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                <th className="px-12 py-8">Residence Identity</th>
                <th className="px-12 py-8">Asset Ownership</th>
                <th className="px-12 py-8">Valuation</th>
                <th className="px-12 py-8 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {listings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-12 py-32 text-center">
                    <p className="text-white/10 font-serif italic text-2xl">No residences in global inventory</p>
                  </td>
                </tr>
              ) : (
                listings.map((listing) => (
                  <tr key={listing.id} className="group hover:bg-white/5 transition-all duration-500">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-8">
                        <div className="h-24 w-24 shrink-0 overflow-hidden bg-pf-background border border-white/5">
                          <img src={listing.image} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="font-serif text-2xl text-pf-heading group-hover:italic transition-all leading-tight mb-2">{listing.title}</p>
                          <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                            <MapPin size={12} className="text-pf-accent" /> {listing.location.split(',')[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex flex-col gap-1">
                        <span className="font-serif italic text-lg text-pf-heading/80">{listing.ownerName}</span>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Asset Custodian</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex flex-col gap-1">
                        <span className="font-serif italic text-xl text-pf-heading">AED {listing.price}</span>
                        <span className="text-[9px] font-black text-pf-accent uppercase tracking-widest">Market Valuation</span>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex items-center justify-end gap-8 opacity-40 group-hover:opacity-100 transition-all">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pf-accent">
                          Manage <ArrowUpRight size={14} />
                        </div>
                        <button 
                          onClick={() => deleteListing(listing.id)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
