'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImg {
  url: string;
  alt: string;
}

export function RoomGalleryClient({ images, label }: { images: GalleryImg[]; label: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const openAt = useCallback((i: number) => { setIndex(i); setOpen(true); }, []);
  const slides = images.map((img) => ({ src: img.url }));

  return (
    <>
      <h3 className="font-playfair text-[1.2rem] text-hotel-text mb-6">{label}</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.url}
            onClick={() => openAt(i)}
            aria-label={img.alt}
            className={cn(
              'relative overflow-hidden group aspect-square focus-visible:outline-hotel-gold focus-visible:outline-2',
              i === 0 && 'col-span-2 aspect-[2/1]'
            )}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              quality={80}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-hotel-deep/0 group-hover:bg-hotel-deep/35 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: newIndex }) => setIndex(newIndex) }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(26, 22, 18, 0.97)' } }}
      />
    </>
  );
}
