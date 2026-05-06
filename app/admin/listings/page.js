'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { Trash2, ExternalLink, MapPin, Search, Filter, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminAllListings() {
  const { listings, deleteListing } = useListings();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Property Management</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">Showing {filteredListings.length} of {listings.length} properties</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search properties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-6 text-sm font-bold focus:border-pf-primary focus:outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 rounded-2xl bg-pf-primary px-6 py-3 text-sm font-black text-white shadow-xl shadow-pf-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      <div className="rounded-[48px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                <th className="px-10 py-8">Property Details</th>
                <th className="px-10 py-8">Owner Information</th>
                <th className="px-10 py-8">Pricing</th>
                <th className="px-10 py-8">Status</th>
                <th className="px-10 py-8 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-10 py-32 text-center">
                    <p className="text-slate-300 font-black text-xl uppercase tracking-widest">No listings found</p>
                  </td>
                </tr>
              ) : (
                filteredListings.map((listing) => (
                  <tr key={listing.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[24px] bg-slate-100 shadow-inner border border-slate-100">
                          <img src={listing.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900 leading-tight group-hover:text-pf-primary transition-colors">{listing.title}</p>
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.15em]">
                            <MapPin size={12} className="text-pf-primary" /> {listing.location.split(',')[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-slate-800">{listing.ownerName}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Property Advisor</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900">AED {listing.price}</span>
                        <span className="text-[10px] font-black text-pf-primary uppercase tracking-widest mt-1">Market Price</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 border border-green-100">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Link href={`/property/${listing.id}`} target="_blank" className="rounded-2xl bg-white border border-slate-100 p-3 text-slate-400 hover:border-pf-primary hover:text-pf-primary transition-all hover:scale-110 shadow-sm">
                          <ExternalLink size={20} />
                        </Link>
                        <button 
                          onClick={() => deleteListing(listing.id)}
                          className="rounded-2xl bg-white border border-slate-100 p-3 text-slate-400 hover:border-red-500 hover:text-red-500 transition-all hover:scale-110 shadow-sm"
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
