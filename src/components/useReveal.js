'use client';

import { useEffect, useRef } from 'react';

// Content stays visible without JS. Animate only when a section enters the viewport.
export default function useReveal() {
  const root = useRef(null);

  useEffect(() => {
    const elements = root.current?.querySelectorAll('[data-reveal]');
    if (!elements?.length || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const animations = new Set();
    const seen = new Set();

    function configure() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (preference.matches) return;

      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || seen.has(target)) return;
          seen.add(target);
          observer.unobserve(target);
          target.classList.add('is-revealed');
          const animation = target.animate([
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], {
            duration: 650,
            delay: Number(target.dataset.reveal) || 0,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.12 });

      elements.forEach(element => { if (!seen.has(element)) observer.observe(element); });
    }

    configure();
    preference.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', configure);
    };
  }, []);

  return root;
}
