import { useState, useEffect } from 'react';
import { getContent } from '../data/content.js';
import SectionHeader from '../components/SectionHeader.jsx';
import SubSection from '../components/SubSection.jsx';

function CertCard({ cert, onOpen, t }) {
  const [previewFailed, setPreviewFailed] = useState(false);
  const preview = cert.file.replace('/certs/', '/certs/previews/').replace(/\.pdf$/, '.jpg');
  return <button type="button" className="cert-card" onClick={() => onOpen(cert)}>
    <span className="cert-preview" aria-hidden="true">{previewFailed ? <span className="cert-preview-fallback">PDF</span> : <img src={preview} alt="" loading="lazy" decoding="async" onError={() => setPreviewFailed(true)} />}</span>
    <span className="cert-details"><span className="cert-meta"><span>{cert.issuer}</span>{cert.date && <span>{cert.date}</span>}</span><span className="cert-title">{cert.name}</span><span className="cert-action">{t.view} <span aria-hidden="true">↗</span></span></span>
  </button>;
}

function PdfModal({ cert, onClose, t }) {
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  return <div className="pdf-backdrop" onMouseDown={onClose} role="presentation"><div className="pdf-dialog" role="dialog" aria-modal="true" aria-label={cert.name} onMouseDown={event => event.stopPropagation()}>
    <div className="pdf-toolbar"><div className="pdf-heading"><strong>{cert.name}</strong><span>{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</span></div>
      {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noreferrer">{t.verify} ↗</a>}
      <a href={cert.file} target="_blank" rel="noreferrer">{t.open} ↗</a>
      <button type="button" onClick={onClose} aria-label={t.close}>✕</button>
    </div>
    <iframe title={cert.name} src={`${cert.file}#view=FitH`} />
  </div></div>;
}

export default function CertificationsPage({ lang }) {
  const [active, setActive] = useState(null);
  const data = getContent(lang);
  const t = data.ui.certsPage;
  return <div className="inner-page wrap certifications-page">
    <SectionHeader title={t.title} subtitle={t.subtitle} number="03" />
    <p className="inner-intro">{t.intro}</p>
    {data.certifications.map((group, index) => <SubSection key={group.category} title={group.category} index={`0${index + 1}`}>
      {group.items.map(cert => <CertCard key={cert.file} cert={cert} onOpen={setActive} t={t} />)}
    </SubSection>)}
    {active && <PdfModal cert={active} onClose={() => setActive(null)} t={t} />}
  </div>;
}
