class Personr{
  name = 'dell';
  getName() {
    return this.name;
  }
}

class Teacherw extends Personr{
  getTeacherName() {
    return 'Teacher';
  }
  getName() {  // 重写修改父类 属性
    return super.getName() + 'l123';   //super  调用修改后的 父类方法
  }
}

const teacherr = new Teacherw();

console.log(teacherr.getName());  //dell123
console.log(teacherr.getTeacherName());   //Teacher
