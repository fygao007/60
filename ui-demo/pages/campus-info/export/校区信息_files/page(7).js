define(function (require) {

  var themeColorObj = {
    '#333fff': {
      bg1: '#F5F5FF',
      borderColor: '',
      hueRotate: 360
    },
    '#1FB09D': {
      bg1: '#F4FBFA',
      borderColor: '#E9F7F5',
      hueRotate: 120
    },
    '#FF913B': {
      bg1: '#FFF9F5',
      borderColor: '#FFF4EC',
      hueRotate: 120
    },
    '#FA5151': {
      bg1: '#FFF6F6',
      borderColor: '#FFEEEE',
      hueRotate: 120
    },
    '#c8161d': {
      bg1: '#FCF3F3',
      borderColor: '#FAE8E9',
      hueRotate: 130
    },
    '#eb5c20': {
      bg1: '#FEF7F4',
      borderColor: '#FDEFE9',
      hueRotate: 120
    },
    '#996b3d': {
      bg1: '#FAF7F5',
      borderColor: '#F5F0EC',
      hueRotate: 164
    },
    '#009959': {
      bg1: '#F2FAF7',
      borderColor: '#E6F5EF',
      hueRotate: 230
    },
    '#002fa7': {
      bg1: '#F2F4FB',
      borderColor: '#E6EBF6',
      hueRotate: 740
    },
    '#550080': {
      bg1: '#F6F2F9',
      borderColor: '#EEE6F3',
      hueRotate: 420
    },
  }

  return {

    themeColorObj,
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
      ydInfo: null,
      cardList: [],
      isShowMore: false,
      minCardsCount: 3,
      themeConfig: null,
      currApply: null,
      editInfo: null,

      // 审核弹窗意见组件必传参数
      flowParams: {
        processDefinitionKey: ''
      },
      auditId: null,// 当前正在查看详情的申请 id
      auditForm: {
        comment: {
          taskComment: ''
        },
      },
      auditFormRules: {
        comment: [
          { required: true, message: '请输入撤回原因', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (!value || !value.taskComment) {
                callback(new Error('请输入撤回原因'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ],
      },

      forceUpdateProps: [],
      auditDetailChangeApplyId: null,// 审核详情页的表单数据中的异动申请 id，用于显示变更日志
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

      this.$setComProps('page-runtime_g88gpysj', {
        pageParams: {
          title: "学籍异动申请",
          desc: "",
          bgUrl: this.$getImagePath('/decoration/bg_business.png')
        }
      })

      //console.log('页面js初始化完成后调用')
      this.$request("gsxjydgl_xsd_ckydxz").then(res => {
        if (res.data.code === "0") {
          this.ydInfo = res.data.data

          this.$setComProps('page-runtime_g88gpysj', {
            'pageParams.desc': this.ydInfo.modelData || ''
          });

          this.themeConfig = JSON.parse(localStorage.getItem('themeConfig'))
          // 全局修改样式
          let dom = document.querySelector('.page-body-side')
          // dom.style.background = 'linear-gradient(318deg, ' + this.colorHexToRgb(this.themeColorObj[this.themeConfig.color]?.bg1 || "#F5F5FF", '0.6') + ' 34%, #FFFFFF 98%), #FFFFFF'
          // dom.style.background = 'var(--wis-gradient-color-brand-card)'
          dom.style.background = 'linear-gradient(318deg, var(--wis-base-color-brand-9) 34%, rgb(255, 255, 255) 98%), rgb(255, 255, 255)'
          // 动态设置距离顶部距离
          let yidongTextdom = document.querySelector('.yidong-text')
          let titleBox = document.querySelector('.title-box')
          let resScroll = document.querySelector('.res-scroll')
          let bangongImgBoxDom = document.querySelector('.bangong-img-box')
          // console.log('bangongImgBoxDom ===== ', bangongImgBoxDom)
          // console.log('yidongTextdom ===== ', yidongTextdom.clientHeight, yidongTextdom.scrollHeight, resScroll.scrollHeight)
          // bangongImgBoxDom.style.filter = `hue-rotate(${this.themeColorObj[this.themeConfig.color]?.hueRotate || 360}deg)`
          let tempTop = 0;
          if (yidongTextdom.clientHeight <= 192) {
            tempTop = resScroll.scrollHeight - 640
          } else if (yidongTextdom.clientHeight >= 412) {
            tempTop = resScroll.scrollHeight - yidongTextdom.clientHeight - 400
          } else {
            tempTop = resScroll.scrollHeight - yidongTextdom.clientHeight - 640
          }
          titleBox.style.marginTop = (tempTop < 0) ? 12 : tempTop + 'px'
          this.handleResizeChange()
        }
      })

      // 获取异动申请卡片 
      this.getCardList();

      window.onresize = () => {
        this.handleResizeChange()
      }

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
    showTip() {
      this.handleClickJump(this.globalVars.currApply, false)
    },
    getCardList: function () {
      // 获取异动申请卡片 
      this.$request("gsxjydgl_xsd_xssqyddllb_xsd_cxlb").then(res => {
        if (res.data.code === "0") {
          this.globalVars.cardList = res.data.data.list || []
          if (this.globalVars.cardList.length > this.minCardsCount * 3) {
            this.globalVars.isShowMore = true
          }
        }

        if (this.globalVars.cardList.length === 0) {
          this.$setComProps("empty_3cru0t1e", { hidden: false });
          this.$setComProps("component_w0iwcibp", { hidden: true });
        } else {
          this.$setComProps("empty_3cru0t1e", { hidden: true });
          this.$setComProps("component_w0iwcibp", { hidden: false });
        }

      })
    },
    handleClickJump: function (value, isOpenDialog = true) {
      // 学生申请提示信息 gsxjydgl_xsd_xssqtsxx 
      this.globalVars.currApply = value
      this.misRequest('gsxjydgl_xsd_xssqtsxx', {
        params: { ydlxid: value.id }
      }).then(res => {
        if (res.code === "0") {
          if (!res.data.modelData.ignore || !isOpenDialog) {

            window.$resUserNotice({
              title: '申请提示',
              message: res.data.modelData.applyDesc,
              showCountdown: false,
              countdownNumber: 5,
              confirmButtonText: '确定',
              showConfirmBtn: !isOpenDialog ? false : true,
              showAgreement: !isOpenDialog ? isOpenDialog : res.data.modelData.confirm,
              agreementText: '我已知晓',
              dangerouslyUseHTMLString: true,
              cancelButtonText: '取消',
              showCancelBtn: true,
              // 回调函数
              onClose: () => {
              },
              onConfirm: () => {
                if (isOpenDialog) {
                  const dialogParams = {
                    auditFormPageCode: 'gsxjydgl' + value.dm + 'Form',
                    ydlxid: value.id,
                    sfdsq: '0',
                    showAuditLog: false,
                    onGetFormData: (data, forceUpdateProps) => {
                      if (data.xjsfgx === '1') {
                        this.globalVars.auditDetailChangeApplyId = data.id;// 取得异动申请 id
                        dialog.$setBtnsProp({
                          'o8kb1v7m': { hidden: false },// 显示“查看变更日志”按钮
                        });
                      }

                      this.globalVars.forceUpdateProps = forceUpdateProps;
                    },
                    onFormReady: (formData) => {
                      if (formData.list && formData.list.length > 0) {
                        return true;
                      } else {
                        // 表单里没有字段，关闭当前弹窗，给出提示
                        this.misPage('dialog_okcm5geq').closeWindow();
                        this.$message({
                          message: '请先联系管理人员配置页面',
                          type: 'warning'
                        });
                        return false;
                      }
                    }
                  };
                  this.$setComProps("page-runtime_h4bj7b2s", { pageParams: dialogParams });

                  const dialog = this.$pageDialog({ key: 'dialog_okcm5geq', winParams: { title: value.mc + '申请' } })
                }
              },
              beforeClose: (done) => {
                // 可以在这里执行异步操作，然后调用 done() 关闭对话框
                setTimeout(() => {
                  done()
                }, 100)
              }
            })
          } else { // 跳转申请页面
            const dialogParams = {
              auditFormPageCode: 'gsxjydgl' + value.dm + 'Form',
              ydlxid: value.id,
              sfdsq: '0',
              showAuditLog: false,
              onGetFormData: (data, forceUpdateProps) => {
                if (data.xjsfgx === '1') {
                  this.globalVars.auditDetailChangeApplyId = data.id;// 取得异动申请 id
                  dialog.$setBtnsProp({
                    'o8kb1v7m': { hidden: false },// 显示“查看变更日志”按钮
                  });
                }

                this.globalVars.forceUpdateProps = forceUpdateProps;
              },
              onFormReady: (formData) => {
                if (formData.list && formData.list.length > 0) {
                  return true;
                } else {
                  // 表单里没有字段，关闭当前弹窗，给出提示
                  this.misPage('dialog_okcm5geq').closeWindow();
                  this.$message({
                    message: '请先联系管理人员配置页面',
                    type: 'warning'
                  });
                  return false;
                }
              }
            };
            this.$setComProps("page-runtime_h4bj7b2s", { pageParams: dialogParams });

            const dialog = this.$pageDialog({ key: 'dialog_okcm5geq', winParams: { title: value.mc + '申请' } })
          }
        }
      })
    },
    openYDInfoDialog: function (event) {
      this.globalVars.auditId = event.row.id;


      this.misRequest('gsxjydgl_cxdtsqxx', {
        params: {
          id: event.row.id
        }
      }).then(res => {
        if (res.code == '0') {
          this.globalVars.editInfo = res.data.modelData
        }
      });

      let dialogParams = null;
      if (event.row.approvalStatus === '0') {
        // 草稿
        dialogParams = {
          auditFormPageCode: 'gsxjydgl' + event.row.ydlxdm + 'Form',
          ydlxid: event.row.ydlxid,
          sfdsq: '0',
          formId: event.row.id,
          showAuditLog: false,
          onGetFormData: (data, forceUpdateProps) => {
            // 当前用户才可以操作
            if (data.createBy !== this.$getUserInfo().userId) {
              dialog.$setBtnsProp({
                "save_kzdec6kp": {
                  hidden: true
                },
                "del_n20lybtc": {
                  hidden: true
                },
                "confirm_ragg6gq9": {
                  hidden: true
                },
              });
            }

            this.globalVars.forceUpdateProps = forceUpdateProps;
          }
        };
      } else {
        // 非草稿
        dialogParams = {
          auditFormPageCode: 'gsxjydgl' + event.row.ydlxdm + 'Form',
          id: event.row.id,
          showAuditLog: true,
          formReadonly: event.row.approvalStatus !== '0' && event.row.approvalStatus !== '-1',
          processInstanceId: event.row.procInstId,
          onGetFormData: (data, forceUpdateProps, setFromReadonly) => {
            if (data.xjsfgx === '1') {
              this.globalVars.auditDetailChangeApplyId = data.id;// 取得异动申请 id
              dialog.$setBtnsProp({
                'tho7onmq': { hidden: false },// 显示“查看变更日志”按钮
              });
            }

            if (data.flowLongColumn.canWithdraw === 1) {
              this.globalVars.flowParams.processDefinitionKey = data.procDefKey || '';

              // 显示撤回按钮
              dialog.$setBtnsProp({
                "xey5k8qg": {
                  hidden: false
                }
              });
            }

            // 当前用户才可以操作
            if (data.createBy !== this.$getUserInfo().userId) {
              dialog.$setBtnsProp({
                "save_kzdec6kp": {
                  hidden: true
                },
                "del_n20lybtc": {
                  hidden: true
                },
                "confirm_ragg6gq9": {
                  hidden: true
                },
              });

              setFromReadonly();
            }

            this.globalVars.forceUpdateProps = forceUpdateProps;
          }
        };
      }

      this.$setComProps("page-runtime_ek15cdrz", { pageParams: dialogParams });

      const dialog = this.$pageDialog({
        key: "dialog_uy09o7xc",
        params: {},
        winParams: {
          title: '详情'
        }
      });
      dialog.$setBtnsProp({
        "save_kzdec6kp": {
          hidden: event.row.approvalStatus !== '0' && event.row.approvalStatus !== '-1'
        },
        "del_n20lybtc": {
          hidden: event.row.approvalStatus !== '0' && event.row.approvalStatus !== '-1'
        },
        "confirm_ragg6gq9": {
          hidden: event.row.approvalStatus !== '0' && event.row.approvalStatus !== '-1'
        },
      });

      // 查询是否需要展示“打印”按钮
      this.misRequest('gsxjydgl_xsxqxsydbb', {
        params: {
          id: event.row.id
        }
      }).then(res => {
        if (res.code === '0' && res.data.modelData) {
          dialog.$setBtnsProp({
            "ppp2u2df": {
              hidden: false
            },
          });
        }
      });
    },
    changeShowMoreCard: function () {
      this.globalVars.isShowMore = !this.globalVars.isShowMore;
    },
    handleResizeChange: function () {
      // 获取卡片盒子宽度
      let cardsDom = document.querySelector('.card-list-wrapper');
      if (!cardsDom) {
        return;
      }
      // 3个卡片最小宽度 calc(33.3% - 10px)
      // 4个卡片最小宽度 1072 calc(25% - 12px)
      // 5个卡片最小宽度 1360 calc(20% - 20px)
      if (cardsDom.clientWidth > 1360) {
        this.globalVars.minCardsCount = 5;
      } else if (cardsDom.clientWidth > 1072 && cardsDom.clientWidth < 1360) {
        this.globalVars.minCardsCount = 4;
      } else {
        this.globalVars.minCardsCount = 3;
      }

      //  console.log('cardsDom.clientWidth ==== ', cardsDom.clientWidth, this.globalVars.minCardsCount)
    },
    // 16进制转化rgb
    colorHexToRgb: function (hexStr, opacity) {
      if (!hexStr) {
        return;
      }
      //rgb颜色值的正则表达式
      const reg = /^(rgba|rgb|RGBA|RGB)\([\s]*[0-9]+[\s]*,[\s]*[0-9]+[\s]*,[\s]*[0-9]+[\s]*(,[\s]*[0-9.]+[\s]*)*\)$/;
      if (reg.test(hexStr)) {
        return hexStr;
      } else {
        hexStr = hexStr.toLowerCase()
        if (hexStr.length === 4) {
          letcolorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            conststr = hexStr.slice(i, i + 1);
            colorNew += str + str;
          }
          hexStr = colorNew;
        }
        const rgbArray = [];
        for (let i = 1; i < hexStr.length; i += 2) {
          if (i < 7) {
            rgbArray.push(parseInt("0x" + hexStr.slice(i, i + 2)));
          }
          if (i >= 7 && opacity) {
            conststr = hexStr.slice(i, i + 2);
            rgbArray.push(/^[a-f0-9]{2}$/.test(str) ? parseInt(`0x${str}`) / 255 : (Number(str) / 100).toString())
          }
        }

        return opacity ?
          ("rgba(" + rgbArray.join(",") + ',' + opacity + ")") :
          ("rgb(" + rgbArray.join(",") + ")")
      }
    },

    /**
     * 描述：获取表单并保存
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

     */
    action_ev_80c3azk9: function (event, closeNext) {
      this.saveForm(event, closeNext, '1', 'page-runtime_ek15cdrz');
    },
    /**
     * 描述：保存
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

     */
    action_ev_8k74jj29: function (event, closeNext) {
      this.saveForm(event, closeNext, '0', 'page-runtime_ek15cdrz');
    },
    saveForm: async function (event, closeNext, submit, applyPageComKey) {
      const formValue = await this.misPage(applyPageComKey).validateForm();
      if (formValue === false) {
        // 校验失败
      } else {
        var ydlxid = this.globalVars.editInfo ? this.globalVars.editInfo.ydlxid : this.globalVars.currApply?.id;
        delete formValue.id;
        this.misRequest('gsxjydgl_flowsubmit_gsstudentchangeflowbo', {
          params: {
            ...formValue,
            ydlxid: ydlxid,
            sftj: submit,
            sqlx: '1',
            id: this.globalVars.auditId,
            forceUpdateProps: this.globalVars.forceUpdateProps.join(',')
          }
        }).then(res => {
          if (res.code === "0") {
            // 刷新table列表
            this.$page('adv-table_2rrrrjjj')?.reloadData()
            this.getCardList();
            closeNext();
          }
        })
      }
    },
    /**
     * 描述：删除
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

     */
    action_ev_enslol61: function (event, closeNext) {
      var self = this;
      this.$resConfirm('', "确定删除该申请信息吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then((res) => {
        this.misRequest('gsxjydgl_xsd_xssqsc', {
          params: {
            id: this.globalVars.editInfo.id
          }

        }).then(res => {
          if (res.code === '0') {
            this.misPage('dialog_uy09o7xc').closeWindow();
            this.$page('adv-table_2rrrrjjj')?.reloadData()
            this.getCardList();
          }
        });
      });
    },
    /**
     * 描述：详情抽屉撤回
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_s1oqs9oa: function (event, closeNext) {
      var self = this;

      const dialog = this.$pageDialog({ key: 'dialog_vrg7rz68', winParams: {} })
    },
    /**
     * 描述：关闭
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_yg7mtuxg: function (event, closeNext) {
      this.misPage('dialog_uy09o7xc').closeWindow();
    },
    /**
     * 描述：审核详情弹窗“查看变更日志”按钮点击事件
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_xaol4ib3: function (event, closeNext) {
      var self = this;
      this.$openPage(
        {
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
    },

    /**
     * 描述：审核详情弹窗销毁
     * @param{event}  name:事件名称,dialog:当前弹窗对象 return:
     */
    destroy_dialog_1fsjebtq: function (event) {
      var self = this;
      this.globalVars.editInfo = null;
      this.globalVars.auditDetailChangeApplyId = null;
      this.globalVars.auditId = null;
      this.globalVars.flowParams.processDefinitionKey = '';
      this.globalVars.forceUpdateProps = [];
    },

    /**
     * 描述：申请弹窗销毁
     * @param{event}  name:事件名称,dialog:当前弹窗对象 return:

     */
    destroy_dialog_pm6iw6jn: function (event) {
      var self = this;
      this.globalVars.auditDetailChangeApplyId = null;
      this.globalVars.forceUpdateProps = [];
    },


    /**
     * 描述：申请弹窗“查看变更日志”按钮点击事件
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:

     */
    action_ev_schc13lh: function (event, closeNext) {
      var self = this;
      this.$openPage(
        {
          appCode: 'gsxjxxgl',
          pageCode: 'infoChangeLog',
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
    },
    /**
     * 描述：申请表单保存
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_te45nthg: function (event, closeNext) {
      var self = this;
      this.saveForm(event, closeNext, '0', 'page-runtime_h4bj7b2s');
    },
    /**
     * 描述：申请弹窗提交
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_gtzeupy8: function (event, closeNext) {
      var self = this;
      this.saveForm(event, closeNext, '1', 'page-runtime_h4bj7b2s');
    },
    /**
     * 描述：撤回弹窗确认按钮点击事件
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_cym9wyl5: function (event, closeNext) {
      var self = this;
      this.misPage('component_5sshtnue').$refs['auditForm'].validate((valid) => {
        if (valid) {
          self.$setComProps("confirm_5ke9krwc", {
            loading: true
          });

          const querySetting = [
            {
              builder: "m_value_equal",
              linkOpt: "and",
              name: "id",
              value: this.globalVars.auditId
            }
          ];

          self.misRequest('gsxjydgl_flow_gsstudentchangeflowbo', {
            params: {
              ddlModel: {
                querySetting: querySetting,
                params: {
                  btnType: 'withdraw',
                  commentContent: this.globalVars.auditForm.comment.taskComment
                }
              }
            }
          }).then(res => {
            // 确定按钮取消 loading
            self.$setComProps("confirm_5ke9krwc", {
              loading: false
            });
            if (res.code === '0') {
              // 关闭弹窗
              closeNext();
              // 关闭抽屉
              this.misPage('dialog_uy09o7xc').closeWindow();
              // 刷新列表
              this.$page('adv-table_2rrrrjjj')?.reloadData();
              this.getCardList();
            }
          });
        }
      });
    },
    /**
     * 描述：撤回弹窗销毁
     * @param{event}  name:事件名称,dialog:当前弹窗对象 return:
     */
    destroy_dialog_iajnjtln: function (event) {
      var self = this;
      this.globalVars.auditForm.comment.taskComment = '';
    },
    /**
     * 描述：打印
     * @param{event}  事件相关参数 return:
     * @param{closeNext}  需要调用该方法才能关闭弹窗 return:
     */
    action_ev_rzpz94ir: function (event, closeNext) {
      this.misRequest('gsxjydgl_dyydbb', {
        params: {
          params: {
            ids: this.globalVars.auditId,
            type: '1'
          },
        },
        misRequestParams: {
          errorTitle: this.$LANG('打印失败')
        }
      }).then(res => {
        if (res.code === '0') {
          window.open(res.data.modelData, '_blank');
        }
      });
    },
  }
})