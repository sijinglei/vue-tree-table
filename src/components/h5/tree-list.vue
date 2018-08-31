<template>
  <div class="recoveryPage">
    <div class="tree-main">
      <ul class="tree-wrap">
        <tree-item v-for="(model,i) in treeDataSource" :root="0" :num="i" :nodes="treeDataSource.length" @openExpand="openExpand" @delAction="delAction" :model.sync="model" :key="'root_'+i"></tree-item>
      </ul>
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
      treeDataSource: [],
    }
  },
  components: {
    treeItem
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    delAction() {

    },
    getList(flag = false) {
      this.initTreeData()
    },
    initTreeData() {
      // 临时储存数据
      let tempData = JSON.parse(JSON.stringify(this.list))
      let reduceDataFunc = (data, level) => {
        data.map((m, i) => {
          m.isExpand = m.isExpand || false
          m.children = m.children || []
          m.level = level
          if (m.children.length > 0) {
            reduceDataFunc(m.children, level + 1)
          }
        })
      }
      reduceDataFunc(tempData, 1)
      this.treeDataSource = tempData
    },
    openExpand(m) {
      console.log(m)
      m.isExpand = !m.isExpand
    }
  }
}
</script>

<style lang="less">
.main {
    overflow: auto;
}
.tree-wrap {
    > li {
        margin-bottom: 5px;
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
    }
    li {
        min-height: 60px;
        box-sizing: border-box;
        background: #fff;
        padding: 3px 10px 0 0;
        position: relative;
        height: auto;
    }
    .box {
        display: block;
        padding-left: 54px;
        box-shadow: none;
        li {
            &.node:not(:last-child) {
                > .line {
                    content: '';
                    display: block;
                    background-color: #ddd;
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    left: -36px;
                    top: -38px;
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
                height: 70px;
                left: -36px;
                top: -40px;
            }
            &::after {
                width: 48px;
                height: 1px;
                left: -35px;
                top: 30px;
            }
        }
    }
    ul {
        margin-top: 1px;
        li {
            padding-top: 0;
            padding-right: 0;
        }
    }
}
</style>
