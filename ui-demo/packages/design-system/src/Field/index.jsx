import './index.css'

export function DSInput({ className = '', ...props }) {
  return <input className={['ds-input', className].filter(Boolean).join(' ')} {...props} />
}

export function DSSelect({ options = [], className = '', children, ...props }) {
  return (
    <select className={['ds-select', className].filter(Boolean).join(' ')} {...props}>
      {children ||
        options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const label = typeof option === 'string' ? option : option.label
          return (
            <option value={value} key={value}>
              {label}
            </option>
          )
        })}
    </select>
  )
}

export function DSTextarea({ className = '', ...props }) {
  return <textarea className={['ds-textarea', className].filter(Boolean).join(' ')} {...props} />
}

export default function DSField({
  label,
  required = false,
  help,
  error,
  children,
  className = '',
  labelClassName = '',
}) {
  const classes = ['ds-field', error && 'ds-field--error', className].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      {label && (
        <span className={['ds-field__label', labelClassName].filter(Boolean).join(' ')}>
          {required && <b aria-hidden="true">*</b>}
          {label}
        </span>
      )}
      {children}
      {(error || help) && <span className="ds-field__message">{error || help}</span>}
    </label>
  )
}
