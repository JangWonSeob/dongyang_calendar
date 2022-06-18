import axios from "axios";

export default {
  created() {},
  mounted() {
    console.log("API_MININ");
  },
  methods: {
    // 서버 통신 GET
    API_CALL_GET(url, callback) {
      callback = callback || function () {};

      axios
        .create({
          baseURL: "http://localhost:5000/api",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        })
        .get(url)
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
    // 서버 통신 POST
    API_CALL_POST(url, param, callback) {
      callback = callback || function () {};

      axios
        .create({
          baseURL: "http://localhost:5000/api",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        })
        .post(url, param)
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
  },
};
