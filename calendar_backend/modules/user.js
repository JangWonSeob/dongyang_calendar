const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  parentsId: {
    type: Schema.Types.ObjectId,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.methods.checkPassword = (plainPassword, cb) => {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// userSchema.methods.generateToken = function (cb) {
//   var user = this;
//   console.log("user", user);
//   console.log("userSchema", userSchema);
//   var token = jwt.sign(user._id.toHexString(), "secret");
//   var oneHour = moment().add(1, "hour").valueOf();

//   user.tokenExp = oneHour;
//   user.token = token;
//   user.save(function (err, user) {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

// userSchema.statics.findByToken = function (token, cb) {
//   var user = this;

//   jwt.verify(token, "secret", function (err, decode) {
//     user.findOne({ _id: decode, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

const User = mongoose.model("User", userSchema);

module.exports = { User };
