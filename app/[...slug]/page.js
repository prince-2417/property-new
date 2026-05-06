'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const pageMap = {
  buy: {
    title: 'Buy Residential Properties',
    description: 'Explore apartments, villas, townhouses, lands and all residential sale options in the UAE.',
    sections: [
      { title: 'Apartments', description: 'Search apartments across top communities with the latest sale listings.' },
      { title: 'Villas', description: 'Premium villas for families, waterfront homes and gated communities.' },
      { title: 'Townhouses', description: 'Townhouses for sale in residential neighbourhoods and masterplans.' },
      { title: 'Land', description: 'Developable land and plots across Dubai, Abu Dhabi and nearby emirates.' },
    ],
    tools: [
      'Mortgage Calculator',
      'Sold House Prices',
      'Sale Price Map',
      'Buying Insights',
    ],
    guides: [
      'Buyer\'s Guide',
      'Area Insights',
      'Community Guides',
      'Tower & Compound Guides',
      'Schools & University Guides',
    ],
    actions: [
      { title: 'See Your Mortgage Estimate', href: '/tools' },
      { title: 'Buy Commercial Properties', href: '/buy' },
      { title: 'Find a Real Estate Agent', href: '/agents' },
    ],
  },
  rent: {
    title: 'Rent Residential Properties',
    description: 'Browse rental apartments, studios, villas and townhouses with tools to compare and find your next home.',
    sections: [
      { title: 'Apartments', description: 'Find rental apartments in all major Dubai and Abu Dhabi districts.' },
      { title: 'Studios', description: 'Compact studios for city living and easy budget planning.' },
      { title: 'Villas', description: 'Spacious rental villas in gated communities and waterfront locations.' },
      { title: 'Townhouses', description: 'Family-friendly townhouses and low-rise options for rent.' },
    ],
    tools: [
      'Rent vs Buy Calculator',
      'Rented House Prices',
      'Rental Price Map',
      'Renting Insights',
    ],
    guides: [
      'Renter\'s Guide',
      'Area Insights',
      'Community Guides',
      'Tower & Compound Guides',
      'Schools & University Guides',
    ],
    actions: [
      { title: 'Read Article', href: '/blog' },
      { title: 'Rent Commercial Properties', href: '/rent' },
      { title: 'Short-Term Rentals', href: '/rent' },
    ],
  },
  'new-projects': {
    title: 'New Projects & Off-plan',
    description: 'Discover new developments across the UAE, from Dubai to Ras Al Khaimah.',
    sections: [
      { title: 'All New Projects', description: 'Browse all new developments and off-plan communities.' },
      { title: 'New Projects in Dubai', description: 'Latest launches across Dubai including luxury and mid-range options.' },
      { title: 'New Projects in Abu Dhabi', description: 'Prime Abu Dhabi launches with modern amenities and investment potential.' },
      { title: 'New Projects in Sharjah', description: 'Affordable and family-friendly project launches in Sharjah.' },
    ],
    tools: [
      'Find Developers',
      'Off-plan Properties',
      'Investor\'s Guide',
      'Latest Projects',
    ],
    guides: [
      'Discover New Projects',
      'New Off-plan Projects in UAE',
      'Find Developers in the UAE',
    ],
    actions: [
      { title: 'All New Projects', href: '/new-projects' },
      { title: 'Find Developers', href: '/new-projects' },
      { title: 'Discover New Projects', href: '/blog' },
    ],
  },
  tools: {
    title: 'Tools & Insights',
    description: 'Access mortgage calculators, transaction maps, market reports and guides to support your property decisions.',
    sections: [
      { title: 'Tools', description: 'Mortgage Calculator, Rent vs Buy Calculator, Rental Transactions and Sale Transactions.' },
      { title: 'Insights', description: 'Market Reports, Renter Guides, Buyer Guides, Popular Communities and Area Insights.' },
    ],
    tools: [
      'Mortgage Calculator',
      'Rent vs Buy Calculator',
      'Rental Transactions',
      'Sale Transactions',
    ],
    guides: [
      'Market Reports',
      'Renter Guides',
      'Buyer Guides',
      'Popular Communities',
      'Area Insights',
    ],
    actions: [
      { title: 'Mortgage Calculator', href: '/tools' },
      { title: 'Area Insights', href: '/tools' },
      { title: 'Find Agents', href: '/agents' },
    ],
  },
  blog: {
    title: 'Property Blog',
    description: 'Browse insights, market guidance and the latest property news from the UAE market.',
    sections: [
      { title: 'Buying Insights', description: 'Advice for first-time buyers and investors.' },
      { title: 'Renting Insights', description: 'Tips for rental budget planning and neighborhood selection.' },
      { title: 'Market Reports', description: 'Latest trends and price movement across the UAE.' },
    ],
    tools: [
      'Explore Blog',
      'Mortgage Calculator',
      'Rent vs Buy Calculator',
      'Area Insights',
    ],
    guides: [
      'Popular Communities',
      'Budget-Friendly Areas',
      'Area Insights',
    ],
    actions: [
      { title: 'Mortgage Calculator', href: '/tools' },
      { title: 'Find Agents', href: '/agents' },
      { title: 'Explore Blog', href: '/blog' },
    ],
  },
  agents: {
    title: 'Find a Real Estate Agent',
    description: 'Connect with verified agents who can help you buy, rent or sell in the UAE.',
    sections: [
      { title: 'Agent Search', description: 'Find agents by area, price range and specialisation.' },
      { title: 'Verified Agents', description: 'Work only with trusted agents who are verified and reviewed.' },
    ],
    tools: [
      'Find a Real Estate Agent',
      'Mortgage Calculator',
      'Area Insights',
    ],
    guides: [
      'Buyer\'s Guide',
      'Renter\'s Guide',
      'Investor\'s Guide',
    ],
    actions: [
      { title: 'Find Developers', href: '/new-projects' },
      { title: 'Buy Residential Properties', href: '/buy' },
      { title: 'Rent Residential Properties', href: '/rent' },
    ],
  },
  login: {
    title: 'Login',
    description: 'Access your account to save favourite properties, view alerts and manage your search.',
    sections: [
      { title: 'Saved Properties', description: 'Keep all your shortlisted homes in one place.' },
      { title: 'Alerts & Notifications', description: 'Get notified when new listings match your criteria.' },
      { title: 'Account Settings', description: 'Manage your profile, search preferences and alerts.' },
    ],
    tools: [
      'Saved Properties',
      'Alerts',
      'Search History',
    ],
    guides: [
      'How to save listings',
      'Setting up alerts',
      'Managing preferences',
    ],
    actions: [
      { title: 'Login', href: '/login' },
    ],
  },
};

function capitalize(word) {
  return word[0]?.toUpperCase() + word.slice(1);
}

export default function DynamicPage({ params }) {
  const slug = params.slug || [];
  const pageKey = slug[0] || 'buy';
  const page = pageMap[pageKey] || {
    title: 'Page not found',
    description: 'This page does not exist yet. Use the navigation menu to pick a section.',
    sections: [],
    tools: [],
    guides: [],
    actions: [],
  };

  return (
    <main className="bg-pf-background min-h-screen text-pf-text">
      <Navbar />
      <section className="pt-28 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-pf-primary font-semibold mb-3">{capitalize(pageKey)}</p>
            <h1 className="text-4xl font-bold text-pf-heading mb-4">{page.title}</h1>
            <p className="text-base text-pf-muted mb-8">{page.description}</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6">
              {page.sections.map((section) => (
                <div key={section.title} className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-pf-heading mb-2">{section.title}</h2>
                  <p className="text-sm text-pf-muted">{section.description}</p>
                </div>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-pf-heading mb-4">Quick tools</h2>
                <ul className="space-y-3 text-sm text-pf-muted">
                  {page.tools.map((item) => (
                    <li key={item} className="rounded-2xl border border-gray-200 bg-pf-background px-4 py-3">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-pf-heading mb-4">Guides</h2>
                <ul className="space-y-3 text-sm text-pf-muted">
                  {page.guides.map((item) => (
                    <li key={item} className="rounded-2xl border border-gray-200 bg-pf-background px-4 py-3">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-pf-heading mb-4">Explore</h2>
                <div className="space-y-3">
                  {page.actions.map((action) => (
                    <Link key={action.title} href={action.href} className="block rounded-2xl bg-pf-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-95 transition">
                      {action.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
