<template>
  <div>
    <h1>달력</h1>
    <table class="calendar">
      <thead>
        <tr>
          <th scope="col">일</th>
          <th scope="col">월</th>
          <th scope="col">화</th>
          <th scope="col">수</th>
          <th scope="col">목</th>
          <th scope="col">금</th>
          <th scope="col">토</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="inner">
              <span class="date dimmed">30</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">1</span>
              <em class="text anniversary">국군의 날</em>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">2</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date holiday">3</span>
              <em class="text">개천절</em>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">4</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">5</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">6</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="inner">
              <span class="date holiday">7</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">8</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date holiday">9</span>
              <span class="lunar">음 9.1</span>
              <em class="text holiday">한글날</em>
            </div>
          </td>
          <td class="today">
            <div class="inner">
              <span class="date">10</span>
              <strong class="blind">오늘</strong>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">11</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">12</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">13</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="inner">
              <span class="date holiday">28</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">29</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">30</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">31</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">1</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">2</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">3</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="inner">
              <span class="date holiday">28</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">29</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">30</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">31</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">1</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">2</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">3</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="inner">
              <span class="date holiday">28</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">29</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">30</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">31</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">1</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">2</span>
            </div>
          </td>
          <td>
            <div class="inner">
              <span class="date">3</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CalenarList",
  components: {},
  data() {
    return {
      searchParam: {
        searchYear: 0,
        searchMonth: 0,
      },
      dayList: [],
    };
  },
  setup() {},
  created() {
    this.initCalenar();
  },
  mounted() {
    this.getDayList();
  },
  unmounted() {},
  methods: {
    initCalenar() {
      const now = new Date();

      this.searchParam.searchYear = now.getFullYear();
      this.searchParam.searchMonth = now.getMonth() + 1;

      console.log("year:", this.searchParam.searchYear);
      console.log("month:", this.searchParam.searchMonth);
    },
    getDayList() {
      let arr = [];
      const beforeMonth = new Date(
        this.searchParam.searchYear,
        this.searchParam.searchMonth,
        0
      );
      const currentMonthFirstDay = new Date(
        this.searchParam.searchYear,
        this.searchParam.searchMonth,
        0
      );

      console.log("beforeMonth:", beforeMonth);

      console.log("currentMonthFirstDay: ", currentMonthFirstDay);

      // return arr;
    },
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
    register() {
      console.log(this.param);

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
<style scoped>
body {
  font-family: NanumSquare, "나눔 스퀘어", sans-serif;
}

.calendar caption {
  margin: 10px;
  font-weight: bold;
}

.calendar {
  border-collapse: collapse;
  table-layout: fixed;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  margin: 0 auto;
  width: 1500px;
  font-size: 12px;
}

.calendar th,
.calendar td {
  border-top: 1px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
}

th {
  height: 25px;
  color: #777;
}

.date {
  font-weight: bold;
}

.inner {
  position: relative;
  height: 100px;
  padding: 5px;
}

.date.dimmed {
  color: #e7e7e7;
}

em.text {
  display: block;
  font-style: normal;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.holiday {
  color: #f44e4e;
}

.anniversary {
  color: #00c;
}

.lunar {
  position: absolute;
  top: 6px;
  right: 6px; /* inner에 패딩 5px 있는걸 감안하여 6으로 했음 */
  color: #bababa;
}

.today {
  border: 1px solid #e0e0bf;
  background-color: #ffffd5;
}

/* IR */

.blind {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}
</style>
