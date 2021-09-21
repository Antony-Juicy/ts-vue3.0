// 数组
const arr: (number | string)[] = [1, '2', 3];
const stringArr: string[] = ['a', 'b', 'c'];
const undefinedArr: undefined[] = [undefined];



// type alias 类型别名
type User = { name: string; age: number };


class Teacherr {
  name: string;
  age: number;
}

const objectArr: Teacherr[] = [
  new Teacherr(),
  {
    name: 'dell',
    age: 28
  }
];


// 元组 tuple    数量个数有限的数组 有固定的形式
const teacherInfo: [string, string, number] = ['Dell', 'male', 18];

// csv 常用与 导出的文件   csv
const teacherList: [string, string, number][] = [['dell', 'male', 19], ['sun', 'female', 26], ['jeny', 'female', 38]];
