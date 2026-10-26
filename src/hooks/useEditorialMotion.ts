import { useEffect, useRef } from 'react';

export function useEditorialMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const running = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reduced.matches) continue;
        const animation = entry.target.animate([
          { transform: 'translateY(18px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 },
        ], { duration: 650, easing: 'cubic-bezier(.23,1,.32,1)' });
        running.add(animation);
        animation.finished.then(() => running.delete(animation)).catch(() => running.delete(animation));
      }
    }, { threshold: .08 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onPreferenceChange = () => { if (reduced.matches) running.forEach(animation => animation.cancel()); };
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduced.addEventListener('change', onPreferenceChange);
    update();
    return () => {
      observer.disconnect(); running.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduced.removeEventListener('change', onPreferenceChange);
    };
  }, []);
  return progress;
}
