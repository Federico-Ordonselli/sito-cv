'use client';
import { useState } from 'react';

const destinations = [
  { name: 'Dolomites', it: 'Dolomiti', image: '/demo-dolomites.jpg', distance: '12 km', days: 2 },
  { name: 'Iceland', it: 'Islanda', image: '/demo-iceland.jpg', distance: '28 km', days: 5 },
];

function SaveButton({ en, saved, onSave, className = '' }) {
  return <button className={`demo-button ${className}`} onClick={onSave} aria-pressed={saved}>
    {saved ? (en ? 'Added to your ideas' : 'Aggiunto alle tue idee') : (en ? 'Save this inspiration' : 'Salva questa ispirazione')}
    <span aria-hidden="true">{saved ? '✓' : '↗'}</span>
  </button>;
}

function MinimalPreview({ en, saved, onSave }) {
  return <div className="preview-minimal">
    <div className="minimal-nav"><strong>forma.</strong><span>INDEPENDENT STUDIO</span></div>
    <div className="minimal-main">
      <span className="preview-eyebrow">THOUGHTFULLY SIMPLE / 01</span>
      <h3>{en ? 'Less, but' : 'Meno, ma'}<br /><em>{en ? 'better.' : 'meglio.'}</em></h3>
      <p>{en ? 'Room for what matters.' : 'Spazio a quello che conta.'}</p>
      <SaveButton en={en} saved={saved} onSave={onSave} />
    </div>
    <div className="minimal-footer"><span>{en ? 'Clarity in every detail.' : 'Chiarezza, in ogni dettaglio.'}</span><span>© FORMA</span></div>
  </div>;
}

function ExplorePreview({ en, saved, onSave }) {
  const [destination, setDestination] = useState(0);
  const trip = destinations[destination];
  return <div className="preview-explore">
    <div className="explore-nav"><strong>↗ wildpath</strong><span>{en ? 'GO A LITTLE FURTHER' : 'VAI UN PO’ PIÙ LONTANO'}</span></div>
    <div className="explore-landscape">
      <img key={trip.image} src={trip.image} alt={en ? `Mountain landscape in ${trip.name}` : `Paesaggio di montagna: ${trip.it}`} width="1024" height="683" />
      <div className="explore-overlay" />
      <div className="explore-copy"><span className="preview-eyebrow">{en ? 'SMALL GROUPS. BIG ADVENTURES.' : 'PICCOLI GRUPPI. GRANDI AVVENTURE.'}</span><h3>{en ? 'Find your' : 'Trova il tuo'}<br /><em>{en ? 'outside.' : 'altrove.'}</em></h3></div>
      <div className="explore-switcher">
        <span aria-live="polite"><small>0{destination + 1} / 02</small><strong>{en ? trip.name : trip.it}</strong></span>
        <div><button onClick={() => setDestination((destination + 1) % 2)} aria-label={en ? 'Previous destination' : 'Destinazione precedente'}>←</button><button onClick={() => setDestination((destination + 1) % 2)} aria-label={en ? 'Next destination' : 'Destinazione successiva'}>→</button></div>
      </div>
    </div>
    <div className="explore-bottom"><span>{trip.distance} <i>·</i> {trip.days} {en ? 'days outdoors' : 'giorni all’aperto'}</span><SaveButton en={en} saved={saved} onSave={onSave} /></div>
  </div>;
}

function MixPreview({ en, saved, onSave }) {
  const [tripIndex, setTripIndex] = useState(0);
  const [details, setDetails] = useState(false);
  const trip = destinations[tripIndex];
  return <div className="preview-mix">
    <div className="mix-nav"><strong>terrain<span>®</span></strong><span>THE SLOW JOURNAL</span></div>
    <div className="mix-feature">
      <div><span className="preview-eyebrow">{en ? 'A DIFFERENT PACE' : 'UN ALTRO RITMO'}</span><h3>{en ? 'Take the' : 'Prendi la'}<br /><em>{en ? 'scenic' : 'strada'}</em><br />{en ? 'route.' : 'panoramica.'}</h3><span className="mix-location">{en ? trip.name : trip.it} ↗</span></div>
      <img key={trip.image} src={trip.image} alt={en ? `Scenery in ${trip.name}` : `Panorama: ${trip.it}`} width="1024" height="683" />
    </div>
    <div className="mix-options" aria-label={en ? 'Choose a trip' : 'Scegli un viaggio'}>
      <div>{[en ? 'Weekend' : 'Weekend', en ? 'Expedition' : 'Spedizione'].map((label, index) => <button key={index} onClick={() => setTripIndex(index)} aria-pressed={tripIndex === index}>{label}</button>)}</div>
      <button className="mix-details-toggle" onClick={() => setDetails(!details)} aria-expanded={details} aria-controls="mix-trip-details">{en ? 'Details' : 'Dettagli'} <span aria-hidden="true">{details ? '−' : '+'}</span></button>
    </div>
    <div id="mix-trip-details" className="mix-details" aria-live="polite">
      {details ? <span>{trip.distance} · {trip.days} {en ? 'days · A little room to wander.' : 'giorni · Spazio per esplorare.'}</span> : <span>{en ? 'Pick a pace. Make it yours.' : 'Scegli un ritmo. Fallo tuo.'}</span>}
    </div>
    <SaveButton en={en} saved={saved} onSave={onSave} />
  </div>;
}

export default function InterfaceLab({ lang }) {
  const [style, setStyle] = useState('minimal');
  const [compact, setCompact] = useState(false);
  const [savedStyles, setSavedStyles] = useState({});
  const en = lang === 'en';
  const saved = Boolean(savedStyles[style]);
  const previewProps = { en, saved, onSave: () => setSavedStyles(previous => ({ ...previous, [style]: !previous[style] })) };
  const hints = {
    minimal: en ? 'Less noise. More space. Just the essentials.' : 'Meno rumore. Più spazio. Solo l’essenziale.',
    explore: en ? 'Change destination. Find your next adventure.' : 'Cambia destinazione. Trova la prossima avventura.',
    mix: en ? 'Editorial calm. A few things to play with.' : 'Calma editoriale. Qualche dettaglio da provare.',
  };
  return <div className="interface-lab">
    <div className="lab-caption"><span className="mono">DESIGN + CODE</span><span className="lab-live"><i /> {en ? 'Try it live' : 'Provala dal vivo'}</span></div>
    <div className={`lab-canvas lab-${style} ${compact ? 'lab-compact' : ''}`}>
      <div className="lab-orbit" aria-hidden="true" />
      <div className="demo-window">
        <div className="demo-chrome"><span className="window-dots"><i /><i /><i /></span><span>{style === 'minimal' ? 'forma.studio' : style === 'explore' ? 'wildpath.travel' : 'terrain.journal'}</span><span aria-hidden="true">↗</span></div>
        <div key={style} className="demo-template">
          {style === 'minimal' && <MinimalPreview {...previewProps} />}
          {style === 'explore' && <ExplorePreview {...previewProps} />}
          {style === 'mix' && <MixPreview {...previewProps} />}
        </div>
      </div>
      <span className="lab-sticker" aria-hidden="true">{style === 'minimal' ? 'a.' : style === 'explore' ? '↗' : '✳'}</span>
      <span className="lab-note">{en ? 'A little taste of what’s possible.' : 'Un assaggio di quello che possiamo fare.'}</span>
    </div>
    <div className="lab-controls">
      <div className="style-choices" aria-label={en ? 'Interface style' : 'Stile interfaccia'}>
        {['minimal', 'explore', 'mix'].map((item, index) => <button key={item} onClick={() => setStyle(item)} aria-pressed={style === item}><span className={`style-dot dot-${index}`} />{['Minimal', 'Explore', 'Mix'][index]}</button>)}
      </div>
      <button className="device-toggle" onClick={() => setCompact(!compact)} aria-pressed={compact} aria-label={en ? 'Compact preview' : 'Anteprima compatta'}><svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="1" width="10" height="18" rx="2" /><path d="M6 16h4" /></svg></button>
    </div>
    <p className="lab-hint">{hints[style]}</p>
    <span className="sr-only" role="status">{saved ? (en ? 'Inspiration saved for this visit.' : 'Ispirazione salvata per questa visita.') : ''}</span>
  </div>;
}
