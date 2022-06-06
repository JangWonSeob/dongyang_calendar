<template>
  <div></div>
</template>
<script>
export default {
  name: "Logout",
  components: {},
  data() {},
  setup() {},
  created() {},
  mounted() {
    this.logout();
  },
  unmounted() {},
  methods: {
    logout() {
      console.log("logout");
      sessionStorage.removeItem("accessToken");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style scoped></style>
