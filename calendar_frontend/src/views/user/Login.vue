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
      <router-link to="/">회원가입</router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Login",
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
    API_CALL_GET(url, callback) {
      callback = callback || function () {};

      const apiUrl = "http://localhost:5000/api" + url;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response);
          response = response || {};
          response.data = response.data || {};
          response.data.body = response.data.body || {};

          response.data.header = response.data.header || {};
          response.data.header.message = response.data.header.message || "";
          response.data.header.result = response.data.header.result || false;
          if (response.data.header.result !== true) {
            response.data.header.result = false;
          }
          callback(
            response.data.header.result,
            response.data.header.message,
            response.data.body
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    API_CALL_POST(url, param, callback) {
      callback = callback || function () {};

      const apiUrl = "http://localhost:5000/api" + url;
      axios
        .post(apiUrl, param)
        .then((response) => {
          console.log(response);
          response = response || {};
          response.data = response.data || {};
          response.data.body = response.data.body || {};

          response.data.header = response.data.header || {};
          response.data.header.message = response.data.header.message || "";
          response.data.header.result = response.data.header.result || false;
          if (response.data.header.result !== true) {
            response.data.header.result = false;
          }
          callback(
            response.data.header.result,
            response.data.header.message,
            response.data.body
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      this.API_CALL_POST("/user/login", this.param, (result, message, data) => {
        console.log(result);
        console.log(message);
        console.log(data);
        if (!result) {
          alert(message);
          return false;
        }

        console.log(data.accessToken);
        // 세션 스토리지에 저장
        sessionStorage.setItem("accessToken", data.accessToken || "");
        this.$router.push({ path: "/calendar/list" });
      });
    },
  },
};
</script>
<style scoped></style>
