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
          "Analisi di 7.438 incidenti aerei negli Stati Uniti, con pulizia dei dati in Python e dashboard Power BI. Esplora tipologie di volo, gravità e distribuzione geografica, evidenziando i limiti di copertura del dataset.",
          "Analysis of 7,438 aviation accidents in the United States, with Python data cleaning and a Power BI dashboard. Explores flight categories, severity and geographic distribution, highlighting gaps in dataset coverage."
        ),
        tags: ["Python", "Pandas", "Power BI", "DAX"],
        color: "#6C63FF",
        link: "https://github.com/Federico-Ordonselli/ntsb-aviation-safety-analysis",
      },
      {
        title: "Customer Churn Analysis",
        desc: tr(
          "Analisi di 7.043 clienti del dataset IBM Telco: pulizia dei dati in Python e dashboard Tableau su abbandono, contratti, anzianità dei clienti e metodi di pagamento.",
          "Analysis of 7,043 customers from the IBM Telco dataset: Python data cleaning and a Tableau dashboard covering churn, contracts, customer tenure and payment methods."
        ),
        tags: ["Python", "Pandas", "Tableau"],
        color: "#FF6584",
        link: "https://github.com/Federico-Ordonselli/telco-churn-analysis",
      },
      {
        title: "Azure Data Pipeline",
        desc: tr(
          "Pipeline ETL in Python per leggere CSV da Azure Data Lake, normalizzare le colonne e caricare i dati in Azure SQL. Il repository include la configurazione dell’infrastruttura con Terraform.",
          "A Python ETL pipeline that reads CSV files from Azure Data Lake, normalises columns and loads data into Azure SQL. The repository includes Terraform infrastructure configuration."
        ),
        tags: ["Python", "Pandas", "Azure SQL", "ADLS Gen2", "Terraform"],
        color: "#43B89C",
        link: "#",
      },
      {
        title: "SQL Northwind Analysis",
        desc: tr(
          "Query SQL sul database Northwind per analizzare fatturato, clienti, vendite per dipendente e livelli di scorta. Uno script Python genera grafici e un report CSV dei risultati.",
          "SQL queries on the Northwind database to analyse revenue, customers, sales by employee and stock levels. A Python script generates charts and a CSV report of the results."
        ),
        tags: ["SQL", "SQLite", "Python", "Pandas", "Matplotlib"],
        color: "#F7971E",
        link: "https://github.com/Federico-Ordonselli/sql-northwind-analysis",
      },
      {
        title: "E-commerce Sales Analysis",
        desc: tr(
          "Analisi delle vendite del dataset Online Retail con Python: pulizia dei dati, fatturato mensile, prodotti principali e ordini per orario e paese. I risultati sono raccolti in grafici e riepiloghi.",
          "Python analysis of the Online Retail sales dataset: data cleaning, monthly revenue, leading products and orders by time of day and country. Results are presented as charts and summaries."
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
          "Sito bilingue per escursioni e viaggi guidati, con catalogo e blog gestiti tramite Sanity. Le prenotazioni usano Stripe, con pagamento completo o acconto e saldo, e PostgreSQL per gestire posti e pagamenti.",
          "A bilingual site for guided hikes and trips, with a catalogue and blog managed through Sanity. Bookings use Stripe for full payments or deposits and balances, with PostgreSQL managing capacity and payments."
        ),
        tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Sanity"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Runebog GM",
        desc: tr(
          "Applicazione per organizzare campagne di giochi di ruolo: mappe navigabili, schede mostro D&D, generazione di dungeon e gestione degli incontri. Include salvataggio cloud e una vista del tavolo condivisibile con i giocatori.",
          "An app for organising tabletop RPG campaigns: navigable maps, D&D monster stat blocks, dungeon generation and encounter management. Includes cloud saves and a table view that can be shared with players."
        ),
        tags: ["Next.js", "JavaScript", "TypeScript", "PostgreSQL", "Auth.js"],
        color: "#43B89C",
        link: "https://runebog.app",
      },
      {
        title: "qrinventory",
        desc: tr(
          "API per gestire oggetti e posizioni di un inventario, con codici QR e fogli di etichette PDF. Backend FastAPI e SQLModel, con Docker, test automatici e configurazione del deploy su Azure tramite Terraform e GitHub Actions.",
          "An API for managing inventory items and locations, with QR codes and printable PDF label sheets. Built with FastAPI and SQLModel, with Docker, automated tests and Azure deployment configuration using Terraform and GitHub Actions."
        ),
        tags: ["FastAPI", "SQLModel", "Docker", "Azure", "Terraform"],
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
          "Assistente di studio locale che trasforma documenti, audio e video in riassunti, flashcard e quiz. Permette di fare domande sui materiali con riferimenti alle fonti e di ripassare con ripetizione dilazionata.",
          "A local study assistant that turns documents, audio and video into summaries, flashcards and quizzes. Supports questions about the material with source references, plus spaced repetition for review."
        ),
        tags: ["Python", "Streamlit", "Ollama", "ChromaDB", "Whisper"],
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
          "Progetto di analisi di eventi SSH simulati: individua sequenze di accessi falliti e indirizzi IP sospetti, con grafici per orario e giorno. Realizzato in Python con Pandas, Matplotlib e Seaborn.",
          "An analysis project using simulated SSH events to identify repeated failed logins and suspicious IP addresses, with charts by hour and day. Built with Python, Pandas, Matplotlib and Seaborn."
        ),
        tags: ["Python", "Pandas", "Matplotlib", "Security"],
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
