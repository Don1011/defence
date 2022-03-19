
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('components/Login.vue') },
      { path: '/request', component: () => import('components/Request.vue') },
      { path: '/mail', component: () => import('components/Mail.vue') },
      { path: '/support', component: () => import('components/Support.vue') },
      { path: '/logs', component: () => import('components/Logs.vue') },
      { path: '/sample', component: () => import('components/Sample.vue') },
      // { path: '/login', component: () => import('components/Login.vue') },
      { path: '/request-message/:id', component: () => import('components/Message.vue') },
      { path: '/admin', component: () => import('components/admin-pages/Login.vue') },
      { path: '/admin/users', component: () => import('components/admin-pages/Users.vue') },
      { path: '/admin/departments', component: () => import('components/admin-pages/Departments.vue') },
      { path: '/admin/messages', component: () => import('components/admin-pages/Messages.vue') },
      { path: '/admin/message', component: () => import('components/admin-pages/Message.vue') },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
