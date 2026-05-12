define(function (require) {
  
  return {
    
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {
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
    },
    /**
     * 页面被重新激活时调用
     */
    pageActivated: function () {
    },
    /**
     * 页面失去激活被缓存时调用
     */
    pageDeactivated: function () {
    },
    /**
     * 固定方法，页面js初始化完成后调用,当前能修改js变量，修改组件初始化属性或者设置组件默认值
     */
    pageCreated: function () {
      console.log('页面js初始化完成后调用')

    },
    /**
     * 固定方法，页面准备完成后调用，当前可以操作组件属性，调用未隐藏组件实例方法
     */
    pageReady: function () {
    },
    /**
     * 固定方法，页面销毁前调用
     */
    pageDestroy: function () {
    },
    /**
     * 描述：tab切换事件
     * @param{event}  内部参数，$com:当前组件,evName:事件名称,evArgs:事件参数(数组) return:

     */
    tabBasicTabs_change: function (event) {
      var self = this;
      // console.log('当前选中tab key',event.evArgs[0].name);
    },
  }
})
