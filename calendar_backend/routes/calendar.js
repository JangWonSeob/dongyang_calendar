const express = require("express");
const router = express.Router();
const { Calendar } = require("../modules/calendar");
const { isLogin, getUserId } = require("../util/login-util");
const { jsonSuccess, jsonSuccessInfo, jsonFail } = require("../model/result");
const moment = require("moment");

router.post("/save", isLogin, (req, res) => {
  console.log(req.body);
  console.log("call save");

  getUserId(req, (userId) => {
    req.body.userId = userId;
    const calendar = new Calendar(req.body);
    console.log(calendar);
    calendar.save((err, doc) => {
      if (err) return jsonFail(res, err);
      return jsonSuccess(res);
    });
  });
});

router.get("/list", isLogin, (req, res) => {
  console.log(req.body.searchStartDate);

  getUserId(req, (userId) => {
    Calendar.find(
      {
        userId: Object(userId),
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

// detail 메서드
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

// 수정 메서드
router.post("/update", isLogin, (req, res) => {
  const { id } = req.body;

  console.log(req.body);

  getUserId(req, (userId) => {
    req.body.userId = userId;

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

// 삭제 메서드
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
