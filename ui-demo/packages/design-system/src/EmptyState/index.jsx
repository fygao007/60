import DSButton from '../Button'
import './index.css'

const ASSETS = {
  noData: new URL('./assets/no-data.svg', import.meta.url).href,
  noTodo: new URL('./assets/no-todo.svg', import.meta.url).href,
  noPermission: new URL('./assets/no-permission.svg', import.meta.url).href,
  networkError: new URL('./assets/network-error.svg', import.meta.url).href,
  noMessage: new URL('./assets/no-message.svg', import.meta.url).href,
  noSearch: new URL('./assets/no-search.svg', import.meta.url).href,
  maintenance: new URL('./assets/maintenance.svg', import.meta.url).href,
  loadFailed: new URL('./assets/load-failed.svg', import.meta.url).href,
  guide: new URL('./assets/guide.svg', import.meta.url).href,
  actionAdd: new URL('./assets/action-add.svg', import.meta.url).href,
  actionReference: new URL('./assets/action-reference.svg', import.meta.url).href,
  actionExport: new URL('./assets/action-export.svg', import.meta.url).href,
  actionImport: new URL('./assets/action-import.svg', import.meta.url).href,
  arrowRight: new URL('./assets/arrow-right.svg', import.meta.url).href,
}

export const EMPTY_STATE_PRESETS = {
  data: { title: '暂无数据', image: ASSETS.noData, actionText: '新建' },
  todo: { title: '暂无待办', image: ASSETS.noTodo },
  permission: { title: '暂无权限', image: ASSETS.noPermission, actionText: '申请权限' },
  network: { title: '网络异常', image: ASSETS.networkError, actionText: '重新加载' },
  message: { title: '暂无消息', image: ASSETS.noMessage },
  search: { title: '暂无搜索结果', image: ASSETS.noSearch, actionText: '清除筛选' },
  maintenance: { title: '维护中', image: ASSETS.maintenance },
  'load-failed': { title: '加载失败', image: ASSETS.loadFailed, actionText: '重新加载' },
}

export const EMPTY_GUIDE_ACTION_ICONS = {
  add: ASSETS.actionAdd,
  reference: ASSETS.actionReference,
  export: ASSETS.actionExport,
  import: ASSETS.actionImport,
}

const DEFAULT_GUIDE_STEPS = [
  {
    key: 'create',
    title: '创建内容',
    actionText: '新增',
    actionType: 'add',
  },
]

function EmptyVisual({ image, imageAlt, icon, className }) {
  if (icon) {
    return <div className={`${className} ds-empty-state__legacy-icon`}>{icon}</div>
  }

  if (typeof image === 'string') {
    return <img className={className} src={image} alt={imageAlt} />
  }

  return <div className={className}>{image}</div>
}

export default function DSEmptyState({
  type = 'data',
  title,
  description,
  image,
  imageAlt = '',
  actionText,
  onAction,
  actionVariant = 'link',
  actionLoading = false,
  actionDisabled = false,
  icon,
  compact = false,
  contained = false,
  className = '',
}) {
  const preset = EMPTY_STATE_PRESETS[type] || EMPTY_STATE_PRESETS.data
  const resolvedTitle = title ?? preset.title
  const resolvedImage = image ?? preset.image
  const resolvedActionText = actionText ?? (onAction ? preset.actionText : undefined)
  const classes = [
    'ds-empty-state',
    compact && 'ds-empty-state--compact',
    contained && 'ds-empty-state--contained',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes} aria-label={resolvedTitle}>
      <EmptyVisual
        className="ds-empty-state__image"
        image={resolvedImage}
        imageAlt={imageAlt}
        icon={icon}
      />
      <div className="ds-empty-state__content">
        <div className="ds-empty-state__title">{resolvedTitle}</div>
        {description ? <p className="ds-empty-state__description">{description}</p> : null}
        {resolvedActionText ? (
          <DSButton
            className="ds-empty-state__action"
            variant={actionVariant}
            size="small"
            loading={actionLoading}
            disabled={actionDisabled}
            onClick={onAction}
          >
            {resolvedActionText}
          </DSButton>
        ) : null}
      </div>
    </section>
  )
}

function EmptyGuideCard({ item, index, total }) {
  const {
    title,
    stepText,
    image = ASSETS.guide,
    imageAlt = '',
    actionText,
    actionType,
    actionIcon,
    onAction,
    recommended = false,
    loading = false,
    disabled = false,
  } = item
  const resolvedIcon = actionIcon ?? EMPTY_GUIDE_ACTION_ICONS[actionType]

  return (
    <article className="ds-empty-guide__card">
      {recommended ? <span className="ds-empty-guide__recommended">推荐</span> : null}
      <EmptyVisual className="ds-empty-guide__image" image={image} imageAlt={imageAlt} />
      <div className="ds-empty-guide__card-content">
        {stepText !== false && total > 1 ? (
          <span className="ds-empty-guide__step">{stepText || `Step ${index + 1}`}</span>
        ) : null}
        <strong>{title}</strong>
        {actionText ? (
          <DSButton
            size="small"
            variant="default"
            leftIcon={
              resolvedIcon ? <img className="ds-empty-guide__action-icon" src={resolvedIcon} alt="" /> : undefined
            }
            loading={loading}
            disabled={disabled}
            onClick={onAction}
          >
            {actionText}
          </DSButton>
        ) : null}
      </div>
    </article>
  )
}

export function DSEmptyGuide({
  title,
  description,
  steps = DEFAULT_GUIDE_STEPS,
  skipText,
  onSkip,
  className = '',
}) {
  const classes = ['ds-empty-guide', className].filter(Boolean).join(' ')

  return (
    <section className={classes} aria-label={title || '操作引导'}>
      {title || description ? (
        <header className="ds-empty-guide__header">
          {title ? <h3>{title}</h3> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="ds-empty-guide__steps">
        {steps.map((item, index) => (
          <div className="ds-empty-guide__step-wrap" key={item.key || `${item.title}-${index}`}>
            <EmptyGuideCard item={item} index={index} total={steps.length} />
            {index < steps.length - 1 ? <span className="ds-empty-guide__connector" aria-hidden="true">→</span> : null}
          </div>
        ))}
      </div>
      {skipText ? (
        <DSButton
          className="ds-empty-guide__skip"
          variant="link"
          size="small"
          rightIcon={<img src={ASSETS.arrowRight} alt="" />}
          onClick={onSkip}
        >
          {skipText}
        </DSButton>
      ) : null}
    </section>
  )
}
