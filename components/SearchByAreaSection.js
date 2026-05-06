'use client';

const areas = [
  { name: 'Dubai Marina', count: '2,450 listings', label: 'Waterfront living' },
  { name: 'Downtown Dubai', count: '1,820 listings', label: 'Luxury skyscrapers' },
  { name: 'Jumeirah Village Circle', count: '1,150 listings', label: 'Family neighbourhood' },
  { name: 'Business Bay', count: '1,330 listings', label: 'Urban lifestyle' },
];

export default function SearchByAreaSection() {
  return (
    <section className="bg-pf-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-pf-primary font-semibold mb-2">Search by area</p>
            <h2 className="text-3xl md:text-4xl font-bold text-pf-heading">Explore popular neighbourhoods</h2>
          </div>
          <button className="btn-secondary w-full md:w-auto">See all areas</button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {areas.map((area) => (
            <div key={area.name} className="pf-card p-6 border border-gray-100 hover:border-pf-primary transition">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-pf-primary mb-3">{area.name}</div>
              <h3 className="text-xl font-bold text-pf-heading mb-2">{area.count}</h3>
              <p className="text-sm text-pf-muted">{area.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
