# 60 项目版本制度

本仓库采用“项目总版本 + 模块版本”的方式管理。项目总版本用于对外交付和 Git 标签，模块版本用于记录不同业务模块、组件库和规范文档的独立演进。

## 版本号规则

版本号使用 `主版本.次版本.修订版本`，例如 `0.1.0`。

- 主版本：架构、框架、目录结构或公共接口发生不兼容变化。
- 次版本：新增模块、页面、组件或较大的功能能力，且兼容已有内容。
- 修订版本：样式修复、文案调整、缺陷修复、局部规范补充。

项目未正式交付前使用 `0.x.x`；形成稳定交付物后从 `1.0.0` 开始。

## 模块划分

模块版本记录在 `MODULE_VERSIONS.md`。当前默认模块：

- `project`：仓库整体交付版本。
- `ui-demo`：HTML 预览页与页面生成资产。
- `design-system`：`@wisedu/design-system` 本地组件库。
- `layout-spec`：PC 框架布局规范。
- `generation-rules`：页面生成规则。
- `audit-page`：方案待审核示例页面。

新增业务模块时，先在 `MODULE_VERSIONS.md` 增加一行，再进行代码或页面实现。

## 变更记录

每次提交前更新 `CHANGELOG.md`：

- 按模块归类。
- 写清楚变更类型：新增、调整、修复、删除。
- 只记录对后续使用有影响的变更，不记录临时调试信息。

推荐格式：

```text
## 0.1.1 - 2026-05-09

### design-system
- 修复 AppShell 工作区圆角层级。

### audit-page
- 调整顶部页签与内容区域的视觉衔接。
```

## Git 标签

项目总版本发布时打标签：

```bash
git tag v0.1.0
git push origin v0.1.0
```

模块需要单独标记时使用模块标签：

```bash
git tag design-system@0.1.0
git tag audit-page@0.1.0
git push origin design-system@0.1.0 audit-page@0.1.0
```

## 提交信息

提交信息建议使用：

```text
<模块>: <动作说明>
```

示例：

```text
design-system: add modal and drawer components
audit-page: fix workspace radius
docs: add module version policy
```

## 发布检查

发布前至少检查：

1. `git status` 没有遗漏的非预期文件。
2. `MODULE_VERSIONS.md` 已更新对应模块版本。
3. `CHANGELOG.md` 已记录本次变更。
4. HTML 预览页可打开并符合设计稿。
5. 需要对外交付时已打 Git tag。
