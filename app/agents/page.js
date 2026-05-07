import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, MapPin, Award, Star, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const agents = [
  { id: 1, name: 'Sarah Ahmed', agency: 'Exclusive Real Estate', area: 'Dubai Marina', properties: 45, rating: 4.9, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'John Smith', agency: 'Luxe Living UAE', area: 'Palm Jumeirah', properties: 32, rating: 4.8, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: 'Elena Petrova', agency: 'Skyline Properties', area: 'Downtown Dubai', properties: 28, rating: 5.0, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
  { id: 4, name: 'Mohammed', agency: 'Emaar Platinum Partner', area: 'Dubai Hills Estate', properties: 56, rating: 4.7, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-pf-background text-white">
      <Navbar />

      <main className="pt-24 pb-32">
        <section className="relative min-h-[60vh] flex items-center py-24 mb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070"
              alt="Luxury Office"
              className="h-full w-full object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100 grayscale"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-pf-background/20 via-transparent to-pf-background" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-12">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent animate-in fade-in slide-in-from-left-4 duration-1000">Premier Advisory</p>
                <h1 className="font-serif italic text-6xl md:text-8xl text-pf-heading leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Find a Real <br />
                  <span className="font-normal not-italic text-white">Estate Agent</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/40 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                  Connect with the most professional and verified agents in the UAE to help you find your dream home.
                </p>
              </div>

              <div className="max-w-2xl flex flex-col md:flex-row gap-0 p-2 bg-pf-surface border border-white/5 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                <div className="flex-1 flex items-center gap-4 px-8 py-4 border-r border-white/5">
                  <Search size={20} className="text-pf-accent" />
                  <input
                    type="text"
                    placeholder="Search by name, area or agency..."
                    className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-white/20"
                  />
                </div>
                <button className="bg-pf-accent hover:bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                  Search Agents <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6">
          <div className="mb-12 flex items-center justify-between border-b border-white/5 pb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              Verified Partners <span className="text-pf-accent mx-2">•</span> <span className="text-white">Active Global Directory</span>
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-pf-surface border border-white/5 p-10 flex flex-col items-center text-center group hover:border-pf-accent/30 transition-all duration-700">
                <div className="relative mb-10">
                  <div className="h-40 w-40 rounded-none overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <img src={agent.image} alt={agent.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-pf-accent text-black px-4 py-2 text-[8px] font-black uppercase tracking-widest shadow-2xl">
                    Verified Expert
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <h3 className="font-serif text-3xl text-pf-heading group-hover:italic transition-all">{agent.name}</h3>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{agent.agency}</p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black text-pf-accent uppercase tracking-widest mb-10">
                  <MapPin size={12} /> {agent.area}
                </div>

                <div className="grid grid-cols-2 w-full gap-8 border-y border-white/5 py-8 mb-10">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Portfolio</p>
                    <p className="text-lg font-serif italic text-white">{agent.properties} Units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Rating</p>
                    <p className="text-lg font-serif italic text-pf-accent flex items-center justify-center gap-2">
                      {agent.rating} <Star size={14} className="fill-pf-accent" />
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <button className="flex-1 border border-white/5 py-4 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Inquiry
                  </button>
                  <button className="flex-1 bg-white text-black py-4 text-[9px] font-black uppercase tracking-widest hover:bg-pf-accent transition-all">
                    Direct Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
