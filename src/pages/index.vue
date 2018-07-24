<template>
  <div class="contains">
    <h1>树表格实现</h1>
    <tree-table ref="recTree"
    :list.sync="treeDataSource"
    @actionFunc="actionFunc"
    @deleteFunc="deleteFunc"
    @orderByFunc="orderByFunc"></tree-table>
  </div>
</template>
<script>
import treeTable from '@/components/tree-table.vue'
export default {
  data() {
    return {
      list: [
        {
          Id: 1,
          parentId: 0,
          ObjectName: '技术',
          BelongTo: 26,
          CreateTime: '2018/07/24',
          ResponsibleName: '刘备',
          Experience: '不要求'
        },
        {
          Id: 2,
          parentId: 0,
          ObjectName: '设计',
          BelongTo: 26,
          CreateTime: '2018/07/24',
          ResponsibleName: '刘备',
          Experience: '不要求'
        },
        {
          Id: 3,
          parentId: 1,
          ObjectName: '后端开发',
          BelongTo: 26,
          CreateTime: '2018/07/24',
          ResponsibleName: '刘备',
          Experience: '不要求'
        },
        {
          Id: 4,
          parentId: 1,
          ObjectName: '前端开发',
          BelongTo: 26,
          CreateTime: '2018/07/24',
          ResponsibleName: '刘备',
          Experience: '不要求'
        },
        {
          Id: 5,
          parentId: 2,
          ObjectName: '视觉设计',
          BelongTo: 26,
          CreateTime: '2018/07/24',
          ResponsibleName: '刘备',
          Experience: '不要求'
        },
        {
          Id: 6,
          parentId: 2,
          ObjectName: '产品设计',
          BelongTo: 26,
          CreateTime: '2018/07/24',
          ResponsibleName: '刘备',
          Experience: '不要求'
        }
      ],
      treeDataSource: [
					{
						Id: 1,
						ObjectName: '技术',
						BelongTo: 26,
						CreateTime: '2018/07/24',
						ResponsibleName: '刘备',
						Experience: '不要求',
						children: [
							{
								Id: 2,
								ObjectName: '后端开发',
								BelongTo: 24,
								CreateTime: '2018/07/24',
								ResponsibleName: '关羽',
								Experience: '5-10年',
								children: [
                  	{
                      Id: 2,
                      ObjectName: 'java',
                      BelongTo: 24,
                      CreateTime: '2018/07/24',
                      ResponsibleName: '典韦',
                      Experience: '3-5年',
                      children: []
                    },
                    {
                      Id: 2,
                      ObjectName: '数据挖掘',
                      BelongTo: 24,
                      CreateTime: '2018/07/24',
                      ResponsibleName: '吕布',
                      Experience: '5-10年',
                      children: []
                    },
                    {
                      Id: 2,
                      ObjectName: 'C#',
                      BelongTo: 24,
                      CreateTime: '2018/07/24',
                      ResponsibleName: '马可波罗',
                      Experience: '5-10年',
                      children: []
                    }
                ]
							},
							{
								Id: 3,
								ObjectName: '前端开发',
								BelongTo: 24,
								CreateTime: '2018/07/24',
								ResponsibleName: '赵云',
								Experience: '3-5年',
								children: [
                  {
                    Id: 2,
                    ObjectName: 'web前端',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '武则天',
                    Experience: '3-5年',
                    children: [
                      {
                        Id: 2,
                        ObjectName: '初级web前端',
                        BelongTo: 24,
                        CreateTime: '2018/07/24',
                        ResponsibleName: '王昭君',
                        Experience: '3年以下',
                        children: []
                      },
                      {
                        Id: 2,
                        ObjectName: '中级web前端',
                        BelongTo: 24,
                        CreateTime: '2018/07/24',
                        ResponsibleName: '王昭君',
                        Experience: '3-5年',
                        children: []
                      },
                      {
                        Id: 2,
                        ObjectName: '高级web前端',
                        BelongTo: 24,
                        CreateTime: '2018/07/24',
                        ResponsibleName: '王昭君',
                        Experience: '5-10年',
                        children: []
                      }
                    ]
                  },
                  {
                    Id: 2,
                    ObjectName: 'html5',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '小乔',
                    Experience: '5-10年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: 'javascript',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '女娲',
                    Experience: '5-10年',
                    children: []
                  }
								]
							},
							{
								Id: 9,
								ObjectName: '测试',
								BelongTo: 24,
								CreateTime: '2018/07/24',
								ResponsibleName: '张飞',
								Experience: '3年以下',
								children: [
                  {
                    Id: 2,
                    ObjectName: '测试工程师',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '大乔',
                    Experience: '3-5年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: '自动化测试',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '蔡文姬',
                    Experience: '5-10年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: '功能测试',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '妲己',
                    Experience: '5-10年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: '性能测试',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '刘婵',
                    Experience: '5-10年',
                    children: []
                  }
								]
							},
							{
								Id: 12,
								ObjectName: '运维',
								BelongTo: 24,
								CreateTime: '2018/07/24',
								ResponsibleName: '诸葛亮',
								Experience: '10年以上',
								children: [
                  {
                    Id: 2,
                    ObjectName: '运维工程师',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '后羿',
                    Experience: '3-5年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: '运维开发工程师',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '鲁班',
                    Experience: '5-10年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: '系统工程师',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '黄忠',
                    Experience: '5-10年',
                    children: []
                  },
                  {
                    Id: 2,
                    ObjectName: '网络安全',
                    BelongTo: 24,
                    CreateTime: '2018/07/24',
                    ResponsibleName: '孙尚香',
                    Experience: '5-10年',
                    children: []
                  }
                ]
							}
						]
					},
					{
						Id: 13,
						ObjectName: '设计',
						BelongTo: 10,
						CreateTime: '2018/07/24',
						ResponsibleName: '曹操',
						Experience: '不要求',
						children: [
							{
								Id: 14,
								ObjectName: '视觉设计',
								BelongTo: 11,
								CreateTime: '2018/07/24',
								ResponsibleName: '花木兰',
								Experience: '5-10年',
								children: [
									{
										Id: 15,
										ObjectName: '视觉设计师',
										BelongTo: 12,
										CreateTime: '2018/07/24',
										ResponsibleName: '露娜',
										Experience: '5-10年',
										children: []
                  },
                  			{
										Id: 15,
										ObjectName: '网页设计师',
										BelongTo: 12,
										CreateTime: '2018/07/24',
										ResponsibleName: '不知火舞',
										Experience: '5-10年',
										children: []
									}
								]
							},
							{
								Id: 16,
								ObjectName: '交互设计',
								BelongTo: 11,
								CreateTime: '2018/07/24',
								ResponsibleName: '阿珂',
								Experience: '3-5年',
								children: [
                  {
										Id: 15,
										ObjectName: '交互设计师',
										BelongTo: 12,
										CreateTime: '2018/07/24',
										ResponsibleName: '李白',
										Experience: '5-10年',
										children: []
                  },
                  {
										Id: 15,
										ObjectName: '无线交互设计师',
										BelongTo: 12,
										CreateTime: '2018/07/24',
										ResponsibleName: '兰陵王',
										Experience: '5-10年',
										children: []
									}
                ]
							},
							{
								Id: 17,
								ObjectName: '用户研究',
								BelongTo: 11,
								CreateTime: '2018/07/24',
								ResponsibleName: '韩信',
								Experience: '3-5年',
								children: [
                  {
										Id: 15,
										ObjectName: '数据分析师',
										BelongTo: 12,
										CreateTime: '2018/07/24',
										ResponsibleName: '百里玄策 ',
										Experience: '3-5年',
										children: []
                  },
                  {
										Id: 15,
										ObjectName: '用户研究员',
										BelongTo: 12,
										CreateTime: '2018/07/24',
										ResponsibleName: '宫本武藏',
										Experience: '3-5年',
										children: []
									}
                ]
							}
						]
					}
				]
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
    getTreeData() {
      // 取父节点
      let parentArr = this.list.filter(l => l.parentId === 0)
      this.treeDataSource = this.getTreeData(this.list, parentArr)
    },
    // 这里处理没有children结构的数据
    getTreeData(list, dataArr) {
      dataArr.map((pNode, i) => {
        let childObj = []
        list.map((cNode, j) => {
          if (pNode.Id === cNode.parentId) {
            childObj.push(cNode)
          }
        })
        pNode.children = childObj
        if (childObj.length > 0) {
          this.getTreeData(list, childObj)
        }
      })
      return dataArr
    }
  }
}
</script>

<style>
  .contains{
    width:960px;
    margin: 30px auto;
  }
</style>
