'use client';
import Link from 'next/link';
import { useLanguage } from '../components/SiteShell';
export default function NotFound() {
  const { lang } = useLanguage();
  const en = lang === 'en';
  return <div className="not-found wrap"><p className="mono">404 / {en ? 'PAGE NOT FOUND' : 'PAGINA NON TROVATA'}</p><h1>{en ? 'There’s still room here' : 'Qui c’è ancora spazio'}<br />{en ? 'for an idea.' : 'per un’idea.'}</h1><Link className="cta cta-dark" href="/">{en ? 'Back to the homepage' : 'Torna alla homepage'} ↗</Link></div>;
}
