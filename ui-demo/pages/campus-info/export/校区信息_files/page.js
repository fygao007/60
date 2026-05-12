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
      formId: 'singleFormForm'
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
     * 描述：表单结构初始化后根据id获取数据并设置表单回显
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:
     */
    singleFormForm_afterInit: function (event) {
        this.misRequest("singleFormFetch",{"params":{"field":"modelData"}}).then((res) => {
          console.log("表单默认数据", res)
          // 表单赋值
          if (res) {
            this.$setVal(this.globalVars.formId, res.data)
          }
        })
    },

    /**
     * 描述：保存
     * @param{event}  {btn}:点击的按钮; return:
     */
    singleFormBtnsSave_click: function (event) {
      if (!this.misPage(this.globalVars.formId)) return
      this.misPage(this.globalVars.formId).validateFormValue().then((value) => {
        // value:校验不通过为false,通过为表单值
        if (value) {
          console.log("入参：", value)
          var params = { ...value };
          params.forceUpdateProps = this.getFormUnRequiredFields(this.globalVars.formId).join(",");
          this.misRequest("singleFormSave", { params: params }).then((data) => {
            console.log("出参：", data);
            if (data.code === '0') { // 业务判断成功
              this.$message.success('保存成功')
            }
          }).catch((e) => {
            console.log(e)
          });
        }
      })
    },
  }
})
