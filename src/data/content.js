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
  role: tr("Sviluppatore full-stack junior", "Junior full-stack developer"),
  tagline: tr(
          "Sviluppo applicazioni web con React e Next.js. Mi interessano la sicurezza informatica, l’elettronica e la stampa 3D.",
          "I develop web applications with React and Next.js. My interests include cybersecurity, electronics and 3D printing."
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
          "Analisi dei dati NTSB sugli incidenti aerei, con Python e Power BI, per studiare gli andamenti stagionali e le relazioni tra meteo e incidenti.",
          "Analysis of NTSB aviation accident data using Python and Power BI to study seasonal patterns and the relationship between weather and accidents."
        ),
        tags: ["Python", "Power BI", "DAX", "Pandas"],
        color: "#6C63FF",
        link: "https://github.com/Federico-Ordonselli/ntsb-aviation-safety-analysis",
      },
      {
        title: "Customer Churn Analysis",
        desc: tr(
          "Analisi dell’abbandono dei clienti nel settore delle telecomunicazioni, con modelli di classificazione in Python e una dashboard Tableau per esplorare i risultati.",
          "Analysis of customer churn in telecommunications, with Python classification models and a Tableau dashboard to explore the results."
        ),
        tags: ["Python", "Tableau", "Pandas", "Scikit-learn"],
        color: "#FF6584",
        link: "https://github.com/Federico-Ordonselli/telco-churn-analysis",
      },
      {
        title: "Azure Data Pipeline",
        desc: tr(
          "Pipeline ETL per i dati e-commerce di Olist: archiviazione su Azure Data Lake, elaborazione in Azure SQL e visualizzazione in Power BI.",
          "An ETL pipeline for Olist e-commerce data, with storage in Azure Data Lake, processing in Azure SQL and reporting in Power BI."
        ),
        tags: ["Azure", "SQL", "Power BI", "ETL"],
        color: "#43B89C",
        link: "#",
      },
      {
        title: "SQL Northwind Analysis",
        desc: tr(
          "Analisi del database Northwind con SQL: fatturato per categoria, principali clienti, vendite mensili e risultati per dipendente.",
          "SQL analysis of the Northwind database: revenue by category, leading customers, monthly sales and results by employee."
        ),
        tags: ["SQL", "SQLite", "Python", "Pandas"],
        color: "#F7971E",
        link: "https://github.com/Federico-Ordonselli/sql-northwind-analysis",
      },
      {
        title: "E-commerce Sales Analysis",
        desc: tr(
          "Analisi di oltre 541.000 transazioni per esaminare il fatturato, i prodotti più venduti e la distribuzione degli ordini per orario e paese.",
          "Analysis of over 541,000 transactions to examine revenue, best-selling products and the distribution of orders by time of day and country."
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
          "Sito bilingue per prenotare escursioni e viaggi guidati, con pagamenti Stripe e un catalogo gestibile dall’organizzatrice. Include pagamenti in due fasi per i viaggi di più giorni e controlli per evitare prenotazioni oltre i posti disponibili.",
          "A bilingual booking site for guided hikes and trips, with Stripe payments and a catalogue managed by the organiser. Includes two-stage payments for multi-day trips and controls to prevent overbooking."
        ),
        tags: ["Next.js 16", "TypeScript", "Stripe", "PostgreSQL", "Sanity"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Runebog GM",
        desc: tr(
          "Applicazione per gestire sessioni di giochi di ruolo, con mappe di città e dungeon, 331 schede mostro SRD 5.2.1 in italiano e un generatore procedurale. I giocatori possono consultare una vista condivisa in sola lettura.",
          "An app for running tabletop RPG sessions, with city and dungeon maps, 331 Italian SRD 5.2.1 monster stat blocks and a procedural generator. Players can follow along through a shared read-only view."
        ),
        tags: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "PWA"],
        color: "#43B89C",
        link: "https://runebog.app",
      },
      {
        title: "qrinventory",
        desc: tr(
          "Gestione dell’inventario con etichette QR e documenti PDF. Sviluppato con FastAPI e SQLModel, con autenticazione JWT/OAuth2 e deploy su Railway.",
          "An inventory system with QR labels and PDF documents. Built with FastAPI and SQLModel, with JWT/OAuth2 authentication and deployment on Railway."
        ),
        tags: ["FastAPI", "SQLModel", "QR", "Docker"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Learning Vault",
        desc: tr(
          "Applicazione personale per raccogliere e organizzare appunti su videogiochi, chitarra e analisi dei dati. Realizzata con Next.js, TypeScript e SQLite.",
          "A personal app for collecting and organising notes on video games, guitar and data analysis. Built with Next.js, TypeScript and SQLite."
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
          "Assistente per consultare documenti e trascrizioni video tramite una pipeline RAG locale. Usa Ollama e ChromaDB per la ricerca nei contenuti e Groq Whisper per la trascrizione.",
          "An assistant for querying documents and video transcripts through a local RAG pipeline. Uses Ollama and ChromaDB for content retrieval and Groq Whisper for transcription."
        ),
        tags: ["Python", "Docker", "ChromaDB", "Ollama", "RAG"],
        color: "#F7971E",
        link: "https://github.com/Federico-Ordonselli/studybuddy",
      },
      {
        title: "D&D Transcription App",
        desc: tr(
          "Trascrizione delle sessioni di D&D con faster-whisper e pyannote.audio, con riconoscimento dei parlanti e distinzione tra dialoghi dei personaggi e conversazioni dei giocatori.",
          "D&D session transcription using faster-whisper and pyannote.audio, with speaker identification and a distinction between character dialogue and player conversation."
        ),
        tags: ["Python", "Whisper", "NLP", "Speaker Diarization"],
        color: "#F7971E",
        link: "#",
      },
      {
        title: "Sub Tracker",
        desc: tr(
          "Applicazione desktop per tenere traccia degli abbonamenti, realizzata con PyQt6 e SQLite e integrata con systemd su Linux.",
          "A desktop app for tracking subscriptions, built with PyQt6 and SQLite and integrated with systemd on Linux."
        ),
        tags: ["PyQt6", "SQLite", "Linux", "systemd"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Security Log Analysis",
        desc: tr(
          "Analisi di log SSH con Python per individuare tentativi di accesso ripetuti e indirizzi IP sospetti, con aggregazioni e grafici dei risultati.",
          "Python analysis of SSH logs to identify repeated login attempts and suspicious IP addresses, with summaries and charts of the results."
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
      title: tr("Stampa 3D", "3D printing"),
      desc: tr(
          "Uso una Bambu Lab A1 con AMS Lite per realizzare piccoli progetti. Sto costruendo un controller leverless con scocca stampata in 3D; ho anche modellato in Blender una replica della Piramide Cestia.",
          "I use a Bambu Lab A1 with AMS Lite for small projects. I’m building a leverless controller with a 3D-printed case, and have also modelled a replica of the Pyramid of Cestius in Blender."
        ),
      tags: ["Bambu Lab", "Blender", "FDM", "Hitbox"],
      color: "#6C63FF",
    },
    {
      icon: "🔧",
      title: tr("Elettronica", "Electronics"),
      desc: tr(
          "Mi piace modificare controller e lavorare a piccoli progetti di elettronica, dalla progettazione dei pezzi in CAD alla saldatura e all’assemblaggio.",
          "I enjoy modifying controllers and working on small electronics projects, from designing parts in CAD to soldering and assembly."
        ),
      tags: [tr("Saldatura", "Soldering"), "DIY", "Modding"],
      color: "#F7971E",
    },
    {
      icon: "🎮",
      title: tr("Videogiochi", "Video Games"),
      desc: tr(
          "Gioco soprattutto a Street Fighter 6, con Cammy, e a Teamfight Tactics. Ogni tanto passo a Pokémon Champions o ad Assetto Corsa con il mio Logitech G27.",
          "I mostly play Street Fighter 6 as Cammy and Teamfight Tactics. I also play Pokémon Champions and Assetto Corsa with my Logitech G27."
        ),
      tags: ["FGC", "SF6", "TFT", "Sim Racing"],
      color: "#FF6584",
    },
    {
      icon: "🎲",
      title: "Dungeon Master",
      desc: tr(
          "Faccio il Dungeon Master da diversi anni. Da questo interesse sono nati alcuni dei miei progetti: un assistente per consultare i manuali di D&D e un’app per trascrivere le sessioni.",
          "I’ve been a Dungeon Master for several years. This interest led to some of my projects, including an assistant for looking up D&D rules and an app for transcribing sessions."
        ),
      tags: ["D&D", "RAG", "Worldbuilding"],
      color: "#43B89C",
    },
  ],

  about: {
    bio: tr(
          "Sono Federico, uno sviluppatore full-stack junior di Roma. Sviluppo applicazioni con React e Next.js, tra cui una piattaforma per prenotare e pagare escursioni guidate. Prima di dedicarmi allo sviluppo web ho lavorato per due anni nella sicurezza operativa all’aeroporto di Fiumicino, con ICTS. Ho conseguito le certificazioni CompTIA Security+ e CySA+ e continuo a studiare sicurezza informatica e sviluppo software.",
          "I’m Federico, a junior full-stack developer based in Rome. I develop applications with React and Next.js, including a platform for booking and paying for guided hikes. Before moving into web development, I spent two years working in operational security at Fiumicino Airport with ICTS. I hold CompTIA Security+ and CySA+ certifications and continue to study cybersecurity and software development."
        ),
    facts: [
      { label: tr("Videogioco preferito", "Favorite video game"), value: tr("Street Fighter 6 — main Cammy", "Street Fighter 6 — Cammy main"), icon: "🕹️" },
      { label: tr("Musica", "Music"), value: tr("Produzione musicale con plugin VST", "Music production with VST plugins"), icon: "🎹" },
      { label: tr("Progetti manuali", "Hands-on projects"), value: tr("Stampa 3D e saldatura", "3D printing and soldering"), icon: "🖨️" },
      { label: tr("Giochi di ruolo", "Tabletop RPGs"), value: tr("Dungeon Master in D&D", "D&D Dungeon Master"), icon: "🐉" },
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
        label: tr("Linguaggi e frontend", "Languages & frontend"),
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
      category: tr("Sicurezza informatica", "Cybersecurity"),
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
      category: tr("Analisi dei dati", "Data analysis"),
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
      data: tr("Analisi dei dati", "Data analysis"),
      web: tr("Applicazioni web", "Web applications"),
      cyber: tr("Strumenti e sicurezza", "Tools & security"),
    },
    certsPage: {
      subtitle: tr("Formazione", "Education"),
      title: tr("Certificazioni", "Certifications"),
      intro: tr(
        "Qui puoi consultare gli attestati in PDF e, dove disponibile, il link di verifica.",
        "View the certificates as PDFs or follow the verification link where available."
      ),
      view: tr("Visualizza certificato", "View certificate"),
      verify: tr("Verifica", "Verify"),
      open: tr("Apri", "Open"),
      close: tr("Chiudi", "Close"),
    },
    hobbiesPage: {
      subtitle: tr("Tempo libero", "Outside work"),
      title: tr("Hobby e interessi", "Hobbies & interests"),
    },
    aboutPage: {
      subtitle: tr("Profilo", "Profile"),
      title: tr("Chi sono", "About me"),
      skillsHeading: tr("Competenze tecniche", "Technical skills"),
      certsHeading: tr("Certificazioni", "Certifications"),
      playlistHeading: tr("Una canzone che ascolto spesso", "A song I often listen to"),
      loadSpotify: tr("Ascolta su Spotify", "Listen on Spotify"),
    },
  },
};

export function getContent(lang) {
  return resolve(RAW, lang);
}

// Lingue disponibili (per il toggle in Navbar)
export const LANGS = ["it", "en"];
