# Federico · Portfolio

Prossime idee: [Migliorie del portfolio](docs/MIGLIORIE-PORTFOLIO.md).

Portfolio in **Next.js 16 + React 19**, con App Router. La homepage presenta
progetti selezionati, una demo interattiva con tre stili e percorsi di
approfondimento su frontend, integrazioni e backend. Le schede originali di
progetti, certificazioni, hobby e profilo sono conservate.

## Sviluppo locale

Requisiti: Node.js 20.9+ e npm. Nessuna chiave API necessaria.

```bash
npm ci
npm run dev   # http://localhost:3000
```

Altri comandi:

```bash
npm run build     # build di produzione in .next/
npm run start     # serve la build di produzione sulla porta 3000
npm run lint      # ESLint
npm run test:browser  # richiede il server avviato e Google Chrome installato
```

## Dove modificare i contenuti

I contenuti originali, i contatti, i PDF e le traduzioni italiano/inglese sono in:

```
src/data/content.js
```

Modifica lì nome, ruolo, tagline, contatti, l'elenco dei progetti
(`projects.data` / `projects.web` / `projects.cyber`), gli `hobbies`, la sezione
`about` (bio, facts, certificazioni, link Spotify). I componenti leggono tutto da
qui, quindi non serve toccare il codice delle pagine per aggiornare le schede.
I testi della nuova homepage sono in `src/views/HomePage.jsx`; gli approfondimenti
sono in `src/data/expertise.js`. Le anteprime dei tre progetti sono illustrazioni
HTML/SVG, non screenshot dei prodotti. Non viene pubblicata una tariffa oraria.

La demo ha tre composizioni: **Minimal** (studio monocromatico), **Explore**
(viaggi con fotografie e selettore di destinazione), **Mix** (layout editoriale,
selettore weekend/spedizione e dettagli espandibili). La larghezza può essere
ridotta con il controllo dell’anteprima compatta; il pulsante per
salvare l’ispirazione mantiene lo stato soltanto durante la visita alla pagina.
Il contatto apre il programma email dell’utente tramite `mailto:`.

Explore riprende colori e fotografie del riferimento locale Vagabondando
(`http://localhost:8881/`). Le due immagini sono copiate in `public/demo-*.jpg`
per rendere la demo indipendente dal server WordPress. Originali:
`20190805_Latemar-8471-Pg-visitfiemme.it-foto-A.-Russolo-294-1024x576.jpg` e
`islanda-paesaggio-vulcanico-reykjavegur-1024x683.jpg`.

## Struttura

```
src/
  app/                   # layout, route, metadata, sitemap, robots e 404
  components/            # navigazione, lingua, demo, anteprime e card
  views/                 # homepage e viste originali
  data/content.js        # contenuti originali IT/EN
  data/expertise.js      # percorsi per tecnologia, con progetti collegati
  index.css              # stili delle schede originali
  showcase.css           # homepage, navigazione e approfondimenti
  proxy.js               # Content Security Policy con nonce per richiesta
```

## Navigazione e lingua

Route: `/`, `/projects`, `/about`, `/certifications`, `/hobbies`,
`/competenze/frontend`, `/competenze/integrazioni`, `/competenze/backend`.
I vecchi URL `/#/projects` e analoghi vengono convertiti nella route corrispondente.
L’inglese è la lingua predefinita; l’italiano è disponibile dal selettore EN / IT.
La lingua selezionata viene mantenuta in un cookie funzionale `lang` per un anno;
il server legge il cookie per renderizzare la lingua corretta anche al reload.

## Verifiche e deploy

I test browser coprono desktop e mobile: demo, menu, assenza di overflow,
lingua persistente, schede originali, PDF, ancore, vecchi URL e pagina 404.
Le schermate vengono salvate in `test-results/` (ignorata da Git).

Vercel è configurato per Next.js e la directory `.next`, al posto di Vite e `dist`.
Non è un export statico: le pagine usano rendering per richiesta per il cookie
della lingua e la CSP con nonce. La CSP segue la
[guida ufficiale Next.js](https://nextjs.org/docs/app/guides/content-security-policy).
Gli stili inline sono permessi per conservare i componenti originali; gli script
inline richiedono il nonce. `unsafe-eval` è consentito solo in sviluppo.
Il sito carica font di sistema e nessun servizio esterno nella homepage.

Il toolkit usa icone SVG di [Simple Icons](https://simpleicons.org/), incluse nel
bundle del sito, con colori del marchio e nomi sempre visibili. La fila scorre
in loop e ingrandisce gradualmente l’icona al centro. Un clic su un’icona la
centra e mette in pausa; frecce e tastiera permettono di avanzare o arretrare.
Il pulsante play riprende il loop. La fila si ferma anche al passaggio del mouse,
al focus da tastiera e quando esce dallo schermo. Con movimento ridotto mostra una griglia
statica; senza JavaScript la fila si può scorrere manualmente.

## Anteprime delle certificazioni

Le card mostrano immagini della prima pagina dei PDF, salvate in
`public/certs/previews/`. Dopo aver aggiunto o sostituito un certificato,
rigenerale con:

```bash
node scripts/generate-cert-previews.mjs
```

Il comando richiede `pdftoppm` (Poppler). Le immagini generate vanno incluse nel
commit; il sito e la build non richiedono Poppler.
