'use client';
import { useState } from 'react';
import { 
  Eye, 
  MessageSquare, 
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Clock,
  Building2,
  Trash2,
  Plus,
  Calendar,
  TrendingUp,
  CheckCircle,
  Pencil,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useListings } from '@/context/ListingContext';
import EditListingModal from '@/components/EditListingModal';

export default function UserDashboard() {
  const { user } = useAuth();
  const { userListings, deleteListing, bookings } = useListings();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const myListings = userListings.filter(l => l.ownerId === user?.id);
  const myPropertyBookings = bookings.filter(b => b.ownerId === user?.id);

  const stats = [
    { name: 'Active Listings', value: myListings.length.toString(), icon: Building2 },
    { name: 'Total Bookings', value: myPropertyBookings.length.toString(), icon: Calendar },
    { name: 'Revenue Guide', value: `AED ${(myPropertyBookings.length * 5000).toLocaleString()}`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-20 animate-in fade-in duration-1000">
      {/* Stats Grid */}
      <div className="grid gap-px bg-white/5 border border-white/5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden bg-pf-surface p-12 transition-all hover:bg-[#1a1a1a] group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <stat.icon size={18} className="text-pf-accent" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{stat.name}</p>
              </div>
              <p className="text-5xl font-normal text-white font-serif italic tracking-tight group-hover:translate-x-2 transition-transform duration-500">{stat.value}</p>
            </div>
            <div className="absolute -bottom-10 -right-10 text-white/5 opacity-10 transition-transform group-hover:scale-110 duration-700">
              <stat.icon size={200} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-20 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-20">
          {/* Recent Bookings */}
          <div className="bg-pf-surface border border-white/5">
            <div className="flex items-center justify-between border-b border-white/5 p-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Requests</p>
                <h2 className="font-serif italic text-4xl">Recent <span className="font-normal not-italic">Bookings</span></h2>
              </div>
              <div className="h-16 w-16 border border-white/10 flex items-center justify-center text-white/30 italic font-serif">
                {myPropertyBookings.length}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                    <th className="px-12 py-8">Residence</th>
                    <th className="px-12 py-8">Customer</th>
                    <th className="px-12 py-8">Schedule</th>
                    <th className="px-12 py-8 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {myPropertyBookings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-12 py-32 text-center">
                        <p className="text-white/10 font-serif italic text-2xl">No active requests</p>
                      </td>
                    </tr>
                  ) : (
                    myPropertyBookings.map((booking) => (
                      <tr key={booking.id} className="group hover:bg-white/5 transition-all duration-500">
                        <td className="px-12 py-8">
                          <div className="flex items-center gap-6">
                            <img src={booking.propertyImage} className="h-14 w-14 grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                            <span className="font-serif text-2xl text-white group-hover:italic transition-all">{booking.propertyTitle}</span>
                          </div>
                        </td>
                        <td className="px-12 py-8">
                          <p className="text-[13px] font-medium text-white mb-1">{booking.customerName}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{booking.customerPhone}</p>
                        </td>
                        <td className="px-12 py-8">
                          <p className="text-[13px] font-medium text-white mb-1">{booking.viewingDate}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{booking.viewingTime}</p>
                        </td>
                        <td className="px-12 py-8 text-right">
                          <span className="inline-flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] bg-pf-accent/10 text-pf-accent border border-pf-accent/20">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* My Properties */}
          <div className="bg-pf-surface border border-white/5">
            <div className="flex items-center justify-between border-b border-white/5 p-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Collection</p>
                <h2 className="font-serif italic text-4xl">My <span className="font-normal not-italic">Properties</span></h2>
              </div>
              <Link href="/dashboard/add-listing" className="btn-pill btn-primary text-black">
                + New Entry
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                    <th className="px-12 py-8">Residence</th>
                    <th className="px-12 py-8">Valuation</th>
                    <th className="px-12 py-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {myListings.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-12 py-32 text-center">
                        <p className="text-white/10 font-serif italic text-2xl">Your collection is empty</p>
                      </td>
                    </tr>
                  ) : (
                    myListings.map((listing) => (
                      <tr key={listing.id} className="group hover:bg-white/5 transition-all duration-500">
                        <td className="px-12 py-8">
                          <div className="flex items-center gap-6">
                            <img src={listing.image} className="h-14 w-14 grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                            <div>
                              <p className="font-serif text-2xl text-white group-hover:italic transition-all">{listing.title}</p>
                              <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{listing.location.split(',')[0]}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-8">
                          <span className="font-serif italic text-xl text-white">AED {listing.price}</span>
                        </td>
                        <td className="px-12 py-8 text-right">
                          <div className="flex items-center justify-end gap-6">
                            <button 
                              onClick={() => handleEditClick(listing)}
                              className="text-white/30 hover:text-white transition-colors"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => deleteListing(listing.id)}
                              className="text-white/30 hover:text-red-500 transition-colors"
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

        {/* Recent Activity Sidebar */}
        <div className="space-y-20">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Timeline</p>
            <h2 className="font-serif italic text-4xl">Activity <span className="font-normal not-italic">Feed</span></h2>
          </div>
          
          <div className="bg-pf-surface border border-white/5 p-12 space-y-12">
            {[
              { type: 'lead', user: 'Sarah Ahmed', time: '2 hours ago', text: 'interested in your Dubai Marina property.' },
              { type: 'view', user: 'John Smith', time: '5 hours ago', text: 'added your Luxury Villa to favorites.' },
              { type: 'system', user: 'Listing Approved', time: '1 day ago', text: 'Your Modern Apartment is now active.' },
            ].map((activity, i) => (
              <div key={i} className="group relative pl-8 border-l border-white/5">
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-pf-accent" />
                <p className="text-[13px] leading-relaxed text-white/60">
                  <span className="font-black text-white uppercase tracking-widest text-[10px] block mb-2">{activity.user}</span> 
                  {activity.text}
                </p>
                <p className="mt-4 text-[9px] font-black text-white/20 uppercase tracking-widest">{activity.time}</p>
              </div>
            ))}
            
            <button className="w-full btn-pill btn-outline text-white/30 hover:text-white hover:border-white">
              View All Insights
            </button>
          </div>
        </div>
      </div>

      <EditListingModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        listing={selectedListing} 
      />
    </div>
  );
}
