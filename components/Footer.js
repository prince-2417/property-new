import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-pf-background text-white/40 border-white/5">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-pf-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 px-4 py-16 mx-auto sm:px-6 sm:py-24">
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Brand & Mission */}
          <div className="space-y-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3 text-3xl font-normal tracking-tighter sm:text-4xl text-pf-heading">
                <span className="font-serif text-4xl italic sm:text-5xl">Property</span>
              </Link>
              <p className="max-w-xl font-serif text-lg italic font-light leading-relaxed sm:text-2xl text-white/60">
                "We don't just find houses; we discover legacies. Every residence in our collection is a testament to the art of fine living."
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Connect with the elite</p>
              <div className="flex gap-8">
                {[
                  { icon: FaFacebookF, href: '#' },
                  { icon: FaXTwitter, href: '#' },
                  { icon: FaInstagram, href: '#' },
                  { icon: FaYoutube, href: '#' },
                ].map(({ icon: Icon, href }, idx) => (
                  <a key={idx} href={href} className="transition-all transform text-white/20 hover:text-pf-heading hover:scale-110 hover:-translate-y-1">
                    <Icon size={22} />
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
                <li><Link href="/buy" className="flex items-center gap-2 transition-all text-pf-heading hover:text-white group">Buy <ArrowUpRight size={12} className="transition-all opacity-0 group-hover:opacity-100" /></Link></li>
                <li><Link href="/rent" className="flex items-center gap-2 transition-all text-pf-heading hover:text-white group">Rent <ArrowUpRight size={12} className="transition-all opacity-0 group-hover:opacity-100" /></Link></li>
                <li><Link href="/new-projects" className="flex items-center gap-2 transition-all text-pf-heading hover:text-white group">New Projects <ArrowUpRight size={12} className="transition-all opacity-0 group-hover:opacity-100" /></Link></li>
                <li><Link href="/agents" className="flex items-center gap-2 transition-all text-pf-heading hover:text-white group">Agents <ArrowUpRight size={12} className="transition-all opacity-0 group-hover:opacity-100" /></Link></li>
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
                  <p className="transition-colors cursor-pointer text-pf-heading hover:text-white">concierge@property.ae</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 mt-12 border-t border-white/5 sm:mt-20 sm:pt-10 md:flex-row sm:gap-12">
          <div className="text-[9px] font-black uppercase tracking-[0.5em] text-white/50">
            &copy; 2026 Property Global Intelligence. All rights reserved.
          </div>
          {/* <div className="flex flex-wrap gap-6 sm:gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/50 justify-center">
            <a href="#" className="transition-colors hover:text-white">Privacy Portfolio</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Engagement</a>
            <a href="#" className="transition-colors hover:text-white">Cookie Ledger</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}