<template>
  <!-- <div class="app" :style="{'height':appHeight+'px'}">
    <header class="header">
      <div>我是移动端树(<small><a href="https://sijinglei.github.io/vue-tree-table/dist/#/">pc端树demo地址</a></small>)</div>
    </header>
    <section class="main">

    </section>
  </div> -->
  <div class="marvel-device iphone-x">
    <div class="notch">
      <div class="camera"></div>
      <div class="speaker"></div>
    </div>
    <div class="top-bar"></div>
    <div class="sleep"></div>
    <div class="bottom-bar"></div>
    <div class="volume"></div>
    <div class="overflow">
      <div class="shadow shadow--tr"></div>
      <div class="shadow shadow--tl"></div>
      <div class="shadow shadow--br"></div>
      <div class="shadow shadow--bl"></div>
    </div>
    <div class="inner-shadow"></div>
    <div class="screen">
      <!--内容区域start-->
      <header class="header">
        <div>我是移动端树
          <a href="https://sijinglei.github.io/vue-tree-table/dist/#/">（pc端vue-tree-table）</a>
        </div>
      </header>
      <div class="main">
        <ul class="tree-wrap">
          <li class="node">
            <div class="flex-box" style="padding-left:0">
              <span class="expand" @click="openExpand(model)">
                <i v-if="model.children.length>0" class="iconfont" :class="isOpenOrClose"></i>
              </span>
              <span class="title">{{model.ObjectName}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!--内容区域end-->
    </div>
  </div>
</template>
<script>
import dataJson from './data.json'
export default {
  data() {
    return {
      list: dataJson,
      treeDataSource: [],
    }
  },
  computed: {
    model() {
      return this.treeDataSource[0]
    },
    isOpenOrClose() {
      return this.treeDataSource[0].isExpand ? 'i-btn-op' : 'i-btn-close'
    }
  },
  mounted() {
    this.initTreeData()
  },
  methods: {
    // 展开，折叠
    openExpand() {

    },
    initTreeData() {
      // console.log('处理前的:', JSON.parse(JSON.stringify(this.list || [])))
      // 临时储存数据
      let tempData = JSON.parse(JSON.stringify(this.list))
      let reduceDataFunc = (data, level, parentObjectGuid) => {
        data.map((m, i) => {
          m.isExpand = m.isExpand || false
          m.children = m.children || []
          m.level = level
          m.pObjectGuid = parentObjectGuid // 用与子级父级之间的关联
          m.ParentName = m.ParentName || '无'
          if (m.children.length > 0) {
            reduceDataFunc(m.children, level + 1, m.ObjectGuid)
          }
        })
      }
      reduceDataFunc(tempData, 1, '000-000')
      // console.log('处理后的:', tempData)
      this.treeDataSource = tempData
    }
  }
}
</script>
<style lang="less">
@import "../assets/devices.min.css";
#app {
    text-align: center;
}
.header {
    margin-top: 30px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    font-size: 22px;
    a {
        font-size: 16px;
        color: red;
    }
}
.main {
}
</style>
