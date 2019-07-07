// 正弦波関数
// 角周波数ωは1とする。

function withAngularFreq(f) {
  return function(t) {
    return Math.sin(+t * +f);
  };
}

module.exports = withAngularFreq(1);
module.exports.withAngularFreq = withAngularFreq;
