import './index.css'

export default function DSPagination({
  total = 0,
  totalPages = 1,
  current = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  className = '',
}) {
  const classes = ['ds-pagination', className].filter(Boolean).join(' ')

  return (
    <footer className={classes}>
      <span>共 {total} 条</span>
      <span>共 {totalPages} 页</span>
      <button className="ds-link-button" type="button">上一页</button>
      <strong className="ds-pagination__current">{current}</strong>
      <button className="ds-link-button" type="button">下一页</button>
      <label className="ds-pagination__jump">
        跳至 <input className="ds-input" defaultValue={current} /> 页
      </label>
      <select className="ds-select" defaultValue={pageSize}>
        {pageSizeOptions.map((option) => (
          <option value={option} key={option}>{option} 条/页</option>
        ))}
      </select>
    </footer>
  )
}
