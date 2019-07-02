const BN = require("bignumber.js");
// オイラー法 一次用

module.exports = function*(func, x, t, h, len) {
  x = new BN(x);
  t = new BN(t);
  h = new BN(h);
  len = new BN(len);
  //console.log(x,t,h,len)
  const iter = +len.div(h);
  console.log(iter);
  yield [t, x];
  for (let i = 1; i <= iter; i++) {
    t = t.plus(h);
    x = x.plus(h.times(func(x, t)));
    yield [t, x];
  }
};
