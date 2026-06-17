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
  role: "Junior Data Analyst · Security · Builder",
  tagline: tr(
    "Trasformo dati in decisioni. Costruisco cose, digitali e fisiche.",
    "I turn data into decisions. I build things — digital and physical."
  ),
  location: tr("Roma, Italia", "Rome, Italy"),
  email: "fede.ordons@gmail.com",
  github: "https://github.com/Federico-Ordonselli",
  linkedin: "https://www.linkedin.com/in/federico-ordonselli-aa7363226/",

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
        link: "#",
      },
      {
        title: "Customer Churn Analysis",
        desc: tr(
          "Previsione abbandono clienti Telco con feature engineering, modelli di classificazione e dashboard Tableau interattiva per il team marketing.",
          "Telco customer churn prediction with feature engineering, classification models and an interactive Tableau dashboard for the marketing team."
        ),
        tags: ["Python", "Tableau", "Pandas", "Scikit-learn"],
        color: "#FF6584",
        link: "#",
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
    ],
    web: [
      {
        title: "StudyBuddy",
        desc: tr(
          "RAG pipeline locale con Ollama, ChromaDB e Docker Compose. GPU passthrough NVIDIA, pipeline Groq Whisper per trascrizione VOD. Il mio progetto portfolio più solido.",
          "Local RAG pipeline with Ollama, ChromaDB and Docker Compose. NVIDIA GPU passthrough, Groq Whisper pipeline for VOD transcription. My most solid portfolio project."
        ),
        tags: ["Python", "Docker", "ChromaDB", "Ollama", "RAG"],
        color: "#F7971E",
        link: "#",
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
      {
        title: "Lumen Verbi",
        desc: tr(
          "App React + Node/Express + Supabase + Stripe + HeyGen per conversazioni con figure bibliche in italiano. Integrazione pagamenti e video AI.",
          "React + Node/Express + Supabase + Stripe + HeyGen app for conversations with biblical figures in Italian. Payment integration and AI video."
        ),
        tags: ["React", "Supabase", "Stripe", "HeyGen"],
        color: "#43B89C",
        link: "#",
      },
    ],
    cyber: [
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
      "Sono Federico, Junior Data Analyst a Roma con background in sicurezza operativa all'aeroporto di Fiumicino (ICTS). Ho scoperto la data analysis e non ho più smesso. Certificato IBM Data Analyst, CompTIA Security+ e CySA+, con PL-300 in corso.",
      "I'm Federico, a Junior Data Analyst in Rome with a background in operational security at Fiumicino Airport (ICTS). I discovered data analysis and never looked back. IBM Data Analyst, CompTIA Security+ and CySA+ certified, with PL-300 in progress."
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
      { name: "IBM Data Analyst Professional", color: "#6C63FF" },
      { name: "CompTIA Security+", color: "#FF6584" },
      { name: "CompTIA CySA+", color: "#43B89C" },
      { name: tr("PL-300 Power BI (in corso)", "PL-300 Power BI (in progress)"), color: "#F7971E" },
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
