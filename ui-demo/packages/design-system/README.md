# @wisedu/design-system

60 系统 PC 页面生成使用的本地 React 组件库。组件以 `DS*` 前缀导出，样式基于 `src/tokens.css` 和 `src/base.css`。

## 使用

```jsx
import {
  DSAppShell,
  DSButton,
  DSDataTable,
  DSFilterBar,
  DSPageHeader,
  DSTag,
} from '@wisedu/design-system'
```

入口 `src/index.js` 已默认引入 `base.css`，业务页面通常不需要重复引入基础样式。

## 组件清单

基础控件：

- `DSButton`
- `DSButtonGroup`
- `DSIconButton`
- `DSField`
- `DSInput`
- `DSSelect`
- `DSTextarea`
- `DSTag`

布局与导航：

- `DSAppShell`
- `DSPageHeader`
- `DSCard`
- `DSTabs`

数据展示：

- `DSFilterBar`
- `DSDataTable`
- `DSPagination`
- `DSEmptyState`

浮层：

- `DSModal`
- `DSDrawer`

页面模板：

- `DSCrudTemplate`
- `DSAuditTemplate`
- `DSImportWizard`

## 列表页组合

```jsx
<DSPageHeader title="方案管理" description="维护招生方案、分组规则与审核状态。" actions={<DSButton>新增</DSButton>} />
<DSFilterBar fields={filters} onSearch={onSearch} onReset={onReset} />
<DSDataTable
  title="方案列表"
  summary="共 20 条记录"
  columns={columns}
  data={data}
  actions={[
    { key: 'edit', label: '编辑' },
    { key: 'delete', label: '删除', danger: true },
  ]}
  pagination={{ total: 20, current: 1, pageSize: 10 }}
/>
```

## 状态字段

状态统一使用 `DSTag`，避免页面级重复写胶囊样式：

```jsx
<DSTag color="primary">待审核</DSTag>
<DSTag color="success">已通过</DSTag>
<DSTag color="warning">需补充</DSTag>
<DSTag color="danger">不通过</DSTag>
```
