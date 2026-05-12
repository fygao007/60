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
            dialogVm: null,
            dialogType: '',
            tipField: '',
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
            this.globalVars.tipField = 'studentgspub.xm';
            this.globalVars.entityName = '申请次数限制';
            this.globalVars.pageName = '申请次数限制';
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
         * 获取远程指定的表单值
         */
        getFormInfo(id) {
            if (!id) {
                return;
            }
            this.$pageLoading(true);
            return this.misRequest('api_fetch', { params: { field: 'modelData', id: id } })
                .then((res) => {
                    this.$pageLoading(false);
                    return res.data;
                })
                .catch((err) => {
                    this.$pageLoading(false);
                    return;
                });
        },
        /**
         * 弹窗中按钮的显示隐藏
         */
        dialogButtonListHandler(dialog, type) {
            if (type == 'info') {
                dialog.$setBtnsProp({
                    pageDialogCancelBtn: {
                        hidden: true
                    },
                    saveBtn: {
                        hidden: true
                    }
                });
            } else {
                dialog.$setBtnsProp({
                    pageDialogCloseBtn: {
                        hidden: true
                    }
                });
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
            var formId = 'modelForm';
            if (targetBtn.id == 'addBtn') {
                // 新增时可以修改
                this.$setModelConfig(formId, { "gsstudentchangelimit.xsid": { "form.readonly": false } });
                // this.globalVars.selectPeopleBtnShow = true
                dialogType = 'add';
                this.globalVars.dialogVm = this.$pageDialog({
                    key: 'singleDialog',
                    winParams: { title: this.$LANG('singleModelDialogTitleAdd', { pageName: this.globalVars.pageName }) }
                });
                this.dialogButtonListHandler(this.globalVars.dialogVm, dialogType);
            } else if (targetBtn.id == 'updBtn') {
                // 编辑时不可以修改
                this.$setModelConfig(formId, { "gsstudentchangelimit.xsid": { "form.readonly": true } });
                // this.globalVars.selectPeopleBtnShow = false
                let row = event.row; //获取行数据
                dialogType = 'edit';
                this.getFormInfo(row.id).then((res) => {
                    this.globalVars.formOriginal = _.cloneDeep(res); //保存原始值
                    this.globalVars.dialogVm = this.$pageDialog({
                        key: 'singleDialog',
                        winParams: { title: this.$LANG('singleModelDialogTitleEdit', { pageName: this.globalVars.pageName }) },
                        beforeClose: this.beforeCloseHandle
                    });
                    this.dialogButtonListHandler(this.globalVars.dialogVm, dialogType);
                    this.$setVal(formId, res);
                    let displayStr = res['studentgspub.xh'] + ' ' + res['studentgspub.xm']
                    this.$setModelVal("modelForm", 'gsstudentchangelimit.xsid_name', displayStr);
                });
            } else if (targetBtn.id == 'viewBtn') {
                let row = event.row; //获取行数据
                dialogType = 'info';
                this.getFormInfo(row.id).then((res) => {
                    this.globalVars.dialogVm = this.$pageDialog({
                        key: 'singleDialog',
                        winParams: { title: this.$LANG('singleModelDialogTitleView', { pageName: this.globalVars.pageName }) }
                    });
                    this.globalVars.dialogVm.$setComProps(formId, {
                        readonly: true
                    });
                    this.dialogButtonListHandler(this.globalVars.dialogVm, dialogType);
                    this.$setVal(formId, res);
                    let displayStr = res['studentgspub.xh'] + ' ' + res['studentgspub.xm']
                    this.$setModelVal("modelForm", 'gsstudentchangelimit.xsid_name', displayStr);
                });
            }
            this.globalVars.dialogType = dialogType;
        },
        /**
         * 关闭弹窗
         * @param{event}  事件相关参数 return:
         * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

         */
        pageDialogCancelBtn_click: function (event, closeNext) {
            var self = this;
            if (this.globalVars.dialogType == 'add') {
                closeNext();
            } else {
                this.beforeCloseHandle(closeNext);
            }
        },
        /**
         * 弹窗关闭干预
         */
        beforeCloseHandle(next) {
            let isFormChanged = this.isFormChanged(this.misPage('modelForm').visibleValue);
            if (isFormChanged) {
                this.$resConfirm(
                    this.$LANG('未保存的更改将会丢失'),
                    this.$LANG('退出编辑？'),
                    {
                        confirmButtonText: this.$LANG('退出编辑'),
                        cancelButtonText: this.$LANG('取消'),
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
         * 保存表单数据
         * @param{event}  事件相关参数 return:
         * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
         */
        saveBtn_click: function (event, closeNext) {
            let funcCode = this.globalVars.dialogType == 'add' ? 'api_add' : 'api_upd';
            this.misPage('modelForm')
                .validateFormValue()
                .then((value) => {
                    if (!value) {
                        //校验不通过为false
                        return;
                    }
                    let tipTitle = this.$LANG('singleModelMessageSaveFailure');
                    let params = {
                        misRequestParams: { errorTitle: tipTitle },
                        params: { ...value, forceUpdateProps: this.getFormUnRequiredFields('modelForm').join(',') }
                    };
                    this.misRequest(funcCode, params, event.btn).then((data) => {
                        if (data.code == '0') {
                            this.misPage('modelAdvTable').reloadData();
                            this.misPage('singleDialog').closeWindow();
                            this.$Msg(this.$LANG('singleModelMessageSaveSuccess'), 'success');
                        }
                    });
                });
        },

        /**
         * 描述：删除操作
         * @param{event}  {row}:对应的行数据;{col}:对应的列数据;{btn}:点击的按钮；{scope}:表格对象 return:
         */
        delBtn_click: function (event) {
            var self = this;
            let row = event.row;
            //row.mc为读取行内部数据，需要根据业务调整
            this.$resConfirm(
                `"${row[this.globalVars.tipField]}"${this.$LANG('singleModelMessageDeleteConfirm')}`,
                this.$LANG('singleModelMessageDeleteSchoolConfirm', { entityName: this.globalVars.entityName }),
                {
                    confirmButtonText: this.$LANG('singleModelButtonConfirm'),
                    confirmButtonType: 'danger',
                    cancelButtonText: this.$LANG('singleModelButtonCancel'),
                    type: 'warning'
                }
            )
                .then(() => {
                    this.delete_table_datas({ params: { ids: row.id } });
                })
                .catch(() => {
                    console.log(this.$LANG('singleModelMessageCancel'));
                });
        },

        /**
         * 描述：批量删除
         * @param{event}  {btn}:点击的按钮; return:

         */
        batchDelBtn_click: function (event) {
            var self = this;
            let rows = this.misPage('modelAdvTable').getCheckboxAllRecords();
            let htmlStr = this.$LANG('singleModelLabelSelectedData');
            if (rows.length == 0) {
                this.$Msg(this.$LANG('singleModelMessageNoDataSelected'), 'warning');
                return;
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
                    dangerouslyUseHTMLString: true //开启富文本
                }
            ).then(() => {
                let ids = rows.map((item) => item.id);
                this.delete_table_datas({ params: { ids: ids.join(',') } });
            });
        },
        delete_table_datas(params) {
            this.misRequest('api_del', { params, misRequestParams: { errorTitle: this.$LANG('singleModelMessageDelFailure') } }).then((data) => {
                if (data.code == '0') {
                    this.misPage('modelAdvTable').reloadData();
                    this.setSelected(0);
                    this.$Msg(this.$LANG('singleModelMessageDelSuccess'), 'success');
                }
            });
        },

        /**
         * 描述：导出
         * @param{event}  {btn}:点击的按钮; return:

         */
        exportBtn_click: function (event) {
            var self = this;
            // let rows = this.misPage('modelAdvTable').getCheckboxAllRecords();
            // let ids = rows.map((item) => item['gsstudentchangelimit.id']);
            this.misPage('modelAdvTable').openToolWindow('export');
        },

        /**
         * 描述：导入
         * @param{event}  {btn}:点击的按钮; return:

         */
        importBtn_click: function (event) {
            var self = this;
            this.misPage('modelAdvTable').openToolWindow('import');
        },

       
        selectPeople(formData) {
            this.$pageDialog({ key: 'dialog_zzkiozwa' })
            this.$setVal("adv-choice_jopl33uv", formData['gsstudentchangelimit.xsid'] || '')
        },

        /**
        * 设置已选*条
        */
        setSelectedNum: function (event) {
            var num = event.evArgs[0].length;
            this.$setComProps('selectedTipText', {
                textContent: num ? this.$LANG('singleModelMessageSelectedCount', { count: num }) : ''
            });
        },


        /**
         * 描述：获取选择人员
         * @param{event}  事件相关参数 return:
         * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

         */
        // action_ev_s3a07mym: function (event, closeNext) {
        //     var self = this;
        //     let formValItem = this.$page('adv-choice_jopl33uv').getValue();
        //     let people = this.$page('adv-choice_jopl33uv').getSelected();
        //     let displayStr = ''
        //     this.$setModelVal("modelForm", 'gsstudentchangelimit.xsid', formValItem)
        //     people.forEach(item => {
        //         displayStr += `${item.xh} ${item.xm}`
        //     })
        //     this.$setModelVal("modelForm", 'gsstudentchangelimit.xsid_name', displayStr);
        //     closeNext()
        // },


        /**
         * 描述：字典搜索
         * @param{query}  查询内容 return:
         * @param{paramsKey}  搜索参数key return:

         */
        remote_search_w0ysobvb: function (query, paramsKey) {
            var self = this;

        },

    };
});
