import { baseTitle } from "../../config/app"

export function createPageTitleGuard(router) {
    router.afterEach((to) => {
      const pageTitle = to.meta?.title
      if (pageTitle) {
        document.title = `${pageTitle} | ${baseTitle}`
      } else {
        document.title = baseTitle
      }
    })
  }