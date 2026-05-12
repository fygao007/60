define(function (require) {
  return {
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {},
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageComputed: {},
    /**
     * 响应式变量
     */
    globalVars: {
      fbfaDialogVm: null,  // 分班方案弹窗对象
      currentPlanId: '',   // 当前编辑的方案ID
      // 均衡分配原则表格配置
      jhfbyzTableConfig: {}
    },
    /**
     * 页面被重新激活时调用
     */
    pageActivated: function () { },
    /**
     * 页面失去激活被缓存时调用
     */
    pageDeactivated: function () { },
    /**
     * 固定方法，页面 js 初始化完成后调用
     */
    pageCreated: function () {
      const self = this;
      this.globalVars.jhfbyzTableConfig = {
        autoLoad: false,
        editable: true,
        tableConfig: {
          border: 'default',
          seq: { enabled: false },
          height: 280,
          stripe: true,
          rowId: '_xid',
          showOverflow: true,
          rowSort: {
            enabled: true
          }
        },
        "edit-config": {
          "trigger": "click",
          "mode": "row",
          "showStatus": true,
          "showAsterisk": true,
          "autoClear": false

        },
        dataSource: 'local',
        modelParams: {
          id: 'eaxsrxgl-eaclassdivideplanbalancerule',
          modelName: 'eaclassdivideplanbalancerule',
          actionType: 'TABLE',
          url: '/admin/model/design/eaxsrxgl/perm/eaclassdivideplanbalancerule'
        },
        pagerConfig: { enabled: false },
        toolbarConfig: { enabled: false },
        editConfig: { trigger: 'manual', mode: 'cell' },
        sortConfig: { remote: false },
        columnsModel: [
          {
            name: 'yxj',
            title: '优先级',
            'grid.readonly': 1
          },
          {
            name: 'zddm',
            caption: '名称',
            'grid.required': 1
          },
          {
            name: 'zdmc',
            'grid.hidden': 1
          },
          {
            name: 'faid',
            'grid.hidden': 1
          }
        ],
        operationConfig: {

          enabled: true,
          position: 'right',
          title: '操作',
          width: 100,
          schema: 'text',
          buttonList: [
            {
              label: '删除',
              id: 'deleteRuleBtn',
              type: 'primary',
              func: (params) => {
                self.jhfbyzRuleDelBtn_click(params);
              }
            },
          ],
          template: ``,
        }
      }
    },
    /**
     * 固定方法，页面准备完成后调用
     */
    pageReady: function () { },
    /**
     * 固定方法，页面销毁前调用
     */
    pageDestroy: function () { },

    /**
     * 获取表单内表格组件
     */
    getJhfbyzGrid: function () {
      var self = this;
      var formVm = self.$page('form-list_fbfa');
      if (!formVm || !formVm.itemComs || !formVm.itemComs.jhfbyz) {
        return null;
      }
      return formVm.itemComs.jhfbyz.$refs.jhfbyzRuleTable.xeGrid;
    },

    /**
     * 新增分班方案 - 打开弹窗
     */
    add_fbfa_click: function (event) {
      var self = this;

      self.globalVars.fbfaDialogVm = self.$pageDialog({
        key: 'dialog_edit_fbfa',
        winParams: {
          title: '新增分班方案'
        }
      });

      // 清空表单数据
      self.$setVal('form-list_fbfa', {});
      // 清空均衡分配原则表格数据
      var $grid = self.getJhfbyzGrid();
      if ($grid) {
        $grid.loadData([]);
      }
      self.globalVars.currentPlanId = '';
    },

    /**
     * 编辑分班方案 - 打开弹窗
     * @param{event}  {row}:对应的行数据
     */
    edit_fbfa_click: function (event) {
      var self = this;

      self.globalVars.fbfaDialogVm = self.$pageDialog({
        key: 'dialog_edit_fbfa',
        winParams: {
          title: '编辑分班方案'
        }
      });

      // 弹窗打开后设置表单数据
      self.$setVal('form-list_fbfa', event.btn.row);
      self.globalVars.currentPlanId = event.btn.row.id;
    },

    /**
     * 保存分班方案
     * @param{event}  事件对象
     * @param{closeWindow}  关闭弹窗方法
     */
    save_fbfa_click: function (event, closeWindow) {
      var self = this;

      // 校验表单
      var formVm = self.$page('form-list_fbfa');
      formVm.validateFormValue()
        .then(function (valid) {
          if (valid === false) {
            return;
          }

          var formData = valid;

          if(!formData.id) {
            formData.qyzt = '0'
          }

          // 获取均衡分配原则表格并校验
          var $grid = self.getJhfbyzGrid();
          if (!$grid) {
            return;
          }
          $grid.validate().then(function (res) {
            if (res && Object.keys(res).length) {
              return;
            }
            var balanceRules = $grid.getTableData().fullData || [];

            // 调用保存 API
            self.misRequest('eaxsrxgl_bcbfafa', {
              params: {
                plan: formData,
                balanceRules: balanceRules,
                forceUpdateProps: self.getFormUnRequiredFields('form-list_fbfa').join(',')
              }
            }, event.btn).then(function (res) {
              if (res.code === '0') {
                self.$Msg(formData.id ? '更新成功' : '新增成功', 'success');
                closeWindow();
                self.$page('fbfaListView').reload();
              }
            });
          });
        });
    },

    /**
     * 切换分班方案启用状态
     * @param{row}  当前行数据
     */
    toggle_fbfa_status: function (row) {
      var self = this;

      self.misRequest('eaxsrxgl_qytbfafa', {
        params: {
          id: row.id,
          qyzt: row.qyzt,
          forceUpdateProps: 'qyzt'
        }
      }).then(function (res) {
        if (res.code === '0') {
          self.$Msg('操作成功', 'success');
          self.$page('fbfaListView').reload();
        }
      });
    },

    /**
     * 删除分班方案
     * @param{event}  {row}:对应的行数据
     */
    delete_fbfa_click: function (event) {
      var self = this;
      var row = event.btn.row;

      self.$resConfirm(
        '"' + row.famc + '" 确定要删除该分班方案吗？',
        '删除确认',
        {
          confirmButtonText: '确定',
          confirmButtonType: 'danger',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(function () {
        self.misRequest('eaxsrxgl_scbfafa', {
          params: {
            id: row.id
          }
        }).then(function (res) {
          if (res.code === '0') {
            self.$Msg('删除成功', 'success');
            self.$page('fbfaListView').reload();
          }
        });
      });
    },

    /**
     * 加载均衡分配原则表格数据
     * @param{planId}  方案ID
     */
    loadBalanceRules: function () {
      var self = this;
      var planId = this.globalVars.currentPlanId;
      var $grid = self.getJhfbyzGrid();
      if (!planId) {
        if ($grid) {
          $grid.loadData([]);
        }
        return;
      }
      // 使用模型查询均衡分配原则数据
      self.misRequest('eaxsrxgl_cxjhfbyz', {
        params: {
          faid: planId
        }
      }).then(function (res) {
        if (res.code === '0') {
          var list = res.data.list || [];
          self.$nextTick(() => {
            var $grid = self.getJhfbyzGrid();
            $grid.loadData(list);
          })
        }
      });
    },

    /**
     * 新增均衡分配原则行
     */
    jhfbyzRuleAddBtn_click: function () {
      var self = this;
      var $grid = self.getJhfbyzGrid();
      if (!$grid) return;

      // 获取当前最大优先级
      var tableData = $grid.getTableData().fullData || [];
      var maxYxj = 0;
      tableData.forEach(function (row) {
        if (row.yxj && row.yxj > maxYxj) {
          maxYxj = row.yxj;
        }
      });

      // 新增一行
      $grid.insertAt({ id: maxYxj + 1, yxj: maxYxj + 1, zddm: '', faid: self.globalVars.currentPlanId }, -1);
    },

    /**
     * 删除均衡分配原则行
     */
    jhfbyzRuleDelBtn_click: function (params) {
      var self = this;
      var row = params.row;
      var $grid = self.getJhfbyzGrid();
      if (!$grid) return;
      $grid.remove(row);
    },

    /**
     * 均衡分配原则表格排序变化
     */
    jhfbyzRuleTable_sortChange: function (params) {
      var self = this;
      var $grid = self.getJhfbyzGrid();
      if (!$grid) return;

      var tableData = params.tableData || [];
      // 更新优先级
      tableData.forEach(function (row, index) {
        row.yxj = index + 1;
      });
      // 重新设置数据
      $grid.loadData(tableData);
    }
  }
})
