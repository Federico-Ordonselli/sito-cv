'use client';
import Link from 'next/link';
import { useLanguage } from './SiteShell';
import ProjectArt from './ProjectArt';
import { getCaseStudy } from '../data/caseStudies';
import { getContent } from '../data/content';

export default function CaseStudyPage({ slug }) {
  const { lang } = useLanguage();
  const en = lang === 'en';
  const item = getCaseStudy(slug);
  const data = getContent(lang);
  const { repo, demo } = item.links;
  return <article className="case-study wrap">
    <Link href="/projects" className="text-link">← {en ? 'All projects' : 'Tutti i progetti'}</Link>
    <header className="case-hero">
      <div>
        <p className="mono detail-eyebrow">{item.eyebrow[lang]}</p>
        <h1>{item.title}<em>{item.headline[lang]}</em></h1>
        <p className="detail-intro">{item.intro[lang]}</p>
        <div className="case-links">
          {demo && <a className="cta cta-dark" href={demo} target="_blank" rel="noopener noreferrer">{en ? 'Open the demo' : 'Apri la demo'} ↗</a>}
          <a className={demo ? 'text-link' : 'cta cta-dark'} href={repo} target="_blank" rel="noopener noreferrer">{en ? 'Source code on GitLab' : 'Codice su GitLab'} ↗</a>
        </div>
      </div>
      <ProjectArt kind={item.art} />
    </header>

    <dl className="case-facts">{item.facts.map(fact => <div key={fact.label.en}><dt className="mono">{fact.label[lang]}</dt><dd>{fact.value[lang]}</dd></div>)}</dl>

    <div className="case-story">
      <section><span className="mono">01</span><h2>{en ? 'The goal' : 'L’obiettivo'}</h2><p>{item.problem[lang]}</p></section>
      <section><span className="mono">02</span><h2>{en ? 'How it works' : 'Com’è fatto'}</h2><p>{item.solution[lang]}</p></section>
    </div>

    <section className="case-section" aria-labelledby="case-features">
      <h2 id="case-features">{en ? 'Features' : 'Funzionalità'}</h2>
      <div className="case-grid">{item.features.map(feature => <div key={feature.title.en}><h3>{feature.title[lang]}</h3><p>{feature.text[lang]}</p></div>)}</div>
    </section>

    <section className="case-section" aria-labelledby="case-screens">
      <h2 id="case-screens">{en ? 'Screens' : 'Schermate'}</h2>
      <div className="case-shots">{item.screenshots.map(shot => <figure key={shot.src} className={shot.height > shot.width ? 'is-tall' : undefined}>
        <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt[lang]} loading="lazy" decoding="async" />
        <figcaption className="mono">{shot.caption[lang]}</figcaption>
      </figure>)}</div>
      <p className="case-note">{item.screenshotNote[lang]}</p>
    </section>

    <section className="case-section" aria-labelledby="case-decisions">
      <h2 id="case-decisions">{en ? 'Technical decisions' : 'Scelte tecniche'}</h2>
      <div className="detail-points">{item.decisions.map((decision, i) => <section key={decision.title.en}><span className="mono">0{i + 1}</span><h3>{decision.title[lang]}</h3><p>{decision.text[lang]}</p></section>)}</div>
    </section>

    <aside className="case-limits" aria-labelledby="case-limits"><h2 id="case-limits">{en ? 'Scope and limits' : 'Perimetro e limiti'}</h2><p>{item.limits[lang]}</p></aside>

    <div className="detail-contact"><h2>{en ? 'Something similar in mind?' : 'Hai in mente qualcosa di simile?'}</h2><a className="cta cta-dark" href={`mailto:${data.email}`}>{en ? 'Tell me about it' : 'Raccontamelo'} ↗</a></div>
  </article>;
}
