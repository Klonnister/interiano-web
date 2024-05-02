export default {
    path: '/sesion',
    redirect: { name: 'login' },
    component: () => import('@/modules/auth/layout/AuthView.vue'),
    children: [
      {
        path: 'inicio',
        name: 'login',
        component: () => import('@/modules/auth/views/LogInComponent.vue'),
        props: true
      },
      {
        path: 'registro',
        name: 'signup',
        component: () => import('@/modules/auth/views/SignupComponent.vue')
      }
    ]
}
