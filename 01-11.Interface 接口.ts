// interface 和 type 相类似，但并不完全一致
// interface：接口主要用于类型检查，它只是一个结构契约，定义了具有相似的名称和类型的对象结构。除此之外，
// 接口还可以定义方法和事件,声明两个相同接口会合并，interface extends type
// type：不同于interface只能定义对象类型，type声明还可以定义基础类型、联合类型或交叉类型。type可以使用typeof获取实例类型 type x = typeof div type y = string & interface yy{x:1}|
interface Person {
  // readonly name: string;
  ddd: string;
  age?: number;   // 可有可无
  [propName: string]: any;    //可以有其他属性 字符串
  say(): string;   // 方法 返回值是字符串
 }

interface Teacherdd extends Person {    //继承了Person 所有属性
  teach(): string;
}



const getPersonName = (person: Person): void => {
  console.log(person.ddd);
};

const setPersonName = (person:Teacherdd, ddd: string): void => {
  person.ddd = ddd;
};

const person = {
  ddd: 'dell', 
  sex: 'male',
  say() {
    return 'say hello';
  },
  teach(){
    return 'teach';
  }
 
};

getPersonName(person);
setPersonName(person, 'lee'); 

class Use implements Person {
  ddd = 'dell';
  say() {
    return 'hello';
  }
}



interface SayHi {
  (word: string): string;
}
const say: SayHi = (word: string) => {
  return word;
};
