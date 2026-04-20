import React, { useState } from 'react'
import {
  C, Stack, Row, Grid, Divider, Spacer,
  H2, H3, Text, Label, Pill, Button, Stat,
  Card, CardHeader, CardBody, DataTable,
  Field, Input, Sel, CheckBox,
  Stepper, Alert, UploadZone, Timeline,
} from './ui.jsx'

const STEPS = ['Dati', 'Firme', 'Pagamento', 'Documenti', 'Conferma']

const SCHOOL = {
  name: 'Sc. Primaria G. Verdi',
  student: 'Marco Rossi',
  cls: '4ª A',
  year: '2025/2026',
  id: '#ISC-2025-0847',
}

const TIMELINE_EVENTS = [
  { type: 'success', title: 'Pratica creata', description: 'Iscrizione avviata dal modulo online della scuola.', date: '18 apr, 10:14' },
  { type: 'success', title: 'Dati inviati', description: 'Dati anagrafici di Marco Rossi confermati.', date: '18 apr, 10:22' },
  { type: 'success', title: 'Firma completata – Maria Rossi', description: 'Documento firmato digitalmente.', date: '20 apr, 14:32' },
  { type: 'warning', title: 'Firma in attesa – Luca Rossi', description: 'Link di firma inviato il 18 apr. Ancora da completare.', date: '18 apr, 10:25' },
  { type: 'pending', title: 'Pagamento contributo iscrizione', description: 'In attesa di completamento firma prima del pagamento.', date: 'In attesa' },
  { type: 'pending', title: 'Caricamento documenti', description: 'Alcuni documenti devono ancora essere caricati.', date: 'In attesa' },
  { type: 'pending', title: 'Conferma segreteria', description: 'La scuola invierà conferma entro 5 giorni lavorativi.', date: 'In attesa' },
]

function Breadcrumb({ goTo, current }) {
  return (
    <Row gap={6} style={{ flexWrap: 'wrap' }}>
      <button onClick={() => goTo('dashboard')} style={{ background: 'none', border: 'none', color: C.textSec, cursor: 'pointer', fontSize: 12, padding: 0 }}>
        Dashboard
      </button>
      <span style={{ color: C.textTer, fontSize: 12 }}>›</span>
      <button onClick={() => goTo('enrollment-detail')} style={{ background: 'none', border: 'none', color: C.textSec, cursor: 'pointer', fontSize: 12, padding: 0 }}>
        Iscrizioni
      </button>
      <span style={{ color: C.textTer, fontSize: 12 }}>›</span>
      <span style={{ fontSize: 12, color: C.text }}>{current}</span>
    </Row>
  )
}

function SummaryBar() {
  return (
    <div style={{ padding: '12px 16px', background: C.bgRaised, border: `1px solid ${C.border}`, borderRadius: 8 }}>
      <Row gap={0} style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Row gap={32} style={{ flexWrap: 'wrap' }}>
          {[
            ['Scuola', SCHOOL.name],
            ['Studente', SCHOOL.student],
            ['Classe', SCHOOL.cls],
            ['Anno scolastico', SCHOOL.year],
          ].map(([label, val]) => (
            <Stack gap={2} key={label}>
              <Text size="small" tone="tertiary">{label}</Text>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>{val}</Text>
            </Stack>
          ))}
        </Row>
        <Stack gap={2} style={{ textAlign: 'right' }}>
          <Text size="small" tone="tertiary">Pratica</Text>
          <Text style={{ fontWeight: 500, fontSize: 13 }}>{SCHOOL.id}</Text>
        </Stack>
      </Row>
    </div>
  )
}

function StepperSection({ current }) {
  return (
    <div style={{ padding: '16px 20px', background: C.bgRaised, border: `1px solid ${C.border}`, borderRadius: 8 }}>
      <Stepper steps={STEPS} current={current} />
    </div>
  )
}

// ─── 1. OVERVIEW ─────────────────────────────────────────────────────────────
export function ScreenEnrollmentOverview({ goTo }) {
  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Panoramica" />

      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Stack gap={4}>
          <H2>Iscrizione A.S. 2025/2026</H2>
          <Text tone="secondary">Scuola Primaria G. Verdi — Marco Rossi</Text>
        </Stack>
        <Pill tone="warning" active>In attesa firme</Pill>
      </Row>

      <StepperSection current={1} />
      <SummaryBar />

      <Alert
        type="warning"
        title="Firma richiesta — Luca Rossi non ha ancora firmato"
        description="L'iscrizione non può proseguire finché tutti i firmatari non hanno completato la firma. Hai inviato il link il 18 apr."
        action="Invia promemoria"
        onAction={() => {}}
      />

      <Grid columns="1fr 1fr" gap={16} style={{ alignItems: 'start' }}>
        <Stack gap={12}>
          <Card>
            <CardHeader trailing={<Pill size="sm" tone="success" active>Completata</Pill>}>Dati anagrafici</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">Genitore: Maria Rossi · CF RSSMRA85M41F205Z</Text>
                <Text size="small">Studente: Marco Rossi · CF RSSMRC17C10F205R</Text>
                <Button variant="ghost" onClick={() => goTo('enrollment-data')}>Modifica dati →</Button>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm" tone="warning" active>1/2 firme</Pill>}>Firme</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <Row gap={8} style={{ justifyContent: 'space-between' }}>
                  <Text size="small">Maria Rossi (Madre)</Text>
                  <Pill size="sm" tone="success" active>Firmato</Pill>
                </Row>
                <Row gap={8} style={{ justifyContent: 'space-between' }}>
                  <Text size="small">Luca Rossi (Padre)</Text>
                  <Pill size="sm" tone="warning" active>In attesa</Pill>
                </Row>
                <Button variant="secondary" onClick={() => goTo('enrollment-signatures')}>Gestisci firme →</Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Stack gap={12}>
          <Card>
            <CardHeader trailing={<Pill size="sm" tone="neutral">In attesa</Pill>}>Pagamento contributo</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">Importo: <strong style={{ color: C.text }}>€ 150,00</strong></Text>
                <Text size="small" tone="secondary">Disponibile dopo il completamento delle firme.</Text>
                <Button variant="ghost" disabled>Procedi al pagamento</Button>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm" tone="warning" active>2/4 caricati</Pill>}>Documenti richiesti</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">Carta d'identità — <span style={{ color: C.success }}>Caricata</span></Text>
                <Text size="small">Codice fiscale — <span style={{ color: C.success }}>Caricato</span></Text>
                <Text size="small">Certificato vaccinazioni — <span style={{ color: C.warning }}>Mancante</span></Text>
                <Text size="small">Certificazione DSA — <span style={{ color: C.textSec }}>Non applicabile</span></Text>
                <Button variant="ghost" onClick={() => goTo('enrollment-documents')}>Carica documenti →</Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Grid>

      <Divider />
      <Stack gap={8}>
        <H3>Cronologia pratica</H3>
        <Timeline events={TIMELINE_EVENTS.slice(0, 4)} />
      </Stack>
    </Stack>
  )
}

// ─── 2. DATA ENTRY ───────────────────────────────────────────────────────────
export function ScreenEnrollmentData({ goTo }) {
  const [foreignBirth, setForeignBirth] = useState(false)
  const [cfValid, setCfValid] = useState(true)
  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Dati" />
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack gap={4}>
          <H2>Dati per l'iscrizione</H2>
          <Text tone="secondary">Verifica e completa i dati prima di procedere con le firme.</Text>
        </Stack>
        <Pill size="sm" tone="info">Bozza salvata</Pill>
      </Row>

      <StepperSection current={0} />

      <Stack gap={20}>
        {/* Parent section */}
        <Card>
          <CardHeader>Genitore / tutore — Primo firmatario</CardHeader>
          <CardBody>
            <Stack gap={12}>
              <Grid columns={2} gap={10}>
                <Field label="Nome"><Input placeholder="Maria" value="Maria" /></Field>
                <Field label="Cognome"><Input placeholder="Rossi" value="Rossi" /></Field>
              </Grid>
              <Stack gap={4}>
                <Field label="Codice fiscale">
                  <div style={{ position: 'relative' }}>
                    <Input placeholder="XXXXXX00X00X000X" value="RSSMRA85M41F205Z" />
                  </div>
                </Field>
                <Row gap={6}>
                  <Pill size="sm" tone={cfValid ? 'success' : 'danger'} active>{cfValid ? 'CF valido' : 'CF non valido'}</Pill>
                  <Text size="small" tone="tertiary">Verificato automaticamente</Text>
                </Row>
              </Stack>
              <Grid columns={2} gap={10}>
                <Field label="Data di nascita"><Input placeholder="gg/mm/aaaa" value="01/08/1985" /></Field>
                <Stack gap={4}>
                  <Field label="Luogo di nascita">
                    <Input placeholder="Città" value={foreignBirth ? '' : 'Milano'} disabled={foreignBirth} />
                  </Field>
                  <Row gap={6} style={{ cursor: 'pointer' }} onClick={() => setForeignBirth(!foreignBirth)}>
                    <div style={{
                      width: 14, height: 14, borderRadius: 3, border: `1px solid ${foreignBirth ? C.accent : C.border}`,
                      background: foreignBirth ? C.accent : C.bgElevated, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {foreignBirth && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </div>
                    <Text size="small" tone="secondary">Nato/a all'estero</Text>
                  </Row>
                </Stack>
              </Grid>
              {foreignBirth && (
                <Alert type="info" title="Nato/a all'estero" description="Inserisci la nazione e la città estera. Potrebbe essere richiesto un documento aggiuntivo dalla scuola." />
              )}
              {foreignBirth && (
                <Grid columns={2} gap={10}>
                  <Field label="Nazione di nascita"><Input placeholder="es. Romania" value="" /></Field>
                  <Field label="Città di nascita"><Input placeholder="es. Bucarest" value="" /></Field>
                </Grid>
              )}
              <Grid columns={2} gap={10}>
                <Field label="Email"><Input placeholder="nome@email.it" value="maria.rossi@email.it" type="email" /></Field>
                <Field label="Telefono"><Input placeholder="+39 333 0000000" value="+39 333 1122334" /></Field>
              </Grid>
              <Field label="Indirizzo di residenza"><Input placeholder="Via Roma 1, 20100 Milano (MI)" value="Via Garibaldi 14, 24100 Bergamo (BG)" /></Field>
            </Stack>
          </CardBody>
        </Card>

        {/* Second signer */}
        <Card>
          <CardHeader trailing={<Text size="small" tone="tertiary">Richiesto dalla scuola</Text>}>Secondo genitore / tutore</CardHeader>
          <CardBody>
            <Stack gap={12}>
              <Alert type="info" title="Questa scuola richiede la firma di entrambi i genitori" description="Il secondo genitore riceverà un link di firma separato via email." />
              <Grid columns={2} gap={10}>
                <Field label="Nome"><Input placeholder="Luca" value="Luca" /></Field>
                <Field label="Cognome"><Input placeholder="Rossi" value="Rossi" /></Field>
              </Grid>
              <Field label="Email (per l'invio del link di firma)">
                <Input placeholder="nome@email.it" value="luca.rossi@email.it" type="email" />
              </Field>
            </Stack>
          </CardBody>
        </Card>

        {/* Student section */}
        <Card>
          <CardHeader>Dati studente</CardHeader>
          <CardBody>
            <Stack gap={12}>
              <Grid columns={2} gap={10}>
                <Field label="Nome"><Input placeholder="Marco" value="Marco" /></Field>
                <Field label="Cognome"><Input placeholder="Rossi" value="Rossi" /></Field>
              </Grid>
              <Stack gap={4}>
                <Field label="Codice fiscale studente"><Input placeholder="XXXXXX00X00X000X" value="RSSMRC17C10F205R" /></Field>
                <Pill size="sm" tone="success" active>CF valido</Pill>
              </Stack>
              <Grid columns={2} gap={10}>
                <Field label="Data di nascita"><Input placeholder="gg/mm/aaaa" value="10/03/2017" /></Field>
                <Field label="Luogo di nascita"><Input placeholder="Città" value="Bergamo" /></Field>
              </Grid>
              <Field label="Note sanitarie o esigenze speciali (opzionale)">
                <textarea
                  placeholder="Es. allergie, intolleranze, terapie in corso..."
                  rows={3}
                  style={{
                    width: '100%', padding: '8px 10px', borderRadius: 6,
                    border: `1px solid ${C.border}`, background: C.bgElevated,
                    color: C.text, fontSize: 13, resize: 'vertical', outline: 'none',
                  }}
                />
              </Field>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Row gap={10} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Button variant="ghost">Salva bozza e continua dopo</Button>
        <Row gap={10}>
          <Button variant="secondary" onClick={() => goTo('enrollment-overview')}>← Indietro</Button>
          <Button variant="primary" onClick={() => goTo('enrollment-signatures')}>Salva e vai alle firme →</Button>
        </Row>
      </Row>
    </Stack>
  )
}

// ─── 3. SIGNATURES PAGE ──────────────────────────────────────────────────────
export function ScreenEnrollmentSignatures({ goTo }) {
  const [sent, setSent] = useState(false)
  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Firme" />
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack gap={4}>
          <H2>Firme richieste</H2>
          <Text tone="secondary">Questa scuola richiede la firma digitale di entrambi i genitori per completare l'iscrizione.</Text>
        </Stack>
        <Pill tone="warning" active>1/2 firme</Pill>
      </Row>

      <StepperSection current={1} />

      <Alert
        type="info"
        title="Cosa stai firmando"
        description="Il contratto di iscrizione include: accettazione del regolamento scolastico, consenso al trattamento dei dati personali, impegno al pagamento del contributo di iscrizione annuale."
      />

      <Stack gap={12}>
        <H3>Firmatari</H3>

        {/* Signer 1 - signed */}
        <Card>
          <CardBody>
            <Row gap={12} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Stack gap={3}>
                <Text style={{ fontWeight: 600, fontSize: 14 }}>Maria Rossi</Text>
                <Text size="small" tone="secondary">Madre · Prima firmataria</Text>
                <Text size="small" tone="tertiary">Firmato il 20 apr 2025 alle 14:32</Text>
              </Stack>
              <Row gap={8} style={{ flexShrink: 0 }}>
                <Pill tone="success" active>Firmato</Pill>
                <Button variant="ghost">Visualizza firma</Button>
              </Row>
            </Row>
          </CardBody>
        </Card>

        {/* Signer 2 - pending */}
        <Card style={{ border: `1px solid ${C.warning}` }}>
          <CardBody>
            <Stack gap={12}>
              <Row gap={12} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Stack gap={3}>
                  <Text style={{ fontWeight: 600, fontSize: 14 }}>Luca Rossi</Text>
                  <Text size="small" tone="secondary">Padre · Secondo firmatario</Text>
                  <Text size="small" tone="tertiary">Link inviato il 18 apr 2025 a luca.rossi@email.it</Text>
                </Stack>
                <Row gap={8} style={{ flexShrink: 0 }}>
                  <Pill tone="warning" active>In attesa</Pill>
                  {!sent
                    ? <Button variant="secondary" onClick={() => setSent(true)}>Invia promemoria</Button>
                    : <Pill tone="success" active>Promemoria inviato</Pill>
                  }
                </Row>
              </Row>
              <div style={{ padding: '10px 14px', background: C.fill, borderRadius: 6 }}>
                <Stack gap={4}>
                  <Text size="small" weight="medium">Opzioni per il secondo firmatario</Text>
                  <Row gap={8} style={{ flexWrap: 'wrap' }}>
                    <Button variant="secondary">Copia link di firma</Button>
                    <Button variant="ghost">Invia via WhatsApp</Button>
                    <Button variant="ghost">Cambia email</Button>
                  </Row>
                </Stack>
              </div>
            </Stack>
          </CardBody>
        </Card>

        {/* Current user can sign */}
        <Alert
          type="success"
          title="Sei Maria Rossi? Hai già firmato il 20 apr."
          description="La tua firma è stata acquisita correttamente. Non è necessario firmare di nuovo."
        />
      </Stack>

      <Divider />
      <Stack gap={8}>
        <H3>Non sei ancora la prima firmataria?</H3>
        <Text tone="secondary" size="small">Se non hai ancora firmato, puoi farlo adesso. Visualizzerai il contratto e potrai firmarlo con verifica OTP.</Text>
        <div><Button variant="primary" onClick={() => goTo('enrollment-sign-contract')}>Firma il contratto adesso →</Button></div>
      </Stack>

      <Row gap={10} style={{ justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={() => goTo('enrollment-data')}>← Dati</Button>
        <Button variant="ghost" onClick={() => goTo('enrollment-sign-pending')}>Vedi stato firme dettagliato</Button>
      </Row>
    </Stack>
  )
}

// ─── 4. SIGN CONTRACT + OTP ──────────────────────────────────────────────────
export function ScreenEnrollmentSignContract({ goTo }) {
  const [step, setStep] = useState('preview') // preview | otp | success
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [consent3, setConsent3] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const allConsents = consent1 && consent2 && consent3

  if (step === 'success') {
    return (
      <Stack gap={24} style={{ maxWidth: 520 }}>
        <div style={{ padding: '24px', background: C.successFill, border: `1px solid ${C.success}`, borderRadius: 10, textAlign: 'center' }}>
          <Stack gap={8} style={{ alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M1 9l7 7L21 1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <H2>Firma completata</H2>
            <Text tone="secondary" style={{ textAlign: 'center' }}>
              Hai firmato il contratto di iscrizione di Marco Rossi per l'A.S. 2025/2026.
              La firma è stata acquisita digitalmente il 20 apr 2025 alle 14:32.
            </Text>
          </Stack>
        </div>
        <Card>
          <CardBody>
            <Stack gap={6}>
              <Text size="small" weight="medium">Riepilogo firma</Text>
              {[
                ['Firmatario', 'Maria Rossi (Madre)'],
                ['Data firma', '20 apr 2025, 14:32'],
                ['Metodo', 'OTP via SMS (+39 333 ****334)'],
                ['Documento', 'Contratto iscrizione A.S. 2025/2026'],
                ['Riferimento', SCHOOL.id],
              ].map(([k, v]) => (
                <Row key={k} gap={8} style={{ justifyContent: 'space-between' }}>
                  <Text size="small" tone="secondary">{k}</Text>
                  <Text size="small" style={{ fontWeight: 500 }}>{v}</Text>
                </Row>
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Row gap={10}>
          <Button variant="primary" onClick={() => goTo('enrollment-signatures')}>Torna alle firme</Button>
          <Button variant="ghost">Scarica copia firmata</Button>
        </Row>
      </Stack>
    )
  }

  if (step === 'otp') {
    return (
      <Stack gap={20} style={{ maxWidth: 480 }}>
        <Breadcrumb goTo={goTo} current="Firma contratto" />
        <Stack gap={6}>
          <H2>Verifica la tua identità</H2>
          <Text tone="secondary">Abbiamo inviato un codice di 6 cifre al numero <strong style={{ color: C.text }}>+39 333 ****334</strong> per confermare la tua firma.</Text>
        </Stack>
        <Alert type="info" title="Stai firmando con valore legale" description="Questa firma digitale via OTP ha validità ai sensi dell'art. 21 del D.Lgs. 82/2005 (CAD)." />
        <Stack gap={8}>
          <Label>Inserisci il codice OTP</Label>
          <Row gap={8}>
            {otp.map((v, i) => (
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
          <Text size="small" tone="tertiary">
            Non hai ricevuto il codice?{' '}
            <span style={{ color: C.accent, cursor: 'pointer', fontWeight: 500 }}>Rimanda tra 42 secondi</span>
          </Text>
        </Stack>
        <Row gap={10}>
          <Button variant="secondary" onClick={() => setStep('preview')}>← Indietro</Button>
          <Button variant="primary" onClick={() => setStep('success')}>Conferma firma</Button>
        </Row>
      </Stack>
    )
  }

  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Firma contratto" />
      <Stack gap={4}>
        <H2>Contratto di iscrizione</H2>
        <Text tone="secondary">Leggi attentamente prima di firmare. Puoi scaricare una copia in PDF.</Text>
      </Stack>

      <StepperSection current={1} />

      {/* Contract preview */}
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', background: C.bgElevated, borderBottom: `1px solid ${C.border}` }}>
          <Row gap={8} style={{ justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 600, fontSize: 13 }}>Contratto di iscrizione A.S. 2025/2026 — {SCHOOL.id}</Text>
            <Button variant="ghost">Scarica PDF</Button>
          </Row>
        </div>
        <div style={{ padding: '20px 24px', background: C.bgRaised, maxHeight: 280, overflowY: 'auto' }}>
          <Stack gap={12}>
            <Text style={{ fontWeight: 600 }}>CONTRATTO DI ISCRIZIONE</Text>
            <Text size="small" tone="secondary">Scuola Primaria G. Verdi — Anno Scolastico 2025/2026</Text>
            <Divider />
            <Stack gap={8}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>Articolo 1 — Parti</Text>
              <Text size="small" tone="secondary">
                Con il presente contratto, la famiglia Rossi (di seguito "Famiglia") e la Scuola Primaria G. Verdi (di seguito "Scuola")
                concordano le condizioni per l'iscrizione dell'alunno Marco Rossi, nato il 10/03/2017 a Bergamo,
                alla classe 4ª A dell'anno scolastico 2025/2026.
              </Text>
            </Stack>
            <Stack gap={8}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>Articolo 2 — Obblighi della Famiglia</Text>
              <Text size="small" tone="secondary">
                La Famiglia si impegna a: (a) versare il contributo annuale di iscrizione di € 150,00 entro i termini stabiliti;
                (b) rispettare il regolamento scolastico; (c) partecipare alle riunioni e agli incontri organizzati dalla Scuola;
                (d) informare tempestivamente la Scuola di eventuali cambiamenti nelle condizioni dello studente.
              </Text>
            </Stack>
            <Stack gap={8}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>Articolo 3 — Trattamento dei dati personali</Text>
              <Text size="small" tone="secondary">
                I dati personali forniti saranno trattati ai sensi del D.Lgs. 196/2003 e del GDPR (Reg. UE 2016/679)
                esclusivamente per finalità connesse all'erogazione del servizio scolastico.
                Il titolare del trattamento è la Scuola Primaria G. Verdi, Bergamo.
              </Text>
            </Stack>
            <Stack gap={8}>
              <Text style={{ fontWeight: 500, fontSize: 13 }}>Articolo 4 — Durata e recesso</Text>
              <Text size="small" tone="secondary">
                Il contratto ha durata annuale (settembre 2025 – giugno 2026). Il recesso anticipato è possibile
                con preavviso scritto di 30 giorni, fatta salva la quota già versata.
              </Text>
            </Stack>
          </Stack>
        </div>
      </div>

      {/* Consent checkboxes */}
      <Card>
        <CardHeader>Consensi obbligatori per la firma</CardHeader>
        <CardBody>
          <Stack gap={12}>
            <CheckBox
              checked={consent1}
              onChange={setConsent1}
              label="Ho letto e accetto integralmente il contratto di iscrizione e il regolamento scolastico della Scuola Primaria G. Verdi."
            />
            <CheckBox
              checked={consent2}
              onChange={setConsent2}
              label="Acconsento al trattamento dei dati personali miei e del minore per le finalità descritte nell'art. 3 del contratto."
            />
            <CheckBox
              checked={consent3}
              onChange={setConsent3}
              label="Mi impegno al pagamento del contributo di iscrizione di € 150,00 entro i termini stabiliti dalla Scuola."
            />
          </Stack>
        </CardBody>
      </Card>

      <Row gap={10} style={{ justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={() => goTo('enrollment-signatures')}>← Annulla</Button>
        <Button variant="primary" disabled={!allConsents} onClick={() => setStep('otp')}>
          {allConsents ? 'Procedi alla firma con OTP →' : 'Accetta tutti i consensi per continuare'}
        </Button>
      </Row>
    </Stack>
  )
}

// ─── 5. SIGN PENDING STATUS ──────────────────────────────────────────────────
export function ScreenEnrollmentSignPending({ goTo }) {
  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Stato firme" />
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack gap={4}>
          <H2>Stato delle firme</H2>
          <Text tone="secondary">Tieni traccia di chi ha già firmato e chi è ancora in attesa.</Text>
        </Stack>
        <Pill tone="warning" active>1 firma mancante</Pill>
      </Row>

      <StepperSection current={1} />

      <div style={{ padding: '16px 20px', background: C.bgRaised, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <Row gap={16} style={{ justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <Stack gap={4} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 700, color: C.success }}>1</Text>
            <Text size="small" tone="secondary">Firme completate</Text>
          </Stack>
          <div style={{ width: 1, background: C.borderLight }} />
          <Stack gap={4} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 700, color: C.warning }}>1</Text>
            <Text size="small" tone="secondary">In attesa</Text>
          </Stack>
          <div style={{ width: 1, background: C.borderLight }} />
          <Stack gap={4} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 700 }}>2</Text>
            <Text size="small" tone="secondary">Firme totali richieste</Text>
          </Stack>
        </Row>
      </div>

      <Stack gap={10}>
        {/* Signed */}
        <Card>
          <CardBody>
            <Stack gap={8}>
              <Row gap={12} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Stack gap={3}>
                  <Row gap={8}>
                    <Text style={{ fontWeight: 600, fontSize: 14 }}>Maria Rossi</Text>
                    <Pill tone="success" active size="sm">Firmato</Pill>
                  </Row>
                  <Text size="small" tone="secondary">Madre · Prima firmataria</Text>
                </Stack>
                <Stack gap={2} style={{ textAlign: 'right' }}>
                  <Text size="small" tone="tertiary">Firmato il</Text>
                  <Text size="small" style={{ fontWeight: 500 }}>20 apr 2025, 14:32</Text>
                </Stack>
              </Row>
              <div style={{ padding: '8px 12px', background: C.fill, borderRadius: 6 }}>
                <Row gap={8} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <Text size="small" tone="secondary">Metodo: OTP via SMS</Text>
                  <Text size="small" tone="secondary">IP: 192.168.1.xx · Bergamo, IT</Text>
                  <Button variant="ghost">Scarica copia firmata</Button>
                </Row>
              </div>
            </Stack>
          </CardBody>
        </Card>

        {/* Pending */}
        <Card style={{ border: `1px solid rgba(224,154,48,0.4)` }}>
          <CardBody>
            <Stack gap={12}>
              <Row gap={12} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Stack gap={3}>
                  <Row gap={8}>
                    <Text style={{ fontWeight: 600, fontSize: 14 }}>Luca Rossi</Text>
                    <Pill tone="warning" active size="sm">In attesa</Pill>
                  </Row>
                  <Text size="small" tone="secondary">Padre · Secondo firmatario</Text>
                </Stack>
                <Stack gap={2} style={{ textAlign: 'right' }}>
                  <Text size="small" tone="tertiary">Link inviato il</Text>
                  <Text size="small" style={{ fontWeight: 500 }}>18 apr 2025, 10:25</Text>
                </Stack>
              </Row>
              <Alert
                type="warning"
                title="Link di firma non ancora aperto"
                description="Luca Rossi non ha ancora aperto il link inviato a luca.rossi@email.it. Puoi inviare un promemoria o rigenerare il link."
              />
              <Row gap={8} style={{ flexWrap: 'wrap' }}>
                <Button variant="primary">Invia promemoria via email</Button>
                <Button variant="secondary">Copia link di firma</Button>
                <Button variant="ghost">Invia via WhatsApp</Button>
                <Button variant="ghost">Rigenera link</Button>
              </Row>
              <Text size="small" tone="tertiary">
                Il link scade il <strong style={{ color: C.text }}>25 apr 2025</strong>. Dopo questa data dovrai rigenerarlo.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Divider />
      <Stack gap={8}>
        <H3>Cronologia richieste firma</H3>
        <Timeline events={[
          { type: 'success', title: 'Firma completata — Maria Rossi', description: 'Contratto firmato digitalmente con OTP.', date: '20 apr, 14:32' },
          { type: 'success', title: 'Link firma aperto — Maria Rossi', description: 'Il link è stato aperto dal dispositivo mobile.', date: '20 apr, 14:28' },
          { type: 'success', title: 'Link firma inviato — Maria Rossi', description: 'Email inviata a maria.rossi@email.it', date: '18 apr, 10:25' },
          { type: 'warning', title: 'Link firma inviato — Luca Rossi', description: 'Email inviata a luca.rossi@email.it. Non ancora aperta.', date: '18 apr, 10:25' },
        ]} />
      </Stack>

      <Row gap={10} style={{ justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={() => goTo('enrollment-signatures')}>← Torna alle firme</Button>
        <Button variant="ghost" onClick={() => goTo('enrollment-payment')}>Vai al pagamento →</Button>
      </Row>
    </Stack>
  )
}

// ─── 6. PAYMENT ──────────────────────────────────────────────────────────────
export function ScreenEnrollmentPayment({ goTo }) {
  const [paid, setPaid] = useState(false)
  const [method, setMethod] = useState('carta')

  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Pagamento" />
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack gap={4}>
          <H2>Pagamento contributo iscrizione</H2>
          <Text tone="secondary">La Scuola Primaria G. Verdi richiede il pagamento del contributo di iscrizione.</Text>
        </Stack>
        <Pill tone={paid ? 'success' : 'warning'} active>{paid ? 'Pagato' : 'Da completare'}</Pill>
      </Row>

      <StepperSection current={2} />

      {paid ? (
        <Stack gap={16}>
          <div style={{ padding: 20, background: C.successFill, border: `1px solid ${C.success}`, borderRadius: 10 }}>
            <Stack gap={8} style={{ alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M1 8l6 6L19 1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <H2>Pagamento completato</H2>
              <Text tone="secondary" style={{ textAlign: 'center' }}>
                Il pagamento di <strong style={{ color: C.text }}>€ 150,00</strong> è stato acquisito correttamente.
                Riceverai ricevuta fiscale a maria.rossi@email.it
              </Text>
            </Stack>
          </div>
          <Card>
            <CardBody>
              <Stack gap={6}>
                {[
                  ['Importo', '€ 150,00'],
                  ['Causale', 'Contributo iscrizione A.S. 2025/2026 — Marco Rossi'],
                  ['Metodo', 'Carta di credito ****4521'],
                  ['Data', '20 apr 2025, 15:10'],
                  ['ID transazione', 'TRN-2025-0847-A'],
                ].map(([k, v]) => (
                  <Row key={k} gap={8} style={{ justifyContent: 'space-between' }}>
                    <Text size="small" tone="secondary">{k}</Text>
                    <Text size="small" style={{ fontWeight: 500 }}>{v}</Text>
                  </Row>
                ))}
              </Stack>
            </CardBody>
          </Card>
          <Row gap={10}>
            <Button variant="secondary">Scarica ricevuta</Button>
            <Button variant="primary" onClick={() => goTo('enrollment-documents')}>Vai ai documenti →</Button>
          </Row>
        </Stack>
      ) : (
        <Stack gap={16}>
          <Alert
            type="info"
            title="Pagamento disponibile"
            description="Entrambe le firme sono state completate. Puoi ora procedere al pagamento del contributo di iscrizione."
          />

          <Card>
            <CardHeader>Dettaglio pagamento</CardHeader>
            <CardBody>
              <Stack gap={10}>
                <Row gap={8} style={{ justifyContent: 'space-between' }}>
                  <Text size="small" tone="secondary">Contributo iscrizione A.S. 2025/2026</Text>
                  <Text style={{ fontWeight: 700, fontSize: 18 }}>€ 150,00</Text>
                </Row>
                <Text size="small" tone="tertiary">Causale: Iscrizione Marco Rossi — classe 4ª A — {SCHOOL.id}</Text>
                <Divider />
                <Text size="small" tone="secondary">Il pagamento deve essere completato entro il <strong style={{ color: C.text }}>30 aprile 2025</strong>.</Text>
              </Stack>
            </CardBody>
          </Card>

          <Stack gap={8}>
            <H3>Metodo di pagamento</H3>
            <Stack gap={8}>
              {[
                { id: 'carta', label: 'Carta di credito / debito', desc: 'Visa, Mastercard, American Express' },
                { id: 'pagopa', label: 'PagoPA', desc: 'Pagamento tramite circuito PagoPA' },
                { id: 'bonifico', label: 'Bonifico bancario', desc: 'I dati IBAN verranno forniti dopo la conferma' },
              ].map(m => (
                <div
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{
                    padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                    border: `1px solid ${method === m.id ? C.accent : C.border}`,
                    background: method === m.id ? C.accentFill : C.bgRaised,
                  }}
                >
                  <Row gap={10}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 8, flexShrink: 0,
                      border: `2px solid ${method === m.id ? C.accent : C.border}`,
                      background: method === m.id ? C.accent : C.bgElevated,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {method === m.id && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#fff' }} />}
                    </div>
                    <Stack gap={2}>
                      <Text style={{ fontWeight: 500, fontSize: 13 }}>{m.label}</Text>
                      <Text size="small" tone="secondary">{m.desc}</Text>
                    </Stack>
                  </Row>
                </div>
              ))}
            </Stack>
          </Stack>

          <Row gap={10} style={{ justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => goTo('enrollment-sign-pending')}>← Firme</Button>
            <Button variant="primary" onClick={() => setPaid(true)}>Paga € 150,00 →</Button>
          </Row>
        </Stack>
      )}
    </Stack>
  )
}

// ─── 7. DOCUMENTS ────────────────────────────────────────────────────────────
export function ScreenEnrollmentDocuments({ goTo }) {
  const requiredDocs = [
    { label: "Carta d'identità genitore", note: 'Fronte e retro in un unico file PDF o JPG', initialStatus: 'uploaded', fileName: 'carta_identita_maria_rossi.pdf', required: true },
    { label: 'Codice fiscale studente', note: 'Tessera sanitaria o documento equivalente', initialStatus: 'uploaded', fileName: 'codice_fiscale_marco.pdf', required: true },
    { label: 'Certificato vaccinazioni', note: 'Libretto vaccinale o certificato ASL in corso di validità', initialStatus: 'missing', required: true },
    { label: "Carta d'identità studente", note: 'Se disponibile. Obbligatoria per studenti di età superiore ai 10 anni.', initialStatus: 'idle', required: false },
  ]
  const optionalDocs = [
    { label: 'Certificazione DSA / BES', note: 'Solo se applicabile. Diagnosi rilasciata da struttura sanitaria accreditata.', initialStatus: 'idle', required: false },
    { label: 'Verbale GLHO / PEI', note: 'Solo per alunni con disabilità certificata (L. 104/92).', initialStatus: 'idle', required: false },
    { label: 'Altra documentazione specifica', note: 'Su richiesta della scuola. Consulta la segreteria per dettagli.', initialStatus: 'idle', required: false },
  ]
  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Documenti" />
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack gap={4}>
          <H2>Documenti richiesti</H2>
          <Text tone="secondary">Carica i documenti necessari per completare l'iscrizione di Marco Rossi.</Text>
        </Stack>
        <Pill tone="warning" active>2/4 caricati</Pill>
      </Row>

      <StepperSection current={3} />

      <Alert
        type="info"
        title="Formati accettati: PDF, JPG, PNG — dimensione massima 5 MB per file"
        description="I documenti vengono trasmessi in modo sicuro e cifrato direttamente alla segreteria scolastica."
      />

      <Stack gap={16}>
        <Stack gap={8}>
          <H3>Documenti obbligatori</H3>
          <Stack gap={8}>
            {requiredDocs.map((d, i) => <UploadZone key={i} {...d} />)}
          </Stack>
        </Stack>

        <Divider />

        <Stack gap={8}>
          <H3>Documenti opzionali</H3>
          <Text size="small" tone="secondary">Carica solo se applicabile alla situazione del tuo studente.</Text>
          <Stack gap={8}>
            {optionalDocs.map((d, i) => <UploadZone key={i} {...d} />)}
          </Stack>
        </Stack>
      </Stack>

      <Row gap={10} style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Text size="small" tone="tertiary">I documenti possono essere caricati anche in un secondo momento dall'area Iscrizioni.</Text>
        <Row gap={10}>
          <Button variant="secondary" onClick={() => goTo('enrollment-payment')}>← Pagamento</Button>
          <Button variant="primary" onClick={() => goTo('enrollment-confirmation')}>Invia pratica →</Button>
        </Row>
      </Row>
    </Stack>
  )
}

// ─── 8. ENROLLMENT DETAIL HUB ────────────────────────────────────────────────
export function ScreenEnrollmentDetail({ goTo }) {
  return (
    <Stack gap={20}>
      <Row gap={12} style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Stack gap={4}>
          <H2>Iscrizioni</H2>
          <Text tone="secondary">Panoramica di tutte le pratiche di iscrizione del tuo account.</Text>
        </Stack>
        <Button variant="secondary" onClick={() => goTo('enrollment')}>+ Nuova iscrizione</Button>
      </Row>

      {/* Active enrollment */}
      <Stack gap={8}>
        <H3>Iscrizioni attive</H3>
        <Card>
          <CardHeader trailing={<Pill size="sm" tone="warning" active>In attesa firme</Pill>}>
            Marco Rossi — A.S. 2025/2026
          </CardHeader>
          <CardBody>
            <Stack gap={14}>
              <Grid columns={3} gap={12}>
                <Stack gap={2}>
                  <Text size="small" tone="tertiary">Scuola</Text>
                  <Text style={{ fontWeight: 500, fontSize: 13 }}>{SCHOOL.name}</Text>
                </Stack>
                <Stack gap={2}>
                  <Text size="small" tone="tertiary">Classe richiesta</Text>
                  <Text style={{ fontWeight: 500, fontSize: 13 }}>{SCHOOL.cls}</Text>
                </Stack>
                <Stack gap={2}>
                  <Text size="small" tone="tertiary">Pratica</Text>
                  <Text style={{ fontWeight: 500, fontSize: 13 }}>{SCHOOL.id}</Text>
                </Stack>
              </Grid>

              <Stepper steps={STEPS} current={1} />

              <Alert
                type="warning"
                title="Azione richiesta — Firma in attesa"
                description="Luca Rossi (Padre) non ha ancora completato la firma. Invia un promemoria per sbloccare la pratica."
                action="Gestisci firme"
                onAction={() => goTo('enrollment-signatures')}
              />

              <Grid columns={2} gap={12}>
                <div style={{ padding: '10px 14px', background: C.fill, borderRadius: 6 }}>
                  <Row gap={8} style={{ justifyContent: 'space-between' }}>
                    <Text size="small">Firme</Text>
                    <Pill size="sm" tone="warning" active>1/2</Pill>
                  </Row>
                </div>
                <div style={{ padding: '10px 14px', background: C.fill, borderRadius: 6 }}>
                  <Row gap={8} style={{ justifyContent: 'space-between' }}>
                    <Text size="small">Documenti</Text>
                    <Pill size="sm" tone="warning" active>2/4</Pill>
                  </Row>
                </div>
                <div style={{ padding: '10px 14px', background: C.fill, borderRadius: 6 }}>
                  <Row gap={8} style={{ justifyContent: 'space-between' }}>
                    <Text size="small">Pagamento</Text>
                    <Pill size="sm" tone="neutral">In attesa</Pill>
                  </Row>
                </div>
                <div style={{ padding: '10px 14px', background: C.fill, borderRadius: 6 }}>
                  <Row gap={8} style={{ justifyContent: 'space-between' }}>
                    <Text size="small">Conferma scuola</Text>
                    <Pill size="sm" tone="neutral">In attesa</Pill>
                  </Row>
                </div>
              </Grid>

              <Row gap={8}>
                <Button variant="primary" onClick={() => goTo('enrollment-overview')}>Apri pratica →</Button>
                <Button variant="ghost" onClick={() => goTo('enrollment-sign-pending')}>Stato firme</Button>
                <Button variant="ghost" onClick={() => goTo('enrollment-documents')}>Documenti</Button>
              </Row>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      {/* Completed enrollment history */}
      <Stack gap={8}>
        <H3>Iscrizioni precedenti</H3>
        <DataTable
          headers={['Anno', 'Scuola', 'Studente', 'Classe', 'Stato']}
          rows={[
            ['2024/2025', 'Sc. Primaria G. Verdi', 'Marco Rossi', '3ª A', <Pill key="p1" size="sm" tone="success" active>Completata</Pill>],
            ['2023/2024', 'Sc. Primaria G. Verdi', 'Marco Rossi', '2ª A', <Pill key="p2" size="sm" tone="success" active>Completata</Pill>],
            ['2024/2025', 'Sc. Infanzia Arcobaleno', 'Sofia Rossi', 'Sez. B', <Pill key="p3" size="sm" tone="success" active>Completata</Pill>],
          ]}
        />
      </Stack>
    </Stack>
  )
}

// ─── 9. CONFIRMATION ─────────────────────────────────────────────────────────
export function ScreenEnrollmentConfirmation({ goTo }) {
  const [config, setConfig] = useState('pending') // pending | confirmed | immediate

  return (
    <Stack gap={20}>
      <Breadcrumb goTo={goTo} current="Conferma" />

      <StepperSection current={4} />

      {/* Config selector (for mockup purposes) */}
      <Stack gap={6}>
        <Text size="small" tone="tertiary" style={{ fontWeight: 600 }}>SCENARIO (demo)</Text>
        <Row gap={6} style={{ flexWrap: 'wrap' }}>
          <Pill active={config === 'pending'} onClick={() => setConfig('pending')}>In validazione</Pill>
          <Pill active={config === 'confirmed'} onClick={() => setConfig('confirmed')}>Confermata</Pill>
          <Pill active={config === 'immediate'} onClick={() => setConfig('immediate')}>Conferma immediata</Pill>
        </Row>
      </Stack>

      {config === 'immediate' && (
        <div style={{ padding: 28, background: C.successFill, border: `1px solid ${C.success}`, borderRadius: 12, textAlign: 'center' }}>
          <Stack gap={12} style={{ alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none"><path d="M1 10l8 8L25 1" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <H2>Iscrizione confermata!</H2>
            <Text tone="secondary" style={{ textAlign: 'center', maxWidth: 400 }}>
              L'iscrizione di Marco Rossi per l'A.S. 2025/2026 è stata confermata immediatamente dalla Scuola Primaria G. Verdi.
              Riceverai email di conferma a maria.rossi@email.it.
            </Text>
          </Stack>
        </div>
      )}

      {config === 'confirmed' && (
        <div style={{ padding: 28, background: C.successFill, border: `1px solid ${C.success}`, borderRadius: 12, textAlign: 'center' }}>
          <Stack gap={12} style={{ alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none"><path d="M1 10l8 8L25 1" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <H2>Iscrizione confermata dalla segreteria</H2>
            <Text tone="secondary" style={{ textAlign: 'center', maxWidth: 400 }}>
              La segreteria scolastica ha esaminato e confermato la pratica {SCHOOL.id}.
              Marco Rossi è ufficialmente iscritto alla classe 4ª A per l'A.S. 2025/2026.
            </Text>
          </Stack>
        </div>
      )}

      {config === 'pending' && (
        <div style={{ padding: 28, background: C.infoFill, border: `1px solid rgba(74,143,240,0.4)`, borderRadius: 12, textAlign: 'center' }}>
          <Stack gap={12} style={{ alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" stroke="#fff" strokeWidth="2"/>
                <path d="M11 7v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <H2>Pratica inviata — in validazione</H2>
            <Text tone="secondary" style={{ textAlign: 'center', maxWidth: 440 }}>
              La tua richiesta di iscrizione è stata inviata correttamente alla Scuola Primaria G. Verdi.
              La segreteria esaminerà la pratica entro 5 giorni lavorativi e ti invierà una conferma via email.
            </Text>
          </Stack>
        </div>
      )}

      {/* Summary */}
      <Card>
        <CardHeader>Riepilogo pratica</CardHeader>
        <CardBody>
          <Stack gap={6}>
            {[
              ['Pratica', SCHOOL.id],
              ['Studente', SCHOOL.student],
              ['Scuola', SCHOOL.name],
              ['Anno scolastico', SCHOOL.year],
              ['Classe richiesta', SCHOOL.cls],
              ['Data invio', '20 apr 2025, 15:30'],
              ['Firme', '2/2 completate'],
              ['Pagamento', '€ 150,00 completato'],
              ['Documenti', '3/4 caricati'],
            ].map(([k, v]) => (
              <Row key={k} gap={8} style={{ justifyContent: 'space-between' }}>
                <Text size="small" tone="secondary">{k}</Text>
                <Text size="small" style={{ fontWeight: 500 }}>{v}</Text>
              </Row>
            ))}
          </Stack>
        </CardBody>
      </Card>

      {/* What happens next */}
      <Stack gap={8}>
        <H3>Cosa succede adesso</H3>
        <Stack gap={10}>
          {(config === 'pending' ? [
            { n: '1', title: 'La segreteria esamina la pratica', desc: 'Entro 5 giorni lavorativi dalla data di invio.' },
            { n: '2', title: 'Ricevi notifica di conferma o richiesta integrazioni', desc: "Controlla l'email maria.rossi@email.it" },
            { n: '3', title: 'La pratica diventa ufficiale', desc: "L'iscrizione di Marco Rossi sarà definitivamente confermata." },
          ] : [
            { n: '1', title: 'Email di conferma in arrivo', desc: 'Controlla la tua email per la conferma ufficiale.' },
            { n: '2', title: 'Documenti fiscali disponibili', desc: 'Ricevuta di pagamento e contratto firmato scaricabili dal tuo account.' },
            { n: '3', title: 'Informazioni per il nuovo anno', desc: 'La scuola ti contatterà prima di settembre con dettagli su materiali e calendario.' },
          ]).map(item => (
            <Row gap={12} style={{ alignItems: 'flex-start' }} key={item.n}>
              <div style={{
                width: 24, height: 24, minWidth: 24, borderRadius: 12, background: C.fill,
                border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: C.textSec,
              }}>{item.n}</div>
              <Stack gap={2}>
                <Text style={{ fontWeight: 500, fontSize: 13 }}>{item.title}</Text>
                <Text size="small" tone="secondary">{item.desc}</Text>
              </Stack>
            </Row>
          ))}
        </Stack>
      </Stack>

      <Row gap={10} style={{ flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => goTo('enrollment-detail')}>Vai alle mie iscrizioni</Button>
        <Button variant="secondary" onClick={() => goTo('dashboard')}>Torna alla dashboard</Button>
        <Button variant="ghost">Scarica riepilogo PDF</Button>
      </Row>
    </Stack>
  )
}
