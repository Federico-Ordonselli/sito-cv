# Federico · Portfolio

Portfolio personale single-page costruito con **React + Vite**. Una sola app con
navigazione client-side tra Home, Progetti, Hobby e Chi sono. Stili interamente
inline + keyframes CSS, nessuna dipendenza UI esterna.

## Sviluppo locale

Requisiti: Node.js 18+ (consigliato 20+) e npm.

```bash
npm install   # installa le dipendenze
npm run dev   # avvia il dev server su http://localhost:5173
```

Altri comandi:

```bash
npm run build     # build di produzione in dist/ (è quella che usa Vercel)
npm run preview   # serve localmente la build di produzione
npm run lint      # ESLint
```

## Dove modificare i contenuti

Tutti i testi, i progetti, gli hobby, le certificazioni e i link vivono in un
unico file:

```
src/data/content.js   →   oggetto DATA
```

Modifica lì nome, ruolo, tagline, contatti, l'elenco dei progetti
(`projects.data` / `projects.web` / `projects.cyber`), gli `hobbies`, la sezione
`about` (bio, facts, certificazioni, link Spotify). I componenti leggono tutto da
qui, quindi non serve toccare il codice delle pagine per aggiornare i contenuti.

## Struttura

```
src/
  data/content.js        # tutti i contenuti (oggetto DATA)
  components/            # Tag, Card, Navbar, SectionHeader, SubSection
  pages/                 # HomePage, ProjectsPage, HobbiesPage, AboutPage
  App.jsx                # layout, navbar, footer, keyframes, switch pagine
  main.jsx               # entry point
```
