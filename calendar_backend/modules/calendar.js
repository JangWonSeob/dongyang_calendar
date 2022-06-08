const mongoose = require("mongoose");

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
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = { Calendar };
