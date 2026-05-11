# PC 应用框架外壳规范

本文档沉淀当前 `primary-nav.html` 已实现的框架结构，用于后续生成 PC 管理端页面。

## 三层结构

框架分为三层，层级从低到高：

1. **一级导航层**
   - 固定在最左侧。
   - 宽度视觉体系为 `80px`，内容主体按 `64px + 8px * 2` 排布。
   - 负责 Logo、系统名、搜索、一级业务入口、底部工具、头像和管理员入口。

2. **导航区**
   - 从左侧 `64px` 开始覆盖在一级导航上方。
   - 背景为浅色渐变。
   - 展开时包含 `180px` 二级导航栏。
   - 收起时隐藏二级导航栏，只保留右侧操作区。

3. **操作区**
   - 覆盖在导航区右侧。
   - 展开二级导航时，占据二级导航右侧剩余空间。
   - 收起二级导航时，自动扩展到一级导航右侧。
   - 包含顶部标签、内容区、底部分页/操作栏。

## 一级导航

文件结构参考：

- `.primary-nav`：一级导航根容器。
- `.primary-nav-head`：Logo、系统名、收起态展开按钮、搜索、首页。
- `.primary-nav-list`：一级业务菜单。
- `.primary-tools`：底部工具入口。
- `.primary-user`：管理员区域。

一级菜单必须支持按业务配置替换文字和图标：

```html
<a class="primary-nav-item" href="#" data-module="doctor">
  <span class="primary-nav-icon">
    <span class="wise-icon" data-wise-icon="doctor"></span>
  </span>
  <span class="primary-label">博士</span>
</a>
```

## 二级导航

二级导航位于 `.navigation-menu`，宽度 `180px`。

展开态：

- 顶部显示收起按钮 `indent-decrease.png`。
- 中部显示当前一级模块对应的二级菜单。
- 底部显示流程参数入口。

收起态：

- `.navigation-menu` 隐藏。
- `.primary-collapse-toggle` 在一级导航内部显示，使用 `indent-increase.png`。
- 搜索、首页、一级菜单按文档流顺势下移。

## 操作区

操作区位于 `.operation-area`。

结构：

- `.operation-tabs-bar`：顶部标签行。
- `.operation-tabs`：最近操作过的功能标签。
- `.operation-body`：白色内容区域。
- `.operation-header`：当前功能标题、元信息和操作按钮。
- `.operation-table-wrap`：业务表格/表单/卡片内容。
- `.operation-footer`：底部分页和提交按钮。

二级导航点击后必须刷新操作区：

1. 更新二级菜单选中态。
2. 将功能名称写入顶部标签。
3. 高亮当前标签。
4. 更新右侧内容标题和业务内容。

## 图标管理

图标统一维护在：

- `ui-demo/assets/icons/`
- `ui-demo/assets/icon-registry.js`

页面只通过名称引用：

```html
<span class="wise-icon" data-wise-icon="search"></span>
```

新增图标流程：

1. 将 SVG/PNG 放入 `ui-demo/assets/icons/`。
2. 在 `icon-registry.js` 的 `icons` 或 `inlineIcons` 中登记。
3. 页面使用 `data-wise-icon` 引用。

## 当前已登记图标

- `search`：搜索。
- `home`：首页。
- `prepare`：准备工作。
- `master`：硕士。
- `doctor`：博士。
- `camp`：夏令营。
- `recommend`：推免。
- `hkmt`：港澳台。
- `exam`：考务管理。
- `skin`、`download`、`settings`：底部工具。
- `chevronDown`、`chevronRight`：菜单箭头。
- `flow`：流程参数设置。

## 交互约定

- 点击一级导航：
  - 切换一级选中态。
  - 自动展开二级导航。
  - 渲染该模块二级菜单。

- 点击二级导航：
  - 切换二级选中态。
  - 刷新右侧操作区。
  - 记录到顶部最近操作标签。

- 点击顶部标签：
  - 恢复对应功能页面状态。

- 点击收起/展开：
  - 展开态按钮位于二级导航顶部。
  - 收起态按钮位于 Logo/系统下方、搜索上方。

## 后续生成页面时的默认做法

新 PC 页面如果没有特别说明，默认基于此框架：

1. 复用一级导航和导航区。
2. 按业务配置一级/二级菜单。
3. 在操作区生成具体功能页面。
4. 保持顶部标签和二级菜单点击联动。
