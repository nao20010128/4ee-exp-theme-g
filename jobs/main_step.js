const BN = require("bignumber.js");
const euler = require("../methods/euler_2");
const sols = require("../functions/secondorderlag");
const step = require("../functions/step");

// 二次遅れ系計算の本体
// このソースコードはオイラー法のものである。
// また、ステップ応答である。

// 指導書の指示より、ω=1とする。
// また、ξの値はxiiの配列の内容とした。
const xii = ["0.5", "1", "1.5"].map(a => new BN(a));

function* merger() {
  // 関数のxの値を連結するため
  const lines = xii.map(num => euler(sols(num, 1, step, 1), 0, 0, 0, new BN("0.1"), 20));
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
