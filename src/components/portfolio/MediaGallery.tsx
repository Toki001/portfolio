import { useEffect, useId, useRef, useState } from 'react';
import type { Project } from '../../content/projects';
import { Arrow } from './Arrow';

export function MediaGallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const zoom = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const count = project.media.length;
  useEffect(() => {
    const sync = () => {
      const value = Number(new URLSearchParams(location.search).get('media'));
      setActive(Number.isInteger(value) && value > 0 && value <= count ? value - 1 : 0);
    };
    sync(); window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [count]);
  if (!count) return null;
  const media = project.media[active];
  const change = (index: number) => {
    const next = (index + count) % count;
    setActive(next);
    const url = new URL(location.href);
    if (next === 0) url.searchParams.delete('media'); else url.searchParams.set('media', String(next + 1));
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  };
  return <section className="case-gallery" aria-label={`${project.title} screenshots`} aria-roledescription={count > 1 ? 'carousel' : undefined} tabIndex={count > 1 ? 0 : undefined} onKeyDown={e => {
    if (dialog.current?.open) return;
    if (count > 1 && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); change(active + (e.key === 'ArrowRight' ? 1 : -1)); }
  }}>
    <div className="gallery-heading"><h2>Inside the interface</h2><button ref={zoom} className="text-button" onClick={() => dialog.current?.showModal()}>View larger <Arrow /></button></div>
    <figure>
      <div className={`gallery-image ${project.kind === 'Mobile' ? 'gallery-image-mobile' : ''}`}><img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" /></div>
      <figcaption aria-live="polite">{count > 1 ? `${active + 1} of ${count}. ` : ''}{media.caption}</figcaption>
    </figure>
    {count > 1 && <div className="gallery-controls"><button className="gallery-step" onClick={() => change(active - 1)} aria-label="Previous screenshot"><span aria-hidden="true">←</span></button><div className="gallery-pages" role="group" aria-label="Choose screenshot">{project.media.map((_,i) => <button key={i} aria-label={`Screenshot ${String(i+1).padStart(2,'0')}`} aria-pressed={active === i} onClick={() => change(i)}>{String(i+1).padStart(2,'0')}</button>)}</div><button className="gallery-step" onClick={() => change(active + 1)} aria-label="Next screenshot"><span aria-hidden="true">→</span></button></div>}
    <dialog ref={dialog} className="media-dialog" aria-labelledby={titleId} onClose={() => zoom.current?.focus()}>
      <div className="dialog-heading"><h3 id={titleId}>{project.title} — interface detail</h3><button onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></div>
      <img src={media.src} alt={media.alt} width={media.width} height={media.height} />
      <p>{media.caption}</p>
    </dialog>
  </section>;
}
