export const basicRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录页",
      hideMenu: true,
    },
  },

  {
    name: "ErrorPage",
    path: "/error-page",
    component: () => import("@/layout/MainLayout.vue"),
    redirect: "/error-page/404",
    meta: {
      title: "错误页",
      hideMenu: true,
    },
    children: [
      {
        name: "ERROR-404",
        path: "404",
        component: () => import("@/views/error/index.vue"),
        meta: {
          title: "404",
          hideMenu: true,
        },
      },
    ],
  },
];

const NOT_FOUND_ROUTE = {
  name: "NotFound",
  path: "/:pathMatch(.*)",
  redirect: "/error-page/404",
  meta: {
    title: "404",
    hideMenu: true,
  },
};

const asyncRoutes = [
  {
    path: "/",
    name: "guide",
    component: () => import("@/layout/MainLayout.vue"),
    redirect: "/dashboard",
    meta: { icon: "Guide", title: "仪表盘", alwaysShow: true },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { icon: "Guide", title: "首页", hideMenu: true },
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: () => import("@/layout/MainLayout.vue"),
    redirect: "/system/table",
    meta: { icon: "Guide", title: "系统" },
    children: [
      {
        path: "table",
        name: "table",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { icon: "Guide", title: "表格" },
        children: [
          {
            path: "post",
            name: "post",
            component: () => import("@/views/dashboard/index.vue"),
            meta: {
              icon: "Guide",
              title: "发布",
              role: ["admin"],
              requireAuth: true,
            },
          },
          {
            path: "create",
            name: "create",
            component: () => import("@/views/dashboard/index.vue"),
            meta: {
              icon: "Guide",
              title: "创建",
              role: ["admin"],
              requireAuth: true,
            },
          },
          {
            path: "view",
            name: "view",
            component: () => import("@/views/dashboard/index.vue"),
            meta: { icon: "Guide", title: "浏览" },
          },
        ],
      },
    ],
  },
];

const whiteList = ["/login"]; //不需要登录也能查看的路由,最少需要'/login'，要不然会一直重定向到login

export { asyncRoutes, whiteList, NOT_FOUND_ROUTE };
