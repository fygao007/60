import DSButton from '../Button'
import DSPagination from '../Pagination'
import './index.css'

export default function DSDataTable({
  title = '列表',
  summary,
  columns = [],
  data = [],
  rowKey = 'id',
  actions = [],
  toolbarActions,
  tableTools,
  pagination,
  selectable = true,
  selectedKeys = [],
  draggable = false,
  rowDraggable = draggable,
  actionsPosition = 'right',
  showToolbar = true,
  emptyText = '暂无数据',
  emptyRender,
  variant = 'default',
  minWidth,
  rowClassName,
  className = '',
}) {
  const classes = ['ds-data-table', 'ds-card', variant === 'lowcode' && 'ds-data-table--lowcode', className].filter(Boolean).join(' ')
  const hasActions = actions.length > 0
  const actionsAtLeft = hasActions && actionsPosition === 'left'
  const actionsAtRight = hasActions && actionsPosition !== 'left'
  const tableMinWidth = minWidth || columns.reduce((total, column) => total + Number.parseInt(column.width || column.minWidth || 140, 10), 0) + (selectable ? 40 : 0) + (rowDraggable ? 48 : 0) + (hasActions ? 160 : 0)
  const colSpan = columns.length + (selectable ? 1 : 0) + (rowDraggable ? 1 : 0) + (hasActions ? 1 : 0)

  const renderActionsCell = (record) => (
    <td className="ds-data-table__actions-col">
      <span className="ds-data-table__row-actions">
        {actions.map((action) => (
          <DSButton
            variant="link"
            danger={action.danger}
            disabled={typeof action.disabled === 'function' ? action.disabled(record) : action.disabled}
            key={action.key || action.label}
            onClick={() => action.onClick?.(record)}
          >
            {action.label}
          </DSButton>
        ))}
      </span>
    </td>
  )

  const renderCell = (column, record, index) => {
    const value = record[column.key]
    return column.render ? column.render(value, record, index) : value ?? '-'
  }

  const renderTableTools = () => {
    if (tableTools === false) return null

    if (tableTools) {
      return <div className="ds-data-table__table-tools">{tableTools}</div>
    }

    if (variant !== 'lowcode') return null

    return (
      <div className="ds-data-table__table-tools">
        <button className="ds-data-table__tool-button" type="button" aria-label="全屏表格">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3H3v3M10 3h3v3M6 13H3v-3M10 13h3v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="ds-data-table__tool-button" type="button" aria-label="列设置">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 4h4v8H3V4ZM9 4h4v8H9V4Z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 6v4M11 6v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <section className={classes} aria-label={title}>
      {showToolbar && (
        <div className="ds-data-table__toolbar">
          <div className="ds-data-table__title">
            <strong>{title}</strong>
            {summary && <span>{summary}</span>}
          </div>
          <div className="ds-data-table__toolbar-side">
            {toolbarActions && <div className="ds-data-table__toolbar-actions">{toolbarActions}</div>}
            {renderTableTools()}
          </div>
        </div>
      )}

      <div className="ds-data-table__wrap">
        <table className="ds-data-table__table" style={{ minWidth: tableMinWidth }}>
          <thead>
            <tr>
              {rowDraggable && <th className="ds-data-table__drag" aria-label="拖拽排序" />}
              {selectable && <th className="ds-data-table__check"><input type="checkbox" aria-label="全选" /></th>}
              {actionsAtLeft && <th className="ds-data-table__actions-col">操作</th>}
              {columns.map((column) => (
                <th
                  className={column.className}
                  style={{ width: column.width, minWidth: column.minWidth, textAlign: column.align }}
                  key={column.key}
                >
                  {column.title}
                </th>
              ))}
              {actionsAtRight && <th className="ds-data-table__actions-col">操作</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td className="ds-data-table__empty" colSpan={colSpan}>
                  {emptyRender || <div className="ds-data-table__empty-content">{emptyText}</div>}
                </td>
              </tr>
            )}
            {data.map((record, index) => {
              const key = record[rowKey] ?? index
              const trClassName = typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName
              return (
                <tr className={trClassName} key={key}>
                  {rowDraggable && (
                    <td className="ds-data-table__drag">
                      <span className="ds-data-table__drag-handle" aria-hidden="true" />
                    </td>
                  )}
                  {selectable && (
                    <td className="ds-data-table__check">
                      <input type="checkbox" defaultChecked={selectedKeys.includes(key)} aria-label={`选择第 ${index + 1} 行`} />
                    </td>
                  )}
                  {actionsAtLeft && renderActionsCell(record)}
                  {columns.map((column) => (
                    <td className={column.cellClassName} style={{ textAlign: column.align }} key={column.key}>{renderCell(column, record, index)}</td>
                  ))}
                  {actionsAtRight && renderActionsCell(record)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {pagination && <DSPagination {...pagination} />}
    </section>
  )
}
