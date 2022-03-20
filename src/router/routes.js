
const routes = [
  // Login Router
  { path: '/login-support', component: () => import('src/components/loginSupport.vue')},


  {


    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('components/Login.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userToken") !== null ){
        next('/request')
      }
        else{
          next()
        }
      } },

      { path: '/request', component: () => import('components/Request.vue'),
        beforeEnter: (to, from, next) => {
        if (localStorage.getItem("userToken") == null ){
          next('/')
        }
          else{
            next()
          }
        }
      },

      { path: '/mail', component: () => import('components/Mail.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userToken") == null ){
        next('/')
      }
        else{
          next()
        }
      } },

      { path: '/support', component: () => import('components/Support.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userToken") == null ){
        next('/')
      }
        else{
          next()
        }
      } },

      { path: '/logs', component: () => import('components/Logs.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userToken") == null ){
        next('/')
      }
        else{
          next()
        }
      } },

      { path: '/sample', component: () => import('components/Sample.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("userToken") == null ){
        next('/')
      }
        else{
          next()
        }
      } },

      // { path: '/login', component: () => import('components/Login.vue') },
      { path: '/request-message/:id', component: () => import('components/Message.vue') },
      { path: '/log-message/:id', component: () => import('components/Message.vue') },
      { path: '/mail-message/:id', component: () => import('components/SingleMail.vue') },

      { path: '/admin', component: () => import('components/admin-pages/Login.vue') ,
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("adminToken") !== null ){
        next('/admin/users')
      } else{
        next()
      }
      }},

      { path: '/admin/users', component: () => import('components/admin-pages/Users.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("adminToken") == null ){
        next('/')
      }
        else{
          next()
        }
      }},

      { path: '/admin/departments', component: () => import('components/admin-pages/Departments.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("adminToken") == null ){
        next('/')
      }
        else{
          next()
        }
      } },

      { path: '/admin/messages', component: () => import('components/admin-pages/Messages.vue'),
      beforeEnter: (to, from, next) => {
      if (localStorage.getItem("adminToken") == null ){
        next('/')
      }
        else{
          next()
        }
      } },

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
