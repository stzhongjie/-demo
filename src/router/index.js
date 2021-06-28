import Vue from 'vue'
import VueRouter from 'vue-router'
import part1 from '../views/part1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'part1',
    component: part1
  },
  {
    path: '/part2',
    name: 'part2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/part2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
