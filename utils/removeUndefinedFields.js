module.exports = function removeUndefinedFields(data) {
  for (const key in data) {
    if (data[key] === undefined) {
      delete data[key];
    }
  }
  return data;
};
