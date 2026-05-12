define(function (require) {

  return {

    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {
      //  'globalVars.name':function(newVal,oldVal){
      //      console.log('值改变',newVal,oldVal)
      //  }
      'pageParams': {

        handler(v) {
          this.globalVars.id = v.relatedFields?.id;

        },
        deep: true,
        immediate: true
      }
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
      id: '',
      changeReason: [],
      // 异动申请原因（新增，编辑）弹框
      reasonDialogType: '',
      reasonDialogName: '异动申请原因',
      formOriginal: {},
      advFilter: {
        modelParams: {
          modelApp: 'main',
          modelName: 'studenteapub',
          actionType: 'form'
        }
      },
      sqzgmc: ''
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
      this.globalVars.id = this.pageParams.relatedFields?.id;
    },
    /**
     * 固定方法，页面准备完成后调用，当前可以操作组件属性，调用未隐藏组件实例方法
     */
    pageReady: function () {
      //console.log('页面准备完成后调用')
      var self = this;

    },
    init: function () {
      var self = this;
      this.$pageLoading(true);
      if (self.globalVars.id) {

        self.getFormInfo(self.globalVars.id).then((res) => {
          self.$setVal('modelForm', res);
          self.globalVars.sqzgmc = res['eastudentchangetype.sqzgmc'];

          this.$setModelConfig('modelForm', { "eastudentchangetype.yddlid": { "form.readonly": true } });
        });

        self.getReasonList(self.globalVars.id).then((res) => {
          self.globalVars.changeReason = res ? res : [];
          self.setReasonTableData(self.globalVars.changeReason);
        });
      }
      this.$pageLoading(false);
    },
    getReasonList: function (id) {
      if (!id) {
        return new Promise((resolve, reject) => {
          reject("id 为空");
        });
      }

      return new Promise((resolve, reject) => {
        this.misRequest('api_list_reason', { params: { field: 'list', 'ydlxid': id } })
          .then((res) => {
            this.$pageLoading(false);

            resolve(res.data);
          })
          .catch((err) => {
            this.$pageLoading(false);
            reject(err);
          });
      });
    },
    /**
        * 获取远程指定的表单值
        */
    getFormInfo: function (id) {
      if (!id) {

        return new Promise((resolve, reject) => {
          reject("id 为空");
        });
      }
      this.$pageLoading(true);
      return new Promise((resolve, reject) => {
        this.misRequest('api_fetch', { params: { field: 'modelData', id: id } })
          .then((res) => {
            this.$pageLoading(false);
            var sqzg = res.data['eastudentchangetype.sqzg'];
            if (sqzg) {
              res.data['eastudentchangetype.sqzg'] = JSON.parse(sqzg);
            }
            resolve(res.data);
          })
          .catch((err) => {
            this.$pageLoading(false);
            reject(err);
          });
      })
    },
    /**
     * 固定方法，页面销毁前调用
     */
    pageDestroy: function () {
      //console.log('页面销毁前调用')
    },

    /**
     * 描述：item-change
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    model_form_item_change: function (event) {
      var self = this;
      if (event.evArgs[0] == 'eastudentchangetype.sfqdspwh') {
        if (event.evArgs[1] == '1') {
          self.misPage('modelForm').setHide({ 'eastudentchangetype.spwhgzid': false });
          self.misPage('modelForm').setHide({ 'eastudentchangetype.spwhscsj': false });

        } else {

          self.misPage('modelForm').setHide({ 'eastudentchangetype.spwhgzid': true });
          self.misPage('modelForm').setHide({ 'eastudentchangetype.spwhscsj': true });
        }

      } else if (event.evArgs[0] == 'eastudentchangetype.sfxyxsqr') {
        if (event.evArgs[1] == '1') {
          self.misPage('modelForm').setHide({ 'eastudentchangetype.xsqrsm': false });

        } else {

          self.misPage('modelForm').setHide({ 'eastudentchangetype.xsqrsm': true });
        }
      }


    },
    /**
           * 表单值是否改变
           */
    isFormChanged: function (val) {
      let ischange = false;
      Object.keys(val).forEach((key) => {
        if (val[key] != this.globalVars.formOriginal[key]) {
          ischange = true;
        }
      });
      return ischange;
    },
    /**
         * 弹窗关闭干预
         */
    beforeCloseHandle(next) {
      let isFormChanged = this.isFormChanged(this.misPage('reasonForm').visibleValue);
      if (isFormChanged) {
        this.$resConfirm(
          '未保存的更改将会丢失',
          '退出编辑',
          {
            confirmButtonText: '退出编辑',
            cancelButtonText: '取消',
            confirmButtonType: 'danger',
            type: 'warning'
          }
        ).then(() => {
          next();
        });
      } else {
        next();
      }
    },
    /**
         * 新增/编辑/详情点击显示弹窗
         * @param {Object} event
         * @param {Object} event.row 对应的行数据
         * @param {Object} event.col 对应的列数据
         * @param {Object} event.btn 点击的按钮
         * @param {Object} event.scope 表格对象
         */
    action_show_dialog: function (event) {
      var self = this;
      let targetBtn = event.btn;
      let dialogType = '';
      var formId = 'reasonForm';
      if (targetBtn.id == 'addBtn') {
        dialogType = 'add';
        this.globalVars.dialogVm = this.$pageDialog({
          key: 'dialog_reason',
          winParams: { title: this.$LANG('singleModelDialogTitleAdd', { pageName: this.globalVars.reasonDialogName }) }
        });

        this.$setVal(formId, { id: this.$Utils.getUUID() });
      } else if (targetBtn.id == 'editBtn') {
        // 编辑时不可以修改
        let row = event.row; //获取行数据
        dialogType = 'edit';
        this.globalVars.formOriginal = _.cloneDeep(row); //保存原始值
        this.globalVars.dialogVm = this.$pageDialog({
          key: 'dialog_reason',
          winParams: { title: this.$LANG('singleModelDialogTitleEdit', { pageName: this.globalVars.reasonDialogName }) },
          beforeClose: this.beforeCloseHandle
        });
        this.$setVal(formId, row);
      }
      this.globalVars.reasonDialogType = dialogType;
    },
    /**
        * 关闭弹窗
        * @param{event}  事件相关参数 return:
        * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

        */
    reasonDialogCancelBtn_click: function (event, closeNext) {
      var self = this;
      if (this.globalVars.reasonDialogType == 'add') {
        closeNext();
      } else {
        this.beforeCloseHandle(closeNext);
      }
    },
    /**
        * 保存表单数据
        * @param{event}  事件相关参数 return:
        * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
        */
    reasonSaveBtn_click: function (event, closeNext) {
      var self = this;
      let isAdd = this.globalVars.reasonDialogType == 'add';
      this.misPage('reasonForm')
        .validateFormValue()
        .then((value) => {
          if (!value) {
            //校验不通过为false
            return;
          }
          if (isAdd) {
            self.globalVars.changeReason = self.globalVars.changeReason ? self.globalVars.changeReason : [];
            value.qyzt = '1';
            self.globalVars.changeReason.push(value);
          } else {
            for (var i = 0; i < self.globalVars.changeReason.length; i++) {
              var item = self.globalVars.changeReason[i];
              if (item.id == value.id) {

                item.mc = value.mc;
                break;
              }
            }
          }
          closeNext();
          self.setReasonTableData(self.globalVars.changeReason);
        });
    },

    /**
     * 异动申请原因删除按钮点击事件处理
     */
    reasonDeleteBtn_click: function (event) {
      var self = this;

      self.$confirm(`移除 “${event.row['mc']}”！\n说明：点击保存或下一步生效`, '确认移除该异动申请原因吗？', {
        type: "warn",
        confirmButtonType: "danger",
        confirmButtonText: "移除"
      }).then(function () {

        var delId = event.row.id;
        self.globalVars.changeReason = self.globalVars.changeReason.filter((item) => {
          return item.id !== delId;
        });

        self.setReasonTableData(self.globalVars.changeReason);

      });

    },


    /**
     * 保存基础信息
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    save: function () {
      var self = this;
      return new Promise((resolve, reject) => {
        self.misPage('modelForm')
          .validateFormValue()
          .then((value) => {
            if (!value) {
              //校验不通过为false
              reject();
              return;
            }
            let tipTitle = this.$LANG('singleModelMessageSaveFailure');
            let params = {
              misRequestParams: { errorTitle: tipTitle },
              params: {
                ...value,
                "wcjd": 1,
                "eastudentchangetype.sqzgmc": self.globalVars.sqzgmc,
                changeReasons: self.misPage('reasonTable').xeGrid.getTableData().tableData
              }
            };
            var url = this.globalVars.id ? 'api_save' : 'api_add';
            self.misRequest(url, params).then((data) => {
              if (data.code == '0') {
                this.$Msg(this.$LANG('singleModelMessageSaveSuccess'), 'success');
                var id = data.data.changeType.id;
                var dm = data.data.changeType.dm;
                var appcode = "eaxjydgl";
                self.globalVars.id = id;

                self.init();
                self.$request({
                  url: '/admin/flow/flowEntry/list',
                  method: "post",
                  data: {
                    orderParam: [{ fieldName: "entryId", asc: 1 }],
                    pageParam: { pageNum: 1, pageSize: 10 },
                    flowEntryDtoFilter: { appCode: "eaxjydgl", moduleCode: "", processDefinitionKey: "flow" + dm + "__" + appcode }
                  }
                }).then(res => {
                  if (res.code === "0" && res.data.rows.length > 0) {
                    var entryId = res.data.rows[0].entryId;
                    resolve({ formPageId: appcode + dm + "Form", flowPageId: entryId, id: id, modelCode: 'eastudentchangeapply', "bizFlag": "eaStudentChange", "appCode": "eaxjydgl" });
                  } else {
                    reject()
                  }
                })

              } else {
                reject();
              }
            });
          });
      });
    },


    /**
     * 描述：复制
     * @param{event}  {btn}:点击的按钮; return:

     */
    action_copyBtn_click: function (event) {
      var self = this;

      self.$pageDialog({
        key: 'dialog_copy_reason'
      });

      this.$setVal("copyReasonForm", {});
    },


    /**
     * 描述：确认复制
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

     */
    action_save_copy_btn_click: function (event, closeNext) {
      var self = this;
      self.misPage('copyReasonForm')
        .validateFormValue()
        .then((value) => {
          if (!value) {
            //校验不通过为false
            return;
          }

          self.getReasonList(value.ydlxid).then((res) => {
            var arr = res ? res : [];
            if (arr.length == 0) {


              self.$confirm('失败原因：源异动类型暂无异动申请原因!', '复制失败', {
                type: "error",
                showConfirmButton: false,
                cancelButtonText: '关闭'


              });

              closeNext();
              return;
            }

            arr.forEach((item) => {
              item.id = self.$Utils.getUUID();
              delete item.ydlxid;
            });
            if (self.globalVars.changeReason && self.globalVars.changeReason.length > 1) {
              self.globalVars.changeReason.push(...arr);
            } else {
              self.globalVars.changeReason = arr;
            }

            self.setReasonTableData(self.globalVars.changeReason);
            self.$message.success("复制成功");
            closeNext();
          });

        });

    },
    setReasonTableData: function (data) {
      this.misPage('reasonTable').xeGrid.reloadData(data);
    },


    /**
     * 描述：model-inited
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    reasonTable_model_inited: function (event) {
      var self = this;
      this.init();

    },
    sqzgConfirm(data) {
     this.globalVars.sqzgmc = data.advQuerySettingText;
    },

  }
})