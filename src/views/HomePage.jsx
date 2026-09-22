'use client';
import Link from 'next/link';
import { useLanguage } from '../components/SiteShell';
import InterfaceLab from '../components/InterfaceLab';
import ProjectArt from '../components/ProjectArt';
import { getContent } from '../data/content';
import { expertise } from '../data/expertise';
import useReveal from '../components/useReveal';
import ToolkitMarquee from '../components/ToolkitMarquee';

export default function HomePage() {
  const revealRef = useReveal();
  const { lang } = useLanguage();
  const en = lang === 'en';
  const data = getContent(lang);
  const selected = [
    { title: 'Runebog GM', kind: 'runebog', slug: 'runebog-gm', category: 'WEB APP / NEXT.JS', desc: en ? 'An entire world, organised in a web app.' : 'Un intero mondo, organizzato in una web app.', tags: ['Map editor', 'Cloud save', 'Auth.js'] },
    { title: 'Trekking Marti', kind: 'trekking', slug: 'trekking-marti', category: 'BOOKING / E-COMMERCE', desc: en ? 'From discovering a hike to booking your place.' : 'Dalla scoperta di un viaggio alla prenotazione.', tags: ['Next.js', 'Stripe', 'Sanity CMS'] },
    { title: 'Matchday', kind: 'matchday', slug: 'matchday', category: 'FULL STACK / DASHBOARD', desc: en ? 'Real football data. A complete platform.' : 'Dati calcistici reali. Una piattaforma completa.', tags: ['React', 'Express', 'PostgreSQL'] },
  ];
  return <div className="showcase" ref={revealRef}>
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-eyebrow mono"><span><i className="availability-dot" /> {en ? 'WEB DEVELOPER · ROME, ITALY' : 'WEB DEVELOPER · ROMA, ITALIA'}</span><span className="hero-edition">PORTFOLIO — 2026</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">{en ? 'Your next' : 'Il tuo prossimo'}<br />{en ? 'project,' : 'progetto,'}<br /><em>{en ? 'done right.' : 'fatto bene.'}</em><span className="heading-star" aria-hidden="true">✳</span></h1>
          <p className="hero-description">{en ? 'I’m Federico. I turn ideas into websites and web apps that look good, feel natural and do something useful.' : 'Sono Federico. Trasformo idee in siti e applicazioni web belli da vedere, semplici da usare e utili davvero.'}</p>
          <div className="hero-actions"><a href="#selected-work" className="cta cta-dark">{en ? 'Explore my work' : 'Guarda i progetti'} <span aria-hidden="true">↘</span></a><a href={`mailto:${data.email}`} className="text-link">{en ? 'Tell me your idea' : 'Raccontami la tua idea'} <span aria-hidden="true">↗</span></a></div>
          <div className="hero-footnote"><span className="small-cross" aria-hidden="true">＋</span>{en ? 'Design with character. Code with care.' : 'Design con carattere. Codice con criterio.'}</div>
        </div>
        <InterfaceLab lang={lang} />
      </div>
      <ToolkitMarquee lang={lang} />
    </section>

    <section className="work-section wrap" id="selected-work" aria-labelledby="work-title">
      <div className="section-topline mono"><span>01 / {en ? 'SELECTED WORK' : 'PROGETTI SELEZIONATI'}</span><span>{en ? 'FROM IDEA TO INTERFACE' : 'DALL’IDEA ALL’INTERFACCIA'}</span></div>
      <div className="section-heading" data-reveal="0"><h2 id="work-title">{en ? 'Less talk.' : 'Meno promesse.'}<br /><em>{en ? 'More working things.' : 'Più cose che funzionano.'}</em></h2><Link href="/projects" className="text-link">{en ? 'All projects' : 'Tutti i progetti'} <span aria-hidden="true">↗</span></Link></div>
      <div className="featured-grid">{selected.map((project, index) => <Link href={`/projects#${project.slug}`} className="featured-project" key={project.kind} data-reveal={index * 80}>
        <ProjectArt kind={project.kind} />
        <div className="project-info"><span className="mono project-category">{project.category}</span><h3>{project.title}<span aria-hidden="true">↗</span></h3><p>{project.desc}</p><div className="project-stack">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </Link>)}</div>
      <p className="project-art-note mono">{en ? 'Illustrated project previews. Details and available links in the project cards.' : 'Anteprime grafiche illustrative. Dettagli e link disponibili nelle schede progetto.'}</p>
    </section>

    <section className="expertise-section" aria-labelledby="expertise-title"><div className="wrap">
      <div className="section-topline mono"><span>02 / {en ? 'WHAT I CAN BUILD' : 'COSA POSSO COSTRUIRE'}</span><span aria-hidden="true">✳</span></div>
      <div className="expertise-intro" data-reveal="0"><h2 id="expertise-title">{en ? 'Your idea.' : 'La tua idea.'}<br /><em>{en ? 'The right tools.' : 'Gli strumenti giusti.'}</em></h2><p>{en ? 'A portfolio, a booking platform, a tool that saves you time. The technology follows what you need.' : 'Un sito vetrina, una piattaforma di prenotazione, uno strumento che ti fa risparmiare tempo. La tecnologia segue quello che ti serve.'}</p></div>
      <div className="expertise-list">{expertise.map(item => <Link href={`/competenze/${item.slug}`} key={item.slug} className="expertise-row" data-reveal="0"><span className="mono expertise-number">{item.number}</span><div><h3>{item.title[lang]}</h3><p>{item.short[lang]}</p></div><div className="expertise-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="expertise-arrow" aria-hidden="true">↗</span></Link>)}</div>
    </div></section>

    <section className="about-teaser wrap" aria-labelledby="about-title" data-reveal="0">
      <div className="about-mark" aria-hidden="true"><span>fo</span><i>✳</i><small>ROME, ITALY<br />41.9028° N · 12.4964° E</small></div>
      <div><span className="mono">03 / {en ? 'THE PERSON BEHIND THE CODE' : 'DIETRO IL CODICE'}</span><h2 id="about-title">{en ? 'Curiosity, made practical.' : 'La curiosità, messa in pratica.'}</h2><p>{en ? 'I started by building tools I needed. Today I bring the same approach to web development: understand the problem, sweat the details and build something useful.' : 'Ho iniziato costruendo gli strumenti che mi servivano. Oggi porto lo stesso approccio nello sviluppo web: capire il problema, curare i dettagli e costruire qualcosa di utile.'}</p><div className="about-links"><Link href="/about" className="text-link">{en ? 'A little about me' : 'Qualcosa in più su di me'} ↗</Link><Link href="/certifications" className="quiet-link">{en ? 'Training & certifications' : 'Formazione e certificazioni'} ↗</Link></div></div>
    </section>

    <section className="contact-section wrap" id="contact" aria-labelledby="contact-title"><div className="contact-card" data-reveal="0"><div><span className="mono">{en ? 'GOT SOMETHING IN MIND?' : 'HAI QUALCOSA IN MENTE?'}</span><h2 id="contact-title">{en ? 'Let’s make' : 'Facciamolo'}<br /><em>{en ? 'it happen.' : 'succedere.'}</em></h2><p>{en ? 'Tell me what you want to build. We’ll work out where to start.' : 'Raccontami cosa vuoi costruire. Capiamo insieme da dove partire.'}</p><a href={`mailto:${data.email}?subject=${encodeURIComponent(en ? 'Let’s talk about my project' : 'Parliamo del mio progetto')}`} className="cta cta-dark">{en ? 'Let’s talk about your project' : 'Parliamo del tuo progetto'} <span aria-hidden="true">↗</span></a><a className="contact-email" href={`mailto:${data.email}`}>{data.email}</a></div><div className="contact-flower" aria-hidden="true">✳</div><span className="contact-side mono">GOOD IDEAS DESERVE GOOD WEBSITES.</span></div></section>
  </div>;
}
