const jwt = require("jsonwebtoken");
const config = require("../config/serverConfig");

module.exports = {
  getToken: (user) => {
    // 토큰 생성
    const payload = {
      id: user.id || "",
      name: user.name || "",
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
  //   getRefreshToken: () => {
  //     return jwt.sign({}, secret, {
  //       algorithm: "HS256",
  //       expiresIn: "14d",
  //     });
  //   },
  //   refreshVerify: async (token, userId) => {
  //     // refresh token 검증
  //     const getAsync = promisify(redisClient.get).bind(redisClient);

  //     try {
  //       const data = await getAsync(userId); // refresh token 가져오기
  //       if (token === data) {
  //         try {
  //           jwt.verify(token, secret);
  //           return true;
  //         } catch (err) {
  //           return false;
  //         }
  //       } else {
  //         return false;
  //       }
  //     } catch (err) {
  //       return false;
  //     }
  //   },
};
