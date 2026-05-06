export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pf-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-pf-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-pf-heading mb-4">Page Not Found</h2>
        <p className="text-pf-muted mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block bg-pf-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}