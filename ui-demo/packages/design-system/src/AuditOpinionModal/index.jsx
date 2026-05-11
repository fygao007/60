import DSField, { DSTextarea } from '../Field'
import DSModal from '../Modal'
import './index.css'

const titleMap = {
  pass: '审核通过',
  reject: '审核不通过',
  return: '退回修改',
}

export default function DSAuditOpinionModal({
  open = false,
  type = 'pass',
  title,
  record,
  opinionLabel = '审核意见',
  opinionPlaceholder = '请输入审核意见',
  opinionRequired = type !== 'pass',
  children,
  onOk,
  onCancel,
}) {
  return (
    <DSModal
      open={open}
      title={title || titleMap[type] || '审核处理'}
      okText="提交"
      cancelText="取消"
      onOk={onOk}
      onCancel={onCancel}
      className="ds-audit-opinion-modal"
    >
      {record && (
        <div className="ds-audit-opinion-modal__summary">
          <span>审核对象</span>
          <strong>{record.name || record.title || record.auditTitle || '-'}</strong>
        </div>
      )}
      {children}
      <DSField label={opinionLabel} required={opinionRequired}>
        <DSTextarea placeholder={opinionPlaceholder} rows={4} />
      </DSField>
    </DSModal>
  )
}
