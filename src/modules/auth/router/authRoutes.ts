export default {
    path: '/sesion',
    redirect: { name: 'login' },
    component: () => import('@/modules/auth/layout/AuthLayout.vue'),
    children: [
      {
        path: 'inicio',
        name: 'login',
        component: () => import('@/modules/auth/views/LogInView.vue'),
        props: true
      },
      {
        path: 'registro',
        name: 'signup',
        component: () => import('@/modules/auth/views/SignupView.vue')
      }
    ]
}
