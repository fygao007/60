# 60 系统前端组件与页面原型

本仓库用于沉淀 60 系统 PC 端前端框架、组件库、页面生成规范和 HTML 原型。

## 当前重点

- PC 三层框架：一级导航、二级导航区、右侧操作区。
- 图标资产管理：统一维护在 `ui-demo/assets/icon-registry.js` 和 `ui-demo/assets/icons/`。
- 低代码系统风格列表页：参考真实 6.0 系统页面细节生成。
- 业务页面原型：条款库、二级功能、表格页、审核页等。
- 本地设计组件库：`ui-demo/packages/design-system`。

## 主要入口

- [UI Demo 说明](ui-demo/README.md)
- [PC 框架外壳规范](ui-demo/specs/pc-app-shell-spec.md)
- [PC 框架布局规范](ui-demo/specs/pc-framework-layout-spec.md)
- [页面生成规则](ui-demo/specs/page-generation-rules.md)
- [低代码组件学习记录](ui-demo/specs/lowcode-component-learning.md)
- [设计组件库文档](ui-demo/packages/design-system/README.md)

## 预览页面

- [一级/二级导航与操作区框架](ui-demo/primary-nav.html)
- [二级功能页面](ui-demo/secondary-functions.html)
- [条款库页面](ui-demo/clause-library.html)
- [低代码表格页面](ui-demo/lowcode-table-page.html)
- [校区信息页面](ui-demo/campus-info.html)

## 维护约定

1. 新增框架能力先更新 `ui-demo/specs/` 下的规范。
2. 新增图标先放入 `ui-demo/assets/icons/`，再登记到 `icon-registry.js`。
3. 新增页面原型优先复用 `primary-nav.html` 中沉淀的三层框架结构。
4. 页面确认后，再沉淀到 `ui-demo/packages/design-system` 的 React 组件。
