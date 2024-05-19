export default [
  {
    path: 'productos',
    name: 'products',
    component: () => import('@/modules/products/views/ProductsView.vue'),
  },
  {
    path: '',
    redirect: { name: 'home' },
  },
]
