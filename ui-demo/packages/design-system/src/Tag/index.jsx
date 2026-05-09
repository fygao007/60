import './index.css'

const colorMap = {
  primary: 'ds-tag--primary',
  success: 'ds-tag--success',
  warning: 'ds-tag--warning',
  danger: 'ds-tag--danger',
  info: 'ds-tag--info',
  neutral: 'ds-tag--neutral',
}

export default function DSTag({ color = 'neutral', children, className = '' }) {
  const classes = ['ds-tag', colorMap[color] || colorMap.neutral, className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
