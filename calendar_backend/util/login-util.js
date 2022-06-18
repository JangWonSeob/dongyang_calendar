const jwt = require("jsonwebtoken");
const config = require("../config/serverConfig");
const { getToken, verify } = require("../util/jwt-util");

module.exports = {
  // 로그인 여부 체크 메서드
  isLogin: (req, res, next) => {
    req.headers = req.headers || {};
    req.headers.authorization =
      req.headers.authorization == undefined ? "" : req.headers.authorization;

    verify(
      req.headers.authorization.split("Bearer ")[1] || "",
      (result, message, info) => {
        if (!result) {
          console.log("message: ", message);
          return false;
        }
        next();
      }
    );
  },
  // 회원 아이디 체크 메서
  getUserId: (req, callback) => {
    callback = callback || function () {};
    req.headers = req.headers || {};
    req.headers.authorization =
      req.headers.authorization == undefined ? "" : req.headers.authorization;
    verify(
      req.headers.authorization.split("Bearer ")[1] || "",
      (result, message, info) => {
        if (!result) {
          callback("", "", "");
        }
        console.log("info: ", info);
        callback(info.id, info.parentsId, info.role);
      }
    );
  },
};
