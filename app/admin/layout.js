'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'Admin')) {
      router.push('/dashboard'); // Redirect non-admins
    }
  }, [user, loading, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

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

  const SidebarContent = () => (
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
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <div className="flex pt-20">
        {/* Desktop Sidebar */}
        <aside className="fixed left-0 top-20 hidden h-[calc(100vh-80px)] w-72 border-r border-slate-200 bg-white p-6 lg:block shadow-sm z-30">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileSidebarOpen(false)}>
            <div className="h-full w-72 bg-white p-6 animate-in slide-in-from-left duration-300 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-black text-pf-heading">Admin Menu</div>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 rounded-xl bg-slate-50 text-slate-400">
                  <LogOut size={20} className="rotate-180" />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-6 md:p-8 lg:p-12 transition-all">
          <div className="mx-auto max-w-7xl">
            {/* Header / Top Bar */}
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-4">
                <button 
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden p-3 rounded-2xl bg-white border border-slate-200 text-pf-heading shadow-sm"
                >
                  <LayoutDashboard size={22} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-black text-slate-900">{user.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-pf-primary">{user.role}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-pf-primary/10 flex items-center justify-center text-pf-primary font-black shadow-inner">
                  {user.name[0]}
                </div>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
