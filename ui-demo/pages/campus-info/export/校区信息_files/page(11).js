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
            disableTabClick: true,
            loadAllTabs: false,
            relatedFields: JSON.stringify({}),
            dialogType: '',
            tipField: '',
            pageName: '', // 页面实体名称
            entityName: '', // 实体名称
            id: '',
            tabs: JSON.stringify([
                {
                    title: '基础信息',
                    component: '',
                    props: { appCode: 'eaxjydgl', pageCode: 'eaStudentChangeTypeBasicPage', type: 'page' },
                },
                {
                    title: '申请表单配置',
                    component: '',
                    props: {
                        appCode: 'eaxjydgl',
                        type: 'formMaking',
                    },
                },
                {
                    title: '申请流程设置',
                    component: '',
                    props: {
                        appCode: ' ',
                        pageCode: ' ',
                        type: 'process',

                    },
                },
                {
                    title: '其他设置',
                    component: '',
                    props: {
                        appCode: 'eaxjydgl',
                        pageCode: 'eaStudentChangeTypeUpdateFieldPage',
                        type: 'page',
                    },
                },
            ])
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
            this.globalVars.tipField = 'mc';
            this.globalVars.entityName = '异动类型';
            this.globalVars.pageName = '异动类型';
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
            var dialogType = '';
            if (targetBtn.id == 'addBtn') {
                // 新增时可以修改
                //this.$setModelConfig(formId, { "dm": { "form.readonly": false } });
                dialogType = 'add';
                self.globalVars.id = '';
                self.globalVars.relatedFields = JSON.stringify({});
                self.globalVars.disableTabClick = true;
                self.$page('modelAdvTable').setTableZoom(false);
                self.globalVars.dialogVm = this.$pageDialog({
                    key: 'dialog_change',
                    winParams: { title: this.$LANG('singleModelDialogTitleAdd', { pageName: this.globalVars.pageName }) }
                });
            } else if (targetBtn.id == 'updBtn') {
                // 编辑时不可以修改
                //this.$setModelConfig(formId, { "dm": { "form.readonly": true } });
                let row = event.row; //获取行数据
                dialogType = 'edit';
                self.editYdlxDialog(row.id, row.dm, this.$LANG('singleModelDialogTitleEdit', { pageName: this.globalVars.pageName }))
            }
        },

        editYdlxDialog: function (id, dm, title) {
            var self = this;
            self.globalVars.disableTabClick = false;

            self.globalVars.id = id;
            var appcode = "eaxjydgl";

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

                    self.globalVars.relatedFields = JSON.stringify({
                        id: id,
                        formPageId: appcode + dm + "Form",
                        flowPageId: entryId,
                        modelCode: 'eastudentchangeapply',
                        appCode: appcode,
                        bizFlag: 'eaStudentChange'
                    });
                    self.$page('modelAdvTable').setTableZoom(false);
                    self.globalVars.loadAllTabs = false
                    this.globalVars.dialogVm = this.$pageDialog({
                        key: 'dialog_change',
                        winParams: { title: title },
                        beforeClose: this.beforeCloseHandle
                    });
                } else {

                    self.$message.error("审核流程不存在");
                }
            }).catch((err) => {
                self.$message.error("审核流程不存在");
            })

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
                    confirmButtonText: '删除',
                    confirmButtonType: 'danger',
                    cancelButtonText: this.$LANG('singleModelButtonCancel'),
                    type: 'warn'
                }
            )
                .then(() => {
                    this.delete_table_datas({ params: { ids: row.id } });
                })
                .catch(() => {
                    console.log(this.$LANG('singleModelMessageCancel'));
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
         * 描述：checkbox-change
         * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

         */
        modelAdvTable_checkbox_change: function (event) {
            var self = this;
            // console.log('data',event)
            let rows = this.misPage('modelAdvTable').getCheckboxAllRecords();
            this.setSelected(rows.length);
        },
        /**
         * 设置已选多少条
         */
        setSelected(num) {
            this.$setComProps('selectedTipText', {
                textContent: num ? this.$LANG('singleModelMessageSelectedCount', { count: num || 0 }) : ''
            });
        },

        /**
         * 描述：复制按钮点击事件
         * @param{event}  {row}:对应的行数据;{col}:对应的列数据;{btn}:点击的按钮；{scope}:表格对象 return:

         */
        action_copyBtn_click: function (event) {
            var self = this;

            self.$confirm('将复制该异动类型', `确认复制 ${event.row['mc']} 的异动类型吗？`, {
                confirmButtonType: "primary",
                confirmButtonText: "确定",
                customClass: 'ydlx-notice',
                type: 'info'
            }).then(function () {
                self.misRequest('api_copy', { params: { sourceId: event.row["id"] } }).then(function (res) {
                    if (res.code == '0') {
                        self.globalVars.id = res.data.targetId;
                        self.editYdlxDialog(res.data.targetId, res.data.targetDm, '复制异动类型');
                    }
                });
            });

        },
        /**
         * 描述：切换启用状态
         */
        studentChangeTypeToggleEnableStatus: function (row, table) {
            var self = this;
            if (row.qyzt === '0') {
                self.updateEnableStatus(row, table);
                return;
            }

            let title = '';
            if (row.wcjd == '1') {
                title += '申请表单,申请流程,更新类';
            }
            if (row.wcjd == '2') {
                title += '申请流程,更新类';
            }
            if (row.wcjd == '3') {
                title += '更新类';
            }

            if (!title) {
                self.updateEnableStatus(row, table);
                return;
            }


            self.$confirm(title + "未配置完成", `确定启用 ${row['mc']} 的异动类型吗？`, {
                type: "info",
                confirmButtonType: "primary",
                customClass: 'ydlx-notice',
                confirmButtonText: "确定"
            }).then(function () {
                self.updateEnableStatus(row, table);
            }).catch((err) => {
                table.reloadData();
            });
        },
        updateEnableStatus(row, table) {
            var self = this;
            this.misRequest('api_status', { params: { id: row.id, qyzt: row.qyzt } }).then(function (res) {
                if (res.code == '0') {
                    self.$message.success("操作成功");
                }
                table.reloadData();

            }).catch((e) => {
                table.reloadData();
            });
        },
        afterMethod: function (event) {
            var index = event.evArgs[0];

            this.saveMethod(event);
            if (index == 3) {
                this.globalVars.dialogVm.closeWindow();
            }
        },

        saveMethod: function (event) {
            var index = event.evArgs[0];
            if (index == 1 || index == 2) {

                var params = event.evArgs[1];
                this.saveWcjd({
                    id: params.id,
                    wcjd: index + 1
                })
            }
        },

        saveWcjd: function (params) {
            this.misRequest('api_save_wcjd', { params }).then(function (res) {
            });
        },


        /**
         * 描述：从异动类型设置页面返回时
         * @param{event}  name:事件名称,dialog:当前弹窗对象 return:

         */
        destroy_dialog_change: function (event) {
            var self = this;

            self.misPage('modelAdvTable').reloadData();

        },

    };
});
