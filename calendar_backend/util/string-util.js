const isEmpty = (text) => {
  if (text === null || text === undefined) {
    return true;
  }

  const trimText = text.replace(/\s*/g, "");

  return trimText === "";
};

module.exports = { isEmpty };
