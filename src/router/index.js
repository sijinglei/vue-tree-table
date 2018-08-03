import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:  resolve => require.ensure([], () => resolve(require('@/pages/index.vue')), 'index')
    },
    {
      path: '/mobile',
      name: 'mobile',
      component:  resolve => require.ensure([], () => resolve(require('@/pages/mobile.vue')), 'mobile')
    }
  ]
})
