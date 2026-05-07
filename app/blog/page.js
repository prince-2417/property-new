import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowUpRight, Tag, Bookmark } from 'lucide-react';
import Link from 'next/link';

const posts = [
  { 
    id: 1, 
    title: 'Top 5 Areas to Invest in Dubai Real Estate in 2026', 
    excerpt: 'Discover which communities are offering the highest rental yields and capital appreciation this year through our deep market analysis...',
    category: 'Market Intelligence',
    author: 'Michael Ross',
    date: 'May 10, 2026',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: 2, 
    title: 'A Step-by-Step Guide to Buying Your First Home in UAE', 
    excerpt: 'From mortgage pre-approval to the final handover, here is everything you need to know about the buying process in the current market...',
    category: 'Guides',
    author: 'Sarah Jenkins',
    date: 'May 08, 2026',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: 3, 
    title: 'The Rise of Sustainable Living: Eco-Friendly Communities', 
    excerpt: 'Sustainable developments are becoming the new standard in UAE. We explore the best eco-conscious projects in Dubai and beyond...',
    category: 'Lifestyle',
    author: 'David Chen',
    date: 'May 05, 2026',
    image: 'https://images.unsplash.com/photo-1449156001935-d28bc1cd7280?auto=format&fit=crop&q=80&w=1000'
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-pf-background text-white">
      <Navbar />
      
      <main className="pt-24 pb-32">
        <section className="relative min-h-[50vh] flex items-center py-24 mb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2070" 
              alt="Editorial Background" 
              className="h-full w-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-pf-background via-pf-background/70 to-pf-background" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-8 text-center mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent animate-in fade-in slide-in-from-bottom-4 duration-1000">Editorial Desk</p>
              <h1 className="font-serif italic text-6xl md:text-8xl text-pf-heading leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Property <br />
                <span className="font-normal not-italic text-white">Journal</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                The latest news, market insights, and expert advice from the elite UAE real estate market.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6">
          {/* Featured Post */}
          <div className="group relative overflow-hidden bg-pf-surface h-[700px] mb-24 cursor-pointer border border-white/5 transition-all duration-1000 hover:border-pf-accent/30">
            <img 
              src={posts[0].image} 
              className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale transition-all duration-[2s] group-hover:scale-105 group-hover:grayscale-0" 
              alt="Featured" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-background via-pf-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-pf-background/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-12 md:p-20 max-w-4xl space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-pf-accent text-black px-4 py-1.5 text-[9px] font-black uppercase tracking-widest">
                    Featured Insight
                  </span>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                    {posts[0].category}
                  </span>
                </div>
                <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight group-hover:italic transition-all duration-700">
                  {posts[0].title}
                </h2>
                <p className="text-white/40 text-xl font-light line-clamp-2 max-w-2xl">{posts[0].excerpt}</p>
              </div>
              
              <div className="flex items-center gap-12 pt-10 border-t border-white/5">
                <div className="flex items-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <Calendar size={14} className="text-pf-accent" /> {posts[0].date}
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <User size={14} className="text-pf-accent" /> {posts[0].author}
                </div>
                <button className="flex items-center gap-3 text-pf-accent font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition-all">
                  Read Journal <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-12 md:grid-cols-2">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="group bg-pf-surface border border-white/5 overflow-hidden transition-all duration-700 hover:border-pf-accent/30">
                <div className="relative h-[450px] overflow-hidden">
                  <img src={post.image} className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 opacity-60 group-hover:opacity-100" alt={post.title} />
                  <div className="absolute top-8 left-8">
                    <span className="bg-pf-background/80 backdrop-blur-md border border-white/10 px-6 py-3 text-[9px] font-black uppercase tracking-[0.3em] text-pf-accent">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-12 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-6 text-[9px] font-black text-white/20 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                      <span className="flex items-center gap-2"><Bookmark size={12} /> 10 min read</span>
                    </div>
                    <h3 className="font-serif text-4xl text-pf-heading leading-tight group-hover:italic transition-all duration-700">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-[13px] text-white/40 font-medium leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <button className="flex items-center gap-4 text-pf-accent font-black uppercase text-[10px] tracking-widest hover:text-white transition-all group-hover:translate-x-2 duration-500">
                    Explore Article <ArrowUpRight size={16} />
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
