import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { authRequired: "any" },
  },
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
    name: "CalendarList",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/calendar/CalendarList.vue"
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

const setUserName = (userName) => {
  if (
    sessionStorage.getItem("userName") != null &&
    sessionStorage.getItem("userName") !== "" &&
    sessionStorage.getItem("userName") !== undefined
  ) {
    sessionStorage.setItem("userName", userName);
  }
};

router.beforeEach((to, from, next) => {
  if (
    // 모든 유저 접근 가능
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.authRequired === "any";
    })
  ) {
    next();
  } else if (
    // 로그인 한 유저 접근 가능
    to.matched.some(function (routeInfo) {
      console.log(routeInfo.meta.authRequired);
      return routeInfo.meta.authRequired === "loginUser";
    })
  ) {
    checkUser((result, message, data) => {
      if (!result) {
        alert(message);
        next({ path: "/" });
        sessionStorage.removeItem("userName");
        return false;
      }

      setUserName(data.name || "");
      next();
    });
  } else if (
    to.matched.some(function (routeInfo) {
      console.log(routeInfo.meta.authRequired);
      return routeInfo.meta.authRequired === "notLoginUser";
    })
  ) {
    // 로그인 한 유저 접근 불가
    checkUser((result, message, data) => {
      console.log(result);
      console.log(message);
      console.log(data);

      if (result) {
        setUserName(data.name || "");
        next({ path: "/calendar/list" });
        return false;
      }

      next();
    });
  }
});

export default router;
