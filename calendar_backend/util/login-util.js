const jwt = require("jsonwebtoken");
const config = require("../config/serverConfig");
const { getToken, verify } = require("../util/jwt-util");

module.exports = {
  isLogin: (req, res, next) => {
    console.log("call isLogin");
    // 토큰 생성
    console.log(req.headers);
    req.headers = req.headers || {};
    req.headers.authorization =
      req.headers.authorization == undefined ? "" : req.headers.authorization;

    console.log(req.headers.authorization.split("Bearer ")[1] || "");

    verify(
      req.headers.authorization.split("Bearer ")[1] || "",
      (result, message, info) => {
        if (!result) {
          console.log(message);
          return false;
        }
        console.log("info: ", info);
        next();
      }
    );
  },
};
