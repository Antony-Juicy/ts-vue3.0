// function add(first: number, second: number): number {
//   return first + second;
// }

// function sayHello(): void {   // 函数没有返回值 空 void
//   console.log('hello');
// }

// function errorEmitter(): never {  这个函数 一直在执行  不可能接受
//   while(true) {}
// }

//  解构赋值 定义类型
function add({ first, second }: { first: number; second: number }): number {
  return first + second;
}

//  解构赋值 定义类型  （参数）：（类型）
function getNumber({ first }: { first: number }) {
  return first;
}

const tot = add({ first: 1, second: 2 });
const cou = getNumber({ first: 1 });
