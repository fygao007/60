# UI Demo / 页面生成资产

这个目录用于沉淀 PC 前端页面生成所需的设计规范、组件库和 HTML 预览页。

## 目录说明

- `packages/design-system/`：本地 React 设计组件库，包名 `@wisedu/design-system`。
- `specs/pc-app-shell-spec.md`：PC 应用三层框架外壳规范，沉淀一级导航、二级导航区、右侧操作区和交互规则。
- `specs/pc-framework-layout-spec.md`：PC 框架布局规范，来自 MasterGo《📌【PC】框架布局》。
- `specs/page-generation-rules.md`：业务需求生成前端页面的规则。
- `specs/lowcode-component-learning.md`：从教学 6.0 低代码页面学习到的组件与交互规则。
- `*.html`：按业务需求生成的独立 HTML 预览页。

## 版本管理

60 项目按模块管理版本：

- 根目录 `VERSIONING.md`：版本制度、发布规则和提交规范。
- 根目录 `MODULE_VERSIONS.md`：各模块当前版本。
- 根目录 `CHANGELOG.md`：按版本和模块记录变更。

新增模块或页面时，先登记到 `MODULE_VERSIONS.md`，发布前同步更新 `CHANGELOG.md`。

## 后续生成页面时的默认流程

1. 读取 `specs/pc-app-shell-spec.md`，确定三层框架、导航、标签和操作区。
2. 读取 `specs/pc-framework-layout-spec.md`。
3. 读取 `specs/page-generation-rules.md`。
4. 根据用户业务需求生成页面。
5. 用户未指定输出形式时，先生成 HTML 预览页。
6. 用户确认后，再生成 React 页面并接入业务项目。

## 当前框架预览

- `primary-nav.html`：一级导航 + 二级导航区 + 右侧操作区的完整框架原型。
- `assets/icon-registry.js`：统一图标注册表。
- `assets/icons/`：框架图标和业务入口图标资产。

## 60 组件库当前覆盖

- 基础：`DSButton`、`DSButtonGroup`、`DSIconButton`、`DSField`、`DSInput`、`DSSelect`、`DSTextarea`、`DSTag`。
- 布局：`DSAppShell`、`DSPageHeader`、`DSCard`、`DSTabs`。
- 数据：`DSFilterBar`、`DSDataTable`、`DSParentChildTable`、`DSPagination`、`DSEmptyState`。
- 浮层：`DSModal`、`DSDrawer`。
- 审核：`DSAuditStatusTabs`、`DSAuditToolbar`、`DSAuditActions`、`DSAuditOpinionModal`、`DSAuditDetailDrawer`。
- 导入：`DSImportSteps`、`DSImportUpload`、`DSImportMappingTable`、`DSImportValidationPanel`、`DSImportResult`。
- 模板：`DSCrudTemplate`、`DSAuditTemplate`、`DSImportWizard`。

React 页面统一从 `@wisedu/design-system` 引用组件；独立 HTML 预览优先复用 `packages/design-system/src/base.css` 与 `tokens.css`。

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
