define(function (require) {
    return {
        pageWatch: {
            'pageParams': {
                handler: function (val) {
                    if (val) {

                    }
                },
                deep: true,
                immediate: true
            }
        },
        pageComputed: {},
        globalVars: {
            nd: '',
            drjlid: '',
            studentId: '',
            editId: '',
            editJlid: '', // 编辑时的导入记录ID，用于查询字段权限
            editForceUpdateProps: '', // 强制更新字段（非必填+可编辑的字段列表）
            changeLogId: '',
            changeDate: '',
            progressData: {
                importCount: 0,
                classProgress: { percent: 0, pending: 0 },
                studentNoProgress: { percent: 0, pending: 0 },
                syncProgress: { percent: 0, pending: 0 }
            },
            importForm: {},
            tableVisibleFields: [] // 表格动态显示的字段列表
        },

        loadProgressData: function () {
            var self = this;
            var nd = self.globalVars.nd;
            var jlid = self.globalVars.drjlid;
            self.misRequest('eaxsrxgl_xslb_progress_query', {
                params: {
                    nd: nd,
                    jlid: jlid
                }
            }).then(function (res) {
                if (res.code === '0' && res.data && res.data.modelData) {
                    self.globalVars.progressData = res.data.modelData;
                }
            }).catch(function (err) {
                console.error('获取进度数据失败:', err);
            });
        },

        initData(currentData) {
            this.globalVars.nd = currentData.currentSelectedNd || '';
            this.globalVars.drjlid = currentData.currentSelectedId || '';
            this.loadTableFieldPermissions();
            this.loadProgressData();
            this.setImportBtnVisibility();
        },
        /**
         * 刷新表格数据
         */
        refresh: function (refreshTree) {
            this.$comMethod("modelAdvTable", "reloadData");
            this.loadProgressData();

            if (refreshTree == '0') {
                return;
            }

            this.refreshParentTree();
        },

        /**
         * 加载表格字段权限（控制列显隐）
         */
        loadTableFieldPermissions: function () {
            var self = this;
            var nd = self.globalVars.nd;
            var drjlid = self.globalVars.drjlid;
            var params = {};

            if (nd) {
                params.nd = nd;
            } else if (drjlid) {
                params.drjlid = drjlid;
            } else {
                self.globalVars.tableVisibleFields = [];
                self.applyTableFieldPermissions();
                return;
            }

            self.misRequest('eaxsrxgl_xslb_list_zdqx', {
                params: params
            }).then(function (res) {
                var visibleFields = [];
                if (res.code === '0' && res.data && res.data.list) {
                    for (var i = 0; i < res.data.list.length; i++) {
                        var item = res.data.list[i];
                        if (item.sfck === '1' && visibleFields.indexOf(item.zdm) === -1) {
                            visibleFields.push(item.zdm);
                        }
                    }
                }
                self.globalVars.tableVisibleFields = visibleFields;
                self.applyTableFieldPermissions();
                self.$nextTick(function () {
                    this.$comMethod("modelAdvTable", "search");
                });
            });
        },

        /**
         * 应用表格字段权限（动态控制列显隐）
         * 固定列 + sfck=1 的字段显示，其他全部隐藏
         */
        applyTableFieldPermissions: function () {
            var self = this;
            var visibleFields = self.globalVars.tableVisibleFields || [];
            var FIXED_FIELDS = ['ksbh', 'xm', 'xh', 'sffpbj', 'sffpxh', 'sftbxj', 'bjid'];
            var ALL_FIELDS = [
                'xbdm', 'mzdm', 'njid', 'yxid', 'xnzyid', 'xslbdm', 'zjlx', 'zjhm',
                'syddm', 'pyccdm', 'gkcj', 'csrq', 'xqid', 'kslbdm', 'wyyzdm', 'rxqdw',
                'jgdm', 'gjdqdm', 'zzmmdm', 'lxdh', 'lqlbdm', 'tc', 'rxnjid', 'zyfxid',
                'xmpy', 'cym', 'csddm', 'hyzkdm', 'zjxydm', 'sfzj', 'sfzx', 'hkszddm',
                'hkxzdm', 'yjbyrq', 'sjbyrq', 'xzdm', 'xkmlid', 'rxny', 'xxxsdm',
                'tsxslxdm', 'zsnd', 'zszxmc', 'tzsh', 'pyfsdm', 'xxdm', 'gatqdm',
                'jkzkdm', 'tz', 'sg', 'yhh', 'xsbh', 'yhzh', 'yktkh', 'tgyxid', 'zsdz',
                'ss', 'ssdh', 'sssyid', 'dzxx', 'sjhm', 'qqh', 'wxh', 'zxtxdz', 'zxyzbm',
                'jtdzqh', 'jtdz', 'jtyb', 'jtdh', 'zsjddm', 'kstz', 'rxfsdm', 'kslxdm',
                'xdmsdm', 'gklx', 'sfsyxw', 'syxwdm', 'xwzh', 'xwsysj', 'bjyjldm',
                'byzsh', 'jyzsh', 'byzyid', 'fxzyid', 'fxbysj', 'fxzsh', 'fxsfsyxw',
                'fxsyxwdm', 'fxxwzh', 'fxxwsysj', 'sxslbdm', 'sxwzsh', 'sxwbysj', 'sxwzy',
                'fsztdm', 'fxyxid', 'fxblsj', 'yysjb', 'jysjb', 'xjztdm', 'yyzshb',
                'bqdm', 'rxzyid', 'rxbjid', 'xslbdm2', 'ccqd', 'cczd', 'fj', 'sjr', 'yh',
                'fdyzgh', 'bz', 'jjlxr', 'jjlxfs', 'lxsj', 'fxbjyjldm', 'zxm', 'xzm'
            ];
            var modelConfig = {};

            for (var i = 0; i < ALL_FIELDS.length; i++) {
                var fieldName = ALL_FIELDS[i];
                var isVisible = FIXED_FIELDS.indexOf(fieldName) !== -1 || visibleFields.indexOf(fieldName) !== -1;
                modelConfig['eanewstudent.' + fieldName] = {
                    'grid.omitted': isVisible ? 0 : 1,
                    'grid.hidden': isVisible ? 0 : 1
                };
            }

            self.$setModelConfig('modelAdvTable', modelConfig);
        },

        pageActivated: function () { },
        pageDeactivated: function () { },
        pageCreated: function () {
            var params = this.page.pageParams || {};
            this.globalVars.nd = params.nd || '';
            this.globalVars.drjlid = params.drjlid || '';
            this.loadTableFieldPermissions();
        },
        pageReady: function () { },
        pageDestroy: function () { },


        /**
         * 导入按钮显隐逻辑：
         * - 如果 pageParams.nd 不为空，不显示
         * - 如果导入为空（表格无数据）且 drjlid 不为空，显示
         */
        setImportBtnVisibility: function () {
            var self = this;
            var nd = self.globalVars.nd;
            var drjlid = self.globalVars.drjlid;
            var tableData = self.$comMethod("modelAdvTable", "getData");


            // 表格无数据且 drjlid 不为空时显示
            if (drjlid) {
                self.$setComsProps({
                    'modelAdvTable': { 'toolbarConfig.leftButtonList.buttonList.0.hidden': false }
                });
            } else {
                self.$setComsProps({
                    'modelAdvTable': { 'toolbarConfig.leftButtonList.buttonList.0.hidden': true }
                });
            }
        },

        /**
         * 场景一：正常导入，打开参数选择弹框
         */
        importBtn_click: function (event) {
            var self = this;
            self.$pageDialog({
                key: 'importDialog'
            });
        },

        /**
         * 场景二：空导入，查询导入记录后直接打开导入窗口
         */
        emptyImport_click: function () {
            var self = this;
            var drjlid = self.globalVars.drjlid;

            self.misRequest('eaxsrxgl_xslb_view_drjl', {
                params: { id: drjlid }
            }).then(function (res) {
                if (res.code === '0' && res.data && res.data.modelData) {
                    var record = res.data.modelData;
                    self.globalVars.importForm = {
                        drfaid: record.id || '',
                        nd: record.nd || '',
                        mc: record.mc || '',
                        oldJlid: record.id
                    };
                    self.openImportWindow();
                } else {
                    self.$message.error('未找到导入记录');
                }
            }).catch(function (err) {
                self.$message.error('查询导入记录失败：' + (err.message || '未知错误'));
            });
        },

        /**
         * 打开导入窗口（带事件监听）
         */
        openImportWindow: function () {
            var self = this;
            var tablePage = self.misPage('modelAdvTable');
            if (tablePage && tablePage.$once) {
                tablePage.$once('import-success', function () {
                    self.refresh();

                });
                tablePage.$once('import-error', function () {
                    self.refresh();
                });
            }
            self.$nextTick(function () {
                self.misPage('modelAdvTable').openToolWindow('import');
            });
        },

        refreshParentTree: function () {

            var self = this;
            var topOwner = self.$topOwner;
            if (topOwner && topOwner._refreshTree) {
                topOwner._refreshTree();
            }
        },

        /**
         * 导入弹框 - 确定按钮
         */
        importConfirm_click: function (event, closeNext) {
            var self = this;
            // 获取表单组件并校验

            var tablePage = self.misPage('modelAdvTable');
            if (tablePage && tablePage.$once) {
                tablePage.$once('import-success', function () {
                    self.refresh();
                    var topOwner = self.$topOwner;
                    if (topOwner && topOwner._refreshTree) {
                        topOwner._refreshTree();
                    }
                });
                tablePage.$once('import-error', function () {
                    self.refresh();
                    var topOwner = self.$topOwner;
                    if (topOwner && topOwner._refreshTree) {
                        topOwner._refreshTree();
                    }
                });
            }

            var formVm = self.$page('importDataForm');
            formVm.validateFormValue().then(function (valid) {
                if (valid === false) {
                    return;
                }
                valid.oldJlid = '';
                // 设置 globalVars，供 importConfig 的 customParam 使用
                self.globalVars.importForm = valid;
                // 关闭弹框并打开导入窗口
                closeNext();
                self.$nextTick(function () {
                    self.misPage('modelAdvTable').openToolWindow('import');
                });
            });
        },

        /**
         * 分配班级（打开方案选择弹框）
         */
        assignClassBtn_click: function (event) {
            var self = this;
            self.$pageDialog({ key: 'assignClassDialog' });
        },

        /**
         * 分配班级弹框 - 确定按钮
         */
        assignClassConfirm_click: function (event, closeNext) {
            var self = this;
            var formVm = self.$page('assignClassForm');
            formVm.validateFormValue().then(function (valid) {
                if (valid === false) {
                    return;
                }
                var planId = valid.faid;
                if (!planId) {
                    self.$message.warning('请选择分班方案');
                    return;
                }

                var querySetting = self.getBatchOperationQuerySetting("modelAdvTable");

                self.misRequest('eaxsrxgl_xslb_fpbj', {
                    misRequestParams: { asyncTitle: '分班处理中' },
                    params: {
                        querySetting: querySetting,
                        planId: planId,
                        nd: self.globalVars.nd,
                        drjlid: self.globalVars.drjlid
                    }
                }).then(function (res) {
                    if (res.code === '0') {
                        var hasError = false;
                        var errorMsg = '';
                        if (res.data && res.data.result && res.data.result.baseVerifyData && res.data.result.baseVerifyData.dataList) {
                            var dataList = res.data.result.baseVerifyData.dataList;
                            for (var i = 0; i < dataList.length; i++) {
                                if (dataList[i].type === 'error') {
                                    hasError = true;
                                    errorMsg = dataList[i].name;
                                    break;
                                }
                            }
                        }
                        if (hasError) {
                            self.$message.error(errorMsg);
                            return;
                        }
                        self.$message.success('分班完成');
                        closeNext();
                        self.refresh();
                    }
                }).catch(function (err) {
                    self.$message.error('分班失败：' + (err.message || '未知错误'));
                });
            });
        },

        /**
         * 分配学号（打开规则选择弹框）
         */
        assignXhBtn_click: function (event) {
            var self = this;
            self.$pageDialog({ key: 'assignXhDialog' });
        },

        /**
         * 分配学号弹框 - 确定按钮
         */
        assignXhConfirm_click: function (event, closeNext) {
            var self = this;
            var formVm = self.$page('assignXhForm');
            formVm.validateFormValue().then(function (valid) {
                if (valid === false) {
                    return;
                }
                var gzid = valid.gzid;
                if (!gzid) {
                    self.$message.warning('请选择学号编码规则');
                    return;
                }

                var querySetting = self.getBatchOperationQuerySetting("modelAdvTable");

                self.misRequest('eaxsrxgl_xslb_fpxh', {
                    misRequestParams: { asyncTitle: '分配学号处理中' },
                    params: {
                        querySetting: querySetting,
                        gzid: gzid,
                        nd: self.globalVars.nd,
                        drjlid: self.globalVars.drjlid
                    }
                }).then(function (res) {
                    if (res.code === '0') {
                        var datalist = res.data.result.baseVerifyData.dataList;
                        for (var i = 0; i < datalist.length; i++) {
                            datalist[i].id = i + '';
                        }

                        window.$resDataCheck({
                            title: '学号分配结果',
                            checkType: 'baseVerifyData',
                            checkItems: datalist,
                            confirmButtonText: '确定',
                            showCancelBtn: false
                        });

                        closeNext();
                        self.refresh();
                    }
                }).catch(function (err) {
                    self.$message.error('分配学号失败：' + (err.message || '未知错误'));
                });
            });
        },

        /**
         * 同步学籍
         * 第一步：调用前置校验 API（同步），处理后验证弹窗确认
         * 第二步：调用异步同步学籍 API
         */
        syncBtn_click: function (event) {
            var self = this;
            var querySetting = self.getBatchOperationQuerySetting("modelAdvTable");
            self.executePreCheck(querySetting);
        },

        /**
         * 前置校验（同步 API）
         */
        executePreCheck: function (querySetting, skipCheckCmp) {
            var self = this;
            var requestParams = {
                params: {
                    querySetting: querySetting,
                    nd: self.globalVars.nd,
                    drjlid: self.globalVars.drjlid
                }
            };
            if (skipCheckCmp) {
                requestParams.params.skipCheckCmp = skipCheckCmp;
            }

            self.misRequest('eaxsrxgl_xslb_tbxj_qzjy', requestParams).then(function (res) {
                if (res.code === '0') {
                    // 前置校验通过，执行异步同步学籍
                    self.executeSyncStudentRegistration(querySetting);
                } else if (res.code === "DATA_CHECK_FAILED") {
                    var errors = res.data.data;
                    var skipCmp = "";
                    var errMsg = "";
                    for (var key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            var val = errors[key];
                            if (skipCmp !== "") { skipCmp += ","; }
                            skipCmp += key;
                            for (var i = 0; i < val.length; i++) {
                                var err = val[i];
                                if (errMsg !== "") { errMsg += ","; }
                                errMsg += err;
                            }
                        }
                    }
                    self.$confirm(errMsg, '同步学籍', {
                        type: "warn",
                        showConfirmButton: true,
                        confirmButtonText: "继续",
                        cancelButtonText: "取消"
                    }).then(function () {
                        self.executePreCheck(querySetting, skipCmp);
                    });
                }
            }).catch(function (err) {
                self.$message.error('前置校验失败：' + (err.message || '未知错误'));
            });
        },

        /**
         * 执行异步同步学籍
         */
        executeSyncStudentRegistration: function (querySetting) {
            var self = this;

            self.misRequest('eaxsrxgl_xslb_tbxj', {
                misRequestParams: { asyncTitle: '同步学籍处理中' },
                params: {
                    querySetting: querySetting,
                    nd: self.globalVars.nd,
                    drjlid: self.globalVars.drjlid
                }
            }).then(function (res) {
                if (res.code === '0') {
                    var hasError = false;
                    var errorMsg = '';
                    if (res.data && res.data.result && res.data.result.baseVerifyData && res.data.result.baseVerifyData.dataList) {
                        var dataList = res.data.result.baseVerifyData.dataList;
                        for (var i = 0; i < dataList.length; i++) {
                            if (dataList[i].type === 'error') {
                                hasError = true;
                                errorMsg = dataList[i].name;
                                break;
                            }
                        }
                    }
                    if (hasError) {
                        self.$message.error(errorMsg);
                        return;
                    }
                    self.$message.success('同步学籍成功');
                    self.refresh();
                }
            }).catch(function (err) {
                self.$message.error('同步学籍失败：' + (err.message || '未知错误'));
            });
        },

        /**
         * 删除新生（三步流程）
         * 第一步：确认删除
         * 第二步：执行删除新生
         * 第三步：询问是否同步删除学籍
         */
        deleteBtn_click: function (event) {
            var self = this;

            // 获取 querySetting（包含选中的 ids）
            var querySetting = self.getBatchOperationQuerySetting("modelAdvTable");

            // 确认删除
            self.$confirm('确定删除新生信息吗？删除后不可恢复', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                self.executeDeleteNewStudent(querySetting);
            }).catch(function () { });
        },

        /**
         * 执行删除新生操作
         */
        executeDeleteNewStudent: function (querySetting) {
            var self = this;

            self.misRequest('eaxsrxgl_xslb_sc', {
                params: {
                    querySetting: querySetting,
                    nd: self.globalVars.nd,
                    drjlid: self.globalVars.drjlid
                }
            }).then(function (res) {
                if (res.code === '0') {
                    self.$message.success('删除新生成功');
                    self.refresh();

                    // 保存删除返回的考生号和 id 列表，供后续同步删除学籍使用
                    var deleteContext = {};
                    if (res.data && res.data.kshList) {
                        deleteContext.kshList = res.data.kshList;
                    }
                    if (res.data && res.data.xsidList) {
                        deleteContext.xsidList = res.data.xsidList;
                    }

                    // 第二步：仅当存在已同步的新生时，才询问是否同步删除学籍
                    if (deleteContext.xsidList && deleteContext.xsidList.length > 0) {
                        self.$confirm('仅能够删除未被其他关联业务引用的学籍信息', '是否同步删除学籍？', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning'
                        }).then(function () {
                            self.executeSyncDeleteXj(deleteContext);
                        }).catch(function () { });
                    }
                }
            }).catch(function (err) {
                console.error('删除新生失败:', err);
            });
        },

        /**
         * 执行同步删除学籍
         */
        executeSyncDeleteXj: function (deleteContext) {
            var self = this;

            self.misRequest('eaxsrxgl_xslb_tbxj_sc', {
                params: {

                    kshList: deleteContext.kshList,
                    xsidList: deleteContext.xsidList
                }
            }).then(function (res) {
                if (res.code === '0') {
                    self.$message.success('删除学籍成功');
                    self.refresh();
                }
            }).catch(function (err) {
                console.error('删除学籍失败:', err);
            });
        },

        /**
         * 清空班级（二次确认）
         */
        clearClassBtn_click: function (event) {
            var self = this;
            var querySetting = self.getBatchOperationQuerySetting("modelAdvTable");

            self.$confirm('确定清空所选数据的班级信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                self.misRequest('eaxsrxgl_xslb_qkbj', {
                    params: {

                        querySetting: querySetting,
                        nd: self.globalVars.nd,
                        drjlid: self.globalVars.drjlid
                    }
                }).then(function (res) {
                    if (res.code === '0') {
                        self.$message.success('清空班级成功');
                        self.refresh();
                    }
                });
            }).catch(function () { });
        },

        /**
         * 清空学号（二次确认）
         */
        clearXhBtn_click: function (event) {
            var self = this;
            var querySetting = self.getBatchOperationQuerySetting("modelAdvTable");

            self.$confirm('确定清空所选数据的学号信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                self.misRequest('eaxsrxgl_xslb_qkxh', {
                    params: {

                        querySetting: querySetting,
                        nd: self.globalVars.nd,
                        drjlid: self.globalVars.drjlid
                    }
                }).then(function (res) {
                    if (res.code === '0') {
                        self.$message.success('清空学号成功');
                        self.refresh();
                    }
                });
            }).catch(function () { });
        },

        /**
         * 导出
         */
        exportBtn_click: function (event) {
            this.misPage('modelAdvTable').openToolWindow('export');
        },

        /**
         * 编辑（行操作）
         */
        editBtn_click: function (event) {
            var row = event.row;
            // 存储编辑所需的数据
            this.globalVars.editId = row.id;
            this.globalVars.editJlid = row.jlid; // 用于查询字段权限
            this.$pageDialog({ key: 'editDialog' });
        },

        /**
         * 编辑弹框 - mounted 事件
         * 加载学生数据和字段权限
         */
        editDialog_mounted: function () {
            var self = this;
            var editId = self.globalVars.editId;
            var jlid = self.globalVars.editJlid;

            if (!editId || !jlid) {
                self.$message.error('缺少必要参数');
                return;
            }

            // 并行加载学生数据和字段权限
            Promise.all([
                self.loadStudentDetail(editId),
                self.loadFieldPermissions(jlid)
            ]).then(function (results) {
                var studentData = results[0];
                var permissions = results[1];
                // 应用字段权限
                self.applyFieldPermissions(permissions);
                // 设置表单数据
                if (studentData) {
                    self.$setVal('data-form_rc0mm0z9', studentData);

                }
            }).catch(function (err) {
                console.error('加载编辑数据失败:', err);
                self.$message.error('加载数据失败');
            });
        },

        /**
         * 加载学生详情
         */
        loadStudentDetail: function (id) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.misRequest('eaxsrxgl_xslb_view_xsmx', {
                    params: { id: id }
                }).then(function (res) {
                    if (res.code === '0' && res.data && res.data.modelData) {
                        resolve(res.data.modelData);
                    } else {
                        reject(new Error('查询学生详情失败'));
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        },

        /**
         * 加载字段权限
         */
        loadFieldPermissions: function (drjlid) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.misRequest('eaxsrxgl_xslb_list_zdqx', {
                    params: { drjlid: drjlid }
                }).then(function (res) {
                    if (res.code === '0' && res.data && res.data.list) {
                        resolve(res.data.list);
                    } else {
                        resolve([]);
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        },

        /**
         * 应用字段权限
         * sfck: 是否查看 - 控制显示
         * sfbj: 是否编辑 - 控制只读
         * sfbt: 是否必填 - 控制必填
         * 同时计算 forceUpdateProps：非必填 + 可编辑的字段
         */
        applyFieldPermissions: function (permissions) {
            var self = this;
            var formVm = self.$page('data-form_rc0mm0z9');
            if (!formVm) return;

            // 构建字段权限配置
            var fieldConfig = {};
            var forceUpdateFields = []; // 强制更新字段列表

            for (var i = 0; i < permissions.length; i++) {
                var perm = permissions[i];
                var fieldName = perm.zdm; // 字段码（对应模型字段名）
                var sfck = perm.sfck; // 是否查看
                var sfbj = perm.sfbj; // 是否编辑
                var sfbt = perm.sfbt; // 是否必填

                // 设置字段配置
                fieldConfig[fieldName] = {
                    hidden: sfck !== '1', // 不允许查看则隐藏
                    readonly: sfbj !== '1', // 不允许编辑则只读
                    required: sfbt === '1' // 必填
                };

                // 非必填 + 可编辑的字段，加入强制更新列表
                // 这样用户清空这些字段时，可以更新为 null
                if (sfbj === '1' && sfbt !== '1') {
                    forceUpdateFields.push(fieldName);
                }
            }

            // 存储 forceUpdateProps（逗号分隔）
            self.globalVars.editForceUpdateProps = forceUpdateFields.join(',');

            // 更新字段属性
            formVm.setProps(fieldConfig);
        },

        /**
         * 编辑弹框 - 确定按钮
         */
        editConfirm_click: function (event, closeNext) {
            var self = this;
            var formVm = self.$page('data-form_rc0mm0z9');

            formVm.validateFormValue().then(function (valid) {
                if (valid === false) {
                    return;
                }

                // 获取表单数据
                var formData = valid;
                formData.id = self.globalVars.editId;

                // 使用计算好的 forceUpdateProps（非必填+可编辑的字段）
                var forceUpdateProps = self.globalVars.editForceUpdateProps || '';

                self.misRequest('eaxsrxgl_xslb_repo_bjxs', {
                    params: {
                        student: formData,
                        forceUpdateProps: forceUpdateProps
                    }
                }).then(function (res) {
                    if (res.code === '0') {
                        self.$message.success('保存成功');
                        closeNext();

                        self.$comMethod("modelAdvTable", "reloadData");
                    }
                }).catch(function (err) {
                    self.$message.error('保存失败：' + (err.message || '未知错误'));
                });
            });
        },

        /**
         * 操作记录（行操作）
         */
        logBtn_click: function (event) {
            var row = event.row;
            this.globalVars.studentId = row.id;
            this.$pageDialog({ key: 'logDialog' });
        },

        /**
         * 查看详细日志
         */
        viewLogDetail_click: function (event) {
            var row = event.row;
            this.globalVars.changeLogId = row.id;
            this.globalVars.changeDate = row.createTime;
            this.$pageDialog({
                key: 'logDetailDialog',
                winParams: { title: '变更详情 - ' + (this.globalVars.changeDate || '') }
            });
        },

        /**
         * 详细日志按钮显隐（新增/删除操作不显示详细日志）
         */
        detailLogHide_render: function (event) {
            var actionType = event.row.actionType;
            if ('add' === actionType || 'delete' === actionType) {
                event.btnList[0].hidden = true;
            } else {
                event.btnList[0].hidden = false;
            }
        },
        stepClick: function (type) {
            console.log(type)

            const params = {}
            let querySetting = [];


            this.misPage('modelAdvTable').getCusFilterModeRef()?.doClear(false)

            if (type == '2') {
                params['eanewstudent.sffpbj'] = '0';
                querySetting.push({ name: "eanewstudent.sffpbj", value: "0", linkOpt: "and", builder: "equal", builder_display: "等于" });
            }

            if (type == '3') {
                params['eanewstudent.sffpxh'] = '0';
                querySetting.push({ name: "eanewstudent.sffpxh", value: "0", linkOpt: "and", builder: "equal", builder_display: "等于" });
            }

            if (type == '4') {
                params['eanewstudent.sftbxj'] = '0';
                querySetting.push({ name: "eanewstudent.sftbxj", value: "0", linkOpt: "and", builder: "equal", builder_display: "等于" });
            }
            this.$setComProps('modelAdvTable', { cusFilterDefaultValue: params })
            this.$nextTick(() => {
                this.$nextTick(() => {
                    this.misPage('modelAdvTable')?.getCusFilterModeRef?.()?.doSearch?.()
                })
            })

        }
    };
});
