const express = require("express");
const router = express.Router();
const { Calendar } = require("../modules/calendar");
const { isLogin, getUserId } = require("../util/login-util");
const { jsonSuccess, jsonSuccessInfo, jsonFail } = require("../model/result");

// 저장 API - 로그인한 유저
router.post("/save", isLogin, (req, res) => {
  getUserId(req, (userId, parentsId, role) => {
    const key = userId;
    // 만약 팀원 아이디라면 팀장 아이디로 저장
    if (role === "user2") {
      key = parentsId;
    }
    req.body.userId = key;
    const calendar = new Calendar(req.body);
    console.log(calendar);
    calendar.save((err, doc) => {
      if (err) return jsonFail(res, err);
      return jsonSuccess(res);
    });
  });
});

// 목록 API - 로그인한 유저
router.get("/list", isLogin, (req, res) => {
  getUserId(req, (userId, parentsId, role) => {
    let key = userId;

    // 만약 팀원 아이디라면 팀장 아이디로 저장
    if (role === "user2") {
      key = parentsId;
    }

    Calendar.find(
      {
        userId: Object(key),
      },
      (err, list) => {
        if (err) {
          console.log(err);
          return jsonFail(res, err.message);
        }

        console.log(list);
        return jsonSuccessInfo(res, list);
      }
    );
  });
});

// 단건 API - 로그인한 유저
router.get("/detail", isLogin, (req, res) => {
  const { id } = req.query;

  Calendar.findById(id, (err, detail) => {
    if (err) {
      console.log(err);
      return jsonFail(res, err.message);
    }

    console.log(detail);
    return jsonSuccessInfo(res, detail);
  });
});

// 수정 API - 로그인한 유저
router.post("/update", isLogin, (req, res) => {
  const { id } = req.body;

  getUserId(req, (userId, parentsId, role) => {
    const key = userId;
    // 만약 팀원 아이디라면 팀장 아이디로 저장
    if (role === "user2") {
      key = parentsId;
    }
    req.body.userId = key;

    let param = {};
    if (req.body.title) param.title = req.body.title;
    if (req.body.description) param.description = req.body.description;
    if (req.body.start) param.start = req.body.start;
    if (req.body.end) param.end = req.body.end;

    console.log(param);
    Calendar.findOneAndUpdate(
      { _id: Object(id), userId: Object(userId) },
      param,
      (err, doc) => {
        if (err) return jsonFail(res, err);
        return jsonSuccess(res);
      }
    );
  });
});

// 삭제 API - 로그인한 유저
router.get("/delete", isLogin, (req, res) => {
  const { id } = req.query;

  getUserId(req, (userId) => {
    Calendar.findOneAndDelete(
      { _id: Object(id), userId: Object(userId) },
      (err, doc) => {
        if (err) return jsonFail(res, err);
        return jsonSuccess(res);
      }
    );
  });
});

module.exports = router;
