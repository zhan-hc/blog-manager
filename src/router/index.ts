import { useCommonStore } from "@/store/common";
import { addPageToRouter } from "@/utils/route";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/pages/index.vue"),
    children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/pages/home/index.vue")
        },
        {
          path: "/statistics",
          name: "Statistics",
          component: () => import("@/pages/statistics/index.vue")
        },
        {
          path: "/user",
          name: "User",
          component: () => import("@/pages/system/user.vue")
        },
        {
          path: "/role",
          name: "Role",
          component: () => import("@/pages/system/role.vue")
        },
        {
          path: "/article",
          name: 'Article',
          component: () => import("@/pages/article/index.vue"),
        },
        {
          path: "/category",
          name: 'ArticleCategory',
          component: () => import("@/pages/article/category.vue"),
        },
        {
          path: "/tag",
          name: 'ArticleTag',
          component: () => import("@/pages/article/tag.vue"),
        },
        {
          path: "/navType",
          name: "navType",
          component: () => import("@/pages/nav/navType.vue")
        },
        {
          path: "/navLink",
          name: "navLink",
          component: () => import("@/pages/nav/navLink.vue")
        },
        {
          path: "/project",
          name: "project",
          component: () => import("@/pages/project/index.vue")
        }
    ]
  },
  {
    path: "/articleDetail/:id?",
    name: 'ArticleDetail',
    component: () => import("@/pages/article/article-detail.vue"),
  },
  {
    path: "/login",
    name: 'Login',
    component: () => import("@/pages/login.vue"),
  }
];

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: 'Login',
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/404",
    name: '404',
    component: () => import("@/pages/404.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
});

router.beforeEach((to, from, next)=> {
  const { addRouters } = useCommonStore()
  if (!addRouters) {
    addPageToRouter()
    next({ ...to }) // 确保路由已完成
  } else {
    if (to.matched.length === 0) {
      next({ name: '404' })
    }
    next()
  }
})

export default router;
