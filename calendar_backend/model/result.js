const jsonSuccess = (res) => {
  return res.json({ header: { result: true, message: "" }, body: {} });
};

const jsonSuccessInfo = (res, data) => {
  return res.json({ header: { result: true, message: "" }, body: data });
};

const jsonFail = (res, message) => {
  return res.json({ header: { result: false, message: message }, body: {} });
};

module.exports = { jsonSuccess, jsonSuccessInfo, jsonFail };
