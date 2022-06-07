<template>
  <div>
    <h1>달력</h1>
    <button type="button" @click="beforeMonth">이전달</button>
    <button type="button" @click="nextMonth">다음달</button>
    <div>
      <p>{{searchParam.searchYear}}년 {{searchParam.searchMonth}}월</p>
    </div>
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
        <tr v-for="(dayList, i) in calendarDayList">
          <td v-for="(day,idx) in dayList" :class="{'today' : (now.month === day[0] && now.day === day[1])}">
            <div class="inner">
              <span class="date dimmed" v-if="i === 0 && idx < beforeMonthCount">{{day[1]}}</span>
              <span class="date dimmed" v-else-if="i === (dayListSize - 1) &&  (7 - nextMonthCount) - 1 < idx">{{day[1]}}</span>
              <span class="date" v-else>
                <router-link :to="'/calendar/detail/'+ searchParam.searchYear + '/' + searchParam.searchMonth + '/' + day[1]">
                  {{day[1]}}
                </router-link>
              </span>
            </div>
          </td>
          <!-- <td>
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
          </td> -->
        </tr>
        <!-- <tr>
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
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import API_MIXIN from '../../js/api.js'

export default {
  name: "CalenarList",
  mixins: [API_MIXIN],
  components: {},
  data() {
    return {
      searchParam: {
        searchYear: 0,
        searchMonth: 0,
        searchDay: 0,
      },
      now: {
        month: 0,
        day: 0,
      },
      beforeMonthCount: 0,
      currentMonthCount: 0,
      nextMonthCount: 0,
      dayListSize: 0,
      dayList: [],
    };
  },
  computed: {
        calendarDayList () {
            let dayArr = [];
            let arr = [];
            let length = 0;

            console.log(this.searchParam.searchYear + '/' + this.searchParam.searchMonth);

            const beforeMonth = new Date(this.searchParam.searchYear, this.searchParam.searchMonth - 1, 0);
            const currentStartDay = new Date(this.searchParam.searchYear, this.searchParam.searchMonth - 1, 1);
            const currentLastDay = new Date(this.searchParam.searchYear, this.searchParam.searchMonth, 0);

            this.beforeMonthCount = currentStartDay.getDay()
            for (let i = currentStartDay.getDay() - 1; 0 <= i; i--) {
                arr.push([this.searchParam.searchMonth - 1 ,beforeMonth.getDate() - i]);
            }
            this.currentMonthCount = currentLastDay.getDate();
            for (let i = 0; i < currentLastDay.getDate(); i++) {
                arr.push([this.searchParam.searchMonth, i + 1]);
            }
            this.nextMonthCount = 7 - (arr.length % 7);
            while (arr.length % 7 > 0) {
                this.nextMonthCount = (7 - (arr.length % 7));
                for (let i = 0; i < this.nextMonthCount; i++) {
                    arr.push([this.searchParam.searchMonth + 1, i + 1]);
                }
            }
            
            length = arr.length;

            for (let i = 0; i < length / 7; i++) {
                const arrSplice = arr.splice(0, 7);
                dayArr.push(arrSplice);
            }

            this.dayListSize = dayArr.length;
            return dayArr;
        },
    },
  setup() {},
  created() {
    this.initCalenar();
  },
  mounted() {
  },
  unmounted() {},
  methods: {
    initCalenar() {
      const now = new Date();

      this.searchParam.searchYear = now.getFullYear();
      this.searchParam.searchMonth = now.getMonth() + 1;
      this.now.month = now.getMonth() + 1;
      this.now.day = now.getDate();

      console.log("year:", this.searchParam.searchYear);
      console.log("month:", this.searchParam.searchMonth);
      console.log("day:", this.searchParam.searchDay);
    },
    beforeMonth () {

            let year = Number(this.searchParam.searchYear);
            let month = Number(this.searchParam.searchMonth);

            if (1 < month && month < 13) {
                // 2 ~ 12
                month -= 1;
            } else if (month === 1) {
                year -= 1;
                month = 12;
            }

            this.searchParam.searchYear = year;
            this.searchParam.searchMonth = month;

        },
        nextMonth () {

            let year = Number(this.searchParam.searchYear);
            let month = Number(this.searchParam.searchMonth);

            if (0 < month && month < 12) {
                // 1 ~ 11
                month += 1;
            } else if (month === 12) {
                year += 1;
                month = 1;
            }

            this.searchParam.searchYear = year;
            this.searchParam.searchMonth = month;
        }
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
