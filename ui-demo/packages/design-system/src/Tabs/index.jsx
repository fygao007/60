import './index.css'

export default function DSTabs({ items = [], activeKey, onChange, size = 'default', className = '' }) {
  const classes = ['ds-tabs', size === 'large' && 'ds-tabs--large', className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="页签">
      {items.map((item) => {
        const key = item.key || item.label
        return (
          <button
            className={['ds-tabs__item', key === activeKey && 'is-active'].filter(Boolean).join(' ')}
            type="button"
            disabled={item.disabled}
            key={key}
            onClick={() => onChange?.(key, item)}
          >
            <span>{item.label}</span>
            {typeof item.count === 'number' && <em>{item.count}</em>}
          </button>
        )
      })}
    </nav>
  )
}
