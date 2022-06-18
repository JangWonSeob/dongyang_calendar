<template>
  <div>
    <div>
      <h1>추가 유저 목록</h1>
      <button type="button" @click="goPage">추가하기</button>
    </div>

    <br />
    <table>
      <thead>
        <tr>
          <th>이메일</th>
          <th>유저 이름</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in list" :key="x.id">
          <td>{{ x.email }}</td>
          <td>{{ x.name }}</td>
          <!-- <td><button type="button" @click="updateUser">수정</button></td> -->
          <td>
            <button type="button" @click="deleteUser(x._id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import API_MIXIN from "../../js/api.js";

export default {
  name: "UserList",
  mixins: [API_MIXIN],
  components: {},
  data() {
    return {
      list: [],
      param: {
        email: "",
        name: "",
        password: "",
      },
    };
  },
  setup() {},
  created() {},
  mounted() {
    this.getList();
  },
  unmounted() {},
  methods: {
    // 회원 목록(팀원) 메서드
    getList() {
      this.API_CALL_GET("/user/list", (result, message, data) => {
        if (!result) {
          alert(message);
          return false;
        }

        this.list = data;
      });
    },
    // 회원 삭제(팀원) - 메서드
    deleteUser(id) {
      console.log(id);

      if (!confirm("삭제하시겠습니까?")) {
        return false;
      }

      this.API_CALL_GET("/user/delete?id=" + id, (result, message, data) => {
        if (!result) {
          alert(message);
          return false;
        }

        this.getList();
      });
    },
    goPage() {
      this.$router.push({ path: "/user/add" });
    },
  },
};
</script>
<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}

table,
td,
th {
  border-collapse: collapse;
  border: 1px solid black;
}
tr td {
  width: 125px;
  height: 75px;
}
</style>
