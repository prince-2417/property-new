'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Building, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  { id: 1, name: 'Creek Bay', developer: 'Emaar Properties', location: 'Dubai Creek Harbour', city: 'Dubai', price: '1,797,888 AED', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000', tag: 'New Launch' },
  { id: 2, name: 'The Meriva Collection', developer: 'Nakheel', location: 'Dubai Islands', city: 'Dubai', price: '2,700,000 AED', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000', tag: 'Exclusive' },
  { id: 3, name: 'Avarra by Palace', developer: 'Address Hotels', location: 'Business Bay', city: 'Dubai', price: '2,824,888 AED', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000', tag: 'Premium' },
  { id: 5, name: 'Yas Golf Collection', developer: 'Aldar', location: 'Yas Island', city: 'Abu Dhabi', price: '1,200,000 AED', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000', tag: 'Selling Fast' },
  { id: 6, name: 'Saadiyat Grove', developer: 'Aldar', location: 'Saadiyat Island', city: 'Abu Dhabi', price: '3,100,000 AED', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000', tag: 'Cultural' },
  { id: 7, name: 'Aljada', developer: 'Arada', location: 'Muwailih', city: 'Sharjah', price: '850,000 AED', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1000', tag: 'Community' },
  { id: 8, name: 'Mina Al Arab', developer: 'RAK Properties', location: 'Hayat Island', city: 'Ras Al Khaimah', price: '1,100,000 AED', image: 'https://images.unsplash.com/photo-1600566752355-397921137bf1?auto=format&fit=crop&q=80&w=1000', tag: 'Resort Living' },
];

export default function NewProjectsPage() {
  const [activeCity, setActiveCity] = useState('All Projects');

  const filteredProjects = projects.filter(p => 
    activeCity === 'All Projects' || p.city === activeCity
  );

  return (
    <div className="min-h-screen bg-pf-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-32">
        <section className="relative min-h-[50vh] flex items-center py-24 mb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
              alt="Luxury Developments" 
              className="h-full w-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-pf-background via-pf-background/70 to-pf-background" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-8 text-center mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent animate-in fade-in slide-in-from-bottom-4 duration-1000">Future Legacies</p>
              <h1 className="font-serif italic text-6xl md:text-8xl text-pf-heading leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                New Projects <br />
                <span className="font-normal not-italic text-white">& Off-plan</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                Discover the latest residential developments and off-plan properties across the UAE. Invest in the future of modern living.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 mb-20 justify-center">
            {['All Projects', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'].map((city) => (
              <button 
                key={city} 
                onClick={() => setActiveCity(city)}
                className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeCity === city ? 'bg-pf-accent text-black shadow-2xl shadow-pf-accent/20' : 'bg-pf-surface border border-white/5 text-white/40 hover:text-white hover:border-white/20'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            {/* Projects Grid */}
            <div className="grid gap-px bg-white/5 border border-white/5 grid-cols-1 xl:grid-cols-2 self-start">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} className="group relative h-[600px] overflow-hidden bg-pf-surface transition-all duration-700 cursor-pointer">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pf-background via-pf-background/20 to-transparent" />
                    
                    <div className="absolute top-10 left-10">
                      <span className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] text-white">
                        {project.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-12 space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-pf-accent">
                          <Building size={12} /> {project.developer}
                        </div>
                        <h3 className="font-serif text-4xl text-pf-heading leading-tight group-hover:italic transition-all duration-700">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                          <MapPin size={12} className="text-white/10" /> {project.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-8 border-t border-white/5">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-white/10 uppercase tracking-widest">Entry Valuation</p>
                          <p className="text-2xl font-serif italic text-white tracking-tight">{project.price}</p>
                        </div>
                        <button className="h-16 w-16 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group-hover:bg-pf-accent group-hover:text-black group-hover:border-pf-accent duration-700">
                          <ArrowUpRight size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center bg-pf-surface">
                  <p className="text-white/20 font-serif italic text-2xl">No upcoming legacies in this region yet.</p>
                </div>
              )}
            </div>

            {/* Sticky Map */}
            <div className="sticky top-28 self-start border border-white/5 overflow-hidden" style={{height: '600px'}}>
              <div className="px-6 py-4 bg-pf-surface border-b border-white/5 flex items-center gap-3">
                <MapPin size={14} className="text-pf-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">UAE Project Locations</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m2!1m1!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2m2!1d55.2708!2d25.2048!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae&z=7&center=24.4539,54.3773"
                width="100%"
                height="100%"
                style={{border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)'}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
