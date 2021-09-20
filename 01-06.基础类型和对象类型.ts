// 基础类型 null, undefined, symbol, boolean, void
const count: number = 123;
const teacherName: string = "Dell";

// 对象类型
class Person {}

const teacher: {
  name: string;
  age: number;
} = {
  name: "Dell",
  age: 18,
};

// 数字必须是数字
const numbers: number[] = [1, 2, 3];

// 必须是对象类型
const dell: Person = new Person();

// 函数必须返回的是 数字类型
const getTotal: () => number = () => {
  return 123;
};
