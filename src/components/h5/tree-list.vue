<template>
  <div class="recoveryPage" v-show="showPage">
    <div class="g-content">
      <div class="u-title fBg bdBom">
        <span class="c65">树结构: {{Total}}</span>
      </div>
      <div class="tree-main">
        <ul class="tree-wrap">
          <tree-item v-for="(model,i) in treeDataSource" :root="0" :num="i" :nodes="treeDataSource.length" @openParentObj="openParentObj" @openExpand="openExpand" @openDelAction="openDelAction" :model.sync="model" :key="'root_'+i"></tree-item>
        </ul>
      </div>
      <!-- 没有数据时 -->
      <div class="noData" v-if="list && !list.length && !busy">
        <!-- <img src="../../assets/image/noTask.png"> -->
        <p>暂无数据</p>
      </div>
      <div class="loading" v-show="busy">
        <span class="c65">加载中...</span>
      </div>
    </div>
  </div>
</template>

<script>
import treeItem from './tree'
export default {
  props: {
    list: Array
  },
  data() {
    return {
      showPage: false,
      busy: false,
      flag: false, // 上拉加载开关
      DataIsover: true,
      showAction: false,
      showParentAction: false, // 原上级团队
      ParentObjects: [],
      actionData: { // 记录sheet
        ObjectName: '',
        item: null,
        index: 0
      },
      // 分页对象
      pages: {
        sortType: 1, // 1新到旧；2旧到新
        pageIndex: 1,
        pageSize: 10
      },
      treeDataSource: [],
      Total: 0,
      showConfirm: false // 显示弹框确认
    }
  },
  computed: {},
  components: {
    treeItem
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList(flag = false) {
      this.list.forEach((item) => {
        item.isExpand = false
        item.children = []
      })
      this.initTreeData()
    },
    // 处理滚动加载
    loadMore() {
      if (this.flag) {
        this.busy = true
        this.pages.pageIndex++
        this.getList(true)
      } else {
        return false
      }
    },
    initTreeData() {
      console.log('处理前：', this.list)
      // // 临时储存数据
      // let tempData = JSON.parse(JSON.stringify(this.list))
      // let reduceDataFunc = (data, level, parentObjectGuid) => {
      //   data.map((m, i) => {
      //     m.isExpand = m.isExpand || false
      //     m.children = m.children || []
      //     m.level = level
      //     m.pObjectGuid = parentObjectGuid // 用与子级父级之间的关联
      //     m.ParentName = m.ParentName || '无'
      //     if (m.children.length > 0) {
      //       reduceDataFunc(m.children, level + 1, m.ObjectGuid)
      //     }
      //   })
      // }
      // reduceDataFunc(tempData, 1, '000-000')
      // console.log(tempData)
      // this.treeDataSource = tempData
    },
    async openExpand(m) {
      if (!m.isExpand) {
        const parames = {
          sortType: this.pages.sortType,
          objectTypeId: m.ObjectTypeId,
          objectId: m.ObjectId
        }
        m.isExpand = !m.isExpand
        // 获取子节点数据
        const rs = await this.GetRecycleTreeChildList(parames)
        if (rs.Code === 0) {
          // 默认先将历史数据改变展开状态
          this.changeExpand(m, this.list, m.isExpand)
          rs.Data.forEach((item) => {
            item.isExpand = false
          })
          // 改变完后，将子数据添加到对应的父级节点
          this.setChildren(m, this.list, rs.Data)
        }
      } else {
        m.isExpand = !m.isExpand
        this.changeExpand(m, this.list, m.isExpand)
      }
      this.initTreeData()
    },
    // 先改变父级的状态
    changeExpand(m, data, isExpand) {
      let vm = this
      if (data && data.length > 0) {
        data.map(item => {
          item.ObjectGuid === m.ObjectGuid ? item.isExpand = isExpand : vm.changeExpand(m, item.children, isExpand)
        })
      }
    },
    // 更新整个list对象
    setChildren(m, data, childNode) {
      let vm = this
      if (data && data.length > 0) {
        data.map(item => {
          item.ObjectGuid === m.ObjectGuid ? item.children = childNode : vm.setChildren(m, item.children, childNode)
        })
      }
    },
    openDelAction(item) {
      this.showAction = true
      this.actionData.ObjectName = item.ObjectName
      this.actionData.item = item
    },
    async toDelete() {
      let rs
      let data = {
        deleteStatus: 3 // 彻底删除
      }
      if (this.actionData.item.ObjectTypeId === 2) { // 项目
        data.projectGuid = this.actionData.item.ObjectGuid
        rs = await this.DeleteProj(data)
      } else { // 部门
        let teamObj = {
          TeamId: 0,
          ObjectGuid: this.actionData.item.ObjectGuid
        }
        rs = await this.ShiftDeleteOrganization(teamObj)
      }
      // if (Utility.dealCode(rs)) return
      // if (rs.Code === 0) {
      //   Utility.ShowToast('删除成功', 'success')
      //   this.removeNode(this.treeDataSource, this.actionData.item.ObjectGuid)
      // } else {
      //   Utility.ShowToast(rs.Message, 'warning')
      // }
    },
    // 移除对象
    removeNode(data, removeId) {
      let vm = this
      data.map((item, i) => {
        if (item.ObjectGuid === removeId) {
          let pObjectGuid = item.pObjectGuid
          data.splice(i, 1) // 先删除
          if (item.level === 1) {
            vm.Total--
          } else {
            // 如果不是第一级，要去找他父级是否还有孩子，没有去掉展开按钮
            console.log('改变父级状态')
            this.changeHasChild(pObjectGuid)
          }
        } else {
          vm.removeNode(item.children, removeId)
        }
      })
    },
    changeHasChild(pObjectGuid) {
      let reduceDataFunc = (data) => {
        data.map((m) => {
          if (m.ObjectGuid === pObjectGuid) {
            m.HasChild = m.children.length > 0
          } else {
            m.children.length > 0 && reduceDataFunc(m.children)
          }
        })
      }
      reduceDataFunc(this.treeDataSource)
    },
    clickAction(key) {
      if (key === 1) {
        this.$router.push({
          name: '还原团队',
          query: {
            type: this.actionData.item.ObjectTypeId,
            guid: this.actionData.item.ObjectGuid,
            name: this.actionData.item.ObjectName
          }
        })
      } else {
        this.showConfirm = true // 弹框确认
      }
    },
    // 打开原上级团队
    openParentObj(m) {
      let vm = this
      let arr = []
      m.ParentObjects.map(item => { arr.push({ label: item.ObjectName, type: 'info' }) })
      vm.ParentObjects = arr
      this.showParentAction = true
    },
    listSort(form) {
      this.pages.sortType = form.sortType
      this.getList()
    }
  }
}
</script>

<style lang="less">
.recoveryPage {
    .i-filter {
        font-size: 0.28rem;
        position: absolute;
        right: 0.32rem;
    }
}

.u-title {
    border-bottom: 1px solid #e8e8e8;
}

.tree-wrap {
    > li {
        margin-bottom: 0.05rem;
        padding-bottom: 0.15rem;
    }
    li {
        min-height: 1.62rem;
        box-sizing: border-box;
        background: #fff;
        padding: 0.32rem 0.32rem 0 0;
        position: relative;
        height: auto;
    }
    &:last-child {
        padding-bottom: 0;
    }
    .box {
        display: block;
        padding-left: 0.54rem;
        box-shadow: none;
        li {
            &.node:not(:last-child) {
                .line {
                    content: '';
                    display: block;
                    background-color: #ddd;
                    position: absolute;
                    width: 1px;
                    height: 1.63rem;
                    left: -0.273rem;
                    top: 0.8rem;
                }
            }
            &::before,
            &::after {
                content: '';
                display: block;
                background-color: #ddd;
                position: absolute;
            }
            &::before {
                width: 1px;
                height: 1.37rem;
                left: -0.273rem;
                top: -0.563rem;
            }
            &::after {
                width: 0.54rem;
                height: 1px;
                left: -0.25rem;
                top: 0.78rem;
            }
        }
    }
    ul {
        margin-top: 0.1rem;
        li {
            padding-top: 0.22rem;
            padding-right: 0;
        }
    }
    .flex-box {
        display: flex;
        flex-direction: row;
        padding-left: 0.54rem;
        .expand {
            width: 0.54rem;
            text-align: center;
        }
        &:nth-of-type(2) {
            margin-top: 0.18rem;
            margin-bottom: 0.15rem;
        }
        > span:not(.expand) {
            flex: 1;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            &.t-team {
                flex: 2;
            }
        }
        .txt {
            height: 0.23rem;
            font-size: 0.24rem;
            color: rgba(0, 0, 0, 0.65);
        }
        .title {
            height: 0.29rem;
            font-size: 0.3rem;
            color: rgba(0, 0, 0, 0.85);
            i {
                color: #3d4555;
                font-size: 12px;
                margin-right: 0.05rem;
            }
        }
        .t-left {
            text-align: left;
        }
        .t-right {
            text-align: right;
        }
        .i-more {
            position: relative;
        }
        .iconfont {
            padding-right: 0;
        }
        .i-from {
            font-size: 0.24rem;
        }
    }
    .i-btn-op,
    .i-btn-close {
        font-size: 0.2rem;
        color: #aaa;
        position: relative;
        z-index: 1;
        width: 0.54rem;
    }
}
</style>
