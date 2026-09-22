'use client';
import Link from 'next/link';
import { useLanguage } from './SiteShell';
import { expertise } from '../data/expertise';
import { getContent } from '../data/content';

export default function ExpertisePage({ slug }) {
  const { lang } = useLanguage();
  const en = lang === 'en';
  const item = expertise.find(entry => entry.slug === slug);
  const data = getContent(lang);
  return <article className="expertise-detail wrap">
    <Link href="/#selected-work" className="text-link">← {en ? 'Back to the portfolio' : 'Torna al portfolio'}</Link>
    <p className="mono detail-eyebrow">{item.number} / {item.tags.join(' · ')}</p>
    <h1>{item.title[lang]}</h1><p className="detail-intro">{item.intro[lang]}</p>
    <div className="detail-points">{item.points[lang].map(([title, text], i) => <section key={title}><span className="mono">0{i + 1}</span><h2>{title}</h2><p>{text}</p></section>)}</div>
    <h2 className="detail-projects-title">{en ? 'Where I put it into practice' : 'Dove l’ho messo in pratica'}</h2>
    <div className="detail-projects">{data.projects.web.filter(project => item.projects.includes(project.title)).map(project => <div key={project.title}><h3>{project.title}</h3><p>{project.desc}</p><Link className="text-link" href={`/projects#${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{en ? 'View project card' : 'Vai alla scheda'} ↗</Link></div>)}</div>
    <div className="detail-contact"><h2>{en ? 'Something similar in mind?' : 'Hai in mente qualcosa di simile?'}</h2><a className="cta cta-dark" href={`mailto:${data.email}`}>{en ? 'Tell me about it' : 'Raccontamelo'} ↗</a></div>
  </article>;
}

