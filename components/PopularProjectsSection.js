'use client';

const projects = [
  { title: 'Marina Heights', location: 'Dubai Marina', price: 'From AED 3.4M', status: 'Ready to move' },
  { title: 'Skyline Residences', location: 'Business Bay', price: 'From AED 2.1M', status: 'Off-plan' },
  { title: 'Palm Oasis', location: 'Jumeirah', price: 'From AED 5.8M', status: 'Luxury villas' },
];

export default function PopularProjectsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-pf-primary font-semibold mb-2">Explore projects</p>
            <h2 className="text-3xl md:text-4xl font-bold text-pf-heading">Top projects on the market</h2>
          </div>
          <button className="btn-secondary w-full md:w-auto">Browse projects</button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="pf-card p-6 border border-gray-100 hover:border-pf-primary transition">
              <div className="mb-4 rounded-3xl bg-pf-background p-5 text-sm font-semibold text-pf-primary">{project.status}</div>
              <h3 className="text-2xl font-bold text-pf-heading mb-2">{project.title}</h3>
              <p className="text-sm text-pf-muted mb-4">{project.location}</p>
              <div className="text-lg font-semibold text-pf-heading">{project.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
