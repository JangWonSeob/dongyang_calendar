<template>
  <div class="modal" v-if="this.popupYn">
    <div class="overlay">
      <div class="modal-card">
        <button
          style="
            background-color: transparent;
            float: right;
            cursor: pointer;
            border: 0;
          "
          type="button"
          @click="popupClose"
        >
          <img src="../assets/close.png" />
        </button>
        <h1>일정 {{ activeText }}</h1>
        <form @submit.prevent="save">
          <div>
            <label for="title">제목</label
            ><input v-model="param.title" id="title" type="text" required />
          </div>
          <br />

          <div>
            <label for="startDate">시작일</label
            ><input
              v-model="param.startDateStr"
              id="startDate"
              type="datetime-local"
            />
          </div>
          <br />
          <div>
            <label for="endDate">마지막일</label
            ><input
              v-model="param.endDateStr"
              id="endDate"
              type="datetime-local"
            />
          </div>
          <br />
          <div>
            <label for="description">내용</label
            ><textarea v-model="param.description" id="description"></textarea>
          </div>
          <br />

          <div v-if="!updateYn">
            <button type="submit">저장</button>
            <button type="button" @click="popupClose">취소</button>
          </div>
          <div v-else>
            <button type="submit">수정</button>
            <button type="button" v-if="isUser" @click="deleteCalendar">
              삭제
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import API_MIXIN from "../js/api.js";
// import dayjs from "dayjs";

export default {
  mixins: [API_MIXIN],
  props: {
    popupYn: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: String,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    calendarId: {
      type: String,
      default: "",
    },
    updateYn: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  name: "",
  components: {},
  watch: {
    popupYn() {
      if (this.popupYn) {
        if (!this.updateYn) {
          this.activeText = "등록";
        } else {
          this.activeText = "수정";
        }
        // 타입 변환
        // 2022-06-10T14:40Z
        this.param.startDateStr = this.startDate + "T00:00";
        this.param.endDateStr = this.endDate + "T00:00";
      }
    },
    updateYn() {
      // 등록인지 수정인지 여부
      if (this.updateYn) {
        if (this.calendarId !== null && this.calendarId !== "") {
          this.param.id = this.calendarId;
          this.API_CALL_GET(
            "/calendar/detail?id=" + this.calendarId,
            (result, message, data) => {
              console.log(result);
              console.log(message);
              console.log(data);

              if (!result) {
                alert(message);
                this.popupClose();
                return false;
              }

              this.param.title = data.title || "";
              this.param.start = data.start || "";
              this.param.end = data.end || "";
              this.param.description = data.description || "";
              this.param.startDateStr =
                this.param.start.replaceAll("Z", "").replaceAll("z", "") || "";
              this.param.endDateStr =
                this.param.end.replaceAll("Z", "").replaceAll("z", "") || "";
            }
          );
        } else {
          this.popupClose();
        }
      }
    },
  },
  data() {
    return {
      activeText: "",
      param: {
        id: "",
        title: "",
        description: "",
        start: "",
        end: "",
        startDateStr: "",
        endDateStr: "",
      },
      searchParam: {
        searchYear: 0,
        searchMonth: 0,
        searchDay: 0,
      },
    };
  },
  setup() {},
  created() {},
  mounted() {
    console.log("popup montend");
  },
  unmounted() {},
  methods: {
    // 일정 삭제 메서드
    deleteCalendar() {
      if (confirm("삭제하시겠습니까? ")) {
        this.API_CALL_GET(
          "/calendar/delete?id=" + this.calendarId,
          (result, message, data) => {
            if (!result) {
              alert(message);
              return false;
            }

            this.popupClose();
          }
        );
      }
    },
    // 팝업 닫기 메서드
    popupClose() {
      this.param.title = "";
      this.param.description = "";
      this.param.start = "";
      this.param.end = "";
      this.param.startDateStr = "";
      this.param.endDateStr = "";

      this.$emit("popupYn", false);
      this.$emit("updateYn", false);
    },
    // 저장 메서드
    save() {
      if (!confirm("저장하시겠습니까? ")) {
        return false;
      }
      if (this.param.startDateStr === "" || this.param.endDateStr == "") {
        alert("날짜를 입력해주세요");
        return false;
      }
      if (new Date(this.param.startDateStr) > new Date(this.param.endDateStr)) {
        alert("날짜를 확인해주세요");
        return false;
      }
      // 포맷 맞추기

      this.param.start = this.param.startDateStr + "Z";
      this.param.end = this.param.endDateStr + "Z";

      let active = "save";
      if (this.updateYn) {
        active = "update";
      }

      this.API_CALL_POST(
        "/calendar/" + active,
        this.param,
        (result, message, data) => {
          if (!result) {
            alert(message);
            return false;
          }

          this.popupClose();
        }
      );
    },
    // 수정 메서드
    update() {
      if (this.param.startDateStr === "" || this.param.endDateStr == "") {
        alert("날짜를 입력해주세요");
        return false;
      }
      if (new Date(this.param.startDateStr) > new Date(this.param.endDateStr)) {
        alert("날짜를 확인해주세요");
        return false;
      }
      // 포맷 맞추기

      this.param.start = this.param.startDateStr + "Z";
      this.param.end = this.param.endDateStr + "Z";

      this.API_CALL_POST(
        "/calendar/update",
        this.param,
        (result, message, data) => {
          if (!result) {
            alert(message);
            return false;
          }

          this.popupClose();
        }
      );
    },
  },
};
</script>
<style scoped>
.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.overlay {
  opacity: 1;
  background-color: #808080;
}

.modal-card {
  position: absolute;
  top: 20%;
  left: 30%;
  min-width: 40%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
</style>
