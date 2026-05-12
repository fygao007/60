define(function (require) {
  return {
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageWatch: {},
    /**
     * 监听指定对象的值发生变化，然后执行特定方法
     */
    pageComputed: {},
    /**
     * 响应式变量
     */
    globalVars: {
      treeData: [],
      currentData: {
        currentSelectedNd: '',
        currentSelectedId: ''
      },
      importBtnPermission: false,
      currentSelectedIdChain: [],
    },
    /**
     * 页面被重新激活时调用
     */
    pageActivated: function () { },
    /**
     * 页面失去激活被缓存时调用
     */
    pageDeactivated: function () { },
    /**
     * 固定方法，页面 js 初始化完成后调用
     */
    pageCreated: function () { 
      this.globalVars.importBtnPermission = !this.$unPermission('importBtn');
    },
    /**
     * 固定方法，页面准备完成后调用
     */
    pageReady: function () {
      this._refreshTree();
    },
    /**
     * 固定方法，页面销毁前调用
     */
    pageDestroy: function () { },
    /**
     * 构建树结构
     * @param {Array} list - 后端返回的导入记录列表
     * @returns {Array} 树形结构数据
     */
    _buildTreeData: function (list) {
      const treeMap = {};
      const treeData = [];

      // 按年度分组
      list.forEach(item => {
        const nd = item.nd || '';
        if (!treeMap[nd]) {
          treeMap[nd] = {
            id: nd,
            mc: nd,
            nd: nd,
            level: '1',
            zt: '',
            isLeaf: false,
            children: []
          };
        }

        // 计算年度状态：有一个部分完成则部分完成
        const ndNode = treeMap[nd];
        if (item.zt === '1' && !ndNode.zt) {
          ndNode.zt = '1';
        } else if (item.zt === '2') {
          ndNode.zt = '2';
        } else if (item.zt === '3' && !ndNode.zt) {
          ndNode.zt = '3';
        }

        // 添加子节点
        ndNode.children.push({
          id: item.id,
          mc: item.mc,
          nd: item.nd,
          level: '2',
          zt: item.zt,
          isLeaf: true
        });
      });

      // 转换为数组
      Object.keys(treeMap).forEach(key => {
        treeData.push(treeMap[key]);
      });

      // 按年度倒序排序
      treeData.sort((a, b) => {
        return b.nd - a.nd;
      });

      return treeData;
    },
    /**
     * 刷新树
     */
    _refreshTree: function () {
      const self = this;
      const querySetting = self.$page('fuzzy-search_6eev9nri') ? self.$page('fuzzy-search_6eev9nri').getValue() : [];
      self.misRequest('eaxsrxgl_cxndlst', {
        querySetting: querySetting
      }).then(res => {
        if (res.code === '0') {
          const list = res.data.list || [];
          const treeData = self._buildTreeData(list);
          self.globalVars.treeData = treeData;

          if (treeData.length !== 0) {

            self.$setHide({ "row_cmzohg37": false })
            self.$setHide({ "row_6fv9m1nh": true })
            self.globalVars.treeData = treeData;
            let currentId = self.globalVars.currentData.currentSelectedId || self.globalVars.currentData.currentSelectedNd;
            let flag = true;
            list.forEach(item => {
              if(currentId == item.id || currentId == item.nd) {
                flag = false;
              }
            })
            if(flag) {
              currentId = treeData[0].id;
            }
            self.$nextTick(() => {
              if (treeData.length > 0) {
                self._selectAndExpandTreeNode(currentId);
              }
            });
          } else {
            self.$setHide({ "row_cmzohg37": true })
            self.$setHide({ "row_6fv9m1nh": false })
          }
        }
      });
    },
    /**
     * 树节点加载事件
     */
    _onTreeLoad: function (node, resolve) {
      // 前端构建树，不需要懒加载
      resolve([]);
    },
    /**
     * 树选中节点改变事件
     */
    _onTreeCurrentChange: function (data, node) {
      const self = this;
      const currentSelectedIdChain = [];

      function collectId(n) {
        if (n.parent) {
          collectId(n.parent);
        }
        if (n.level !== 0) {
          currentSelectedIdChain.push(n.data.id);
        }
      }

      collectId(node);
      self.globalVars.currentSelectedIdChain = currentSelectedIdChain;

      const currentTreeNodeData = node.data;

      if (currentTreeNodeData.level === '1') {
        self.globalVars.currentData = {
          currentSelectedNd: currentTreeNodeData.nd,
          currentSelectedId: ''
        }
      } else if (currentTreeNodeData.level === '2') {

        self.globalVars.currentData = {
          currentSelectedNd: '',
          currentSelectedId:  currentTreeNodeData.id
        }
      }

      self.$comMethod("page-runtime_gvfqf7he","initData",self.globalVars.currentData)

      // 选中节点后更新右侧 page-runtime 参数（通过 globalVars 绑定自动传递）
    },
    /**
     * 选中并展开指定树节点
     */
    _selectAndExpandTreeNode: function (nodeId) {
      const self = this;
      self.$nextTick(() => {
        const treeRef = self.$page('component_efo2xyba');
        if (treeRef && treeRef.$refs && treeRef.$refs['tree']) {
          const tree = treeRef.$refs['tree'];
          const node = tree.getNode(nodeId);
          if (node) {
            tree.setCurrentKey(nodeId);
            node.expand();
            node.parent?.expand();
            // 触发参数传递
            self._onTreeCurrentChange(node.data, node);
          }
        }
      });
    },
    /**
     * 新生导入按钮点击事件
     */
    _onImportStudent: function () {
      const self = this;
      const childPage = self.misPage('page-runtime_gvfqf7he');
      if (childPage) {
        childPage.importBtn_click();
      }
    },
    /**
     * 搜索事件
     */
    adv_search_xsdrss_search: function () {
      this._refreshTree();
    }
  }
})
