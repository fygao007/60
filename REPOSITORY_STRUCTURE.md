# 仓库目录结构

本仓库只维护 60 系统相关资产。新项目、新模块、新页面都应创建在仓库内，避免散落到仓库外目录。

## 根目录

| 路径 | 用途 |
| --- | --- |
| `README.md` | 仓库总入口，说明当前重点、预览页面和维护约定 |
| `VERSIONING.md` | 版本制度 |
| `MODULE_VERSIONS.md` | 模块版本清单 |
| `CHANGELOG.md` | 变更记录 |
| `REPOSITORY_STRUCTURE.md` | 仓库目录结构说明 |
| `ui-demo/` | 页面原型、组件库、规范和导出资产 |

## `ui-demo/`

| 路径 | 用途 |
| --- | --- |
| `*.html` | 可直接打开的 HTML 预览页，保留在当前层级便于快速访问 |
| `assets/` | 项目公共静态资产、图标和图标注册表 |
| `packages/design-system/` | 60 系统本地 React 设计组件库 |
| `specs/` | 框架、页面生成、低代码组件等规范文档 |
| `pages/` | 按页面或模块归档的补充材料、导出文件和参考资源 |
| `.mastergo/` | MasterGo 导出的设计参考和 DSL 原始材料 |

## 页面归档规则

HTML 预览页可以继续放在 `ui-demo/` 根层，保证本地打开路径稳定。与某个页面相关的导出包、截图、参考文件放到：

```text
ui-demo/pages/<page-key>/
```

推荐子目录：

| 子目录 | 用途 |
| --- | --- |
| `export/` | 浏览器或第三方平台导出的完整页面包 |
| `reference/` | 设计稿截图、业务参考图、对照材料 |
| `notes/` | 页面分析、验收说明、问题记录 |

示例：

```text
ui-demo/pages/campus-info/export/
```

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
- 无明确归属的根目录导出文件

如果确实需要保留导出文件，先归档到 `ui-demo/pages/<page-key>/export/`。
