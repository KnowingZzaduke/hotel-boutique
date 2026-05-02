import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Hotel color palette — warm, colonial, luxury
      colors: {
        // shadcn semantic tokens (CSS variable based)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Hotel-specific named colors for direct use
        hotel: {
          bg: '#FAF6F0',
          surface: '#FFFFFF',
          'surface-alt': '#F5EDE0',
          text: '#2A2620',
          'text-secondary': '#6B6259',
          'text-tertiary': '#9A9088',
          primary: '#8B6F47',
          gold: '#C9A86B',
          'gold-light': '#DFC48A',
          deep: '#4A3829',
          botanical: '#6B7F5C',
          // dark mode variants
          'dark-bg': '#1A1612',
          'dark-surface': '#252019',
          'dark-surface-alt': '#2D261D',
          'dark-text': '#F5EDE0',
          'dark-text-secondary': '#C4B8A6',
          'dark-gold': '#D4B47C',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Hotel design system type scale
        'hero': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],        // 80px
        'hero-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],      // 48px
        'section': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],   // 56px
        'section-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }], // 36px
        'heading': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],      // 32px
        'heading-sm': ['1.5rem', { lineHeight: '1.25' }],                          // 24px
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],                           // 17px
        'body': ['1rem', { lineHeight: '1.7' }],                                   // 16px
        'label': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.15em' }],    // 14px uppercase
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.08) translateX(0%)' },
          '50%': { transform: 'scale(1.12) translateX(-1%)' },
          '100%': { transform: 'scale(1.08) translateX(0%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'pulse-slow': 'pulse-slow 2.5s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
        'ken-burns': 'ken-burns 18s ease-in-out infinite',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'hotel': '0 4px 32px -4px rgba(42, 38, 32, 0.12)',
        'hotel-lg': '0 12px 48px -8px rgba(42, 38, 32, 0.18)',
        'hotel-xl': '0 24px 64px -12px rgba(42, 38, 32, 0.22)',
        'gold': '0 4px 24px -4px rgba(201, 168, 107, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
