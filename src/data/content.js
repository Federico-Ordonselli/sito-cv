// ─── i18n helper ───────────────────────────────────────────────────────────
// tr(it, en) marca una stringa traducibile. getContent(lang) risolve l'intero
// albero restituendo la variante nella lingua scelta. I campi non avvolti da
// tr() (nomi propri, tecnologie, colori, path, link) restano identici.
const tr = (it, en) => ({ __t: true, it, en });

function resolve(node, lang) {
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang));
  if (node && typeof node === "object") {
    if (node.__t) return node[lang];
    const out = {};
    for (const k in node) out[k] = resolve(node[k], lang);
    return out;
  }
  return node;
}

// ─── DATI ────────────────────────────────────────────────────────────────────
const RAW = {
  name: "Federico",
  role: "Junior Full-Stack Developer · Security · Builder",
  tagline: tr(
    "Sviluppo applicazioni web in React e Next.js, dal database al checkout. Costruisco cose, digitali e fisiche.",
    "I build web applications in React and Next.js, from the database to the checkout. I build things — digital and physical."
  ),
  location: tr("Roma, Italia", "Rome, Italy"),
  email: "fede.ordons@gmail.com",
  github: "https://github.com/Federico-Ordonselli",
  linkedin: "https://www.linkedin.com/in/federico-ordonselli-aa7363226/",
  cv: tr("/cv/Ordonselli_CV_IT.pdf", "/cv/Ordonselli_CV_EN.pdf"),

  projects: {
    data: [
      {
        title: "NTSB Aviation Safety Analysis",
        desc: tr(
          "Analisi su dataset incidenti aviazione NTSB con Python, Power BI e DAX. Identificazione di pattern stagionali e correlazioni tra condizioni meteo e incidenti.",
          "Analysis of the NTSB aviation accident dataset with Python, Power BI and DAX. Identified seasonal patterns and correlations between weather conditions and accidents."
        ),
        tags: ["Python", "Power BI", "DAX", "Pandas"],
        color: "#6C63FF",
        link: "https://github.com/Federico-Ordonselli/ntsb-aviation-safety-analysis",
      },
      {
        title: "Customer Churn Analysis",
        desc: tr(
          "Previsione abbandono clienti Telco con feature engineering, modelli di classificazione e dashboard Tableau interattiva per il team marketing.",
          "Telco customer churn prediction with feature engineering, classification models and an interactive Tableau dashboard for the marketing team."
        ),
        tags: ["Python", "Tableau", "Pandas", "Scikit-learn"],
        color: "#FF6584",
        link: "https://github.com/Federico-Ordonselli/telco-churn-analysis",
      },
      {
        title: "Azure Data Pipeline",
        desc: tr(
          "Pipeline ETL su ADLS Gen2 + Azure SQL Database con dataset Olist Brazilian E-Commerce. Visualizzazione finale in Power BI Desktop.",
          "ETL pipeline on ADLS Gen2 + Azure SQL Database using the Olist Brazilian E-Commerce dataset. Final visualization in Power BI Desktop."
        ),
        tags: ["Azure", "SQL", "Power BI", "ETL"],
        color: "#43B89C",
        link: "#",
      },
      {
        title: "SQL Northwind Analysis",
        desc: tr(
          "Query SQL avanzate sul database relazionale Northwind per estrarre insight di business: revenue per categoria, top clienti, trend mensili e performance dei dipendenti.",
          "Advanced SQL queries on the Northwind relational database to extract business insights: revenue by category, top customers, monthly trends and employee performance."
        ),
        tags: ["SQL", "SQLite", "Python", "Pandas"],
        color: "#F7971E",
        link: "https://github.com/Federico-Ordonselli/sql-northwind-analysis",
      },
      {
        title: "E-commerce Sales Analysis",
        desc: tr(
          "Analisi esplorativa su un dataset retail reale (oltre 541.000 transazioni): trend di fatturato, prodotti top, ordini per fascia oraria e paesi per revenue.",
          "Exploratory data analysis on a real retail dataset (541,000+ transactions): revenue trends, top products, orders by time of day and countries by revenue."
        ),
        tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        color: "#6C63FF",
        link: "https://github.com/Federico-Ordonselli/ecommerce-sales-analysis",
      },
    ],
    web: [
      {
        title: "Trekking Marti",
        desc: tr(
          "Sito di prenotazione e pagamento per un'organizzatrice di trekking guidati. Bilingue, con catalogo che la cliente gestisce da sola e checkout Stripe a due fasi per i viaggi multi-giorno. Contenuti su Sanity, denaro su Postgres: un lock per partenza contro l'overbooking, transizioni di stato idempotenti sui webhook.",
          "A booking and payment site for a guided trekking organiser. Bilingual, with a catalogue the client manages herself and a two-phase Stripe checkout for multi-day trips. Content lives in Sanity, money in Postgres: a per-departure lock against overbooking, idempotent state transitions on every webhook."
        ),
        tags: ["Next.js 16", "TypeScript", "Stripe", "PostgreSQL", "Sanity"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Runebog GM",
        desc: tr(
          "Applicazione web per Game Master di giochi di ruolo: mappe annidabili di città e dungeon, 331 schede mostro SRD 5.2.1 in italiano, generatore procedurale e tavolo in sola lettura per i giocatori. Next.js 15 su Postgres, editor JavaScript vanilla senza build.",
          "A web app for tabletop RPG Game Masters: nested maps of cities and dungeons, 331 Italian D&D 5e SRD stat blocks, a procedural generator and a read-only table for players. Next.js 15 on Postgres, vanilla JavaScript editor with no build step."
        ),
        tags: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "PWA"],
        color: "#43B89C",
        link: "https://runebog.app",
      },
      {
        title: "qrinventory",
        desc: tr(
          "Sistema inventario con FastAPI + SQLModel, generazione QR code e PDF. Autenticazione JWT/OAuth2, deploy su Railway.",
          "Inventory system with FastAPI + SQLModel, QR code and PDF generation. JWT/OAuth2 authentication, deployed on Railway."
        ),
        tags: ["FastAPI", "SQLModel", "QR", "Docker"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Learning Vault",
        desc: tr(
          "Webapp personale Next.js 16 + React 19 + TypeScript + SQLite/Drizzle + Tailwind v4 per tracciare conoscenze su SF6, TFT, chitarra e data analysis.",
          "Personal web app — Next.js 16 + React 19 + TypeScript + SQLite/Drizzle + Tailwind v4 — to track knowledge on SF6, TFT, guitar and data analysis."
        ),
        tags: ["Next.js", "TypeScript", "SQLite", "Docker"],
        color: "#FF6584",
        link: "#",
      },
    ],
    cyber: [
      {
        title: "StudyBuddy",
        desc: tr(
          "RAG pipeline locale con Ollama, ChromaDB e Docker Compose. GPU passthrough NVIDIA e pipeline Groq Whisper per trascrivere le VOD prima di indicizzarle.",
          "Local RAG pipeline with Ollama, ChromaDB and Docker Compose. NVIDIA GPU passthrough and a Groq Whisper pipeline that transcribes VODs before indexing them."
        ),
        tags: ["Python", "Docker", "ChromaDB", "Ollama", "RAG"],
        color: "#F7971E",
        link: "https://github.com/Federico-Ordonselli/studybuddy",
      },
      {
        title: "D&D Transcription App",
        desc: tr(
          "App trascrizione sessioni D&D con faster-whisper + pyannote.audio. Sistema dual-embedding per distinguere voce in-character da out-of-character.",
          "D&D session transcription app with faster-whisper + pyannote.audio. Dual-embedding system to tell in-character from out-of-character speech."
        ),
        tags: ["Python", "Whisper", "NLP", "Speaker Diarization"],
        color: "#F7971E",
        link: "#",
      },
      {
        title: "Sub Tracker",
        desc: tr(
          "Desktop app PyQt6 + SQLite per tracciamento abbonamenti. Integrata come servizio systemd su Linux.",
          "PyQt6 + SQLite desktop app for subscription tracking. Integrated as a systemd service on Linux."
        ),
        tags: ["PyQt6", "SQLite", "Linux", "systemd"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Security Log Analysis",
        desc: tr(
          "Analisi di log SSH con Python per identificare tentativi di brute-force e IP sospetti. Pulizia dati, aggregazioni e visualizzazioni.",
          "SSH log analysis in Python to detect brute-force attempts and suspicious IPs. Data cleaning, aggregations and visualizations."
        ),
        tags: ["Python", "Pandas", "Security", "Log Analysis"],
        color: "#FF6584",
        link: "https://github.com/Federico-Ordonselli/security-log-analysis",
      },
    ],
  },

  hobbies: [
    {
      icon: "🖨️",
      title: "3D Printing",
      desc: tr(
        "Bambu Lab A1 + AMS Lite. Sto costruendo un leverless hitbox controller da zero — chassis stampato, switch Gateron KS-9, OLED SH1106. Ho anche modellato una replica della Piramide Cestia in Blender.",
        "Bambu Lab A1 + AMS Lite. I'm building a leverless hitbox controller from scratch — printed chassis, Gateron KS-9 switches, SH1106 OLED. I also modeled a replica of the Pyramid of Cestius in Blender."
      ),
      tags: ["Bambu Lab", "Blender", "FDM", "Hitbox"],
      color: "#6C63FF",
    },
    {
      icon: "🔧",
      title: tr("Saldatura & Hardware", "Soldering & Hardware"),
      desc: tr(
        "Modding controller, elettronica DIY, assemblaggio custom. Parto dall'idea, progetto in CAD, stampo, saldo, assemblo. End-to-end.",
        "Controller modding, DIY electronics, custom builds. I start from the idea, design in CAD, print, solder, assemble. End-to-end."
      ),
      tags: [tr("Saldatura", "Soldering"), "DIY", "Modding"],
      color: "#F7971E",
    },
    {
      icon: "🎮",
      title: tr("Videogiochi", "Video Games"),
      desc: tr(
        "Street Fighter 6 (main Cammy), Teamfight Tactics, Pokémon Champions, Assetto Corsa con Logitech G27. Simulatori di guida soprattutto la notte.",
        "Street Fighter 6 (Cammy main), Teamfight Tactics, Pokémon Champions, Assetto Corsa with a Logitech G27. Driving sims, especially at night."
      ),
      tags: ["FGC", "SF6", "TFT", "Sim Racing"],
      color: "#FF6584",
    },
    {
      icon: "🎲",
      title: "Dungeon Master",
      desc: tr(
        "DM da anni. Ho costruito un AI DM assistant con RAG sulle core rulebook D&D e un'app di trascrizione per le sessioni. La narrativa è un'altra forma di data storytelling.",
        "DM for years. I built an AI DM assistant with RAG over the D&D core rulebooks and a transcription app for sessions. Storytelling is just another form of data storytelling."
      ),
      tags: ["D&D", "RAG", "Worldbuilding"],
      color: "#43B89C",
    },
  ],

  about: {
    bio: tr(
      "Sono Federico, sviluppatore full-stack a Roma. Vengo da due anni di sicurezza operativa all'aeroporto di Fiumicino (ICTS): un ambiente 24/7 dove una procedura saltata si vede subito, e dove ho imparato a lavorare per escalation e verifiche. Oggi costruisco applicazioni React e Next.js — l'ultima è una piattaforma di prenotazione e pagamento che la cliente gestisce da sola. Certificato CompTIA Security+ e CySA+: la sicurezza applicativa non è un modulo che aggiungo alla fine.",
      "I'm Federico, a full-stack developer based in Rome. I come from two years in operational security at Fiumicino Airport (ICTS): a 24/7 environment where a skipped procedure shows immediately, and where I learned to work through escalation and verification. These days I build React and Next.js applications — the latest one is a booking and payment platform the client runs on her own. CompTIA Security+ and CySA+ certified: application security isn't a module I bolt on at the end."
    ),
    facts: [
      { label: tr("Videogioco preferito", "Favorite video game"), value: tr("Street Fighter 6 — main Cammy", "Street Fighter 6 — Cammy main"), icon: "🕹️" },
      { label: tr("Genere musicale", "Music"), value: tr("Produzione musicale con VST plugin", "Music production with VST plugins"), icon: "🎹" },
      { label: tr("Hobby fisico", "Hands-on hobby"), value: tr("3D printing & saldatura", "3D printing & soldering"), icon: "🖨️" },
      { label: "TTRPG", value: tr("D&D — sempre dalla parte del DM", "D&D — always on the DM's side"), icon: "🐉" },
      { label: "Setup", value: "Ryzen 7 9700X · RTX 4080 Super · CachyOS", icon: "💻" },
      { label: tr("Città", "City"), value: tr("Roma, Italia", "Rome, Italy"), icon: "🏛️" },
    ],
    spotify: "https://open.spotify.com/embed/track/6LgJvl0Xdtc73RJ1mmpotq?utm_source=generator&si=c53ea5d1921441cc",
    certs: [
      { name: "CompTIA Security+", color: "#FF6584" },
      { name: "CompTIA CySA+", color: "#43B89C" },
      { name: "IBM Data Analyst Professional", color: "#6C63FF" },
      { name: tr("Meta Front-End Developer (in corso)", "Meta Front-End Developer (in progress)"), color: "#F7971E" },
    ],

    // Stack allineato al CV. I nomi delle tecnologie non passano da tr():
    // "PostgreSQL" è "PostgreSQL" in entrambe le lingue, solo le etichette
    // dei gruppi sono tradotte.
    skills: [
      {
        label: tr("Core", "Core"),
        color: "#6C63FF",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Python"],
      },
      {
        label: tr("Backend e dati", "Backend & data"),
        color: "#43B89C",
        items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Drizzle ORM", "SQLite", "REST API"],
      },
      {
        label: tr("Servizi e infrastruttura", "Services & infrastructure"),
        color: "#F7971E",
        items: ["Stripe", "Sanity", "Auth.js", "Clerk", "Resend", "Vercel", "Neon", "Azure", "Terraform"],
      },
      {
        label: tr("Sistemi e workflow", "Systems & workflow"),
        color: "#FF6584",
        items: ["Arch Linux", "Bash/CLI", "Docker", "GitHub Actions", tr("Modelli AI locali", "Local AI models")],
      },
      {
        label: tr("Qualità e sicurezza", "Quality & security"),
        color: "#6C63FF",
        items: ["Vitest", "node:test", "CI/CD", tr("Accessibilità WCAG", "WCAG accessibility"), "OAuth", "XSS prevention"],
      },
    ],
  },

  // ─── CERTIFICAZIONI ──────────────────────────────────────────────────────
  // Ogni cert punta a un PDF in /public/certs. Date e link estratti dai PDF.
  certifications: [
    {
      category: "Security",
      color: "#FF6584",
      items: [
        {
          name: "CompTIA Security+ (ce)",
          file: "/certs/comptia-security-plus.pdf",
          issuer: "CompTIA",
          date: tr("Ott 2025", "Oct 2025"),
          credentialUrl: "https://www.comptia.org/certifications/verify",
        },
        {
          name: "CompTIA CySA+ (ce)",
          file: "/certs/comptia-cysa-plus.pdf",
          issuer: "CompTIA",
          date: tr("Gen 2026", "Jan 2026"),
          credentialUrl: "https://www.comptia.org/certifications/verify",
        },
      ],
    },
    {
      category: "Data Analysis",
      color: "#6C63FF",
      items: [
        {
          name: "IBM Data Analyst Professional Certificate",
          file: "/certs/ibm-data-analyst.pdf",
          issuer: "IBM · Coursera",
          date: tr("Ago 2025", "Aug 2025"),
          credentialUrl: "",
        },
        {
          name: "Excel Basics for Data Analysis",
          file: "/certs/excel-basics-data-analysis.pdf",
          issuer: "IBM · Coursera",
          date: tr("Mag 2025", "May 2025"),
          credentialUrl: "https://coursera.org/verify/6UAPG29YPR26",
        },
        {
          name: "Data Visualization and Dashboards with Excel and Cognos",
          file: "/certs/data-viz-excel-cognos.pdf",
          issuer: "IBM · Coursera",
          date: tr("Mag 2025", "May 2025"),
          credentialUrl: "https://coursera.org/verify/YS71E8P728UQ",
        },
        {
          name: "Databases and SQL for Data Science with Python",
          file: "/certs/databases-sql-data-science.pdf",
          issuer: "IBM · Coursera",
          date: tr("Mag 2025", "May 2025"),
          credentialUrl: "https://coursera.org/verify/7ST0S3L06XQZ",
        },
      ],
    },
    {
      category: "Python & AI",
      color: "#43B89C",
      items: [
        {
          name: "Python for Data Science, AI & Development",
          file: "/certs/python-data-science-ai-dev.pdf",
          issuer: "IBM · Coursera",
          date: tr("Mag 2025", "May 2025"),
          credentialUrl: "https://coursera.org/verify/1JD6Y1FYAD8B",
        },
        {
          name: "Python Project for Data Science",
          file: "/certs/python-project-data-science.pdf",
          issuer: "IBM · Coursera",
          date: tr("Mag 2025", "May 2025"),
          credentialUrl: "https://coursera.org/verify/6MJZ5Q3DK60T",
        },
        {
          name: "Data Analysis with Python",
          file: "/certs/data-analysis-with-python.pdf",
          issuer: "IBM · Coursera",
          date: tr("Giu 2025", "Jun 2025"),
          credentialUrl: "https://coursera.org/verify/C9YWMCVFPVWP",
        },
        {
          name: "Data Visualization with Python",
          file: "/certs/data-visualization-with-python.pdf",
          issuer: "IBM · Coursera",
          date: tr("Giu 2025", "Jun 2025"),
          credentialUrl: "https://coursera.org/verify/H6ERGSTJN9NT",
        },
        {
          name: "Generative AI",
          file: "/certs/generative-ai.pdf",
          issuer: "IBM · Coursera",
          date: tr("Ago 2025", "Aug 2025"),
          credentialUrl: "https://coursera.org/verify/EGNJALEI19Y5",
        },
      ],
    },
  ],

  // ─── STRINGHE UI ───────────────────────────────────────────────────────────
  ui: {
    nav: {
      home: tr("Home", "Home"),
      projects: tr("Progetti", "Projects"),
      certifications: tr("Certificazioni", "Certifications"),
      hobbies: tr("Hobby", "Hobbies"),
      about: tr("Chi sono", "About"),
    },
    footerSuffix: tr("Roma, Italia", "Rome, Italy"),
    downloadCv: tr("Scarica CV", "Download CV"),
    projectsPage: {
      subtitle: tr("Portfolio", "Portfolio"),
      title: tr("Progetti", "Projects"),
      data: tr("Data Analysis", "Data Analysis"),
      web: tr("Web Development", "Web Development"),
      cyber: tr("Cybersecurity & Tools", "Cybersecurity & Tools"),
    },
    certsPage: {
      subtitle: tr("Credenziali", "Credentials"),
      title: tr("Certificazioni", "Certifications"),
      intro: tr(
        "Clicca su una certificazione per visualizzare il PDF originale.",
        "Click a certification to view the original PDF."
      ),
      view: tr("Visualizza certificato", "View certificate"),
      verify: tr("Verifica", "Verify"),
      open: tr("Apri", "Open"),
      close: tr("Chiudi", "Close"),
    },
    hobbiesPage: {
      subtitle: tr("Beyond Code", "Beyond Code"),
      title: tr("Hobby Tecnici", "Technical Hobbies"),
    },
    aboutPage: {
      subtitle: tr("About", "About"),
      title: tr("Chi sono", "About me"),
      skillsHeading: tr("Competenze tecniche", "Technical skills"),
      certsHeading: tr("Certificazioni", "Certifications"),
      playlistHeading: tr("🎵 Canzone preferita", "🎵 Favourite song"),
      loadSpotify: tr("Carica il player Spotify", "Load the Spotify player"),
    },
  },
};

export function getContent(lang) {
  return resolve(RAW, lang);
}

// Lingue disponibili (per il toggle in Navbar)
export const LANGS = ["it", "en"];
