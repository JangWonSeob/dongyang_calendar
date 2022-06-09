const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = { Calendar };
