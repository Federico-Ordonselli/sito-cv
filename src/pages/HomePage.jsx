import { getContent } from "../data/content.js";

const githubIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/>
  </svg>
);

const linkedinIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const mailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 6L2 7"/>
  </svg>
);

function HomePage({ setPage, lang }) {
  const DATA = getContent(lang);
  const { nav } = DATA.ui;


  return (
    <div className="home">
      <div className="home-content">
        <div className="eyebrow"><span className="status-dot" /> {DATA.location} <span className="eyebrow-divider">/</span> PORTFOLIO</div>
        <h1>{DATA.name}<span className="name-dot">.</span></h1>
        <p className="home-role">{DATA.role}</p>
        <p className="home-tagline">{DATA.tagline}</p>
        <div className="home-actions">
          {[
            { label: nav.projects, page: "projects" },
            { label: nav.hobbies, page: "hobbies" },
            { label: nav.about, page: "about" },
          ].map((btn, i) => (
            <button key={btn.page} className={i === 0 ? "button button-primary" : "button"} onClick={() => setPage(btn.page)}>
              {btn.label} <span aria-hidden="true">{i === 0 ? "↗" : "→"}</span>
            </button>
          ))}
        </div>
        <div className="home-socials">
          {[
            { href: DATA.github, label: "GitHub", icon: githubIcon },
            { href: DATA.linkedin, label: "LinkedIn", icon: linkedinIcon },
            { href: "mailto:" + DATA.email, label: "Email", icon: mailIcon },
          ].map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={s.label} className="social-link">{s.icon}</a>
          ))}
          <span className="social-divider" />
          <a href={DATA.cv} target="_blank" rel="noreferrer" className="cv-link"><span aria-hidden="true">↓</span> {DATA.ui.downloadCv}</a>
        </div>
        <a className="home-email" href={"mailto:" + DATA.email}>{DATA.email}</a>
      </div>
    </div>
  );
}

export default HomePage;
