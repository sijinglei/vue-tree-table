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
    HasChild() {
      return this.model.children.length > 0
    },
    isOpenOrClose() {
      return this.model.isExpand ? 'open' : 'close'
    }
  },
  methods: {
    openExpand(m) {
      console.log(m)
      // if (!m.HasChild) return
      this.$emit('openExpand', m)
    },
    //删除
    delAction(m) {
      this.$emit('delAction', m)
    }
  }
}
</script>

<style lang='less'>
.flex {
    display: flex;
    justify-content: flex-start;
}
.contanier {
    padding-left: 26px;
    padding-right: 10px;
    flex-direction: column;
    .small-panel {
        margin-top: 5px;
    }
    .small-panel,
    .bottom-panel {
        flex-direction: row;
        height: 20px;
        font-size: 8px;
        color: #333;
    }
    .body-panel {
        height: 24px;
        flex-direction: row;
        justify-content: space-between;
        .title {
            position: relative;
            .arrow {
                position: absolute;
                width: 0;
                height: 0;
                left: -13px;
                border-style: solid;
                z-index: 1;
                &.close {
                    border-width: 6px 0 6px 6px;
                    border-color: transparent transparent transparent #aaa;
                }
                &.open {
                    top: 4px;
                    border-width: 6px 6px 0;
                    border-color: #aaa transparent transparent;
                }
            }
        }
        .time {
            font-size: 14px;
            color: #ff853f;
        }
        .t-icon {
            display: inline-block;
            width: 14px;
            height: 18px;
            background-size: 100% 100% !important;
            vertical-align: middle;
            margin: -3px 2px 0 0;
            &.m-dep {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZEQUMxRDA0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZEQUMxRDE0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkRBQzFDRTRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkRBQzFDRjRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8y8UsAAAIjSURBVHjanJPPa9RQEMe/85Jss7v9RVO0UtqDVbR2FbEXEQQP3qTgyX9AEG89KagHRfDi3yAIvfai3qRYUbH0sNJakUV6KOyWLii2btNkNz9enpPEddkfVPALj8mbzGdm3ryElFLwtu4qqjVsre6VKVKboj/3GX2Zj5DqG4jK6NSZp9CTh9FhqCPRQOgFM/hhz1B177puahC5LKD4PQmXE+xDGHNsizEiErAhAddPd1PjXCiC3LMZIF7si2QOMhyDkg+bRVMwScsKI8BvgOKtECnYrq0OsENaDFArYQ/1BJNwats19der41+SDWZ5kRGHMxgd0mqzZHTAsSZgXgaMSfbL9cMrCoaUA2TGGbjBOXji6jRPf3NekfGMuiryxwCdc2W4LVVj6BJDv3ja5dTS0QIiZ7C7VUNLbY2raSJujZf4MxMzOS8Fy9V2ML4CQ0e0tAERBDCs4xz4hv3bUJn4RByvLbMdybWDcVIvYIdEZmQY6BdQuyuo6BdBUQFfdqZRP+B2R323q1UV01kdZPpQZoBbb2/j0QoPZsdDsWTj2MJVfK8MhT2uQ4PulbjF13hRvIIgP42Tzie8Kq1D16qYPzuEO+/ODbaug1Ch0J8gkvAvPF8jZ99YfLlamLA8DCCLpdCErOcxa7nQAmrdIwljklR4X6mfT5z8qaqj9117fHPqQc3era9+Lbn3Tmyct6zq3Nr27PuyO/YhYeIf+X/0W4ABAGLgy0VZgovSAAAAAElFTkSuQmCC);
            }
        }
    }
}
</style>
