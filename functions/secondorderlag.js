const BN = require("bignumber.js");

// 二次遅れ系
// 注意: 再利用性を高めるため、単位ステップ関数および単位インパルス関数は、
// それぞれfunctions/step.jsおよびfunctions/impulse.jsに括り出している。

// 二次遅れ系のパラメーターについて
// zeta: 減衰係数 (ゼータ)
// omega: 非減衰固有角周波数 (オメガ)
// func: 入力関数 (単位ステップ関数や単位インパルス関数、正弦波関数など)
// b: ゲイン
module.exports = function(zeta, omega, func, b) {
  zeta = new BN(zeta);
  omega = new BN(omega);
  b = new BN(b);

  // 高速化のため、先に係数を計算しておく
  // (bignumber.jsを使っている時点で遅いと考えてはいけない)
  const ptY = zeta.times(omega).times(-2);
  const ptX = omega.pow(2).negated();
  const ptFunc = omega.pow(2).times(b);

  return function(x, y, t) {
    x = new BN(x);
    y = new BN(y);
    t = new BN(t);
    return BN.sum(ptY.times(y), ptX.times(x), ptFunc.times(func(t)));
  };
};
