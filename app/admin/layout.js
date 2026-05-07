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
  CreditCard,
  Map
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
    { name: 'Signature Projects', href: '/admin/projects', icon: Building2 },
    { name: 'Premier Areas', href: '/admin/areas', icon: Map },
    { name: 'Property Details', href: '/admin/property-details', icon: Search },
  ];

  if (loading || !user || user.role !== 'Admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-pf-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pf-accent border-t-transparent"></div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-10">
        <div className="px-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8 px-4">Management</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`flex items-center gap-4 rounded-none px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-white text-black' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={18} /> {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-2 pb-8">
        <button 
          onClick={logout}
          className="flex items-center gap-4 rounded-none px-6 py-4 text-[11px] font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pf-background text-white">
      <Navbar />
      
      <div className="flex pt-20">
        {/* Desktop Sidebar */}
        <aside className="fixed left-0 top-20 hidden h-[calc(100vh-80px)] w-72 border-r border-white/5 bg-pf-surface lg:block z-30">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}>
            <div className="h-full w-72 bg-pf-surface p-6 animate-in slide-in-from-left duration-500 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-12">
                <div className="font-serif italic text-2xl">Menu</div>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-white/40 hover:text-white">
                  <LogOut size={20} className="rotate-180" />
                </button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-6 md:p-12 transition-all">
          <div className="mx-auto max-w-7xl">
            {/* Header / Top Bar */}
            <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden p-4 bg-pf-surface border border-white/10 text-white"
                >
                  <LayoutDashboard size={20} />
                </button>
                <div className="space-y-1">
                  <h2 className="font-serif italic text-3xl">Admin Console</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Property Control Center</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-4 bg-pf-surface border border-white/5">
                <div className="hidden md:block text-right">
                  <p className="text-xs font-black uppercase tracking-widest">{user.name}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-pf-accent">{user.role}</p>
                </div>
                <div className="h-10 w-10 bg-white text-black flex items-center justify-center font-black">
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
