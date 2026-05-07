'use client';
import { useListings } from '@/context/ListingContext';

export default function PopularProjectsSection() {
  const { projects } = useListings();

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-pf-primary font-extrabold mb-4">Elite Collection</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-pf-heading tracking-tighter">Signature Developments</h2>
          </div>
          <button className="px-8 py-4 rounded-2xl border-2 border-pf-primary/10 text-pf-primary text-[11px] font-black uppercase tracking-[0.2em] hover:bg-pf-primary hover:text-white transition-all">
            Explore All Projects
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden rounded-[32px] bg-pf-background h-[500px] shadow-2xl transition-all duration-500 hover:translate-y-[-8px]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-90" />
              
              <div className="absolute top-6 left-6">
                <span className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                  {project.status}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-white/60 font-medium">{project.location}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-pf-primary">{project.price}</span>
                  <button className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-pf-primary hover:border-pf-primary transition-all group-hover:translate-x-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

