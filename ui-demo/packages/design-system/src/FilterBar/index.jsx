import DSButton from '../Button'
import DSField, { DSInput, DSSelect } from '../Field'
import './index.css'

export default function DSFilterBar({ fields = [], onSearch, onReset, className = '' }) {
  const classes = ['ds-filter-bar', 'ds-card', className].filter(Boolean).join(' ')

  return (
    <section className={classes} aria-label="查询筛选">
      {fields.map((field) => (
        <DSField label={field.label} key={field.key || field.label}>
          {field.type === 'select' ? (
            <DSSelect options={field.options || []} defaultValue={field.value || field.options?.[0]?.value || field.options?.[0]} />
          ) : (
            <DSInput placeholder={field.placeholder} defaultValue={field.value} />
          )}
        </DSField>
      ))}
      <div className="ds-filter-bar__actions">
        <DSButton variant="default" onClick={onReset}>重置</DSButton>
        <DSButton onClick={onSearch}>查询</DSButton>
      </div>
    </section>
  )
}
