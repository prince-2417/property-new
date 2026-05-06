'use client';
import { useListings } from '@/context/ListingContext';
import { Trash2 } from 'lucide-react';

export default function PropertyDetailsAdmin() {
  const { listings, deleteListing } = useListings();

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Property Management</h1>
          <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Manage all platform listings</p>
        </div>
      </div>

      <div className="rounded-[48px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-10 bg-slate-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Listings</h2>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Global platform activity</p>
          </div>
          <span className="rounded-full bg-pf-primary/10 px-6 py-2 text-sm font-black text-pf-primary border border-pf-primary/20">
            {listings.length} Properties
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-10 py-6">Property</th>
                <th className="px-10 py-6">Owner</th>
                <th className="px-10 py-6">Price</th>
                <th className="px-10 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-10 py-24 text-center">
                    <p className="text-slate-300 font-black text-lg uppercase tracking-widest">Empty Listings</p>
                  </td>
                </tr>
              ) : (
                listings.map((listing) => (
                  <tr key={listing.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
                          <img src={listing.image} alt="" className="h-full w-full object-cover transition group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg leading-tight">{listing.title}</p>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{listing.location.split(',')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                        <div className="h-2 w-2 rounded-full bg-pf-primary"></div>
                        {listing.ownerName}
                      </span>
                    </td>
                    <td className="px-10 py-7">
                      <span className="font-black text-slate-900">AED {listing.price}</span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button 
                        onClick={() => deleteListing(listing.id)}
                        className="rounded-2xl p-3 text-slate-300 transition-all hover:bg-red-50 hover:text-red-500 hover:scale-110"
                      >
                        <Trash2 size={20} />
                      </button>
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
