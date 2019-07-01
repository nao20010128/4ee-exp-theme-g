const BN = require("bignumber.js");

// 二次遅れ系
// 注意: 再利用性を高めるため、単位ステップ関数および単位インパルス関数は、
// それぞれfunctions/step.jsおよびfunctions/impulse.jsに括り出している。

// 二次遅れ系のパラメーターについて
// xi: 減衰係数 (クシー)
// omega: 非減衰固有角周波数 (オメガ)
// func: 入力関数 (単位ステップ関数や単位インパルス関数、正弦波関数など)
// b: ゲイン
module.exports = function(xi, omega, func, b) {
  xi = new BN(xi);
  omega = new BN(omega);
  b = new BN(b);

  // 高速化のため、先に係数を計算しておく
  // (bignumber.jsを使っている時点で遅いとは考えてはいけない)
  const ptY = xi.times(omega).times(-2);
  const ptX = omega.pow(2).negated();

  return function(x, y, t) {
    x = new BN(x);
    y = new BN(y);
    t = new BN(t);
    return BN.sum(ptY.times(y), ptX.times(x), b.times(func(t)));
  };
};
