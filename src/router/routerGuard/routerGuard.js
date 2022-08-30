import { whiteList, NOT_FOUND_ROUTE } from "@/router/routes";
import { getToken } from "@/utils/useStorage";
import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission";

export function createPermissionGuard(router) {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to) => {
    const token = getToken();
    /** 没有token的情况 */
    if (!token) {
      if (whiteList.includes(to.path)) return true;
      else return "/login";
    }

    if (to.path === "/login") return "/";

    // 已经拿到用户信息
    if (userStore.userId) {
      return true;
    }
    await userStore.getUserInfo().catch((error) => {
      Emessage.error(error.message || "获取用户信息失败！");
    });
    const accessRoutes = permissionStore.generateRoutes(userStore.role);
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route);
    });
    router.addRoute(NOT_FOUND_ROUTE);
    return { ...to, replace: true };
  });
}
