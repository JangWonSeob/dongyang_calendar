const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = mongoose.Schema(
  {
    // 유저 ID
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // 제목
    title: {
      type: String,
    },
    // 내용
    description: {
      type: String,
    },
    // 시작일
    start: {
      type: Date,
    },
    // 끝일
    end: {
      type: Date,
    },
  },
  //생성일, 수정일 자동생성
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = { Calendar };
