require("nan");
console.log("require - finished \"nan\"");
const  { hello } = require("../cpp/hello.node");
console.log("require - finished \"hello\"");

const timer_string_0 = "c++ hello";
console.time(timer_string_0);
hello();
console.timeEnd(timer_string_0);

const timer_string_1 = "javascript hello";
console.time(timer_string_1);
let var0 = 0;
for(let index = 0; index < 1000000; index++) {
    var0 = index;
}
console.log("hello");
console.timeEnd(timer_string_1);

