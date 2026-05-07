'use client';
import { useListings } from '@/context/ListingContext';
import { ArrowRight } from 'lucide-react';

export default function PopularProjectsSection() {
  const { projects } = useListings();

  return (
    <section className="bg-pf-background py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Elite Collection</p>
            <h2 className="editorial-heading text-pf-heading">Signature <br /><span className="italic font-light text-white">Developments</span></h2>
          </div>
          <button className="btn-pill btn-outline">
            View All Projects
          </button>
        </div>

        <div className="grid gap-px bg-white/5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-white/5">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden bg-pf-surface h-[400px] sm:h-[600px] transition-all duration-700">
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pf-background via-pf-background/20 to-transparent" />
              
              <div className="absolute top-10 left-10">
                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-white">
                  {project.status}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-12 space-y-8">
                <div className="space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{project.location}</p>
                  <h3 className="font-serif text-4xl text-pf-heading leading-tight group-hover:italic transition-all">{project.title}</h3>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-xl font-normal font-serif text-pf-accent italic">{project.price}</span>
                  <button className="h-14 w-14 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                    <ArrowRight size={20} />
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
