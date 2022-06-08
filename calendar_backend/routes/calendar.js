const express = require("express");
const router = express.Router();
const { isLogin } = require("../util/login-util");
const { jsonSuccess, jsonSuccessInfo, jsonFail } = require("../model/result");

router.post("/save", isLogin, (req, res) => {
  console.log(req.body);
  console.log("call save");
});

router.post("/login", (req, res) => {
  console.log(req.body.password);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return jsonFail(res, "유저 정보를 찾을 수 없습니다.");

    if (req.body.password === undefined && req.body.password === "") {
      return jsonFail(res, "비밀번호를 입력해주세요.");
    }

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return jsonFail(res, err);
      if (isMatch) {
        return jsonSuccessInfo(res, {
          accessToken: getToken(user),
          userName: user.name,
        });
      } else {
        return jsonFail(res, "비밀번호가 일치하지 않습니다.");
      }
    });
  });
});

module.exports = router;
