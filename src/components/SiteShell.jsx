'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from './Navbar';
import { getContent } from '../data/content';
const LanguageContext = createContext(null);
export function useLanguage() { return useContext(LanguageContext); }
export default function SiteShell({ initialLang, children }) {
  const [lang, updateLang] = useState(initialLang);
  const pathname = usePathname();
  const router = useRouter();
  const data = getContent(lang);
  useEffect(() => {
    const redirectHash = () => {
      const page = window.location.hash.replace(/^#\/?/, '');
      if (['home', 'projects', 'certifications', 'hobbies', 'about'].includes(page)) router.replace(page === 'home' ? '/' : `/${page}`);
    };
    redirectHash();
    window.addEventListener('hashchange', redirectHash);
    return () => window.removeEventListener('hashchange', redirectHash);
  }, [router]);
  function setLang(value) {
    updateLang(value);
    document.cookie = `lang=${value}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = value;
    router.refresh();
  }
  return <LanguageContext.Provider value={{ lang, setLang }}>
    <div className="site-shell light-shell">
      <a className="skip-link" href="#main-content">{lang === 'it' ? 'Vai al contenuto' : 'Skip to content'}</a>
      <Navbar key={pathname} pathname={pathname} lang={lang} setLang={setLang} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer wrap">
        <Link href="/" className="footer-name">Federico Ordonselli<span>✳</span></Link>
        <span>{data.location} · {new Date().getFullYear()}</span>
        <div><a href={data.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={data.cv} target="_blank" rel="noreferrer">CV ↓</a></div>
      </footer>
    </div>
  </LanguageContext.Provider>;
}
