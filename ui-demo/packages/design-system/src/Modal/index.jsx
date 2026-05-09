import DSButton from '../Button'
import './index.css'

export default function DSModal({
  open = false,
  title = '提示',
  children,
  footer,
  width = 480,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  className = '',
}) {
  if (!open) return null

  return (
    <div className="ds-modal__overlay" role="presentation">
      <section
        className={['ds-modal', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ width }}
      >
        <header className="ds-modal__header">
          <h3>{title}</h3>
          <button type="button" aria-label="关闭" onClick={onCancel}>
            ×
          </button>
        </header>
        <div className="ds-modal__body">{children}</div>
        <footer className="ds-modal__footer">
          {footer || (
            <>
              <DSButton variant="default" onClick={onCancel}>
                {cancelText}
              </DSButton>
              <DSButton onClick={onOk}>{okText}</DSButton>
            </>
          )}
        </footer>
      </section>
    </div>
  )
}
