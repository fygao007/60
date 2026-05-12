define(function (require) {
    return {
        /**
         * 对$request的封装，统一处理错误提示
         */
        misRequest: function (key, params, btnEvent) {
            var businessDomain = this.$topOwner.pageParams?.businessDomain;
            var self = this;
            var misRequestParams = {};
            if (typeof key === "object" && key.hasOwnProperty("misRequestParams")) {
                misRequestParams = key.misRequestParams || {};
                delete key.misRequestParams;
                if (businessDomain && !key.params?.businessDomain) {
                    if (!key.params) {
                        key.params = {};
                    }
                    key.params.businessDomain = businessDomain;
                }
            } else if (typeof params === "object" && params.hasOwnProperty("misRequestParams")) {
                misRequestParams = params.misRequestParams || {};
                delete params.misRequestParams;
                if (businessDomain && !params.params?.businessDomain) {
                    if (!params.params) {
                        params.params = {};
                    }
                    params.params.businessDomain = businessDomain;
                }
            }
            //关闭对错误提示的统一处理
            var misOffWrapError = !!misRequestParams.offWrapError;
            var misErrorTitle = misRequestParams.errorTitle || '错误';
            var misOffAsyncProcess = !!misRequestParams.offAsyncProcess;
            var misAsyncTitle = misRequestParams.asyncTitle || '数据处理中...';
            //关闭对弱校验提示的处理
            var misOffWrapDataCheckFailed = !!misRequestParams.offWrapDataCheckFailed;
            var misDataCheckDlgTitle = misRequestParams.dataCheckDlgTitle || misRequestParams.errorTitle || '校验结果';
            var misDataCheckConfirmBtnText = misRequestParams.dataCheckConfirmBtnText || '继续';
            var misDataCheckCancelBtnText = misRequestParams.dataCheckCancelBtnText || '关闭';
            //弱校验是否显示强排原因
            var misShowDataCheckReason = !!misRequestParams.showDataCheckReason;

            var req = self.$request(key, params, btnEvent, false);
            if (!req) {
                console.error("apiCode[" + key + "]不在页面数据源中");
                return;
            }
            if (!misOffWrapError) {
                // 处理未知错误
                req = req.then((res) => {
                    if (res.status === 200 || res.status === undefined) {
                        return res;
                    }

                    if (res.status === 404) {
                        self.$confirm("请求的链接不存在", '错误', {
                            type: "error",
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                    } else {
                        self.$confirm("请求出错", misErrorTitle, {
                            type: "error",
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                    }
                    throw new Error(res);
                });
            }

            //使用预置API发送请求时，返回data供后续操作
            if (typeof key === "string") {
                req = req.then(function (res) {
                    return res.data;
                });
            }

            if (!misOffWrapError) {
                // 业务异常处理
                req = req.then((res) => {
                    if (res.code === "UNHANDLED_EXCEPTION") {
                        console.log("未捕获异常：", res);
                        self.$confirm("系统在处理您的请求时遇到错误，请稍后再试", misErrorTitle, {
                            type: "error",
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                        throw new Error(res);
                    } else if (res.code !== "0" && res.code !== "DATA_CHECK_FAILED") {
                        self.$confirm(`${this.$LANG('singleModelMessageFailureReason')}${res.msg}`, misErrorTitle, {
                            type: "warn",
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                    }
                    return res;
                });
            }

            if (!misOffWrapDataCheckFailed || !misOffAsyncProcess) {
                return new Promise(function (resolve, reject) {
                    req.then(function (res) {
                        if (!misOffWrapDataCheckFailed && res.code === "DATA_CHECK_FAILED") {
                            var skipCheckCmp = res.data.traceId;
                            var isStrong = res.data.data.valid.length > 0;
                            var qpts = JSON.stringify(res.data.data);

                            var message = "";
                            var baseCheckItems = [];
                            var checkItems = [];
                            var idxCheckItem = {};
                            res.data.data.valid.forEach(function (val1) {
                                if (typeof val1 === 'string') {
                                    baseCheckItems.push({"name": val1, "type": "error"});
                                    message = val1;
                                } else if (typeof val1 === 'object' && val1.id && val1.group) {
                                    if (idxCheckItem[val1.id]) {
                                        val1.dataList.forEach(function (item) {
                                            idxCheckItem[val1.id].dataList.push(item);
                                        });
                                    } else {
                                        checkItems.push(val1);
                                        idxCheckItem[val1.id] = val1;
                                    }
                                }
                            });
                            res.data.data.check.forEach(function (val2) {
                                if (typeof val2 === 'string') {
                                    baseCheckItems.push({"name": val2, "type": "warning"});
                                    message = val2;
                                } else if (typeof val2 === 'object' && val2.id && val2.group) {
                                    if (idxCheckItem[val2.id]) {
                                        val2.dataList.forEach(function (item) {
                                            idxCheckItem[val2.id].dataList.push(item);
                                        });
                                    } else {
                                        checkItems.push(val2);
                                        idxCheckItem[val2.id] = val2;
                                    }
                                }
                            });

                            var isOnConfirm = false;
                            var isOnSecondConfirm = false;
                            var resDataCheckParams = {
                                title: misDataCheckDlgTitle,
                                checkType: 'proVerifyData',
                                enableCollapse: true,
                                cancelButtonText: misDataCheckCancelBtnText,
                                onClose: () => {
                                    if (!isOnConfirm) {
                                        resolve({"code": "CANCEL_BY_CHECK_FAILED", "msg": "校验取消"});
                                    }
                                }
                            };
                            if (isStrong) {
                                resDataCheckParams.showConfirmBtn = false;
                            } else {
                                resDataCheckParams.confirmButtonText = misDataCheckConfirmBtnText;
                                resDataCheckParams.onConfirm = () => {
                                    if (typeof key === "object") {
                                        key.params.skipCheckCmp = skipCheckCmp;
                                        key.params.validqpts = qpts;
                                    } else if (typeof params === "object") {
                                        params.params.skipCheckCmp = skipCheckCmp;
                                        params.params.validqpts = qpts;
                                    }
                                    isOnConfirm = true;
                                    if (misShowDataCheckReason) {
                                        var reasonPageDlg = self.$openPage({
                                            appCode: 'main',
                                            pageCode: 'validReasonPage',
                                            pageParams: {
                                                "onSuccess": (qpyy) => {
                                                    isOnSecondConfirm = true;
                                                    if (typeof key === "object") {
                                                        key.params.validqpyy = qpyy;
                                                    } else if (typeof params === "object") {
                                                        params.params.validqpyy = qpyy;
                                                    }
                                                    reasonPageDlg.closeWindow();
                                                    resolve(self.misRequest(key, params, btnEvent));
                                                },
                                                "onClose": () => {
                                                    isOnSecondConfirm = true;
                                                    resolve({"code": "CANCEL_BY_CHECK_FAILED", "msg": "校验取消"});
                                                    reasonPageDlg.closeWindow();
                                                }
                                            }
                                        }, {
                                            winParams: {
                                                title: '强排原因',
                                                // width: 500,
                                                action: false
                                            },
                                            callback: () => {
                                                if (!isOnSecondConfirm) {
                                                    resolve({"code": "CANCEL_BY_CHECK_FAILED", "msg": "校验取消"});
                                                }
                                            }
                                        });
                                    } else {
                                        resolve(self.misRequest(key, params, btnEvent));
                                    }
                                }
                            }
                            if (baseCheckItems.length === 1 && checkItems.length <= 0) {
                                resDataCheckParams.message = message;
                            } else {
                                if (baseCheckItems.length >= 0) {
                                    resDataCheckParams.baseCheckItems = baseCheckItems;
                                }
                                if (checkItems.length >= 0) {
                                    resDataCheckParams.checkItems = checkItems;
                                }
                            }
                            window.$resDataCheck(resDataCheckParams);
                        } else if (!misOffAsyncProcess && res.code === "0" && res.data && res.data.progressId) {
                            self.$resAsyncProgress({
                                text: misAsyncTitle,    // 进度条下方提示文字
                                width: '480px',           // 弹窗宽度
                                interval: 1000,           // 轮询间隔时间（毫秒）
                                progressId: res.data.progressId,
                                onComplete: ({success, data}) => {  // 完成回调
                                    resolve({"code": "0", "data": {...data}});
                                },
                            }).open();
                        } else {
                            resolve(req);
                        }
                    });
                });
            } else {
                return req;
            }
        },
        /**
         * 对$request的封装，统一处理错误提示
         */
        misMobileRequest: function (key, params, btnEvent) {
            var self = this;
            var misRequestParams = {};
            if (typeof key === "object" && key.hasOwnProperty("misRequestParams")) {
                misRequestParams = key.misRequestParams || {};
                delete key.misRequestParams;
            } else if (typeof params === "object" && params.hasOwnProperty("misRequestParams")) {
                misRequestParams = params.misRequestParams || {};
                delete params.misRequestParams;
            }
            //关闭对错误提示的统一处理
            var misOffWrapError = !!misRequestParams.offWrapError;
            var misErrorTitle = misRequestParams.errorTitle || '错误';

            var req = self.$request(key, params, btnEvent, false);
            if (!req) {
                console.error("apiCode[" + key + "]不在页面数据源中");
                return;
            }
            if (!misOffWrapError) {
                // 处理未知错误
                req = req.then((res) => {
                    if (res.status === 200 || res.status === undefined) {
                        return res;
                    }

                    if (res.status === 404) {
                        self.$mobileMsgboxConfirm({
                            message: "请求的链接不存在", title: '错误', showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                    } else {
                        self.$mobileMsgboxConfirm({
                            message: "请求出错", title: misErrorTitle,
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                    }
                    throw new Error(res);
                });
            }

            //使用预置API发送请求时，返回data供后续操作
            if (typeof key === "string") {
                req = req.then(function (res) {
                    return res.data;
                });
            }

            if (!misOffWrapError) {
                // 业务异常处理
                req = req.then((res) => {
                    if (res.code === "UNHANDLED_EXCEPTION") {
                        console.log("未捕获异常：", res);
                        self.$mobileMsgboxConfirm({
                            message: "系统在处理您的请求时遇到错误，请稍后再试", title: misErrorTitle,
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        });
                        throw new Error(res);
                    } else if (res.code !== "0" && res.code !== "DATA_CHECK_FAILED") {
                        self.$mobileMsgboxConfirm({
                            message: `${this.$LANG('singleModelMessageFailureReason')}${res.msg}`, title: misErrorTitle,
                            showConfirmButton: false,
                            cancelButtonText: this.$LANG('singleModelButtonClose')
                        }, misErrorTitle);
                    }
                    return res;
                });
            }

            return req;
        },
        /**
         * 获取表单非必填字段
         * @param {string} formKey 表单key
         * @returns {[]} 非必填字段名数组；如果表单无非必填字段，则返回空数组
         */
        getFormUnRequiredFields: function (formKey) {
            let modelList = this.$page(formKey).renderSchemaOrigin;
            let fieldArr = [];
            if (modelList?.length) {
                modelList.forEach(model => {
                    if (!model.options.required && model.name != 'updateBy' && model.name != 'updateTime' && model.name != 'updateName' && model.name != 'createBy' && model.name != 'createTime' && model.name != 'createName') {
                        fieldArr.push(model.name);
                    }
                });
            }
            return fieldArr;
        },
        /**
         * 获取页面实例(用于拦截通用组件)
         */
        misPage: function (id) {
            var cmp = this.$page(id);
            // if (!cmp) {
            //     // 返回安全代理对象，避免调用端访问属性或方法时报错
            //     var safeProxy = new Proxy(function () {}, {
            //         get: function () {
            //             return safeProxy;
            //         },
            //         apply: function () {
            //             return undefined;
            //         },
            //     });
            //     return safeProxy;
            // }
            const clearDataName = function (item) {
                let newItem = {};
                for (var key in item) {
                    if (!key.endsWith("_name")) {
                        newItem[key] = item[key];
                    }
                }
                return newItem;
            };
            if (cmp && cmp.$el && (cmp.$el.classList.contains("adv-vxe-table") || cmp.validateFormValue)) {
                // 创建一个代理对象，不修改原实例
                const proxyHandler = {
                    get(target, prop) {
                        if (prop === "validateFormValue") {
                            const originalMethod = target[prop];
                            return function (...args) {
                                // 调用原始方法
                                return originalMethod
                                    ? originalMethod.apply(target, args).then((res) => {
                                        if (!res) {
                                            return res;
                                        } else {
                                            return clearDataName(res);
                                        }
                                    })
                                    : true;
                            };
                        } else if (prop === "getCheckboxAllRecords") {
                            const originalMethod = target[prop];
                            return function (...args) {
                                let checkedList = originalMethod.apply(target, args);
                                checkedList = checkedList.map((item) => clearDataName(item));
                                return checkedList;
                            };
                        }

                        // 其他属性直接返回
                        const value = target[prop];

                        // 如果是函数，需要绑定正确的this
                        if (typeof value === "function") {
                            return value.bind(target);
                        }

                        return value;
                    },

                    set(target, prop, value) {
                        target[prop] = value;
                        return true;
                    },
                };
                // 返回代理对象，原实例保持不变
                return new Proxy(cmp, proxyHandler);
            }
            return cmp;
        },
        /**
         * 切换启用状态（表格列中的启用禁用开头切换）
         * @param row 开关所在行数据
         * @param table 开关所在模型表格对象
         * @param dictCodes 需要刷新的字典（多个字典以逗号分隔）
         * @param qyztFieldName 实际字段名 比如 sfyx，某些表同时存在qyzt跟sfyx，qyzt仅作为技术字段对外，可以更新的是sfyx
         */
        toggleEnableStatus: function (row, table, dictCodes, cascadeModelName, qyztFieldName) {
            console.log("toggleEnableStatus:", table, row, dictCodes, cascadeModelName);
            var fieldName = qyztFieldName ? qyztFieldName : "qyzt";
            var businessDomain = table.modelParams.params ? table.modelParams.params.businessDomain : "";
            var app = table.modelParams.modelApp;
            var model = table.modelParams.modelName;
            return this.misRequest({
                url: "/jxcommon/" + app + "/" + model + "/toggleEnableStatus",
                method: 'POST',
                data: {
                    "businessDomain": businessDomain,
                    "id": row["id"],
                    "qyzt": row[fieldName] ? row[fieldName] : row[cascadeModelName + "." + fieldName],
                    "dictCodes": dictCodes,
                    "cascadeModelName": cascadeModelName
                }
            }).then((res) => {
                if (res && res.code === '0') {
                    this.$message.success("操作成功");
                } else {
                    table.reloadData();
                }
            });
        },
        /***
         * 获取最大排序号
         * @param model 排序号对应的数据模型
         * @param app 对应应用
         */
        nextOrder: function (model, app) {
            var businessDomain = this.$topOwner.pageParams.businessDomain;
            var appCode = app ? app : this.$topOwner.pageParams.appCode;
            return this.misRequest({
                url: "/jxcommon/" + appCode + "/" + model + "/nextOrder",
                method: 'POST',
                data: {"businessDomain": businessDomain}
            }).then((res) => {
                if (res && res.code === '0') {
                    return res.data;
                }
            });
        },
        sort: function (ids, tableVm) {
            var params = {ids: ids};
            var appCode = tableVm.modelApp;
            var modelName = tableVm.modelName;
            if (this.$topOwner?.pageParams?.businessDomain && !appCode.startsWith(this.$topOwner?.pageParams?.businessDomain)) {
                appCode = this.$topOwner?.pageParams?.businessDomain + appCode;
                modelName = this.$topOwner?.pageParams?.businessDomain + modelName;
            }
            return this.misRequest({
                misRequestParams: {errorTitle: this.$LANG('singleModelMessageOperateFailure')},
                url: `/eda/${appCode}/sort/${modelName}`,
                method: "post",
                data: params
            }).then(res => {
                if (res.code === '0') {
                    this.$Msg(this.$LANG('singleModelMessageOperateSuccess'), 'success');
                }
            });
        },

        /**
         * 校验批量操作数据
         *
         * @param tableKey 高级表格key
         * @param msg 提示信息
         * @returns {Promise<boolean>}
         */
        checkBatchOperationData: function (tableKey = 'modelAdvTable', msg = '当前没有可操作的数据，请检查筛选条件或添加数据') {
            return new Promise((resolve) => {
                const checkedRows = this.$page(tableKey).getCheckboxAllRecords();
                const tableTotal = this.$page(tableKey).tablePager.total;
                if (checkedRows.length || tableTotal) {
                    resolve(true);
                } else {
                    this.$Msg(msg, 'warning');
                    resolve(false);
                }
            });
        },

        /**
         * 获取批量操作顶部提示
         *
         * @param tableKey 高级表格key
         * @param searchKey 高级搜索key
         * @param field 明细显示字段，如xm
         */
        getBatchOperationTip: function (tableKey = 'modelAdvTable', searchKey = 'modelAdvSearch', field = 'xm') {
            const checkedRows = this.$page(tableKey).getCheckboxAllRecords();
            if (checkedRows.length) {
                if (checkedRows.length > 5) {
                    return `已选数据【${checkedRows.slice(0, 5).map(i => i[field]).join('、')} ... 】 共<span style="color: var(--wis-base-color-brand-3);font-weight: bold;">&nbsp;${checkedRows.length}&nbsp;</span>条`
                } else {
                    return `已选数据【${checkedRows.map(i => i[field]).join('、')}】 共<span style="color: var(--wis-base-color-brand-3);font-weight: bold;">&nbsp;${checkedRows.length}&nbsp;</span>条`
                }
            } else {
                const tableTotal = this.$page(tableKey).tablePager.total;
                const querySetting = this.conditionConvert(this.$page(searchKey).getSelectCondition(false));
                if (querySetting.length === 0) {
                    return `当前无筛选条件，将操作全部<span style="color: var(--wis-base-color-brand-3);font-weight: bold;">&nbsp;${tableTotal}&nbsp;</span>条数据`
                } else if (querySetting.length > 5) {
                    return `筛选条件${querySetting.slice(0, 5).join('、')}... 共<span style="color: var(--wis-base-color-brand-3);font-weight: bold;">&nbsp;${tableTotal}&nbsp;</span>条数据`
                } else {
                    return `筛选条件${querySetting.join('、')} 共<span style="color: var(--wis-base-color-brand-3);font-weight: bold;">&nbsp;${tableTotal}&nbsp;</span>条数据`
                }
            }
        },

        /**
         * 将搜索条件转换成成【xx：xx】样式
         *
         * @param selectCondition
         */
        conditionConvert: function (selectCondition) {
            if (selectCondition) {
                const pairs = selectCondition.match(/“(.+?)” 为 “(.+?)”/g);
                return pairs.map(pair => {
                    const [, key, value] = pair.match(/“(.+?)” 为 “(.+?)”/);
                    return `【${key}：${value}】`;
                });
            }
            return [];
        },

        /**
         * 获取批量操作QuerySetting
         *
         * @param tableKey 高级表格key
         * @param idField 选中数据行标识，如id
         */
        getBatchOperationQuerySetting: function (tableKey = 'modelAdvTable', idField = 'id') {
            const checkedRows = this.$page(tableKey).getCheckboxAllRecords();
            if (checkedRows.length > 0) {
                return [{
                    name: idField,
                    value: checkedRows.map(i => i[idField]).join(","),
                    linkOpt: "and",
                    builder: "m_value_equal"
                }];
            }
            return this.$page(tableKey).queryModel.querySetting;
        },
        /**
         * 获取批量操作选中提示
         */
        getCheckedTip: function (tableKey, tpl = '{mc}', selectedRows) {
            selectedRows = selectedRows || [];
            if (selectedRows.length > 0 || this.$page(tableKey).getCheckboxAllRecords().length > 0) {
                let rows = selectedRows.length > 0 ? selectedRows : this.$page(tableKey).getCheckboxAllRecords();
                let tip = rows.slice(0, 5).map(row => this.renderTpl(tpl, row)).join('、');
                if (rows.length > 5) {
                    tip += '...';
                }
                return '已选数据【' + tip + '】共<span style="padding: 0 4px;color: var(--wis-base-color-brand-3);font-weight: 600;">' + rows.length + '</span>条';
            } else {
                let querySetting = this.$page(tableKey).queryModel.querySetting;
                let total = this.$page(tableKey).tablePager.total;
                if (querySetting.length === 0) {
                    return `当前无筛选条件，将操作全部<span style="padding: 0 4px;color: var(--wis-base-color-brand-3);font-weight: 600;">${total}</span>条数据`
                } else {
                    return `筛选条件${querySetting.map(i => {
                        // 如果i是数组，遍历所有元素
                        if (Array.isArray(i)) {
                            let linkOpt = i.length > 1 && i[1].linkOpt === 'or' ? '或' : '';
                            let content = i.map(item => item.caption + ':' + (item.value_display || item.value)).join(linkOpt);
                            return '【' + content + '】';
                        } else {
                            return '【' + i.caption + ':' + (i.value_display || i.value) + '】';
                        }
                    }).join('')} ...共<span style="padding: 0 4px;color: var(--wis-base-color-brand-3);font-weight: 600;">${total}</span>条数据`
                }
            }
        },
        /**
         * 渲染模板
         * @param tpl 模板，变量使用大括号包裹
         * @param data  数据
         */
        renderTpl: function (tpl, data) {
            let result = tpl;
            for (let key in data) {
                result = result.replace(new RegExp('{' + key + '}', 'g'), data[key]);
            }
            return result;
        },

        /**
         * 根据给定的字符串，结合单位，生成汉字描述
         * 例：
         * 101011111010101010 => 1-3周(单),5-9周,11-17周(单)
         * 101010101010101010 => 1-17周(单)
         * 111111111111111111 => 1-18周
         * @param rawString 原始值字符串
         * @param unit 单位
         * @return
         */
        _genCnNameText: function (rawString, unit) {
            if (rawString === null || rawString === undefined || rawString === "") {
                return "";
            }
            var sawsb = "";
            var regex;
            var regexMatcher = null;
            var begin = 0;
            var end = 0;
            sawsb += rawString + "00";
            var LENS = sawsb.length;
            var sb = "";
            regex = new RegExp("(1{2," + LENS + "})");
            while (regex.exec(sawsb)) {
                regexMatcher = regex.exec(sawsb);
                begin = regexMatcher.index;
                end = regexMatcher.index + regexMatcher[0].length;
                if (sb.length > 0) sb += ",";
                sb += begin + 1;
                sb += "-" + end + unit;
                for (var i = begin; i < end; i++) {
                    sawsb = this._replacepos(sawsb, i, i + 1, "0");
                }
            }
            regex = new RegExp("((10){2," + (LENS - 1) + "})");
            var sbArrTmp = [];
            while (regex.exec(sawsb)) {
                regexMatcher = regex.exec(sawsb);
                begin = regexMatcher.index;
                end = regexMatcher.index + regexMatcher[0].length;
                if ((begin + 1) % 2 == 0) {
                    sbArrTmp.push({
                        value: regexMatcher[0],
                        begin: begin,
                        end: end
                    });
                    for (var j = begin; j < end; j++) {
                        sawsb = this._replacepos(sawsb, j, j + 1, "0");
                    }
                    continue;
                }
                if (sb.length > 0) {
                    sb += ",";
                }
                sb += begin + 1;
                if (end % 2 == 0) {
                    sb += "-" + (end - 1) + `${unit}(单)`;
                } else {
                    sb += "-" + end + `${unit}(单)`;
                }
                for (var k = begin; k < end; k++) {
                    sawsb = this._replacepos(sawsb, k, k + 1, "0");
                }
            }
            if (sbArrTmp.length > 0) {
                for (var m = 0, tmpLength1 = sbArrTmp.length; m < tmpLength1; m++) {
                    sawsb = this._replacepos(sawsb, sbArrTmp[m].begin, sbArrTmp[m].end, sbArrTmp[m].value);
                }
            }
            sbArrTmp = [];
            regex = new RegExp("((01){2," + (LENS - 1) + "})");
            while (regex.exec(sawsb)) {
                regexMatcher = regex.exec(sawsb);
                begin = regexMatcher.index;
                end = regexMatcher.index + regexMatcher[0].length;
                if ((begin + 1) % 2 == 0) {
                    sbArrTmp.push({
                        value: regexMatcher[0],
                        begin: begin,
                        end: end
                    });
                    for (var n = begin; n < end; k++) {
                        sawsb = this._replacepos(sawsb, n, n + 1, "0");
                    }
                    continue;
                }
                if (sb.length > 0) {
                    sb += ",";
                }
                if (begin % 2 == 0) {
                    sb += begin + 2;
                } else {
                    sb += begin + 3;
                }
                sb += "-" + end + `${unit}(双)`;
                for (var x = begin; x < end; x++) {
                    sawsb = this._replacepos(sawsb, x, x + 1, "0");
                }
            }
            if (sbArrTmp.length > 0) {
                for (var y = 0, tmpLength = sbArrTmp.length; y < tmpLength; y++) {
                    sawsb = this._replacepos(sawsb, sbArrTmp[y].begin, sbArrTmp[y].end, sbArrTmp[y].value);
                }
            }
            regex = new RegExp("(1+)");
            while (regex.exec(sawsb)) {
                regexMatcher = regex.exec(sawsb);
                begin = regexMatcher.index;
                end = regexMatcher.index + regexMatcher[0].length;
                if (sb.length > 0) sb += ",";
                if (begin + 1 == end) {
                    sb += end + unit;
                } else {
                    sb += begin + 1;
                    sb += "-" + end + unit;
                }
                for (var z = begin; z < end; z++) {
                    sawsb = this._replacepos(sawsb, z, z + 1, "0");
                }
            }

            var zcarr = sb.toString().split(",");
            if (zcarr.length > 1) {
                zcarr.sort((obj1, obj2) => {
                    var s1 = obj1.toString().split(`-|${unit}`)[0];
                    var s2 = obj2.toString().split(`-|${unit}`)[0];
                    return parseInt(s1) - parseInt(s2);
                });
            }
            return zcarr.join(",");
        },
        _replacepos: function (text, start, stop, replacetext) {
            return text.substring(0, start) + replacetext + text.substring(stop);
        },

        safeCommaToSlash: function (str) {
            // 处理null、undefined或非字符串输入
            if (str === null || str === undefined) {
                return '';
            }

            // 确保输入是字符串
            const stringValue = String(str);

            // 执行替换
            return stringValue.replace(/,/g, '/');
        }
    };
});
