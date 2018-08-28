<template>
  <div class="contains">
    <h1>树表格实现</h1>
    <tree-table ref="recTree" :list.sync="treeDataSource" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></tree-table>
  </div>
</template>
<script>
import dataJson from './data.json'
import treeTable from '@/components/pc/tree-table.vue'
export default {
  data() {
    return {
      treeDataSource: dataJson
    }
  },
  components: {
    treeTable
  },
  methods: {
    orderByFunc(val) {
      alert('排序')
      alert(val)
    },
    actionFunc(m) {
      alert('编辑')
    },
    deleteFunc(m) {
      alert('删除')
    },
    handlerExpand(m) {
      console.log('展开/收缩')
      m.isExpand = !m.isExpand
    }
    // getTreeData() {
    //   // 取父节点
    //   let parentArr = this.list.filter(l => l.parentId === 0)
    //   this.treeDataSource = this.getTreeData(this.list, parentArr)
    // },
    // // 这里处理没有children结构的数据
    // getTreeData(list, dataArr) {
    //   dataArr.map((pNode, i) => {
    //     let childObj = []
    //     list.map((cNode, j) => {
    //       if (pNode.Id === cNode.parentId) {
    //         childObj.push(cNode)
    //       }
    //     })
    //     pNode.children = childObj
    //     if (childObj.length > 0) {
    //       this.getTreeData(list, childObj)
    //     }
    //   })
    //   return dataArr
    // }
  }
}
</script>

<style>
.contains {
    width: 960px;
    margin: 30px auto;
}
</style>
