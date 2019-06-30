const BN = require("bignumber.js");

// 単位ステップ関数
// tが0以上の時のみ1を返す関数である。

module.exports = function(t) {
  t = new BN(t);
  if (t.isZero() || t.isPositive()) {
    return 1;
  } else {
    return 0;
  }
};
