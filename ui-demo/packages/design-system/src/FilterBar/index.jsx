import DSButton from '../Button'
import './index.css'

export default function DSFilterBar({ fields = [], onSearch, onReset, className = '' }) {
  const classes = ['ds-filter-bar', 'ds-card', className].filter(Boolean).join(' ')

  return (
    <section className={classes} aria-label="查询筛选">
      {fields.map((field) => (
        <label className="ds-field" key={field.key || field.label}>
          <span>{field.label}</span>
          {field.type === 'select' ? (
            <select className="ds-select" defaultValue={field.value || field.options?.[0]?.value || field.options?.[0]}>
              {(field.options || []).map((option) => {
                const optionValue = typeof option === 'string' ? option : option.value
                const optionLabel = typeof option === 'string' ? option : option.label
                return <option value={optionValue} key={optionValue}>{optionLabel}</option>
              })}
            </select>
          ) : (
            <input className="ds-input" placeholder={field.placeholder} defaultValue={field.value} />
          )}
        </label>
      ))}
      <div className="ds-filter-bar__actions">
        <DSButton variant="default" onClick={onReset}>重置</DSButton>
        <DSButton onClick={onSearch}>查询</DSButton>
      </div>
    </section>
  )
}
