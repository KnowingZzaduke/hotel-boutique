'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowRight, Lock } from 'lucide-react';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  };
}

export function Newsletter() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

    setSending(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error();
      toast.success(t('success'));
      setEmail('');
    } catch {
      toast.error(t('error'));
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-hotel-deep py-24 lg:py-32 overflow-hidden relative">
      {/* Subtle decorative line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hotel-gold/30 to-transparent" />

      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">

          <motion.p {...fadeUp(0)} className="text-pretitle text-hotel-gold mb-3">
            {t('pretitle')}
          </motion.p>

          <motion.div {...fadeUp(0.05)} className="gold-divider mx-auto mb-7" />

          <motion.h2
            {...fadeUp(0.1)}
            className="text-h2 text-white mb-5 whitespace-pre-line leading-tight"
          >
            {t('title')}
          </motion.h2>

          <motion.p {...fadeUp(0.18)} className="font-inter text-[0.9rem] text-white/55 mb-12 leading-relaxed">
            {t('subtitle')}
          </motion.p>

          {/* Form */}
          <motion.form
            {...fadeUp(0.25)}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholder')}
              required
              disabled={sending}
              className="flex-1 font-inter text-[0.875rem] text-white bg-white/8 border border-white/15 rounded-sm px-5 py-3.5 outline-none placeholder:text-white/35 transition-colors duration-200 focus:border-hotel-gold/50 focus:ring-1 focus:ring-hotel-gold/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 bg-hotel-gold text-hotel-deep font-inter font-semibold text-sm tracking-wide px-7 py-3.5 rounded-sm transition-all duration-300 hover:bg-[#D4B47C] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {sending ? t('sending') : t('cta')}
              {!sending && <ArrowRight size={14} strokeWidth={2} />}
            </button>
          </motion.form>

          {/* Privacy note */}
          <motion.p {...fadeUp(0.32)} className="inline-flex items-center gap-1.5 font-inter text-[11px] text-white/30">
            <Lock size={10} strokeWidth={1.5} />
            {t('privacy')}
          </motion.p>

        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hotel-gold/20 to-transparent" />
    </section>
  );
}
