# Runebog GM — scheda di progetto per il sito CV

**Cos'è questo file.** La descrizione di riferimento di un mio progetto personale,
scritta per essere data in pasto a Claude Code nel repository del mio sito CV. Serve
a scriverne una pagina, una voce di portfolio o un paragrafo di curriculum **senza
inventare niente**.

**Regole per chi lo legge (agente incluso).**

- Questo file è la fonte: se un dato non c'è, **non dedurlo** — chiedimelo.
  In particolare non sono qui e non vanno inventati: numero di utenti, traffico,
  premi, clienti, ore di lavoro, "usato da studi/associazioni".
- I numeri sono **misurati alla data indicata**. Riportali con l'ordine di grandezza
  («oltre 100 test», «circa 330 schede mostro») se il testo deve invecchiare bene.
- La licenza va detta come sta scritta nella sezione apposita. È un dato legale.
- Ultimo aggiornamento della scheda: **11 agosto 2026**.

---

## 1. In breve, pronto da usare

### Una riga (IT)
Runebog GM — applicazione web per Game Master di giochi di ruolo: mappe gerarchiche
di campagna, bestiario e regole D&D 5e in italiano, tavolo condiviso in sola lettura
per i giocatori.

### Una riga (EN)
Runebog GM — a web app for tabletop RPG Game Masters: nested campaign maps, an Italian
D&D 5e bestiary and rules reference, and a read-only shared table for players.

### ~40 parole (IT)
Applicazione web per Game Master di giochi di ruolo da tavolo. Mappe gerarchiche di
città e dungeon, schede mostro SRD 5.2.1 in italiano, generatore di dungeon
deterministico e un tavolo condiviso in sola lettura per i giocatori. Next.js 15 e
Postgres per il sito, JavaScript vanilla senza build per l'editor.

### ~40 parole (EN)
A web app for tabletop RPG Game Masters: infinitely nested maps of cities and dungeons,
Italian D&D 5e SRD monster stat blocks, a deterministic dungeon generator, and a
read-only shared table for players. Next.js 15 and Postgres for the site; framework-free
vanilla JavaScript for the editor.

### ~120 parole (IT)
Runebog GM è uno strumento per Game Master di giochi di ruolo, nato per una one-shot e
cresciuto in un'applicazione completa. Il cuore è una mappa di "bolle" annidabili senza
limite di profondità — un mondo contiene nazioni, una città contiene quartieri, un
edificio contiene stanze — con muri, porte, griglia in scala e modalità combattimento.
Un link segreto apre ai giocatori un **tavolo in sola lettura**, dove il filtro di ciò
che si vede è ricostruito sul server campo per campo. Include il bestiario e dieci
capitoli dell'SRD 5.2.1 in italiano, estratti dal PDF ufficiale da uno script proprio, e
funziona offline come PWA installabile. Il sito è Next.js 15 su Postgres; l'editor è
JavaScript vanilla, senza framework e senza build step.

---

## 2. Cosa fa, per un lettore non tecnico

- **Mappa gerarchica.** Ogni "bolla" è un luogo che può contenerne altre, senza limite di
  profondità. La scala va da *mondo* a *stanza* e si può allargare a posteriori (zoom
  indietro: la campagna nata come città diventa una regione).
- **Pianta giocabile.** Muri liberi, porte tipizzate (aperta, chiusa, a chiave, segreta),
  griglia in scala (1 quadretto = 1,5 m), modalità combattimento con pedine e ordine
  d'iniziativa.
- **Tavolo per i giocatori.** Un link condivisibile mostra solo ciò che il GM ha
  rivelato: note separate, collegamenti segreti invisibili, porte segrete che escono come
  muro pieno.
- **Contenuti D&D 5e in italiano.** 331 schede mostro e dieci capitoli di regole
  (SRD 5.2.1, edizione 2024), con ricerca trasversale sui titoli e rimandi navigabili.
- **Generatore di dungeon** deterministico da seed, importabile nella campagna come
  bolla con le pareti vere.
- **Strumenti da tavolo**: righello in metri, aree d'effetto (cerchio, cono, linea,
  quadrato), tiradadi, diario delle quest, checklist, scheda dei giocatori.
- **Offline e installabile.** L'editor funziona senza rete come PWA; le regole si
  scaricano su richiesta, dichiarando quanto pesano.
- **Dodici temi** grafici, tutti verificati automaticamente per contrasto WCAG.

---

## 3. Stack tecnico

| Ambito | Scelta |
|---|---|
| Sito | Next.js 15 (App Router), React 19, TypeScript |
| Autenticazione | Auth.js v5 — Google OAuth + credenziali, sessioni JWT, scrypt della stdlib |
| Database | Neon Postgres, Drizzle ORM, migrazioni SQL versionate |
| Editor | JavaScript vanilla in moduli ES — nessun framework, nessuna dipendenza a runtime, nessun build step |
| Rendering mappa | SVG scritto a mano, pan/zoom via `viewBox`, Pointer Events |
| Offline | Service worker **generato a build time** (lista file e versioni = hash del contenuto), manifest PWA |
| Test | `node:test`, test puri senza DOM né dipendenze |
| CI | GitHub Actions: typecheck + test + build a ogni push e PR |
| Deploy | Vercel, dominio `runebog.app` (tutto su piani gratuiti: Vercel Hobby + Neon free) |

---

## 4. Le scelte che vale la pena raccontare

Sono i punti "da colloquio": ognuno è una decisione con un motivo, non una feature.

1. **Un solo JSON per tutto.** Lo stato di una campagna è un unico oggetto serializzabile:
   stessa forma per l'esportazione, per la colonna JSONB del database e per l'iniezione
   nella pagina. L'esportazione diventa banale e l'importazione simmetrica; non esiste una
   seconda rappresentazione da tenere allineata.
2. **Due applicazioni, un formato.** Il sito (Next.js) e l'editor (vanilla) condividono
   solo il contratto del documento, definito in un modulo senza dipendenze usato da
   entrambi i lati. Regola dichiarata: *rigido in scrittura, tollerante in lettura* —
   l'API rifiuta con 422 un documento malformato, ma nessun percorso di lettura lancia,
   perché un errore lì chiuderebbe fuori i giocatori.
3. **Concorrenza ottimistica fatta bene.** Ogni salvataggio dichiara la revisione da cui
   parte e la condizione sta **dentro** l'`UPDATE` (`WHERE id AND user_id AND revision =
   base`): zero righe aggiornate *è* il conflitto. Verificato con richieste concorrenti
   vere su un branch di database usa-e-getta — otto scritture dalla stessa base danno una
   sola vincitrice, mentre la stessa rotta scritta "leggi-poi-scrivi" ne fa passare sei.
4. **Nessun merge automatico, nessuna perdita silenziosa.** In caso di conflitto la copia
   locale viene scritta *prima* della richiesta e l'utente sceglie fra tre azioni
   esplicite, con i due titoli e le due date davanti.
5. **La sicurezza del tavolo è una proiezione, non un filtro lato client.** Ai giocatori
   arriva solo ciò che il server ricostruisce campo per campo: ID risolti in nomi, note
   del GM separate, passaggi segreti assenti. Il polling è condizionale (ETag = numero di
   revisione, confronto debole conforme a RFC 9110).
6. **PDF → JSON: un estrattore su misura.** I capitoli delle regole e le 331 schede mostro
   sono estratti dal PDF ufficiale da script propri, perché in quel documento la semantica
   sta nei *font e nei colori*, non nel testo: titoli riconosciuti per relazione fra canali
   RGB, tabelle ricostruite dalla geometria delle colonne, legature e Private Use Area
   sciolte a mano. Ogni capitolo passa da un verificatore che lo confronta con
   `pdftotext` prima di essere pubblicato.
7. **Accessibilità misurata, non dichiarata.** Uno script confronta i rapporti di contrasto
   WCAG di tutte le coppie colore su dodici temi e fallisce sotto soglia; le famiglie di
   accento si controllano in ΔE Lab, perché il rapporto WCAG dà per uguali due tinte
   diverse della stessa luminanza. Bersagli touch da 44px dichiarati per **ruolo**, non
   per classe CSS.
8. **Pochi test, ma sugli invarianti giusti.** Niente test di facciata: coprono la
   serializzazione di JSON dentro `<script>` (XSS), la proiezione per i giocatori come
   whitelist, la bonifica dell'input non fidato, il determinismo del generatore di dungeon
   e la coerenza fra i due elenchi di forme che, se divergessero, farebbero rimbalzare una
   campagna legittima.
9. **Documentazione come parte del lavoro.** Il repository tiene un `CLAUDE.md` esteso che
   registra invarianti, trappole già pagate e il *verso in cui è accettabile sbagliare* per
   ogni scelta — pensato per riprendere il progetto a freddo.

---

## 5. Numeri verificati

Misurati l'**11 agosto 2026** eseguendo i comandi del repository.

| Dato | Valore |
|---|---|
| Primo commit | 13 luglio 2026 |
| Commit totali | 155 |
| Codice del sito (TypeScript/TSX) | ~6.200 righe, 59 file |
| Codice dell'editor (JS, escluso il dataset) | ~7.500 righe, 28 moduli ES |
| Test automatici | 104, tutti verdi |
| Schede mostro SRD in italiano | 331 |
| Capitoli di regole pubblicati | 10 (più le informazioni legali) |
| Temi grafici | 12 |
| Dipendenze a runtime | 7 (`next`, `react`, `react-dom`, `next-auth`, `@auth/drizzle-adapter`, `drizzle-orm`, `@neondatabase/serverless`) |
| Dipendenze dell'editor | 0 |

Autore unico: **Federico Ordonselli**. Progetto personale, non commissionato.

---

## 6. Competenze dimostrabili (tag per il CV)

`Next.js 15` · `React 19` · `TypeScript` · `PostgreSQL` · `Drizzle ORM` · `Auth.js / OAuth`
· `JavaScript vanilla / moduli ES` · `SVG` · `Pointer Events` · `PWA / service worker`
· `concorrenza ottimistica` · `progettazione di API REST` · `sicurezza applicativa (XSS,
autorizzazione, hashing password)` · `accessibilità WCAG` · `parsing di PDF` · `algoritmi
deterministici (generazione procedurale)` · `CI/CD (GitHub Actions, Vercel)` ·
`documentazione tecnica`

---

## 7. Link, licenze, attribuzioni

- Sito: **https://runebog.app**
- Repository: **https://github.com/Federico-Ordonselli/runebog-gm**
- Contatto pubblicato dal progetto: `support@runebog.app`

**Attenzione, sono dati legali — vanno riportati così:**

- Il **codice** è rilasciato con licenza **PolyForm Noncommercial 1.0.0**: l'uso
  commerciale non è consentito. **Non scrivere "open source"** senza qualificarlo:
  PolyForm non è una licenza approvata OSI. Se serve una formula breve: *«sorgente
  pubblico, licenza non commerciale (PolyForm Noncommercial 1.0.0)»*. Le versioni
  distribuite prima del 29 luglio 2026 erano MIT e quella concessione resta valida.
- I **contenuti SRD** (schede mostro, capitoli di regole) sono **CC-BY-4.0** e permettono
  l'uso commerciale. Se la pagina del CV cita o mostra quei contenuti, l'attribuzione va
  mantenuta: è una condizione della licenza.
- D&D e i marchi relativi non sono miei: il progetto usa l'SRD 5.2.1, materiale concesso
  in licenza. Non presentarlo come prodotto ufficiale né affiliato.

---

## 8. Cosa NON scrivere

- ❌ «open source» senza qualificare (vedi sopra) — ❌ «licenza MIT» (non più).
- ❌ Numeri di utenti, download, traffico, valutazioni: non ne ho di pubblici.
- ❌ «prodotto commerciale», «startup», «SaaS a pagamento»: è gratuito e non commerciale,
  con una pagina di donazioni.
- ❌ «app mobile nativa»: è una PWA installabile, non un'app da store.
- ❌ «basato su React» riferito all'editor: il sito è React, l'**editor è vanilla** — ed è
  una scelta deliberata, non una mancanza.
- ❌ «prodotto ufficiale D&D» o «Wizards of the Coast».
- ❌ Nomi di file, percorsi interni o dettagli del repository nel testo pubblico: qui
  servono a spiegare, non a essere pubblicati.

---

## 9. Come aggiornare questa scheda

Nel repository di Runebog (`runebog-web`), dopo cambiamenti significativi:

```bash
npm test                 # numero di test
git rev-list --count HEAD    # commit
find src -name '*.ts' -o -name '*.tsx' | xargs wc -l | tail -1
```

Il contesto architetturale completo sta nel `CLAUDE.md` del repository e il registro dei
lavori in `TODO.md`; questa scheda ne è il riassunto pubblicabile. Quando divergono, vale
il repository.
