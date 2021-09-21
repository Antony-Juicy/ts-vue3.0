// private, protected, public 访问类型

// public 允许我在类的内外被调用
// private 允许在类内被使用
// protected 允许在类内及继承的子类中使用

// class Person {
//   public name: string;
//   public sayHi() {
//     this.name;
//     console.log('hi');
//   }
//   private sayABC() {
//     this.name;
//   }
// }

// class Teacher extends Person {
//   public sayBye() {
//     this.sayHi();
//   }
// }

// const person = new Person();
// person.name = 'dell';
// console.log(person.name);
// person.sayHi();


// constructor
// class Person {
//   // 传统写法
//   // public name: string;
//   // constructor(name: string) {
//   //   this.name = name;
//   // }

//   // 简化写法
//   constructor(public name: string) {}
// }
// const person = new Person('dell');
// console.log(person.name);



class Person {
  constructor(public name: string) {}
}

class Teacher extends Person {
  constructor(public age: number) {
    super('dell');   //有构造器 需要 调父类的构造函数super
  }
}

const teacher = new Teacher(28);
console.log(teacher.age);  //28
console.log(teacher.name);  //dell
  