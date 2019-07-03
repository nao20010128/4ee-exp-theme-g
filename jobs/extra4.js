const rk = require("../methods/rk_2");
const sols = require("../functions/secondorderlag");
const sine = require("../functions/sine");

// 考察4
// このソースコードは二次遅れ系に正弦波を入力したときの応答を見るものである。
// ルンゲ・クッタ法を用いている。

// ξの指示が無いため、ξ=0.6とする。
// ωの指示が無いため、ω=1とする。

for (let line of rk(sols("0.6", 1, sine, 1), 0, 0, 0, "0.1", 30)) {
  console.log(line.map(a => +a).join(" "));
}
