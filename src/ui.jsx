import React from 'react'

export const C = {
  bg: '#141414',
  bgRaised: '#1e1e1e',
  bgElevated: '#252525',
  fill: '#2a2a2a',
  fillHover: '#333',
  border: '#333',
  borderLight: '#282828',
  text: '#e2e2e2',
  textSec: '#888',
  textTer: '#555',
  accent: '#4a8ff0',
  accentFill: 'rgba(74,143,240,0.12)',
  success: '#3ac47a',
  successFill: 'rgba(58,196,122,0.12)',
  warning: '#e09a30',
  warningFill: 'rgba(224,154,48,0.12)',
  danger: '#e05050',
  dangerFill: 'rgba(224,80,80,0.12)',
  info: '#4a8ff0',
  infoFill: 'rgba(74,143,240,0.12)',
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
  <h1 style={{ fontSize: 22, fontWeight: 600, color: C.text, letterSpacing: '-0.3px', ...style }}>{children}</h1>
)

export const H2 = ({ children, style }) => (
  <h2 style={{ fontSize: 18, fontWeight: 600, color: C.text, letterSpacing: '-0.2px', ...style }}>{children}</h2>
)

export const H3 = ({ children, style }) => (
  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, ...style }}>{children}</h3>
)

export const Text = ({ children, tone, size, weight, style }) => {
  const color = tone === 'secondary' ? C.textSec : tone === 'tertiary' ? C.textTer : C.text
  const fontSize = size === 'small' ? 12 : 14
  const fontWeight = weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400
  return <p style={{ fontSize, color, fontWeight, ...style }}>{children}</p>
}

export const Label = ({ children, style }) => (
  <p style={{ fontSize: 12, fontWeight: 500, color: C.textSec, marginBottom: 4, ...style }}>{children}</p>
)

const PILL_TONES = {
  neutral: { bg: C.fill, color: C.textSec, border: C.border },
  success: { bg: C.successFill, color: C.success, border: C.success },
  warning: { bg: C.warningFill, color: C.warning, border: C.warning },
  danger: { bg: C.dangerFill, color: C.danger, border: C.danger },
  deleted: { bg: C.dangerFill, color: C.danger, border: C.danger },
  info: { bg: C.infoFill, color: C.info, border: C.info },
  added: { bg: C.successFill, color: C.success, border: C.success },
}

export const Pill = ({ children, tone = 'neutral', active, size = 'md', onClick, style }) => {
  const t = PILL_TONES[tone] || PILL_TONES.neutral
  const isClickable = !!onClick
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: size === 'sm' ? '1px 6px' : '3px 10px',
        fontSize: size === 'sm' ? 11 : 12,
        fontWeight: 500,
        borderRadius: 999,
        border: `1px solid ${active || tone !== 'neutral' ? t.border : C.border}`,
        background: active ? t.bg : tone !== 'neutral' ? t.bg : C.fill,
        color: active || tone !== 'neutral' ? t.color : C.textSec,
        cursor: isClickable ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        transition: 'background 0.12s, border-color 0.12s',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export const Button = ({ children, variant = 'secondary', onClick, disabled, style }) => {
  const styles = {
    primary: { bg: C.accent, color: '#fff', border: C.accent },
    secondary: { bg: C.fill, color: C.text, border: C.border },
    ghost: { bg: 'transparent', color: C.textSec, border: 'transparent' },
  }
  const s = styles[variant] || styles.secondary
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 14px', borderRadius: 6, border: `1px solid ${s.border}`,
        background: s.bg, color: s.color, fontWeight: 500, fontSize: 13,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap', transition: 'opacity 0.12s',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export const Stat = ({ value, label, tone }) => {
  const color = tone === 'success' ? C.success : tone === 'warning' ? C.warning : tone === 'danger' ? C.danger : tone === 'info' ? C.info : C.text
  return (
    <div style={{ padding: '12px 16px', background: C.bgRaised, borderRadius: 8, border: `1px solid ${C.borderLight}` }}>
      <div style={{ fontSize: 26, fontWeight: 700, color, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>{label}</div>
    </div>
  )
}

export const Card = ({ children, style }) => (
  <div style={{ background: C.bgRaised, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', ...style }}>
    {children}
  </div>
)

export const CardHeader = ({ children, trailing, style }) => (
  <div style={{
    padding: '8px 14px', borderBottom: `1px solid ${C.borderLight}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    fontSize: 12, fontWeight: 600, color: C.textSec, background: C.bgElevated,
    ...style,
  }}>
    <span>{children}</span>
    {trailing && <span>{trailing}</span>}
  </div>
)

export const CardBody = ({ children, style }) => (
  <div style={{ padding: '12px 14px', ...style }}>{children}</div>
)

export const DataTable = ({ headers, rows, emptyMessage }) => (
  <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: C.bgElevated }}>
          {headers.map((h, i) => (
            <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: C.textSec, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={headers.length} style={{ padding: '20px 12px', textAlign: 'center', color: C.textTer, fontSize: 13 }}>
              {emptyMessage || 'Nessun risultato.'}
            </td>
          </tr>
        ) : rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: '9px 12px', fontSize: 13, color: C.text, verticalAlign: 'middle' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const Field = ({ label, children }) => (
  <Stack gap={4}>
    <Label>{label}</Label>
    {children}
  </Stack>
)

export const Input = ({ placeholder, value, onChange, type = 'text', disabled }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange && onChange(e.target.value)}
    disabled={disabled}
    style={{
      width: '100%', padding: '7px 10px', borderRadius: 6,
      border: `1px solid ${C.border}`, background: disabled ? C.fill : C.bgElevated,
      color: C.text, fontSize: 13, outline: 'none',
      opacity: disabled ? 0.6 : 1,
    }}
  />
)

export const Sel = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={e => onChange && onChange(e.target.value)}
    style={{
      width: '100%', padding: '7px 10px', borderRadius: 6,
      border: `1px solid ${C.border}`, background: C.bgElevated,
      color: C.text, fontSize: 13, outline: 'none', cursor: 'pointer',
    }}
  >
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
)

export const Toggle = ({ checked, onChange }) => (
  <div
    onClick={() => onChange && onChange(!checked)}
    style={{
      width: 36, height: 20, borderRadius: 10, cursor: 'pointer',
      background: checked ? C.accent : C.fill,
      border: `1px solid ${checked ? C.accent : C.border}`,
      position: 'relative', transition: 'background 0.15s',
      flexShrink: 0,
    }}
  >
    <div style={{
      position: 'absolute', top: 2, left: checked ? 18 : 2,
      width: 14, height: 14, borderRadius: 7,
      background: checked ? '#fff' : C.textSec,
      transition: 'left 0.15s',
    }} />
  </div>
)

// ─── STEPPER ─────────────────────────────────────────────────────────────────
const CheckSvg = () => (
  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
    <path d="M1 4.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const Stepper = ({ steps, current }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
    {steps.map((step, i) => {
      const done = i < current
      const active = i === current
      return (
        <React.Fragment key={step}>
          {i > 0 && (
            <div style={{ flex: 1, height: 2, marginTop: 13, background: done ? C.success : C.borderLight, minWidth: 16 }} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 56 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              border: `2px solid ${done ? C.success : active ? C.accent : C.border}`,
              background: done ? C.success : active ? C.accentFill : C.bgElevated,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              color: done ? '#fff' : active ? C.accent : C.textTer,
            }}>
              {done ? <CheckSvg /> : i + 1}
            </div>
            <span style={{
              fontSize: 11, textAlign: 'center', fontWeight: active ? 600 : 400,
              color: done ? C.success : active ? C.accent : C.textTer,
              whiteSpace: 'nowrap',
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
    info:    { bg: 'rgba(74,143,240,0.08)',  border: 'rgba(74,143,240,0.35)',  color: '#4a8ff0' },
    warning: { bg: 'rgba(224,154,48,0.08)', border: 'rgba(224,154,48,0.35)', color: '#e09a30' },
    danger:  { bg: 'rgba(224,80,80,0.08)',  border: 'rgba(224,80,80,0.35)',  color: '#e05050' },
    success: { bg: 'rgba(58,196,122,0.08)', border: 'rgba(58,196,122,0.35)', color: '#3ac47a' },
  }[type] || { bg: C.fill, border: C.border, color: C.text }
  return (
    <div style={{
      padding: '11px 14px', borderRadius: 8,
      background: c.bg, border: `1px solid ${c.border}`,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
      ...style,
    }}>
      <Stack gap={2} style={{ flex: 1 }}>
        {title && <p style={{ fontSize: 13, fontWeight: 600, color: c.color, margin: 0 }}>{title}</p>}
        {description && <p style={{ fontSize: 12, color: C.textSec, margin: 0 }}>{description}</p>}
      </Stack>
      {action && (
        <button onClick={onAction} style={{
          padding: '3px 10px', borderRadius: 5, border: `1px solid ${c.border}`,
          background: 'transparent', color: c.color, fontWeight: 500, fontSize: 12,
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
    idle:     { pillTone: 'neutral', pillLabel: 'Da caricare', btnLabel: 'Carica', active: false },
    uploaded: { pillTone: 'success', pillLabel: 'Caricato',    btnLabel: 'Sostituisci', active: true },
    missing:  { pillTone: 'danger',  pillLabel: 'Mancante',    btnLabel: 'Carica', active: true },
    verified: { pillTone: 'success', pillLabel: 'Verificato',  btnLabel: null, active: true },
  }[status] || { pillTone: 'neutral', pillLabel: 'Da caricare', btnLabel: 'Carica', active: false }
  const borderColor = (status === 'uploaded' || status === 'verified') ? C.success : status === 'missing' ? C.danger : C.border
  const bg = (status === 'uploaded' || status === 'verified') ? 'rgba(58,196,122,0.05)' : status === 'missing' ? 'rgba(224,80,80,0.05)' : C.bgRaised
  return (
    <div style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${borderColor}`, background: bg }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Stack gap={3} style={{ flex: 1, minWidth: 160 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{label}</span>
            {required && <Pill size="sm" tone="warning">Obbligatorio</Pill>}
          </div>
          {note && <span style={{ fontSize: 11, color: C.textTer }}>{note}</span>}
          {status === 'uploaded' && <span style={{ fontSize: 11, color: C.textSec }}>{fileName || 'documento_caricato.pdf'}</span>}
        </Stack>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <Pill size="sm" tone={sc.pillTone} active={sc.active}>{sc.pillLabel}</Pill>
          {sc.btnLabel && (
            <Button
              variant="secondary"
              onClick={() => setStatus(status === 'uploaded' ? 'idle' : 'uploaded')}
            >
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
            {i < events.length - 1 && (
              <div style={{ width: 1, flex: 1, background: C.borderLight, marginTop: 4, minHeight: 14 }} />
            )}
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

export const CheckBox = ({ checked, onChange, label }) => (
  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 13, color: C.textSec }}>
    <div
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 16, height: 16, borderRadius: 4, marginTop: 1, flexShrink: 0,
        border: `1px solid ${checked ? C.accent : C.border}`,
        background: checked ? C.accent : C.bgElevated,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    {label}
  </label>
)
