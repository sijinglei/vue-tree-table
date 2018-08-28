<template>
	<li class="node">
		<template v-if="root !==0 && nodes !== 1">
			<span class="line"></span>
		</template>
		<div class="flex-box">
			<span class="txt t-left t-team">[原上级团队] {{model.ParentName}}
				<i class="iconfont i-from" v-if="model.ParentObjects.length > 0" @click="openParentObj(model)"></i>
			</span>
			<span class="txt t-right">还剩{{model.RemainDay}}天</span>
		</div>
		<div class="flex-box" style="padding-left:0">
			<span class="expand" @click="openExpand(model)">
				<i v-if="model.HasChild" class="iconfont" :class="isOpenOrClose"></i>
			</span>
			<span class="title">
				<i class="iconfont" :class="titleIcon"></i>{{model.ObjectName}}</span>
		</div>
		<div class="flex-box">
			<span class="txt t-left t-team">{{model.DeleteUserChnName}} 删除于 {{model.DeleteDate|moment("YYYY/MM/DD")}}</span>
			<span class="txt t-right">
				<i class="iconfont i-more" @click="openDelAction(model)"></i>
			</span>
		</div>
		<template v-if="model.children.length>
			0 && this.model.isExpand">
			<ul class="box">
				<tree-item v-for="(m, i) in model.children" :key="String('child_node'+i)" :num='i' :root="1" @openParentObj="openParentObj" @openExpand="openExpand" @openDelAction="openDelAction" :nodes.sync="model.children.length" :model.sync="m"></tree-item>
			</ul>
		</template>
	</li>
</template>

<script>
export default {
	name: 'treeItem',
	props: ['model', 'num', 'nodes', 'root'],
	data() {
		return {
			treeDataSource: []
		}
	},
	watch: {
		model: {
			handler() {
				console.log('监听子组件：', this.model)
			},
			deep: true
		}
	},
	computed: {
		titleIcon() {
			return this.model.ObjectTypeId === 1 ? 'i-com' : 'i-proj'
		},
		isOpenOrClose() {
			return this.model.isExpand ? 'i-btn-op' : 'i-btn-close'
		}
	},
	methods: {
		openParentObj(m) {
			// 打开原上级团队列表
			this.$emit('openParentObj', m)
		},
		openExpand(m) {
			if (!m.HasChild) return
			this.$emit('openExpand', m)
		},
		openDelAction(m) {
			this.$emit('openDelAction', m)
		}
	}
}
</script>

<style lang='less'>
</style>
