// ─── DATI ────────────────────────────────────────────────────────────────────
export const DATA = {
  name: "Federico",
  role: "Junior Data Analyst · Security · Builder",
  tagline: "Trasformo dati in decisioni. Costruisco cose, digitali e fisiche.",
  location: "Roma, Italia",
  email: "federico@example.com",
  github: "https://github.com/federico",
  linkedin: "https://linkedin.com/in/federico",

  projects: {
    data: [
      {
        title: "NTSB Aviation Safety Analysis",
        desc: "Analisi su dataset incidenti aviazione NTSB con Python, Power BI e DAX. Identificazione di pattern stagionali e correlazioni tra condizioni meteo e incidenti.",
        tags: ["Python", "Power BI", "DAX", "Pandas"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Customer Churn Analysis",
        desc: "Previsione abbandono clienti Telco con feature engineering, modelli di classificazione e dashboard Tableau interattiva per il team marketing.",
        tags: ["Python", "Tableau", "Pandas", "Scikit-learn"],
        color: "#FF6584",
        link: "#",
      },
      {
        title: "Azure Data Pipeline",
        desc: "Pipeline ETL su ADLS Gen2 + Azure SQL Database con dataset Olist Brazilian E-Commerce. Visualizzazione finale in Power BI Desktop.",
        tags: ["Azure", "SQL", "Power BI", "ETL"],
        color: "#43B89C",
        link: "#",
      },
    ],
    web: [
      {
        title: "StudyBuddy",
        desc: "RAG pipeline locale con Ollama, ChromaDB e Docker Compose. GPU passthrough NVIDIA, pipeline Groq Whisper per trascrizione VOD. Il mio progetto portfolio più solido.",
        tags: ["Python", "Docker", "ChromaDB", "Ollama", "RAG"],
        color: "#F7971E",
        link: "#",
      },
      {
        title: "qrinventory",
        desc: "Sistema inventario con FastAPI + SQLModel, generazione QR code e PDF. Autenticazione JWT/OAuth2, deploy su Railway.",
        tags: ["FastAPI", "SQLModel", "QR", "Docker"],
        color: "#6C63FF",
        link: "#",
      },
      {
        title: "Learning Vault",
        desc: "Webapp personale Next.js 16 + React 19 + TypeScript + SQLite/Drizzle + Tailwind v4 per tracciare conoscenze su SF6, TFT, chitarra e data analysis.",
        tags: ["Next.js", "TypeScript", "SQLite", "Docker"],
        color: "#FF6584",
        link: "#",
      },
      {
        title: "Lumen Verbi",
        desc: "App React + Node/Express + Supabase + Stripe + HeyGen per conversazioni con figure bibliche in italiano. Integrazione pagamenti e video AI.",
        tags: ["React", "Supabase", "Stripe", "HeyGen"],
        color: "#43B89C",
        link: "#",
      },
    ],
    cyber: [
      {
        title: "D&D Transcription App",
        desc: "App trascrizione sessioni D&D con faster-whisper + pyannote.audio. Sistema dual-embedding per distinguere voce in-character da out-of-character.",
        tags: ["Python", "Whisper", "NLP", "Speaker Diarization"],
        color: "#F7971E",
        link: "#",
      },
      {
        title: "Sub Tracker",
        desc: "Desktop app PyQt6 + SQLite per tracciamento abbonamenti. Integrata come servizio systemd su Linux.",
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
      desc: "Bambu Lab A1 + AMS Lite. Sto costruendo un leverless hitbox controller da zero — chassis stampato, switch Gateron KS-9, OLED SH1106. Ho anche modellato una replica della Piramide Cestia in Blender.",
      tags: ["Bambu Lab", "Blender", "FDM", "Hitbox"],
      color: "#6C63FF",
    },
    {
      icon: "🔧",
      title: "Saldatura & Hardware",
      desc: "Modding controller, elettronica DIY, assemblaggio custom. Parto dall'idea, progetto in CAD, stampo, saldo, assemblo. End-to-end.",
      tags: ["Saldatura", "DIY", "Modding"],
      color: "#F7971E",
    },
    {
      icon: "🎮",
      title: "Videogiochi",
      desc: "Street Fighter 6 (main Cammy), Teamfight Tactics, Pokémon Champions, Assetto Corsa con Logitech G27. Simulatori di guida soprattutto la notte.",
      tags: ["FGC", "SF6", "TFT", "Sim Racing"],
      color: "#FF6584",
    },
    {
      icon: "🎲",
      title: "Dungeon Master",
      desc: "DM da anni. Ho costruito un AI DM assistant con RAG sulle core rulebook D&D e un'app di trascrizione per le sessioni. La narrativa è un'altra forma di data storytelling.",
      tags: ["D&D", "RAG", "Worldbuilding"],
      color: "#43B89C",
    },
  ],

  about: {
    bio: "Sono Federico, Junior Data Analyst a Roma con background in sicurezza operativa all'aeroporto di Fiumicino (ICTS). Ho scoperto la data analysis e non ho più smesso. Certificato IBM Data Analyst, CompTIA Security+ e CySA+, con PL-300 in corso.",
    facts: [
      { label: "Videogioco preferito", value: "Street Fighter 6 — main Cammy", icon: "🕹️" },
      { label: "Genere musicale", value: "Produzione musicale con VST plugin", icon: "🎹" },
      { label: "Hobby fisico", value: "3D printing & saldatura", icon: "🖨️" },
      { label: "TTRPG", value: "D&D — sempre dalla parte del DM", icon: "🐉" },
      { label: "Setup", value: "Ryzen 7 9700X · RTX 4080 Super · CachyOS", icon: "💻" },
      { label: "Città", value: "Roma, Italia", icon: "🏛️" },
    ],
    spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j?utm_source=generator",
    certs: [
      { name: "IBM Data Analyst Professional", color: "#6C63FF" },
      { name: "CompTIA Security+", color: "#FF6584" },
      { name: "CompTIA CySA+", color: "#43B89C" },
      { name: "PL-300 Power BI (in corso)", color: "#F7971E" },
    ],
  },
};
