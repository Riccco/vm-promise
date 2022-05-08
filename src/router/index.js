import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import resolveDemo from "@/views/resolveDemo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resolveDemo',
    name: 'resolveDemo',
    component:resolveDemo
  }
]

const router = new VueRouter({
  routes
})

export default router
