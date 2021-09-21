// interface 和 type 相类似，但并不完全一致
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
