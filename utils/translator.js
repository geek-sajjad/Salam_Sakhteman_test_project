const dictionary = require('../dictionaries/product');

module.exports = function (obj) {
  const newObj = { ...obj };
  Object.keys(dictionary).forEach(key => {
    if (obj.hasOwnProperty(key)) {
      newObj[dictionary[key]] = obj[key];
      delete newObj[key];
    }
  });
  return newObj;
};
