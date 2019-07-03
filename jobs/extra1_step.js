const euler = require("../methods/euler_2");
const sols = require("../functions/secondorderlag");
const step = require("../functions/step");

// 考察1
// このソースコードはオイラー法のものである。
// また、ステップ応答である。

// ξの指示が無いため、ξ=1とする。
// また、ωの値はomgの配列の内容とした。
const omg = ["0.5", "1", "1.5"];

function* merger() {
  // 関数のxの値を連結するため
  const lines = omg.map(num => euler(sols(1, num, step, 1), 0, 0, 0, "0.1", 20));
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
