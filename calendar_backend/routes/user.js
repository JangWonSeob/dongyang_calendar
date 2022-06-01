const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../modules/user");
const { jsonSuccess, jsonSuccessInfo, jsonFail } = require("../model/result");
const stringUtil = require('../util/stringUtil');

// const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

// router.get("/auth", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//     image: req.user.image,
//   });
// });

router.post("/register", (req, res) => {
  // console.log(req.body);
  if(stringUtil.isEmpty(req.body.email) || stringUtil.isEmpty(req.body.password)) {
    return jsonFail(res, '입력되지 않은 값이 있습니다.');
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) return jsonFail(res, '이미 존재하는 이메일입니다.');

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return jsonFail(res, err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) return jsonFail(res, err);
          req.body.password = hash;
          const user = new User(req.body);
          user.save((err, doc) => {
            if (err) return jsonFail(res, err);
            return jsonSuccess(res);
          });
        });
      });
  })
});

router.post("/login", (req, res) => {
  console.log(req.body.password);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return jsonFail(res, "유저 정보를 찾을 수 없습니다.");

    console.log(user);

    if (req.body.password === undefined && req.body.password === "") {
      return jsonFail(res, "비밀번호를 입력해주세요.");
    }

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return jsonFail(res, err);

      console.log(isMatch);

      if (isMatch) {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token).status(200).json({
            success: true,
            userId: user._id,
          });
        });
      } else {
        return jsonFail(res, "비밀번호가 일치하지 않습니다.");
      }
    });
  });
});

// router.get("/logout", auth, (req, res) => {
//   User.findOneAndUpdate(
//     { _id: req.user._id },
//     { token: "", tokenExp: "" },
//     (err, doc) => {
//       if (err) return res.json({ success: false, err });
//       return res.status(200).send({
//         success: true,
//       });
//     }
//   );
// });

module.exports = router;
