import {
  createRouter,
  createWebHistory
} from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
    children: [
      {
        path: 'updateimg/:id',
        name: 'updateimg',
        component: () => import('../page/register/imgupdate.vue'),
      },
      {
        path: '',
        name: 'register',
        component: () => import('../page/register/register.vue'),
      },
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../page/home/home.vue'),
      },
      {
        path: 'note',
        name: 'note',
        component: () => import('../page/home/note.vue'),
      },
      {
        path: 'blogs/detail/:id',
        name: 'blogs_detail',
        component: () => import('../page/home/blog_details.vue'),
      },
      {
        path: 'information/:id',
        name: 'information',
        component: () => import('../page/home/information.vue'),
      },
      {
        path: 'course_detail/:id',
        name: 'course_detail',
        component: () => import('../page/home/course_detail.vue'),
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('../page/admin/home.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../page/admin/user.vue')
      },
      {
        path: 'course',
        name: 'course',
        component: () => import('../page/admin/course.vue')
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('../page/admin/role.vue')
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('../page/admin/blog.vue')
      },
      {
        path: 'tag',
        name: 'tag',
        component: () => import('../page/admin/tag.vue')
      },
      {
        path: 'banner',
        name: 'banner',
        component: () => import('../page/admin/banner.vue')
      },
      {
        path: 'static',
        name: 'static',
        component: () => import('../page/admin/static.vue')
      }
    ]
  },
  {
    path: '/creator',
    name: 'creator',
    component: () => import('../views/creator.vue'),
  }
  ]
})
export default router;