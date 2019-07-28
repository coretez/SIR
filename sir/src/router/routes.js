
const routes = [
  {
    path: '/', 
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: '/tokens', name: 'tokens', component: () => import('pages/Token.vue') },
      { path: '/users', name: 'users', component: () => import('pages/Users.vue') }
    ]
  },
  {
    path: '/login', 
    name: 'login', 
    component: () => import('pages/Login'), 
    meta: { noAuth: true }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
