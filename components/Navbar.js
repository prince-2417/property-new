'use client';
import { User, Menu, Heart, Search, ChevronDown, Building2, Map, Calculator, BookOpen, TrendingUp } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black tracking-tight text-pf-primary flex items-center gap-1 hover:opacity-90 transition-opacity">
            <span className="text-pf-primary">property</span>
            <span className="text-pf-heading">finder</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-pf-heading">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative h-14 flex items-center"
                onMouseEnter={() => link.dropdown ? setActiveDropdown(link.name) : setActiveDropdown(null)}
              >
                <Link 
                  href={link.href} 
                  className={`flex items-center gap-1 hover:text-pf-primary transition ${activeDropdown === link.name ? 'text-pf-primary' : ''}`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-14 left-0 w-[600px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-8 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-3 gap-8">
                      {link.dropdown.sections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-pf-muted">{section.title}</h4>
                          <ul className="space-y-3">
                            {section.links.map((sublink, sidx) => (
                              <li key={sidx}>
                                <Link href={sublink.href} className="flex items-center gap-2 text-sm text-pf-heading hover:text-pf-primary transition font-semibold group">
                                  {sublink.icon && <sublink.icon size={14} className="text-pf-muted group-hover:text-pf-primary" />}
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
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-end">
          <Link href="/dashboard/add-listing" className="hidden xl:flex items-center gap-2 rounded-full border-2 border-pf-primary bg-white px-5 py-2 text-sm font-bold text-pf-primary transition hover:bg-pf-primary hover:text-white">
            List Your Property
          </Link>
          <Link href="/saved" className="hidden md:flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-pf-text transition hover:border-pf-primary hover:text-pf-primary">
            <Heart size={16} /> Saved
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href={user.role === 'Admin' ? '/admin/dashboard' : '/dashboard'} 
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-pf-heading transition hover:border-pf-primary hover:text-pf-primary"
              >
                <span className="hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
                <User size={16} className="text-pf-primary" />
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 rounded-full bg-pf-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
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
          
          <button className="md:hidden p-2 rounded-full border border-gray-200 text-pf-text hover:bg-gray-100 transition"><Menu size={22} /></button>
        </div>
      </div>
    </nav>
  );
}
