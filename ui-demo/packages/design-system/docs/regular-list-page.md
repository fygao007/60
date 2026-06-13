# 常规列表页模板

来源：`mastergo://getd2c/195991886967017-11-041340`

原始 D2C 落盘：

- HTML：`.mastergo/regular-list/195991886967017-11-041340.html`
- 图标：`.mastergo/regular-list/asset/icons/`

常规列表页用于有筛选、有数据、有批量操作和分页的后台管理场景。业务实现优先复用 `DSRegularListTemplate`，只替换页签、字段、操作、列定义和数据。

## 页面结构

1. 页面画布基准为 `1196px × 820px`，四周留白 `12px`。
2. 内容卡片使用 `12px` 圆角，白色背景，纵向布局。
3. 顶部为一级页签和右侧状态选择，高度 `52px`。
4. 提示条位于页签下方，左右边距 `16px`，背景 `#EBECFF`。
5. 主内容依次为筛选区、批量工具栏、数据统计、表格。
6. 底部操作区高度 `64px`，左侧分页，右侧场景操作。

## 组件映射

| 模板区域 | 设计系统组件 | 配置 |
|---|---|---|
| 一级页签 | `DSTabs variant="section"` | 多页签时展示，选中态使用 8px 色块 |
| 筛选区 | `DSFilterBar` | 7 个字段、默认展开、支持收起 |
| 筛选字段 | `DSField` + `DSInput` / `DSSelect` | 标签宽 `94px`，控件高 `32px` |
| 查询操作 | `DSButton` | 更多、重置、查询、展开/收起 |
| 批量操作 | `DSButton` | 普通按钮和带下拉箭头按钮 |
| 表格工具 | `DSIconButton` | 全屏、列设置 |
| 数据统计 | 模板统计条 | 主色文字，背景 `#F5F5FF` |
| 数据表格 | `DSDataTable variant="lowcode"` | 复选框、序号、4 个业务列、固定操作列 |
| 分页 | `DSPagination` | 总数、页码、跳页、每页条数 |
| 底部操作 | `DSButton` | 40px 高次按钮和主按钮 |

## 交互规则

- 一级页签切换后刷新当前列表条件与数据。
- 筛选项超过首行时使用“展开/收起”，操作按钮始终位于筛选区末尾。
- “查询”提交当前条件；“重置”恢复默认条件并重新查询。
- 工具栏允许换行，表格工具保持在右侧。
- 勾选行后批量操作只作用于已选数据。
- 表格宽度不足时横向滚动；复选框、序号和操作列保持固定。
- 底部分页和场景操作不随表格横向滚动。
- 小屏下筛选区降为两列和一列，底部操作允许分行，不压缩表格列。

## 尺寸与视觉

| 项目 | 数值 |
|---|---:|
| 页面外边距 | `12px` |
| 顶部页签高度 | `52px` |
| 主内容水平内边距 | `16px` |
| 提示条高度 | `40px` |
| 筛选区内边距 | `16px 16px 8px` |
| 字段间距 | `8px` |
| 字段最小宽度 | `240px` |
| 字段标签宽度 | `94px` |
| 控件和按钮高度 | `32px` |
| 工具栏按钮间距 | `4px` |
| 表头高度 | `40px` |
| 数据行高度 | `46px` |
| 业务列宽 | `240px` |
| 底部操作区高度 | `64px` |
| 底部按钮高度 | `40px` |

- 主色：`#333FFF`。
- 提示条背景：`#EBECFF`。
- 统计条背景：`#F5F5FF`。
- 表头背景：`#FAFAFA`。
- 控件边框：`#DCDCE0`。
- 表格边框：`#EEEEF0`。

## React 示例

```jsx
<DSRegularListTemplate
  tabs={[
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待提交' },
  ]}
  activeTab="all"
  notice="列表数据每小时同步一次"
  filterProps={{
    fields: [
      { key: 'name', label: '姓名', placeholder: '请输入姓名' },
      { key: 'department', label: '部门', type: 'select', options: ['人事处', '教务处'] },
    ],
    onSearch: handleSearch,
    onReset: handleReset,
  }}
  tableProps={{
    columns,
    data,
    selectedRowKeys,
    onSelectRow: handleSelectRow,
  }}
  pagination={{ total: 100, totalPages: 10, current: 1, pageSize: 10 }}
/>
```
