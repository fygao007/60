# 全局规则

来源：MasterGo《📌【PC】基础控件 / 全局规则⭐️》

## 已沉淀内容

- 色彩：品牌色、功能色、中性色、透明度关系。
- 字体：Mac 使用苹方，Windows 使用阿里巴巴普惠体 2.0；桌面端默认 14px，最小 12px。
- 间距：4px 基准递增。
- 圆角：2/4/6/8/10/12/pill。
- 阴影：xs/sm/md/lg 四级阴影。
- 基础页面：页面背景、卡片、标题、标签、输入、选择、文本域、链接按钮。

## 组件库文件

- `src/tokens.css`：全局设计变量。
- `src/base.css`：页面生成常用基础类。
- `src/Button` / `src/ButtonGroup`：按钮与按钮组。
- `src/Field`：表单字段、输入框、选择器、文本域。
- `src/Tag` / `src/Tabs`：状态标签与页签。
- `src/Card` / `src/PageHeader`：内容容器与页面标题区。
- `src/DataTable` / `src/Pagination` / `src/FilterBar`：列表页核心组件。
- `src/Modal` / `src/Drawer`：确认弹窗、编辑弹窗、详情抽屉等浮层。
- `src/AppShell`：PC 后台框架壳。
- `src/CrudTemplate` / `src/AuditTemplate` / `src/ImportWizard` / `src/EmptyState`：常见页面模板。

## React 引用规则

```js
import {
  DSAppShell,
  DSButton,
  DSCard,
  DSDataTable,
  DSField,
  DSInput,
  DSModal,
  DSPageHeader,
  DSSelect,
  DSTabs,
  DSTag,
} from '@wisedu/design-system'
```

页面内不重复定义同名基础样式；若必须扩展，优先通过外层业务 class 组合设计变量。

## 页面生成要求

生成业务页面时优先使用 CSS 变量，而不是硬编码颜色与间距：

```css
color: var(--ds-color-text);
background: var(--ds-color-bg-page);
border-radius: var(--ds-radius-xl);
```

若需要快速 HTML 预览，也应使用同名变量或对应数值，确保和 React 组件库一致。

## 字体规则

根据全局规则「字体 Fonts」画板，页面生成时按以下规则落地：

- 字体族：`PingFang SC` / `Alibaba PuHuiTi 2.0` 优先，系统字体兜底。
- 默认字号：正文、表格、按钮、表单输入使用 `14px`。
- 次级字号：辅助信息、统计说明、分页说明使用 `13px`。
- 最小字号：弱提示、角标、极小辅助文本使用 `12px`。
- 行高规则：常规文本行高按 `font-size + 8px` 处理。
- 字重规则：普通文本 `400`，标题/强调 `600`，中强调 `500`。


## PC 框架尺寸校准

根据框架布局和方案管理页面截图，已校准以下全局尺寸：

- 左侧收起导航宽度：`--ds-nav-width-collapsed: 76px`
- 顶部页签高度：`--ds-topbar-height: 48px`
- 页面内容边距：`--ds-page-padding: 24px`
- 卡片圆角：`--ds-radius-xl: 12px`
- 表格行高：`--ds-table-row-height: 48px`
- 表头高度：`--ds-table-header-height: 48px`
- 常规输入控件高度：`--ds-control-height-lg: 36px`
- 普通按钮高度：`--ds-control-height-md: 32px`

后续生成 PC 页面时，框架级尺寸优先使用这些 token。
