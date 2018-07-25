<template>
	<div class="tree-table">
		<div class="tree-head">
			<table>
				<tr>
					<td class="td1">职位名称</td>
					<td class="td2">负责人</td>
					<td class="td3" @click="isDesc=!isDesc">
						创建时间
						<div class="arrow">
							<span class="up-arrow" :class="{'sort':isDesc}"></span>
							<span class="down-arrow" :class="{'sort':!isDesc}"></span>
						</div>
					</td>
					<td class="td4">工作经验</td>
					<td class="td5">发布时间</td>
					<td class="td6">操作</td>
				</tr>
			</table>
		</div>
		<div id="scrollWrap" class="tree-wrap">
			<div class="tree-body">
				<table v-if='treeDataSource.length>0'>
					<tbody>
						<tr>
							<td>
								<tree-item
									v-for="(model,i) in treeDataSource"
                  :key="'root_node_'+i"
									:root="0"
									:num="i"
									@actionFunc="actionFunc"
									@deleteFunc="deleteFunc"
                  @handlerExpand="handlerExpand"
									:nodes="treeDataSource.length"
									:trees.sync="treeDataSource"
									:model.sync="model">
								</tree-item>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'treeTable',
		props: ['list'],
		data() {
			return {
				isDesc: false,
				treeDataSource: []
			}
		},

		watch: {
			'list': {
				handler() {
					console.log('ddddd')
					this.initTreeData()
				},
				deep: true
			},
			isDesc(nelVal, oldVal) {
				this.$emit('orderByFunc', nelVal)
			}
		},
		computed: {
		},
		methods: {
			initTreeData() {
				console.log('处理前的:', JSON.parse(JSON.stringify(this.list)))
				// 这里一定要转化，要不然他们的值监听不到变化
				let tempData = JSON.parse(JSON.stringify(this.list))
				let reduceDataFunc = (data, level) => {
					data.map((m, i) => {
						m.isExpand = false
						m.children = m.children || []
						m.level = level
						m.bLeft = level === 1 ? 34 : (level - 2) * 16 + 34
						m.Experience = m.Experience || '无'
						if (m.children.length > 0) {
							reduceDataFunc(m.children, level + 1)
						}
					})
				}
				reduceDataFunc(tempData, 1)
				console.log('处理后的:', tempData)
				this.treeDataSource = tempData
			},
			getMore() {
				alert('滚动到底部加载更多')
				// 滚动到最后
				$('#scrollWrap').mCustomScrollbar('scrollTo', 'top', {
					scrollInertia: 0
				})
      },
      // 编辑
			actionFunc(m) {
				this.$emit('actionFunc', m)
      },
      // 删除
			deleteFunc(m) {
				this.$emit('deleteFunc', m)
      },
      // 展开
      handlerExpand(m) {
        this.$emit('handlerExpand', m)
      }
		},
		components: {
			treeItem: () => import('./tree-item.vue')
		},
		mounted() {
			const vm = this
			vm.$nextTick(() => {
				vm.initTreeData()
			})
		}
	}
</script>

<style lang="less">
	.tree-table {
		width: 100%;
		position: relative;
		.center {
			text-align: center;
		}
		table {
			width: 100%;
			text-align: center;
			border-collapse: collapse;
			border-spacing: 0;
			td {
				word-break: break-all;
				word-wrap: break-word;
				font-size: 12px;
			}
		}
		.td-border {
			border-bottom: 1px solid #E8E8E8;
			.leve{
        // 屏蔽双击不能选择文本样式
        -webkit-user-select:none;
        -moz-user-select:none;
        -o-user-select:none;
        user-select:none;
				&:hover {
					background-color: #f7f9ff;
				}
			}
		}
		th,
		td {
			font-weight: 400;
			text-align: left;
		}
		.td1 {width: 260px;padding-left:30px;}
		.td2 {width: 100px;}
		.td3 {width: 120px;}
		.td4 {width: 220px;}
		.td5 {width: 100px;}
		.td6 {width: 140px;}
		.p20{padding-left:20px;}
		.leve-1 .td1 {padding-left:30px;}
		.leve-2 .td1{padding-left:46px;}
		.leve-3 .td1{padding-left:62px;}
		.leve-4 .td1{padding-left:78px;}
		.leve-5 .td1{padding-left:90px;}
		.leve-6 .td1{padding-left:106px;}
		.leve-7 .td1{padding-left:122px;}
		.leve-8 .td1{padding-left:138px;}
		.leve-9 .td1{padding-left:154px;}
		.td4 {
			.unvisibie {
				visibility: hidden;
			}
			.ellipsis{
				display: block;
				max-width:200px;
			}
			.iconfont {
				color: #414959;
				position: relative;
				top: 0px;
				left: 5px;
				font-size: 14px;
			}
		}
		> div{
			position: absolute;
			width:100%;
		}
		.line-height {
			height: 40px;
			line-height: 40px;
		}

		.tree-head{
			.line-height;
			td{
				color: rgba(0,0,0,0.45);
				border-bottom: 2px solid #E8E8E8;
			}
			.arrow {
				position: relative;
				display: inline-block;
				width: 16px;
				height: 16px;
				background: #fff;
				span{
					position: absolute;
					display: block;
					width: 0;
					height: 0;
					left:0;
					border-style: solid;
					border-width:4px;
				}
				.up-arrow {
					top:3px;
					border-color:transparent transparent #ddd transparent;
					&.sort{
						border-bottom-color: #3C4454;
					}
				}
				.down-arrow {
					top:12px;
					border-color:#ddd transparent transparent transparent;
					&.sort{
						border-top-color: #3C4454;
					}
				}
			}
		}
		.ellipsis{
			overflow:hidden;
			white-space:nowrap;
			text-overflow:ellipsis;
		}
		.tree-wrap {
			top:40px;
		}
		.tree-body {
			table{
				table-layout: fixed;
			}
			td {
				.line-height;
				color: rgba(0,0,0,0.85);
				font-size: 14px;
				.reset {
					color: #1890FF;
				}
				.delete {
					color: #F5222D;
				}
				.line {
					display: inline-block;
					width: 1px;
					background: rgba(0,0,0,0.09);
					margin: 0 11px;
					height: 14px;
				}
			}
			.td-title{
				position: relative;
				a {
					display: block;
        }
				.tree-close,.tree-open{
					position: absolute;
					width: 0;
					height: 0;
					border-color: #999;
					border-style: solid;
					cursor: pointer;
					border-width:5px;
    				z-index: 2;
					}
					.tree-close{
						left: -12px;
						top: 14px;
						border-color: transparent transparent transparent #AAAAAA;
					}
					.tree-open{
						left: -17px;
						top: 17px;
						border-color: #AAAAAA transparent transparent;
					}
			}
			.leve-1 .td-title a { width: 230px; }
			.leve-2 .td-title a { width: 200px; }
			.leve-3 .td-title a { width: 170px; }
			.leve-4 .td-title a { width: 140px; }
			.leve-5 .td-title a { width: 110px; }
			.leve-6 .td-title a { width: 80px; }
			.leve-7 .td-title a { width: 50px; }
			.leve-8 .td-title a { width: 20px; }
			.other-node {
				position: relative;
				> .not-border:not(:last-child) {
					position: relative;
					.before-line {
						content: '';
						position: absolute;
						width: 1px;
						height: 100%;
						background-color: #E8E8E8;
						border: none;
						top: -20px;
						z-index: 1;
						left: 34px;
					}
				}
			}
			.not-border {
				.td-title {
					&::before{
						content: '';
						position: absolute;
						width: 1px;
						height: 40px;
						background-color: #E8E8E8;
						border: none;
						left: -12px;
						top: -20px;
						z-index: 1;
					}
					&::after {
						content: '';
						left: -11px;
						position: absolute;
						right: auto;
						background-color: #E8E8E8;
						height: 1px;
						top: 19px;
						width: 16px;
						z-index: 1;
					}
				}
			}
		}
    .t-icon{
        display: inline-block;
        width: 14px;
        height: 18px;
        background-size: 100% 100% !important;
        vertical-align: middle;
        margin: -3px 4px 0 0;
        &.m-dep {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZEQUMxRDA0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZEQUMxRDE0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkRBQzFDRTRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkRBQzFDRjRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8y8UsAAAIjSURBVHjanJPPa9RQEMe/85Jss7v9RVO0UtqDVbR2FbEXEQQP3qTgyX9AEG89KagHRfDi3yAIvfai3qRYUbH0sNJakUV6KOyWLii2btNkNz9enpPEddkfVPALj8mbzGdm3ryElFLwtu4qqjVsre6VKVKboj/3GX2Zj5DqG4jK6NSZp9CTh9FhqCPRQOgFM/hhz1B177puahC5LKD4PQmXE+xDGHNsizEiErAhAddPd1PjXCiC3LMZIF7si2QOMhyDkg+bRVMwScsKI8BvgOKtECnYrq0OsENaDFArYQ/1BJNwats19der41+SDWZ5kRGHMxgd0mqzZHTAsSZgXgaMSfbL9cMrCoaUA2TGGbjBOXji6jRPf3NekfGMuiryxwCdc2W4LVVj6BJDv3ja5dTS0QIiZ7C7VUNLbY2raSJujZf4MxMzOS8Fy9V2ML4CQ0e0tAERBDCs4xz4hv3bUJn4RByvLbMdybWDcVIvYIdEZmQY6BdQuyuo6BdBUQFfdqZRP+B2R323q1UV01kdZPpQZoBbb2/j0QoPZsdDsWTj2MJVfK8MhT2uQ4PulbjF13hRvIIgP42Tzie8Kq1D16qYPzuEO+/ODbaug1Ch0J8gkvAvPF8jZ99YfLlamLA8DCCLpdCErOcxa7nQAmrdIwljklR4X6mfT5z8qaqj9117fHPqQc3era9+Lbn3Tmyct6zq3Nr27PuyO/YhYeIf+X/0W4ABAGLgy0VZgovSAAAAAElFTkSuQmCC) no-repeat;
          }
    }
	}
</style>

