define(function (require) {
  return {
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {
      'globalVars.activeStep': {
        handler(v) {
          this.$setComsProps({
            // 处理按钮显隐
            'stepFormBtns': {
              'buttonList.0.hidden': this.globalVars.options.tabs[v]?.props.hideSaveBtn || false, // 保存
              'buttonList.1.hidden': v === 0, // 上一步
              'buttonList.2.hidden': v === this.globalVars.options.tabs.length - 1, // 下一步
              'buttonList.3.hidden': v !== this.globalVars.options.tabs.length - 1, // 提交
            }
          })
        },
        immediate: true
      },
      'pageParams': {
        handler(v) {
          if (v?.tabs) {
            this.globalVars.options.tabs = [...JSON.parse(v.tabs)]
            this.globalVars.options.appCode = v.appCode
            this.globalVars.options.disableTabClick = v.disableTabClick === "true" ? true : false
            this.globalVars.options.loadAllTabs = v.loadAllTabs === "true" ? true : false
            this.globalVars.relatedParams.relatedFields = { ...JSON.parse(v.relatedFields) }
            this.globalVars.activeStep = v.activeStep ? v.activeStep : 0;
          }

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
      activeStep: '',
      tabVm: null,
      tabItems: {},
      relatedParams: {
        relatedFields: {}
      },
      key: Math.random().toString(36).slice(-8),
      options: {
        isShowTabNumber: true,
        isShowTabIndicator: false,
        disableTabClick: true,
        loadAllTabs: false,
        appCode: '',
        pageCode: '',
        tabs:
          [
           
          ],
      },
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
    handleTabChange: function (index) {
      console.log('Tab changed to:', index)
      this.globalVars.activeStep = index
      this.globalVars.key = Math.random().toString(36).slice(-8)
    },
    handleBeforeTabChange: function () { },
    handlePublish: function () {
      //获取当前tab 下面的内容
      console.log('===========', this.$refs['defaultComponentRef1'].widgetForm())
    },
    setCurrentTab(e) {
      this.globalVars.tabItems = e.target
    },
    /**
     * 描述：下一步
     */
    stepFormBtnsNext_click: function () {
      var self = this;
      this.showLoading(true);
      var activeStep = this.globalVars.activeStep
      var nextTab = activeStep + 1
      //先保存
      //如果是表单设计器和流程设计器的话，则不需要保存，判断页面是否已保存了即可
      let currentTabData = this.globalVars.options.tabs.filter((item, index) => index == activeStep)[0]
      if (currentTabData.props.type == 'page') {
        const formConfig = this.globalVars.tabItems?.$refs[`pageMaking${currentTabData.props.pageCode}`]
        if (formConfig?.page?.save) {
          const saveMethod = formConfig.page.save.bind(formConfig.page)
          try {
            saveMethod().then(res => {
              this.globalVars.relatedParams.relatedFields = {
                ...this.globalVars.relatedParams.relatedFields,
                ...res
              }
              if (res.formPageId && this.globalVars.options.tabs.filter(item => item.props.type == 'formMaking').length > 0) {
                this.globalVars.options.tabs.map(item => {
                  if (item.props.type == 'formMaking') {
                    item.props.pageId = this.globalVars.options.appCode + '-' + res.formPageId
                  }
                  if (item.props.type == 'process') {
                    item.props.pageId = res.flowPageId
                    item.props.flowPageId = res.flowPageId
                    item.props.modelCode = res.modelCode
                  }
                  return item
                })
              }
              this.afterStepNext(nextTab)
            }).catch(error => {
              console.error('保存失败:', error)
              this.showLoading(false)
            })
          } catch (a) {
            console.error('保存失败:', a)
            this.showLoading(false)
          }

        } else {
          this.afterStepNext(nextTab)
        }

      } else if (currentTabData.props.type == 'process') {
        const $vm = this.globalVars.tabItems?.$refs['flowDesigner']
        //流程设计器
        const isSaved = $vm?.isDataSaved ? $vm?.isDataSaved() : true
        if (!isSaved) {
          //二次确认
          $vm.handleSave().then(res => {
            this.afterStepNext(nextTab)
          })
        } else {
          this.afterStepNext(nextTab)
        }
      } else if (currentTabData.props.type == 'formMaking') {
        //表单设计器
        const $vm = this.globalVars.tabItems?.$refs['FormMaking'].$refs['umd-loader']
        const isSaved = $vm?.isDataSaved ? $vm?.isDataSaved() : true
        if (!isSaved) {
          $vm.handleSave().then(res => {
            this.afterStepNext(nextTab)
          })
        } else {
          this.afterStepNext(nextTab)
        }

      } else {
        this.afterStepNext(nextTab)

      }
    },
    //点击下一步完成后的步骤
    afterStepNext: function (nextTab) {
      this.globalVars.tabVm.switchTab(nextTab)
      this.$emit('submitAfter', nextTab - 1, this.globalVars.relatedParams.relatedFields)
      this.globalVars.key = Math.random().toString(36).slice(-8)
      this.showLoading(false)
    },
    /**
     * 描述：上一步
     */
    stepFormBtnsBack_click: function () {
      var self = this;
      var activeTab = this.globalVars.activeStep - 1
      this.globalVars.tabVm.switchTab(activeTab)
      this.globalVars.key = Math.random().toString(36).slice(-8)
    },
    /**
     * 描述：完成
     * @param{event}  {btn}:点击的按钮; return:

     */
    stepFormBtnsSubmit_click: function (event) {
      var self = this;
      this.showLoading(true)
      var activeTab = this.globalVars.activeStep
      var currentTabData = this.globalVars.options.tabs.filter((item, index) => index == activeTab)[0]
      if (currentTabData.props.type == 'page') {
        const pageConfig = this.globalVars.tabItems?.$refs[`pageMaking${currentTabData.props.pageCode}`]
        if (pageConfig?.page?.save) {
          const saveMethod = pageConfig.page.save.bind(pageConfig.page)
          saveMethod().then(res => {
            this.globalVars.relatedParams.relatedFields = {
              ...this.globalVars.relatedParams.relatedFields,
              ...res
            }
            this.$emit('submitAfter', activeTab, self.globalVars.relatedParams.relatedFields)
            this.$emit("completed")

            this.showLoading(false)
          }).catch(error => {
            console.error('保存失败:', error)
            this.showLoading(false)
          })
        } else {
          this.$emit('submitAfter', activeTab, self.globalVars.relatedParams.relatedFields)
          this.$emit("completed")
          this.showLoading(false)
        }
      } else if (currentTabData.props.type == 'process') {
        const $vm = this.globalVars.tabItems?.$refs['flowDesigner']
        //流程设计器
        const isSaved = $vm?.isDataSaved ? $vm?.isDataSaved() : true
        if (!isSaved) {
          //二次确认
          $vm.handleSave().then(() => {
            this.$emit('submitAfter', activeTab, self.globalVars.relatedParams.relatedFields)
            this.$emit("completed")
            this.showLoading(false)
          })
        } else {
          this.$emit('submitAfter', activeTab, self.globalVars.relatedParams.relatedFields)
          this.$emit("completed")
          this.showLoading(false)

        }

      } else if (currentTabData.props.type == 'formMaking') {
        //表单设计器
        const $vm = this.globalVars.tabItems?.$refs['FormMaking'].$refs['umd-loader']
        const isSaved = $vm?.isDataSaved ? $vm?.isDataSaved() : true
        if (!isSaved) {
          $vm.handleSave().then(() => {
            this.$emit('submitAfter', activeTab, self.globalVars.relatedParams.relatedFields)
            this.$emit("completed")
            this.showLoading(false)
          })
        } else {
          this.$emit('submitAfter', activeTab, self.globalVars.relatedParams.relatedFields)
          this.$emit("completed")
          this.showLoading(false)
        }
      }
    },
    /**
     * 表单设计器和流程设计器点击下一步的时候要判断是否有更新要保存
     */
    // handleDataUnsaved: function (data) {
    //   console.log("=====handleDataUnsaved====", data)
    // }


    /**
     * 描述：保存
     * @param{event}  {btn}:点击的按钮; return:

     */
    stepFormBtnsSave_click: function (event) {
      var self = this;
      //按钮设置loading
      this.setBtnLoading(event.btn,true)
     // this.showLoading(true)
      var activeStep = this.globalVars.activeStep
      // var nextTab = activeStep + 1
      //先保存
      let currentTabData = this.globalVars.options.tabs.filter((item, index) => index == activeStep)[0]
      if (currentTabData.props.type == 'page') {
        const formConfig = this.globalVars.tabItems?.$refs[`pageMaking${currentTabData.props.pageCode}`]
        if (formConfig?.page?.save) {
          const saveMethod = formConfig.page.save.bind(formConfig.page)
          try {
            saveMethod().then(res => {
              this.globalVars.relatedParams.relatedFields = {
                ...this.globalVars.relatedParams.relatedFields,
                ...res
              }
            
              this.$emit('saveAfter', activeStep, this.globalVars.relatedParams.relatedFields)
              this.setBtnLoading(event.btn,false)
             // this.showLoading(false)

            }).catch(error => {
             // this.showLoading(false)
              this.setBtnLoading(event.btn,false)

            })
          } catch (a) {
           // this.showLoading(false)
             this.setBtnLoading(event.btn,false)
          }
        } else {
          this.$message.error("当前页面没有保存方法！")
          // this.showLoading(false)
           this.setBtnLoading(event.btn,false)
        }

      } else if (currentTabData.props.type == 'process') {

        this.$emit('saveAfter', activeStep, this.globalVars.relatedParams.relatedFields)
        const $vm = this.globalVars.tabItems?.$refs['flowDesigner']
        //流程设计器
        $vm?.handleSave && $vm?.handleSave()
        this.setBtnLoading(event.btn,false)
        //this.showLoading(false)
      } else if (currentTabData.props.type == 'formMaking') {
        //表单设计器
        const $vm = this.globalVars.tabItems?.$refs['FormMaking'].$refs['umd-loader']
        $vm?.handleSave && $vm?.handleSave().then(resList => {
          this.$emit('saveAfter', activeStep, this.globalVars.relatedParams.relatedFields)
          this.setBtnLoading(event.btn,false)
          // this.showLoading(false)
        }).catch((err) => {
          this.setBtnLoading(event.btn,false)
          // this.showLoading(false)
        })

      }

    },
    showLoading: function (isShow) {
      // this.pageLoading = {
      //   show: isShow,
      //   text: "加载中",
      //   spinner: "el-icon-loading",
      //   background: "255, 255, 255, 0.5",
      // }
    },
    setBtnLoading:function(btn,flag){
      this.$set(btn,'loading',flag)
    }
  }
})