# 框架2使用规范

框架2是智慧人事一体化服务系统的统一后台框架。业务页面只能配置框架，
不能复制、重写或覆盖框架内部结构。

## 1. 唯一实现

以下文件是框架唯一真值：

| 文件 | 职责 |
| --- | --- |
| `../packages/design-system/src/AppShellV2/app-shell-v2.css` | 全部框架布局与视觉 |
| `../packages/design-system/src/AppShellV2/app-shell-v2.js` | 全部框架结构与交互 |
| `framework-2.js` | 默认配置、配置校验、统一挂载入口 |
| `framework-2.schema.json` | 供模型和 IDE 使用的配置结构 |
| `page-template.html` | 新业务页面唯一复制模板 |

禁止从 `staff-portal-homepage.html`、`basic-info.html` 等业务示例复制框架代码。

## 2. 固定尺寸

固定值已经封装在底层 CSS，不允许业务页面再次声明。

| 规则 | 固定值 |
| --- | --- |
| 顶部导航高度 | `52px` |
| 页签栏高度 | `40px` |
| 左侧菜单宽度 | `256px` |
| 左侧菜单收起宽度 | `56px` |
| 操作区距四周 | `12px` |
| 卡片间距 | `12px` |
| 应用下拉每行上限 | `5` 个 |
| 系统名称字体 | 苹方，加粗，`18px/24px` |

对应只读变量：

```css
--frame2-topbar-height: 52px;
--frame2-tabsbar-height: 40px;
--frame2-sidebar-width: 256px;
--frame2-sidebar-collapsed-width: 56px;
--frame2-workspace-inset: 12px;
--frame2-card-gap: 12px;
--frame2-page-background: 通用工作区背景;
```

所有页面必须使用框架提供的 `--frame2-page-background`。业务内容容器保持
`background: transparent`，不得用纯色覆盖整个工作区背景。

## 3. 标准引用顺序

所有业务页面必须保持以下顺序：

```html
<link rel="stylesheet" href="../packages/design-system/src/base.css" />
<link rel="stylesheet" href="./theme.css" />
<link rel="stylesheet" href="../packages/design-system/src/AppShellV2/app-shell-v2.css" />

<div class="frame2-stage ds-scope">
  <!-- 这里只放业务内容 -->
</div>

<script src="../assets/icon-registry.js"></script>
<script src="../packages/design-system/src/AppShellV2/app-shell-v2.js"></script>
<script src="./framework-2.js"></script>
```

然后只调用：

```js
WiseFramework2.mount({
  activeApp: 'example',
  activeFeature: 'example-list',
  appGroups: [
    { key: 'home', label: '首页', href: './staff-portal-homepage.html' },
    { key: 'example', label: '示例分组', apps: [
      { key: 'example-list', label: '示例应用' }
    ] }
  ]
});
```

不要直接调用 `WiseAppShellV2.init()`。该方法属于底层实现接口。

## 4. 页面结构规则

### 无左侧菜单

应用没有菜单时，不配置 `appMenus`，框架会自动隐藏左侧菜单。页签和内容区横向拉通。

```js
appGroups: [
  { key: 'report', label: '统计报表', href: './report.html' }
]
```

### 有左侧菜单

应用存在菜单时，通过 `appMenus[应用 key]` 配置。框架自动切换为“顶部 + 左侧”结构。

```js
appMenus: {
  'staff-manage': [
    { key: 'staff', label: '教职工管理', icon: 'home', children: [
      { key: 'staff-list', label: '教职工列表' },
      { key: 'staff-change', label: '信息变更' }
    ] }
  ]
}
```

禁止通过 CSS 手动显示、隐藏或调整 `.frame2-sidebar`。

## 5. 顶部应用规则

顶部导航支持两种数据：

### 直接应用

没有 `apps` 字段，点击后直接跳转，不展示下拉。

```js
{ key: 'home', label: '首页', href: './staff-portal-homepage.html' }
```

### 应用分组

包含 `apps` 字段，点击或悬浮后展示应用宫格。

```js
{
  key: 'assessment',
  label: '考核评价',
  apps: [
    { key: 'annual', label: '年度考核', href: './annual-assessment.html' },
    { key: 'period', label: '聘期考核', href: './period-assessment.html' }
  ]
}
```

应用宫格自动判断列数，一行最多 5 个。业务页面不设置下拉宽度和列数。

## 6. 角色切换规则

个人中心和角色切换是两个独立功能：

- 点击头像或姓名：搜索、换肤、中英文、个人中心、修改密码、退出登录。
- 点击角色名称：只展示角色列表。

不同角色拥有不同应用时，使用 `roleProfiles`：

```js
roleName: '综合办公室',
roleProfiles: {
  '综合办公室': {
    appGroups: [
      { key: 'office', label: '综合事务', apps: [
        { key: 'expert', label: '专家库建设' }
      ] }
    ]
  },
  '校领导（只读驾驶舱）': {
    appGroups: [
      { key: 'decision', label: '决策中心', apps: [
        { key: 'statistics', label: '核心数据统计' }
      ] }
    ]
  }
}
```

切换角色后，框架自动更新：

- 右上角当前角色。
- 顶部应用分组和应用。
- 全局搜索的应用范围。
- 当前应用激活态。
- 左侧菜单显示状态。

## 7. 页签规则

- 首页页签固定在第一位。
- 首页页签带房子图标。
- 首页页签不可关闭。
- 详情页不展示面包屑。
- 普通页签可以关闭。
- 点击带 `href` 的页签直接跳转。
- 刷新和全屏由框架统一提供。

```js
tabs: [
  { key: 'home', label: '首页', wiseIcon: 'homeOutline', closable: false },
  { key: 'staff-list', label: '教职工列表', closable: true }
]
```

## 8. 业务内容规则

`.frame2-stage` 的直接子元素会被框架自动移动到内容区。业务页面只定义自己的命名空间：

```html
<div class="frame2-stage ds-scope">
  <main class="staff-list-page">...</main>
</div>
```

```css
.staff-list-page { ... }
.staff-list-page__toolbar { ... }
```

禁止使用以下选择器：

```css
.frame2-topbar
.frame2-brand
.frame2-module-tabs
.frame2-sidebar
.frame2-tabsbar
.frame2-content-shell
.frame2-content
```

也禁止使用 `body > div:nth-child(...)`、固定像素定位或复制框架 DOM。

## 9. 主题规则

主题色只通过 `theme.css` 和设计 Token 修改。边框线、中性色、文字层级不随主题色变化。

业务页面不得直接修改：

- 顶部导航背景图。
- 系统 Logo 和头像尺寸。
- 框架边框色。
- 页签形状。
- 左侧菜单宽度。
- 框架 z-index。

## 10. 配置校验

`WiseFramework2.mount()` 会在渲染前检查：

- 系统名称是否存在。
- 是否至少有一个应用或应用分组。
- 应用和分组是否包含 `key`、`label`。
- 应用 key 是否重复。
- 每个角色是否配置 `appGroups`。

完整字段参见 `framework-2.schema.json`。

## 11. 给其他模型的固定指令

将框架文件交给其他模型时，使用以下指令：

```text
使用 framework-2/page-template.html 创建页面。
先读取 framework-2/README.md 和 framework-2/framework-2.schema.json。
只修改业务内容和 WiseFramework2.mount({...}) 配置。
禁止复制框架 DOM，禁止覆盖任何 .frame2-* CSS，禁止修改框架固定尺寸。
有左侧菜单时配置 appMenus；没有菜单时不配置，框架自动横向拉通。
```

## 12. 自检清单

交付前必须确认：

1. 页面只调用 `WiseFramework2.mount()`。
2. 页面没有 `.frame2-*` CSS 覆盖。
3. 操作区四周均为 12px。
4. 卡片间距为 12px。
5. 首页页签固定且不可删除。
6. 无菜单应用不预留左侧空间。
7. 有菜单应用自动显示 256px 左栏。
8. 应用下拉一行不超过 5 个。
9. 头像菜单和角色菜单互相独立。
10. 页面在 1366、1440、1920 宽度下无重叠和错位。
