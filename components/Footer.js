import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Property Finder</h3>
            <p className="text-sm opacity-80 mb-4">
              Your trusted partner for finding the perfect property in the UAE.
              Discover premium listings across Dubai, Abu Dhabi, and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/buy" className="hover:text-blue-400 transition">Buy Property</a></li>
              <li><a href="/rent" className="hover:text-blue-400 transition">Rent Property</a></li>
              <li><a href="/new-projects" className="hover:text-blue-400 transition">New Projects</a></li>
              <li><a href="/agents" className="hover:text-blue-400 transition">Find Agents</a></li>
              <li><a href="/tools" className="hover:text-blue-400 transition">Property Tools</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Property Valuation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Mortgage Calculator</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Area Guides</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Market Insights</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Property Management</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>info@propertyfinder.ae</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span>Dubai Media City, Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs md:text-sm opacity-80 text-center md:text-left">
              &copy; 2026 Property Finder. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] md:text-sm">
              <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition">Cookie Policy</a>
              <a href="#" className="hover:text-blue-400 transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}