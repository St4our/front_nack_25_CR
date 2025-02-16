import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../components/AppLogin.vue"),
      name: "login",
    },
    {
      path: "/enter-code",
      component: () => import("../components/EnterCode.vue"),
      name: "enterCode",
    },
    {
      path: "/applications",
      component: () => import("../pages/AppApplications.vue"),
      name: "applications",
    },
    {
      path: "/users",
      component: () => import("../pages/AppUsers.vue"),
      name: "users",
    },
    {
      path: "/user",
      component: () => import("../pages/AppUser.vue"),
      name: "user",
    },
    {
      path: "/awards",
      component: () => import("../pages/AppAwards.vue"),
      name: "awards",
    },
    {
      path: "/awards/add",
      component: () => import("../pages/AddAward.vue"),
      name: "awards_add",
    },
    {
      path: "/events",
      component: () => import("../pages/AppEvents.vue"),
      name: "events",
    },
    {
      path: "/events/add",
      component: () => import("../pages/AddEvent.vue"),
      name: "events_add",
    },
    {
      path: "/heroes",
      component: () => import("../pages/AppHeroes.vue"),
      name: "heroes",
    },
    {
      path: "/heroes/add",
      component: () => import("../pages/AddHero.vue"),
      name: "heroes_add",
    },
    {
      path: "/nextgis",
      component: () => import("../pages/NextGis.vue"),
      name: "nextGis",
    },
    {
      path: "/area",
      component: () => import("../pages/AppArea.vue"),
      name: "area",
    },
    {
      path: "/area/add",
      component: () => import("../pages/AddArea.vue"),
      name: "area_add",
    },
    {
      path: "/logs",
      component: () => import("../pages/AppLogs.vue"),
      name: "logs",
    },
  ],
});

export default router;
