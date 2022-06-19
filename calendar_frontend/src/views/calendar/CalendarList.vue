<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <span class="text-end">
        <button type="button" v-if="isUser" @click="goAddUser">
          팀원 추가
        </button>
      </span>
      <span class="text-end">
        <label for="hiddenYn">주말 표시여부</label>
        <input
          id="hiddenYn"
          type="checkbox"
          ref="reference"
          :checked="calendarOptions.weekends"
          @change="handleWeekendsToggle"
        />
      </span>
    </div>

    <br />
    <FullCalendar
      v-if="!popupYn"
      ref="fullCalendar"
      :options="calendarOptions"
    />
    <Popup
      :popupYn="popupYn"
      :startDate="param.startDate"
      :endDate="param.endDate"
      :calendarId="param.id"
      :updateYn="param.updateYn"
      :isUser="isUser"
      @popupYn="closePopup"
      @updateYn="changeStatus"
    />
  </div>
</template>
<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite/
import FullCalendar from "@fullcalendar/vue3";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";

import Popup from "../../components/Popup.vue";
import API_MIXIN from "../../js/api.js";

export default {
  mixins: [API_MIXIN],
  components: {
    FullCalendar,
    Popup,
  },
  watch: {
    popupYn() {
      if (!this.popupYn) {
        setTimeout(() => {
          this.getList();
        }, 500);
      }
    },
  },
  mounted() {
    this.isUser = sessionStorage.getItem("role") === "user" ? true : false;
    this.getList();
  },
  data() {
    return {
      isUser: false,
      changeMonth: false,
      list: [],
      popupYn: false,
      activeStart: "",
      activeEnd: "",
      param: {
        startDate: "",
        endDate: "",
        id: "",
        updateYn: false,
        calenarEvent: {},
      },

      // fullCalendar 설정
      calendarOptions: {
        plugins: [DayGridPlugin, TimGridPlugin, InteractionPlugin, ListPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "dayGridMonth timeGridWeek timeGridDay",
          center: "title",
          right: "prev today next",
        },
        buttonText: {
          today: "오늘",
          month: "월별",
          week: "주별",
          day: "하루",
        },
        initialEvents: this.list,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        height: 800,
      },
    };
  },
  methods: {
    getList() {
      // 목록 가져오기
      this.list = [];
      let calendarApi = this.$refs.fullCalendar.getApi();

      this.API_CALL_GET("/calendar/list", (result, message, data) => {
        data = data || [];

        data.forEach((date) => {
          const parma = {
            id: date._id,
            title: date.title,
            start: this.setDateFormat(date.start),
            end: this.setDateFormat(date.end),
          };

          calendarApi.addEvent(parma);
          this.list.push(parma);
        });
      });
    },
    setDateFormat(date) {
      // 날짜 타입 변경
      return date.replaceAll("Z", "").replaceAll("z", "");
    },
    openPopup(updateYn) {
      // 팝업 열기
      this.popupYn = true;
      this.param.updateYn = updateYn;
    },
    closePopup(data) {
      // 팝업 닫기
      this.popupYn = data;
    },
    changeStatus(data) {
      // 상태 변경
      this.param.updateYn = data;
      this.param.id = "";
    },
    handleWeekendsToggle() {
      // 주말 표시여부
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
    handleDateSelect(selectInfo) {
      // 추가
      this.param.startDate = selectInfo.startStr;
      this.param.endDate = selectInfo.endStr;

      if (confirm("해당 날짜에 일정을 추가하시겠습니까?"))
        this.openPopup(false);
    },
    handleEventClick(clickInfo) {
      this.param.id = clickInfo.event._def.publicId || "";
      this.openPopup(true);
    },
    goAddUser() {
      this.$router.push({ path: "/user/list" });
    },
  },
};
</script>
<style scoped>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.text-end {
  text-align: right;
}

.blk-btn {
  background-color: black;
  color: white;
  cursor: pointer;
}
/* .block {
  display: block;
} */
</style>
