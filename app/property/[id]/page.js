'use client';
import { useParams } from 'next/navigation';
import { properties as staticProperties } from '@/data/properties';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Share2, 
  Heart, 
  ChevronLeft, 
  CheckCircle2,
  Calendar,
  Building2,
  Hash,
  Info,
  Waves,
  ShieldCheck,
  ParkingCircle,
  Wind,
  PlayCircle
} from 'lucide-react';
import Link from 'next/link';
import { useListings } from '@/context/ListingContext';

export default function PropertyDetails() {
  const params = useParams();
  const { listings } = useListings();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Try to find in dynamic listings first, then fallback to static
  const property = listings.find(l => l.id.toString() === params.id) || 
                   staticProperties.find(p => p.id.toString() === params.id) || 
                   staticProperties[0];

  const amenities = [
    { name: 'Private Pool', icon: Waves },
    { name: '24/7 Security', icon: ShieldCheck },
    { name: 'Covered Parking', icon: ParkingCircle },
    { name: 'Central A/C', icon: Wind },
    { name: 'Maid Service', icon: Building2 },
    { name: 'Built-in Wardrobes', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pf-muted">
            <Link href="/" className="hover:text-pf-primary transition">UAE</Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-pf-primary transition">Dubai</Link>
            <span>/</span>
            <Link href="#" className="hover:text-pf-primary transition">{property.location.split(',')[0]}</Link>
            <span>/</span>
            <span className="text-pf-primary">{property.title}</span>
          </nav>
        </div>

        {/* Image Gallery Grid */}
        <div className="container mx-auto px-4 mb-10">
          <div className="grid h-[500px] grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden rounded-[40px] shadow-2xl">
            <div className="md:col-span-2 h-full relative group overflow-hidden">
              <img src={property.image} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt="Main" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition" />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4 md:col-span-1">
              <div className="relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt="Gallery 1" />
              </div>
              <div className="relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt="Gallery 2" />
              </div>
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4 md:col-span-1">
              <div className="relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt="Gallery 3" />
              </div>
              <div className="relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=600" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" alt="Gallery 4" />
                <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-black text-xl backdrop-blur-md group-hover:bg-black/20 transition-all">
                  +12 Photos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              <div className="pf-card bg-white border border-gray-100 p-10 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-green-600 mb-6 border border-green-100">
                      <CheckCircle2 size={16} /> Verified Property
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-pf-heading tracking-tight mb-6 leading-tight">{property.title}</h1>
                    <div className="flex items-center gap-3 text-lg font-medium text-pf-muted">
                      <MapPin size={22} className="text-pf-primary" /> {property.location}
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-pf-muted mb-2">Asking Price</p>
                    <p className="text-5xl font-black text-pf-primary tracking-tight whitespace-nowrap">AED {property.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 border-y border-gray-100 py-10 mb-10">
                  <div className="flex flex-col items-center">
                    <Bed size={32} className="text-pf-primary mb-3" />
                    <span className="text-2xl font-black text-pf-heading tracking-tight">{property.bedrooms || property.beds}</span>
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest mt-1">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-gray-100 px-8">
                    <Bath size={32} className="text-pf-primary mb-3" />
                    <span className="text-2xl font-black text-pf-heading tracking-tight">{property.bathrooms || property.baths}</span>
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest mt-1">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Maximize size={32} className="text-pf-primary mb-3" />
                    <span className="text-2xl font-black text-pf-heading tracking-tight">{property.area}</span>
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest mt-1">Area (sqft)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-pf-heading flex items-center gap-3">
                    <Info size={24} className="text-pf-primary" /> Property Description
                  </h3>
                  <p className="text-pf-muted leading-relaxed text-lg font-medium">
                    {property.description || `This exceptional ${property.type} in ${property.location} represents the pinnacle of luxury living. Featuring a contemporary architectural design, floor-to-ceiling windows, and premium finishes throughout. Every detail has been meticulously crafted to provide an unparalleled living experience.`}
                  </p>
                </div>
              </div>

              {/* Video Tour Section */}
              {property.videoUrl && (
                <div className="pf-card bg-white border border-gray-100 p-10 shadow-xl overflow-hidden">
                  <h3 className="text-2xl font-black text-pf-heading mb-8 flex items-center gap-3">
                    <PlayCircle size={24} className="text-pf-primary" /> Video Tour
                  </h3>
                  <div className="relative aspect-video w-full overflow-hidden rounded-[32px] bg-pf-background shadow-inner">
                    {property.videoUrl.includes('youtube.com') || property.videoUrl.includes('youtu.be') ? (
                      <iframe 
                        className="h-full w-full"
                        src={property.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}
                        title="Property Video Tour"
                        allowFullScreen
                      />
                    ) : (
                      <video 
                        controls 
                        className="h-full w-full object-cover"
                        poster={property.image}
                      >
                        <source src={property.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              )}

              <div className="pf-card bg-white border border-gray-100 p-10 shadow-xl">
                <h3 className="text-2xl font-black text-pf-heading mb-10">Amenities & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                  {amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group transition-transform hover:translate-x-2">
                      <div className="p-4 rounded-2xl bg-pf-background text-pf-primary group-hover:bg-pf-primary group-hover:text-white transition-all">
                        <item.icon size={24} />
                      </div>
                      <span className="font-black text-sm text-pf-heading tracking-wide">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pf-card bg-white border border-gray-100 p-10 shadow-xl">
                <h3 className="text-2xl font-black text-pf-heading mb-10">Property Facts</h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest">Property ID</span>
                    <span className="font-black text-pf-heading text-lg">PF-{property.id.toString().slice(-6)}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest">Type</span>
                    <span className="font-black text-pf-heading text-lg">{property.type}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest">Furnishing</span>
                    <span className="font-black text-pf-heading text-lg">Unfurnished</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
                    <span className="text-xs font-black text-pf-muted uppercase tracking-widest">Completion</span>
                    <span className="font-black text-pf-heading text-lg">Ready to Move</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Agent & Tools */}
            <div className="space-y-8">
              <div className="sticky top-24 space-y-8">
                <div className="pf-card bg-white border border-gray-100 p-8 shadow-2xl">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-pf-background shadow-lg">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${property.ownerName || 'Elena'}`} alt="Agent" />
                    </div>
                    <div>
                      <h4 className="font-black text-pf-heading text-xl tracking-tight">{property.ownerName || 'Elena Petrova'}</h4>
                      <p className="text-sm font-black text-pf-primary uppercase tracking-widest">Property Advisor</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <CheckCircle2 size={12} className="text-pf-primary fill-pf-primary" />
                        <span className="text-[11px] font-black text-pf-muted uppercase tracking-widest">Verified Specialist</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-pf-heading text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-pf-heading/20 hover:scale-[1.02] active:scale-[0.98] transition-all mb-2"
                    >
                      <Calendar size={20} /> Book a Viewing
                    </button>
                    <button className="w-full border-2 border-green-500 text-green-500 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-green-50 transition-all">
                      <MessageCircle size={22} /> WhatsApp
                    </button>
                    <button className="w-full border-2 border-pf-heading text-pf-heading font-black py-5 rounded-2xl hover:bg-pf-heading hover:text-white transition-all">
                      Email Agent
                    </button>
                  </div>
                </div>

                <div className="pf-card bg-pf-heading p-8 text-white overflow-hidden relative shadow-2xl group">
                  <div className="relative z-10">
                    <h4 className="text-xl font-black mb-2 tracking-tight">Mortgage Calculator</h4>
                    <p className="text-sm text-white/60 mb-8 font-medium">Find out your monthly payments for this property.</p>
                    <div className="text-4xl font-black mb-6 tracking-tight">AED 12,450 <span className="text-lg font-medium text-white/40 tracking-normal">/mo</span></div>
                    <Link href="/tools" className="inline-flex items-center gap-2 text-pf-primary font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Calculate Now <ChevronLeft size={18} className="rotate-180" />
                    </Link>
                  </div>
                  <div className="absolute -bottom-10 -right-10 text-white/5 transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-500">
                    <Building2 size={200} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        property={property}
      />
    </div>
  );
}
