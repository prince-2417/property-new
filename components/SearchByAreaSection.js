'use client';
import { useListings } from '@/context/ListingContext';

export default function SearchByAreaSection() {
  const { areas } = useListings();

  return (
    <section className="bg-pf-background py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Discovery</p>
            <h2 className="editorial-heading text-pf-heading">Premier <br /><span className="italic font-light text-white">Neighbourhoods</span></h2>
          </div>
          <button className="btn-pill btn-outline">
            Explore All Areas
          </button>
        </div>

        <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <div key={area.name} className="group relative h-[300px] sm:h-[500px] overflow-hidden bg-pf-surface transition-all duration-700 cursor-pointer border border-white/5 hover:border-pf-accent/30">
              <img 
                src={area.image} 
                alt={area.name} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pf-background via-pf-background/20 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-px h-20 bg-pf-accent mb-6 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pf-heading">View Portfolio</p>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10 group-hover:translate-y-[-20px] transition-transform duration-700">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-pf-accent mb-3">{area.label}</p>
                <h3 className="font-serif text-3xl text-pf-heading mb-2 leading-tight group-hover:italic transition-all">{area.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{area.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
