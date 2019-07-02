const BN = require("bignumber.js");

// 正弦波関数
// 角周波数ωは1とする。

module.exports = function(t) {
  return Math.sin(+t);
};
