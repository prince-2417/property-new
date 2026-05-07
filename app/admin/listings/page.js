'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { Trash2, ExternalLink, MapPin, Search, Filter, Download, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminAllListings() {
  const { listings, deleteListing } = useListings();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Inventory</p>
          <h1 className="font-serif italic text-5xl text-white">Property <span className="font-normal not-italic">Management</span></h1>
        </div>
        
        <div className="flex flex-wrap gap-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pf-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-pf-surface border border-white/5 px-14 py-5 text-[11px] font-black uppercase tracking-widest text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none w-72"
            />
          </div>
          <button className="btn-pill btn-primary text-black flex items-center gap-3">
            <Download size={16} /> Export Data
          </button>
        </div>
      </div>

      <div className="bg-pf-surface border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                <th className="px-12 py-8">Residence Profile</th>
                <th className="px-12 py-8">Asset Ownership</th>
                <th className="px-12 py-8">Current Valuation</th>
                <th className="px-12 py-8">Market Status</th>
                <th className="px-12 py-8 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-12 py-32 text-center">
                    <p className="text-white/10 font-serif italic text-2xl">No residences found in inventory</p>
                  </td>
                </tr>
              ) : (
                filteredListings.map((listing) => (
                  <tr key={listing.id} className="group hover:bg-white/5 transition-all duration-500">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-8">
                        <div className="h-24 w-24 shrink-0 overflow-hidden bg-pf-background border border-white/5">
                          <img src={listing.image} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="font-serif text-2xl text-white group-hover:italic transition-all leading-tight mb-2">{listing.title}</p>
                          <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                            <MapPin size={12} className="text-pf-accent" /> {listing.location.split(',')[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex flex-col gap-1">
                        <span className="font-serif italic text-lg text-white/80">{listing.ownerName}</span>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Authorized Advisor</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex flex-col gap-1">
                        <span className="font-serif italic text-xl text-white">AED {listing.price}</span>
                        <span className="text-[9px] font-black text-pf-accent uppercase tracking-widest">Listed Value</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] bg-pf-accent/10 text-pf-accent border border-pf-accent/20">
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex items-center justify-end gap-8">
                        <Link href={`/property/${listing.id}`} target="_blank" className="text-white/20 hover:text-white transition-all">
                          <ExternalLink size={18} />
                        </Link>
                        <button 
                          onClick={() => deleteListing(listing.id)}
                          className="text-white/20 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={18} />
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
