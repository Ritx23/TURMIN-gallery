import { useState, useEffect, useCallback } from 'react';

export function useLightbox(images) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((index) => {
    setActiveIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setActiveIndex(null), 300);
    document.body.style.overflow = '';
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, next, prev, close]);

  return {
    isOpen,
    activeIndex,
    activeImage: activeIndex !== null ? images[activeIndex] : null,
    open,
    close,
    next,
    prev,
  };
}
