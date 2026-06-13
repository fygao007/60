# Repository Structure

本仓库沉淀 60 系统 PC 端组件资产，当前以可直接打开的 HTML 预览和本地 React 组件库为主。

## Top Level

| 路径 | 说明 |
|---|---|
| `README.md` | GitHub 首页入口，说明仓库用途、入口页面和维护规则。 |
| `docs/` | 仓库级说明文档。 |
| `ui-demo/` | HTML 预览页、设计组件库源码和静态资产。 |

## UI Demo

| 路径 | 说明 |
|---|---|
| `ui-demo/component-library-index.html` | 跳转到框架2组件库功能索引。 |
| `ui-demo/scenario-templates-index.html` | 跳转到框架2业务场景模板索引。 |
| `ui-demo/framework-2/component-library-index.html` | 框架2组件库功能索引。 |
| `ui-demo/framework-2/scenario-templates-index.html` | 框架2业务场景模板索引和生成规则入口。 |
| `ui-demo/framework-2/current-components-index.html` | 框架2当前组件索引。 |
| `ui-demo/framework-2/all-components-index.html` | 框架2 Ant 全量组件目录。 |
| `ui-demo/framework-2/framework-index.html` | 框架1和框架2选择入口。 |
| `ui-demo/current-components-index.html` | 当前已沉淀组件索引。 |
| `ui-demo/all-components-index.html` | Ant Design 组件体系排查目录。 |
| `ui-demo/ant-components-page.html` | 全量组件交互预览页。 |
| `ui-demo/*-states.html` | 单组件状态预览页。 |
| `ui-demo/*-page.html` | 业务页面或组合组件预览页。 |
| `ui-demo/assets/` | 图标、导航背景等静态资源。 |
| `ui-demo/packages/design-system/` | 本地 React 设计组件库。 |
| `ui-demo/framework-2/` | 框架2预览、公共预设、页面模板和隔离回归。 |

## Design System

| 路径 | 说明 |
|---|---|
| `src/tokens.css` | 全局颜色、字体、间距、圆角、阴影等变量。 |
| `src/base.css` | 基础样式和通用 HTML 类。 |
| `src/index.js` | React 组件统一导出入口。 |
| `src/<Component>/index.jsx` | 组件实现。 |
| `src/<Component>/index.css` | 组件样式。 |
| `src/AppShell/app-shell.css` / `app-shell.js` | 框架1兼容底座，不用于新页面。 |
| `src/AppShellV2/app-shell-v2.css` / `app-shell-v2.js` | HTML 预览默认使用的框架2底座，采用 Shadow DOM 隔离。 |
| `docs/` | 组件专项规范和落地规则。 |

## Maintenance Rules

1. 新增组件先在 `ui-demo/packages/design-system/src/<Component>/` 中沉淀源码，再在 `src/index.js` 导出。
2. 新增组件预览页放在 `ui-demo/` 根下，并同步更新 `README.md` 和 `ui-demo/README.md` 的索引。
3. 新增图标放入 `ui-demo/assets/icons/`，需要在页面脚本中复用时同步登记 `ui-demo/assets/icon-registry.js`。
4. 组件颜色必须优先使用 `src/tokens.css` 中的变量，不在组件 CSS 里直接写设计色值。
5. 本地工具配置、系统文件和临时截图不提交到仓库。
