const euler = require("../methods/euler_2");
const sols = require("../functions/secondorderlag");
const step = require("../functions/step");

// 考察1
// このソースコードはオイラー法のものである。
// また、ステップ応答である。

// ξの値は配列zetaの内容とする。
const zeta = ["0.5", "1", "1.5"];
// また、ωの値はomgの配列の内容とした。
const omg = ["0.5", "1", "1.5"];

function* merger() {
  // 関数のxの値を連結するため
  const lines = zeta.flatMap(zta => omg.map(num => euler(sols(zta, num, step, 1), 0, 0, 0, "0.1", 20)));
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
