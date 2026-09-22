import { useState } from 'react';
import Link from 'next/link';
import { getContent } from '../data/content.js';
import SectionHeader from '../components/SectionHeader.jsx';
import Tag from '../components/Tag.jsx';

export default function AboutPage({ lang }) {
  const [spotifyVisible, setSpotifyVisible] = useState(false);
  const data = getContent(lang);
  const t = data.ui.aboutPage;

  return <div className="inner-page wrap about-page">
    <SectionHeader title={t.title} subtitle={t.subtitle} number="02" />
    <div className="about-intro"><span className="about-initial" aria-hidden="true">fo<span>✳</span></span><p>{data.about.bio}</p></div>

    <section className="inner-section">
      <div className="inner-section-heading"><span className="mono">01</span><h2>{t.skillsHeading}</h2><span className="inner-section-rule" /></div>
      <div className="skill-list">{data.about.skills.map((group, i) => <div className="skill-row" key={group.label}>
        <span className="mono skill-index">0{i + 1}</span><h3>{group.label}</h3><div className="skill-tags">{group.items.map(item => <Tag key={item} label={item} />)}</div>
      </div>)}</div>
    </section>

    <section className="inner-section">
      <div className="inner-section-heading"><span className="mono">02</span><h2><Link className="about-credentials-heading" href="/certifications">{t.certsHeading} <span aria-hidden="true">↗</span></Link></h2><span className="inner-section-rule" /></div>
      <div className="about-credentials">{data.about.certs.map(c => <Link href="/certifications" key={c.name}>{c.name} <span aria-hidden="true">↗</span></Link>)}</div>
    </section>

    <section className="inner-section">
      <div className="inner-section-heading"><span className="mono">03</span><h2>{lang === 'it' ? 'Qualche dettaglio in più' : 'A few more details'}</h2><span className="inner-section-rule" /></div>
      <div className="fact-grid">{data.about.facts.map(f => <div className="fact-card" key={f.label}>
        <span className="fact-icon" aria-hidden="true">{f.icon}</span><span className="mono fact-label">{f.label}</span><strong>{f.value}</strong>
      </div>)}</div>
    </section>

    <section className="inner-section">
      <div className="inner-section-heading"><span className="mono">04</span><h2>{t.playlistHeading}</h2><span className="inner-section-rule" /></div>
      <div className="playlist-frame">{spotifyVisible ? <iframe src={data.about.spotify} title={t.playlistHeading} width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /> : <button type="button" onClick={() => setSpotifyVisible(true)}><span aria-hidden="true">♫</span>{t.loadSpotify}<span aria-hidden="true">↗</span></button>}</div>
    </section>
  </div>;
}
