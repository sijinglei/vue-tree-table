## 前言

> 前些日子做了一个pc端[树形表格](https://github.com/sijinglei/vue-tree-table)的功能，由于项目需要，移动端也要一个树形展示，虽然很不情愿，个人觉得在移动端做多级树结构不是不合理，操作也不方便，但是没办法，给产品交（si）流（bi）很久还是乖乖去做。
#### 主要技术点：`vue子组件的递归实现及相关样式的实现`
话不多说，先看效果图（[在线预览](https://sijinglei.github.io/vue-tree-table/dist/#/mobile)）（数据和树表格是同一个）：
***
![](https://user-gold-cdn.xitu.io/2018/8/31/1658eaf2f154a5df?w=474&h=877&f=gif&s=311068)
***
`注：上面这个iPhoneX效果图是用`[Devices.css](https://picturepan2.github.io/devices.css/)`实现的，模拟手机上显示效果。`
#### 代码实现

> tree-list.vue页面负责接收主页面传递的数据，然后将数据通过initTreeData方法组合成树结构需要的格式。
```bash
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
    }
```
> tree.vue子组件用于组件循环嵌套
```html
<template>
  <li class="node list-item" data-type="0">
    <template v-if="root !==0 && nodes !== 1">
      <span class="line"></span>
    </template>
    <div class="contanier flex">
      <div class="small-panel flex">
        <span class="label">[负责人]</span>
        <span class="txt">{{model.ResponsibleName}}</span>
      </div>
      <div class="body-panel flex">
        <div class="title">
          <i v-if="HasChild" class="arrow" :class="isOpenOrClose" @click="openExpand(model)"></i>
          <i class="t-icon m-dep"></i>
          {{model.ObjectName}}
        </div>
        <div class="time">{{model.BelongTo}}天前</div>
      </div>
      <div class="bottom-panel flex">
        <div class="left-wrap flex">
          <span class="label">[工作经验]</span>
          |
          <span class="txt">{{model.Experience}}</span>
        </div>
        <div class="right-wrap">
          <span class="txt">{{model.CreateTime}}</span>
        </div>
      </div>
    </div>
    <template v-if="HasChild && this.model.isExpand">
      <ul class="box">
        <tree-item v-for="(m, i) in model.children" :key="String('child_node'+i)" :num='i' :root="1" @openExpand="openExpand" @delAction="delAction" :nodes.sync="model.children.length" :model.sync="m"></tree-item>
      </ul>
    </template>
  </li>
</template>
```
`root=0`是代表第一级，`root=1`是表示非第一级<br>
`nodes`是表示子级的条数，这里主要用于一些样式（那条竖线）的控制<br>
`isExpand`是否展开/折叠树` 默认false`。此属性是在上述`initTreeData`方法中默认添加的<br>
`openExpand`方法是用于处理树的展开/折叠<br>
`delAction`方法用于删除（`暂时没有实现`）<br>
`HasChild `是验证当前数据层级是否还有子级数据<br>
`isOpenOrClose`根据当前`isExpand`返回是否展开/折叠后的样式名`open`or`close`
```bash
 computed: {
    HasChild() {
      return this.model.children.length > 0
    },
    isOpenOrClose() {
      return this.model.isExpand ? 'open' : 'close'
    }
  }
```
更多代码请查阅[ue-tree-table](https://github.com/sijinglei/vue-tree-table/blob/master/src/components/h5/mobile.md)，有不懂的可以留言。
#### 后续扩展
- 实现[滑块效果](https://github.com/sijinglei/vue-touch-test)，增加相关操作。
- 实现下拉刷新，上拉加载更多。
- 欢迎star，~~~
