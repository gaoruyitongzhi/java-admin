import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/cms/book',
    component: Layout,
    redirect: '/cms/book/list',
    name: 'Book', // ## 每个路由name不能相同
    meta: { title: '书籍管理', icon: 'example' },
    alwaysShow: true,// 显示如果当子菜单只有一个的时候，也显示父菜单
    children: [
      {
        path: 'list',
        name: 'CmsBookList',
        component: () => import('@/views/cms/book/list'),
        meta: { title: '书籍列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'CmsBookCreate',
        component: () => import('@/views/cms/book/create'),
        meta: { title: '添加书籍', icon: 'form' },
        hidden: true//隐藏
      },
      {
        path: 'update/:id', // ## :id 相当于占位符,要传参数
        name: 'CmsBookUpdate',
        component: () => import('@/views/cms/book/update'),
        meta: { title: '编辑书籍', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/copyright',
    component: Layout,
    redirect: '/copyright',
    name: 'Example',
    meta: { title: '版权引进', icon: 'example' },
    alwaysShow: true,// 显示如果当子菜单只有一个的时候，也显示父菜单
    children: [
      {
        path: 'cms/copyright/copyrightlist',
        name: 'copyrightlist',
        component: () => import('@/views/cms/copyright/copyrightlist'),
        meta: { title: '版权方管理', icon: 'table' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '批次管理', icon: 'tree' }
      // }
      // ,
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '书单管理', icon: 'tree' }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '接口管理', icon: 'tree' }
      // },
      {
        path: 'customer/list',
        name: 'CustomerList',
        component: () => import('@/views/copyright/customer/list'),
        meta: { title: '客户管理', icon: 'table' },
        hidden: true//隐藏
      }
      ,
      {
        path: 'customer/insert',
        name: 'CustomerInsert',
        component: () => import('@/views/copyright/customer/insert'),
        meta: { title: '客户添加', icon: 'form'},
        hidden: true//隐藏
      },
      {
        path: 'customer/update/:id', // ## :id 相当于占位符,要传参数
        name: 'CustomerUpdate',
        component: () => import('@/views/copyright/customer/update'),
        meta: { title: '客户修改', noCache: true},
        hidden: true//隐藏
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
