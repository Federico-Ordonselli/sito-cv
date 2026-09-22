export const expertise = [
  {
    slug: 'frontend', number: '01', tags: ['React', 'Next.js', 'TypeScript'],
    title: { it: 'Interfacce che si fanno usare.', en: 'Interfaces that feel right.' },
    short: { it: 'Siti e applicazioni veloci, responsive e curati in ogni interazione.', en: 'Fast, responsive websites and apps, with considered interactions.' },
    intro: { it: 'Dalla prima schermata ai flussi più articolati: costruisco interfacce con componenti riutilizzabili, stati chiari e attenzione a chi le usa da telefono, mouse o tastiera.', en: 'From the first screen to complex workflows: I build interfaces with reusable components, clear states and care for people using touch, mouse or keyboard.' },
    points: {
      it: [['Componenti e stato', 'React e TypeScript per organizzare interfacce, dati e interazioni. Runebog combina le pagine Next.js con un editor interattivo per mappe e incontri.'], ['Navigazione e contenuti', 'Next.js per pagine con URL dedicati e contenuti renderizzati sul server. In Trekking Marti, il catalogo bilingue è collegato a Sanity.'], ['Qualità delle interazioni', 'Layout responsive e verifiche automatiche. Matchday include test con Vitest e React Testing Library.']],
      en: [['Components and state', 'React and TypeScript to organise interfaces, data and interactions. Runebog combines Next.js pages with an interactive map and encounter editor.'], ['Navigation and content', 'Next.js for dedicated URLs and server-rendered content. Trekking Marti connects a bilingual catalogue to Sanity.'], ['Interaction quality', 'Responsive layouts and automated checks. Matchday includes tests with Vitest and React Testing Library.']],
    },
    projects: ['Runebog GM', 'Matchday', 'Trekking Marti'],
  },
  {
    slug: 'integrazioni', number: '02', tags: ['WordPress', 'Stripe', 'Sanity', 'Auth.js'],
    title: { it: 'Il sito lavora. Tu anche.', en: 'A website that does the work.' },
    short: { it: 'Prenotazioni, pagamenti, contenuti e accessi: tutto nello stesso flusso.', en: 'Bookings, payments, content and sign-in, connected in one flow.' },
    intro: { it: 'Un sito può fare molto più che presentare un’attività. Collego servizi e interfacce per gestire prenotazioni, modificare contenuti e ritrovare i propri dati dopo il login.', en: 'A website can do more than introduce a business. I connect services and interfaces to handle bookings, edit content and restore your data after sign-in.' },
    points: {
      it: [['Pagamenti e prenotazioni', 'Trekking Marti integra Stripe Checkout con pagamento completo oppure acconto e saldo. PostgreSQL conserva lo stato di prenotazioni e posti. Il progetto non è ancora in produzione.'], ['Contenuti modificabili', 'Lavoro con WordPress per siti e contenuti gestibili in autonomia, e con Sanity per progetti su misura. In Trekking Marti, Sanity permette alla proprietaria di gestire catalogo e blog in italiano e inglese.'], ['Account e salvataggi', 'Runebog usa Auth.js per l’accesso e PostgreSQL per il salvataggio cloud delle campagne, con una vista condivisibile con i giocatori.']],
      en: [['Payments and bookings', 'Trekking Marti integrates Stripe Checkout for full payments or deposits and balances. PostgreSQL tracks booking state and capacity. The project is not yet in production.'], ['Editable content', 'I work with WordPress for independently managed websites and content, and with Sanity for custom projects. In Trekking Marti, Sanity lets the owner manage the catalogue and blog in Italian and English.'], ['Accounts and saved work', 'Runebog uses Auth.js for sign-in and PostgreSQL for cloud campaign saves, with a view that can be shared with players.']],
    },
    projects: ['Trekking Marti', 'Runebog GM'],
  },
  {
    slug: 'backend', number: '03', tags: ['PostgreSQL', 'NeonDB', 'Drizzle ORM', 'MySQL'],
    title: { it: 'Solide basi, dietro le quinte.', en: 'Solid foundations behind it all.' },
    short: { it: 'API, database e strumenti su misura per dare struttura alla tua idea.', en: 'APIs, databases and custom tools that give your idea structure.' },
    intro: { it: 'Dietro un’interfaccia ci sono dati da organizzare e operazioni da verificare. Sviluppo API e strumenti con database relazionali, validazione e test sui comportamenti che contano.', en: 'Behind an interface are data to organise and operations to verify. I build APIs and tools with relational databases, validation and tests for the behaviours that matter.' },
    points: {
      it: [['API e dati', 'Matchday collega un frontend React a un’API Express e PostgreSQL. qrinventory usa FastAPI e SQLModel per oggetti, posizioni ed etichette QR.'], ['Database e ORM', 'Uso PostgreSQL, NeonDB, MySQL e Drizzle ORM per organizzare i dati e collegarli alle applicazioni. Learning Vault usa SQLite con Drizzle per conservare i materiali di studio.'], ['Test e distribuzione', 'Uso Vercel per pubblicare i progetti web e GitHub Actions per pipeline CI/CD. qrinventory include test automatici, Docker e configurazione Azure tramite Terraform e GitHub Actions; Matchday esegue i controlli in GitLab CI.']],
      en: [['APIs and data', 'Matchday connects a React frontend to an Express API and PostgreSQL. qrinventory uses FastAPI and SQLModel for items, locations and QR labels.'], ['Databases and ORMs', 'I use PostgreSQL, NeonDB, MySQL and Drizzle ORM to organise data and connect it to applications. Learning Vault uses SQLite with Drizzle to store study materials.'], ['Tests and deployment', 'I use Vercel to deploy web projects and GitHub Actions for CI/CD pipelines. qrinventory includes automated tests, Docker and Azure configuration through Terraform and GitHub Actions; Matchday runs checks in GitLab CI.']],
    },
    projects: ['Matchday', 'qrinventory', 'Learning Vault'],
  },
];
