<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">이메일</label>
        <input v-model="param.email" type="email" id="email" required />
      </div>
      <div>
        <label for="name">이름</label>
        <input v-model="param.name" type="text" id="name" required />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input
          v-model="param.password"
          type="password"
          id="password"
          minlength="4"
          required
        />
      </div>
      <div>
        <label for="checkPassword">비밀번호확인</label>
        <input
          v-model="checkPassword"
          type="password"
          id="checkPassword"
          minlength="4"
          required
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
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
        name: "",
        password: "",
      },
      checkPassword: "",
    };
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    // 회원가입 메서드
    register() {
      // 비밀번호 비교
      if (this.param.password !== this.checkPassword) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return false;
      }

      this.API_CALL_POST(
        "/user/register",
        this.param,
        (result, message, data) => {
          if (!result) {
            alert(message);
            return false;
          }

          alert("성공적으로 회원가입되었습니다!!");
          this.$router.push({ path: "/user/login" });
        }
      );
    },
  },
};
</script>
<style scoped></style>
