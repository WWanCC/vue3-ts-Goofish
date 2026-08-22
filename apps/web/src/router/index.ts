import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/modules/home/pages/HomeView.vue'),
    },
    {
      path:'/product/:id',
      name:'product-detail',
      component:()=>import('@/modules/product/pages/ProductDetailView.vue')
    }
  ],
})

export default router
