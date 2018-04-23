import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '系统',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/list',
    name: 'permission',
    meta: { title: '权限管理', icon: 'component' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限列表', icon: 'lock' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role'),
        meta: { title: '角色列表', icon: 'people' }
      },
      {
        path: 'adm',
        name: 'adm',
        component: () => import('@/views/permission/adm'),
        meta: { title: '管理员列表', icon: 'user' }
      }
    ]
  },

  {
    path: '/artical',
    component: Layout,
    redirect: '/artical/list',
    name: 'Example',
    meta: { title: '文章管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '文章管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    name: 'Example',
    meta: { title: '留言管理', icon: 'message' },
    children: [
      {
        path: 'list',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '留言列表', icon: 'message' }
      },
      {
        path: 'publish',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '显示留言', icon: 'tab' }
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: 'Example',
    meta: { title: 'banner列表', icon: 'excel' },
    children: [
      {
        path: 'list',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'banner列表', icon: 'excel' }
      }
    ]
  },

  {
    path: '/items',
    component: Layout,
    redirect: '/items/list',
    name: 'Example',
    meta: { title: 'banner列表', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '栏目管理', icon: 'example' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

