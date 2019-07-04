const euler = require("../methods/euler_2");
const rk = require("../methods/rk_2");
const sols = require("../functions/secondorderlag");
const step = require("../functions/step");

// 考察3
// このソースコードはオイラー法とルンゲ・クッタ法の出力を比較するものである。
// また、ステップ応答である。

// ξの指示が無いため、配列zetaの内容とする。
const zeta = ["0.6", 1, "2"];
// ωの指示が無いため、ω=1とする。

function* merger() {
  // 関数のxの値を連結するため
  const lines = zeta.map(num => [euler(sols(num, 1, step, 1), 0, 0, 0, "0.1", 20), rk(sols(num, 1, step, 1), 0, 0, 0, "0.1", 20)]).flat();
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
