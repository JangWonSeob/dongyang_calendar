// return 성공시
const jsonSuccess = (res) => {
  return res.json({ header: { result: true, message: "" }, body: {} });
};

// return 성공시(정보 포함)
const jsonSuccessInfo = (res, data) => {
  return res.json({ header: { result: true, message: "" }, body: data });
};

// return 실패시(메시지 포함)
const jsonFail = (res, message) => {
  return res.json({ header: { result: false, message: message }, body: {} });
};

module.exports = { jsonSuccess, jsonSuccessInfo, jsonFail };
