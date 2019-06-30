// オイラー法 二次用
// 注意: このプログラムは⊿tの項をfuncとして括り出している。
// その部分はfunctions/secondorderlag.jsを参照されたい。
const BN = require("bignumber.js");
module.exports = function*(func, x, y, t, h, len) {
  x = new BN(x);
  y = new BN(y);
  t = new BN(t);
  h = new BN(h);
  len = new BN(len);
  //console.log(x,t,h,len)
  const iter = +len.div(h);
  yield [t, x, y];
  for (let i = 1; i <= iter; i++) {
    const oldX = x,
      oldY = y,
      oldT = t;
    x = oldX.plus(h.times(oldY));
    y = oldY.plus(h.times(func(oldX, oldY, t)));
    t = t.plus(h);
    yield [t, x, y];
  }
};
