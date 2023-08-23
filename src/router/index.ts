import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
    children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/pages/home/index.vue")
        },
        {
          path: "/user",
          name: "User",
          component: () => import("@/pages/user/index.vue")
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

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes,
});

export default router;
