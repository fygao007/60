# 60 系统前端组件库

本仓库用于沉淀 60 系统 PC 端组件资产，包含 HTML 组件预览、本地 React 设计组件库和组件规范文档。

## 快速入口

| 入口 | 用途 |
|---|---|
| [UI Demo 说明](ui-demo/README.md) | 预览页清单和组件覆盖范围。 |
| [功能索引](ui-demo/framework-2/component-library-index.html) | 基于框架2的组件库总入口。 |
| [场景模板](ui-demo/framework-2/scenario-templates-index.html) | 基于框架2按业务场景选择 HTML 生成模板。 |
| [当前组件](ui-demo/framework-2/current-components-index.html) | 框架2中的已沉淀组件预览和源码入口。 |
| [Ant 全量目录](ui-demo/framework-2/all-components-index.html) | 框架2中按 Ant Design 体系排查待补齐组件。 |
| [框架选择](ui-demo/framework-2/framework-index.html) | 分别进入框架1兼容预览和框架2默认预览。 |
| [设计组件库文档](ui-demo/packages/design-system/README.md) | React 组件库使用方式和框架说明。 |
| [仓库结构](docs/repository-structure.md) | 目录分工和维护规则。 |

## 当前内容

- 默认框架：框架2顶部主导航、左侧菜单和页签工作区；框架1仅保留兼容预览。
- 基础控件：锚点、按钮、按钮组、链接按钮、步骤条、表单控件、标签、开关等。
- 数据组件：筛选区、基础表格、多级表格、父子表格、分页、空状态。
- 浮层与模板：弹窗、抽屉、CRUD 模板、审核模板、导入向导。
- 图标资产：统一维护在 `ui-demo/assets/icon-registry.js` 和 `ui-demo/assets/icons/`。
- 设计变量：统一维护在 `ui-demo/packages/design-system/src/tokens.css`。

## 重点预览页

| 分类 | 页面 |
|---|---|
| 总览 | [组件总览](ui-demo/ant-components-page.html)、[当前组件](ui-demo/current-components-index.html) |
| 框架 | [框架选择](ui-demo/framework-2/framework-index.html)，再分别进入框架1或框架2预览 |
| 按钮 | [按钮状态](ui-demo/button-states.html)、[按钮组状态](ui-demo/button-group-states.html)、[链接按钮组件](ui-demo/link-button-components.html) |
| 导航 | [锚点组件](ui-demo/anchor-components.html)、[步骤条组件](ui-demo/steps-components.html) |
| 表单 | [表单组件](ui-demo/form-components-page.html) |
| 表格 | [基础表格](ui-demo/basic-table-page.html)、[多级表格](ui-demo/multi-level-table-page.html)、[低代码表格](ui-demo/lowcode-table-page.html) |
| 业务样例 | [考核结果卡片](ui-demo/assessment-result-card-page.html) |

## 维护约定

1. 新组件源码放在 `ui-demo/packages/design-system/src/<Component>/`，并从 `src/index.js` 导出。
2. 新增 HTML 预览页放在 `ui-demo/`，并同步更新 `ui-demo/README.md`。
3. 新增图标先放入 `ui-demo/assets/icons/`，需要脚本复用时再登记到 `icon-registry.js`。
4. 组件颜色使用 `tokens.css` 变量，不在组件 CSS 中直接写设计色值。
5. 本地工具配置、系统文件、临时截图不提交到仓库。
