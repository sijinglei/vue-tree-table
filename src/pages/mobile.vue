<template>
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
      <div class="container">
        <header class="header">
          <div>我是移动端树
            <a href="https://sijinglei.github.io/vue-tree-table/dist/#/">（pc端vue-tree-table）</a>
          </div>
        </header>
        <ul class="tree-wrap">
          <tree-list :list="treeDataSource"></tree-list>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import dataJson from './data.json'
import treeList from '@/components/h5/tree-list.vue'
export default {
  data() {
    return {
      treeDataSource: dataJson,
    }
  },
  computed: {
  },
  created() {
    // 获取树结构数据，这里暂时写的死数据，
    // 使用的时候可以在这里获取后台接口提供的数据赋值给treeDataSource
  },
  methods: {
  },
  components: {
    treeList
  }
}
</script>
<style lang="less">
@import '../assets/devices.min.css';
::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
background-color:#f8f8f8;
}
::-webkit-scrollbar {//滚动条的宽度
width:9px;
height:9px;
}
::-webkit-scrollbar-thumb {//滚动条的设置
background-color:#dddddd;
background-clip:padding-box;
min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
background-color:#bbb;
}
#app {
    text-align: center;
}
.container {
    overflow: auto;
    height: 100%;
}
.header {
    margin-top: 30px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    font-size: 22px;
    a {
        font-size: 16px;
        color: blue;
    }
}
</style>
