# 模块版本清单

| 模块 | 当前版本 | 路径 | 说明 |
| --- | --- | --- | --- |
| project | 0.1.1 | `/` | 60 项目整体交付版本 |
| ui-demo | 0.1.1 | `ui-demo/` | 组件预览页、组件索引和规范入口 |
| design-system | 0.1.0 | `ui-demo/packages/design-system/` | 本地 React 设计组件库 |
| layout-spec | 0.1.0 | `ui-demo/specs/pc-framework-layout-spec.md` | PC 框架布局规范 |
| generation-rules | 0.1.0 | `ui-demo/specs/page-generation-rules.md` | 组件/页面生成规则 |
| component-index | 0.1.0 | `ui-demo/component-library-index.html` | 组件库 HTML 索引页 |

## 更新规则

- 只改某个模块时，只递增该模块版本。
- 涉及公共组件或规范时，同时递增被影响的页面模块版本。
- 对外发布时，同步递增 `project` 版本。
- `design-system` 版本应与 `ui-demo/packages/design-system/package.json` 的 `version` 保持一致。
