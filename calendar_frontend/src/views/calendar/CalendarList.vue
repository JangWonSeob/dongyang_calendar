<template>
  <div class="container">
    <div class="text-end">
      <label for="hidden">주말 표시여부</label>
      <input
        id="hidden"
        type="checkbox"
        :checked="calendarOptions.weekends"
        @change="handleWeekendsToggle"
      />
    </div>
    <br />
    <FullCalendar :options="calendarOptions" @click="handleSelect" />
    <button type="button" @click="popup">클릭</button>
    <div>
      <!-- <div class="modal">
        <button onclick="CloseModal();">
          <img src="icon_X_2XL.svg" alt="" />
        </button>
        <h1>- Happy New Year 2021 -</h1>
        <h2>2021년 신축년 (辛丑年)</h2>
        <h2>새해 복 많이 받으세요!</h2>
        <figure><img src="ricecake.jpg" alt="" /></figure>
      </div> -->
    </div>
  </div>
</template>
<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite/
import FullCalendar from "@fullcalendar/vue3";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";

import { INITIAL_EVENTS, createEventId } from "../../js/evnet-util.js";

export default {
  components: {
    FullCalendar,
  },
  mounted() {
    console.log(new Date(2022, 10, 2).toISOString());
    console.log(new Date().toString());
    console.log(new Date().toLocaleDateString().replace(/T.*$/, ""));
  },
  data() {
    return {
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
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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
    handleWeekendsToggle() {
      // 주말 표시여부
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo) {
      // 추가
      // this.$router.push({path:'/calendar/add'});
      console.log("handleDateSelect");
      console.log(selectInfo.startStr);
      const dateArr = selectInfo.startStr.split("-");
      console.log(dateArr);
      this.$router.push({
        path:
          "/calendar/add/" + dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2],
      });
      // let title = prompt("Please enter a new title for your event");
      // let calendarApi = selectInfo.view.calendar;
      // calendarApi.unselect(); // clear date selection
      // if (title) {
      //   calendarApi.addEvent({
      //     id: createEventId(),
      //     title,
      //     start: selectInfo.startStr,
      //     end: selectInfo.endStr,
      //     allDay: selectInfo.allDay,
      //   });
      // }
    },
    handleEventClick(clickInfo) {
      // 삭제기능
      console.log("handleEventClick");
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    handleSelect() {
      console.log(this.calendarOptions);
    },
    popup() {
      var url = "popup.html";
      var name = "popup test";
      var option =
        "width = 500, height = 500, top = 100, left = 200, location = no";
      window.open(url, name, option);
    },
  },
};
</script>
<style scoped>
.container.CloseModal {
  display: none;
}
.text-end {
  text-align: right;
}

/* 모달 css */
button {
  background-color: #f9b514;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal .bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.modalBox {
  position: absolute;
  background-color: #fff;
  width: 400px;
  height: 200px;
  padding: 15px;
}

.modalBox button {
  display: block;
  width: 80px;
  margin: 0 auto;
}

.hidden {
  display: none;
}
</style>
