import React, { useState } from 'react'
import {
  C, Stack, Row, Grid, Divider, Spacer,
  H2, H3, Text, Label, Pill, Button, Stat,
  Card, CardHeader, CardBody, DataTable,
  Field, Input, Sel, Toggle, CheckBox,
} from './ui.jsx'

const SCREEN_LABELS = {
  signup: 'Login / Registrazione',
  verify: 'Verifica Email',
  recovery: 'Storico Trovato',
  'recovery-empty': 'Nessuno Storico',
  profile: 'Completa Profilo',
  'add-child': 'Aggiungi Figlio',
  dashboard: 'Dashboard',
  'child-detail': 'Dettaglio Figlio',
  payments: 'Lista Pagamenti',
  orders: 'Lista Ordini',
  enrollment: 'Flusso Iscrizione Online',
  'guest-success': 'Guest → Crea Account',
}

const AUTH_FLOW = ['signup', 'verify', 'recovery', 'recovery-empty', 'profile', 'add-child']
const APP_SCREENS = ['dashboard', 'child-detail', 'payments', 'orders']

const CHILDREN_DATA = [
  { name: 'Marco', surname: 'Rossi', school: 'Sc. Primaria G. Verdi', cls: '3ª A', age: 8 },
  { name: 'Sofia', surname: 'Rossi', school: 'Sc. Infanzia Arcobaleno', cls: 'Sez. B', age: 5 },
]

const PAYMENTS_DATA = [
  { id: 'p1', date: '15 apr 2025', desc: 'Mensa scolastica – Aprile', child: 'Marco', amount: '€ 78,00', status: 'Completato' },
  { id: 'p2', date: '10 apr 2025', desc: 'Gita scolastica – Firenze', child: 'Marco', amount: '€ 25,00', status: 'Completato' },
  { id: 'p3', date: '01 apr 2025', desc: 'Materiale didattico', child: 'Sofia', amount: '€ 45,50', status: 'Completato' },
  { id: 'p4', date: '15 mar 2025', desc: 'Mensa scolastica – Marzo', child: 'Marco', amount: '€ 78,00', status: 'Completato' },
  { id: 'p5', date: '05 mar 2025', desc: 'Contributo volontario', child: 'Sofia', amount: '€ 30,00', status: 'In attesa' },
  { id: 'p6', date: '12 feb 2025', desc: 'Laboratorio di musica', child: 'Marco', amount: '€ 60,00', status: 'Completato' },
]

const ORDERS_DATA = [
  { num: '#2847', date: '12 apr 2025', items: 'Kit materiale 3ª A (×1)', total: '€ 42,90', status: 'Consegnato' },
  { num: '#2651', date: '02 feb 2025', items: 'Felpa scuola (×2)', total: '€ 58,00', status: 'Consegnato' },
  { num: '#2589', date: '15 gen 2025', items: 'Diario scolastico (×1)', total: '€ 14,50', status: 'Consegnato' },
  { num: '#2401', date: '10 set 2024', items: 'Zaino scuola (×1)', total: '€ 75,00', status: 'Consegnato' },
]

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Home' },
  { id: 'child-detail', label: 'I miei figli' },
  { id: 'payments', label: 'Pagamenti' },
  { id: 'orders', label: 'Ordini' },
  { id: 'enrollment', label: 'Iscrizioni' },
  { id: 'child-detail', label: 'Documenti' },
  { id: 'profile', label: 'Profilo e sicurezza' },
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
    <Stack gap={24} style={{ maxWidth: 480 }}>
      <Stack gap={6}>
        <H2>Aggiungi un figlio</H2>
        <Text tone="secondary">Collega il profilo di tuo figlio per vedere pagamenti, ordini e attività correlati.</Text>
      </Stack>
      <Stack gap={12}>
        <Grid columns={2} gap={10}>
          <Field label="Nome"><Input placeholder="Marco" value="" /></Field>
          <Field label="Cognome"><Input placeholder="Rossi" value="" /></Field>
        </Grid>
        <Field label="Data di nascita (opzionale)"><Input placeholder="gg/mm/aaaa" value="" /></Field>
        <Field label="Scuola"><Input placeholder="Nome istituto scolastico" value="" /></Field>
        <Grid columns={2} gap={10}>
          <Field label="Classe / Sezione"><Input placeholder="es. 3ª A" value="" /></Field>
          <Field label="Anno scolastico">
            <Sel value="2024/2025" options={[
              { value: '2024/2025', label: '2024/2025' },
              { value: '2025/2026', label: '2025/2026' },
              { value: '2023/2024', label: '2023/2024' },
            ]} />
          </Field>
        </Grid>
        <Field label="Relazione">
          <Sel value="madre" options={[
            { value: 'madre', label: 'Madre' },
            { value: 'padre', label: 'Padre' },
            { value: 'tutore', label: 'Tutore legale' },
            { value: 'altro', label: 'Altro' },
          ]} />
        </Field>
      </Stack>
      <div style={{ padding: 14, background: C.fill, borderRadius: 8, border: `1px solid ${C.border}` }}>
        <Stack gap={8}>
          <Stack gap={2}>
            <Text style={{ fontWeight: 600, fontSize: 13 }}>Suggerimento dal tuo storico</Text>
            <Text tone="secondary" size="small">
              Abbiamo trovato ordini e pagamenti storicamente associati a uno studente di nome Marco.
              Vuoi collegare anche quello storico al profilo?
            </Text>
          </Stack>
          <Row gap={8}>
            <Button variant="secondary">Sì, collega</Button>
            <Button variant="ghost">No, grazie</Button>
          </Row>
        </Stack>
      </div>
      <Row gap={8}>
        <Button variant="primary" onClick={() => goTo('dashboard')}>Aggiungi figlio</Button>
        <Button variant="ghost" onClick={() => goTo('dashboard')}>Salta per ora</Button>
      </Row>
    </Stack>
  )
}

function ScreenDashboard({ goTo }) {
  return (
    <Stack gap={20}>
      <Stack gap={2}>
        <H2>Buongiorno, Maria</H2>
        <Text tone="tertiary" size="small">Lunedì 20 aprile 2025</Text>
      </Stack>
      <Grid columns={4} gap={12}>
        <Stat value="4" label="Ordini totali" />
        <Stat value="7" label="Pagamenti" tone="success" />
        <Stat value="3" label="Documenti" tone="info" />
        <Stat value="1" label="Iscrizione attiva" tone="warning" />
      </Grid>
      <Divider />
      <Grid columns="1fr 1fr" gap={24} style={{ alignItems: 'start' }}>
        <Stack gap={14}>
          <Row gap={8}>
            <H3>I miei figli</H3>
            <Spacer />
            <Button variant="ghost" onClick={() => goTo('add-child')}>+ Aggiungi</Button>
          </Row>
          {CHILDREN_DATA.map(child => (
            <Card key={child.name}>
              <CardHeader trailing={<Pill tone="success" active size="sm">Attivo</Pill>}>
                {child.name} {child.surname}
              </CardHeader>
              <CardBody>
                <Stack gap={10}>
                  <Text tone="secondary" size="small">{child.school}</Text>
                  <Row gap={6} style={{ flexWrap: 'wrap' }}>
                    <Pill size="sm">{child.cls}</Pill>
                    <Pill size="sm">A.S. 2024/2025</Pill>
                    <Pill size="sm">{child.age} anni</Pill>
                  </Row>
                  <Row gap={16}>
                    <Text tone="tertiary" size="small">2 pagamenti recenti</Text>
                    <Text tone="tertiary" size="small">1 ordine</Text>
                  </Row>
                  <Button variant="ghost" onClick={() => goTo('child-detail')}>Vedi dettaglio →</Button>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
        <Stack gap={14}>
          <Row gap={8}>
            <H3>Pagamenti recenti</H3>
            <Spacer />
            <Button variant="ghost" onClick={() => goTo('payments')}>Vedi tutti →</Button>
          </Row>
          <DataTable
            headers={['Data', 'Descrizione', 'Importo', 'Stato']}
            rows={PAYMENTS_DATA.slice(0, 3).map(p => [
              p.date, p.desc, p.amount,
              <Pill key={p.id} size="sm" tone={statusTone(p.status)} active>{p.status}</Pill>,
            ])}
          />
          <Divider />
          <H3>Iscrizioni attive</H3>
          <Card>
            <CardHeader trailing={<Pill tone="warning" active size="sm">In corso</Pill>}>
              Iscrizione A.S. 2025/2026
            </CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Text size="small">Scuola Primaria G. Verdi — Marco Rossi</Text>
                <Text tone="secondary" size="small">Inviata il 15 marzo 2025. In attesa di conferma dalla scuola.</Text>
                <Button variant="secondary">Segui stato iscrizione</Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
    </Stack>
  )
}

function ScreenChildDetail() {
  const marco = PAYMENTS_DATA.filter(p => p.child === 'Marco')
  return (
    <Stack gap={20}>
      <Row gap={14} style={{ alignItems: 'flex-start' }}>
        <Stack gap={3} style={{ flex: 1 }}>
          <H2>Marco Rossi</H2>
          <Text tone="secondary" size="small">Sc. Primaria G. Verdi · 3ª A · A.S. 2024/2025</Text>
        </Stack>
        <Button variant="secondary">Modifica</Button>
      </Row>
      <Row gap={6} style={{ flexWrap: 'wrap' }}>
        <Pill tone="success" active size="sm">Attivo</Pill>
        <Pill size="sm">8 anni</Pill>
        <Pill size="sm">Relazione: Madre</Pill>
      </Row>
      <Grid columns={3} gap={12}>
        <Stat value="4" label="Pagamenti" tone="success" />
        <Stat value="2" label="Ordini" tone="info" />
        <Stat value="2" label="Documenti" />
      </Grid>
      <Divider />
      <Stack gap={8}>
        <H3>Pagamenti</H3>
        <DataTable
          headers={['Data', 'Descrizione', 'Importo', 'Stato', 'Ricevuta']}
          rows={marco.map(p => [
            p.date, p.desc, p.amount,
            <Pill key={p.id} size="sm" tone={statusTone(p.status)} active>{p.status}</Pill>,
            p.status === 'Completato'
              ? <Button key={p.id + 'r'} variant="ghost">Scarica</Button>
              : <span key={p.id + 'r'} style={{ color: C.textTer }}>—</span>,
          ])}
        />
      </Stack>
      <Stack gap={8}>
        <H3>Ordini</H3>
        <DataTable
          headers={['Ordine', 'Data', 'Articoli', 'Totale', 'Stato']}
          rows={ORDERS_DATA.slice(0, 2).map(o => [
            o.num, o.date, o.items, o.total,
            <Pill key={o.num} size="sm" tone={statusTone(o.status)} active>{o.status}</Pill>,
          ])}
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
  return (
    <Stack gap={20}>
      <Stack gap={4}>
        <H2>Pagamenti</H2>
        <Text tone="secondary">Tutti i tuoi pagamenti ScuolaPay, filtrabili per figlio e stato.</Text>
      </Stack>
      <Grid columns={2} gap={16} style={{ alignItems: 'start' }}>
        <Stack gap={6}>
          <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px' }}>FIGLIO</Text>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {['Tutti', 'Marco', 'Sofia'].map(f => (
              <Pill key={f} active={childFilter === f} onClick={() => setChildFilter(f)}>{f}</Pill>
            ))}
          </Row>
        </Stack>
        <Stack gap={6}>
          <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px' }}>STATO</Text>
          <Row gap={6} style={{ flexWrap: 'wrap' }}>
            {['Tutti', 'Completato', 'In attesa', 'Fallito'].map(f => (
              <Pill key={f} active={statusFilter === f} onClick={() => setStatusFilter(f)}>{f}</Pill>
            ))}
          </Row>
        </Stack>
      </Grid>
      <DataTable
        headers={['Data', 'Descrizione', 'Figlio', 'Importo', 'Stato', 'Ricevuta']}
        rows={filtered.map(p => [
          p.date, p.desc, p.child, p.amount,
          <Pill key={p.id + 's'} size="sm" tone={statusTone(p.status)} active>{p.status}</Pill>,
          p.status === 'Completato'
            ? <Button key={p.id + 'd'} variant="ghost">Scarica</Button>
            : <span key={p.id + 'd'} style={{ color: C.textTer }}>—</span>,
        ])}
        emptyMessage="Nessun pagamento trovato per i filtri selezionati."
      />
      <Row gap={8} style={{ justifyContent: 'space-between' }}>
        <Text tone="secondary" size="small">{filtered.length} pagamenti trovati</Text>
        <Button variant="secondary">Esporta CSV</Button>
      </Row>
    </Stack>
  )
}

function ScreenOrders() {
  const [filter, setFilter] = useState('Tutti')
  const filtered = ORDERS_DATA.filter(o => filter === 'Tutti' || o.status === filter)
  return (
    <Stack gap={20}>
      <Stack gap={4}>
        <H2>Ordini</H2>
        <Text tone="secondary">I tuoi ordini dallo store ScuolaPay.</Text>
      </Stack>
      <Stack gap={6}>
        <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px' }}>STATO</Text>
        <Row gap={6} style={{ flexWrap: 'wrap' }}>
          {['Tutti', 'In elaborazione', 'Consegnato', 'Annullato'].map(f => (
            <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>
          ))}
        </Row>
      </Stack>
      <DataTable
        headers={['Ordine', 'Data', 'Articoli', 'Totale', 'Stato', 'Dettaglio']}
        rows={filtered.map(o => [
          o.num, o.date, o.items, o.total,
          <Pill key={o.num} size="sm" tone={statusTone(o.status)} active>{o.status}</Pill>,
          <Button key={o.num + 'd'} variant="ghost">Dettaglio</Button>,
        ])}
        emptyMessage="Nessun ordine trovato."
      />
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

  const renderScreen = () => {
    switch (screen) {
      case 'signup': return <ScreenSignup goTo={setScreen} />
      case 'verify': return <ScreenVerify goTo={setScreen} />
      case 'recovery': return <ScreenRecovery goTo={setScreen} />
      case 'recovery-empty': return <ScreenRecoveryEmpty goTo={setScreen} />
      case 'profile': return <ScreenProfile goTo={setScreen} />
      case 'add-child': return <ScreenAddChild goTo={setScreen} />
      case 'dashboard': return <ScreenDashboard goTo={setScreen} />
      case 'child-detail': return <ScreenChildDetail />
      case 'payments': return <ScreenPayments />
      case 'orders': return <ScreenOrders />
      case 'enrollment': return <ScreenEnrollment />
      case 'guest-success': return <ScreenGuestSuccess goTo={setScreen} />
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
      <div style={{ borderBottom: `1px solid ${C.borderLight}`, background: C.bgRaised, padding: '10px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Stack gap={8}>
            <Row gap={6} style={{ flexWrap: 'wrap', alignItems: 'center' }}>
              <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px', marginRight: 4 }}>REGISTRAZIONE</Text>
              {AUTH_FLOW.map(s => (
                <Pill key={s} active={screen === s} onClick={() => setScreen(s)}>{SCREEN_LABELS[s]}</Pill>
              ))}
              <span style={{ width: 1, height: 16, background: C.border, margin: '0 4px' }} />
              <Text tone="tertiary" size="small" style={{ fontWeight: 600, letterSpacing: '0.4px', marginRight: 4 }}>APP</Text>
              {['dashboard', 'child-detail', 'payments', 'orders', 'enrollment', 'guest-success'].map(s => (
                <Pill key={s} active={screen === s} onClick={() => setScreen(s)}>{SCREEN_LABELS[s]}</Pill>
              ))}
            </Row>
          </Stack>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
        {isApp ? (
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
