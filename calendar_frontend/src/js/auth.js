import axios from "axios";

export default {
  created() {},
  mounted() {
    console.log("AUTH_MININ");
  },
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
  },
};
