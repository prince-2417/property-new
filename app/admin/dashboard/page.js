'use client';
import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Trash2, 
  ExternalLink,
  MapPin,
  Calendar,
  MoreVertical,
  Mail,
  ShieldCheck,
  UserCheck,
  Search,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useListings } from '@/context/ListingContext';

export default function AdminDashboard() {
  const { listings, deleteListing, bookings } = useListings();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    setRegisteredUsers(users);
  }, []);

  const totalRevenue = bookings.length * 5000;

  const adminStats = [
    { name: 'Platform Listings', value: listings.length, icon: Building2, color: 'text-pf-accent' },
    { name: 'Registered Users', value: registeredUsers.length, icon: Users, color: 'text-pf-accent' },
    { name: 'Total Revenue', value: `AED ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-pf-accent' },
  ];

  return (
    <div className="space-y-20 animate-in fade-in duration-1000">
      {/* Admin Stats Grid */}
      <div className="grid gap-px bg-white/5 border border-white/5 sm:grid-cols-3">
        {adminStats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden bg-pf-surface p-12 transition-all hover:bg-[#1a1a1a] group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <stat.icon size={18} className={stat.color} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{stat.name}</p>
              </div>
              <p className="text-5xl font-normal text-pf-heading font-serif italic tracking-tight group-hover:translate-x-2 transition-transform duration-500">{stat.value}</p>
            </div>
            {/* Background Icon */}
            <div className="absolute -bottom-10 -right-10 text-white/5 opacity-10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-700">
              <stat.icon size={200} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-20">
        {/* Registered Users Table */}
        <div className="bg-pf-surface border border-white/5">
          <div className="flex items-center justify-between border-b border-white/5 p-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Security</p>
              <h2 className="font-serif italic text-4xl text-pf-heading">Platform <span className="font-normal not-italic">Members</span></h2>
            </div>
            <div className="h-16 w-16 border border-white/10 flex items-center justify-center text-white/30">
              <UserCheck size={28} />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                  <th className="px-12 py-8">Member Profile</th>
                  <th className="px-12 py-8">Contact Information</th>
                  <th className="px-12 py-8">Access Level</th>
                  <th className="px-12 py-8 text-right">Reference ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {registeredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-12 py-32 text-center">
                      <p className="text-white/10 font-serif italic text-2xl">No members found</p>
                    </td>
                  </tr>
                ) : (
                  registeredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/5 transition-all duration-500">
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-6">
                          <div className="h-14 w-14 bg-white text-black flex items-center justify-center font-black text-xl">
                            {user.name[0]}
                          </div>
                          <div>
                            <span className="font-serif text-2xl text-pf-heading block leading-none mb-2">{user.name}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Active Session</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/40">
                          <Mail size={14} className="text-pf-accent" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] border ${
                          user.role === 'Admin' 
                            ? 'bg-pf-accent/10 text-pf-accent border-pf-accent/20' 
                            : 'bg-white/5 text-white/40 border-white/10'
                        }`}>
                          {user.role === 'Admin' ? <ShieldCheck size={12} /> : null}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <div className="flex items-center justify-end gap-3 text-[10px] font-black uppercase tracking-widest text-white/10 group-hover:text-pf-accent transition-colors">
                          <span>#{user.id.slice(-6)}</span>
                          <ArrowUpRight size={14} />
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
  );
}
