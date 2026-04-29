import DSButton from '../Button'
import './index.css'

export default function DSEmptyState({
  title = '暂无数据',
  description = '暂无数据，请创建后查看',
  actionText,
  onAction,
  icon = '＋',
  className = '',
}) {
  const classes = ['ds-empty-state', 'ds-card', className].filter(Boolean).join(' ')

  return (
    <section className={classes} aria-label={title}>
      <div className="ds-empty-state__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionText && <DSButton onClick={onAction}>{actionText}</DSButton>}
    </section>
  )
}
