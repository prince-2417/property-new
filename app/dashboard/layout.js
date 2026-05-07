'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Home, 
  User, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Add New Listing', href: '/dashboard/add-listing', icon: PlusCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pf-background text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pf-accent border-t-transparent"></div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="p-10">
        <Link href="/" className="text-2xl font-normal tracking-tighter text-pf-heading flex items-center gap-2 group">
          <span className="font-serif italic text-3xl group-hover:text-white transition-colors">Property</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${
                isActive 
                  ? 'bg-white text-black' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <link.icon size={18} />
                {link.name}
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/5">
        <button 
          onClick={logout}
          className="flex w-full items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-pf-background text-white">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-white/5 bg-pf-surface lg:block z-30 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className="h-full w-72 bg-pf-surface animate-in slide-in-from-left duration-500 shadow-2xl" onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 transition-all">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-pf-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-3 bg-pf-surface border border-white/10 text-white"
              >
                <LayoutDashboard size={20} />
              </button>
              <h1 className="font-serif italic text-2xl">
                {sidebarLinks.find(l => l.href === pathname)?.name || 'Account Overview'}
              </h1>
            </div>
            <div className="flex items-center gap-4 p-2 bg-pf-surface border border-white/5 pr-6">
              <div className="h-10 w-10 bg-white text-black flex items-center justify-center font-black">
                {user.name[0]}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-white">{user.name}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-pf-accent">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 transition-all">
          {children}
        </div>
      </main>
    </div>
  );
}
