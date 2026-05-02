'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-inter text-sm',
          style: {
            background: 'var(--hotel-surface)',
            color: 'var(--hotel-text)',
            border: '1px solid var(--hotel-border-strong)',
            borderRadius: '4px',
          },
        }}
      />
    </ThemeProvider>
  );
}
