import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  const { isAuthorized } = storeToRefs(userStore);
  if (to.name !== "Login" && !isAuthorized.value) {
    return { name: "Login" };
  }
  if (isAuthorized.value && to.name === "Login") {
    return { name: "Dashboard" };
  }
});

export default router;
