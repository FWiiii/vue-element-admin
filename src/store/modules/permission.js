import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'

function hasPermission(route, role) {
  // * 不需要权限直接返回true
  if (!route.meta?.requireAuth)
    return true

  const routeRole = route.meta.role ? route.meta.role : []

  // * 登录用户没有角色或者路由没有设置角色判定为没有权限
  if (!role.length || !routeRole.length)
    return false

  // * 路由指定的角色包含任一登录用户角色则判定有权限
  return role.some(item => routeRole.includes(item))
}

function filterAsyncRoutes(routes = [], role) {
  const ret = []
  routes.forEach((route) => {
    if (hasPermission(route, role)) {
      const curRoute = {
        ...route,
        children: [],
      }
      if (route.children && route.children.length)
        curRoute.children = filterAsyncRoutes(route.children, role)

      else
        Reflect.deleteProperty(curRoute, 'children')

      ret.push(curRoute)
    }
  })
  return ret
}

function menuRouteFilter(routes) {
  const result = []
  routes.forEach((r) => {
    const { meta, path, redirect } = r
    if (meta?.hideMenu)
      return

    const v = { meta, path, redirect }

    const children
      = r.children && Array.isArray(r.children) && r.children.length !== 0
        ? menuRouteFilter(r.children)
        : []

    if (children.length !== 0) {
      result.push({ ...v, children })
      return
    }
    if (!r.children || meta?.alwaysShow) {
      // 如果没有children字段或者alwaysShow时 需要将当前路由加入
      result.push(v)
    }
  })
  return result
}

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: [],
      routes: [],
    }
  },
  getters: {
    menus() {
      return menuRouteFilter(this.routes)
    },
  },
  actions: {
    generateRoutes(role = []) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role)
      this.accessRoutes = accessRoutes
      this.routes = [...basicRoutes, ...accessRoutes]
      return accessRoutes
    },
  },
})
