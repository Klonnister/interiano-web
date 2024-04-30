export default [
  {
    path: '/sesion',
    name: 'auth',
    component: () => import('@/modules/auth/views/AuthView.vue'),
    children: [
      {
        path: 'inicio',
        component: () => import('@/modules/auth/components/LogInComponent.vue'),
        props: true
      },
      {
        path: 'registro',
        component: () => import('@/modules/auth/components/SignupComponent.vue')
      }
    ]
  }
]
