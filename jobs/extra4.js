const BN = require("bignumber.js");
const rk = require("../methods/rk_2");
const sols = require("../functions/secondorderlag");
const sine = require("../functions/sine");

// 考察4
// このソースコードは二次遅れ系に正弦波を入力したときの応答を見るものである。
// ルンゲ・クッタ法を用いている。

// ξの指示が無いため、ξ=0.6とする。
// ωの指示が無いため、ω=1とする。

function* merger() {
  // 関数のxの値を連結するため
  const lines = [rk(sols("0.6", 1, sine, 1), 0, 0, 0, new BN("0.1"), 30)];
  while (true) {
    const next = lines.map(a => a.next());
    if (next[0].done) {
      return;
    }
    const t = next[0].value[0];
    const allX = next.map(a => a.value[1]);
    yield [t, ...allX];
  }
}

for (let line of merger()) {
  console.log(line.map(a => +a).join(" "));
}
