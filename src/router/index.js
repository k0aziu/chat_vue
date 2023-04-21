import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ChatView from '../views/ChatView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: HomeView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
