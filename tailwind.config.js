/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { primary:'var(--color-ink)',accent:'var(--color-accent)',paper:'var(--color-paper)',muted:'var(--color-muted)',navy:'var(--color-deep)' },
    fontFamily: { body:['var(--font-body)'] },
  } },
  plugins: [],
};
