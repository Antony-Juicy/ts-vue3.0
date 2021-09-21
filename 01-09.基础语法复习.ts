// 基础类型, boolean, number, string, void, undfined, symbol, null
let counts: number;
counts = 123;

// 对象类型, {}, Class, function, []         参数是string      返回的是number
const func = (str: string) => {
  return parseInt(str, 10);
};

//  冒号是类型   等号是函数题执行
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10);
};

const date = new Date();



// 其他的 case
// interface Person {
//   name: "string";
// }


const rawData = '{"name": "dell"}';
const newData: Person = JSON.parse(rawData);

let temp: number | string = 123; // 有可能是number 有可能 string
temp = "456";
