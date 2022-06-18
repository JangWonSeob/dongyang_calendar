<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">이메일</label>
        <input v-model="param.email" type="text" id="email" required />
      </div>
      <br />
      <div>
        <label for="password">비밀번호</label>
        <input
          v-model="param.password"
          type="password"
          id="password"
          required
        />
      </div>
      <br />
      <button type="submit">로그인</button>
    </form>
    <br />
    <div>
      <router-link to="/user/register">회원가입</router-link>
    </div>
  </div>
</template>
<script>
import API_MIXIN from "../../js/api.js";

export default {
  name: "Login",
  mixins: [API_MIXIN],
  components: {},
  data() {
    return {
      param: {
        email: "",
        password: "",
      },
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    login() {
      this.API_CALL_POST("/user/login", this.param, (result, message, data) => {
        if (!result) {
          alert(message);
          return false;
        }
        console.log("data login", data);
        // 세션 스토리지에 저장
        sessionStorage.setItem("accessToken", data.accessToken || "");
        sessionStorage.setItem("userName", data.userName || "");
        sessionStorage.setItem("role", data.role || "");
        sessionStorage.setItem("isUser", data.isUser || false);
        this.$router.push({ path: "/calendar/list" });
      });
    },
  },
};
</script>
<style scoped></style>
