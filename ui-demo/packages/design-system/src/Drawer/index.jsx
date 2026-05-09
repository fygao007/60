import DSButton from '../Button'
import './index.css'

export default function DSDrawer({
  open = false,
  title = '详情',
  children,
  footer,
  width = 520,
  placement = 'right',
  onClose,
  className = '',
}) {
  if (!open) return null

  return (
    <div className="ds-drawer__overlay" role="presentation">
      <aside
        className={['ds-drawer', `ds-drawer--${placement}`, className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ width }}
      >
        <header className="ds-drawer__header">
          <h3>{title}</h3>
          <button type="button" aria-label="关闭" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="ds-drawer__body">{children}</div>
        <footer className="ds-drawer__footer">
          {footer || (
            <DSButton variant="default" onClick={onClose}>
              关闭
            </DSButton>
          )}
        </footer>
      </aside>
    </div>
  )
}
