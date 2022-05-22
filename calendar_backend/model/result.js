const jsonSuccess = (res) => {
  return res.json({ success: true });
};

const jsonSuccessInfo = (res, data) => {
  return res.json({ success: true, data });
};

const jsonFail = (res, message) => {
  return res.json({ success: false, message });
};

module.exports = { jsonSuccess, jsonSuccessInfo, jsonFail };
