'use client';
import { User, Menu, ChevronDown, Building2, Map, Calculator, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const buyMenu = {
  sections: [
    {
      title: "Residential Properties for Sale",
      links: [
        { name: "Apartments", href: "/buy" },
        { name: "Villas", href: "/buy" },
        { name: "Townhouses", href: "/buy" },
        { name: "Land", href: "/buy" },
      ]
    },
    {
      title: "Buyer Tools",
      links: [
        { name: "Mortgage Calculator", href: "/tools", icon: Calculator },
        { name: "Sold House Prices", href: "/tools", icon: TrendingUp },
        { name: "Sale Price Map", href: "/tools", icon: Map },
        { name: "Buying Insights", href: "/blog", icon: BookOpen },
      ]
    },
    {
      title: "Guides",
      links: [
        { name: "Buyer's Guide", href: "/blog" },
        { name: "Area Insights", href: "/blog" },
        { name: "Community Guides", href: "/blog" },
        { name: "Schools & University Guides", href: "/blog" },
      ]
    }
  ]
};

const rentMenu = {
  sections: [
    {
      title: "Residential Properties for Rent",
      links: [
        { name: "Apartments", href: "/rent" },
        { name: "Villas", href: "/rent" },
        { name: "Townhouses", href: "/rent" },
        { name: "Short-term Rentals", href: "/rent" },
      ]
    },
    {
      title: "Commercial Properties",
      links: [
        { name: "Offices for Sale", href: "/buy" },
        { name: "Retail for Sale", href: "/buy" },
        { name: "Commercial Buildings", href: "/buy" },
      ]
    },
    {
      title: "Insights",
      links: [
        { name: "Rent vs Buy Calculator", href: "/tools" },
        { name: "Rental Price Index", href: "/tools" },
        { name: "Community Guides", href: "/blog" },
      ]
    }
  ]
};

const toolsMenu = {
  sections: [
    {
      title: "Popular Tools",
      links: [
        { name: "Mortgage Calculator", href: "/tools", icon: Calculator },
        { name: "Sold House Prices", href: "/tools", icon: TrendingUp },
        { name: "Sale Price Map", href: "/tools", icon: Map },
      ]
    },
    {
      title: "Insights & Guides",
      links: [
        { name: "Area Insights", href: "/blog", icon: Map },
        { name: "Community Guides", href: "/blog", icon: Building2 },
        { name: "Buying Guide", href: "/blog", icon: BookOpen },
      ]
    }
  ]
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Buy', href: '/buy', dropdown: buyMenu },
    { name: 'Rent', href: '/rent', dropdown: rentMenu },
    { name: 'New Projects', href: '/new-projects' },
    { name: 'Agents', href: '/agents' },
    { name: 'Tools & Insights', href: '/tools', dropdown: toolsMenu },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav 
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-3 md:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-tight text-pf-primary flex items-center gap-1 hover:opacity-90 transition-opacity">
            <span className="text-pf-primary">property</span>
            <span className="text-pf-heading">finder</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-pf-heading relative h-14">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="h-full flex items-center"
                onMouseEnter={() => link.dropdown ? setActiveDropdown(link.name) : setActiveDropdown(null)}
              >
                <Link 
                  href={link.href} 
                  className={`flex items-center gap-1 hover:text-pf-primary transition ${activeDropdown === link.name ? 'text-pf-primary' : ''}`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>
              </div>
            ))}

            {/* Mega Menu Dropdown Container - Now anchored to the links section */}
            {activeDropdown && navLinks.find(l => l.name === activeDropdown)?.dropdown && (
              <div 
                className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-2xl rounded-2xl p-8 animate-in fade-in slide-in-from-top-2 duration-200 z-[60] min-w-[600px]"
                onMouseEnter={() => setActiveDropdown(activeDropdown)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="grid grid-cols-3 gap-8">
                  {navLinks.find(l => l.name === activeDropdown).dropdown.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-pf-primary">{section.title}</h4>
                      <ul className="space-y-3">
                        {section.links.map((sublink, sidx) => (
                          <li key={sidx}>
                            <Link href={sublink.href} className="flex items-center gap-2 text-[13px] text-pf-heading hover:text-pf-primary transition font-bold group">
                              {sublink.icon && (
                                <sublink.icon size={14} className="text-pf-muted group-hover:text-pf-primary transition-colors" />
                              )}
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/add-listing" className="hidden xl:flex items-center gap-2 rounded-full border-2 border-pf-primary bg-white px-5 py-2 text-sm font-bold text-pf-primary transition hover:bg-pf-primary hover:text-white">
            List Your Property
          </Link>
          <Link href="/saved" className="hidden lg:flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-pf-text transition hover:border-pf-primary hover:text-pf-primary">
            <Heart size={16} /> Saved
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href={user.role === 'Admin' ? '/admin/dashboard' : '/dashboard'} 
                className="hidden sm:flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-pf-heading transition hover:border-pf-primary hover:text-pf-primary"
              >
                <span className="hidden md:inline">Hi, {user.name.split(' ')[0]}</span>
                <User size={16} className="text-pf-primary" />
              </Link>
              <button 
                onClick={logout}
                className="hidden sm:flex items-center gap-2 rounded-full bg-pf-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signup" className="hidden sm:block text-sm font-bold text-pf-primary hover:underline">
                Sign Up
              </Link>
              <Link href="/login" className="flex items-center gap-2 rounded-full bg-pf-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition">
                <User size={16} /> Login
              </Link>
            </div>
          )}
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-gray-100 text-pf-heading hover:bg-gray-50 transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-white z-[100] animate-in slide-in-from-right duration-300 overflow-y-auto">
          <div className="p-6 space-y-8">
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-3">
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-lg font-black text-pf-heading py-2"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 border-l-2 border-gray-100 space-y-4 pb-4">
                      {link.dropdown.sections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-pf-primary">{section.title}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {section.links.map((sublink, sidx) => (
                              <Link 
                                key={sidx} 
                                href={sublink.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-bold text-pf-muted hover:text-pf-primary transition py-1"
                              >
                                {sublink.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="pt-8 border-t border-gray-100 space-y-4">
              <Link 
                href="/dashboard/add-listing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-2xl bg-pf-primary py-4 text-sm font-black text-white shadow-xl shadow-pf-primary/20"
              >
                List Your Property
              </Link>
              {!user && (
                <Link 
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full rounded-2xl border-2 border-pf-primary py-4 text-sm font-black text-pf-primary"
                >
                  Create Account
                </Link>
              )}
              {user && (
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-sm font-black text-red-500 py-4"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
