'use client';
import { useListings } from '@/context/ListingContext';

export default function SearchByAreaSection() {
  const { areas } = useListings();

  return (
    <section className="bg-pf-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-pf-primary font-extrabold mb-4">Location Guide</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-pf-heading tracking-tighter">Premier Neighbourhoods</h2>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-pf-heading text-[11px] font-black uppercase tracking-[0.2em] hover:border-pf-primary hover:text-pf-primary transition-all">
            View All Areas
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <div key={area.name} className="group relative h-[400px] overflow-hidden rounded-[32px] bg-white shadow-xl transition-all duration-500 hover:translate-y-[-8px]">
              <img 
                src={area.image} 
                alt={area.name} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pf-primary mb-2">{area.label}</p>
                <h3 className="text-2xl font-black text-white mb-2">{area.name}</h3>
                <p className="text-sm text-white/60 font-medium">{area.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

