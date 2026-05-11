# @wisedu/design-system

60 系统 PC 页面生成使用的本地 React 组件库。组件以 `DS*` 前缀导出，样式基于 `src/tokens.css` 和 `src/base.css`。

## HTML 预览底子（DSAppShell HTML preview）

`src/AppShell/` 下并列两套实现：

| 文件 | 用途 |
|---|---|
| `index.jsx` + `index.css` | React 组件 `DSAppShell`，业务页用 |
| **`app-shell.css` + `app-shell.js`** | **HTML 单文件预览底子**，给设计 / 评审看 |

HTML 预览页只需要：

```html
<link rel="stylesheet" href="./packages/design-system/src/base.css" />
<link rel="stylesheet" href="./packages/design-system/src/AppShell/app-shell.css" />

<body>
  <div class="stage ds-scope">
    <!-- 业务内容（init 后会被自动挪进 .operation-content） -->
    <header class="operation-header">...</header>
    <div class="operation-query-row">...</div>
    <div class="operation-table-wrap">...</div>
    <footer class="operation-footer">...</footer>
  </div>

  <script src="./assets/icon-registry.js"></script>
  <script src="./packages/design-system/src/AppShell/app-shell.js"></script>
  <script>
    WiseAppShell.init({
      activeModule: 'doctor',          // 一级导航 active
      secondaryNav: {                  // 二级导航分组
        title: '协议管理',
        status: ['进行', 6],
        items: ['协议模板','条款库','机构管理','年级管理','引用配置','条款审核'],
        foot: '流程参数设置'
      },
      activeFeature: '条款库'           // 二级导航 + 顶 Tab active 项
    });
  </script>
</body>
```

参考样例：`ui-demo/clause-library.html`、`ui-demo/campus-info.html`。

`app-shell.css` 同时包含 **CRUD 列表通用模式**（`.operation-query-row` / `.operation-table` / `.ds-switch` / `.pages` / `.operation-footer`），业务页只需在 `<style>` 里写自己表格的列宽。

### 一级页签 / 业务标题样式

一级页签选中态统一使用 8px 高的底部色块，不使用边框模拟。

HTML 预览底子：

```html
<div class="operation-title"><span>专业研究方向管理</span></div>
<div class="operation-title is-muted"><span>选项</span></div>
```

React / 组件库样式：

```jsx
<DSTabs
  variant="section"
  activeKey="base"
  items={[
    { key: 'base', label: '选项' },
    { key: 'other', label: '选项' },
  ]}
/>
```

也可在 `DSAppShell` 内部直接使用样式类：

```jsx
<div className="ds-app-shell__section-tabs">
  <button className="ds-app-shell__section-tab is-active" type="button"><span>选项</span></button>
  <button className="ds-app-shell__section-tab" type="button"><span>选项</span></button>
</div>
```

视觉规则：文本 `16px / 600 / 24px`，选中态色块 `height: 8px`，色值 `#D6D9FF`，文字层级高于色块。

## 使用

```jsx
import {
  DSAppShell,
  DSButton,
  DSDataTable,
  DSFilterBar,
  DSPageHeader,
  DSSwitch,
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
- `DSSwitch`

布局与导航：

- `DSAppShell`
- `DSPageHeader`
- `DSCard`
- `DSTabs`

数据展示：

- `DSFilterBar`
- `DSDataTable`
- `DSParentChildTable`
- `DSPagination`
- `DSEmptyState`

审核场景：

- `DSAuditStatusTabs`
- `DSAuditToolbar`
- `DSAuditActions`
- `DSAuditOpinionModal`
- `DSAuditDetailDrawer`

导入场景：

- `DSImportSteps`
- `DSImportUpload`
- `DSImportMappingTable`
- `DSImportValidationPanel`
- `DSImportResult`

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

低代码系统风格列表可使用：

```jsx
<DSDataTable
  variant="lowcode"
  title="条款列表"
  summary="已选 2 条"
  draggable
  columns={[
    { key: 'code', title: '条款编号', width: 160 },
    { key: 'name', title: '条款名称', width: 230 },
    { key: 'scope', title: '适用业务', width: 210 },
    { key: 'enabled', title: '启用状态', width: 170, render: (value) => <DSSwitch checked={value} /> },
  ]}
  data={data}
  toolbarActions={<>
    <DSButton>新增</DSButton>
    <DSButton>删除</DSButton>
    <DSButton>导入</DSButton>
    <DSButton>导出</DSButton>
  </>}
  actions={[
    { key: 'edit', label: '编辑' },
    { key: 'detail', label: '详情' },
    { key: 'delete', label: '删除' },
  ]}
/>
```

`variant="lowcode"` 会按教学 6.0 低代码系统贴近 VXE 表格视觉：首列拖拽手柄、次列复选框、40px 表头、46px 行高、右侧表格工具图标、文字操作列和 `暂无数据` 空态。

## 状态字段

状态统一使用 `DSTag`，避免页面级重复写胶囊样式：

```jsx
<DSTag color="primary">待审核</DSTag>
<DSTag color="success">已通过</DSTag>
<DSTag color="warning">需补充</DSTag>
<DSTag color="danger">不通过</DSTag>
```

## 审核页组合

```jsx
<DSAuditStatusTabs
  activeKey="pending"
  items={[
    { key: 'pending', label: '待审核', count: 9 },
    { key: 'reviewed', label: '已审核' },
    { key: 'all', label: '全部' },
  ]}
/>
<DSDataTable
  title="审核列表"
  columns={columns}
  data={data}
  actions={[
    { key: 'pass', label: '通过' },
    { key: 'reject', label: '不通过' },
    { key: 'return', label: '退回' },
    { key: 'detail', label: '详情' },
  ]}
/>
<DSAuditOpinionModal open={opinionOpen} type="return" record={currentRecord} />
<DSAuditDetailDrawer open={detailOpen} record={currentRecord} />
```

## 导入页组合

```jsx
<DSImportWizard
  current={1}
  mappingRows={[
    { key: 'name', source: '姓名', target: '姓名', required: true, status: 'matched' },
    { key: 'college', source: '学院', target: '所属学院', required: true, status: 'matched' },
  ]}
  validationItems={[
    { row: 8, field: '手机号', message: '格式可能不正确', level: 'warning' },
  ]}
/>
```

## 父子表格组合

```jsx
<DSParentChildTable
  title="培养单位与专业方向"
  summary="共 8 个培养单位"
  parentColumns={[
    { key: 'name', title: '培养单位', width: 240 },
    { key: 'code', title: '单位代码', width: 120 },
    { key: 'status', title: '状态', width: 120 },
  ]}
  childColumns={[
    { key: 'name', title: '专业方向', width: 240 },
    { key: 'degree', title: '学位类型', width: 120 },
    { key: 'plan', title: '计划数', width: 100 },
  ]}
  data={data}
  defaultExpandedKeys={['college-1']}
  childSelectable
  childToolbarActions={<DSButton variant="default">批量设置</DSButton>}
  parentActions={[{ key: 'edit', label: '编辑' }]}
  childActions={[{ key: 'detail', label: '详情' }]}
/>
```

父子表格支持 `expandedKeys` 受控展开、`rowExpandable` 控制行是否可展开、`expandedRowRender` 自定义展开内容、`childSelectable` 子表勾选、`childToolbarActions` 子表工具栏、`emptyText` 与 `childEmptyText` 空态文案。

MasterGo「1.2.2 父子表格（分组表格）」场景使用分组布局：

```jsx
<DSParentChildTable
  layout="grouped"
  title="报名信息审核"
  summary="学生参与情况"
  groupTitleKey="college"
  showChildHeader={false}
  childColumns={[
    { key: 'name', title: '姓名', width: 100 },
    { key: 'applyNo', title: '报名号', width: 78 },
    { key: 'school', title: '就读院校', width: 120 },
    { key: 'schoolLevel', title: '学校层次', width: 123 },
    { key: 'rank', title: '成绩排名', width: 92 },
    { key: 'direction', title: '研究方向', width: 100 },
    { key: 'mentor', title: '申请导师', width: 88 },
    { key: 'status', title: '审核状态', width: 100 },
  ]}
  data={groupedData}
  defaultExpandedKeys={['industrial-design-1']}
  childActions={[{ key: 'audit', label: '审核' }]}
/>
```

`layout="grouped"` 会按「分组条 -> 父级汇总行 -> 缩进子表」渲染；父级汇总默认读取 `degree/type/tag`、`title/name`、`code/number`、`count/countText`，复杂场景可用 `renderGroupTitle` 和 `renderParentSummary` 覆盖。
