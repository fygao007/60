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
  pagination,
  selectable = true,
  selectedKeys = [],
  actionsPosition = 'right',
  className = '',
}) {
  const classes = ['ds-data-table', 'ds-card', className].filter(Boolean).join(' ')
  const hasActions = actions.length > 0
  const actionsAtLeft = hasActions && actionsPosition === 'left'
  const actionsAtRight = hasActions && actionsPosition !== 'left'

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

  return (
    <section className={classes} aria-label={title}>
      <div className="ds-data-table__toolbar">
        <div className="ds-data-table__title">
          <strong>{title}</strong>
          {summary && <span>{summary}</span>}
        </div>
        {toolbarActions && <div className="ds-data-table__toolbar-actions">{toolbarActions}</div>}
      </div>

      <div className="ds-data-table__wrap">
        <table className="ds-data-table__table">
          <thead>
            <tr>
              {selectable && <th className="ds-data-table__check"><input type="checkbox" aria-label="全选" /></th>}
              {actionsAtLeft && <th className="ds-data-table__actions-col">操作</th>}
              {columns.map((column) => (
                <th className={column.className} style={{ width: column.width }} key={column.key}>{column.title}</th>
              ))}
              {actionsAtRight && <th className="ds-data-table__actions-col">操作</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => {
              const key = record[rowKey] ?? index
              return (
                <tr key={key}>
                  {selectable && (
                    <td className="ds-data-table__check">
                      <input type="checkbox" defaultChecked={selectedKeys.includes(key)} aria-label={`选择第 ${index + 1} 行`} />
                    </td>
                  )}
                  {actionsAtLeft && renderActionsCell(record)}
                  {columns.map((column) => (
                    <td key={column.key}>{column.render ? column.render(record[column.key], record, index) : record[column.key]}</td>
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
