import React, { useState } from 'react'
import {
  C, Stack, Row, Grid, Divider, Spacer,
  H2, H3, Text, Label, Pill, Button, Stat,
  Card, CardHeader, CardBody, DataTable,
  Field, Input, Sel, Toggle, CheckBox,
  Alert, Timeline, Avatar, ProductCard, SectionLabel, UploadZone,
} from './ui.jsx'
import {
  ScreenEnrollmentOverview,
  ScreenEnrollmentData,
  ScreenEnrollmentSignatures,
  ScreenEnrollmentSignContract,
  ScreenEnrollmentSignPending,
  ScreenEnrollmentPayment,
  ScreenEnrollmentDocuments,
  ScreenEnrollmentDetail,
  ScreenEnrollmentConfirmation,
} from './enrollment.jsx'

const SCREEN_LABELS = {
  signup: 'Login / Registrazione',
  verify: 'Verifica Email',
  recovery: 'Storico Trovato',
  'recovery-empty': 'Nessuno Storico',
  profile: 'Completa Profilo',
  'add-child': 'Collega figlio – Scelta metodo',
  dashboard: 'Dashboard',
  'child-detail': 'Dettaglio Figlio',
  payments: 'Lista Pagamenti',
  orders: 'Lista Ordini',
  enrollment: 'Entry point iscrizione',
  'guest-success': 'Guest → Crea Account',
  'enrollment-overview': 'Panoramica pratica',
  'enrollment-data': 'Dati anagrafici',
  'enrollment-signatures': 'Firme',
  'enrollment-sign-contract': 'Firma contratto',
  'enrollment-sign-pending': 'Stato firme',
  'enrollment-payment': 'Pagamento',
  'enrollment-documents': 'Documenti',
  'enrollment-detail': 'Le mie iscrizioni',
  'enrollment-confirmation': 'Conferma',
  promotions: 'Offerte & Store',
  'add-child-invite': 'Collega figlio – Via invito scuola',
  'add-child-verify': 'Collega figlio – Verifica CF (statale)',
  account: 'Profilo e sicurezza',
  documents: 'Documenti',
}

const AUTH_FLOW = ['signup', 'verify', 'recovery', 'recovery-empty', 'profile', 'add-child', 'add-child-invite', 'add-child-verify']
const APP_SCREENS = ['dashboard', 'child-detail', 'payments', 'orders', 'enrollment-detail', 'promotions', 'account', 'documents']
const ENROLL_FLOW = ['enrollment-overview', 'enrollment-data', 'enrollment-signatures', 'enrollment-sign-contract', 'enrollment-sign-pending', 'enrollment-payment', 'enrollment-documents', 'enrollment-confirmation']

const CHILDREN_DATA = [
  { name: 'Marco',  surname: 'Rossi',   school: 'Sc. Primaria G. Verdi',      cls: '4ª A',    age: 8,  color: '#3b82f6', enrollStatus: 'In attesa firme', enrollYear: '2025/2026' },
  { name: 'Sofia',  surname: 'Rossi',   school: 'Sc. Infanzia Arcobaleno',    cls: 'Sez. B',  age: 5,  color: '#e879a8', enrollStatus: 'Confermata',       enrollYear: '2025/2026' },
  { name: 'Giulia', surname: 'Bianchi', school: 'Sc. Media L. da Vinci',      cls: '1ª B',    age: 12, color: '#8b5cf6', enrollStatus: 'Bozza',            enrollYear: '2025/2026' },
]

const CHILD_COLOR = { Marco: '#3b82f6', Sofia: '#e879a8', Giulia: '#8b5cf6' }

const PAYMENTS_DATA = [
  { id: 'p1', date: '15 apr 2025', desc: 'Mensa scolastica – Aprile',       child: 'Marco',  amount: '€ 78,00',  status: 'Completato' },
  { id: 'p2', date: '10 apr 2025', desc: 'Gita scolastica – Firenze',       child: 'Marco',  amount: '€ 25,00',  status: 'Completato' },
  { id: 'p3', date: '01 apr 2025', desc: 'Materiale didattico Sez. B',      child: 'Sofia',  amount: '€ 45,50',  status: 'Completato' },
  { id: 'p4', date: '15 mar 2025', desc: 'Mensa scolastica – Marzo',        child: 'Marco',  amount: '€ 78,00',  status: 'Completato' },
  { id: 'p5', date: '05 mar 2025', desc: 'Contributo volontario',           child: 'Sofia',  amount: '€ 30,00',  status: 'In attesa' },
  { id: 'p6', date: '12 feb 2025', desc: 'Laboratorio di musica',           child: 'Marco',  amount: '€ 60,00',  status: 'Completato' },
  { id: 'p7', date: '28 mar 2025', desc: 'Libri di testo 1ª media',         child: 'Giulia', amount: '€ 145,00', status: 'Completato' },
  { id: 'p8', date: '10 mar 2025', desc: 'Contributo iscrizione',           child: 'Giulia', amount: '€ 180,00', status: 'Completato' },
  { id: 'p9', date: '02 apr 2025', desc: 'Attività extrascolastica – Teatro', child: 'Giulia', amount: '€ 55,00', status: 'In attesa' },
]

const ORDERS_DATA = [
  { num: '#2847', date: '12 apr 2025', items: 'Kit materiale 4ª A (×1)',    child: 'Marco',  total: '€ 42,90', status: 'Consegnato' },
  { num: '#2844', date: '10 apr 2025', items: 'Felpa scuola G. Verdi (×1)', child: 'Marco',  total: '€ 28,00', status: 'In elaborazione' },
  { num: '#2839', date: '05 apr 2025', items: 'Set colori Sez. B (×1)',     child: 'Sofia',  total: '€ 14,90', status: 'Consegnato' },
  { num: '#2821', date: '28 mar 2025', items: 'Zaino media (×1)',           child: 'Giulia', total: '€ 59,90', status: 'Consegnato' },
  { num: '#2651', date: '02 feb 2025', items: 'Felpa scuola (×2)',          child: 'Marco',  total: '€ 58,00', status: 'Consegnato' },
  { num: '#2589', date: '15 gen 2025', items: 'Diario scolastico (×1)',     child: 'Marco',  total: '€ 14,50', status: 'Consegnato' },
]

const SIDEBAR_ITEMS = [
  { id: 'dashboard',       label: 'Home' },
  { id: 'child-detail',    label: 'I miei figli' },
  { id: 'enrollment-detail', label: 'Iscrizioni' },
  { id: 'payments',        label: 'Pagamenti' },
  { id: 'orders',          label: 'Ordini' },
  { id: 'promotions',      label: 'Offerte & Store' },
  { id: 'documents',       label: 'Documenti' },
  { id: 'account',         label: 'Profilo e sicurezza' },
]

function statusTone(s) {
  if (s === 'Completato' || s === 'Consegnato') return 'success'
  if (s === 'In attesa') return 'warning'
  if (s === 'Fallito' || s === 'Annullato') return 'danger'
  return 'neutral'
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function ScreenSignup({ goTo }) {
  const [tab, setTab] = useState('signup')
  const [terms, setTerms] = useState(false)
  return (
    <Grid columns="1fr 1fr" gap={48} style={{ alignItems: 'start' }}>
      <Stack gap={24}>
        <Stack gap={6}>
          <H2>Il tuo account ScuolaPay</H2>
          <Text tone="secondary">Ritrova pagamenti, ordini, ricevute e attività scolastiche in un solo posto.</Text>
        </Stack>
        <Row gap={6}>
          <Pill active={tab === 'signup'} onClick={() => setTab('signup')}>Crea account</Pill>
          <Pill active={tab === 'login'} onClick={() => setTab('login')}>Accedi</Pill>
        </Row>
        {tab === 'signup' ? (
          <Stack gap={12}>
            <Grid columns={2} gap={10}>
              <Field label="Nome"><Input placeholder="Maria" value="" /></Field>
              <Field label="Cognome"><Input placeholder="Rossi" value="" /></Field>
            </Grid>
            <Field label="Email"><Input placeholder="nome@email.it" type="email" value="" /></Field>
            <Field label="Password"><Input placeholder="Almeno 8 caratteri" type="password" value="" /></Field>
            <CheckBox checked={terms} onChange={setTerms} label="Accetto i Termini di servizio e la Privacy Policy" />
            <Button variant="primary" onClick={() => goTo('verify')}>Crea account</Button>
            <Text tone="tertiary" size="small" style={{ textAlign: 'center' }}>
              Hai già un account?{' '}
              <span style={{ color: C.accent, cursor: 'pointer', fontWeight: 500 }} onClick={() => setTab('login')}>Accedi</span>
            </Text>
          </Stack>
        ) : (
          <Stack gap={12}>
            <Field label="Email"><Input placeholder="nome@email.it" type="email" value="" /></Field>
            <Field label="Password"><Input placeholder="La tua password" type="password" value="" /></Field>
            <Button variant="primary">Accedi</Button>
            <Text tone="tertiary" size="small" style={{ textAlign: 'center' }}>
              <span style={{ color: C.accent, cursor: 'pointer', fontWeight: 500 }}>Password dimenticata?</span>
            </Text>
            <Divider />
            <Button variant="secondary">Accedi con magic link</Button>
          </Stack>
        )}
      </Stack>
      <Stack gap={16} style={{ paddingTop: 60 }}>
        <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>PERCHÉ CREARE UN ACCOUNT</Text>
        <Stack gap={16}>
          {[
            { title: 'Recupera il tuo storico', desc: 'Colleghi automaticamente ordini, pagamenti e ricevute già associati alla tua email.' },
            { title: 'Gestisci i tuoi figli', desc: "Un'area unica per ogni figlio: scuola, pagamenti, ordini e documenti." },
            { title: 'Checkout veloce', desc: 'I dati sono già salvati. Paghi in pochi secondi la prossima volta.' },
            { title: 'Notifiche e scadenze', desc: 'Ricevi avvisi su pagamenti in scadenza, iscrizioni e comunicazioni.' },
          ].map(b => (
            <Stack gap={3} key={b.title}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>{b.title}</Text>
              <Text tone="secondary" size="small">{b.desc}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Grid>
  )
}

function ScreenVerify({ goTo }) {
  const [code, setCode] = useState(['3', '', '', '', '', ''])
  return (
    <Stack gap={24} style={{ maxWidth: 440 }}>
      <Stack gap={8}>
        <H2>Conferma la tua email</H2>
        <Text tone="secondary">
          Abbiamo inviato un codice di verifica a{' '}
          <span style={{ color: C.text, fontWeight: 600 }}>maria.rossi@email.it</span>
        </Text>
        <Text tone="tertiary" size="small">
          Se hai già usato ScuolaPay in passato, recupereremo automaticamente le attività associate a questa email.
        </Text>
      </Stack>
      <Stack gap={8}>
        <Label>Codice a 6 cifre</Label>
        <Row gap={8}>
          {code.map((v, i) => (
            <div key={i} style={{
              width: 46, height: 54, borderRadius: 8, flexShrink: 0,
              border: `2px solid ${i === 0 ? C.accent : C.border}`,
              background: C.bgElevated,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700, color: C.text,
            }}>
              {v}
            </div>
          ))}
        </Row>
      </Stack>
      <Stack gap={8}>
        <Button variant="primary" onClick={() => goTo('recovery')}>Verifica email</Button>
        <Button variant="ghost" onClick={() => goTo('recovery')}>Usa magic link invece</Button>
      </Stack>
      <Text tone="tertiary" size="small">
        Non hai ricevuto il codice?{' '}
        <span style={{ color: C.accent, fontWeight: 500, cursor: 'pointer' }}>Rimanda tra 54 secondi</span>
      </Text>
    </Stack>
  )
}

function ScreenRecovery({ goTo }) {
  return (
    <Stack gap={28} style={{ maxWidth: 600 }}>
      <Stack gap={8}>
        <div><Pill tone="success" active>Email verificata</Pill></div>
        <H2>Abbiamo trovato la tua attività</H2>
        <Text tone="secondary">
          L'email <span style={{ color: C.text, fontWeight: 600 }}>maria.rossi@email.it</span> è
          associata ad attività pregresse su ScuolaPay. Puoi collegarle tutte al tuo nuovo account.
        </Text>
      </Stack>
      <Grid columns={4} gap={12}>
        <Stat value="4" label="Ordini" tone="info" />
        <Stat value="7" label="Pagamenti" tone="success" />
        <Stat value="3" label="Ricevute" />
        <Stat value="1" label="Iscrizione" tone="warning" />
      </Grid>
      <Stack gap={8}>
        <H3>Anteprima attività trovate</H3>
        <DataTable
          headers={['Data', 'Tipo', 'Descrizione', 'Importo']}
          rows={[
            ['15 apr 2025', 'Pagamento', 'Mensa scolastica – Aprile', '€ 78,00'],
            ['10 apr 2025', 'Pagamento', 'Gita scolastica – Firenze', '€ 25,00'],
            ['12 feb 2025', 'Ordine', 'Kit materiale scolastico', '€ 42,90'],
            ['10 set 2024', 'Ordine', 'Zaino scuola elementare', '€ 75,00'],
          ]}
        />
      </Stack>
      <Stack gap={8}>
        <Button variant="primary" onClick={() => goTo('profile')}>Collega tutto al mio account</Button>
        <Text tone="tertiary" size="small" style={{ textAlign: 'center' }}>
          Il collegamento avviene solo su email verificata. Puoi rivedere ogni voce dall'account.
        </Text>
      </Stack>
    </Stack>
  )
}

function ScreenRecoveryEmpty({ goTo }) {
  return (
    <Stack gap={28} style={{ maxWidth: 440 }}>
      <Stack gap={8}>
        <div><Pill tone="success" active>Email verificata</Pill></div>
        <H2>Il tuo account è pronto</H2>
        <Text tone="secondary">
          Non abbiamo trovato attività precedenti per{' '}
          <span style={{ color: C.text, fontWeight: 600 }}>maria.rossi@email.it</span>.
          Da ora troverai qui pagamenti, ordini e documenti.
        </Text>
      </Stack>
      <Stack gap={12}>
        <H3>Cosa puoi fare adesso</H3>
        {[
          { n: '1', title: 'Completa il profilo', desc: 'Aggiungi nome, cognome e telefono.' },
          { n: '2', title: 'Collega i tuoi figli', desc: 'Un profilo per ogni figlio: pagamenti, ordini e documenti separati.' },
          { n: '3', title: 'Aggiungi email secondarie', desc: "Hai usato ScuolaPay con un'altra email? Recupera anche quello storico." },
        ].map(item => (
          <Row gap={12} style={{ alignItems: 'flex-start' }} key={item.n}>
            <div style={{
              width: 24, height: 24, minWidth: 24, borderRadius: 12,
              background: C.fill, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: C.textSec,
            }}>{item.n}</div>
            <Stack gap={2}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>{item.title}</Text>
              <Text tone="secondary" size="small">{item.desc}</Text>
            </Stack>
          </Row>
        ))}
      </Stack>
      <Button variant="primary" onClick={() => goTo('profile')}>Completa il profilo</Button>
    </Stack>
  )
}

function ScreenProfile({ goTo }) {
  return (
    <Stack gap={24} style={{ maxWidth: 480 }}>
      <Stack gap={6}>
        <Row gap={10} style={{ alignItems: 'center' }}>
          <H2>Completa il profilo</H2>
          <Pill tone="info" active size="sm">Passo 3 di 3</Pill>
        </Row>
        <Text tone="secondary">Questi dati ci servono per identificarti nelle comunicazioni e nei documenti.</Text>
      </Stack>
      <Stack gap={12}>
        <Grid columns={2} gap={10}>
          <Field label="Nome"><Input placeholder="Maria" value="Maria" /></Field>
          <Field label="Cognome"><Input placeholder="Rossi" value="" /></Field>
        </Grid>
        <Stack gap={6}>
          <Field label="Email"><Input placeholder="" value="maria.rossi@email.it" disabled /></Field>
          <Row gap={6}>
            <Pill tone="success" active size="sm">Verificata</Pill>
            <Text tone="tertiary" size="small">Email confermata con OTP</Text>
          </Row>
        </Stack>
        <Field label="Telefono (opzionale)"><Input placeholder="+39 333 0000000" value="" /></Field>
      </Stack>
      <Stack gap={8}>
        <Button variant="primary" onClick={() => goTo('add-child')}>Salva e continua</Button>
        <Button variant="ghost" onClick={() => goTo('dashboard')}>Salta per ora</Button>
      </Stack>
    </Stack>
  )
}

function ScreenAddChild({ goTo }) {
  return (
    <Stack gap={28} style={{ maxWidth: 560 }}>
      <Stack gap={6}>
        <H2>Collega un figlio</H2>
        <Text tone="secondary">
          Per tutelare la privacy dei minori, il collegamento è possibile solo tramite verifica.
          Scegli il metodo in base al tipo di scuola.
        </Text>
      </Stack>

      {/* Method 1 – Invite link */}
      <div
        onClick={() => goTo('add-child-invite')}
        style={{
          padding: '20px 22px', borderRadius: 12, cursor: 'pointer',
          border: `1.5px solid ${C.accent}55`,
          background: C.accentFill,
          transition: 'border-color 0.15s',
        }}
      >
        <Stack gap={10}>
          <Row gap={10} style={{ justifyContent: 'space-between' }}>
            <Stack gap={4}>
              <Row gap={8}>
                <span style={{ fontSize: 18 }}>🔗</span>
                <Text style={{ fontWeight: 700, fontSize: 15, color: C.accent }}>
                  Scuola paritaria o privata
                </Text>
              </Row>
              <Text tone="secondary" size="small">
                La scuola ti ha inviato un link o un codice invito via email.
                Il figlio viene collegato automaticamente con i dati già presenti nel sistema ScuolaPay.
              </Text>
            </Stack>
            <Pill tone="info" active>Consigliato</Pill>
          </Row>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            <Pill size="sm" tone="success" active>Dati verificati dalla scuola</Pill>
            <Pill size="sm" tone="success" active>Nessun inserimento manuale</Pill>
            <Pill size="sm" tone="success" active>Pronto in 30 secondi</Pill>
          </Row>
          <Text size="small" tone="tertiary">
            La scuola genera il link dalla propria dashboard ScuolaPay e lo invia alle famiglie.
          </Text>
        </Stack>
      </div>

      {/* Method 2 – Manual CF */}
      <div
        onClick={() => goTo('add-child-verify')}
        style={{
          padding: '20px 22px', borderRadius: 12, cursor: 'pointer',
          border: `1.5px solid ${C.border}`,
          background: C.bgRaised,
          transition: 'border-color 0.15s',
        }}
      >
        <Stack gap={10}>
          <Stack gap={4}>
            <Row gap={8}>
              <span style={{ fontSize: 18 }}>🏛️</span>
              <Text style={{ fontWeight: 700, fontSize: 15 }}>
                Scuola statale
              </Text>
            </Row>
            <Text tone="secondary" size="small">
              ScuolaPay non gestisce direttamente i dati delle scuole statali.
              Puoi collegare il figlio inserendo il codice fiscale e la data di nascita:
              i dati sono sotto la tua responsabilità.
            </Text>
          </Stack>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            <Pill size="sm" tone="warning" active>Dati auto-dichiarati</Pill>
            <Pill size="sm">Nessuna verifica con la scuola</Pill>
          </Row>
          <Text size="small" tone="tertiary">
            Potrai comunque ricevere notifiche, gestire documenti e accedere allo store ScuolaPay.
            Le funzioni legate alla segreteria non saranno disponibili.
          </Text>
        </Stack>
      </div>

      <Button variant="ghost" onClick={() => goTo('dashboard')}>Annulla</Button>
    </Stack>
  )
}

function ScreenAddChildInvite({ goTo }) {
  const [code, setCode] = useState('')
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    if (code.length >= 6) setVerified(true)
  }

  return (
    <Stack gap={24} style={{ maxWidth: 480 }}>
      <Stack gap={6}>
        <Row gap={8} style={{ alignItems: 'center' }}>
          <Button variant="ghost" onClick={() => goTo('add-child')}>← Indietro</Button>
        </Row>
        <H2>Collegamento tramite invito scuola</H2>
        <Text tone="secondary">
          Inserisci il codice o incolla il link che hai ricevuto dalla segreteria.
        </Text>
      </Stack>

      {!verified ? (
        <Stack gap={16}>
          <Alert
            type="info"
            title="Dove trovo il codice?"
            description="La segreteria lo invia via email all'indirizzo registrato. Puoi anche chiedere direttamente allo sportello."
          />
          <Field label="Codice invito o link completo">
            <Input
              placeholder="es. SCPX-A3K9-2025 oppure https://scuolapay.it/invite/..."
              value={code}
              onChange={setCode}
            />
          </Field>
          <Text size="small" tone="tertiary">
            Il codice è valido per 7 giorni dall'invio. Ogni codice può essere usato una sola volta
            e identifica un unico nucleo familiare.
          </Text>
          <Button variant="primary" disabled={code.length < 6} onClick={handleVerify}>
            Verifica codice
          </Button>
        </Stack>
      ) : (
        <Stack gap={16}>
          <Alert type="success" title="Codice valido — figlio identificato" description="I dati seguenti provengono direttamente dal sistema ScuolaPay della scuola." />

          <Card accent={C.success}>
            <CardHeader trailing={<Pill size="sm" tone="success" active>Verificato dalla scuola</Pill>}>
              Dati figlio rilevati
            </CardHeader>
            <CardBody>
              <Stack gap={10}>
                <Grid columns={2} gap={12}>
                  <Stack gap={3}>
                    <Label>Nome</Label>
                    <Text style={{ fontWeight: 600 }}>Luca</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Label>Cognome</Label>
                    <Text style={{ fontWeight: 600 }}>Rossi</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Label>Scuola</Label>
                    <Text style={{ fontWeight: 600 }}>Sc. Primaria G. Verdi</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Label>Classe</Label>
                    <Text style={{ fontWeight: 600 }}>2ª B</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Label>Anno scolastico</Label>
                    <Text style={{ fontWeight: 600 }}>2025/2026</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Label>Ruolo genitore</Label>
                    <Text style={{ fontWeight: 600 }}>Madre</Text>
                  </Stack>
                </Grid>
                <Divider />
                <Text size="small" tone="tertiary">
                  Non puoi modificare questi dati: sono gestiti dalla segreteria scolastica.
                  Se c'è un errore, contatta la scuola.
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Stack gap={8}>
            <CheckBox checked={true} onChange={() => {}} label="Confermo di essere il genitore/tutore legale di questo figlio e di avere il diritto di gestire i suoi dati scolastici." />
          </Stack>
          <Row gap={10}>
            <Button variant="primary" onClick={() => goTo('dashboard')}>Collega figlio al mio account</Button>
            <Button variant="ghost" onClick={() => { setVerified(false); setCode('') }}>Annulla</Button>
          </Row>
        </Stack>
      )}
    </Stack>
  )
}

function ScreenAddChildVerify({ goTo }) {
  const [step, setStep] = useState(1)
  const [cf, setCf] = useState('')
  const [dob, setDob] = useState('')
  const [relation, setRelation] = useState('madre')
  const [school, setSchool] = useState('')
  const [cls, setCls] = useState('')

  return (
    <Stack gap={24} style={{ maxWidth: 480 }}>
      <Stack gap={6}>
        <Row gap={8}>
          <Button variant="ghost" onClick={() => step === 1 ? goTo('add-child') : setStep(1)}>← Indietro</Button>
        </Row>
        <H2>Collega figlio — Scuola statale</H2>
        <Text tone="secondary">
          Inserisci i dati del figlio. Verranno associati al tuo account senza verifica esterna.
        </Text>
      </Stack>

      <Alert
        type="warning"
        title="Dati auto-dichiarati"
        description="Per le scuole statali non effettuiamo verifiche con la segreteria. Sei responsabile dell'accuratezza dei dati inseriti e dell'autorizzazione a trattarli."
      />

      {step === 1 && (
        <Stack gap={16}>
          <Stack gap={4}>
            <SectionLabel>PASSO 1 DI 2 — VERIFICA IDENTITÀ FIGLIO</SectionLabel>
            <Text size="small" tone="tertiary">
              Usiamo codice fiscale e data di nascita per costruire un identificativo univoco locale.
              Questi dati non vengono condivisi con la scuola.
            </Text>
          </Stack>
          <Field label="Codice fiscale del figlio">
            <Input
              placeholder="es. RSSMRC16A01H501P"
              value={cf}
              onChange={v => setCf(v.toUpperCase())}
            />
          </Field>
          <Field label="Data di nascita del figlio">
            <Input placeholder="gg/mm/aaaa" type="text" value={dob} onChange={setDob} />
          </Field>
          <Field label="La tua relazione con il figlio">
            <Sel value={relation} onChange={setRelation} options={[
              { value: 'madre', label: 'Madre' },
              { value: 'padre', label: 'Padre' },
              { value: 'tutore', label: 'Tutore legale' },
              { value: 'altro', label: 'Altro (specificare)' },
            ]} />
          </Field>
          <Button
            variant="primary"
            disabled={cf.length < 16 || dob.length < 8}
            onClick={() => setStep(2)}
          >
            Continua →
          </Button>
        </Stack>
      )}

      {step === 2 && (
        <Stack gap={16}>
          <Stack gap={4}>
            <SectionLabel>PASSO 2 DI 2 — DATI SCOLASTICI</SectionLabel>
            <Text size="small" tone="tertiary">
              Questi dati ci servono solo per organizzare le informazioni nel tuo account.
            </Text>
          </Stack>
          <Grid columns={2} gap={10}>
            <Field label="Nome figlio"><Input placeholder="Es. Marco" value="" /></Field>
            <Field label="Cognome figlio"><Input placeholder="Es. Rossi" value="" /></Field>
          </Grid>
          <Field label="Nome della scuola">
            <Input placeholder="es. I.C. A. Manzoni" value={school} onChange={setSchool} />
          </Field>
          <Grid columns={2} gap={10}>
            <Field label="Classe / Sezione"><Input placeholder="es. 2ª B" value={cls} onChange={setCls} /></Field>
            <Field label="Anno scolastico">
              <Sel value="2025/2026" options={[
                { value: '2025/2026', label: '2025/2026' },
                { value: '2024/2025', label: '2024/2025' },
              ]} />
            </Field>
          </Grid>
          <Divider />
          <Stack gap={8}>
            <CheckBox checked={true} onChange={() => {}} label="Dichiaro di essere il genitore/tutore legale e di avere il diritto di trattare i dati scolastici di questo figlio." />
            <CheckBox checked={true} onChange={() => {}} label="Ho preso visione dell'Informativa Privacy di ScuolaPay relativa ai dati dei minori." />
          </Stack>
          <Row gap={10}>
            <Button variant="primary" onClick={() => goTo('dashboard')}>Salva e collega figlio</Button>
            <Button variant="ghost" onClick={() => goTo('add-child')}>Annulla</Button>
          </Row>
        </Stack>
      )}
    </Stack>
  )
}


const DOCUMENTS_DATA = {
  Marco: [
    { label: "Carta d'identità genitore",   note: 'Fronte e retro — PDF/JPG',                   initialStatus: 'uploaded', fileName: 'carta_identita_maria_rossi.pdf', required: true,  context: 'Iscrizione 2025/2026' },
    { label: 'Codice fiscale studente',      note: 'Tessera sanitaria o equivalente',             initialStatus: 'uploaded', fileName: 'codice_fiscale_marco.pdf',       required: true,  context: 'Iscrizione 2025/2026' },
    { label: 'Certificato vaccinazioni',     note: 'Libretto vaccinale o certificato ASL',        initialStatus: 'missing',  fileName: null,                            required: true,  context: 'Iscrizione 2025/2026' },
    { label: "Carta d'identità studente",    note: 'Obbligatoria per studenti over 10 anni',      initialStatus: 'idle',     fileName: null,                            required: false, context: 'Iscrizione 2025/2026' },
    { label: 'Contratto firmato 2024/2025',  note: 'Copia del contratto di iscrizione firmato',   initialStatus: 'verified', fileName: 'contratto_2024_marco.pdf',      required: false, context: 'A.S. 2024/2025' },
  ],
  Sofia: [
    { label: "Carta d'identità genitore",   note: 'Fronte e retro — PDF/JPG',                   initialStatus: 'uploaded', fileName: 'carta_identita_maria_rossi.pdf', required: true,  context: 'Iscrizione 2025/2026' },
    { label: 'Modulo diete speciali',        note: 'Solo se il figlio segue diete particolari',   initialStatus: 'idle',     fileName: null,                            required: false, context: 'Mensa scolastica' },
    { label: 'Contratto firmato 2024/2025',  note: 'Copia del contratto di iscrizione firmato',   initialStatus: 'verified', fileName: 'contratto_2024_sofia.pdf',      required: false, context: 'A.S. 2024/2025' },
  ],
  Giulia: [
    { label: "Carta d'identità genitore",   note: 'Fronte e retro — PDF/JPG',                   initialStatus: 'idle',     fileName: null,                            required: true,  context: 'Iscrizione 2025/2026' },
    { label: 'Codice fiscale studente',      note: 'Tessera sanitaria o equivalente',             initialStatus: 'idle',     fileName: null,                            required: true,  context: 'Iscrizione 2025/2026' },
    { label: 'Certificazione DSA/BES',       note: 'Solo se applicabile',                         initialStatus: 'idle',     fileName: null,                            required: false, context: 'Iscrizione 2025/2026' },
  ],
}

function ScreenDocuments({ goTo }) {
  const [selectedChild, setSelectedChild] = useState('Marco')
  const docs = DOCUMENTS_DATA[selectedChild] || []
  const child = CHILDREN_DATA.find(c => c.name === selectedChild)

  const uploaded = docs.filter(d => d.initialStatus === 'uploaded' || d.initialStatus === 'verified').length
  const missing  = docs.filter(d => d.initialStatus === 'missing').length
  const pending  = docs.filter(d => d.initialStatus === 'idle').length

  return (
    <Stack gap={24}>
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Stack gap={4}>
          <H2>Documenti</H2>
          <Text tone="secondary">Tutti i documenti richiesti dalla scuola, organizzati per figlio.</Text>
        </Stack>
        <Button variant="secondary">Carica documento</Button>
      </Row>

      {/* Child switcher */}
      <Stack gap={8}>
        <SectionLabel>SELEZIONA FIGLIO</SectionLabel>
        <Row gap={10} style={{ flexWrap: 'wrap' }}>
          {CHILDREN_DATA.map(c => (
            <div
              key={c.name}
              onClick={() => setSelectedChild(c.name)}
              style={{
                padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                border: `1.5px solid ${selectedChild === c.name ? c.color : C.border}`,
                background: selectedChild === c.name ? `${c.color}12` : C.bgRaised,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.15s',
              }}
            >
              <Avatar name={`${c.name} ${c.surname}`} color={c.color} size={26} />
              <Text style={{ fontWeight: selectedChild === c.name ? 700 : 500, fontSize: 13, color: selectedChild === c.name ? c.color : C.text }}>
                {c.name}
              </Text>
            </div>
          ))}
        </Row>
      </Stack>

      {/* Stats strip */}
      <Grid columns={3} gap={12}>
        <Stat value={uploaded} label="Caricati / verificati" tone="success" />
        <Stat value={missing}  label="Mancanti (richiesti)" tone={missing > 0 ? 'danger' : undefined} />
        <Stat value={pending}  label="Da caricare" />
      </Grid>

      {/* Missing alert */}
      {missing > 0 && (
        <Alert
          type="danger"
          title={`${missing} documento mancante per ${selectedChild}`}
          description="Alcuni documenti obbligatori non sono ancora stati caricati. La pratica di iscrizione potrebbe essere bloccata."
          action="Carica ora"
        />
      )}

      {/* Documents list */}
      <Stack gap={8}>
        {/* Group by context */}
        {[...new Set(docs.map(d => d.context))].map(ctx => (
          <Stack key={ctx} gap={8}>
            <SectionLabel>{ctx.toUpperCase()}</SectionLabel>
            {docs.filter(d => d.context === ctx).map((d, i) => (
              <UploadZone key={i} {...d} />
            ))}
          </Stack>
        ))}
      </Stack>

      {/* Info note */}
      <div style={{ padding: '12px 16px', background: C.fill, borderRadius: 8 }}>
        <Stack gap={4}>
          <Text style={{ fontWeight: 600, fontSize: 13 }}>Formati accettati</Text>
          <Text size="small" tone="secondary">
            PDF, JPG, PNG · Dimensione massima 5 MB per file.
            I documenti vengono trasmessi cifrati direttamente alla segreteria scolastica.
            Una volta verificati dalla scuola non potranno essere eliminati.
          </Text>
        </Stack>
      </div>

      {/* Quick link to enrollment */}
      <Row gap={10}>
        <Button variant="ghost" onClick={() => goTo('enrollment-documents')}>
          Gestisci documenti iscrizione →
        </Button>
      </Row>
    </Stack>
  )
}

const TAX_YEARS = [
  {
    year: '2024', label: 'Anno fiscale 2024',
    total: '€ 1.248,50',
    children: [
      { name: 'Marco',  items: ['Mensa scolastica', 'Gita Firenze', 'Laboratorio musica'],  amount: '€ 852,00' },
      { name: 'Sofia',  items: ['Materiale didattico', 'Contributo volontario'],             amount: '€ 396,50' },
    ],
    note: 'Include rette, mensa e contributi scolastici detraibili (art. 15 TUIR).',
    ready: true,
  },
  {
    year: '2023', label: 'Anno fiscale 2023',
    total: '€ 980,00',
    children: [
      { name: 'Marco',  items: ['Mensa scolastica', 'Materiale didattico'],  amount: '€ 980,00' },
    ],
    note: 'Dichiarazione disponibile. Generata il 10 gen 2024.',
    ready: true,
  },
  {
    year: '2022', label: 'Anno fiscale 2022',
    total: '€ 540,00',
    children: [
      { name: 'Marco',  items: ['Mensa scolastica'],  amount: '€ 540,00' },
    ],
    note: 'Dichiarazione disponibile. Generata il 14 gen 2023.',
    ready: true,
  },
  {
    year: '2025', label: 'Anno fiscale 2025 (in corso)',
    total: '€ 308,00 finora',
    children: [],
    note: 'La dichiarazione sarà disponibile a gennaio 2026 a chiusura dell\'anno fiscale.',
    ready: false,
  },
]

function ScreenAccount({ goTo }) {
  const [activeTab, setActiveTab] = useState('profilo')
  const [openYear, setOpenYear] = useState(null)

  const tabs = [
    { id: 'profilo',    label: 'Dati personali' },
    { id: 'sicurezza',  label: 'Sicurezza' },
    { id: 'dichiarazioni', label: 'Dichiarazione spese' },
    { id: 'notifiche',  label: 'Notifiche' },
  ]

  return (
    <Stack gap={24}>
      <Stack gap={4}>
        <H2>Profilo e sicurezza</H2>
        <Text tone="secondary">Gestisci i tuoi dati, la sicurezza dell'account e i documenti fiscali.</Text>
      </Stack>

      {/* Tabs */}
      <Row gap={0} style={{ borderBottom: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '9px 18px', border: 'none', cursor: 'pointer',
              background: 'transparent', fontSize: 13, fontWeight: 500,
              color: activeTab === t.id ? C.text : C.textSec,
              borderBottom: `2px solid ${activeTab === t.id ? C.accent : 'transparent'}`,
              marginBottom: -1, transition: 'color 0.1s',
            }}
          >
            {t.label}
          </button>
        ))}
      </Row>

      {/* Dati personali */}
      {activeTab === 'profilo' && (
        <Stack gap={20} style={{ maxWidth: 480 }}>
          <Card>
            <CardHeader>Dati personali</CardHeader>
            <CardBody>
              <Stack gap={14}>
                <Grid columns={2} gap={10}>
                  <Field label="Nome"><Input value="Maria" /></Field>
                  <Field label="Cognome"><Input value="Rossi" /></Field>
                </Grid>
                <Stack gap={5}>
                  <Field label="Email"><Input value="maria.rossi@email.it" disabled /></Field>
                  <Row gap={6}>
                    <Pill tone="success" active size="sm">Verificata</Pill>
                    <Text tone="tertiary" size="small">Confermata con OTP</Text>
                  </Row>
                </Stack>
                <Field label="Telefono"><Input placeholder="+39 333 0000000" value="+39 334 8821045" /></Field>
                <Field label="Codice fiscale (opzionale)">
                  <Input placeholder="RSSMRA80A41H501Q" value="" />
                </Field>
                <Button variant="primary">Salva modifiche</Button>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Figli collegati</CardHeader>
            <CardBody>
              <Stack gap={10}>
                {CHILDREN_DATA.map(c => (
                  <Row key={c.name} gap={10} style={{ justifyContent: 'space-between' }}>
                    <Row gap={8}>
                      <Avatar name={`${c.name} ${c.surname}`} color={c.color} size={28} />
                      <Stack gap={1}>
                        <Text style={{ fontWeight: 600, fontSize: 13 }}>{c.name} {c.surname}</Text>
                        <Text size="small" tone="tertiary">{c.school} · {c.cls}</Text>
                      </Stack>
                    </Row>
                    <Button variant="ghost">Gestisci</Button>
                  </Row>
                ))}
                <Divider />
                <Button variant="secondary" onClick={() => goTo('add-child')}>+ Collega altro figlio</Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      )}

      {/* Sicurezza */}
      {activeTab === 'sicurezza' && (
        <Stack gap={14} style={{ maxWidth: 480 }}>
          <Card>
            <CardHeader>Password</CardHeader>
            <CardBody>
              <Stack gap={10}>
                <Field label="Password attuale"><Input type="password" placeholder="••••••••" /></Field>
                <Field label="Nuova password"><Input type="password" placeholder="••••••••" /></Field>
                <Field label="Conferma nuova password"><Input type="password" placeholder="••••••••" /></Field>
                <Button variant="primary">Aggiorna password</Button>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Autenticazione a due fattori</CardHeader>
            <CardBody>
              <Stack gap={10}>
                <Row gap={10} style={{ justifyContent: 'space-between' }}>
                  <Stack gap={2}>
                    <Text style={{ fontWeight: 600, fontSize: 13 }}>OTP via email</Text>
                    <Text size="small" tone="secondary">Richiesto ad ogni accesso</Text>
                  </Stack>
                  <Pill tone="success" active size="sm">Attivo</Pill>
                </Row>
                <Divider />
                <Row gap={10} style={{ justifyContent: 'space-between' }}>
                  <Stack gap={2}>
                    <Text style={{ fontWeight: 600, fontSize: 13 }}>App authenticator</Text>
                    <Text size="small" tone="secondary">Google Authenticator, Authy…</Text>
                  </Stack>
                  <Button variant="secondary">Configura</Button>
                </Row>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm" tone="danger">Attenzione</Pill>}>Zona pericolosa</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text size="small" tone="secondary">L'eliminazione dell'account è permanente. Tutti i dati verranno rimossi dopo 30 giorni.</Text>
                <Button variant="ghost" style={{ color: C.danger, borderColor: C.danger + '44' }}>Elimina account</Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      )}

      {/* Dichiarazione spese */}
      {activeTab === 'dichiarazioni' && (
        <Stack gap={20}>
          <Alert
            type="info"
            title="Dichiarazione spese scolastiche per la detrazione fiscale (730)"
            description="ScuolaPay genera automaticamente il riepilogo delle spese detraibili ai sensi dell'art. 15 del TUIR. Puoi scaricarla in formato PDF e allegarla alla tua dichiarazione dei redditi."
          />

          <Stack gap={10}>
            {TAX_YEARS.map(y => {
              const isOpen = openYear === y.year
              return (
                <Card key={y.year} accent={y.ready ? C.success : C.border}>
                  <div
                    onClick={() => setOpenYear(isOpen ? null : y.year)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CardBody>
                      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Row gap={12}>
                          <Stack gap={3}>
                            <Row gap={8}>
                              <Text style={{ fontWeight: 700, fontSize: 14 }}>{y.label}</Text>
                              {y.ready
                                ? <Pill size="sm" tone="success" active>Disponibile</Pill>
                                : <Pill size="sm" tone="neutral">In corso</Pill>
                              }
                            </Row>
                            <Text size="small" tone="secondary">{y.note}</Text>
                          </Stack>
                        </Row>
                        <Row gap={14}>
                          <Stack gap={1} style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: 18, fontWeight: 800, color: y.ready ? C.success : C.textSec, letterSpacing: '-0.5px' }}>{y.total}</span>
                            <span style={{ fontSize: 11, color: C.textTer }}>spese detraibili</span>
                          </Stack>
                          {y.ready && (
                            <Button variant="primary" onClick={e => { e.stopPropagation() }}>
                              ↓ Scarica PDF
                            </Button>
                          )}
                          <span style={{ color: C.textTer, fontSize: 14, userSelect: 'none' }}>
                            {isOpen ? '▲' : '▼'}
                          </span>
                        </Row>
                      </Row>
                    </CardBody>
                  </div>

                  {isOpen && y.ready && (
                    <>
                      <Divider />
                      <CardBody>
                        <Stack gap={14}>
                          <SectionLabel>DETTAGLIO PER FIGLIO</SectionLabel>
                          {y.children.map(ch => (
                            <div key={ch.name} style={{ padding: '12px 14px', background: C.fill, borderRadius: 8 }}>
                              <Stack gap={8}>
                                <Row gap={8} style={{ justifyContent: 'space-between' }}>
                                  <Row gap={8}>
                                    <Avatar
                                      name={ch.name}
                                      color={CHILD_COLOR[ch.name] || C.accent}
                                      size={26}
                                    />
                                    <Text style={{ fontWeight: 600, fontSize: 13 }}>{ch.name}</Text>
                                  </Row>
                                  <Text style={{ fontWeight: 700 }}>{ch.amount}</Text>
                                </Row>
                                <Row gap={6} style={{ flexWrap: 'wrap' }}>
                                  {ch.items.map(item => (
                                    <Pill key={item} size="sm">{item}</Pill>
                                  ))}
                                </Row>
                              </Stack>
                            </div>
                          ))}
                          <Divider />
                          <Row gap={10} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text size="small" tone="tertiary">
                              Documento generato da ScuolaPay · Valido per la dichiarazione dei redditi {y.year}
                            </Text>
                            <Row gap={8}>
                              <Button variant="secondary">Anteprima</Button>
                              <Button variant="primary">↓ Scarica PDF</Button>
                            </Row>
                          </Row>
                        </Stack>
                      </CardBody>
                    </>
                  )}
                </Card>
              )
            })}
          </Stack>

          <div style={{ padding: '14px 16px', background: C.fill, borderRadius: 8 }}>
            <Stack gap={4}>
              <Text style={{ fontWeight: 600, fontSize: 13 }}>Cosa è incluso nella dichiarazione?</Text>
              <Text size="small" tone="secondary">
                Mensa scolastica, rette scolastiche (istituti paritari), contributi obbligatori, gite scolastiche deliberate dal consiglio di classe.
                Le spese per materiale didattico acquistato sullo store <strong style={{ color: C.text }}>non sono detraibili</strong> e non compaiono nel documento.
              </Text>
            </Stack>
          </div>
        </Stack>
      )}

      {/* Notifiche */}
      {activeTab === 'notifiche' && (
        <Stack gap={14} style={{ maxWidth: 480 }}>
          <Card>
            <CardHeader>Canali di notifica</CardHeader>
            <CardBody>
              <Stack gap={14}>
                {[
                  { label: 'Email', desc: 'Pagamenti, documenti, promemoria', on: true },
                  { label: 'Push (app mobile)', desc: 'Notifiche in tempo reale', on: false },
                  { label: 'SMS', desc: 'Solo avvisi urgenti', on: true },
                ].map(n => (
                  <Row key={n.label} gap={10} style={{ justifyContent: 'space-between' }}>
                    <Stack gap={2}>
                      <Text style={{ fontWeight: 600, fontSize: 13 }}>{n.label}</Text>
                      <Text size="small" tone="secondary">{n.desc}</Text>
                    </Stack>
                    <Toggle checked={n.on} onChange={() => {}} />
                  </Row>
                ))}
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Tipo di notifiche</CardHeader>
            <CardBody>
              <Stack gap={12}>
                {[
                  { label: 'Nuovo pagamento richiesto', on: true },
                  { label: 'Firma richiesta sull\'iscrizione', on: true },
                  { label: 'Documento da caricare', on: true },
                  { label: 'Ordine spedito / consegnato', on: true },
                  { label: 'Promozioni e offerte store', on: false },
                  { label: 'Promemoria scadenze scolastiche', on: true },
                ].map(n => (
                  <Row key={n.label} gap={10} style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13 }}>{n.label}</Text>
                    <Toggle checked={n.on} onChange={() => {}} />
                  </Row>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      )}
    </Stack>
  )
}

function ScreenDashboard({ goTo }) {
  return (
    <Stack gap={24}>
      {/* Header */}
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Stack gap={3}>
          <H2>Buongiorno, Maria</H2>
          <Text tone="secondary" size="small">Lunedì 20 aprile 2025 · 3 figli collegati</Text>
        </Stack>
        <Button variant="secondary" onClick={() => goTo('promotions')}>Offerte & Store</Button>
      </Row>

      {/* Alerts */}
      <Stack gap={8}>
        <Alert type="warning"
          title="Firma mancante — Iscrizione Marco Rossi A.S. 2025/2026"
          description="Luca Rossi (Padre) non ha ancora firmato. La pratica è in attesa."
          action="Gestisci firme" onAction={() => goTo('enrollment-signatures')} />
        <Alert type="info"
          title="Iscrizione Giulia Bianchi in bozza"
          description="Hai iniziato l'iscrizione alla Sc. Media L. da Vinci ma non l'hai ancora inviata."
          action="Completa" onAction={() => goTo('enrollment-data')} />
      </Stack>

      {/* Stats */}
      <Grid columns={4} gap={12}>
        <Stat value="6"  label="Ordini totali" />
        <Stat value="9"  label="Pagamenti" tone="success" />
        <Stat value="5"  label="Documenti" tone="info" />
        <Stat value="3"  label="Iscrizioni attive" tone="warning" />
      </Grid>

      <Divider />

      {/* Children */}
      <Stack gap={12}>
        <Row gap={8}>
          <SectionLabel>I MIEI FIGLI</SectionLabel>
          <Spacer />
          <Button variant="ghost" onClick={() => goTo('add-child')}>+ Aggiungi figlio</Button>
        </Row>
        <Grid columns={3} gap={14}>
          {CHILDREN_DATA.map(child => {
            const enrollTone = child.enrollStatus === 'Confermata' ? 'success' : child.enrollStatus === 'Bozza' ? 'neutral' : 'warning'
            const pays = PAYMENTS_DATA.filter(p => p.child === child.name)
            const ords = ORDERS_DATA.filter(o => o.child === child.name)
            return (
              <Card key={child.name} accent={child.color}>
                <CardBody>
                  <Stack gap={12}>
                    <Row gap={10} style={{ alignItems: 'flex-start' }}>
                      <Avatar name={`${child.name} ${child.surname}`} color={child.color} size={38} />
                      <Stack gap={3} style={{ flex: 1, minWidth: 0 }}>
                        <Text style={{ fontWeight: 700, fontSize: 14 }}>{child.name} {child.surname}</Text>
                        <Text size="small" tone="secondary" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {child.school}
                        </Text>
                      </Stack>
                    </Row>
                    <Row gap={6} style={{ flexWrap: 'wrap' }}>
                      <Pill size="sm">{child.cls}</Pill>
                      <Pill size="sm">{child.age} anni</Pill>
                    </Row>
                    <div style={{ padding: '8px 10px', background: C.fill, borderRadius: 7 }}>
                      <Row gap={6} style={{ justifyContent: 'space-between' }}>
                        <Text size="small" tone="secondary">Iscrizione {child.enrollYear}</Text>
                        <Pill size="sm" tone={enrollTone} active>{child.enrollStatus}</Pill>
                      </Row>
                    </div>
                    <Grid columns={2} gap={8}>
                      <div style={{ textAlign: 'center', padding: '8px 4px', background: C.fill, borderRadius: 6 }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: child.color }}>{pays.length}</div>
                        <div style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>pagamenti</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '8px 4px', background: C.fill, borderRadius: 6 }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: child.color }}>{ords.length}</div>
                        <div style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>ordini</div>
                      </div>
                    </Grid>
                    <Button variant="ghost" style={{ width: '100%', textAlign: 'center' }} onClick={() => goTo('child-detail')}>
                      Vedi dettaglio →
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            )
          })}
        </Grid>
      </Stack>

      <Divider />

      <Grid columns="1fr 1fr" gap={24} style={{ alignItems: 'start' }}>
        {/* Recent payments */}
        <Stack gap={12}>
          <Row gap={8}>
            <SectionLabel>PAGAMENTI RECENTI</SectionLabel>
            <Spacer />
            <Button variant="ghost" onClick={() => goTo('payments')}>Vedi tutti →</Button>
          </Row>
          <DataTable
            headers={['Data', 'Figlio', 'Importo', 'Stato']}
            rows={PAYMENTS_DATA.slice(0, 5).map(p => [
              <span key={p.id + 'd'} style={{ color: C.textSec, fontSize: 12 }}>{p.date}</span>,
              <Row key={p.id + 'c'} gap={6}>
                <Avatar name={p.child} color={CHILD_COLOR[p.child]} size={20} />
                <Text size="small">{p.child}</Text>
              </Row>,
              <span key={p.id + 'a'} style={{ fontWeight: 600 }}>{p.amount}</span>,
              <Pill key={p.id} size="sm" tone={statusTone(p.status)} active>{p.status}</Pill>,
            ])}
          />
        </Stack>

        {/* Enrollments + recent orders */}
        <Stack gap={12}>
          <SectionLabel>ISCRIZIONI A.S. 2025/2026</SectionLabel>
          <Stack gap={8}>
            {CHILDREN_DATA.map(child => {
              const tone = child.enrollStatus === 'Confermata' ? 'success' : child.enrollStatus === 'Bozza' ? 'neutral' : 'warning'
              return (
                <Card key={child.name} accent={child.color}>
                  <CardBody style={{ padding: '10px 14px' }}>
                    <Row gap={10} style={{ justifyContent: 'space-between' }}>
                      <Row gap={8}>
                        <Avatar name={`${child.name} ${child.surname}`} color={child.color} size={28} />
                        <Stack gap={2}>
                          <Text style={{ fontWeight: 600, fontSize: 13 }}>{child.name} {child.surname}</Text>
                          <Text size="small" tone="secondary">{child.school}</Text>
                        </Stack>
                      </Row>
                      <Row gap={8}>
                        <Pill size="sm" tone={tone} active>{child.enrollStatus}</Pill>
                        <Button variant="ghost" onClick={() => goTo('enrollment-overview')}>→</Button>
                      </Row>
                    </Row>
                  </CardBody>
                </Card>
              )
            })}
          </Stack>

          <Row gap={8} style={{ marginTop: 4 }}>
            <SectionLabel>ULTIMI ORDINI</SectionLabel>
            <Spacer />
            <Button variant="ghost" onClick={() => goTo('orders')}>Vedi tutti →</Button>
          </Row>
          <DataTable
            headers={['Ordine', 'Figlio', 'Totale', 'Stato']}
            rows={ORDERS_DATA.slice(0, 3).map(o => [
              <span key={o.num + 'n'} style={{ fontWeight: 600, fontSize: 12 }}>{o.num}</span>,
              <Row key={o.num + 'c'} gap={6}>
                <Avatar name={o.child} color={CHILD_COLOR[o.child]} size={20} />
                <Text size="small">{o.child}</Text>
              </Row>,
              <span key={o.num + 't'} style={{ fontWeight: 600 }}>{o.total}</span>,
              <Pill key={o.num} size="sm" tone={statusTone(o.status)} active>{o.status}</Pill>,
            ])}
          />
        </Stack>
      </Grid>
    </Stack>
  )
}

function ScreenChildDetail({ goTo }) {
  const [selected, setSelected] = useState('Marco')
  const child = CHILDREN_DATA.find(c => c.name === selected) || CHILDREN_DATA[0]
  const payments = PAYMENTS_DATA.filter(p => p.child === selected)
  const orders = ORDERS_DATA.filter(o => o.child === selected)

  const enrollTone = child.enrollStatus === 'Confermata' ? 'success' : child.enrollStatus === 'Bozza' ? 'neutral' : 'warning'

  return (
    <Stack gap={20}>
      {/* Child switcher */}
      <Stack gap={10}>
        <SectionLabel>SELEZIONA FIGLIO</SectionLabel>
        <Row gap={10} style={{ flexWrap: 'wrap' }}>
          {CHILDREN_DATA.map(c => (
            <div
              key={c.name}
              onClick={() => setSelected(c.name)}
              style={{
                padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                border: `1.5px solid ${selected === c.name ? c.color : C.border}`,
                background: selected === c.name ? `${c.color}12` : C.bgRaised,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.15s',
              }}
            >
              <Avatar name={`${c.name} ${c.surname}`} color={c.color} size={28} />
              <Stack gap={1}>
                <Text style={{ fontWeight: selected === c.name ? 700 : 500, fontSize: 13, color: selected === c.name ? c.color : C.text }}>
                  {c.name} {c.surname}
                </Text>
                <Text size="small" tone="tertiary">{c.cls} · {c.age} anni</Text>
              </Stack>
            </div>
          ))}
        </Row>
      </Stack>

      {/* Child header */}
      <div style={{ padding: '18px 20px', background: C.bgRaised, borderRadius: 12, border: `1px solid ${C.border}`, borderLeft: `4px solid ${child.color}` }}>
        <Row gap={14} style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Row gap={14}>
            <Avatar name={`${child.name} ${child.surname}`} color={child.color} size={52} />
            <Stack gap={4}>
              <H2 style={{ color: child.color }}>{child.name} {child.surname}</H2>
              <Text tone="secondary">{child.school}</Text>
              <Row gap={6} style={{ flexWrap: 'wrap' }}>
                <Pill size="sm">{child.cls}</Pill>
                <Pill size="sm">{child.age} anni</Pill>
                <Pill size="sm">Relazione: Madre</Pill>
                <Pill tone="success" active size="sm">Attivo</Pill>
              </Row>
            </Stack>
          </Row>
          <Button variant="secondary">Modifica</Button>
        </Row>
      </div>

      <Grid columns={3} gap={12}>
        <Stat value={payments.length} label="Pagamenti" tone="success" />
        <Stat value={orders.length} label="Ordini" tone="info" />
        <Stat value="2" label="Documenti" />
      </Grid>

      {/* Enrollment section */}
      <Divider />
      <Stack gap={8}>
        <Row gap={8}>
          <H3>Iscrizione A.S. {child.enrollYear}</H3>
          <Spacer />
          <Button variant="ghost" onClick={() => goTo('enrollment-detail')}>Vedi tutte →</Button>
        </Row>
        <Card accent={child.color}>
          <CardHeader trailing={<Pill size="sm" tone={enrollTone} active>{child.enrollStatus}</Pill>}>
            {child.enrollYear} — {child.school}
          </CardHeader>
          <CardBody>
            <Stack gap={10}>
              {child.enrollStatus === 'In attesa firme' && (
                <>
                  <Row gap={6} style={{ flexWrap: 'wrap' }}>
                    <Pill size="sm" tone="success" active>Dati ✓</Pill>
                    <Pill size="sm" tone="warning" active>Firme 1/2</Pill>
                    <Pill size="sm">Pagamento</Pill>
                    <Pill size="sm" tone="warning" active>Documenti 2/4</Pill>
                  </Row>
                  <Alert type="warning" title="Firma mancante" description="Luca Rossi deve ancora firmare il contratto di iscrizione." />
                  <Row gap={8}>
                    <Button variant="primary" onClick={() => goTo('enrollment-overview')}>Apri pratica</Button>
                    <Button variant="ghost" onClick={() => goTo('enrollment-signatures')}>Gestisci firme</Button>
                  </Row>
                </>
              )}
              {child.enrollStatus === 'Confermata' && (
                <>
                  <Alert type="success" title="Iscrizione confermata dalla segreteria" description={`${child.name} è ufficialmente iscritta per l'A.S. ${child.enrollYear}.`} />
                  <Button variant="ghost">Vedi documenti →</Button>
                </>
              )}
              {child.enrollStatus === 'Bozza' && (
                <>
                  <Alert type="info" title="Iscrizione in bozza" description="Hai salvato una bozza di iscrizione. Completala e inviala alla segreteria." />
                  <Button variant="primary" onClick={() => goTo('enrollment-data')}>Completa iscrizione →</Button>
                </>
              )}
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Divider />
      <Stack gap={8}>
        <H3>Pagamenti</H3>
        <DataTable
          headers={['Data', 'Descrizione', 'Importo', 'Stato', 'Ricevuta']}
          rows={payments.map(p => [
            <span key={p.id + 'd'} style={{ color: C.textSec, fontSize: 12 }}>{p.date}</span>,
            p.desc,
            <span key={p.id + 'a'} style={{ fontWeight: 600 }}>{p.amount}</span>,
            <Pill key={p.id} size="sm" tone={statusTone(p.status)} active>{p.status}</Pill>,
            p.status === 'Completato'
              ? <Button key={p.id + 'r'} variant="ghost">Scarica</Button>
              : <span key={p.id + 'r'} style={{ color: C.textTer }}>—</span>,
          ])}
          emptyMessage="Nessun pagamento per questo figlio."
        />
      </Stack>
      <Stack gap={8}>
        <H3>Ordini</H3>
        <DataTable
          headers={['Ordine', 'Data', 'Articoli', 'Totale', 'Stato']}
          rows={orders.map(o => [
            <span key={o.num + 'n'} style={{ fontWeight: 700, fontSize: 13 }}>{o.num}</span>,
            <span key={o.num + 'd'} style={{ color: C.textSec, fontSize: 12 }}>{o.date}</span>,
            o.items,
            <span key={o.num + 't'} style={{ fontWeight: 600 }}>{o.total}</span>,
            <Pill key={o.num} size="sm" tone={statusTone(o.status)} active>{o.status}</Pill>,
          ])}
          emptyMessage="Nessun ordine per questo figlio."
        />
      </Stack>
      <Stack gap={8}>
        <H3>Documenti</H3>
        <DataTable
          headers={['Documento', 'Data', 'Tipo', 'Azione']}
          rows={[
            ['Ricevuta mensa aprile 2025', '30 apr 2025', 'Ricevuta', <Button key="d1" variant="ghost">Scarica PDF</Button>],
            ['Modulo iscrizione A.S. 2025/2026', '15 mar 2025', 'Modulo', <Button key="d2" variant="ghost">Scarica PDF</Button>],
          ]}
        />
      </Stack>
    </Stack>
  )
}

function ScreenPayments() {
  const [childFilter, setChildFilter] = useState('Tutti')
  const [statusFilter, setStatusFilter] = useState('Tutti')
  const filtered = PAYMENTS_DATA.filter(p =>
    (childFilter === 'Tutti' || p.child === childFilter) &&
    (statusFilter === 'Tutti' || p.status === statusFilter)
  )
  const total = filtered.filter(p => p.status === 'Completato').reduce((sum, p) => {
    const n = parseFloat(p.amount.replace('€ ', '').replace(',', '.'))
    return sum + (isNaN(n) ? 0 : n)
  }, 0)
  return (
    <Stack gap={20}>
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Stack gap={4}>
          <H2>Pagamenti</H2>
          <Text tone="secondary">Tutti i pagamenti del tuo account, filtrabili per figlio e stato.</Text>
        </Stack>
        <Button variant="secondary">Esporta CSV</Button>
      </Row>

      <Grid columns={3} gap={12}>
        <Stat value={PAYMENTS_DATA.length} label="Pagamenti totali" />
        <Stat value={`€ ${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`} label="Totale completati" tone="success" />
        <Stat value={PAYMENTS_DATA.filter(p => p.status === 'In attesa').length} label="In attesa" tone="warning" />
      </Grid>

      <Row gap={16} style={{ flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Stack gap={5}>
          <SectionLabel>FIGLIO</SectionLabel>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {['Tutti', ...CHILDREN_DATA.map(c => c.name)].map(f => (
              <Pill key={f} active={childFilter === f} onClick={() => setChildFilter(f)}>{f}</Pill>
            ))}
          </Row>
        </Stack>
        <Stack gap={5}>
          <SectionLabel>STATO</SectionLabel>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {['Tutti', 'Completato', 'In attesa', 'Fallito'].map(f => (
              <Pill key={f} active={statusFilter === f} onClick={() => setStatusFilter(f)}>{f}</Pill>
            ))}
          </Row>
        </Stack>
      </Row>

      <DataTable
        headers={['Data', 'Descrizione', 'Figlio', 'Importo', 'Stato', 'Ricevuta']}
        rows={filtered.map(p => [
          <span key={p.id + 'd'} style={{ color: C.textSec, fontSize: 12 }}>{p.date}</span>,
          p.desc,
          <Row key={p.id + 'c'} gap={6}>
            <Avatar name={p.child} color={CHILD_COLOR[p.child]} size={20} />
            <Text size="small">{p.child}</Text>
          </Row>,
          <span key={p.id + 'a'} style={{ fontWeight: 600 }}>{p.amount}</span>,
          <Pill key={p.id + 's'} size="sm" tone={statusTone(p.status)} active>{p.status}</Pill>,
          p.status === 'Completato'
            ? <Button key={p.id + 'dl'} variant="ghost">Scarica</Button>
            : <span key={p.id + 'dl'} style={{ color: C.textTer }}>—</span>,
        ])}
        emptyMessage="Nessun pagamento trovato per i filtri selezionati."
      />
      <Text tone="tertiary" size="small">{filtered.length} risultati</Text>
    </Stack>
  )
}

function ScreenOrders() {
  const [childFilter, setChildFilter] = useState('Tutti')
  const [statusFilter, setStatusFilter] = useState('Tutti')
  const filtered = ORDERS_DATA.filter(o =>
    (childFilter === 'Tutti' || o.child === childFilter) &&
    (statusFilter === 'Tutti' || o.status === statusFilter)
  )
  return (
    <Stack gap={20}>
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Stack gap={4}>
          <H2>Ordini</H2>
          <Text tone="secondary">I tuoi ordini dallo store ScuolaPay.</Text>
        </Stack>
        <Button variant="primary" onClick={() => {}}>Vai allo store →</Button>
      </Row>

      <Row gap={16} style={{ flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Stack gap={5}>
          <SectionLabel>FIGLIO</SectionLabel>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {['Tutti', ...CHILDREN_DATA.map(c => c.name)].map(f => (
              <Pill key={f} active={childFilter === f} onClick={() => setChildFilter(f)}>{f}</Pill>
            ))}
          </Row>
        </Stack>
        <Stack gap={5}>
          <SectionLabel>STATO</SectionLabel>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {['Tutti', 'In elaborazione', 'Consegnato', 'Annullato'].map(f => (
              <Pill key={f} active={statusFilter === f} onClick={() => setStatusFilter(f)}>{f}</Pill>
            ))}
          </Row>
        </Stack>
      </Row>

      <DataTable
        headers={['Ordine', 'Data', 'Articoli', 'Figlio', 'Totale', 'Stato', '']}
        rows={filtered.map(o => [
          <span key={o.num + 'n'} style={{ fontWeight: 700, fontSize: 13 }}>{o.num}</span>,
          <span key={o.num + 'd'} style={{ color: C.textSec, fontSize: 12 }}>{o.date}</span>,
          o.items,
          <Row key={o.num + 'c'} gap={6}>
            <Avatar name={o.child} color={CHILD_COLOR[o.child]} size={20} />
            <Text size="small">{o.child}</Text>
          </Row>,
          <span key={o.num + 't'} style={{ fontWeight: 600 }}>{o.total}</span>,
          <Pill key={o.num} size="sm" tone={statusTone(o.status)} active>{o.status}</Pill>,
          <Button key={o.num + 'det'} variant="ghost">Dettaglio</Button>,
        ])}
        emptyMessage="Nessun ordine trovato."
      />
    </Stack>
  )
}

function ScreenPromotions({ goTo }) {
  const [catFilter, setCatFilter] = useState('Tutti')

  const products = [
    { title: 'Kit materiale scolastico 4ª A',    description: 'Tutto il necessario per il nuovo anno. Selezionato dalla Sc. Primaria G. Verdi.',  price: '€ 38,90', tag: 'Materiali',    childTag: 'Per Marco',  accentColor: '#3b82f6', badge: 'Consigliato' },
    { title: 'Felpa ufficiale Sc. G. Verdi',      description: 'Felpa con logo scuola, disponibile in tutte le taglie. Cotone 100%.',              price: '€ 28,00', tag: 'Abbigliamento', childTag: 'Per Marco',  accentColor: '#3b82f6' },
    { title: 'Set colori e plastilina Sez. B',    description: 'Kit specifico per la sezione B - Sc. Infanzia Arcobaleno.',                        price: '€ 14,90', tag: 'Materiali',    childTag: 'Per Sofia',  accentColor: '#e879a8' },
    { title: 'Libri di testo 1ª media',           description: 'Lista completa adottata dalla Sc. Media L. da Vinci per la classe 1ª B.',          price: '€ 145,00', tag: 'Libri',       childTag: 'Per Giulia', accentColor: '#8b5cf6', badge: 'Prenotazione' },
    { title: 'Zaino ergonomico scuola media',     description: 'Zaino studiato per studenti delle medie. Disponibile in 4 colori.',                price: '€ 59,90', originalPrice: '€ 75,00', tag: 'Accessori', childTag: 'Per Giulia', accentColor: '#8b5cf6', badge: '-20%' },
    { title: 'Gita a Firenze – giugno 2025',      description: 'Gita scolastica di 2 giorni. Include pullman, alloggio e ingressi musei.',         price: '€ 85,00', tag: 'Attività',    childTag: 'Per Marco',  accentColor: '#3b82f6' },
    { title: 'Laboratorio robotica – dopo scuola', description: 'Corso extrascolastico settimanale da ottobre. 12 lezioni da 90 minuti.',         price: '€ 120,00', tag: 'Attività',   childTag: 'Per Marco',  accentColor: '#3b82f6' },
    { title: 'Diario scolastico 2025/2026',       description: 'Diario ufficiale ScuolaPay con spazio agenda, note e calendari scolastici.',      price: '€ 8,50',  tag: 'Materiali',   childTag: null,         accentColor: null },
    { title: 'Assicurazione scolastica annuale',  description: 'Copertura per infortuni e RC personale. Valida per tutti i plessi della scuola.', price: '€ 12,00', tag: 'Servizi',     childTag: null,         accentColor: null, badge: 'Nuovo' },
  ]

  const categories = ['Tutti', 'Materiali', 'Abbigliamento', 'Libri', 'Attività', 'Accessori', 'Servizi']
  const filtered = catFilter === 'Tutti' ? products : products.filter(p => p.tag === catFilter)

  return (
    <Stack gap={24}>
      {/* Hero banner */}
      <div style={{
        padding: '24px 28px', borderRadius: 14,
        background: C.bgRaised, border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${C.accent}`,
      }}>
        <Grid columns="1fr auto" gap={24} style={{ alignItems: 'center' }}>
          <Stack gap={8}>
            <Pill tone="info" active>Disponibile ora</Pill>
            <H2>Materiale scolastico A.S. 2025/2026</H2>
            <Text tone="secondary">
              I kit e i materiali per il prossimo anno scolastico sono disponibili. Ordina entro il{' '}
              <strong style={{ color: C.text }}>31 maggio</strong> per ricevere tutto a settembre.
            </Text>
            <Row gap={10}>
              <Button variant="primary">Sfoglia kit scuola</Button>
              <Button variant="secondary">Vedi liste classe per classe</Button>
            </Row>
          </Stack>
          <Grid columns={3} gap={10} style={{ minWidth: 240 }}>
            {CHILDREN_DATA.map(c => (
              <Stack key={c.name} gap={4} style={{ alignItems: 'center', padding: '10px 8px', background: C.fill, borderRadius: 8 }}>
                <Avatar name={`${c.name} ${c.surname}`} color={c.color} size={32} />
                <Text size="small" style={{ fontWeight: 600, textAlign: 'center' }}>{c.name}</Text>
                <Pill size="sm" style={{ background: `${c.color}18`, color: c.color, borderColor: `${c.color}44` }}>Kit disponibile</Pill>
              </Stack>
            ))}
          </Grid>
        </Grid>
      </div>

      {/* Categories */}
      <Row gap={16} style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Row gap={6} style={{ flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <Pill key={cat} active={catFilter === cat} onClick={() => setCatFilter(cat)}>{cat}</Pill>
          ))}
        </Row>
        <Text size="small" tone="secondary">{filtered.length} prodotti</Text>
      </Row>

      {/* Personalized section */}
      {catFilter === 'Tutti' && (
        <Stack gap={10}>
          <Row gap={8} style={{ alignItems: 'center' }}>
            <SectionLabel>SELEZIONATI PER I TUOI FIGLI</SectionLabel>
            <div style={{ flex: 1, height: 1, background: C.borderLight }} />
          </Row>
          <Grid columns={3} gap={14}>
            {products.filter(p => p.childTag && (p.badge === 'Consigliato' || p.badge === 'Prenotazione' || p.tag === 'Materiali')).slice(0, 3).map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </Grid>
        </Stack>
      )}

      {/* Full product grid */}
      <Stack gap={10}>
        <Row gap={8} style={{ alignItems: 'center' }}>
          <SectionLabel>{catFilter === 'Tutti' ? 'TUTTO LO STORE' : catFilter.toUpperCase()}</SectionLabel>
          <div style={{ flex: 1, height: 1, background: C.borderLight }} />
        </Row>
        <Grid columns={3} gap={14}>
          {filtered.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </Grid>
      </Stack>

      {/* Footer note */}
      <div style={{ padding: '14px 18px', background: C.fill, borderRadius: 8 }}>
        <Row gap={10} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Text size="small" tone="secondary">
            Tutti i prodotti sono gestiti direttamente dalle scuole attraverso ScuolaPay.
            I pagamenti vengono acquisiti in modo sicuro.
          </Text>
          <Button variant="ghost">Vedi condizioni store →</Button>
        </Row>
      </div>
    </Stack>
  )
}

function ScreenEnrollment() {
  const [toggle, setToggle] = useState(true)
  return (
    <Stack gap={24}>
      <Stack gap={4}>
        <Text tone="tertiary" size="small">Istituto Comprensivo "G. Verdi" — Bergamo</Text>
        <H2>Iscrizione online A.S. 2025/2026</H2>
        <Text tone="secondary">Compila il modulo per iscrivere tuo figlio al prossimo anno scolastico.</Text>
      </Stack>
      <Grid columns="1fr 380px" gap={28} style={{ alignItems: 'start' }}>
        <Stack gap={16}>
          <H3>Dati studente</H3>
          <Grid columns={2} gap={10}>
            <Field label="Nome studente"><Input placeholder="Marco" value="Marco" /></Field>
            <Field label="Cognome studente"><Input placeholder="Rossi" value="Rossi" /></Field>
          </Grid>
          <Field label="Data di nascita"><Input placeholder="gg/mm/aaaa" value="10/03/2017" /></Field>
          <Field label="Codice fiscale (opzionale)"><Input placeholder="XXXXXX00X00X000X" value="" /></Field>
          <Divider />
          <H3>Dati genitore / tutore</H3>
          <Grid columns={2} gap={10}>
            <Field label="Nome"><Input placeholder="Maria" value="Maria" /></Field>
            <Field label="Cognome"><Input placeholder="Rossi" value="" /></Field>
          </Grid>
          <Field label="Email"><Input placeholder="nome@email.it" value="maria.rossi@email.it" type="email" /></Field>
          <Field label="Telefono"><Input placeholder="+39 333 0000000" value="" /></Field>
          <Divider />
          <H3>Preferenze scolastiche</H3>
          <Field label="Classe richiesta">
            <Sel value="4a" options={[
              { value: '4a', label: '4ª elementare' },
              { value: '5a', label: '5ª elementare' },
            ]} />
          </Field>
          <Row gap={8}>
            <Button variant="primary">Invia iscrizione</Button>
            <Button variant="ghost">Salva bozza</Button>
          </Row>
        </Stack>

        {/* Embedded widget */}
        <div style={{
          border: `2px solid ${C.accent}`,
          borderRadius: 10, padding: 20,
          background: C.bgRaised,
        }}>
          <Stack gap={16}>
            <Stack gap={4}>
              <Row gap={8}>
                <Text style={{ fontWeight: 600, fontSize: 14 }}>Vuoi fare prima anche dopo?</Text>
                <Pill tone="info" active size="sm">Consigliato</Pill>
              </Row>
              <Text tone="secondary" size="small">
                Crea ora il tuo account ScuolaPay: potrai seguire iscrizione,
                pagamenti e documenti senza reinserire i dati.
              </Text>
            </Stack>
            <Stack gap={7}>
              {[
                "Segui lo stato dell'iscrizione in tempo reale",
                'Ricevi notifiche su pagamenti e scadenze',
                'Ritrova documenti e ricevute in ogni momento',
                'Checkout più veloce per ordini futuri',
              ].map((b, i) => (
                <Row key={i} gap={8}>
                  <div style={{ width: 5, height: 5, minWidth: 5, borderRadius: 3, background: C.accent, marginTop: 5 }} />
                  <Text tone="secondary" size="small">{b}</Text>
                </Row>
              ))}
            </Stack>
            <Divider />
            <Row gap={12} style={{ justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 600, fontSize: 13 }}>Crea il mio account ScuolaPay</Text>
              <Toggle checked={toggle} onChange={setToggle} />
            </Row>
            {toggle && (
              <Stack gap={10}>
                <Stack gap={6}>
                  <Field label="Email (precompilata dal modulo)">
                    <Input value="maria.rossi@email.it" type="email" />
                  </Field>
                  <Pill tone="info" size="sm">Precompilata automaticamente</Pill>
                </Stack>
                <Field label="Crea password">
                  <Input placeholder="Almeno 8 caratteri" value="" type="password" />
                </Field>
                <Text tone="tertiary" size="small">
                  L'account sarà creato al termine dell'invio del modulo.
                </Text>
              </Stack>
            )}
          </Stack>
        </div>
      </Grid>
    </Stack>
  )
}

function ScreenGuestSuccess({ goTo }) {
  return (
    <Grid columns="1fr 1fr" gap={48} style={{ alignItems: 'start' }}>
      <Stack gap={20}>
        <Stack gap={8}>
          <div><Pill tone="success" active>Pagamento completato</Pill></div>
          <H2>Ordine confermato</H2>
          <Text tone="secondary">
            Grazie per il tuo acquisto. La conferma è stata inviata a{' '}
            <span style={{ color: C.text, fontWeight: 600 }}>maria.rossi@email.it</span>
          </Text>
        </Stack>
        <Card>
          <CardHeader trailing={<Pill tone="success" active size="sm">Pagato</Pill>}>
            Ordine #2848
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Row gap={8} style={{ justifyContent: 'space-between' }}>
                <Text size="small">Kit materiale scolastico 3ª A</Text>
                <Text style={{ fontWeight: 600, fontSize: 13 }}>€ 42,90</Text>
              </Row>
              <Divider />
              <Row gap={8} style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 600, fontSize: 13 }}>Totale</Text>
                <Text style={{ fontWeight: 700, fontSize: 15 }}>€ 42,90</Text>
              </Row>
            </Stack>
          </CardBody>
        </Card>
        <Button variant="secondary">Scarica ricevuta PDF</Button>
      </Stack>
      <Stack gap={20}>
        <Stack gap={6}>
          <H3>Ritrova questo ordine in futuro</H3>
          <Text tone="secondary">
            Crea il tuo account ScuolaPay per accedere a ordini, pagamenti e ricevute in ogni momento.
          </Text>
        </Stack>
        <Stack gap={12}>
          {[
            { title: 'Ordine #2848 già salvato', desc: 'Non dovrai reinserire i dati per recuperarlo.' },
            { title: 'Checkout veloce', desc: 'La prossima volta paghi senza reinserire i dati.' },
            { title: 'Ricevute sempre disponibili', desc: 'Scarica ricevute e documenti quando vuoi.' },
            { title: 'Gestisci scuola e figli', desc: 'Un centro unico per pagamenti, iscrizioni e ordini.' },
          ].map(b => (
            <Stack gap={2} key={b.title}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>{b.title}</Text>
              <Text tone="secondary" size="small">{b.desc}</Text>
            </Stack>
          ))}
        </Stack>
        <Stack gap={10}>
          <Field label="Email (già inserita)">
            <Input value="maria.rossi@email.it" type="email" />
          </Field>
          <Field label="Crea password">
            <Input placeholder="Almeno 8 caratteri" value="" type="password" />
          </Field>
          <Button variant="primary" onClick={() => goTo('verify')}>Attiva il mio account</Button>
          <Text tone="tertiary" size="small" style={{ textAlign: 'center' }}>
            Puoi farlo anche dopo. La ricevuta è già stata inviata alla tua email.
          </Text>
        </Stack>
      </Stack>
    </Grid>
  )
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('signup')
  const isApp = APP_SCREENS.includes(screen)
  const isEnrollFlow = ENROLL_FLOW.includes(screen)

  const renderScreen = () => {
    switch (screen) {
      case 'signup': return <ScreenSignup goTo={setScreen} />
      case 'verify': return <ScreenVerify goTo={setScreen} />
      case 'recovery': return <ScreenRecovery goTo={setScreen} />
      case 'recovery-empty': return <ScreenRecoveryEmpty goTo={setScreen} />
      case 'profile': return <ScreenProfile goTo={setScreen} />
      case 'add-child': return <ScreenAddChild goTo={setScreen} />
      case 'add-child-invite': return <ScreenAddChildInvite goTo={setScreen} />
      case 'add-child-verify': return <ScreenAddChildVerify goTo={setScreen} />
      case 'dashboard': return <ScreenDashboard goTo={setScreen} />
      case 'child-detail': return <ScreenChildDetail goTo={setScreen} />
      case 'payments': return <ScreenPayments />
      case 'orders': return <ScreenOrders />
      case 'enrollment': return <ScreenEnrollment />
      case 'guest-success': return <ScreenGuestSuccess goTo={setScreen} />
      // Enrollment flow
      case 'enrollment-overview': return <ScreenEnrollmentOverview goTo={setScreen} />
      case 'enrollment-data': return <ScreenEnrollmentData goTo={setScreen} />
      case 'enrollment-signatures': return <ScreenEnrollmentSignatures goTo={setScreen} />
      case 'enrollment-sign-contract': return <ScreenEnrollmentSignContract goTo={setScreen} />
      case 'enrollment-sign-pending': return <ScreenEnrollmentSignPending goTo={setScreen} />
      case 'enrollment-payment': return <ScreenEnrollmentPayment goTo={setScreen} />
      case 'enrollment-documents': return <ScreenEnrollmentDocuments goTo={setScreen} />
      case 'enrollment-detail': return <ScreenEnrollmentDetail goTo={setScreen} />
      case 'enrollment-confirmation': return <ScreenEnrollmentConfirmation goTo={setScreen} />
      case 'promotions': return <ScreenPromotions goTo={setScreen} />
      case 'account': return <ScreenAccount goTo={setScreen} />
      case 'documents': return <ScreenDocuments goTo={setScreen} />
      default: return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      {/* Top nav */}
      <div style={{
        borderBottom: `1px solid ${C.border}`,
        background: C.bgRaised,
        position: 'sticky', top: 0, zIndex: 100,
        padding: '0 32px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gap={0} style={{ height: 52, justifyContent: 'space-between' }}>
            <Row gap={10}>
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px', color: C.text }}>ScuolaPay</span>
              <span style={{ width: 1, height: 16, background: C.border, display: 'inline-block' }} />
              <Text tone="tertiary" size="small">Mockup area account</Text>
            </Row>
            <Text tone="tertiary" size="small" style={{ fontStyle: 'italic' }}>
              {SCREEN_LABELS[screen]}
            </Text>
          </Row>
        </div>
      </div>

      {/* Screen navigator */}
      <div style={{ borderBottom: `1px solid ${C.borderLight}`, background: C.bgRaised, padding: '8px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Stack gap={6}>
            <Row gap={6} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
              <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px', marginRight: 4, whiteSpace: 'nowrap' }}>REGISTRAZIONE</Text>
              {AUTH_FLOW.map(s => (
                <Pill key={s} active={screen === s} onClick={() => setScreen(s)}>{SCREEN_LABELS[s]}</Pill>
              ))}
              <span style={{ width: 1, height: 16, background: C.border, margin: '0 4px', flexShrink: 0 }} />
              <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px', marginRight: 4, whiteSpace: 'nowrap' }}>APP</Text>
              {['dashboard', 'child-detail', 'payments', 'orders', 'promotions', 'enrollment', 'guest-success'].map(s => (
                <Pill key={s} active={screen === s} onClick={() => setScreen(s)}>{SCREEN_LABELS[s]}</Pill>
              ))}
            </Row>
            <Row gap={6} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
              <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px', marginRight: 4, whiteSpace: 'nowrap' }}>FLUSSO ISCRIZIONE</Text>
              {['enrollment-detail', 'enrollment-overview', 'enrollment-data', 'enrollment-signatures', 'enrollment-sign-contract', 'enrollment-sign-pending', 'enrollment-payment', 'enrollment-documents', 'enrollment-confirmation'].map(s => (
                <Pill key={s} active={screen === s} onClick={() => setScreen(s)}>{SCREEN_LABELS[s]}</Pill>
              ))}
            </Row>
          </Stack>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
        {isEnrollFlow ? (
          <div style={{ maxWidth: 960 }}>
            {renderScreen()}
          </div>
        ) : isApp ? (
          <Row gap={0} style={{ alignItems: 'flex-start' }}>
            {/* Sidebar */}
            <div style={{ width: 200, minWidth: 200, paddingRight: 24, borderRight: `1px solid ${C.borderLight}` }}>
              <Stack gap={4} style={{ paddingBottom: 16 }}>
                <Text style={{ fontWeight: 600, fontSize: 13 }}>Maria Rossi</Text>
                <Text tone="secondary" size="small">maria.rossi@email.it</Text>
              </Stack>
              <Divider style={{ marginBottom: 10 }} />
              <Stack gap={1}>
                {SIDEBAR_ITEMS.map((item, i) => (
                  <div
                    key={item.label + i}
                    onClick={() => setScreen(item.id)}
                    style={{
                      padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                      background: screen === item.id ? C.fill : 'transparent',
                      transition: 'background 0.1s',
                    }}
                  >
                    <Text
                      size="small"
                      style={{ fontWeight: screen === item.id ? 500 : 400, color: screen === item.id ? C.text : C.textSec }}
                    >
                      {item.label}
                    </Text>
                  </div>
                ))}
              </Stack>
            </div>

            {/* Main */}
            <div style={{ flex: 1, minWidth: 0, paddingLeft: 32 }}>
              {renderScreen()}
            </div>
          </Row>
        ) : (
          renderScreen()
        )}
        
      </div>
    </div>
  )
}
