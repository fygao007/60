import './index.css'

export const PROCESS_STATUS_GROUPS = {
  before: ['未开始', '未提交', '草稿'],
  active: ['进行中', '处理中', '待审核', '待审批', '待处理'],
  positive: ['已完成', '已转发', '已移交', '已委派', '已跳转', '补正发起', '补正回复', '已通过'],
  negative: ['已退回', '已驳回', '已终止', '强行终止', '待重新提交', '不通过'],
  cancelled: ['已撤回', '已取消', '已撤销'],
  invalid: ['已作废', '已失效', '已过期', '报名已结束'],
}

const statusToneMap = new Map([
  ...PROCESS_STATUS_GROUPS.before.map((status) => [status, 'neutral']),
  ...PROCESS_STATUS_GROUPS.active.map((status) => [status, 'primary']),
  ...PROCESS_STATUS_GROUPS.positive.map((status) => [status, 'success']),
  ...PROCESS_STATUS_GROUPS.negative.map((status) => [status, 'danger']),
  ...PROCESS_STATUS_GROUPS.cancelled.map((status) => [status, 'neutral']),
  ...PROCESS_STATUS_GROUPS.invalid.map((status) => [status, 'neutral']),
])

const toneAliases = {
  error: 'danger',
  processing: 'primary',
  default: 'neutral',
}

export function getProcessStatusTone(status, fallback = 'neutral') {
  return statusToneMap.get(status) || fallback
}

export default function DSTag({
  color,
  tone,
  status,
  variant = 'filled',
  icon,
  children,
  className = '',
  ...restProps
}) {
  const content = children ?? status
  const resolvedTone = toneAliases[tone || color] || tone || color || getProcessStatusTone(status || content)
  const classes = [
    'ds-tag',
    'ds-process-tag',
    `ds-process-tag--${variant}`,
    `ds-tag--${resolvedTone}`,
    className,
  ].filter(Boolean).join(' ')
  const showDefaultIcon = variant === 'icon' && icon !== false

  if (variant === 'stamp') {
    return (
      <span className={classes} title={typeof content === 'string' ? content : undefined} {...restProps}>
        <span className="ds-process-tag__stamp-shape" aria-hidden="true" />
        <span className="ds-process-tag__stamp-text">{content}</span>
      </span>
    )
  }

  return (
    <span className={classes} {...restProps}>
      {icon && icon !== true ? (
        <span className="ds-process-tag__custom-icon" aria-hidden="true">{icon}</span>
      ) : null}
      {showDefaultIcon ? <span className="ds-process-tag__icon" aria-hidden="true" /> : null}
      <span className="ds-process-tag__label">{content}</span>
    </span>
  )
}
