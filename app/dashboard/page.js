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
  Pencil
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

  // Show ONLY user's listings
  const myListings = userListings.filter(l => l.ownerId === user?.id);
  
  // Show bookings for the user's properties
  const myPropertyBookings = bookings.filter(b => b.ownerId === user?.id);

  const stats = [
    { name: 'My Active Listings', value: myListings.length.toString(), icon: Building2, change: '+1', changeType: 'increase' },
    { name: 'Bookings Received', value: myPropertyBookings.length.toString(), icon: Calendar, change: `+${myPropertyBookings.length}`, changeType: 'increase' },
    { name: 'Total Revenue', value: `AED ${myPropertyBookings.length * 5000}`, icon: TrendingUp, change: '+100%', changeType: 'increase' },
    { name: 'Total Favorites', value: '156', icon: Heart, change: '+12%', changeType: 'increase' },
  ];

  return (
    <div className="container mx-auto px-4 py-32 space-y-12">
      {/* ... Welcome Section ... */}
      
      {/* ... Stats Grid ... */}

      {/* Main Content Area */}
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-pf-heading tracking-tight">Recent Bookings</h3>
            <span className="rounded-full bg-pf-primary/10 px-4 py-1.5 text-xs font-black text-pf-primary uppercase tracking-widest">
              {myPropertyBookings.length} Requests
            </span>
          </div>

          <div className="rounded-[48px] border border-gray-100 bg-white shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-pf-muted">
                    <th className="px-10 py-6">Property</th>
                    <th className="px-10 py-6">Customer</th>
                    <th className="px-10 py-6">Schedule</th>
                    <th className="px-10 py-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {myPropertyBookings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-10 py-20 text-center text-pf-muted font-bold uppercase tracking-widest opacity-40">
                        No bookings yet
                      </td>
                    </tr>
                  ) : (
                    myPropertyBookings.map((booking) => (
                      <tr key={booking.id} className="group hover:bg-pf-background transition-colors">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <img src={booking.propertyImage} className="h-12 w-12 rounded-xl object-cover" alt="" />
                            <span className="font-bold text-pf-heading">{booking.propertyTitle}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <p className="font-bold text-pf-heading">{booking.customerName}</p>
                          <p className="text-xs text-pf-muted">{booking.customerPhone}</p>
                        </td>
                        <td className="px-10 py-6">
                          <p className="font-bold text-pf-heading">{booking.viewingDate}</p>
                          <p className="text-xs text-pf-muted">{booking.viewingTime}</p>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-600 border border-green-100">
                            <CheckCircle size={12} /> {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-10 pt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-pf-heading tracking-tight">My Properties</h3>
              <Link 
                href="/dashboard/add-listing"
                className="rounded-full bg-pf-primary px-6 py-2 text-xs font-black text-white uppercase tracking-widest shadow-xl shadow-pf-primary/20 hover:scale-105 transition-all"
              >
                + Add New
              </Link>
            </div>

            <div className="rounded-[48px] border border-gray-100 bg-white shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-pf-muted">
                      <th className="px-10 py-6">Property</th>
                      <th className="px-10 py-6">Price</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {myListings.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-10 py-20 text-center text-pf-muted font-bold uppercase tracking-widest opacity-40">
                          You haven't added any properties yet
                        </td>
                      </tr>
                    ) : (
                      myListings.map((listing) => (
                        <tr key={listing.id} className="group hover:bg-pf-background transition-colors">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <img src={listing.image} className="h-12 w-12 rounded-xl object-cover" alt="" />
                              <div>
                                <p className="font-bold text-pf-heading">{listing.title}</p>
                                <p className="text-[10px] text-pf-muted uppercase tracking-widest">{listing.location.split(',')[0]}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="font-bold text-pf-heading">AED {listing.price}</span>
                          </td>
                          <td className="px-10 py-6">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-600 border border-green-100">
                              Active
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleEditClick(listing)}
                                className="p-2 text-pf-muted hover:text-pf-primary transition-colors"
                              >
                                <Pencil size={18} />
                              </button>
                              <button 
                                onClick={() => deleteListing(listing.id)}
                                className="p-2 text-pf-muted hover:text-red-500 transition-colors"
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
        </div>

        {/* Recent Activity Sidebar */}
        {/* ... */}

        {/* Recent Activity Sidebar */}
        <div className="space-y-10">
          <h3 className="text-3xl font-black text-pf-heading tracking-tight">Recent Activity</h3>
          <div className="rounded-[48px] border border-gray-100 bg-white p-10 shadow-2xl">
            <div className="space-y-10">
              {[
                { type: 'lead', user: 'Sarah Ahmed', time: '2 hours ago', text: 'interested in your Dubai Marina property.' },
                { type: 'view', user: 'John Smith', time: '5 hours ago', text: 'added your Luxury Villa to favorites.' },
                { type: 'system', user: 'Listing Approved', time: '1 day ago', text: 'Your Modern Apartment is now active.' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`h-14 w-14 shrink-0 rounded-[20px] flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:-rotate-6 ${
                    activity.type === 'lead' ? 'bg-pf-primary/10 text-pf-primary shadow-pf-primary/10' : 
                    activity.type === 'view' ? 'bg-pink-100 text-pink-500 shadow-pink-200/50' : 'bg-green-100 text-green-500 shadow-green-200/50'
                  }`}>
                    {activity.type === 'lead' && <MessageSquare size={26} />}
                    {activity.type === 'view' && <Heart size={26} />}
                    {activity.type === 'system' && <Clock size={26} />}
                  </div>
                  <div>
                    <p className="text-base leading-relaxed">
                      <span className="font-black text-pf-heading">{activity.user}</span> {activity.text}
                    </p>
                    <p className="mt-2 text-[10px] font-black text-pf-muted uppercase tracking-widest opacity-60">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 w-full rounded-[24px] bg-pf-background py-6 text-sm font-black text-pf-primary transition-all hover:bg-pf-primary hover:text-white hover:shadow-2xl hover:shadow-pf-primary/30">
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
