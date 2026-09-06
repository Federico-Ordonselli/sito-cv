# Trekking Marti

Sito di prenotazione e pagamento per un'organizzatrice di trekking e viaggi
avventura guidati. Bilingue, con catalogo gestito dalla cliente, checkout
Stripe a due fasi e area riservata.

Il caso interessante di questo progetto non è la costruzione del sito: è che
il denaro vero passa dentro un sistema distribuito che nessuno controlla per
intero — il browser del cliente, Stripe, un database, un servizio email, un
cron — e che quasi tutte le decisioni difficili nascono da lì.

---

## In breve

| | |
|---|---|
| **Cosa** | Blog, catalogo avventure con prenotazione e pagamento, pagina referral |
| **Per chi** | Una cliente non tecnica, che gestisce i contenuti da sola |
| **Lingue** | Italiano (principale) e inglese |
| **Stack** | Next.js 16 · React 19 · TypeScript strict · Tailwind 4 |
| **Dati** | Sanity (contenuti) + Postgres/Neon con Drizzle (transazioni) |
| **Pagamenti** | Stripe Checkout, due fasi per i viaggi multi-giorno |
| **Email** | Resend + React Email |
| **Auth** | Clerk, confinato alla sola area riservata |
| **Test** | Vitest, 61 casi di dominio · CI su GitHub Actions |
| **Stato** | Flusso completo e provato end-to-end · non ancora in produzione |

36 commit, un commit conventional per passo.

---

## L'obiettivo

Una guida che organizza trekking vende due cose diverse:

- **gite in giornata**, che si pagano per intero al momento della prenotazione;
- **viaggi multi-giorno**, che si prenotano con un acconto e si saldano prima
  della partenza.

Prima del sito, prenotazioni e incassi vivevano fra messaggi, fogli di calcolo
e bonifici. L'obiettivo non era "fare un sito": era **togliere di mezzo la
contabilità manuale senza introdurre errori più costosi di quelli che
risolveva**. Un posto venduto due volte, o un cliente addebitato due volte,
sono danni peggiori di un foglio di calcolo disordinato.

Un secondo obiettivo, meno visibile ma altrettanto vincolante: la cliente non
è tecnica. Ogni cosa che deve fare per lavorare — pubblicare un'avventura,
aprire una partenza, cambiare un prezzo, vedere chi ha prenotato — deve
esistere come interfaccia, perché non ci sarà nessuno a fare query per lei.

---

## La decisione fondante: due archivi, non uno

La scelta che condiziona tutto il resto è la **separazione fra contenuti e
dati transazionali**.

**Sanity** tiene ciò che la cliente scrive e cambia: avventure, partenze,
articoli, link referral. Ha uno Studio embedded su `/studio` che è la sua
interfaccia di lavoro. La localizzazione usa un pattern a oggetto `{it, en}`
(tipi `localeString`, `localeText`, `localeBlockContent`), così un contenuto è
un documento solo, con due varianti dentro, invece di due documenti da tenere
allineati.

**Postgres** tiene ciò che riguarda il denaro: prenotazioni, stato dei
pagamenti, conteggio dei posti. Una partenza di Sanity è referenziata dalle
prenotazioni tramite il suo `_id` stabile.

Il motivo è che i due archivi hanno requisiti opposti. I contenuti devono
essere modificabili da una persona non tecnica, versionati, e possono essere
serviti da una CDN con qualche secondo di ritardo. Le prenotazioni devono
essere transazionali, serializzabili sotto concorrenza, e non possono
tollerare nemmeno un istante di dati stantii — perché su un dato stantio si
vende un posto che non c'è.

Un CMS non fa transazioni. Un database relazionale non è un'interfaccia
editoriale. Provare a farne fare uno all'altro è dove nascono i problemi.

**Conseguenza pratica:** le pagine pubbliche leggono da Sanity via CDN, ma il
flusso di prenotazione usa un client **senza CDN**, perché prezzo e posti
devono essere freschi al momento in cui si prende un impegno.

---

## Il flusso di pagamento

### Due tipi di prodotto

1. **`day_trip`** — pagamento intero alla prenotazione (fase `full`).
2. **`multi_day`** — acconto del 10% alla prenotazione (fase `deposit`), saldo
   del 90% dovuto 10 giorni prima della partenza (fase `balance`), con link
   inviato via email da un cron. **Mai un addebito automatico**: è sempre il
   cliente a decidere di pagare.

La fase viaggia nei `metadata` della Checkout Session Stripe, ed è ciò che
permette al webhook di sapere quale transizione applicare.

### Ciclo di vita di una prenotazione

```
pending ──(webhook: pagamento incassato)──> confirmed
                                                │
                                    (cron, solo multi_day)
                                                ▼
                                          balance_due
                                                │
                                    (webhook: fase balance)
                                                ▼
                                          paid_in_full

rami morti:  pending ──> expired    (checkout.session.expired)
             pending ──> cancelled  (async_payment_failed)
```

---

## Le decisioni che contano

Questa è la parte per cui vale la pena leggere il progetto. Ogni voce risponde
a un modo concreto di perdere soldi o clienti.

### Correttezza del denaro

**Si conferma solo a pagamento incassato, non a sessione completata.**
Il webhook controlla `payment_status === "paid"`. I metodi di pagamento
asincroni completano la Checkout Session *prima* che il denaro arrivi: senza
questo controllo, una prenotazione risultava confermata su un incasso che
poteva ancora fallire. L'incasso vero arriva come evento separato
(`async_payment_succeeded`).

**Ogni transizione di stato è idempotente.**
Stripe consegna gli eventi *at-least-once* e senza ordine garantito. Ogni
`UPDATE` è vincolato nella `WHERE` agli stati di partenza ammessi:

```sql
UPDATE bookings SET status = 'confirmed'
WHERE id = $1 AND status IN ('pending')
```

Senza quel vincolo, la riconsegna dell'evento dell'acconto riporterebbe una
prenotazione già `paid_in_full` indietro a `confirmed`. **Zero righe aggiornate
non è un errore: è "evento già applicato".** Gli errori veri rispondono 500
così Stripe ritenta — cosa che è sicura *proprio perché* le transizioni sono
idempotenti.

**Due PaymentIntent salvati, uno per fase.**
Un `multi_day` incassa due volte, e le due somme si rimborsano separatamente.
Il PaymentIntent è l'oggetto su cui si rimborsa, quindi va conservato — e
scritto dentro l'`UPDATE` guardato, dove una riconsegna non può sovrascriverlo
su una prenotazione già avanzata di fase.

### Anti-overbooking

**Un lock fisico per partenza.**
Ogni partenza ha una riga in `departure_locks`. La creazione di una
prenotazione avviene in transazione con upsert + `SELECT ... FOR UPDATE` su
quella riga, che serializza i tentativi concorrenti. Solo *dopo* il lock si
contano i posti occupati e si inserisce.

Lockare le righe `bookings` non basterebbe: un lock su righe esistenti non
impedisce insert concorrenti. Serve una riga fisica che rappresenti la
partenza, e che esista sempre.

**Un solo predicato di occupazione, condiviso.**
`seatOccupancyFilter()` definisce quali prenotazioni occupano un posto
*adesso*, ed è riusato sia dal contatore delle pagine pubbliche sia dalla
transazione di prenotazione. Se le due regole divergessero, il sito
mostrerebbe posti che il checkout poi rifiuta — o nasconderebbe posti
vendibili.

**Un'invariante espressa in codice, non affidata al caso.**

```ts
export const CHECKOUT_SESSION_TTL_MINUTES = 33;
export const PENDING_TTL_MINUTES = CHECKOUT_SESSION_TTL_MINUTES + 12;
```

Una prenotazione `pending` deve continuare a occupare il posto per tutto il
tempo in cui la sua Checkout Session è ancora pagabile. Erano due costanti
uguali per caso (30 e 30): al minuto 29 il posto non era più contato ma la
sessione era ancora pagabile, quindi un pagamento tardivo poteva atterrare su
un posto già rivenduto. Ora la relazione è scritta come somma, e non può
divergere per una modifica distratta.

I 33 minuti non sono arbitrari: Stripe pretende `expires_at` ad almeno 30
minuti nel futuro, e stare esatti sul minimo fa fallire la creazione della
sessione per latenza o clock skew.

**Una rete di sicurezza che non blocca.**
`checkDepartureCapacity()` gira nel webhook a incasso avvenuto. Non blocca e
non rimborsa — il denaro è già stato preso — ma fa emergere nei log
l'overbooking causato da un numero di posti abbassato in Sanity *dopo* le
prenotazioni. È l'unico scenario che il lock non può prevenire, perché il
totale cambia fuori dal database.

### Cosa vede il cliente

**Non si dichiara mai confermato per il solo fatto di essere atterrati sull'URL.**
Stripe rimanda il browser su `success_url` appena accetta il pagamento, ma lo
stato lo avanza il webhook su una connessione separata: al primo render la
prenotazione è spesso ancora `pending`. La pagina risolve l'esito dallo stato
reale letto da Postgres, e finché la transizione non è avvenuta mostra "stiamo
confermando", con un poll lato client che riprova per una trentina di secondi
e poi si arrende con un messaggio onesto.

**La pagina di esito non interroga Stripe.**
È pubblica e accetta un id di sessione arbitrario in query: interrogare l'API
significherebbe permettere a chiunque di far chiamare Stripe a comando. E lo
stato autorevole è comunque quello che il webhook ha scritto. L'id di sessione
è l'unica credenziale, quindi la pagina mostra il minimo indispensabile —
niente nome, email mascherata, riferimento accorciato.

**`booking/cancelled` non tocca il database.**
Il ritorno del browser non è una prova che la Checkout Session non verrà
pagata: è ancora ripristinabile. La prenotazione `pending` smette da sola di
occupare il posto allo scadere del TTL, senza bisogno di un job di pulizia.

### Il link del saldo

È il pezzo con più decisioni per riga di codice.

**Il link punta al sito, non a Stripe.**
Una Checkout Session scade — 24 ore è il massimo che Stripe concede — ma
un'email no. Puntare il link direttamente a Stripe significa spedire un
pagamento che muore da solo entro il giorno dopo. L'email punta quindi a una
pagina nostra, che non scade, e **la sessione nasce al click**.

Conseguenza economica non banale: il cron non chiama più Stripe affatto, e per
chi non cliccherà mai non viene creata nessuna sessione.

**La credenziale è un token opaco, non l'id della prenotazione.**
L'id è una chiave primaria già mostrata al cliente come riferimento e presente
nell'export CSV. Un identificatore esposto altrove non può valere come
lasciapassare per un pagamento. Il token è generato dal cron nello stesso
`UPDATE` atomico che rivendica la prenotazione: la credenziale nasce insieme
alla dichiarazione «email spedita», non dopo.

**La GET è priva di effetti; la sessione la crea la POST.**
Non è pedanteria sui verbi HTTP: i preview dei client di posta e i filtri
antispam aprono i link da soli, e una GET che crea sessioni di pagamento
verrebbe eseguita da loro. Il form funziona anche senza JavaScript.

**Se esiste già una sessione aperta, si riusa.**
Due sessioni pagabili per lo stesso saldo sono due incassi possibili. Il
webhook fermerebbe solo la seconda *transizione di stato* — ma il denaro
sarebbe già stato preso due volte, e servirebbe un rimborso manuale con un
cliente arrabbiato. Qui interrogare Stripe è lecito, al contrario della pagina
di esito: quella è pubblica, questa si raggiunge solo con un token che abbiamo
generato e spedito noi.

Se la sessione non è più recuperabile (id di un altro account, o creata in
test e riletta in live) se ne crea una nuova invece di lasciare morire il
link. Se risulta già pagata si rimanda alla pagina di esito, che sa aspettare
il webhook.

### Email transazionali

**At-most-once, senza tabella di deduplica.**
L'invio sta nel webhook **dopo** la guardia dell'`UPDATE`: parte solo se la
transizione ha davvero cambiato stato, quindi una riconsegna Stripe (zero
righe) non può spedire un duplicato. L'idempotenza della transizione porta con
sé l'idempotenza dell'email, senza stato aggiuntivo.

**Non lancia mai.**
Rispondere 500 farebbe ritentare Stripe, ma al secondo giro la guardia
bloccherebbe la transizione già applicata e l'email non partirebbe lo stesso:
si otterrebbero solo eventi in errore nel dashboard. Il fallimento resta nei
log ed è uno degli allarmi silenziosi da monitorare.

**Le due email vanno in `Promise.allSettled`:** il fallimento della conferma al
cliente non deve impedire la notifica all'organizzatrice, e viceversa.

**La lingua è persistita sulla prenotazione.** Webhook e cron girano senza
contesto di request e non avrebbero altro modo di sapere in che lingua
scrivere.

### Cron del saldo

Giornaliero, protetto da un segreto in header `Authorization: Bearer`.

L'idempotenza è un **claim atomico**: `UPDATE ... WHERE balance_email_sent_at
IS NULL RETURNING` *prima* dell'invio. Se l'invio fallisce, il flag resta
valorizzato di proposito — mai email duplicate; i fallimenti si recuperano a
mano dai log. È una scelta esplicita fra due rischi asimmetrici: un cliente
che riceve due volte la stessa richiesta di pagamento è peggio di uno che non
la riceve e viene richiamato.

### Sicurezza e accessi

**Due serrature distinte, perché rispondono a due domande diverse.**
L'autenticazione (Clerk) dice *chi sei*. L'autorizzazione (un'allowlist di
email verificate) dice *se puoi*. La seconda non è ridondante: un'istanza
Clerk accetta iscrizioni per impostazione predefinita, quindi senza allowlist
chiunque riesca a registrarsi vedrebbe l'anagrafica dei clienti.

**Contano solo le email che il provider riporta come verificate.** Un'email non
verificata è un'affermazione dell'utente, non un fatto.

**Il guard sta nel data layer, non nel layout.**
`requireAdmin()` è chiamata da *ogni* funzione che legge dati riservati. In
App Router un layout non è una barriera per le pagine che contiene — si
renderizzano in parallelo — e affidarsi al solo middleware è la classe di
errore del bypass CVE-2025-29927. Così le funzioni che leggono le prenotazioni
non sono chiamabili senza passare dal controllo, nemmeno aggiungendo una
pagina nuova domani.

Lo stesso vale per le Server Action: sono a tutti gli effetti endpoint POST
pubblici, invocabili da chi ne conosce l'identificativo senza mai aprire la
pagina che le espone.

**404, non 403.** A chi non è autorizzato l'area riservata non risulta nemmeno
esistere.

**Allowlist vuota = area chiusa a tutti (fail-closed).** All'opposto del rate
limit, che è fail-open: lì il rischio era bloccare clienti veri per un guasto
dell'infrastruttura di contorno, qui è aprire dati personali. Rischi
asimmetrici, difese asimmetriche.

**Clerk è invocato solo sulle route dell'area riservata**, non avvolge il sito.
Non è un'ottimizzazione: quel middleware lancia su ogni richiesta che gestisce
se le chiavi mancano o sono sbagliate, quindi avvolgendoci tutto il sito una
chiave errata farebbe cadere anche blog, avventure e checkout — il sito
smetterebbe di incassare per proteggere una pagina che usa una persona sola.
Confinato, un guasto rende inaccessibile solo l'area riservata.

### Gradi di guasto

Un tema ricorrente: **"non lo so" non va mai reso come un fatto.**

| Situazione | Comportamento |
|---|---|
| Database non raggiungibile | Il contatore dei posti sparisce, le pagine restano navigabili. Mai "zero posti" |
| CMS non configurato | Sito navigabile a catalogo vuoto, nessuna chiamata di rete tentata |
| CMS configurato ma irraggiungibile | Errore esplicito con retry, **non** 404 |
| Rate limiter non risponde | Si passa comunque (fail-open) |
| Servizio email giù | Il pagamento va a buon fine, il fallimento resta nei log |
| Chiavi auth mancanti | Cade solo l'area riservata |

Il caso del CMS merita una nota, perché era un bug. Il fetch catturava
qualunque errore e restituiva un fallback vuoto, quindi la funzione tornava
`null` sia per "questa avventura non esiste" sia per "il CMS non risponde": la
pagina non poteva distinguerli e rispondeva 404 a entrambi. **Un 404 dice ai
motori di ricerca «deindicizza»**, quindi mezz'ora di guasto poteva far
sparire il catalogo dai risultati di ricerca.

La correzione non è stata togliere il fallback, ma **restringerlo alla sola
situazione per cui era stato scritto**: assenza di configurazione, che si
riconosce *prima* della chiamata invece di interpretarne il fallimento dopo.
Un `try/catch` non poteva distinguere i due casi, perché l'informazione che li
separa non è nell'eccezione.

Effetto collaterale più prezioso della correzione stessa: senza configurazione
non si tenta più nessuna query, quindi i log della CI sono puliti e il prefisso
`[sanity]` è passato da rumore atteso a segnale. *Un errore che la
documentazione ti dice di ignorare è un errore che nessuno leggerà mai.*

### Internazionalizzazione

- Testi dell'interfaccia sempre via next-intl, mai stringhe in linea.
- Contenuti dal CMS via un selettore con fallback sull'italiano.
- Gli errori dell'API di checkout viaggiano come **codice**, non come
  messaggio: la stringa in chiaro resta nella risposta per i log, ma
  l'interfaccia traduce il codice.
- L'area riservata vive **fuori** dal segmento di lingua, con una root layout
  propria: serve a una persona sola, in italiano, e localizzarla sarebbe
  lavoro su ogni riga di interfaccia senza un lettore.

---

## Deviazioni dallo schema iniziale

Ogni colonna aggiunta dopo il primo disegno, e perché.

| Aggiunta | Motivo |
|---|---|
| `departureDate` denormalizzata | Permette al cron una sola query SQL, senza interrogare il CMS a ogni giro |
| `locale` | Webhook e cron girano fuori dal contesto di request: la lingua va persistita o è persa |
| `balanceAccessToken` | Credenziale del link del saldo, generata dal cron |
| `stripeDepositPaymentIntentId` / `stripeBalancePaymentIntentId` | Due incassi, due rimborsi separati |
| Tabella `departure_locks` | Serve una riga fisica su cui fare `FOR UPDATE`; tiene anche lo snapshot dei posti totali |

**Prezzi in euro nel CMS, non in centesimi** (es. `349.50`): più chiaro per chi
li scrive. La conversione avviene in un punto solo, alla creazione della
sessione di pagamento.

---

## Test e verifica automatica

`vitest`, 61 casi, **nessun database e nessuna chiave**. Si prova la **logica
di dominio**: le decisioni che costano denaro se sbagliate — transizioni
ammesse per fase, esito mostrato al cliente, stato del link del saldo,
aritmetica di acconto e saldo, invariante sui TTL, chi può entrare
nell'area riservata.

**Una conseguenza architetturale.** Le tabelle delle transizioni stavano dentro
il route handler del webhook, e la logica dell'esito dentro la pagina di
successo: da lì nessun test poteva raggiungerle, perché quei file possono
esportare solo i loro metodi HTTP o il componente. Sono state estratte in un
modulo accanto.

Da qui una regola del progetto: **le regole di dominio stanno fuori dai route
handler e dalle pagine.** Non per purezza — perché lì dentro non sono
verificabili. Uno dei bug trovati in seguito era esattamente in una regola
rimasta inline in una pagina, mentre la sua gemella nel modulo era coperta da
test e corretta.

Alcuni test verificano **invarianti**, non esempi. Uno rompe se domani si
aggiunge uno stato al database senza decidere se occupa un posto — caso in cui
quel posto diventerebbe irrecuperabile.

**Fuori portata senza infrastruttura,** e onestamente dichiarato: concorrenza
della creazione di prenotazioni, guardie del webhook come `WHERE` SQL (si prova
la tabella delle transizioni, non l'`UPDATE`), idempotenza del cron.

**CI su GitHub Actions:** `tsc`, `eslint`, i test e il build, in quest'ordine —
dal più veloce al più lento. Il build è nella lista perché è l'unico passo che
esercita il router: il type checker non vede una route con export non validi né
una pagina che non prerenderizza. Gira **senza variabili d'ambiente di
proposito**, che è la configurazione in cui il sito deve restare navigabile sui
fallback.

---

## Il test end-to-end, e cosa ha trovato

Tutto quanto sopra era scritto, tipizzato, testato e con la CI verde. Poi il
giro del denaro è stato percorso davvero, contro servizi reali: database,
CMS, Stripe in modalità test, servizio email. Entrambi i tipi di prodotto,
dal click «Prenota» fino a `paid_in_full`, più cron, link del saldo, area
riservata ed export.

Ha trovato tre difetti in mezz'ora. Tutti e tre **invisibili a `tsc`, a
`eslint` e ai test**, per la stessa ragione strutturale: vivevano nel punto in
cui il codice incontra un servizio esterno o un occhio umano.

**1. Nessuna email transazionale poteva partire.**
Il pacchetto di rendering è una peer dependency *opzionale* dell'SDK email,
quindi non veniva installato; la copia annidata sotto un altro pacchetto non
era risolvibile. Il guasto era silenzioso **per progetto**: l'invio è
fail-soft, quindi il pagamento andava a buon fine e l'unica traccia era una
riga di log. E poiché l'invio è at-most-once, ogni email persa era persa per
sempre.

**2. La pagina del saldo mentiva sull'importo versato.**
A saldo incassato mostrava l'acconto sotto il titolo «pagata per intero»:
diceva a un cliente che aveva versato 6,75 € su 67,50 € quando aveva già
pagato tutto. La riga accanto, «saldo dovuto», era correttamente condizionata
allo stato; questa no.

**3. Un guasto del CMS diventava un 404** (descritto sopra).

La lezione non è "i test non servono". È che **i test provano le decisioni, non
il giro del denaro** — e che il confine fra il proprio codice e i servizi
esterni è dove si accumulano i difetti che nessun controllo statico può vedere.

Vale anche il rovescio: la verifica che conta non è il codice HTTP. La pagina
rispondeva 200 sia connessa e vuota sia non configurata; a distinguerle era la
sparizione di una riga di log. E un'email accettata dall'API con `200` non è
un'email consegnata — sono due affermazioni diverse, la stessa distinzione che
regge tutta la pagina di esito del checkout.

---

## Stato attuale

**Funzionante e provato:** i18n, schema e migration, schemi CMS e Studio, route
pubbliche, anti-overbooking, checkout per entrambe le fasi, verifica firma
webhook, cron idempotente, email di conferma e notifica, form di prenotazione
completo, pagine di esito, 404 e boundary d'errore localizzati, area riservata
con elenco ed export CSV, annullamento di una prenotazione, link del saldo che
non scade, PaymentIntent salvati per fase, test di dominio, CI.

**Consapevolmente incompleto:**

- Manca l'accettazione dei termini nel form: la casella ha senso solo quando
  esistono le pagine legali da linkare.
- L'area riservata non ha ancora il dettaglio per singola prenotazione né i
  promemoria pre-partenza.
- Il pulsante di rimborso è **bloccato da una decisione, non da codice**:
  tecnicamente è pronto — i PaymentIntent sono salvati ed esposti — ma manca
  l'unica cosa che deve sapere, cioè *quanto* rimborsare, che è la politica di
  cancellazione e spetta alla cliente.

---

## Prossimi passi

1. **Passaggio degli account alla cliente.** Il servizio di pagamento
   soprattutto: chi ha l'account è chi incassa, e quindi chi è responsabile
   davanti ai clienti e al fisco. Finché resta intestato allo sviluppatore, il
   deploy non ha senso. Lo sviluppatore va invitato come membro del team, non
   come titolare.
2. **Pagine legali** in entrambe le lingue — privacy, termini, politica di
   cancellazione. Sbloccano sia la casella di accettazione nel form sia il
   pulsante di rimborso.
3. **Test che richiedono infrastruttura**: concorrenza, guardie SQL,
   idempotenza del cron. Si scrivono solo contro un Postgres vero.
4. **Deploy**, con database di produzione **separato** da quello di sviluppo, e
   protezione anti-bot sul form — che il rate limit per IP non copre, perché
   non ferma un attaccante distribuito.
5. **SEO**: metadata sulle pagine dinamiche, tag Open Graph, sitemap
   localizzata, immagini ottimizzate.

---

## Vincoli che il progetto si è dato

- **Mai chiavi di produzione in sviluppo.**
- **Nessuna risorsa cloud creata dalla codebase senza richiesta esplicita.**
  Vale anche per le comodità dei framework: la modalità "senza chiavi" del
  provider di autenticazione, che in sviluppo crea da sé un'istanza vera via
  rete, è disattivata di proposito.
- **Un commit conventional per passo.**
- **Migration generate e applicate, mai push diretto dello schema.**
- **Client esterni con inizializzazione lazy**: le variabili d'ambiente non
  esistono al momento del build.
- **Commenti in italiano dove spiegano decisioni non ovvie.** I commenti non
  dicono cosa fa il codice — quello si legge — ma perché è stato scelto quel
  modo, e cosa succederebbe altrimenti.

---

## Cosa mi porto a casa

**I rischi asimmetrici vanno trattati in modo asimmetrico.** Il rate limit è
fail-open perché bloccare clienti veri per un guasto dell'infrastruttura di
contorno è peggio del rischio coperto. L'area riservata è fail-closed perché lì
il rischio è aprire dati personali. La stessa domanda — "cosa faccio se non
lo so?" — ha risposte opposte, e sceglierne una sola per coerenza estetica
sarebbe un errore.

**L'idempotenza si ottiene meglio come proprietà che come meccanismo.** Non c'è
nessuna tabella di deduplica delle email: l'invio sta dopo una transizione già
idempotente, e ne eredita la proprietà. Un vincolo nella `WHERE` costa una
riga e sostituisce un pezzo di infrastruttura.

**Dove sta il codice determina cosa si può verificare.** Una regola dentro una
pagina non è raggiungibile da un test, e infatti è lì che si era annidato un
bug mentre la sua gemella nel modulo era corretta. L'architettura e la
testabilità non sono preoccupazioni separate.

**Un fail-soft ben progettato nasconde i propri guasti.** È il prezzo che paga
per non rompere il flusso principale, ed è giusto pagarlo — ma va saputo, e
compensato con log che qualcuno legge davvero. Un errore atteso è un errore
invisibile.

**Il confine con i servizi esterni è dove si accumulano i difetti.** Non nella
logica: quella si tipizza e si prova. Nelle risoluzioni di moduli a runtime,
nelle credenziali che non corrispondono, nei formati che cambiano, negli stati
che due sistemi rappresentano in modo diverso. È l'unica parte che va provata
attraversandola.

**Distinguere sempre "non lo so" da un fatto.** È lo stesso errore in tre
forme diverse: rendere "database non raggiungibile" come «zero posti»,
rendere "CMS giù" come «pagina inesistente», rendere "sei atterrato
sull'URL di successo" come «pagamento confermato». Ogni volta, la correzione
è la stessa: propagare l'incertezza invece di collassarla in un valore che
sembra un'informazione.
