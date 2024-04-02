import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/RegistrationView.vue"
      ),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../layouts/DashboardLayout.vue"
      ),
    children: [
      {
        path: "user",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/UserView.vue"),
      },
    ],
  },
];

export default routes;
