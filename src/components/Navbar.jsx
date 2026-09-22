'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getContent } from '../data/content';
export default function Navbar({ pathname, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggleRef = useRef(null);
  const { ui, email } = getContent(lang);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const onOutside = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); };
  }, [open]);
  return <header className="site-header" ref={ref}>
    <div className="nav-inner wrap">
      <Link href="/" className="wordmark" aria-label="Federico Ordonselli — Home">fo<span className="brand-asterisk">✳</span><span className="wordmark-name">federico<br />ordonselli</span></Link>
      <button className="menu-toggle" ref={toggleRef} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? (lang === 'it' ? 'Chiudi menu' : 'Close menu') : (lang === 'it' ? 'Apri menu' : 'Open menu')}>{open ? '×' : '☰'}</button>
      <nav id="site-navigation" className={`site-navigation ${open ? 'is-open' : ''}`} aria-label={lang === 'it' ? 'Navigazione principale' : 'Main navigation'}>
        {['projects', 'about', 'certifications', 'hobbies'].map(id => <Link key={id} href={`/${id}`} aria-current={pathname === `/${id}` ? 'page' : undefined} onClick={() => setOpen(false)}>{ui.nav[id]}</Link>)}
        <div className="language-toggle" aria-label={lang === 'it' ? 'Lingua' : 'Language'}>{['en', 'it'].map(l => <button key={l} aria-pressed={lang === l} aria-label={l === 'it' ? 'Italiano' : 'English'} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}</div>
        <a className="nav-contact" href={`mailto:${email}`}>{lang === 'it' ? 'Parliamone' : 'Let’s talk'} <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
