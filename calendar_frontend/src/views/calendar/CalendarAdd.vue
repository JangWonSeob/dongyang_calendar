<template>
  <div>
    <h1>일정 등록</h1>
    <!-- <div>
      <p>{{ searchParam.searchYear }}년 {{ searchParam.searchMonth }}월</p>
    </div> -->
    <form @submit.prevent="save">
      <div>
        <label for="title">제목</label><input v-model="param.title" id="title" type="text" />
      </div>
      <br/>
      <div>
        <div>일정</div>
        <input v-model="param.startDate" id="startDate" type="datetime-local" /> ~ <input v-model="param.endDate" id="endDate" type="datetime-local" />
      </div>
      <br/>
      <div>
        <label for="description">내용</label><textarea v-model="param.description" id="description"></textarea>
      </div>
      <br/>
      <button type="submit">저장</button>
    </form>
  </div>
</template>
<script>
import API_MIXIN from "../../js/api.js";

export default {
  mixins: [API_MIXIN],
  name: "CalenarAdd",
  components: {},
  data() {
    return {
      param: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
      },
      searchParam: {
        searchYear: 0,
        searchMonth: 0,
        searchDay: 0,
      },
    };
  },
  setup() {},
  created() {
  },
  mounted() {
  },
  methods: {
    save() {
      console.log(this.param);
      this.API_CALL_POST('/calendar/save', this.param, (result, message, data) => {
        console
      })
 
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
