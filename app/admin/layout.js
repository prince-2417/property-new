'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'Admin')) {
      router.push('/dashboard'); // Redirect non-admins
    }
  }, [user, loading, router]);

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'All Listings', href: '/admin/listings', icon: Building2 },
    { name: 'Manage Users', href: '/admin/users', icon: Users },
    { name: 'Platform Bookings', href: '/admin/bookings', icon: CreditCard },
    { name: 'Property Details', href: '/admin/property-details', icon: Search },
  ];

  if (loading || !user || user.role !== 'Admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-pf-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pf-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 hidden h-[calc(100vh-80px)] w-72 border-r border-slate-200 bg-white p-6 lg:block shadow-sm">
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">
              <div className="px-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
                <div className="mt-4 space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link 
                        key={item.name}
                        href={item.href} 
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition-all ${
                          isActive 
                            ? 'bg-pf-primary text-white shadow-xl shadow-pf-primary/20 scale-105' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-pf-primary'
                        }`}
                      >
                        <item.icon size={20} /> {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="px-2 pt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Settings</p>
                <div className="mt-4 space-y-2">
                  <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-pf-primary">
                    <Settings size={20} /> Security Settings
                  </Link>
                </div>
              </div>
            </div>

            <button 
              onClick={logout}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-8 lg:p-12">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Overview</h1>
                <p className="mt-1 text-sm font-medium text-slate-500">Welcome back to your command center.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search anything..." 
                    className="w-full sm:w-64 rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium focus:border-pf-primary focus:outline-none transition-all"
                  />
                </div>
                <button className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-50">
                  <Bell size={20} />
                  <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
