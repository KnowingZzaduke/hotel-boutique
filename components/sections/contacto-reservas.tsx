'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  };
}

const inputBase =
  'w-full font-inter text-[0.875rem] text-hotel-text bg-hotel-bg border border-hotel-text/12 rounded-sm px-4 py-3 outline-none placeholder:text-hotel-text-tertiary/60 transition-colors duration-200 focus:border-hotel-gold/60 focus:ring-1 focus:ring-hotel-gold/20';

export function ContactoReservas() {
  const t = useTranslations('contacto');
  const locale = useLocale();
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      toast.success(t('form.success'));
      reset();
    } catch {
      toast.error(t('form.error'));
    } finally {
      setSending(false);
    }
  };

  const infoItems = [
    { Icon: Phone, label: t('info.phone'),     value: '+57 305 234 5678' },
    { Icon: Mail,  label: t('info.email'),     value: 'reservas@casaboutiquesandiego.com' },
    { Icon: Clock, label: t('info.reception'), value: t('info.receptionValue') },
  ];

  return (
    <section className="bg-hotel-surface-alt py-24 lg:py-32">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14 lg:mb-20">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text mb-4">{t('title')}</h2>
          <p className="font-inter text-[0.9rem] text-hotel-text-secondary max-w-lg mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* Form */}
          <motion.form
            {...fadeUp(0.1)}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-hotel-surface shadow-hotel p-8 lg:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-inter text-[10px] uppercase tracking-[0.16em] text-hotel-text-tertiary block mb-2">
                  {t('form.name')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  className={inputBase}
                  placeholder="Ana García"
                />
                {errors.name && (
                  <p className="font-inter text-[11px] text-red-500/80 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="font-inter text-[10px] uppercase tracking-[0.16em] text-hotel-text-tertiary block mb-2">
                  {t('form.email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className={inputBase}
                  placeholder="ana@ejemplo.com"
                />
                {errors.email && (
                  <p className="font-inter text-[11px] text-red-500/80 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="font-inter text-[10px] uppercase tracking-[0.16em] text-hotel-text-tertiary block mb-2">
                {t('form.phone')}
              </label>
              <input
                {...register('phone')}
                type="tel"
                autoComplete="tel"
                className={inputBase}
                placeholder="+57 300 000 0000"
              />
            </div>

            <div>
              <label className="font-inter text-[10px] uppercase tracking-[0.16em] text-hotel-text-tertiary block mb-2">
                {t('form.message')}
              </label>
              <textarea
                {...register('message')}
                rows={5}
                className={`${inputBase} resize-none`}
                placeholder={t('form.messagePlaceholder')}
              />
              {errors.message && (
                <p className="font-inter text-[11px] text-red-500/80 mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-hotel-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? t('form.sending') : t('form.submit')}
              {!sending && <Send size={14} strokeWidth={1.5} />}
            </button>
          </motion.form>

          {/* Info sidebar */}
          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-5">

            {/* Contact info */}
            <div className="bg-hotel-surface shadow-hotel p-7 space-y-5">
              {infoItems.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-hotel-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-hotel-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-[0.16em] text-hotel-text-tertiary mb-0.5">
                      {label}
                    </p>
                    <p className="font-inter text-[0.875rem] text-hotel-text leading-snug break-all">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-hotel-deep p-7 text-center">
              <MessageCircle size={28} className="text-hotel-gold mx-auto mb-3" strokeWidth={1} />
              <p className="font-cormorant italic text-[1.1rem] text-white/70 mb-4">
                {t('whatsappLabel')}
              </p>
              <a
                href="https://wa.me/573052345678?text=Hola%2C%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Casa%20Boutique%20San%20Diego."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full border border-hotel-gold/40 text-hotel-gold font-inter font-medium text-sm tracking-wide px-6 py-3 rounded-sm transition-all duration-300 hover:bg-hotel-gold hover:text-hotel-deep"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
                {t('whatsappCta')}
              </a>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
