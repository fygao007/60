# 框架版本管理

## 框架1

- 入口：`primary-nav.html`
- 样式与脚本：`packages/design-system/src/AppShell/`
- 定位：现有基线框架，保持兼容，不被框架2覆盖。

## 框架2

- 入口：`framework-2.html`
- 样式与脚本：`packages/design-system/src/AppShellV2/`
- 设计来源：`mastergo://getd2c/193705377860925-21-112711`
- 定位：新增框架版本，使用 `frame2-` 类名前缀，与框架1隔离。

## 维护规则

- 框架1和框架2分目录维护，页面入口分开。
- 框架2改动优先提交到 `framework-2` 分支。
- 不直接修改框架1文件，除非明确说明要同步框架1。
