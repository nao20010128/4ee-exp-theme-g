const fs = require("fs");
const rk = require("../methods/rk_2");
const sols = require("../functions/secondorderlag");
const sine = require("../functions/sine");

// 考察5
// このソースコードは時間幅(⊿t)を変えたことにより起こる誤差を見るものである。
// ルンゲ・クッタ法を用いている。

// ξの指示が無いため、ξ=0.6とする。
// ωの指示が無いため、ω=1とする。

const files = [
  {
    name: "tmp/extra5_0.2.txt",
    iter: rk(sols("0.6", 1, sine, 1), 0, 0, 0, "0.2", 30)
  },
  {
    name: "tmp/extra5_0.01.txt",
    iter: rk(sols("0.6", 1, sine, 1), 0, 0, 0, "0.01", 30)
  }
];

function calc(name, iter, cb) {
  const stream = fs.createWriteStream(name);
  for (let line of iter) {
    stream.write(line.map(a => +a).join(" ") + "\n");
  }
  stream.end();
  stream.on("finish", cb);
}

let num = 0;

function next() {
  if (num >= files.length) {
    return;
  }
  console.log(files[num].name);
  calc(files[num].name, files[num].iter, () => {
    num++;
    next();
  });
}
next();
