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
  Search
} from 'lucide-react';
import Link from 'next/link';
import { useListings } from '@/context/ListingContext';

export default function AdminDashboard() {
  const { listings, deleteListing, bookings } = useListings();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    setRegisteredUsers(users);
  }, []);

  const totalRevenue = bookings.length * 5000;

  const adminStats = [
    { name: 'Total Platform Listings', value: listings.length, icon: Building2, color: 'bg-pf-primary' },
    { name: 'Registered Users', value: registeredUsers.length, icon: Users, color: 'bg-pf-secondary' },
    { name: 'Total Revenue (AED)', value: totalRevenue.toLocaleString(), icon: TrendingUp, color: 'bg-green-600' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8">
      </div>

      {/* Admin Stats Grid */}
      <div className="grid gap-8 sm:grid-cols-3">
        {adminStats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-white p-10 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="relative z-10">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{stat.name}</p>
                <p className="mt-3 text-5xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              </div>
              <div className={`relative z-10 rounded-3xl ${stat.color} p-5 text-white shadow-2xl shadow-pf-primary/20`}>
                <stat.icon size={28} />
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute -bottom-10 -right-10 text-slate-50 opacity-20 transition-transform hover:scale-110">
              <stat.icon size={180} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-12">
        {/* Global Bookings Table */}




        {/* Registered Users Table */}
        <div className="rounded-[48px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/40 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-10 bg-slate-50/30">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Registered Users</h2>
              <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Platform member list</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-pf-primary/10 flex items-center justify-center text-pf-primary">
              <UserCheck size={24} />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-10 py-6">Member</th>
                  <th className="px-10 py-6">Email Address</th>
                  <th className="px-10 py-6">Role</th>
                  <th className="px-10 py-6 text-right">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {registeredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-10 py-24 text-center">
                      <p className="text-slate-300 font-black text-lg uppercase tracking-widest">No Users Yet</p>
                    </td>
                  </tr>
                ) : (
                  registeredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-pf-primary/5 transition-colors">
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-pf-primary/10 flex items-center justify-center text-pf-primary font-black text-lg shadow-inner">
                            {user.name[0]}
                          </div>
                          <span className="font-black text-slate-900 text-lg leading-tight">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-sm font-bold text-slate-500">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-slate-300" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border ${
                          user.role === 'Admin' 
                            ? 'bg-amber-50 text-amber-600 border-amber-100' 
                            : 'bg-pf-primary/10 text-pf-primary border-pf-primary/20'
                        }`}>
                          {user.role === 'Admin' ? <ShieldCheck size={12} /> : null}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <span className="font-mono text-xs text-slate-300">#{user.id.slice(-4)}</span>
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
