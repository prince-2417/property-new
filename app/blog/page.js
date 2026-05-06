import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const posts = [
  { 
    id: 1, 
    title: 'Top 5 Areas to Invest in Dubai Real Estate in 2026', 
    excerpt: 'Discover which communities are offering the highest rental yields and capital appreciation this year...',
    category: 'Market Insights',
    author: 'Michael Ross',
    date: 'May 10, 2026',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: 2, 
    title: 'A Step-by-Step Guide to Buying Your First Home in UAE', 
    excerpt: 'From mortgage pre-approval to the final handover, here is everything you need to know about the buying process...',
    category: 'Guides',
    author: 'Sarah Jenkins',
    date: 'May 08, 2026',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000'
  },
  { 
    id: 3, 
    title: 'The Rise of Sustainable Living: Eco-Friendly Communities', 
    excerpt: 'Sustainable developments are becoming the new standard in UAE. We explore the best eco-conscious projects...',
    category: 'Lifestyle',
    author: 'David Chen',
    date: 'May 05, 2026',
    image: 'https://images.unsplash.com/photo-1449156001935-d28bc1cd7280?auto=format&fit=crop&q=80&w=1000'
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="bg-white border-b border-gray-100 py-16 mb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-black text-pf-heading mb-6">Property Blog</h1>
            <p className="text-pf-muted text-xl max-w-2xl">The latest news, market insights, and expert advice from the UAE real estate market.</p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <div className="group relative overflow-hidden rounded-[40px] bg-pf-heading h-[500px] mb-12 cursor-pointer shadow-2xl">
            <img 
              src={posts[0].image} 
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-40" 
              alt="Featured" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-heading via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 md:p-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-pf-primary px-4 py-1.5 text-xs font-bold text-white mb-6">
                <Tag size={14} /> Featured Article
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-pf-primary transition">
                {posts[0].title}
              </h2>
              <p className="text-white/80 text-lg mb-8 line-clamp-2">{posts[0].excerpt}</p>
              <button className="flex items-center gap-2 text-white font-bold hover:text-pf-primary transition">
                Read Full Article <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="pf-card group bg-white border border-gray-100 overflow-hidden">
                <div className="relative h-60 overflow-hidden">
                  <img src={post.image} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" alt={post.title} />
                  <div className="absolute top-4 left-4 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase text-pf-primary">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-pf-muted uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-pf-heading mb-4 group-hover:text-pf-primary transition line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-pf-muted mb-6 line-clamp-3">{post.excerpt}</p>
                  <button className="flex items-center gap-2 text-pf-primary font-bold text-sm hover:underline">
                    Read More <ArrowRight size={16} />
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
