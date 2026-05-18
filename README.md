# 60 系统前端组件库

本仓库用于沉淀 60 系统 PC 端前端框架、组件库、组件生成规范和 HTML 组件预览。

## 当前重点

- PC 三层框架：一级导航、二级导航区、右侧操作区。
- 图标资产管理：统一维护在 `ui-demo/assets/icon-registry.js` 和 `ui-demo/assets/icons/`。
- 组件预览页：表单、表格、框架、浮层、导航与反馈等组件能力。
- 本地设计组件库：`ui-demo/packages/design-system`。

## 主要入口

- [UI Demo 说明](ui-demo/README.md)
- [组件库索引](ui-demo/component-library-index.html)
- [仓库目录结构](REPOSITORY_STRUCTURE.md)
- [版本制度](VERSIONING.md)
- [模块版本清单](MODULE_VERSIONS.md)
- [变更记录](CHANGELOG.md)
- [PC 框架外壳规范](ui-demo/specs/pc-app-shell-spec.md)
- [PC 框架布局规范](ui-demo/specs/pc-framework-layout-spec.md)
- [组件/页面生成规则](ui-demo/specs/page-generation-rules.md)
- [低代码组件学习记录](ui-demo/specs/lowcode-component-learning.md)
- [设计组件库文档](ui-demo/packages/design-system/README.md)

## 组件预览页面

- [组件库索引](ui-demo/component-library-index.html)
- [表单组件](ui-demo/form-components-page.html)
- [基础表格](ui-demo/basic-table-page.html)
- [多级表格](ui-demo/multi-level-table-page.html)
- [低代码表格](ui-demo/lowcode-table-page.html)
- [一级/二级导航与操作区框架](ui-demo/primary-nav.html)

## 维护约定

1. 新组件、新组件预览和组件规范都放在本仓库内，目录规则见 `REPOSITORY_STRUCTURE.md`。
2. 新增框架能力先更新 `ui-demo/specs/` 下的规范。
3. 新增图标先放入 `ui-demo/assets/icons/`，再登记到 `icon-registry.js`。
4. 新增 HTML 组件预览优先复用 `AppShell` 和现有组件样式。
5. 组件确认后，再沉淀到 `ui-demo/packages/design-system` 的 React 组件。
6. 发布前同步更新 `MODULE_VERSIONS.md` 和 `CHANGELOG.md`。
