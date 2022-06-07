<template>
  <div>
    <h1>일정 상세</h1>
    <button type="button" @click="beforeMonth">이전달</button>
    <button type="button" @click="nextMonth">다음달</button>
    <div>
      <p>{{searchParam.searchYear}}년 {{searchParam.searchMonth}}월</p>
    </div>
    <div>
     <button @click="goAddPage">일정 추가</button>
    </div>
  </div>
</template>
<script>
import API_MIXIN from '../../js/api.js'

export default {
  mixins: [API_MIXIN],
  name: "CalenarDetail",
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
  setup() {},
  created() {
    const urlArr = location.href.split('/');
    this.searchParam.searchYear = urlArr[5];
    this.searchParam.searchMonth = urlArr[6];
    this.searchParam.searchDay = urlArr[7];

    console.log(this.searchParam);
  },
  mounted() {
  },
  methods: {
    initCalenar() {
      const now = new Date();

      this.searchParam.searchYear = now.getFullYear();
      this.searchParam.searchMonth = now.getMonth() + 1;
      this.now.month = now.getMonth() + 1;
      this.now.day = now.getDate();
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
            nextMonth(){

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

        },
        goAddPage() {
          this.$router.push({path: '/calendar/add/' + this.searchParam.searchYear + '/' + this.searchParam.searchMonth + '/' + this.searchParam.searchDay})
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
