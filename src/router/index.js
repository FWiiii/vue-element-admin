import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

import { createPermissionGuard } from './routerGuard/routerGuard'
import { createPageTitleGuard } from './routerGuard/titleGuard'
import { basicRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
})

export function setupRouter(app) {
  basicRoutes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route)
  })

  app.use(router)
  createPageTitleGuard(router)
  createPermissionGuard(router)
}
