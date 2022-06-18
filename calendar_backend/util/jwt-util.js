const jwt = require("jsonwebtoken");
const config = require("../config/serverConfig");

module.exports = {
  getToken: (user) => {
    // 토큰 생성
    const payload = {
      id: user.id || "",
      name: user.name || "",
      parentsId: user.parentsId || "",
      role: user.role || "",
    };

    return jwt.sign(payload, config.SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  },
  verify: (token, callback) => {
    // 검증
    callback = callback || function () {};
    jwt.verify(token, config.SECRET_KEY, (err, info) => {
      if (err) {
        callback(false, err.message, {});
        return false;
      }

      callback(true, "", info);
    });
  },
};
