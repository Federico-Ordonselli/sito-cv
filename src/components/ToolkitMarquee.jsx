'use client';

import { useEffect, useRef, useState } from 'react';
import {
  siReact, siNextdotjs, siTypescript, siWordpress, siPostgresql,
  siNeon, siDrizzle, siMysql, siVercel, siGithubactions,
  siStripe, siSanity, siNodedotjs, siPython, siDocker, siGit,
} from 'simple-icons';

const technologies = [
  [siReact, 'React'], [siNextdotjs, 'Next.js'], [siTypescript, 'TypeScript'],
  [siWordpress, 'WordPress'], [siPostgresql, 'PostgreSQL'], [siNeon, 'NeonDB'],
  [siDrizzle, 'Drizzle ORM'], [siMysql, 'MySQL'], [siVercel, 'Vercel'],
  [siGithubactions, 'GitHub Actions · CI/CD'], [siStripe, 'Stripe'],
  [siSanity, 'Sanity'], [siNodedotjs, 'Node.js'], [siPython, 'Python'],
  [siDocker, 'Docker'], [siGit, 'Git'],
];
const modulo = (value, size) => ((value % size) + size) % size;

export default function ToolkitMarquee({ lang }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const controllerRef = useRef(null);
  const tweenRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(null);
  const en = lang === 'en';

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = track.firstElementChild;
    const items = [...track.querySelectorAll('.toolkit-icon')];
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let width = 0;
    let cycle = 0;
    let step = 0;

    function paint() {
      if (preference.matches || !cycle) return;
      const offset = offsetRef.current;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      items.forEach((item, index) => {
        const x = index * step + step / 2 - offset;
        if (x < -step || x > width + step) return;
        const distance = Math.abs(x - width / 2);
        const radius = step * 1.15;
        const weight = distance < radius ? (1 + Math.cos(Math.PI * distance / radius)) / 2 : 0;
        item.style.setProperty('--icon-scale', (1 + weight * .28).toFixed(4));
      });
    }

    function tick(time) {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
      lastTime = time;
      if (tweenRef.current) {
        const tween = tweenRef.current;
        tween.elapsed += elapsed;
        const progress = Math.min(tween.elapsed / 480, 1);
        const eased = 1 - (1 - progress) ** 3;
        offsetRef.current = modulo(tween.from + tween.delta * eased, cycle);
        if (progress === 1) tweenRef.current = null;
      } else {
        offsetRef.current = modulo(offsetRef.current + elapsed * .032, cycle);
      }
      paint();
      if (tweenRef.current || (!paused && !hovered && !focused)) frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (!preference.matches && visible && !document.hidden && cycle &&
          (tweenRef.current || (!paused && !hovered && !focused))) {
        frame = requestAnimationFrame(tick);
      }
    }

    function centre(index, instant = false) {
      if (!cycle || preference.matches) return;
      viewport.scrollLeft = 0;
      const target = modulo((index + .5) * step - width / 2, cycle);
      const from = offsetRef.current;
      const delta = modulo(target - from + cycle / 2, cycle) - cycle / 2;
      if (instant) {
        tweenRef.current = null;
        offsetRef.current = target;
        paint();
      } else {
        tweenRef.current = { from, delta, elapsed: 0, index };
      }
      sync();
    }

    controllerRef.current = {
      centre,
      adjacent(direction) {
        const index = tweenRef.current?.index ??
          modulo(Math.round((offsetRef.current + width / 2) / step - .5), technologies.length);
        return modulo(index + direction, technologies.length);
      },
    };

    function measure() {
      viewport.dataset.animated = String(!preference.matches);
      width = viewport.clientWidth;
      cycle = group.offsetWidth;
      step = group.firstElementChild.offsetWidth;
      offsetRef.current = modulo(offsetRef.current, cycle || 1);
      if (preference.matches) {
        tweenRef.current = null;
        track.style.removeProperty('transform');
        items.forEach(item => item.style.removeProperty('--icon-scale'));
      } else {
        viewport.scrollLeft = 0;
        // Keep a selected icon centred after resizing or a state update.
        if (paused && selected !== null) centre(selected, !tweenRef.current);
        else paint();
      }
      sync();
    }

    const resize = new ResizeObserver(measure);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(viewport);
    intersection.observe(viewport);
    preference.addEventListener('change', measure);
    document.addEventListener('visibilitychange', sync);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      preference.removeEventListener('change', measure);
      document.removeEventListener('visibilitychange', sync);
      controllerRef.current = null;
    };
  }, [paused, hovered, focused, selected]);

  function select(index, instant = false) {
    setSelected(index);
    setPaused(true);
    controllerRef.current?.centre(index, instant);
  }

  function advance(direction) {
    select(controllerRef.current?.adjacent(direction) ?? 0);
  }

  return <section className="toolkit" aria-labelledby="toolkit-title" data-reveal="0">
    <div className="toolkit-heading">
      <h2 id="toolkit-title" className="mono">{en ? 'MY TOOLKIT' : 'IL MIO TOOLKIT'}</h2>
      <div className="toolkit-controls">
        <button className="toolkit-step" onClick={() => advance(-1)} aria-label={en ? 'Previous technology' : 'Tecnologia precedente'}><span aria-hidden="true">←</span></button>
        <button className="toolkit-pause" onClick={() => { setPaused(!paused); setSelected(null); tweenRef.current = null; }} aria-label={paused ? (en ? 'Resume toolkit scrolling' : 'Riprendi scorrimento toolkit') : (en ? 'Pause toolkit scrolling' : 'Ferma scorrimento toolkit')}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">{paused ? <path d="m6 3 11 7-11 7z" /> : <path d="M5 3h3v14H5zm7 0h3v14h-3z" />}</svg>
        </button>
        <button className="toolkit-step" onClick={() => advance(1)} aria-label={en ? 'Next technology' : 'Tecnologia successiva'}><span aria-hidden="true">→</span></button>
      </div>
    </div>
    <div ref={viewportRef} className="toolkit-viewport" role="group" aria-label={en ? 'Choose a technology to centre it' : 'Scegli una tecnologia per metterla al centro'}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          advance(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}>
      <div ref={trackRef} className="toolkit-track">
        {[0, 1].map(copy => <ul className="toolkit-loop" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {technologies.map(([icon, name], index) => <li className="toolkit-item" key={icon.slug}>
            <button className="toolkit-choice" tabIndex={copy === 1 ? -1 : 0}
              aria-label={en ? `Centre ${name}` : `Metti ${name} al centro`}
              aria-pressed={selected === index}
              onMouseDown={event => { if (copy === 1) event.preventDefault(); }}
              onClick={() => select(index)}
              onFocus={event => { if (event.currentTarget.matches(':focus-visible')) select(index, true); }}
              style={{ '--brand-color': `#${icon.hex}` }}>
              <svg className="toolkit-icon" role="img" aria-label={name} viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d={icon.path} /></svg>
              <span className="toolkit-label">{name}</span>
            </button>
          </li>)}
        </ul>)}
      </div>
    </div>
    <span className="sr-only" aria-live="polite">{selected !== null ? technologies[selected][1] : ''}</span>
  </section>;
}
