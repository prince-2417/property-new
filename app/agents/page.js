import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, MapPin, Award, Star, Phone, MessageSquare } from 'lucide-react';

const agents = [
  { id: 1, name: 'Sarah Ahmed', agency: 'Exclusive Real Estate', area: 'Dubai Marina', properties: 45, rating: 4.9, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 2, name: 'John Smith', agency: 'Luxe Living UAE', area: 'Palm Jumeirah', properties: 32, rating: 4.8, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 3, name: 'Elena Petrova', agency: 'Skyline Properties', area: 'Downtown Dubai', properties: 28, rating: 5.0, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 4, name: 'Mohammed Ali', agency: 'Emaar Platinum Partner', area: 'Dubai Hills Estate', properties: 56, rating: 4.7, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed' },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="bg-white border-b border-gray-100 py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-pf-heading mb-6">Find a Real Estate Agent</h1>
              <p className="text-pf-muted text-lg mb-10">Connect with the most professional and verified agents in the UAE to help you find your dream home.</p>
              
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-pf-background rounded-[32px] border border-gray-200">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search size={20} className="text-pf-muted" />
                  <input type="text" placeholder="Search by name, area or agency..." className="w-full bg-transparent py-4 text-sm focus:outline-none" />
                </div>
                <button className="btn-primary px-10">Search Agents</button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {agents.map((agent) => (
              <div key={agent.id} className="pf-card group bg-white border border-gray-100 p-6 flex flex-col items-center text-center hover:border-pf-primary transition">
                <div className="relative mb-6">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-pf-background group-hover:border-pf-primary/20 transition">
                    <img src={agent.image} alt={agent.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-pf-primary text-white p-2 rounded-full shadow-lg">
                    <Award size={18} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-pf-heading mb-1">{agent.name}</h3>
                <p className="text-sm font-bold text-pf-primary mb-4">{agent.agency}</p>
                
                <div className="flex items-center gap-1 text-xs text-pf-muted mb-6">
                  <MapPin size={14} /> {agent.area}
                </div>

                <div className="grid grid-cols-2 w-full gap-4 border-y border-gray-50 py-4 mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-pf-muted uppercase">Properties</p>
                    <p className="text-sm font-bold">{agent.properties}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-pf-muted uppercase">Rating</p>
                    <p className="text-sm font-bold flex items-center justify-center gap-1">
                      {agent.rating} <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-pf-background py-3 text-sm font-bold text-pf-heading hover:bg-pf-primary hover:text-white transition">
                    <Phone size={16} /> Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-pf-primary py-3 text-sm font-bold text-white shadow-sm hover:opacity-95 transition">
                    <MessageSquare size={16} /> Chat
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
