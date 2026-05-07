import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-pf-background text-white/40 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-pf-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Brand & Mission */}
          <div className="space-y-16">
            <div className="space-y-6">
              <Link href="/" className="text-4xl font-normal tracking-tighter text-pf-heading flex items-center gap-3">
                <span className="font-serif italic text-5xl">Property</span>
              </Link>
              <p className="text-2xl font-light leading-relaxed max-w-xl text-white/60 font-serif italic">
                "We don't just find houses; we discover legacies. Every residence in our collection is a testament to the art of fine living."
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Connect with the elite</p>
              <div className="flex gap-8">
                {['FB', 'TW', 'IG', 'YT'].map((label, idx) => (
                  <a key={idx} href="#" className="text-white/20 hover:text-pf-heading transition-all transform hover:scale-110 hover:-translate-y-1 text-xs font-black tracking-widest">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid gap-12 sm:grid-cols-2">
            <div className="space-y-10">
              <h4 className="text-pf-heading text-[10px] font-black uppercase tracking-[0.4em]">Explore</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.2em]">
                <li><Link href="/buy" className="text-pf-heading hover:text-white transition-all flex items-center gap-2 group">Buy <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                <li><Link href="/rent" className="text-pf-heading hover:text-white transition-all flex items-center gap-2 group">Rent <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                <li><Link href="/new-projects" className="text-pf-heading hover:text-white transition-all flex items-center gap-2 group">New Projects <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                <li><Link href="/agents" className="text-pf-heading hover:text-white transition-all flex items-center gap-2 group">Agents <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              </ul>
            </div>
            <div className="space-y-10">
              <h4 className="text-pf-heading text-[10px] font-black uppercase tracking-[0.4em]">Headquarters</h4>
              <div className="space-y-6 text-[11px] font-medium leading-relaxed text-white/30">
                <div className="flex gap-4">
                  <MapPin size={16} className="text-pf-accent shrink-0" />
                  <p>Burj Khalifa District,<br />Downtown Dubai, UAE</p>
                </div>
                <div className="flex gap-4">
                  <Phone size={16} className="text-pf-accent shrink-0" />
                  <p>+971 4 800 PROPERTY</p>
                </div>
                <div className="flex gap-4">
                  <Mail size={16} className="text-pf-accent shrink-0" />
                  <p className="text-pf-heading hover:text-white transition-colors cursor-pointer">concierge@property.ae</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-[9px] font-black uppercase tracking-[0.5em] text-white/50">
            &copy; 2026 Property Global Intelligence. All rights reserved.
          </div>
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Portfolio</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Ledger</a>
          </div>
        </div>
      </div>
    </footer>
  );
}