<template>
  <div :class="tdClass">
    <span class="before-line" v-if="root !== 0 && nodes !== 1" :style="{'left':model.bLeft + 'px'}"></span>
    <table>
      <tr>
        <td :colspan="colSpan">
          <table>
              <tr class="leve" :class="levelClass">
                <td class="td1">
                  <div class="td-title" @dblclick="open(model)">
                    <span v-if="model.children.length > 0" class="tree-close" :class="{'tree-open':model.isExpand}" @click="open(model)"></span>
                    <a class="ellipsis">
                      <i class="t-icon m-dep"></i>
                      <span :title="model.ObjectName">{{model.ObjectName}}</span>
                    </a>
                  </div>
                </td>
                <td class="td2">
                  {{model.ResponsibleName}}
                </td>
                <td class="td3">{{model.CreateTime|formatDate}}</td>
                <td class="td4">
                  <span :title="model.Experience" class="ellipsis">{{model.Experience}}</span>
                </td>
                <td class="td5">{{model.BelongTo}}天</td>
                <td class="td6">
                  <a class="reset" href="javascript:;" @click="actionFunc(model)">编辑</a>
                  <i class="line"></i>
                  <a class="delete" href="javascript:;" @click="deleteFunc(model)">删除</a>
                </td>
              </tr>
          </table>
        </td>
      </tr>
      </table>
      <div v-show="model.isExpand" class="other-node" :class="otherNodeClass">
        <tree-item
          v-for="(m, i) in model.children"
          :key="String('child_node'+i)"
          :num='i'
          :root="1"
          @actionFunc="actionFunc"
          @deleteFunc="deleteFunc"
          :nodes.sync='model.children.length'
          :trees.sync='trees'
          :model.sync="m">
        </tree-item>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'treeItem',
				props: ['model', 'num', 'nodes', 'root', 'trees'],
				data() {
					return {
						parentNodeModel: null
					}
				},
				computed: {
					colSpan() {
						return this.root === 0 ? '' : 6
					},
					tdClass() {
						return this.root === 0 ? 'td-border' : 'not-border'
					},
					levelClass() {
						return this.model ? 'leve-' + this.model.level : ''
					},
					childNodeClass() {
						return this.root === 0 ? '' : 'child-node'
					},
					otherNodeClass() {
						return this.model ? 'other-node-' + this.model.level : ''
					}
				},
				watch: {
					'model': {
						handler() {
							console.log('对象变化', this.model.isExpand)
						},
						deep: true
					}
				},
				methods: {
					getParentNode(m) {
						// 查找点击的子节点
						var recurFunc = (data, list) => {
							data.forEach((l) => {
								if (l.id === m.id) this.parentNodeModel = list
								if (l.children) {
									recurFunc(l.children, l)
								}
							})
						}
						recurFunc(this.trees, this.trees)
					},
					open(m) {
						m.isExpand = !m.isExpand
					},
					deleteFunc(m) {
						this.$emit('deleteFunc', m)
						// this.getParentNode(m)
						// console.log(this.parentNodeModel)
						// if (this.parentNodeModel.hasOwnProperty('children')) {
						// 	console.log('父级是跟节点', this.parentNodeModel)
						// 	this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(m), 1)
						// } else if (this.parentNodeModel instanceof Array) {
						// 	console.log('跟节点', this.parentNodeModel)
						// 	this.parentNodeModel.splice(this.parentNodeModel.indexOf(m), 1)
						// }
					},
					actionFunc(m) {
						this.$emit('actionFunc', m)
					}
				},
				filters: {
					formatDate: function(date) {
            // 后期自己格式化
						return date //Utility.formatDate(date, 'yyyy/MM/dd')
					}
				}
  }
</script>
