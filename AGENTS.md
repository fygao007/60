# 60 系统 UI 生成约束

处理 `ui-demo` 页面或组件前，必须先读取：

1. `ui-demo/AI_COMPONENT_USAGE.md`
2. `ui-demo/packages/design-system/specs/edit-overlay-templates.json`（涉及弹窗、抽屉或编辑表单时）
3. 对应组件源码与专项规范文档

## 强制规则

- 业务页面必须优先复用 `@wisedu/design-system` 导出组件。
- 禁止在业务页面复制 `.ds-modal`、`.ds-drawer`、`.ds-edit-field` 的内部 DOM 或重新声明其核心尺寸。
- 单列编辑弹窗使用 `DSSingleEditModal`。
- 双列编辑弹窗使用 `DSDoubleEditModal`。
- 带分组编辑抽屉使用 `DSGroupedEditDrawer`。
- 字段使用 `DSEditField`，分组使用 `DSFormGroup`，输入控件使用对应 `DS*` 基础组件。
- 不得通过页面级 CSS 覆盖模板宽高、标签宽度、字段间距、头尾高度和内容边距。
- 修改规范数值时只编辑 manifest，然后运行 `npm run generate:edit-overlay-spec`。
- 修改组件或预览后必须运行 `npm run validate` 和 `npm run test:edit-overlays`。

## 允许的业务定制

- 标题、字段、文案、选项、默认值和提交逻辑。
- `help`、`error`、`required`、`fullWidth` 和 `align` 等组件公开属性。
- 自定义 footer 内容，但仍应使用 `DSButton` 并保持单主操作。

## 禁止的替代实现

- 手写遮罩、关闭按钮、焦点循环或页面滚动锁定。
- 用普通 `div` 模拟输入框、选择器、开关、日期或富文本组件。
- 为“贴设计稿”在页面内写固定 `margin-left`、绝对定位或重复的 `94px / 16px / 20px` 布局规则。
