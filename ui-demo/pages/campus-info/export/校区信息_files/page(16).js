define(function (require) {
  return {
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {
      'globalVars.currentTab': {
        handler: function (newVal) {

          // 清空搜索条件，表格刷新
          if (this.$page('adv-search_9fxzfxdd')) {
            this.$page('adv-search_9fxzfxdd').doReset();
          }

          switch (newVal) {
            case 'dsh':// 待审核
              this.globalVars.auditPageType = 'DSH';

              this.$setComsProps({
                button_finishtostart: {
                  hidden: true  // 隐藏“办结退回”按钮
                },
                button_withdraw: {
                  hidden: true // 隐藏“撤回”按钮
                },
                button_sendback: {
                  hidden: false // 显示“退回”按钮
                },
                button_disagree: {
                  hidden: false // 显示“不通过”按钮
                },
                button_agree: {
                  hidden: false // 显示“通过”按钮
                },
              });

              // 隐藏“修改审批文号”按钮
              if (this.misPage('adv-table_69d958zu')) {
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('button_batchEdit', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('x3pmhbjt', {
                  hidden: true
                });
                // 隐藏“代申请/新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('lwq197fe', {
                  hidden: true
                });
                // 隐藏“代申请/新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('djtk7yph', {
                  hidden: true
                });
                // 隐藏“批量新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('m725tp5e', {
                  hidden: true
                });
                // 隐藏“批量新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('3c0sj032', {
                  hidden: true
                });
                // 隐藏“批量导入”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('7zumdb8p', {
                  hidden: true
                });
                // 隐藏“批量导入(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('9lmxqolq', {
                  hidden: true
                });
                // 隐藏“打印”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('iamyj67h', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('t7fsdaef', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('en3ccg79', {
                  hidden: true
                });
              }
              break;
            case 'ysh':// 已审核
              this.globalVars.auditPageType = 'YSH';

              this.$setComsProps({
                button_finishtostart: {
                  hidden: false  // 显示“办结退回”按钮
                },
                button_withdraw: {
                  hidden: false // 显示“撤回”按钮
                },
                button_sendback: {
                  hidden: true // 隐藏“退回”按钮
                },
                button_disagree: {
                  hidden: true // 隐藏“不通过”按钮
                },
                button_agree: {
                  hidden: true // 隐藏“通过”按钮
                },
              });

              // 隐藏“修改审批文号”按钮
              if (this.misPage('adv-table_69d958zu')) {
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('button_batchEdit', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('x3pmhbjt', {
                  hidden: true
                });
                // 隐藏“代申请/新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('lwq197fe', {
                  hidden: true
                });
                // 隐藏“代申请/新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('djtk7yph', {
                  hidden: true
                });
                // 隐藏“批量新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('m725tp5e', {
                  hidden: true
                });
                // 隐藏“批量新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('3c0sj032', {
                  hidden: true
                });
                // 隐藏“批量导入”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('7zumdb8p', {
                  hidden: true
                });
                // 隐藏“批量导入(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('9lmxqolq', {
                  hidden: true
                });
                // 隐藏“打印”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('iamyj67h', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('t7fsdaef', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('en3ccg79', {
                  hidden: true
                });
              }
              break;
            case 'dsq':// 代申请
              this.globalVars.auditPageType = 'DSQ';

              this.$setComsProps({
                button_finishtostart: {
                  hidden: true  // 隐藏“办结退回”按钮
                },
                button_withdraw: {
                  hidden: true // 隐藏“撤回”按钮
                },
                button_sendback: {
                  hidden: true // 隐藏“退回”按钮
                },
                button_disagree: {
                  hidden: true // 隐藏“不通过”按钮
                },
                button_agree: {
                  hidden: true // 隐藏“通过”按钮
                },
              });

              if (this.misPage('adv-table_69d958zu')) {
                // 隐藏“修改审批文号”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('button_batchEdit', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('x3pmhbjt', {
                  hidden: true
                });
                // 显示“代申请/新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('lwq197fe', {
                  hidden: false
                });
                // 显示“代申请/新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('djtk7yph', {
                  hidden: false
                });
                // 显示“批量新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('m725tp5e', {
                  hidden: false
                });
                // 显示“批量新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('3c0sj032', {
                  hidden: false
                });
                // 显示“批量导入”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('7zumdb8p', {
                  hidden: false
                });
                // 显示“批量导入(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('9lmxqolq', {
                  hidden: false
                });
                // 隐藏“打印”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('iamyj67h', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('t7fsdaef', {
                  hidden: true
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('en3ccg79', {
                  hidden: true
                });

                // 根据权限控制代申请 tab 页按钮展示
                if (!this.$unPermission('lwq197fe') && !this.$unPermission('djtk7yph')) {
                  // “代申请/新增”与“代申请/新增（审核通过）”按钮均有权限，隐藏“代申请/新增”按钮
                  this.misPage('adv-table_69d958zu').setLeftToobarBtn('lwq197fe', {
                    hidden: true
                  });
                }
                if (!this.$unPermission('m725tp5e') && !this.$unPermission('3c0sj032')) {
                  // “批量新增”与“批量新增（审核通过）”按钮均有权限，隐藏“批量新增”按钮
                  this.misPage('adv-table_69d958zu').setLeftToobarBtn('m725tp5e', {
                    hidden: true
                  });
                }
                if (!this.$unPermission('7zumdb8p') && !this.$unPermission('9lmxqolq')) {
                  // “批量导入”与“批量导入（审核通过）”按钮均有权限，隐藏“批量导入”按钮
                  this.misPage('adv-table_69d958zu').setLeftToobarBtn('7zumdb8p', {
                    hidden: true
                  });
                }
              }
              break;
            case 'qb':// 全部
              this.globalVars.auditPageType = '';

              this.$setComsProps({
                button_finishtostart: {
                  hidden: true  // 隐藏“办结退回”按钮
                },
                button_withdraw: {
                  hidden: true // 隐藏“撤回”按钮
                },
                button_sendback: {
                  hidden: true // 隐藏“退回”按钮
                },
                button_disagree: {
                  hidden: true // 隐藏“不通过”按钮
                },
                button_agree: {
                  hidden: true // 隐藏“通过”按钮
                },
              });

              // 显示“修改审批文号”按钮
              if (this.misPage('adv-table_69d958zu')) {
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('button_batchEdit', {
                  hidden: false
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('x3pmhbjt', {
                  hidden: false
                });
                // 隐藏“代申请/新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('lwq197fe', {
                  hidden: true
                });
                // 隐藏“代申请/新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('djtk7yph', {
                  hidden: true
                });
                // 隐藏“批量新增”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('m725tp5e', {
                  hidden: true
                });
                // 隐藏“批量新增(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('3c0sj032', {
                  hidden: true
                });
                // 隐藏“批量导入”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('7zumdb8p', {
                  hidden: true
                });
                // 隐藏“批量导入(审核通过)”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('9lmxqolq', {
                  hidden: true
                });
                // 显示“打印”按钮
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('iamyj67h', {
                  hidden: false
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('t7fsdaef', {
                  hidden: false
                });
                this.misPage('adv-table_69d958zu').setLeftToobarBtn('en3ccg79', {
                  hidden: false
                });
              }
              break;
          }
        },
        immediate: true
      }
    },
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageComputed: {
      getTabName: function () {
        if (this.globalVars.auditPageType === 'DSH') {
          return '待审核';
        } else if (this.globalVars.auditPageType === 'YSH') {
          return '已审核';
        } else if (this.globalVars.auditPageType === 'DSQ') {
          return '代申请';
        } else {
          return '全部'
        }

      }
    },
    // var1:"变量",//响应式变量，该变量不能加到组件参数内,但是写到组件模板里
    /**
     * 响应式变量，当值变化时可以影响所有绑定的值,建议把需要绑定到组件参数里的变量申明到这里面
     */
    globalVars: {
      config: {
        dataModelName: 'eastudentchangeapply',// 数据模型名
        detailDrawerTitle: '学籍异动审核', // 详情弹窗标题
        genAuditFormPageCodeByRowData: function (row) { // 详情业务表单 pageCode 生成规则
          return this.genAuditFormPageCode(row['ydlxdm']);
        },
        genAuditFormPageCode: function (id) {// 详情业务表单 pageCode 生成规则
          return 'eaxjydgl' + id + 'Form';
        },
        getProcessInstanceId: function (row) {// 获取流程实例 id
          return row.procInstId;
        },
        genSelectedRowTip: function (row) {// 勾选后的条目明细信息
          return '【' + row['eastudentchangeapply.xm'] + '：' + row['eastudentchangeapply.ydlxid_name'] + '】';
        }
      },

      currentTab: 'dsh',// dsh:待审核；ysh:已审核；qb:全部
      auditPageType: 'DSH',// DSH:待审核；YSH:已审核；'':全部
      currentShowDetailRow: null, // 当前正在被查看详情的 row
      prevnodesDatasource: [],// 回退节点下拉数据源


      // 审核弹窗意见组件必传参数
      flowParams: {
        processDefinitionKey: ''
      },
      auditDetailBusinessFormData: null,// 审核详情页的表单数据，存在值，需要在“通过”前先保存
      auditDetailChangeApplyId: null,// 审核详情页的表单数据中的异动申请 id，用于显示变更日志

      auditFormReadonlyNodeEnable: false,// 审核表单“退回节点，退回至发起人”是否启用
      auditFormNodeEnable: false,// 审核表单“退回节点”是否启用
      auditFormSignatureEnable: false,// 审核表单“电子签名”是否启用
      auditFormCommentLabel: '',// 审核表单意见组件 label

      auditForm: {
        node: '',
        comment: {
          taskComment: ''
        },
        signature: ''
      },
      auditFormRules: {
        node: [
          { required: true, message: '请选择退回节点', trigger: 'change' }
        ],
        comment: [
          { required: true, message: '请输入', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (!value || !value.taskComment) {
                callback(new Error('请输入'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
        signature: [
          { required: true, message: '请签名', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请签名'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
      },
      forceUpdateProps: [],

      applyDialogShowXS: true,// 选择异动类型弹窗里是否显示“学生”字段
      applyDialogYdlxid: '',// 选择异动类型弹窗里选择的异动类型 id
      applyDialogYdlxdm: '',// 选择异动类型弹窗里选择的异动类型代码
      applyDialogXsid: '',// 选择异动类型弹窗里选择的学生 id
      applyDialogApplyDesc: '', // 选择异动类型弹窗里的描述信息 
      applyDialogPcid: ''// 选择异动类型弹窗点“下一步”后得到的批次 id
    },
    /**
     * 页面被重新激活时调用
     */
    pageActivated: function () {
      //console.log('页面激活')  
    },
    /**
     * 页面失去激活被缓存时调用
     */
    pageDeactivated: function () {
      //console.log('页面失活')  
    },
    /**
     * 固定方法，页面js初始化完成后调用,当前能修改js变量，修改组件初始化属性或者设置组件默认值
     */
    pageCreated: function () {
      //console.log('页面js初始化完成后调用')
    },
    /**
     * 固定方法，页面准备完成后调用，当前可以操作组件属性，调用未隐藏组件实例方法
     */
    pageReady: function () {
      //console.log('页面准备完成后调用')
    },
    /**
     * 固定方法，页面销毁前调用
     */
    pageDestroy: function () {
      //console.log('页面销毁前调用')
    },
    /**
     * 刷新“待审核”角标
     */
    refreshDSHBadgeCount: function () {
      if (this.misPage('adv-table_69d958zu')) {
        this.misRequest({
          url: this.misPage('adv-table_69d958zu').dataPath,
          method: 'post',
          data: {
            pageNo: -99,// 只请求总数
            pageSize: 1,
            params: { field: "page", auditPageType: "DSH" }
          }
        }).then(res => {
          if (res.code === '0') {
            this.misPage('tabs-title_sf7rjdwj').setBadge('dsh', res.data.totalSize);
          } else {
            this.misPage('tabs-title_sf7rjdwj').setBadge('dsh', 0);
          }
        });
      }
    },
    /**
     * 描述：mounted
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    adv_search_9fxzfxdd_mounted: function (event) {
      // 初始化后主动请求数据
      this.$page('adv-search_9fxzfxdd').doSearch();
    },
    /**
    * 描述：mounted
    * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
    */
    adv_table_69d958zu_mounted: function (event) {
      // 表格挂载后，请求“待审核”角标数值
      this.refreshDSHBadgeCount();

      // 在"全部"tab 页下隐藏“批量审批文号”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('button_batchEdit', {
        hidden: this.globalVars.currentTab !== 'qb'
      });
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('x3pmhbjt', {
        hidden: this.globalVars.currentTab !== 'qb'
      });
      // 隐藏“代申请/新增”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('lwq197fe', {
        hidden: this.globalVars.currentTab !== 'dsq'
      });
      // 隐藏“代申请/新增(审核通过)”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('djtk7yph', {
        hidden: true
      });
      // 隐藏“批量新增”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('m725tp5e', {
        hidden: true
      });
      // 隐藏“批量新增(审核通过)”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('3c0sj032', {
        hidden: true
      });
      // 隐藏“批量导入”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('7zumdb8p', {
        hidden: true
      });
      // 隐藏“批量导入(审核通过)”按钮
      this.misPage('adv-table_69d958zu').setLeftToobarBtn('9lmxqolq', {
        hidden: true
      });
    },
    /**
     * 描述：mounted
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    tabs_title_sf7rjdwj_mounted: function (event) {
      var self = this;
    },
    /**
     * 描述：click
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    tabs_title_sf7rjdwj_click: function (event) {
      var self = this;
      this.globalVars.currentTab = event.evArgs[0].name;
    },
    /**
     * 描述：按钮处理
     * @param{event}  event:{btnList:要处理的按钮组；row:行数据,column:列数据；{isActiveByRow}:是否为编辑态；scope:表格对象；setBtnItemProp:设置指定按钮属性{id,prop};callback:回调函数，返回按钮数组} return:
     */
    btn_render_nuqiho9u: function (event) {
      // 按钮权限
      const btnAuths = event.row.flowLongColumn || {};
      // 根据权限过滤按钮
      const btns = event.btnList.filter(btn => {
        switch (btn.id) {
          case 'agree':
            return this.globalVars.currentTab !== 'ysh' && btnAuths.canAgree;// “已审核”没通过按钮
          case 'disagree':
            return this.globalVars.currentTab !== 'ysh' && btnAuths.canDisagree;// “已审核”没不通过按钮
          case 'finishToStart':
            return this.globalVars.currentTab !== 'dsh' && btnAuths.canFinishToStart;// “待审核”没办结退回按钮
          case 'sendBack':
            return this.globalVars.currentTab !== 'ysh' && btnAuths.canSendBack;// “已审核”没退回按钮
          // case 'view':
          //   return btnAuths.canView;
          case 'withdraw':
            return this.globalVars.currentTab !== 'dsh' && btnAuths.canWithdraw;// “待审核”没撤回按钮
          default:
            return true;
        }
      });
      // 将过滤后的按钮置为显示
      btns.forEach(btn => btn.hidden = false);

      event.callback(btns);
    },
    /**
     * 获取当前勾选的数据构造的 querySetting
     * 如果有数据但没有勾选，则取搜索组件的 querySetting
     */
    getCheckedRowsQuerySetting: function () {
      // 检查表格是否有数据，有数据且没有勾选，则按照搜索条件批量操作
      const checkedRows = this.misPage('adv-table_69d958zu').getCheckboxAllRecords();

      let querySetting = [];

      if (checkedRows.length === 0) {
        // 没勾选，检查表格是否有数据，有数据则等同于操作这部分数据；否则给出提示
        if (this.misPage('adv-table_69d958zu').tablePager.total > 0) {
          // 获取当前 querySetting 
          querySetting = this.misPage('adv-table_69d958zu').queryModel.querySetting;
        } else {
          this.$message({
            message: '没有可操作的数据',
            type: 'warning'
          });
          return null;
        }
      } else {
        // 构造勾选数据的 querySetting
        const ids = checkedRows.map(row => row.id).join(',');
        querySetting.push(
          {
            builder: "m_value_equal",
            linkOpt: "and",
            name: "id",
            value: ids
          }
        );
      }

      return querySetting;
    },
    /**
     * 获取目标条目的中文描述
     * 文字描述最多显示 5 条
     * 传入空数组时，将取当前搜索条件下的所有条目作为数据源
     */
    getTargetRowsTipText: function (rows) {
      let finalRows = null;
      let totalCount = null;

      if ((rows || []).length === 0) {
        finalRows = this.misPage('adv-table_69d958zu').tableData;// 使用当前表格数据作为数据源
        totalCount = this.misPage('adv-table_69d958zu').tablePager.total;// 使用当前表格总数据数作为总数
      } else {
        finalRows = rows;
        totalCount = rows.length;
      }

      if (finalRows.length > 0) {
        // 取前 5 条展示明细
        let tip = finalRows.slice(0, 5).map(row => this.globalVars.config.genSelectedRowTip(row)).join('');
        if (finalRows.length > 5) {
          tip += '...';
        }
        return '已选数据' + tip + '共<span style="padding: 0 4px;color: #333FFF;font-weight: 600;">' + totalCount + '</span>条';
      } else {
        return null;
      }
    },
    /**
     * 操作数据后的统一执行逻辑
     */
    doAfterOperate: function () {
      // 尝试关闭“审核详情”抽屉
      if (this.misPage('dialog_j5l0k6tg')) {
        this.misPage('dialog_j5l0k6tg').closeWindow();
      }
      // 保存后刷新表格
      this.misPage('adv-table_69d958zu').reloadData();
      // 待审核 tab 更新角标数值
      this.refreshDSHBadgeCount();
      // 重置回退节点下拉数据源
      this.globalVars.prevnodesDatasource = [];
      // 重置审核表单数据
      this.globalVars.auditForm = {
        node: '',
        comment: {
          taskComment: ''
        },
        signature: ''
      };
      // 重置审核弹窗意见组件必传参数
      this.globalVars.flowParams.processDefinitionKey = '';
      // 清空表单值
      this.globalVars.auditDetailBusinessFormData = null;
      // 清空异动申请 id
      this.globalVars.auditDetailChangeApplyId = null;
    },
    /**
     * 处理单个操作
     */
    handleSingleOperate: function (event) {
      const querySetting = [
        {
          builder: "m_value_equal",
          linkOpt: "and",
          name: "id",
          value: event.row.id
        }
      ];
      const tip = this.getTargetRowsTipText([event.row]);

      switch (event.btn.id) {
        case 'agree':
          this.openAuditDialog('agree', querySetting, tip);
          break;
        case 'disagree':
          this.openAuditDialog('disagree', querySetting, tip);
          break;
        case 'finishToStart':
          this.openAuditDialog('finishToStart', querySetting, tip);
          break;
        case 'sendBack':
          this.openAuditDialog('sendback', querySetting, tip);
          break;
        case 'withdraw':
          this.openAuditDialog('withdraw', querySetting, tip);
          break;
      }
    },
    /**
     * 处理审核弹窗里发起的操作
     */
    handleAuditDetailDrawerOperate: async function (event) {
      const querySetting = [
        {
          builder: "m_value_equal",
          linkOpt: "and",
          name: "id",
          value: this.globalVars.currentShowDetailRow.id
        }
      ];
      const tip = this.getTargetRowsTipText([this.globalVars.currentShowDetailRow]);

      switch (event.btn.id) {
        case 'drawer_changeLog':
          this.$openPage({
            appCode: 'gsxjxxgl',
            pageCode: 'infoChangeLog',
            inlinePage: false,
            owner: this,
            pageParams: {
              "xgyy": "XJYD",
              //业务id
              "ywid": this.globalVars.auditDetailChangeApplyId
            },
            title: '变更日志'
          },
            {
              type: '2',
              winParams: {
                action: false,
                size: "90%"
              }
            });
          break;
        case 'drawer_delete':
          this.$resConfirm('', "确定删除该申请信息吗？",
            {
              confirmButtonText: "确定",
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            this.misRequest('eaxjydgl_xsd_xssqsc', {
              params: {
                id: this.globalVars.currentShowDetailRow.id
              }
            }).then(res => {
              if (res.code === '0') {
                // 关闭抽屉，刷新列表
                this.doAfterOperate();
              }
            });
          });
          break;
        case 'drawer_agree':
          const formValue = await this.misPage('page-runtime_nzt72n5w').validateForm();
          if (formValue === false) {
            // 校验失败
          } else {
            this.globalVars.auditDetailBusinessFormData = formValue;// 需要保存
            this.openAuditDialog('agree', querySetting, tip);
          }
          break;
        case 'drawer_disagree':
          this.openAuditDialog('disagree', querySetting, tip);
          break;
        case 'drawer_finishToStart':
          this.openAuditDialog('finishToStart', querySetting, tip);
          break;
        case 'drawer_sendBack':
          this.openAuditDialog('sendback', querySetting, tip);
          break;
        case 'drawer_withdraw':
          this.openAuditDialog('withdraw', querySetting, tip);
          break;
      }
    },
    /**
     * 处理批量操作
     */
    handleBatchOperate: function (event) {
      const querySetting = this.getCheckedRowsQuerySetting();
      if (!querySetting) {
        return;
      }

      const tip = this.getTargetRowsTipText(this.$page('adv-table_69d958zu').getCheckboxAllRecords());

      switch (event.$com.comKey) {
        case 'button_agree':
          this.openAuditDialog('agree', querySetting, tip);
          break;
        case 'button_disagree':
          this.openAuditDialog('disagree', querySetting, tip);
          break;
        case 'button_finishtostart':
          this.openAuditDialog('finishToStart', querySetting, tip);
          break;
        case 'button_sendback':
          this.openAuditDialog('sendback', querySetting, tip);
          break;
        case 'button_withdraw':
          this.openAuditDialog('withdraw', querySetting, tip);
          break;
      }
    },
    /**
     * 描述：详情
     * @param{event}  {row}:对应的行数据;{col}:对应的列数据;{btn}:点击的按钮；{scope}:表格对象 return:
     */
    action_ev_dnoijrol: function (event) {
      this.globalVars.currentShowDetailRow = event.row;// 记录正在被查看详情的 row

      let dialogParams = null;

      if (event.row['eastudentchangeapply.approvalStatus'] === '0') {
        // 草稿
        dialogParams = {
          auditFormPageCode: this.globalVars.config.genAuditFormPageCodeByRowData(event.row),
          ydlxid: event.row['eastudentchangeapply.ydlxid'],
          sfdsq: '0',
          formId: event.row.id,
          showAuditLog: false,
          formReadonly: (event.row['eastudentchangeapply.sqlx'] === '1' || (event.row['eastudentchangeapply.approvalStatus'] !== '0' && event.row['eastudentchangeapply.approvalStatus'] !== '-1')) && (this.globalVars.currentTab === 'ysh' || !event.row.flowLongColumn.canAgree),
          onGetFormData: (data, forceUpdateProps, setFromReadonly) => {
            if (data.createBy !== this.$getUserInfo().userId) {
              // 只有当前用户才可以删、保存、提交
              dialog.$setBtnsProp({
                "drawer_delete": {
                  hidden: true
                },
                "drawer_save": {
                  hidden: true
                },
                "drawer_submit": {
                  hidden: true
                },
              });

              setFromReadonly();
            }

            this.globalVars.forceUpdateProps = forceUpdateProps;
          }
        };
      } else {
        // 非草稿
        dialogParams = {
          auditFormPageCode: this.globalVars.config.genAuditFormPageCodeByRowData(event.row),
          processInstanceId: this.globalVars.config.getProcessInstanceId(event.row),
          id: event.row.id,
          showAuditLog: true,
          formReadonly: (event.row['eastudentchangeapply.sqlx'] === '1' || (event.row['eastudentchangeapply.approvalStatus'] !== '0' && event.row['eastudentchangeapply.approvalStatus'] !== '-1')) && (this.globalVars.currentTab === 'ysh' || !event.row.flowLongColumn.canAgree),
          onGetFormData: (data, forceUpdateProps, setFromReadonly) => {
            if (data.xjsfgx === '1') {
              this.globalVars.auditDetailChangeApplyId = data.id;// 取得异动申请 id
              dialog.$setBtnsProp({
                'drawer_changeLog': { hidden: false },// 显示“查看变更日志”按钮
              });
            }

            if (data.createBy !== this.$getUserInfo().userId) {
              // 只有当前用户才可以删、保存、提交
              dialog.$setBtnsProp({
                "drawer_delete": {
                  hidden: true
                },
                "drawer_save": {
                  hidden: true
                },
                "drawer_submit": {
                  hidden: true
                },
              });
            }

            this.globalVars.forceUpdateProps = forceUpdateProps;
          }
        };
      }

      this.$setComProps("page-runtime_nzt72n5w", { pageParams: dialogParams });

      const dialog = this.$pageDialog({
        key: "dialog_j5l0k6tg",
        params: {},
        winParams: {
          title: this.globalVars.config.detailDrawerTitle
        }
      });

      // 控制弹窗底部按钮显隐
      dialog.$setBtnsProp({
        'drawer_delete': { hidden: event.row['eastudentchangeapply.approvalStatus'] !== '0' && event.row['eastudentchangeapply.approvalStatus'] !== '-1' },
        'drawer_finishToStart': { hidden: this.globalVars.currentTab === 'dsh' || !event.row.flowLongColumn.canFinishToStart },//  待审核没“办结退回”按钮
        'drawer_withdraw': { hidden: this.globalVars.currentTab === 'dsh' || !event.row.flowLongColumn.canWithdraw },// 待审核没“撤回”按钮
        'drawer_sendBack': { hidden: this.globalVars.currentTab === 'ysh' || !event.row.flowLongColumn.canSendBack },// 已审核没“退回”按钮
        'drawer_disagree': { hidden: this.globalVars.currentTab === 'ysh' || !event.row.flowLongColumn.canDisagree },// 已审核没“不通过”按钮
        'drawer_agree': { hidden: this.globalVars.currentTab === 'ysh' || !event.row.flowLongColumn.canAgree },// 已审核没“通过”按钮
        'drawer_save': { hidden: event.row['eastudentchangeapply.sqlx'] === '1' || (event.row['eastudentchangeapply.approvalStatus'] !== '0' && event.row['eastudentchangeapply.approvalStatus'] !== '-1') },// 只有代申请有
        'drawer_submit': { hidden: event.row['eastudentchangeapply.sqlx'] === '1' || (event.row['eastudentchangeapply.approvalStatus'] !== '0' && event.row['eastudentchangeapply.approvalStatus'] !== '-1') },// 只有代申请有
      });
    },
    /**
     * 关闭审核抽屉时回调
     * @param{event}  name:事件名称,dialog:当前弹窗对象 return:
     */
    destroy_dialog_y3518uef: function (event) {
      this.globalVars.currentShowDetailRow = null;// 清除记录
      this.globalVars.forceUpdateProps = [];
    },
    /**
     * 打开审核弹窗
     */
    openAuditDialog: async function (type, querySetting, selectRowsTipText) {
      // 根据流程实例 id 请求审核节点配置
      const configRes = await this.misRequest('eaxjydgl_flowformconfig_eastudentchangeflowbo', {
        params: {
          field: 'nodeConfig',
          ddlModel: {
            querySetting: querySetting,
            params: {
              auditPageType: this.globalVars.auditPageType,
              btnType: type
            }
          }
        }
      });

      if (configRes.code === '0') {
        this.globalVars.flowParams.processDefinitionKey = configRes.data.processKey;

        // rejectStrategy：0 不允许退回 1，驳回到发起人，3，驳回到指定节点
        if ((type === 'sendback') && (configRes.data.rejectStrategy === 3)) {
          // 退回操作时，允许退回至任意节点，请求节点下拉数据源
          const nodesRes = await this.misRequest({
            url: '/admin/flowlong/runtime/prevnodes',
            method: 'post',
            data: {
              nodeKey: configRes.data.nodeKey,
              processKey: configRes.data.processKey
            }
          });

          if (nodesRes.code === '0') {
            this.globalVars.prevnodesDatasource = nodesRes.data;
          }

          switch (configRes.data.rejectStrategy) {
            case 0:
              // 隐藏“退回节点，退回至发起人”
              this.globalVars.auditFormReadonlyNodeEnable = false;
              // 隐藏“退回节点”下拉
              this.globalVars.auditFormNodeEnable = false;
              break;
            case 1:
              // 显示“退回节点，退回至发起人”
              this.globalVars.auditFormReadonlyNodeEnable = true;
              // 隐藏“退回节点”下拉
              this.globalVars.auditFormNodeEnable = false;
              break;
            case 3:
              // 隐藏“退回节点，退回至发起人”
              this.globalVars.auditFormReadonlyNodeEnable = false;
              // 显示“退回节点”下拉
              this.globalVars.auditFormNodeEnable = true;
              break;
          }
        } else {
          // 隐藏“退回节点，退回至发起人”
          this.globalVars.auditFormReadonlyNodeEnable = false;
          // 隐藏“退回节点”下拉
          this.globalVars.auditFormNodeEnable = false;
        }

        // 已选数据提示文字赋值
        this.$setComProps("alert_gyqr7hrf", {
          title: selectRowsTipText
        });

        // 显隐电子签名
        this.globalVars.auditFormSignatureEnable = !!configRes.data.electricSign;

        let dialogTitle = '';
        switch (type) {
          case 'agree':
            this.globalVars.auditFormCommentLabel = '审核意见';
            dialogTitle = '通过';
            this.globalVars.auditForm.comment.taskComment = '通过';// 默认的审核意见
            break;
          case 'disagree':
            this.globalVars.auditFormCommentLabel = '审核意见';
            dialogTitle = '不通过';
            break;
          case 'finishToStart':
            this.globalVars.auditFormCommentLabel = '退回原因';
            dialogTitle = '办结退回';
            break;
          case 'sendback':
            this.globalVars.auditFormCommentLabel = '退回原因';
            dialogTitle = '退回';
            break;
          case 'withdraw':
            this.globalVars.auditFormCommentLabel = '撤回原因';
            dialogTitle = '撤回';
            break;
        }
        // 打开弹窗
        const dialog = this.$pageDialog({
          key: "dialog_awwzey3s",
          params: {
            type: type,
            querySetting: querySetting,
          },
          winParams: {
            title: dialogTitle
          }
        });
      }
    },
    /**
     * 描述：审核弹窗确认按钮
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_x3wchk3b: async function (event, closeNext) {
      var self = this;

      this.misPage('component_njo26gos').$refs['auditForm'].validate((valid) => {
        if (valid) {
          // 确定按钮 loading
          this.$setComProps("confirm_z2cjha8o", {
            loading: true
          });

          if (this.globalVars.auditDetailBusinessFormData) {
            // 先提交业务表单值
            this.misRequest('eaxjydgl_flowsubmit_eastudentchangeflowbo', {
              params: {
                ...this.globalVars.auditDetailBusinessFormData,
                id: this.globalVars.currentShowDetailRow.id,
                sftj: '0',
                forceUpdateProps: this.globalVars.forceUpdateProps.join(',')
              }
            }).then(res => {
              if (res.code === '0') {
                submit();
              } else {
                // 确定按钮取消 loading
                this.$setComProps("confirm_z2cjha8o", {
                  loading: false
                });
              }
            });
          } else {
            submit();
          }

          function submit() {
            const node = self.globalVars.auditForm.node;
            const comment = self.globalVars.auditForm.comment.taskComment;
            const signature = self.globalVars.auditForm.signature;

            // 调用 api
            self.misRequest('eaxjydgl_flow_eastudentchangeflowbo', {
              params: {
                ddlModel: {
                  querySetting: event.dialogParams.querySetting,
                  params: {
                    auditPageType: self.globalVars.auditPageType,
                    btnType: event.dialogParams.type,
                    nodeKey: node,
                    commentContent: comment,
                    commentSign: signature
                  }
                }
              }
            }).then(res => {
              // 确定按钮取消 loading
              self.$setComProps("confirm_z2cjha8o", {
                loading: false
              });

              if (res.code === '0') {
                // 关闭弹窗
                closeNext();
                // 执行收尾操作
                self.doAfterOperate();

                // // 调用进度组件
                // const { init } = self.$resAsyncProcess({
                //   initParams: {
                //     appCode: self.appCode,
                //     pageCode: self.pageCode,
                //     url: 'xxxxxxxxxxxxxxxxxxxxx'
                //   },
                //   bizBatchProcessParams:{}
                // });

                // init();
              }
            });
          }
        }
      });
    },

    /**
     * 描述：审核弹窗销毁
     * @param{event}  name:事件名称,dialog:当前弹窗对象 return:

     */
    destroy_dialog_fuptztwb: function (event) {
      // 重置回退节点下拉数据源
      this.globalVars.prevnodesDatasource = [];
      // 重置审核表单数据
      this.globalVars.auditForm = {
        node: '',
        comment: {
          taskComment: ''
        },
        signature: ''
      };
      // 重置审核弹窗意见组件必传参数
      this.globalVars.flowParams.processDefinitionKey = '';
      // 清空表单值
      this.globalVars.auditDetailBusinessFormData = null;
    },


    /**
     * 描述：表格加载前
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    adv_table_69d958zu_load_before: function (event) {
      // 禁用底部批量操作按钮
      this.$setComsProps({
        "button_finishtostart": {
          disabled: true
        },
        "button_withdraw": {
          disabled: true
        },
        "button_sendback": {
          disabled: true
        },
        "button_disagree": {
          disabled: true
        },
        "button_agree": {
          disabled: true
        }
      });
    },
    /**
     * 描述：表格加载完毕
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    adv_table_69d958zu_load_end: function (event) {
      // 启用底部批量操作按钮
      this.$setComsProps({
        "button_finishtostart": {
          disabled: false
        },
        "button_withdraw": {
          disabled: false
        },
        "button_sendback": {
          disabled: false
        },
        "button_disagree": {
          disabled: false
        },
        "button_agree": {
          disabled: false
        }
      });
    },

    /**
     * 描述：修改审批文号
     * @param{event}  {btn}:点击的按钮; return:

     */
    action_ev_w2yspmdh: function (event) {
      var self = this;

      const checkedRows = this.misPage('adv-table_69d958zu').getCheckboxAllRecords();
      if (checkedRows.length === 0) {
        this.$message({
          message: '未选择任何数据',
          type: 'warning'
        });
        return;
      }

      this.checkBatchOperationData("adv-table_69d958zu")
        .then(value => {
          if (value) {
            var tip = self.getBatchOperationTip("adv-table_69d958zu", "adv-search_9fxzfxdd", "eastudentchangeapply.xm");
            self.$setComProps("batchEdit", { alert: tip });
            self.$page("batchEdit").open();
          }
        });

    },
    /**
     * 描述：submit
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    batchEdit_submit: function (event) {
      var self = this;

      let params = {
        "onlyEmptyUpdate": event.evArgs[0].onlyEmptyUpdate,
        "clearDataFields": event.evArgs[0].clearDataFields,
        "formValue": event.evArgs[0].formValue,
        "querySetting": this.getBatchOperationQuerySetting("adv-table_69d958zu", "eastudentchangeapply.id")
      };
      this.misRequest("eaxjydgl_plxgspwh", { "params": params }, event.btn).then((data) => {
        if (data.code == '0') {
          this.misPage('adv-table_69d958zu').reloadData();
          this.$Msg(this.$LANG('singleModelMessageSaveSuccess'), 'success');
        }
      });
      // 这边写接口 ok再执行close方法 根据isRemove判断是否是移除标签
      self.$page("batchEdit").close();
    },

    /**
     * 描述：打印报表
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_ev_dzscmksk: function (event) {
      var self = this;
      let rows = this.misPage('adv-table_69d958zu').getCheckboxAllRecords();
      if (rows.length == 0) {
        this.$Msg(this.$LANG('singleModelMessageNoDataSelected'), 'warning');
        return;
      }
      let ids = rows.map((item) => item['eastudentchangeapply.id']);
      let type = '';
      switch (event.btn.id) {
        case 'iamyj67h':
          type = '1'
          break;
        case 't7fsdaef':
          type = '2'
          break;
        case 'en3ccg79':
          type = '3'
          break;
      }
      this.goFineReport({ params: { ids: ids.join(','), type: type } });
    },
    goFineReport(params) {
      this.misRequest('eaxjydgl_dyydbb', { params, misRequestParams: { errorTitle: this.$LANG('打印失败') } }).then((data) => {
        if (data.code == '0') {
          let url = data.data.modelData;
          window.open(url, '_blank');
        }
      });
    },

    /**
     * 描述：手工同步学籍信息
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_ev_w5pj8fno: function (event) {

      const checkedRows = this.misPage('adv-table_69d958zu').getCheckboxAllRecords();
      if (checkedRows.length === 0) {
        this.$message({
          message: '未选择任何数据',
          type: 'warning'
        });
        return;
      }
      let ids = checkedRows.map((item) => item['eastudentchangeapply.id']);
      this.misRequest("eaxjydgl_plgxxjxx", { "params": { ids: ids.join(',') } }, event.btn).then((data) => {
        if (data.code == '0') {
          this.misPage('adv-table_69d958zu').reloadData();
          this.$Msg('同步成功' + data.data.modelData + '条数据', 'success');
          this.doAfterOperate();
        }
      });
    },

    /**
     * 描述：打开选择异动类型弹窗
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_ev_hlbyug6t: function (event) {
      let dialogParams = null;
      switch (event.btn.id) {
        case "lwq197fe":
          // 代申请/新增
          this.globalVars.applyDialogShowXS = true;
          dialogParams = {
            type: '1'
          }
          break;
        case "djtk7yph":
          // 代申请/新增审核通过
          this.globalVars.applyDialogShowXS = true;
          dialogParams = {
            type: '2'
          }
          break;
        case "m725tp5e":
          // 批量新增
          this.globalVars.applyDialogShowXS = false;
          dialogParams = {
            type: '3'
          }
          break;
        case "3c0sj032":
          // 批量新增审核通过
          this.globalVars.applyDialogShowXS = false;
          dialogParams = {
            type: '4'
          }
          break;
        case "7zumdb8p":
          // 批量导入
          this.globalVars.applyDialogShowXS = false;
          dialogParams = {
            type: '5'
          }
          break;
        case "9lmxqolq":
          // 批量导入审核通过
          this.globalVars.applyDialogShowXS = false;
          dialogParams = {
            type: '6'
          }
          break;
      }

      const dialog = this.$pageDialog({
        key: "dialog_wmxlrpdb",
        params: dialogParams,
        winParams: {}
      });
    },
    /**
     * 描述：描述：选择异动类型弹窗表单 inited
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    data_form_y8diegko_inited: function (event) {
      var self = this;
      if (!this.globalVars.applyDialogShowXS) {
        this.$page('data-form_y8diegko').setHide({
          xsid: true
        });
      }
    },
    /**
     * 描述：选择异动类型弹窗表单 itemChange
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    data_form_y8diegko_item_change: function (event) {
      if (event.evArgs[0] === "ydlxid") {
        if (event.evArgs[1]) {
          // 有值
          this.misRequest('eaxjydgl_cxdgydlxsj', {
            params: {
              id: event.evArgs[1]
            }
          }).then(res => {
            if (res.code === '0') {
              this.globalVars.applyDialogYdlxid = event.evArgs[1];
              this.globalVars.applyDialogYdlxdm = res.data.modelData.dm;
              this.globalVars.applyDialogApplyDesc = res.data.modelData.ydsqtsxx === '<p><br></p>' ? '' : res.data.modelData.ydsqtsxx;
            } else {
              this.globalVars.applyDialogYdlxid = '';
              this.globalVars.applyDialogYdlxdm = '';
              this.globalVars.applyDialogApplyDesc = '';
            }
          });
        } else {
          // 无值
          this.globalVars.applyDialogYdlxid = '';
          this.globalVars.applyDialogYdlxdm = '';
          this.globalVars.applyDialogApplyDesc = '';
        }
      } else if (event.evArgs[0] === "xsid") {
        this.globalVars.applyDialogXsid = event.evArgs[1];
      }
    },
    /**
     * 描述：选择异动类型弹窗 mounted
     * @param{event}  name:事件名称,dialog:当前弹窗对象 return:
     */
    mounted_dialog_eo31yy2m: function (event) {
      this.globalVars.applyDialogYdlxid = '';
      this.globalVars.applyDialogYdlxdm = '';
      this.globalVars.applyDialogXsid = '';
      this.globalVars.applyDialogApplyDesc = '';
      this.globalVars.applyDialogPcid = '';
    },
    /**
     * 描述：“选择异动类型”弹窗下一步
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_z70tug8v: function (event, closeNext) {
      this.misPage('data-form_y8diegko').validateFormValue().then(value => {
        if (value !== false) {
          // 下一步前先验证
          let applyType = '';
          switch (event.dialogParams.type) {
            case "1":
            // 代申请/新增
            case "2":
              // 代申请/新增（审核通过）
              applyType = '1';
              break;
            case "3":
            // 批量新增
            case "4":
              // 批量新增（审核通过）
              applyType = '2';
              break;
            case "5":
            // 批量导入
            case "6":
              // 批量导入（审核通过）
              applyType = '3';
              break;
          }
          this.misRequest('eaxjydgl_dsqsqqyz', {
            params: {
              ydlxid: value.ydlxid,
              applyType: applyType
            }
          }).then(res => {
            if (res.code === '0') {
              this.globalVars.applyDialogPcid = res.data.modelData;// 记录批次 id

              switch (event.dialogParams.type) {
                case "1":
                // 代申请/新增
                case "2":
                  // 代申请/新增（审核通过）
                  const dialogParams = {
                    auditFormPageCode: this.globalVars.config.genAuditFormPageCode(this.globalVars.applyDialogYdlxdm),
                    ydlxid: value.ydlxid,
                    sfdsq: '1',
                    xsid: value.xsid,
                    showAuditLog: false,
                    onFormReady: (formData) => {
                      if (formData.list && formData.list.length > 0) {
                        return true;
                      } else {
                        // 表单里没有字段，关闭当前弹窗，给出提示
                        this.misPage('dialog_j5l0k6tg').closeWindow();
                        this.$message({
                          message: '请先联系管理人员配置页面',
                          type: 'warning'
                        });
                        return false;
                      }
                    }
                  };
                  this.$setComProps("page-runtime_nzt72n5w", { pageParams: dialogParams });

                  const dialog = this.$pageDialog({
                    key: "dialog_j5l0k6tg",
                    params: {},
                    winParams: {
                      title: '异动申请'
                    }
                  });

                  dialog.$setBtnsProp({
                    'drawer_delete': { hidden: true },
                    'drawer_finishToStart': { hidden: true },
                    'drawer_withdraw': { hidden: true },
                    'drawer_sendBack': { hidden: true },
                    'drawer_disagree': { hidden: true },
                    'drawer_agree': { hidden: true },
                    'drawer_save': { hidden: false },
                    'drawer_submit': { hidden: false },
                  });
                  break;
                case "3":
                // 批量新增
                case "4":
                  // 批量新增（审核通过）
                  // 关闭当前弹窗
                  this.misPage('dialog_wmxlrpdb').closeWindow();

                  const batchDialog = this.$pageDialog({
                    key: "dialog_beu3gnmn",
                    params: {},
                    winParams: {}
                  });
                  break;
                case "5":
                // 批量导入
                case "6":
                  // 批量导入（审核通过）

                  // 关闭当前弹窗
                  this.misPage('dialog_wmxlrpdb').closeWindow();
                  // 打开导入弹框
                  this.misPage('adv-table_69d958zu').openToolWindow('import');
                  break;
              }
            }
          });
        }
      });
    },
    /**
     * 描述：“代申请/新增”抽屉保存
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_5u588dtg: function (event, closeNext) {
      this.dsqSaveOrSubmit(false);
    },
    /**
     * 描述：“代申请/新增”抽屉提交
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_cqs9hybh: async function (event, closeNext) {
      this.dsqSaveOrSubmit(true);
    },
    /**
     * “代申请/新增”抽屉公共保存/提交方法
     */
    dsqSaveOrSubmit: async function (isSubmit) {
      const formValue = await this.misPage('page-runtime_nzt72n5w').validateForm();
      if (formValue === false) {
        // 校验失败
      } else {
        delete formValue.id;// 去除 id 字段

        const params = {
          ...formValue,
          sftj: isSubmit ? '1' : '0',
          sqlx: '2',
          SFDSQ: '1',
        }

        if (this.globalVars.currentShowDetailRow) {
          // 点击表格条目进详情页面
          params.id = this.globalVars.currentShowDetailRow.id;
        } else {
          params.xsid = this.globalVars.applyDialogXsid;
          params.ydlxid = this.globalVars.applyDialogYdlxid;
        }

        this.misRequest('eaxjydgl_flowstartasrole_eastudentchangeflowbo', {
          params: params
        }).then(res => {
          if (res.code === '0') {
            // 尝试关闭“选择异动类型”弹窗
            if (this.misPage('dialog_wmxlrpdb')) {
              this.misPage('dialog_wmxlrpdb').closeWindow();
            }
            // 执行收尾操作
            this.doAfterOperate();
          }
        });
      }
    },
    /**
     * 描述：导出
     * @param{event}  {btn}:点击的按钮; return:
     */
    exportBtn_click: function (event) {
      var self = this;
      this.misPage('adv-table_69d958zu').openToolWindow('export')
    },
    /**
     * 描述：批量新增学籍异动弹窗添加
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_ev_70v2z2bh: function (event) {
      const batchDialog = this.$pageDialog({
        key: "dialog_sdxegf2c",
        params: {},
        winParams: {}
      });
    },
    /**
     * 描述：批量新增学籍异动弹窗导入
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_ev_dmdfvzva: function (event) {
      this.misPage('adv-table_p475qbjg').openToolWindow('import');
    },
    /**
     * 描述：批量新增学籍异动弹窗删除
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_ev_rd1irq9j: function (event) {
      const checkedRecords = this.misPage('adv-table_p475qbjg').getCheckboxAllRecords();
      if (checkedRecords.length > 0) {
        this.$resConfirm('', `确定删除${checkedRecords.length}条学生信息吗？`,
          {
            confirmButtonText: "删除",
            confirmButtonType: "danger",
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.misRequest('eaxjydgl_gjidsscplczxslsb', {
            params: {
              params: {
                ids: checkedRecords.map(item => item.id).join(',')
              }
            }
          }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.misPage('adv-table_p475qbjg').reloadData();
            }
          });
        });
      } else {
        this.$message({
          message: '请勾选需删除的数据',
          type: 'warning'
        });
      }
    },
    /**
     * 描述：批量新增学籍异动下一步
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_tahs93v2: function (event, closeNext) {
      if (this.misPage('adv-table_p475qbjg').tablePager.total > 0) {
        // 切换步骤条
        event.dialog.$setComProps('steps_7dq4if7f', {
          active: 1
        });

        // 隐藏表格
        event.dialog.$setComProps("row_sbpiqqap", {
          hidden: true
        });

        // 显示表单
        event.dialog.$setComProps("row_5r6pcv9a", {
          hidden: false
        });

        event.dialog.$setComProps("form-runtime_g1g194tm", {
          pageInfo: {
            appCode: this.appCode,
            pageType: 'bizForm',
            pageCode: this.globalVars.config.genAuditFormPageCode(this.globalVars.applyDialogYdlxdm)
          }
        });

        // 按钮显隐
        event.dialog.$setBtnsProp({
          'confirm_57vebmai': { hidden: true },
          '9y0vzxsj': { hidden: false },
          'swjsmrcu': { hidden: false }
        });
      } else {
        this.$message({
          message: '请先添加学生',
          type: 'warning'
        });
      }
    },
    /**
     * 描述：批量新增学籍异动上一步
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_71qsk00t: function (event, closeNext) {
      var self = this;

      // 切换步骤条
      event.dialog.$setComProps('steps_7dq4if7f', {
        active: 0
      });

      // 显示表格
      event.dialog.$setComProps("row_sbpiqqap", {
        hidden: false
      });

      // 隐藏表单
      event.dialog.$setComProps("row_5r6pcv9a", {
        hidden: true
      });

      // 按钮显隐
      event.dialog.$setBtnsProp({
        'confirm_57vebmai': { hidden: false },
        '9y0vzxsj': { hidden: true },
        'swjsmrcu': { hidden: true }
      });
    },
    /**
     * 描述：批量新增学籍异动完成
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_pekatvfc: async function (event, closeNext) {
      try {
        const formValue = await this.misPage('form-runtime_g1g194tm').validateFormValue();
        if (formValue) {
          event.dialog.$setBtnsProp({
            "cancel_ehquw37d": {
              disabled: true
            },
            "9y0vzxsj": {
              disabled: true
            },
            "swjsmrcu": {
              loading: true
            },
          });

          const params = {
            ...formValue,
            ydlxid: this.globalVars.applyDialogYdlxid,
            pcid: this.globalVars.applyDialogPcid,
          };

          this.misRequest('eaxjydgl_plxzbc', {
            params: params
          }).then(res => {
            event.dialog.$setBtnsProp({
              "cancel_ehquw37d": {
                disabled: false
              },
              "9y0vzxsj": {
                disabled: false
              },
              "swjsmrcu": {
                loading: false
              },
            });

            if (res.code === '0') {
              // 关闭弹窗
              this.misPage('dialog_beu3gnmn').closeWindow();
              // 清理
              this.doAfterOperate();
            }
          });
        }
      } catch (e) { }
    },
    /**
     * 描述：添加异动学生弹窗确定
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_m1y0dshj: function (event, closeNext) {
      const selectXsids = this.misPage('adv-choice_ul03pwll').getValue();

      if (selectXsids) {
        this.misRequest({
          method: 'post',
          url: 'admin/api/execute/eaxjydgl_plxzxs',
          data: {
            params: {
              pcid: this.globalVars.applyDialogPcid,
              xsids: selectXsids
            }
          }
        }).then(res => {
          if (res.code === '0') {
            // 刷新表格
            this.misPage('adv-table_p475qbjg').reloadData();
            // 关闭当前弹窗
            this.misPage('dialog_sdxegf2c').closeWindow();
          }
        });
      } else {
        this.$message({
          message: '请选择学生',
          type: 'warning'
        });
      }
    },
    /**
     * 描述：批量添加异动学生表单 pageReady
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    form_runtime_g1g194tm_pageReady: function (event) {
      // 请求配置项
      this.misRequest('eaxjydgl_hqplxzxjydzdqx', {
        params: {
          pcid: this.globalVars.applyDialogPcid,
          ydlxid: this.globalVars.applyDialogYdlxid
        }
      }).then(res => {
        if (res.code === '0') {
          const data = {
            ydlxid: this.globalVars.applyDialogYdlxid
          };
          event.$com.setFieldConfig(res.data.nodeConfig.formperm);
          event.$com.setData(data);
        }
      })
    },
    /**
     * 描述：表格checked-data-change
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    adv_table_69d958zu_checked_data_change: function (event) {
      const num = event.evArgs[0].length;
      this.$setComProps('text_r2v8tegq', {
        textContent: num ? this.$LANG('singleModelMessageSelectedCount', { count: num }) : ''
      });
    },

  }
})