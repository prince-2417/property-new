import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, MapPin, Building, ChevronRight } from 'lucide-react';

const projects = [
  { id: 1, name: 'Creek Bay', developer: 'Emaar Properties', location: 'Dubai Creek Harbour', price: '1,797,888 AED', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000', tag: 'New Launch' },
  { id: 2, name: 'The Meriva Collection', developer: 'Nakheel', location: 'Dubai Islands', price: '2,700,000 AED', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000', tag: 'Exclusive' },
  { id: 3, name: 'Avarra by Palace', developer: 'Address Hotels', location: 'Business Bay', price: '2,824,888 AED', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000', tag: 'Premium' },
  { id: 4, name: 'Lyvia by Palace', developer: 'Emaar Properties', location: 'Dubai Creek Harbour', price: '2,684,888 AED', image: 'https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=1000', tag: 'Luxury' },
];

export default function NewProjectsPage() {
  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="bg-white border-b border-gray-100 py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-pf-primary/10 px-4 py-1.5 text-sm font-bold text-pf-primary mb-6">
              <Sparkles size={16} /> Explore New Horizons
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-pf-heading mb-6 italic">New Projects & Off-plan</h1>
            <p className="text-pf-muted max-w-3xl mx-auto text-lg">
              Discover the latest residential developments and off-plan properties across the UAE. Invest in the future of modern living.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            {['All Projects', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'].map((city) => (
              <button key={city} className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${
                city === 'All Projects' ? 'bg-pf-primary text-white shadow-lg shadow-pf-primary/20' : 'bg-white border border-gray-200 text-pf-muted hover:border-pf-primary hover:text-pf-primary'
              }`}>
                {city}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <div key={project.id} className="pf-card group overflow-hidden bg-white border border-gray-100 transition-all hover:scale-[1.02]">
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-pf-primary shadow-sm">
                    {project.tag}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-pf-muted mb-2">
                    <Building size={14} /> {project.developer}
                  </div>
                  <h3 className="text-xl font-bold text-pf-heading mb-2 group-hover:text-pf-primary transition">{project.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-pf-muted mb-6">
                    <MapPin size={14} /> {project.location}
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div>
                      <p className="text-[10px] font-bold text-pf-muted uppercase tracking-tighter">Launch Price</p>
                      <p className="text-lg font-black text-pf-primary">{project.price}</p>
                    </div>
                    <button className="h-10 w-10 rounded-full bg-pf-background text-pf-primary flex items-center justify-center hover:bg-pf-primary hover:text-white transition">
                      <ChevronRight size={20} />
                    </button>
                  </div>
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
