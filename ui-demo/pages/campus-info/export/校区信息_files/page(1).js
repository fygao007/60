define(function (require) {

  return {

    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {
      //  'globalVars.name':function(newVal,oldVal){
      //      console.log('值改变',newVal,oldVal)
      //  }
    },
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageComputed: {
      // getNewName:function(){
      //   return this.globalVars.name+'新的'
      //}
    },
    // var1:"变量",//响应式变量，该变量不能加到组件参数内,但是写到组件模板里
    /**
     * 响应式变量，当值变化时可以影响所有绑定的值,建议把需要绑定到组件参数里的变量申明到这里面
     */
    globalVars: {
      // name:'一个变量' //响应式变量name,组件内使用时{{globalVars.name}}
      formOriginal: {},
      tipField: '',
      dialogVm: null,
      dialogType: '',
      pageName: '', // 页面实体名称
      entityName: '', // 实体名称
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
      this.globalVars.tipField = 'mc'
      this.globalVars.pageName = '学校校区'
      this.globalVars.entityName = '学校校区'
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
     * 测试表单值是否改变
     */
    isFormChanged: function (val) {
      let ischange = false
      Object.keys(val).forEach((key) => {
        if (val[key] != this.globalVars.formOriginal[key]) {
          ischange = true
        }
      })
      return ischange
    },

    dialogButtonListHandler(dialog, type) {
      if (type == 'info') {
        dialog.$setBtnsProp({
          pageDialogCancelBtn: {
            hidden: true,
          },
          saveBtn: {
            hidden: true,
          },
        })
      } else {
        dialog.$setBtnsProp({
          pageDialogCloseBtn: {
            hidden: true,
          },
        })
      }
    },
    /**
     * 描述：打开增加修改与详情信息弹窗
     * @param{event}  {btn}:点击的按钮; return:
     */
    action_show_dialog: function (event) {
      console.log('bbb', this.$topOwner.pageParams.businessDomain, this.pageParams.businessDomain)
      var self = this
      let targetBtn = event.btn
      let dialogType = ''
      var formId = 'modelForm';
      if (targetBtn.id == 'addBtn') {
        // 新增时可以修改
        this.$setModelConfig(formId, { "dm": { "form.readonly": false } });
        dialogType = 'add'
        this.globalVars.dialogVm = this.$pageDialog({
          key: 'singleDialog',
          winParams: { title: this.$LANG('singleModelDialogTitleAdd', { pageName: this.globalVars.pageName }) },
        })
        this.dialogButtonListHandler(this.globalVars.dialogVm, dialogType)
        this.$setVal(formId, { "px": 1000 })
      } else if (targetBtn.id == 'updBtn') {
        // 编辑时不可以修改
        this.$setModelConfig(formId, { "dm": { "form.readonly": true } });
        let row = event.row //获取行数据
        dialogType = 'edit'
        this.globalVars.formOriginal = _.cloneDeep(row) //保存原始值
        this.globalVars.dialogVm = this.$pageDialog({
          key: 'singleDialog',
          winParams: { title: this.$LANG('singleModelDialogTitleEdit', { pageName: this.globalVars.pageName }) },
          beforeClose: this.beforeCloseHandle,
        })
        this.dialogButtonListHandler(this.globalVars.dialogVm, dialogType)
        this.$setVal(formId, row)

      } else if (targetBtn.id == 'viewBtn') {
        let row = event.row //获取行数据
        dialogType = 'info'

        this.globalVars.dialogVm = this.$pageDialog({
          key: 'singleDialog',
          winParams: { title: this.$LANG('singleModelDialogTitleView', { pageName: this.globalVars.pageName }) },
        })
        this.globalVars.dialogVm.$setComProps(formId, {
          readonly: true,
        })
        this.dialogButtonListHandler(this.globalVars.dialogVm, dialogType)
        this.$setVal(formId, row)

      }
      this.globalVars.dialogType = dialogType
    },
    /**
     * 描述：关闭弹窗
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

     */
    pageDialogCancelBtn_click: function (event, closeNext) {
      var self = this
      if (this.globalVars.dialogType == 'add') {
        closeNext()
      } else {
        this.beforeCloseHandle(closeNext)
      }
    },
    /**
     * 弹窗关闭干预
     */
    beforeCloseHandle(next) {
      let formIsChange = this.isFormChanged(this.misPage('modelForm').visibleValue)
      if (formIsChange) {
        this.$resConfirm(
          this.$LANG('singleModelMessageExitEditConfirm'),
          this.$LANG('singleModelMessageExitEditTitle'),
          {
            confirmButtonText: this.$LANG('singleModelButtonExit'),
            cancelButtonText: this.$LANG('singleModelButtonContinueEdit'),
            type: 'warning',
          }
        ).then(() => {
          next()
        })
      } else {
        next()
      }
    },

    /**
     * 描述：保存表单数据
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    saveBtn_click: function (event, closeNext) {
      let funcCode = this.globalVars.dialogType == 'add' ? 'api_add' : 'api_upd'
      this.misPage('modelForm')
        .validateFormValue()
        .then((value) => {
          if (!value) {
            //校验不通过为false
            return
          }
          let params = {
            misRequestParams: { errorTitle: this.$LANG('singleModelMessageSaveFailure') },
            params: { ...value, forceUpdateProps: this.getFormUnRequiredFields('modelForm').join(',') }
          };
          this.save_requst(funcCode, params, event.btn);
        })
    },
    save_requst: function (funcCode, params, btn) {
      this.misRequest(funcCode, params, btn).then((res) => {
        if (res.code == '0') {
          this.misPage('modelAdvTable').reloadData()
          this.misPage('singleDialog').closeWindow()
          this.$Msg(this.$LANG('singleModelMessageSaveSuccess'), 'success')
        } else if (res.code === "DATA_CHECK_FAILED") {
          var errors = res.data.data;
          var skipCheckCmp = "";
          var errMsg = "";
          for (var key in errors) {
            if (errors.hasOwnProperty(key)) { // 过滤掉原型链上的属性
              var val = errors[key];
              if (skipCheckCmp !== "") {
                skipCheckCmp += ",";
              }
              skipCheckCmp += key;
              for (var i = 0; i < val.length; i++) {
                var err = val[i];
                if (errMsg !== "") {
                  errMsg += ",";
                }
                errMsg += err;
              }
            }
          }
          this.$confirm(`${errMsg}`, '保存校区', {
            type: "warn",
            showConfirmButton: true,
            confirmButtonText: "继续",
            cancelButtonText: this.$LANG('singleModelButtonClose')
          }).then(() => {
            params.params.skipCheckCmp = skipCheckCmp;
            this.save_requst(funcCode, params, btn);
          });
        }
      })
    },

    /**
     * 描述：删除操作
     * @param{event}  {row}:对应的行数据;{col}:对应的列数据;{btn}:点击的按钮；{scope}:表格对象 return:
     */
    delBtn_click: function (event) {
      var self = this
      let row = event.row
      //row.mc为读取行内部数据，需要根据业务调整
      this.$resConfirm(
        `"${row[this.globalVars.tipField]}"${this.$LANG('singleModelMessageDeleteConfirm')}`,
        this.$LANG('singleModelMessageDeleteSchoolConfirm', { entityName: this.globalVars.entityName }),
        {
          confirmButtonText: this.$LANG('singleModelButtonConfirm'),
          confirmButtonType: 'danger',
          cancelButtonText: this.$LANG('singleModelButtonCancel'),
          type: 'warning',
        }
      )
        .then(() => {
          this.delete_table_datas({ params: { ids: row.id } })
        })
        .catch(() => {
          console.log(this.$LANG('singleModelMessageCancel'))
        })
    },

    /**
     * 描述：批量删除
     * @param{event}  {btn}:点击的按钮; return:

     */
    batchDelBtn_click: function (event) {
      var self = this
      let rows = this.misPage('modelAdvTable').getCheckboxAllRecords()
      console.log('rows', rows)
      let htmlStr = this.$LANG('singleModelLabelSelectedData')
      if (rows.length == 0) {
        this.$Msg(this.$LANG('singleModelMessageNoDataSelected'), 'warning')
        return
      }
      htmlStr = this.getCheckedTip("modelAdvTable",'{'+this.globalVars.tipField+'}', rows);

      this.$resConfirm(
        htmlStr,
        this.$LANG('singleModelMessageBatchDeleteConfirm', { entityName: this.globalVars.entityName }),
        {
          confirmButtonText: this.$LANG('singleModelButtonConfirm'),
          confirmButtonType: 'danger',
          cancelButtonText: this.$LANG('singleModelButtonCancel'),
          type: 'warning',
          dangerouslyUseHTMLString: true, //开启富文本
        }
      ).then(() => {
        let ids = rows.map((item) => item.id)
        this.delete_table_datas({ params: { ids: ids.join(',') } })
      })
    },
    delete_table_datas(params) {
      this.misRequest('api_del', { params, misRequestParams: { errorTitle: this.$LANG('singleModelMessageDelFailure') } }).then((res) => {
        if (res.code == '0') {
          this.misPage('modelAdvTable').reloadData();
          this.$Msg(this.$LANG('singleModelMessageDelSuccess'), 'success');
        }
      });
    },

    /**
     * 描述：导出
     * @param{event}  {btn}:点击的按钮; return:

     */
    exportBtn_click: function (event) {
      var self = this
      this.misPage('modelAdvTable').openToolWindow('export')
    },

    /**
     * 描述：导入
     * @param{event}  {btn}:点击的按钮; return:

     */
    importBtn_click: function (event) {
      var self = this
      this.misPage('modelAdvTable').openToolWindow('import')
    },
    /**
     * 描述：行拖动排序
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    modelAdvTable_row_sort_change: function (event) {
      let ids = event.evArgs[0].tableData.map(item => item.id).join(',');
      let tableVm = event.$com.modelParams;
      this.sort(ids, tableVm);
    }

  }
})
