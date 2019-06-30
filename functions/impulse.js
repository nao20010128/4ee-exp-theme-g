const BN = require("bignumber.js");

// 単位インパルス関数
// t=0の時のみ1を返す関数である。

module.exports = function(t) {
  t = new BN(t);
  if (t.isZero()) {
    return 1;
  } else {
    return 0;
  }
};
