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
  created() {},
  watch: {
    $route(to, from) {
      this.getUserName();
    },
  },
  mounted() {},
  unmounted() {},
  methods: {
    getUserName() {
      // sessionStorage에서 유저정보 가져오기
      this.info.loginYn = false;
      this.info.userName = "";
      if (
        sessionStorage.getItem("userName") !== null &&
        sessionStorage.getItem("userName") !== "" &&
        sessionStorage.getItem("userName") !== undefined
      ) {
        this.info.loginYn = true;
        this.info.userName = sessionStorage.getItem("userName");
      }
      console.log(sessionStorage.getItem("userName"));
    },
    logout() {
      // 로그아웃
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("isUser");
      sessionStorage.removeItem("role");
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
