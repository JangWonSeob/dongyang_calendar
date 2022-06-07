const mongoose = require("mongoose");

const calendarSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: String,
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = { Calendar };
