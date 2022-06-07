import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import axios from "axios";
// import ContactView from "../views/ContactView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { authRequired: "any" },
  },
  // {
  //   path: "/contact",
  //   name: "contact",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "contact", webpackPrefetch:true */ "../views/ContactView.vue"
  //     ),
  //   // component: ContactView,
  // },
  {
    path: "/user/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/Login.vue"),
    meta: { authRequired: "notLoginUser" },
  },
  {
    path: "/basic",
    name: "Basic",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Basic.vue"),
    meta: { authRequired: "any" },
  },
  {
    path: "/user/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/Register.vue"),
    meta: { authRequired: "notLoginUser" },
  },
  {
    path: "/user/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/Logout.vue"),
    meta: { authRequired: "loginUser" },
  },
  {
    path: "/calendar/list",
    name: "CalenarList",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/calendar/CalenarList.vue"
      ),
    meta: { authRequired: "loginUser" },
  },
  {
    path: "/calendar/detail/:year/:month/:day",
    name: "CalenarDetail",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/calendar/CalenarDetail.vue"
      ),
    meta: { authRequired: "loginUser" },
  },
  {
    path: "/calendar/add/:year/:month/:day",
    name: "CalenarAdd",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/calendar/CalenarAdd.vue"
      ),
    meta: { authRequired: "loginUser" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const checkUser = (callback) => {
  callback = callback || function () {};
  axios
    .create({
      baseURL: "http://localhost:5000/api",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .get("/user/auth")
    .then((response) => {
      console.log(response);
      const data = response.data || {};
      const header = data.header || {};
      const result = header.result || false;
      const message = header.message || "";
      const body = data.body || {};

      callback(result, message, body);
    })
    .catch((err) => {
      console.log(err);
      callback(false, err.message, {});
    });
};

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.authRequired === "any";
    })
  ) {
    next();
  } else if (
    to.matched.some(function (routeInfo) {
      console.log(routeInfo.meta.authRequired);
      return routeInfo.meta.authRequired === "loginUser";
    })
  ) {
    checkUser((result, message, data) => {
      console.log(result);
      console.log(message);
      console.log(data);

      if (!result) {
        alert(message);
        next({ path: "/" });
        return false;
      }

      next();
    });
  } else if (
    to.matched.some(function (routeInfo) {
      console.log(routeInfo.meta.authRequired);
      return routeInfo.meta.authRequired === "notLoginUser";
    })
  ) {
    checkUser((result, message, data) => {
      console.log(result);
      console.log(message);
      console.log(data);

      if (result) {
        next({ path: "/calendar/list" });
        return false;
      }

      next();
    });
  }
});

export default router;
