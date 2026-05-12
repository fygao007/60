# 模块版本清单

| 模块 | 当前版本 | 路径 | 说明 |
| --- | --- | --- | --- |
| project | 0.1.1 | `/` | 60 项目整体交付版本 |
| ui-demo | 0.1.1 | `ui-demo/` | 页面生成资产、HTML 预览页和规范入口 |
| design-system | 0.1.0 | `ui-demo/packages/design-system/` | 本地 React 设计组件库 |
| layout-spec | 0.1.0 | `ui-demo/specs/pc-framework-layout-spec.md` | PC 框架布局规范 |
| generation-rules | 0.1.0 | `ui-demo/specs/page-generation-rules.md` | 页面生成规则 |
| audit-page | 0.1.0 | `ui-demo/scheme-pending-audit.html` | 方案待审核 HTML 预览页 |
| campus-info | 0.1.0 | `ui-demo/campus-info.html` | 校区信息 HTML 预览页与导出材料 |

## 更新规则

- 只改某个模块时，只递增该模块版本。
- 涉及公共组件或规范时，同时递增被影响的页面模块版本。
- 对外发布时，同步递增 `project` 版本。
- `design-system` 版本应与 `ui-demo/packages/design-system/package.json` 的 `version` 保持一致。
