import './index.css'

export default function DSCard({ title, extra, children, padded = true, className = '' }) {
  const classes = ['ds-card', 'ds-card-component', padded && 'ds-card-component--padded', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes}>
      {(title || extra) && (
        <header className="ds-card-component__header">
          {title && <strong>{title}</strong>}
          {extra && <div className="ds-card-component__extra">{extra}</div>}
        </header>
      )}
      <div className="ds-card-component__body">{children}</div>
    </section>
  )
}
