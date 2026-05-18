# 仓库目录结构

本仓库只维护 60 系统组件库相关资产。新组件、新组件预览和组件规范都应创建在仓库内，避免散落到仓库外目录。

## 根目录

| 路径 | 用途 |
| --- | --- |
| `README.md` | 仓库总入口，说明当前重点、组件预览页面和维护约定 |
| `VERSIONING.md` | 版本制度 |
| `MODULE_VERSIONS.md` | 模块版本清单 |
| `CHANGELOG.md` | 变更记录 |
| `REPOSITORY_STRUCTURE.md` | 仓库目录结构说明 |
| `ui-demo/` | 组件预览、组件库源码、规范和图标资产 |

## `ui-demo/`

| 路径 | 用途 |
| --- | --- |
| `*.html` | 可直接打开的 HTML 组件预览页，保留在当前层级便于快速访问 |
| `assets/` | 项目公共静态资产、图标和图标注册表 |
| `packages/design-system/` | 60 系统本地 React 设计组件库 |
| `specs/` | 框架、组件生成、低代码组件等规范文档 |

## 组件预览规则

HTML 组件预览页继续放在 `ui-demo/` 根层，保证本地打开路径稳定。组件源码统一放在 `ui-demo/packages/design-system/src/`。

```text
ui-demo/<component-name>-page.html
ui-demo/<component-name>-states.html
```

命名建议：

| 类型 | 命名 |
| --- | --- |
| 完整组件页 | `*-page.html` |
| 状态展示页 | `*-states.html` |
| 组件索引 | `component-library-index.html` |

## 组件库规则

组件库统一放在：

```text
ui-demo/packages/design-system/src/
```

新增组件使用独立目录：

```text
src/ComponentName/
  index.jsx
  index.css
```

组件需要从 `src/index.js` 导出；样式资产需要在 `package.json` 的 `exports` 中登记。

## 不应提交的文件

- `.DS_Store`
- 临时截图
- 本地编辑器缓存
- 业务页面原型
- 第三方平台导出的完整页面包
- MasterGo 原始 DSL 或截图缓存
