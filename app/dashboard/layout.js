'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="p-8">
        <Link href="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
          <span className="text-pf-primary">property</span>
          <span className="text-pf-heading">finder</span>
          <span className="ml-1 rounded-md bg-pf-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-pf-primary">Pro</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-pf-primary text-white shadow-lg shadow-pf-primary/20' 
                  : 'text-pf-muted hover:bg-gray-50 hover:text-pf-heading'
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon size={20} />
                {link.name}
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-6">
        <button 
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-pf-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-gray-200 bg-white lg:block z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className="h-full w-72 bg-white animate-in slide-in-from-left duration-300 shadow-2xl" onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 transition-all">
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-gray-50 text-pf-heading border border-gray-100"
              >
                <LayoutDashboard size={22} />
              </button>
              <h1 className="text-lg font-bold text-pf-heading">
                {sidebarLinks.find(l => l.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-pf-heading">{user.name}</p>
                <p className="text-xs text-pf-muted">{user.role}</p>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-pf-primary/20 bg-gray-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 transition-all">
          {children}
        </div>
      </main>
    </div>
  );
}
