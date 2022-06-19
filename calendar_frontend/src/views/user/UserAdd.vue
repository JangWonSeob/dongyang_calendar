<template>
  <div>
    <h1>팀원 정보 입력</h1>
    <form @submit.prevent="add">
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
      <button type="submit">추가하기</button>
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
    // 회원 추가(팀원) 메서드
    add() {
      // 비밀번호 체크
      if (this.param.password !== this.checkPassword) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return false;
      }

      this.API_CALL_POST("/user/add", this.param, (result, message, data) => {
        if (!result) {
          alert(message);
          return false;
        }

        alert("성공적으로 팀원을 추가하였습니다.");
        this.$router.push({ path: "/user/list" });
      });
    },
  },
};
</script>
<style scoped></style>
