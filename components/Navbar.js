'use client';
import { User, Menu, Heart, ChevronDown, Building2, Map, Calculator, BookOpen, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'New Projects', href: '/new-projects' },
    { name: 'Agents', href: '/agents' },
    { name: 'Tools & Insights', href: '/tools' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-pf-background/90 backdrop-blur-xl border-b border-white/5 py-4' 
          : 'bg-gradient-to-b from-black/50 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-normal tracking-tighter text-pf-heading flex items-center gap-2 group">
          <span className="font-serif italic text-3xl group-hover:text-white transition-colors">Property</span>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-pf-heading hover:text-white transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-[0.3em] text-pf-heading hover:text-white transition-colors">
                  My Account
                </Link>
                <Link href="/dashboard/add-listing" className="btn-pill btn-primary px-8 py-3 text-black hover:bg-white hover:text-black transition-all text-[9px]">
                  List Residence
                </Link>
              </>
            ) : (
              <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-pf-heading hover:text-white transition-colors">
                Login
              </Link>
            )}
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-pf-accent transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-pf-background flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl text-white hover:italic hover:text-pf-accent transition-all"
            >
              {link.name}
            </Link>
          ))}
          
          {user && (
            <div className="pt-12 flex flex-col items-center gap-6">
              <Link 
                href="/dashboard/add-listing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-pill btn-primary text-[11px]"
              >
                List Your Property
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
