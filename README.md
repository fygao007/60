# 60 系统前端组件库

本仓库用于沉淀 60 系统 PC 端前端组件库和 HTML 组件预览。

## 当前重点

- PC 三层框架组件：一级导航、二级导航区、右侧操作区。
- 图标资产管理：统一维护在 `ui-demo/assets/icon-registry.js` 和 `ui-demo/assets/icons/`。
- 组件预览页：表单、表格、框架、浮层、导航与反馈等组件能力。
- 本地设计组件库：`ui-demo/packages/design-system`。

## 主要入口

- [UI Demo 说明](ui-demo/README.md)
- [功能索引](ui-demo/component-library-index.html)
- [设计组件库文档](ui-demo/packages/design-system/README.md)

## 组件预览页面

- [功能索引](ui-demo/component-library-index.html)
- [当前组件](ui-demo/current-components-index.html)
- [Ant 全量目录](ui-demo/all-components-index.html)
- [组件总览](ui-demo/ant-components-page.html)
- [按钮状态](ui-demo/button-states.html)
- [按钮组状态](ui-demo/button-group-states.html)
- [链接按钮组件](ui-demo/link-button-components.html)
- [步骤条组件](ui-demo/steps-components.html)
- [表单组件](ui-demo/form-components-page.html)
- [基础表格](ui-demo/basic-table-page.html)
- [多级表格](ui-demo/multi-level-table-page.html)
- [低代码表格](ui-demo/lowcode-table-page.html)
- [一级/二级导航与操作区框架](ui-demo/primary-nav.html)

## 维护约定

1. 新组件、新组件预览和组件规范都放在本仓库内。
2. 新增图标先放入 `ui-demo/assets/icons/`，再登记到 `icon-registry.js`。
3. 新增 HTML 组件预览优先复用 `AppShell` 和现有组件样式。
4. 组件确认后，再沉淀到 `ui-demo/packages/design-system` 的 React 组件。
