const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  // 이름
  name: {
    type: String,
    maxlength: 50,
  },
  // 이메일
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  // 비밀번호
  password: {
    type: String,
    minglength: 5,
  },
  // 부모 ID
  parentsId: {
    type: Schema.Types.ObjectId,
  },
  // 등급
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
