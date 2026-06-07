# 框架2

框架2是智慧人事一体化服务系统的底层后台框架，核心实现位于
`../packages/design-system/src/AppShellV2/`。

## 保留内容

- 顶部一级导航：系统标识、应用分组、用户入口。
- 页签行：支持图标、关闭、刷新、全屏。
- 左侧菜单：通过 `secondaryNav.items` 配置启用；未启用时可设置 `hideSidebar: true`。
- 工作区背景：统一使用 `assets/personal-workbench-bg.jpg`，自适应铺满。
- 业务内容：框架默认留空，业务页面通过 `.frame2-stage` 内部内容注入。

## 入口

- `personal-workbench.html`：无左侧菜单的空首页框架。
- `shell.html`：带左侧菜单的底层框架预览。
- `basic-info.html`：基本信息表单示例。

## 资源

- 顶部背景：`assets/topbar-nav.svg`
- 系统 Logo：`assets/personal-logo.png`
- 工作区背景：`assets/personal-workbench-bg.jpg`
- 页签刷新图标：`assets/tab-refresh.svg`
- 页签全屏图标：`assets/tab-fullscreen.svg`
