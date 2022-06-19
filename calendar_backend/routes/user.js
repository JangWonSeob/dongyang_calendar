const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../modules/user");
const { getToken, verify } = require("../util/jwt-util");
const { isLogin, getUserId } = require("../util/login-util");
const { jsonSuccess, jsonSuccessInfo, jsonFail } = require("../model/result");

// 권한 체크
router.get("/auth", (req, res) => {
  req.headers = req.headers || {};
  req.headers.authorization =
    req.headers.authorization == undefined ? "" : req.headers.authorization;

  console.log(req.headers.authorization.split("Bearer ")[1] || "");

  verify(
    req.headers.authorization.split("Bearer ")[1] || "",
    (result, message, info) => {
      if (!result) {
        return jsonFail(res, "로그인 후 이용 가능합니다.");
      }
      return jsonSuccessInfo(res, {
        id: info.id,
        name: info.name,
        role: info.role,
      });
    }
  );
});

// 회원가입 - 모든 유저
router.post("/register", (req, res) => {
  if (req.body.password !== undefined && req.body.password !== "") {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return jsonFail(res, err.message);

      if (user) return jsonFail(res, "이미 존재하는 이메일입니다.");

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
    });
  } else {
    return jsonFail(res, "비밀번호를 입력해주세요.");
  }
});

// 회원 추가(팀원) - 로그인한 유저
router.post("/add", isLogin, (req, res) => {
  getUserId(req, (userId, parentsId, role) => {
    if (role !== "user") {
      return jsonFail(res, "권한이 없습니다.");
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return jsonFail(res, err.message);

      if (user) return jsonFail(res, "이미 존재하는 이메일입니다.");

      bcrypt.genSalt(saltRounds, (err, salt) => {
        console.log(req.body.password);
        if (err) return jsonFail(res, err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) return jsonFail(res, err);
          req.body.password = hash;
          req.body.parentsId = userId;
          req.body.role = "user2";
          const user = new User(req.body);
          console.log("save?");
          user.save((err, doc) => {
            if (err) return jsonFail(res, err);
            return jsonSuccess(res);
          });
        });
      });
    });
  });
});

// 로그인 - 모든 유저
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
      if (isMatch) {
        return jsonSuccessInfo(res, {
          accessToken: getToken(user),
          userName: user.name,
          role: user.role,
          isUser: user.role === "user" ? true : false,
        });
      } else {
        return jsonFail(res, "비밀번호가 일치하지 않습니다.");
      }
    });
  });
});

// 회원 목록(팀원) - 로그인한 유저
router.get("/list", isLogin, (req, res) => {
  getUserId(req, (userId) => {
    User.find({ parentsId: Object(userId), role: "user2" }, (err, list) => {
      if (err) return jsonFail(res, err.message);
      console.log("list: " + list);
      return jsonSuccessInfo(res, list);
    });
  });
});

// 회원 삭제(팀원) - 로그인한 유저
router.get("/delete", isLogin, (req, res) => {
  const { id } = req.query;
  getUserId(req, (userId) => {
    User.deleteOne(
      { _id: Object(id), parentsId: Object(userId), role: "user2" },
      (err) => {
        if (err) return jsonFail(res, err.message);
        return jsonSuccess(res);
      }
    );
  });
});

module.exports = router;
