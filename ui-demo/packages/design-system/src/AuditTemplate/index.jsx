import DSButton from '../Button'
import DSFilterBar from '../FilterBar'
import DSDataTable from '../DataTable'
import './index.css'

const defaultStatusTabs = [
  { key: 'pending', label: '待审核', count: 9 },
  { key: 'approved', label: '已审核' },
  { key: 'all', label: '全部' },
]

export default function DSAuditTemplate({
  title = '审核管理',
  description = '用于待审核、已审核、全部等审核业务列表场景。',
  statusTabs = defaultStatusTabs,
  activeStatus = 'pending',
  filters = [],
  columns = [],
  data = [],
  rowKey = 'id',
  selectedKeys = [],
  batchActions,
  rowActions,
  pagination,
  onSearch,
  onReset,
  className = '',
}) {
  const classes = ['ds-audit-template', className].filter(Boolean).join(' ')
  const defaultBatchActions = (
    <>
      <DSButton variant="default">导出</DSButton>
      <DSButton variant="default">批量通过</DSButton>
      <DSButton variant="default">批量退回</DSButton>
    </>
  )
  const defaultRowActions = [
    { key: 'pass', label: '通过' },
    { key: 'reject', label: '不通过' },
    { key: 'return', label: '退回' },
    { key: 'detail', label: '详情' },
  ]

  return (
    <div className={classes}>
      <header className="ds-audit-template__header">
        <div>
          <h1 className="ds-page-title">{title}</h1>
          {description && <p className="ds-page-desc">{description}</p>}
        </div>
      </header>

      <nav className="ds-audit-template__status-tabs" aria-label="审核状态">
        {statusTabs.map((tab) => (
          <button
            className={['ds-audit-template__status-tab', tab.key === activeStatus && 'is-active'].filter(Boolean).join(' ')}
            type="button"
            key={tab.key}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && <em>{tab.count}</em>}
          </button>
        ))}
      </nav>

      {filters.length > 0 && <DSFilterBar fields={filters} onSearch={onSearch} onReset={onReset} />}

      <DSDataTable
        title="审核列表"
        summary={`共 ${pagination?.total ?? data.length} 条记录${selectedKeys.length ? `，已选 ${selectedKeys.length} 条` : ''}`}
        columns={columns}
        data={data}
        rowKey={rowKey}
        selectedKeys={selectedKeys}
        actions={rowActions || defaultRowActions}
        toolbarActions={batchActions || defaultBatchActions}
        pagination={pagination}
      />
    </div>
  )
}
