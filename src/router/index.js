import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'alunos',
    component: () => import('./../views/Alunos')
  },
  {
    path: '/materias',
    name: 'dashboard',
    component: () => import('./../views/Materias')
  },
  {
    path: '/provas',
    name: 'dashboard',
    component: () => import('./../views/Provas')
  },
 ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
