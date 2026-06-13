# UI Demo / 组件库资产

这个目录用于沉淀 PC 前端组件库和 HTML 组件预览页。

## 目录说明

- `packages/design-system/`：本地设计组件库，React 组件包名 `@wisedu/design-system`；独立 HTML 预览页优先引用 `web-components/` 下的 Lit Web Components。
- `assets/`：图标、导航背景和组件静态资源。
- `*.html`：独立 HTML 组件预览页。
- [`../docs/repository-structure.md`](../docs/repository-structure.md)：仓库级目录和维护规则。

## 当前框架预览

- `component-library-index.html`：跳转到框架2功能索引。
- `scenario-templates-index.html`：跳转到框架2场景模板索引。
- `framework-2/component-library-index.html`：框架2组件库总入口。
- `framework-2/scenario-templates-index.html`：框架2场景模板入口。
- `framework-2/current-components-index.html`：框架2当前组件索引。
- `framework-2/all-components-index.html`：框架2 Ant 全量目录。
- `framework-2/framework-index.html`：框架1、框架2选择入口。
- `current-components-index.html` / `all-components-index.html`：兼容跳转入口。
- `ant-components-page.html`：按 Ant Design 官方分类生成的 70 个基础组件交互稿，后续逐个组件调整样式。
- `link-button-components.html`：从 MasterGo 链接样式提取出的 LinkButton / LinkButtonGroup 独立组件。
- `framework-2/framework-index.html`：框架选择入口。
- `framework-2/personal-workbench.html`：框架2预览入口。
- `primary-nav.html`：框架1兼容预览。
- 根目录组件预览页：通过 `framework-2/legacy-app-shell-adapter.js` 统一运行在框架2中。
- `assets/icon-registry.js`：统一图标注册表。
- `assets/icons/`：框架图标和组件图标资产。

## HTML 组件预览索引

总览：

- `component-library-index.html`：兼容入口，自动进入框架2功能索引。
- `scenario-templates-index.html`：兼容入口，自动进入框架2场景模板索引。
- `current-components-index.html`：当前组件，按源码组件逐项进入。
- `all-components-index.html`：Ant 全量目录，按 Ant 组件体系逐项排查。
- `ant-components-page.html`：组件总览，按钮、布局、导航、数据录入、数据展示、反馈和其他组件的全量交互预览。
- `button-states.html`：按钮类型、尺寸和状态样例。
- `button-group-states.html`：按钮组类型、尺寸和状态样例。
- `link-button-components.html`：链接按钮、链接按钮组和表格操作列样例。
- `steps-components.html`：步骤条组件，覆盖横向、纵向、小尺寸、点状、错误态和可点击状态。
- `anchor-components.html`：锚点组件，覆盖纵向、横向、带边线、多级、禁用和滚动定位。
- `group-title-components.html`：一级标题分组组件，支持前置内容、右侧扩展和长标题省略。
- `assessment-result-card-page.html`：考核结果卡片业务样例。
- `framework-2/hr-office-homepage.html`：深职大智慧人事一体化服务系统人事处首页工作台原型，基于框架2生成。
- `hr-office-homepage.html`：跳转到框架2版本的人事处首页工作台。

表单：

- `form-components-page.html`：完整表单页面，整合输入、下拉、日期时间、单选、多选、开关、上传等控件。
- `form-input-states.html`：录入输入框状态。
- `form-select-states.html`：下拉选择状态。
- `form-cascader-states.html`：级联选择器状态。
- `form-textarea-states.html`：文本域状态。
- `form-rich-text-editor-states.html`：富文本编辑器状态。
- `form-radio-group-states.html`：单选组状态。
- `form-checkbox-group-states.html`：多选组状态。
- `form-switch-states.html`：开关状态。
- `form-date-picker-states.html` / `form-date-range-states.html`：日期选择与日期范围。
- `form-time-picker-states.html` / `form-time-range-states.html`：时间选择与时间范围。
- `form-datetime-picker-states.html` / `form-datetime-range-states.html`：日期时间选择与日期时间范围。
- `form-upload-button-states.html` / `form-upload-dragger-states.html`：附件上传与拖拽上传。

表格：

- `basic-table-page.html`：基础表格页面。
- `drawer-page.html`：900px 右侧表单抽屉交互页面。
- `modal-page.html`：600px 普通表单弹窗交互页面。
- `delete-modal-page.html`：删除确认、删除成功与删除失败交互场景。
- `multi-level-table-page.html`：多级表头表格页面。
- `lowcode-table-page.html`：低代码表格页面。

## 60 组件库当前覆盖

- 基础：`DSAnchor`、`DSButton`、`DSButtonGroup`、`DSLinkButton`、`DSLinkButtonGroup`、`DSSteps`、`DSIconButton`、`DSField`、`DSInput`、`DSSelect`、`DSCascader`、`DSTextarea`、`DSRichTextEditor`、`DSTimePicker`、`DSTag`。
- 布局：`DSAppShell`、`DSPageHeader`、`DSGroupTitle`、`DSCard`、`DSTabs`。
- 数据：`DSFilterBar`、`DSDataTable`、`DSParentChildTable`、`DSPagination`、`DSEmptyState`。
- 浮层：`DSModal`、`DSDrawer`。
- 审核：`DSAuditStatusTabs`、`DSAuditToolbar`、`DSAuditActions`、`DSAuditOpinionModal`、`DSAuditDetailDrawer`。
- 导入：`DSImportSteps`、`DSImportUpload`、`DSImportMappingTable`、`DSImportValidationPanel`、`DSImportResult`。
- 模板：`DSCrudTemplate`、`DSAuditTemplate`、`DSImportWizard`。

React 页面统一从 `@wisedu/design-system` 引用组件；独立 HTML 预览优先引用 Lit Web Components，例如 `packages/design-system/web-components/DataTable/ds-data-table.js`，只在页面内维护 `columns`、`data` 等配置，避免重复手写原始 table DOM。

## 更新索引时机

新增或调整以下内容时，请同步更新本文件：

1. 新增 HTML 预览页。
2. 新增 `@wisedu/design-system` 导出组件。
3. 新增组件专项规范文档。
4. 调整资源目录或框架底座用法。

## 用户提供需求的最简格式

```text
页面：
类型：列表 CRUD / 审核页 / 表单页 / 导入向导 / 详情页
查询：
字段：
操作：
规则：
输出：HTML / React
```
