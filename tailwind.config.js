/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pf-primary': 'var(--pf-primary)',
        'pf-secondary': 'var(--pf-secondary)',
        'pf-background': 'var(--pf-background)',
        'pf-surface': 'var(--pf-surface)',
        'pf-text': 'var(--pf-text)',
        'pf-heading': 'var(--pf-heading)',
        'pf-muted': 'var(--pf-muted)',
        'pf-border': 'var(--pf-border)',
        // Compatibility with old code
        'primary': 'var(--pf-primary)',
        'secondary': 'var(--pf-secondary)',
        'background': 'var(--pf-background)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
};
