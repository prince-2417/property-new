import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tighter text-pf-primary flex items-center gap-0.5">
              <span className="text-pf-primary">Luxe</span>
              <span className="text-white">Estate</span>
            </div>
            <p className="text-[14px] leading-relaxed max-w-xs">
              The UAE's most exclusive property destination. We connect discerning clients with the most prestigious real estate opportunities across the Emirates.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-pf-primary hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-[14px]">
              <li><a href="/buy" className="hover:text-pf-primary transition-colors">Premium For Sale</a></li>
              <li><a href="/rent" className="hover:text-pf-primary transition-colors">Exclusive Rentals</a></li>
              <li><a href="/new-projects" className="hover:text-pf-primary transition-colors">Signature Projects</a></li>
              <li><a href="/agents" className="hover:text-pf-primary transition-colors">Private Agents</a></li>
              <li><a href="/tools" className="hover:text-pf-primary transition-colors">Market Valuation</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-8">Insights</h4>
            <ul className="space-y-4 text-[14px]">
              <li><a href="#" className="hover:text-pf-primary transition-colors">Market Report 2026</a></li>
              <li><a href="#" className="hover:text-pf-primary transition-colors">Investment Guides</a></li>
              <li><a href="#" className="hover:text-pf-primary transition-colors">Area Spotlight</a></li>
              <li><a href="#" className="hover:text-pf-primary transition-colors">Mortgage Advisor</a></li>
              <li><a href="#" className="hover:text-pf-primary transition-colors">Concierge Services</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-8">Global Office</h4>
            <div className="space-y-5 text-[14px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center text-pf-primary">
                  <Phone size={14} />
                </div>
                <span>+971 4 800 LUXE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center text-pf-primary">
                  <Mail size={14} />
                </div>
                <span>concierge@luxeestate.ae</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center text-pf-primary flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Burj Khalifa District, <br />Downtown Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-20 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[12px] uppercase tracking-widest font-bold">
              &copy; 2026 Luxe Estate Global. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-[12px] uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}