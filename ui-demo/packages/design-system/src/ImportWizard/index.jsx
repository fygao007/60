import DSButton from '../Button'
import './index.css'

const defaultSteps = [
  { title: '上传文件', description: '选择方案 Excel 模板' },
  { title: '字段映射', description: '匹配分组与条款字段' },
  { title: '导入确认', description: '校验通过后生成方案' },
]

export default function DSImportWizard({
  title = '智能导入',
  steps = defaultSteps,
  current = 0,
  uploadTitle = '拖拽文件到此处，或点击上传',
  uploadDescription = '支持 .xlsx 文件，系统自动识别字段。',
  className = '',
}) {
  const classes = ['ds-import-wizard', 'ds-card', className].filter(Boolean).join(' ')

  return (
    <section className={classes} aria-label={title}>
      <header className="ds-import-wizard__header">
        <h3>{title}</h3>
        <span>三步完成</span>
      </header>
      <div className="ds-import-wizard__steps">
        {steps.map((step, index) => (
          <div className={['ds-import-wizard__step', index === current && 'is-current'].filter(Boolean).join(' ')} key={step.title}>
            <i>{index + 1}</i>
            <strong>{step.title}</strong>
            <span>{step.description}</span>
          </div>
        ))}
      </div>
      <div className="ds-import-wizard__upload">
        <strong>{uploadTitle}</strong>
        <span>{uploadDescription}</span>
      </div>
      <footer className="ds-import-wizard__footer">
        <DSButton variant="default">取消</DSButton>
        <DSButton>下一步</DSButton>
      </footer>
    </section>
  )
}
