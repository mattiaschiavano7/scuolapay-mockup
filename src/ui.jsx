import React from 'react'

export const C = {
  bg: '#0d0d0d',
  bgRaised: '#161616',
  bgElevated: '#1e1e1e',
  fill: '#252525',
  fillHover: '#2e2e2e',
  border: '#2b2b2b',
  borderLight: '#1f1f1f',
  text: '#f0f0f0',
  textSec: '#888',
  textTer: '#484848',
  accent: '#3b82f6',
  accentFill: 'rgba(59,130,246,0.12)',
  success: '#22c55e',
  successFill: 'rgba(34,197,94,0.12)',
  warning: '#f59e0b',
  warningFill: 'rgba(245,158,11,0.12)',
  danger: '#ef4444',
  dangerFill: 'rgba(239,68,68,0.12)',
  info: '#3b82f6',
  infoFill: 'rgba(59,130,246,0.12)',
}

export const Stack = ({ children, gap = 8, style }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>
)

export const Row = ({ children, gap = 8, align = 'center', justify = 'flex-start', wrap, style }) => (
  <div style={{
    display: 'flex', flexDirection: 'row', gap,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align === 'stretch' ? 'stretch' : 'center',
    justifyContent: justify === 'space-between' ? 'space-between' : justify === 'center' ? 'center' : justify === 'end' ? 'flex-end' : 'flex-start',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  }}>{children}</div>
)

export const Grid = ({ children, columns = 2, gap = 12, style }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, minmax(0,1fr))` : columns,
    gap,
    ...style,
  }}>{children}</div>
)

export const Divider = ({ style }) => (
  <div style={{ height: 1, background: C.borderLight, ...style }} />
)

export const Spacer = () => <div style={{ flex: 1 }} />

export const H1 = ({ children, style }) => (
  <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: '-0.5px', lineHeight: 1.2, margin: 0, ...style }}>{children}</h1>
)

export const H2 = ({ children, style }) => (
  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, letterSpacing: '-0.4px', lineHeight: 1.2, margin: 0, ...style }}>{children}</h2>
)

export const H3 = ({ children, style }) => (
  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: 0, letterSpacing: '-0.1px', ...style }}>{children}</h3>
)

export const Text = ({ children, tone, size, weight, style }) => {
  const color = tone === 'secondary' ? C.textSec : tone === 'tertiary' ? C.textTer : C.text
  const fontSize = size === 'small' ? 12 : 14
  const fontWeight = weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400
  return <p style={{ fontSize, color, fontWeight, margin: 0, lineHeight: 1.5, ...style }}>{children}</p>
}

export const Label = ({ children, style }) => (
  <p style={{ fontSize: 12, fontWeight: 500, color: C.textSec, margin: '0 0 4px 0', ...style }}>{children}</p>
)

// ─── AVATAR ──────────────────────────────────────────────────────────────────
export const Avatar = ({ name, color = C.accent, size = 34, style }) => {
  const initials = (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: color + '22', border: `1.5px solid ${color}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.33, fontWeight: 700, color: color,
      flexShrink: 0, letterSpacing: '-0.5px',
      ...style,
    }}>
      {initials}
    </div>
  )
}

// ─── PILL ────────────────────────────────────────────────────────────────────
const PILL_TONES = {
  neutral: { bg: C.fill,         color: C.textSec, border: C.border },
  success: { bg: C.successFill,  color: C.success, border: C.success + '55' },
  warning: { bg: C.warningFill,  color: C.warning, border: C.warning + '55' },
  danger:  { bg: C.dangerFill,   color: C.danger,  border: C.danger  + '55' },
  deleted: { bg: C.dangerFill,   color: C.danger,  border: C.danger  + '55' },
  info:    { bg: C.infoFill,     color: C.info,    border: C.info    + '55' },
  added:   { bg: C.successFill,  color: C.success, border: C.success + '55' },
}

export const Pill = ({ children, tone = 'neutral', active, size = 'md', onClick, style }) => {
  const t = PILL_TONES[tone] || PILL_TONES.neutral
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: size === 'sm' ? '2px 7px' : '3px 11px',
        fontSize: size === 'sm' ? 11 : 12,
        fontWeight: 600, borderRadius: 999,
        border: `1px solid ${active || tone !== 'neutral' ? t.border : C.border}`,
        background: active || tone !== 'neutral' ? t.bg : C.fill,
        color: active || tone !== 'neutral' ? t.color : C.textSec,
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap', userSelect: 'none',
        transition: 'all 0.12s',
        letterSpacing: '0.1px',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// ─── BUTTON ──────────────────────────────────────────────────────────────────
export const Button = ({ children, variant = 'secondary', onClick, disabled, style }) => {
  const s = {
    primary:   { bg: C.accent,       color: '#fff',     border: C.accent },
    secondary: { bg: C.fill,         color: C.text,     border: C.border },
    ghost:     { bg: 'transparent',  color: C.textSec,  border: 'transparent' },
  }[variant] || { bg: C.fill, color: C.text, border: C.border }
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '6px 14px', borderRadius: 7, border: `1px solid ${s.border}`,
      background: s.bg, color: s.color, fontWeight: 500, fontSize: 13,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
      whiteSpace: 'nowrap', transition: 'opacity 0.1s', lineHeight: 1.4,
      ...style,
    }}>
      {children}
    </button>
  )
}

// ─── STAT ────────────────────────────────────────────────────────────────────
export const Stat = ({ value, label, tone, style }) => {
  const color = tone === 'success' ? C.success : tone === 'warning' ? C.warning : tone === 'danger' ? C.danger : tone === 'info' ? C.info : C.text
  const accentColor = tone ? color : C.border
  return (
    <div style={{
      padding: '14px 16px', background: C.bgRaised, borderRadius: 10,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${accentColor}`,
      ...style,
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1, letterSpacing: '-1px' }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textSec, marginTop: 6, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

// ─── CARD ────────────────────────────────────────────────────────────────────
export const Card = ({ children, style, accent }) => (
  <div style={{
    background: C.bgRaised, border: `1px solid ${C.border}`,
    borderRadius: 10, overflow: 'hidden',
    ...(accent ? { borderLeft: `3px solid ${accent}` } : {}),
    ...style,
  }}>
    {children}
  </div>
)

export const CardHeader = ({ children, trailing, style }) => (
  <div style={{
    padding: '10px 16px', borderBottom: `1px solid ${C.borderLight}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    fontSize: 12, fontWeight: 600, color: C.textSec,
    background: C.bgElevated, letterSpacing: '0.2px',
    ...style,
  }}>
    <span>{children}</span>
    {trailing && <span>{trailing}</span>}
  </div>
)

export const CardBody = ({ children, style }) => (
  <div style={{ padding: '14px 16px', ...style }}>{children}</div>
)

// ─── DATA TABLE ──────────────────────────────────────────────────────────────
export const DataTable = ({ headers, rows, emptyMessage }) => (
  <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: C.bgElevated }}>
          {headers.map((h, i) => (
            <th key={i} style={{
              padding: '9px 14px', textAlign: 'left', fontSize: 11,
              fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.border}`,
              whiteSpace: 'nowrap', letterSpacing: '0.3px',
            }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length} style={{ padding: '24px 14px', textAlign: 'center', color: C.textTer, fontSize: 13 }}>
              {emptyMessage || 'Nessun risultato.'}
            </td>
          </tr>
        ) : rows.map((row, ri) => (
          <tr key={ri} style={{
            borderBottom: ri < rows.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            transition: 'background 0.08s',
          }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: '10px 14px', fontSize: 13, color: C.text, verticalAlign: 'middle' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ─── FIELD / INPUT / SELECT ──────────────────────────────────────────────────
export const Field = ({ label, children }) => (
  <Stack gap={5}>
    <Label>{label}</Label>
    {children}
  </Stack>
)

export const Input = ({ placeholder, value, onChange, type = 'text', disabled }) => (
  <input
    type={type} placeholder={placeholder} value={value}
    onChange={e => onChange && onChange(e.target.value)} disabled={disabled}
    style={{
      width: '100%', padding: '8px 11px', borderRadius: 7,
      border: `1px solid ${C.border}`, background: disabled ? C.fill : C.bgElevated,
      color: disabled ? C.textSec : C.text, fontSize: 13, outline: 'none',
    }}
  />
)

export const Sel = ({ value, onChange, options }) => (
  <select value={value} onChange={e => onChange && onChange(e.target.value)} style={{
    width: '100%', padding: '8px 11px', borderRadius: 7,
    border: `1px solid ${C.border}`, background: C.bgElevated,
    color: C.text, fontSize: 13, outline: 'none', cursor: 'pointer',
  }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
)

// ─── TOGGLE / CHECKBOX ───────────────────────────────────────────────────────
export const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange && onChange(!checked)} style={{
    width: 38, height: 22, borderRadius: 11, cursor: 'pointer',
    background: checked ? C.accent : C.fill, border: `1px solid ${checked ? C.accent : C.border}`,
    position: 'relative', transition: 'background 0.15s', flexShrink: 0,
  }}>
    <div style={{
      position: 'absolute', top: 3, left: checked ? 19 : 3,
      width: 14, height: 14, borderRadius: 7,
      background: checked ? '#fff' : C.textSec,
      transition: 'left 0.15s',
    }} />
  </div>
)

export const CheckBox = ({ checked, onChange, label }) => (
  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer', fontSize: 13, color: C.textSec }}>
    <div onClick={() => onChange && onChange(!checked)} style={{
      width: 16, height: 16, borderRadius: 4, marginTop: 2, flexShrink: 0,
      border: `1.5px solid ${checked ? C.accent : C.border}`,
      background: checked ? C.accent : C.bgElevated,
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    }}>
      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span>{label}</span>
  </label>
)

// ─── STEPPER ─────────────────────────────────────────────────────────────────
export const Stepper = ({ steps, current }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
    {steps.map((step, i) => {
      const done = i < current
      const active = i === current
      return (
        <React.Fragment key={step}>
          {i > 0 && (
            <div style={{ flex: 1, height: 2, marginTop: 13, background: done ? C.success : C.border, minWidth: 12 }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, minWidth: 56 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              border: `2px solid ${done ? C.success : active ? C.accent : C.border}`,
              background: done ? C.success : active ? C.accentFill : C.bgElevated,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              color: done ? '#fff' : active ? C.accent : C.textTer,
            }}>
              {done
                ? <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : i + 1
              }
            </div>
            <span style={{
              fontSize: 11, textAlign: 'center', fontWeight: active ? 700 : 400,
              color: done ? C.success : active ? C.accent : C.textTer, whiteSpace: 'nowrap',
            }}>
              {step}
            </span>
          </div>
        </React.Fragment>
      )
    })}
  </div>
)

// ─── ALERT ───────────────────────────────────────────────────────────────────
export const Alert = ({ type = 'info', title, description, action, onAction, style }) => {
  const c = {
    info:    { bg: 'rgba(59,130,246,0.07)',  accent: '#3b82f6', color: '#5b9af8' },
    warning: { bg: 'rgba(245,158,11,0.07)', accent: '#f59e0b', color: '#f9b630' },
    danger:  { bg: 'rgba(239,68,68,0.07)',  accent: '#ef4444', color: '#f26565' },
    success: { bg: 'rgba(34,197,94,0.07)',  accent: '#22c55e', color: '#3fd172' },
  }[type] || { bg: C.fill, accent: C.border, color: C.text }
  return (
    <div style={{
      padding: '12px 14px', borderRadius: 8,
      background: c.bg, borderLeft: `3px solid ${c.accent}`,
      border: `1px solid ${c.accent}22`,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
      ...style,
    }}>
      <Stack gap={2} style={{ flex: 1 }}>
        {title && <p style={{ fontSize: 13, fontWeight: 600, color: c.color, margin: 0 }}>{title}</p>}
        {description && <p style={{ fontSize: 12, color: C.textSec, margin: 0 }}>{description}</p>}
      </Stack>
      {action && (
        <button onClick={onAction} style={{
          padding: '4px 10px', borderRadius: 5, border: `1px solid ${c.accent}44`,
          background: `${c.accent}15`, color: c.color, fontWeight: 600, fontSize: 12,
          cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {action}
        </button>
      )}
    </div>
  )
}

// ─── UPLOAD ZONE ─────────────────────────────────────────────────────────────
export const UploadZone = ({ label, initialStatus = 'idle', fileName, note, required }) => {
  const [status, setStatus] = React.useState(initialStatus)
  const sc = {
    idle:     { pillTone: 'neutral', pillLabel: 'Da caricare',  btnLabel: 'Carica', active: false },
    uploaded: { pillTone: 'success', pillLabel: 'Caricato',     btnLabel: 'Sostituisci', active: true },
    missing:  { pillTone: 'danger',  pillLabel: 'Mancante',     btnLabel: 'Carica', active: true },
    verified: { pillTone: 'success', pillLabel: 'Verificato',   btnLabel: null, active: true },
  }[status] || { pillTone: 'neutral', pillLabel: 'Da caricare', btnLabel: 'Carica', active: false }
  const accent = status === 'uploaded' || status === 'verified' ? C.success : status === 'missing' ? C.danger : C.border
  return (
    <div style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${accent}`, background: C.bgRaised }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Stack gap={3} style={{ flex: 1, minWidth: 160 }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{label}</span>
            {required && <Pill size="sm" tone="warning">Obbligatorio</Pill>}
          </div>
          {note && <span style={{ fontSize: 11, color: C.textTer }}>{note}</span>}
          {status === 'uploaded' && <span style={{ fontSize: 11, color: C.textSec }}>{fileName || 'documento_caricato.pdf'}</span>}
        </Stack>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <Pill size="sm" tone={sc.pillTone} active={sc.active}>{sc.pillLabel}</Pill>
          {sc.btnLabel && (
            <Button variant="secondary" onClick={() => setStatus(status === 'uploaded' ? 'idle' : 'uploaded')}>
              {sc.btnLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
export const Timeline = ({ events }) => (
  <Stack gap={0}>
    {events.map((e, i) => {
      const dotColor = e.type === 'success' ? C.success : e.type === 'warning' ? C.warning : e.type === 'pending' ? C.border : C.accent
      return (
        <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < events.length - 1 ? 18 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: dotColor, flexShrink: 0, marginTop: 4 }} />
            {i < events.length - 1 && <div style={{ width: 1, flex: 1, background: C.borderLight, marginTop: 4, minHeight: 14 }} />}
          </div>
          <Stack gap={2} style={{ flex: 1, paddingBottom: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: e.type === 'pending' ? C.textSec : C.text }}>{e.title}</span>
              <span style={{ fontSize: 11, color: C.textTer, whiteSpace: 'nowrap', flexShrink: 0 }}>{e.date}</span>
            </div>
            {e.description && <span style={{ fontSize: 12, color: C.textSec }}>{e.description}</span>}
          </Stack>
        </div>
      )
    })}
  </Stack>
)

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
export const ProductCard = ({ title, description, price, originalPrice, tag, childTag, badge, accentColor }) => {
  const [added, setAdded] = React.useState(false)
  return (
    <Card>
      <div style={{
        height: 96, background: accentColor ? `${accentColor}18` : C.fill,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '10px 12px',
      }}>
        {badge && <Pill size="sm" tone="warning" active>{badge}</Pill>}
        {!badge && <div />}
        {childTag && (
          <span style={{
            fontSize: 10, fontWeight: 700, color: accentColor || C.textSec,
            background: accentColor ? `${accentColor}20` : C.fill,
            border: `1px solid ${accentColor ? accentColor + '44' : C.border}`,
            padding: '2px 7px', borderRadius: 999,
          }}>
            {childTag}
          </span>
        )}
      </div>
      <CardBody style={{ padding: '12px 14px' }}>
        <Stack gap={10}>
          <Stack gap={4}>
            {tag && <div><Pill size="sm">{tag}</Pill></div>}
            <Text style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3 }}>{title}</Text>
            <Text size="small" tone="secondary">{description}</Text>
          </Stack>
          <Row gap={8} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack gap={1}>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: '-0.5px' }}>{price}</span>
              {originalPrice && (
                <span style={{ fontSize: 11, color: C.textTer, textDecoration: 'line-through' }}>{originalPrice}</span>
              )}
            </Stack>
            <Button
              variant={added ? 'secondary' : 'primary'}
              onClick={() => setAdded(!added)}
            >
              {added ? '✓ Aggiunto' : 'Aggiungi'}
            </Button>
          </Row>
        </Stack>
      </CardBody>
    </Card>
  )
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
export const SectionLabel = ({ children, style }) => (
  <p style={{
    fontSize: 11, fontWeight: 700, color: C.textTer,
    letterSpacing: '0.8px', textTransform: 'uppercase',
    margin: 0, ...style,
  }}>
    {children}
  </p>
)
