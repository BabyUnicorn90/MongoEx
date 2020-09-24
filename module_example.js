//외부 모듈에서 객체 받아오기: require

//test_module1

/*
const add = require('./modules/test_module1').add;

const square = require("./modules/test_module1").square;

console.log("add: ", add(10, 20));
console.log("square: ", square(20));
*/

//test_module2 --모듈 전체 불러오기

const area = require("./modules/test_module2"); 

console.log(area.square(20));
console.log(area.circle(10));