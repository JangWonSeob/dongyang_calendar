<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <div v-if="!info.loginYn">
        <router-link to="/user/login">로그인</router-link>
        <router-link to="/user/register">회원가입</router-link>
      </div>
      <div v-else>
        <span>{{ info.userName }} 님</span>
        <button @click="logout">로그아웃</button>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavVue",
  components: {},
  data() {
    return {
      info: {
        userName: "",
        loginYn: false,
      },
    };
  },
  setup() {},
  created() {
    // this.auth();
  },
  watch: {
    $route(to, from) {
      this.auth(to.path, from.path);
      console.log(this.info);
    },
  },
  mounted() {},
  unmounted() {},
  methods: {
    auth(path, beforePath) {
      const any = ["/", "/calendar/full"];
      const notLogin = ["/user/login", "/user/register"];

      if (!(any.indexOf(path) < 0)) {
        // 모든 권한
      } else if (!(notLogin.indexOf(path) < 0)) {
        // 로그인 하지 않은 유저만 가능 한 곳
        this.authCall((result, message, data) => {
          this.info.loginYn = result;

          if (result) {
            alert("접근권한이 없습니다.");
            this.$router.push({ path: beforePath });
            return false;
          }

          this.$router.push({ path: path });
        });
      } else {
        // 로그인 유저만 가능 한 곳
        this.authCall((result, message, data) => {
          this.info.loginYn = result;

          if (!result) {
            alert(message);
            this.$router.push({ path: beforePath });
            return false;
          }
          console.log(data);
          this.info.userName = data.name || "";
          this.$router.push({ path: path });
        });
      }
    },
    authCall(callback) {
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
    },
    logout() {
      console.log("logout");
      sessionStorage.removeItem("accessToken");
      this.info.loginYn = false;
      this.info.userName = "";
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  margin: 0 10px;
}
</style>
