const BN = require("bignumber.js");

// 単位インパルス関数
// t=0の時のみ1を返す関数である。

const pulseTime = 1;
const pulseHeight = 1 / pulseTime;

module.exports = function(t) {
  t = new BN(t);
  if (t.isZero()) {
    return pulseHeight;
  } else {
    return 0;
  }
};
