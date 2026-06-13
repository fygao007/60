# 框架版本管理

## 框架1

- 入口：`primary-nav.html`
- 样式与脚本：`packages/design-system/src/AppShell/`
- 定位：兼容框架，仅保留旧页面和历史预览。

## 框架2

- 当前版本：`2.2.2`
- 框架选择：`framework-2/framework-index.html`
- 框架2预览：`framework-2/personal-workbench.html`
- 默认状态：新页面、组件索引和场景模板统一使用框架2。
- 业务页面：`framework-2/`
- 专属资产：`framework-2/assets/`
- 样式与脚本：`packages/design-system/src/AppShellV2/`
- 隔离回归：`framework-2/style-isolation-test.html`
- 定位：使用 `frame2-` 类名前缀和 Shadow DOM，与框架1及业务样式双向隔离。

## 维护规则

- 框架1和框架2分目录维护；未明确指定时默认使用框架2。
- 框架2生成的页面和资产只放在 `framework-2/` 下。
- 框架1和框架2只共用 `packages/design-system/src/` 里的组件与基础能力。
- 框架2改动优先提交到 `framework-2` 分支。
- 不直接修改框架1文件，除非明确说明要同步框架1。
