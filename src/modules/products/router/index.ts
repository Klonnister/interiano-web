export default [
  {
    path: 'productos',
    name: 'products',
    component: () => import('@/modules/products/views/MainView.vue'),
  },
  {
    path: '',
    redirect: { name: 'home' },
  },
]
