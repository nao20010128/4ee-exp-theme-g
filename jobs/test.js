const BN = require("bignumber.js");

const euler = require("../methods/euler_1");
const test = require("../functions/test");

for (let line of euler(test, 0, 0, new BN("0.0001"), 25)) {
  console.log(line.map(a => +a).join(" "));
}
