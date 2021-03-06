[TOC]

# VUE

> 读音：[vjuː]，view

## 了解VUE

这两年国内最火的前端框架当属Vue.js了，很多使用过vue的程序员这样评价它，“vue.js兼具angular.js和react.js的优点，并剔除了它们的缺点”。授予了这么高的评价的vue.js，也是开源世界华人的骄傲，因为它的作者是位中国人–尤雨溪（Evan You）。 

Vue.js 是一个基于MVVM模式的一套渐进式框架。它是以数据驱动和组件化的思想构建的，采用自底向上增量开发的设计。相比于Angular.js，Vue.js提供了更加简洁、更易于理解的API，使得我们能够快速地上手并使用Vue.js

### 前端框架历史

* jquery阶段（2006-2013）
    - 特点：节点操作简单易用，浏览器兼容
* angular阶段（2009-2014）
    - 特点：MVC模式，双向数据绑定，依赖注入
* react阶段（2013）
    - 特点：virtual DOM，性能上碾轧angularJS
* vue阶段（2014-2016）
    - 特点：综合angular与react的优点，MVVM模式，是一款高性能高效率的框架

### 架构模式

复杂的软件必须有清晰合理的架构，更容易开发、维护和测试

* MVC
    > MVC模式的意思是，软件可以分成三个部分。

    * 模型（Model）：数据处理
    * 视图（View）：数据展示
    * 控制器（Controller）：业务逻辑处理（M和V之间的连接器）

    

    1. View 传送指令到 Controller（用户发送指令）
    3. Controller 完成业务逻辑后，要求 Model 改变状态
    2. Model 将新的数据发送到 View，用户得到反馈

    * 缺点：依赖复杂
        * View 依赖Controller和Model
        * Controller依赖View和Model

* MVP
    > MVP 架构模式是 MVC的改良模式（改进Controller， 把Model和View完全隔离开）

    * Model
    * View
    * Presenter 可以理解为松散的控制器，其中包含了视图的 UI 业务逻辑，所有从视图发出的事件，都会通过代理给 Presenter 进行处理；同时，Presenter 也通过视图暴露的接口与其进行通信。

* MVVM
    > 由MVP模式演变而来

    * Model
    * View
    * ViewModel  类似与MVP中的Presenter，唯一的区别是，它采用双向绑定：View的变动，自动反映在 ViewModel，反之亦然

    - 核心思想：关注Model的变化，让MVVM框架利用自己的机制去自动更新DOM，从而把开发者从操作DOM的繁琐中解脱出来！

## 安装和引入

+ 开发环境：development

* 生产环境：production

* script标签
* cdn

```html
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
```

* npm
>能很好和webpack等打包工具配合使用
* vue-cli脚手架
>快速的搭建基于webpack的开发环境


## 使用

## 实例化

```javascript
    var data = { name: 'laoxie' }
    var vm = new Vue({
      el: '# app',
      data: data
    });

```

### 常用配置选项

* 关于DOM节点
    * el（类型：Selector|Element)
        > Vue实例的挂载目标（实例中所有的属性/方法可直接在el中直接使用），挂载元素会被 Vue 生成的 DOM 替换
    * template（类型：String）
        > 模板，如果不指定则以ele所在元素作为模板
        * Selector：提取内容到template标签，并指定选择器
    - render（类型：Function）
        > template的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 createElement(tagName,props,children) 方法作为第一个参数用来创建 VNode
        * 优先级：render > template > el.outerHTML

        ```js
            new Vue({
                //...
                el:'#app',
                template:`<div>{{username}}</div>`,
                render:createElement=>{
                    return createElement('h1',{title:'标题',class:'title'},'文章标题')
                }
            })
        ```
* 关于数据
    - data（类型：Object|Function)
        > Vue实例化时，它将data中所有的属性添加到**响应式系统**中，当这些数据改变时，视图会进行重渲染

    - computed（类型：Object)
        > 对于需要复杂逻辑或运算才能得到的值，应当使用计算属性
    - methods（类型：Object)
        >一般用于编写公共方法、事件处理函数等，方法中的this指向实例，所以不应该使用箭头函数来定义 method 函数
    - watch（Object）：监听实例的属性
        >监听属性（Function），监听的值被修改时会自动调用函数，当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
        ```js
            watch: {
                username: function (val, oldVal) {
                    console.log('new: %s, old: %s', val, oldVal)
                }
            }
        ```

可以用来监听路由信息的变化：（点击上一页下一页的时候高亮变化）

```js
watch:{
	$route:function(newVal,oldVal){
		this.current = newVal.path;
    }
    //如果直接监听对象下的某一个属性，就要加''
    '$route.path':function(newVal,oldVal){
		this.current = newVal;
    }
}
```



## 5、实例属性&方法

> Vue实例化时，会遍历data/computed/methods中所有属性/方法，并写入Vue的实例

### 5.1响应式属性

> 遍历data中所有属性，通过Object.defineProperty()方法把它们设置为存储器属性（getter & setter），并写入Vue实例

* 存储器属性（getter & setter）
```js
//字面量的写法    
let laoxie = {
        firstName:'lao',
        lastName:'xie',
        get fullName(){
            return this.firstName + ' ' + lastName
        },
        set fullName(val){
            let username = val.split(' ');
            this.firstname = username[0];
            this.lastName = username[1];
        }
}
//也可以使用Object.defineProperty

```

* 设置响应式属性
  * 设置初始化数据data（后添加的属性不会变成响应式属性） 

  * Vue.set(target,key,val) 向**响应式系统**中的对象添加属性并自动渲染视图
    > 注意：target对象不能是 Vue 实例，或者 Vue 实例的根数据对象Vue.$data 

  * 数组变异方法

  * 使用计算属性computed设置 

  * props

### 5.2内置属性

> 除了数据属性，Vue 实例还提供了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来

- $data: 同 data

- $el: 同 el节点 ，vm.$el 可以拿到结构模板

- $refs

- $parent：父组件

- $children：子组件

- $root：根实例，在任何组件里面打印`this.$root`都是指向最外层的vm实例
  - 所以可以使用this.$root来实现bus总线深层次传参的功能

    + todolist里面绑定事件到this.$root里面

    ```js
    created(){
        this.$root.$on('complete',this.completeItem)
    }
    ```

    + 子组件todoItem用  `this.$root.$emit()`调用

  

  每个组件实例都有一个_uid，根组件的 _uid为1

- $options：this.$options可以拿到整个vue实例

```js
// demo 是自定义属性 可以 通过 vm.$options.demo 获取到属性
demo: '自定义属性', //demo和data同级
mounted () {
	//使用 vm.$options 可以获取 实例上自定义的  属性
    console.log( this.$options.demo, '$options');  //自定义属性
}
```



#### 私有属性

控制台打印vue，以下划线开头的，不对外的属性

### 5.3内置方法

#### 1数据data

- $watch()：监听数据变化，同watch配置选项
- $set()：Vue.set()的别名

#### 2事件event

##### $on()    

 ：监听当前实例上的自定义事件，用来绑定事件，等效于v-on

```js
const Bus = new Vue();
Bus.$on('自定义事件名',事件处理函数)
```

> 可以实现v-on的效果

`v-on:自定义事件名="事件处理函数" `     === 

  `this.$on('自定义事件名',this.事件处理函数)`

```js
<todolist v-on:gun="handler"></todolist>
//等效于
在todolist的created生命周期函数里面
created(){
    this.$on('gun',this.handler)
}
```

##### $off()    ：

移除自定义事件监听器

```js
<todolist v-on:gun="handler"></todolist>
//在todolist的created生命周期函数里面移除
created(){
    this.$off('gun');
}
```

##### $emit()   

触发当前实例上的事件

```js
<todolist v-on:gun="handler"></todolist>
//在todolist的created生命周期函数里面触发
created(){
    this.$emit('gun',this.handler)
}
```

#### 3生命周期函数

* $mount()  ：
    > 如果实例化时未配置 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载
* $destroy()
    > 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。触发 beforeDestroy 和 destroyed 的钩子
* $nextTick(callback)
    > 同Vue.nextTick()，将回调延迟到下次 DOM 更新循环之后执行，返回promise对象
* $forceUpdate() 强制刷新组件

```javascript
    vm.$watch('name', function (newValue, oldValue) {
        // 这个回调将在 `vm.name` 改变后调用
    });
```

## 6、生命周期

### 生命周期函数（钩子函数）

>在某个时刻被自动执行的函数，生命周期函数中的this指向实例，以下为v1.x与v2.x钩子函数对照表：

* beforeCreate()
    * 初始化完成，但为往实例添加属性
    * 还拿不到data里面的数据
    * 应用：可以在这加个loading事件 

    > 在这个中间初始化注入和响应式属性：遍历data里面的数据，**把data里面的属性变成响应式属性**
    >
    > 所以在**created**就可以最早拿到父组件传过来的props
* created()
    * 应用：在这结束loading，还做一些初始化，实现函数自执行
    * 最早可以拿到数据的地方，发送ajax请求，刷新后想要实现的都写在这

    > 先判断有没有提供el属性，
    >
    > + 有：判断有没有template属性，
    >   + 有：把template里面的内容放在render函数里面执行
    >   + 没有：用el的outerHTML作为template放在render里面
    > + 没有：
* beforeMount()
    * 可以获取节点，但数据并未挂载
    * 应用：在这发起ajax请求，拿回数据，配合路由钩子做一些事情

    > 从beforeMount---> mounted：把el所在元素里面的vue语法的内容替换成具体的数据，把数据挂载到视图上，
* mounted()
    + 数据已经挂载到节点上了 

    * 应用：节点操作

> 处在一个稳定的监听数据的状态

当数据有修改的时候，才往下

* beforeUpdate()
    * 数据有更新但未更新节点


> 是否更新取决于**虚拟DOM**的操作

* updated()
    * 更新节点完毕
* beforeDestroy()

> 在这个中间会把事件监听、组件之间的联系之类的全部切断

* destroyed()
    > 执行destroy()后，不会改变已生成的DOM节点，但后续就不再受vue控制了

    * 应用：清除定时器、延迟器、取消ajax请求等
    * `vm.$destroy()`：销毁vm实例，就会切换视图和数据之间的联系

## 7、父子组件生命周期函数执行顺序

### 创建阶段

```js
父组件：beforeCreate
父组件：created
父组件：beforeMount
子组件：beforeCreate
子组件：created
子组件：beforeMount
子组件：mounted
父组件：mounted
```

### 更新阶段

```js
父组件：beforeUpdate
子组件：beforeUpdate
子组件：updated
父组件：updated
```

## 8、render

createElement参数：官网api搜索createElement

```js
render(createElement){
	return createElement(参数1，参数2，参数3)
}
```

+ 参数1为子组件：在入口文件挂载App根组件

```js
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

+ 参数1为标签名，参数二为标签内容

```js
render(createElement){
    return createElement('div','组件')
},
相当于：
template:'<div>组件</div>'
```

+ 如果标签内容还是标签，可以写在第三个参数为一个数组，此时参数二可以省略

```js
render(createElement){
     return createElement('div',[createElement('input')])
},
```

+ 数组里面可以创建多个标签，可以添加属性，添加class名，添加样式

```js
render(createElement) {
    return createElement("div", [
        "先写一些文字",
        createElement("h1", "一则头条"),
        createElement("input", {
            class: 'ipt',
            attrs:{type:'password'}
        }),
    ]);
},
```



## 8、指令directive

指令是带有 v-* 前缀的特殊属性，格式：`v-指令名:参数.修饰符="值"`

### 内置指令

#### 数据绑定

* 单向数据绑定
    * {{}}：插值表达式
        > 差值表达式中应当放置一些简单的运算（data中的数据、函数执行、三元运算等），对于任何复杂逻辑，你都应当使用计算属性操作完成后再写入插值表达式
    * v-text：显示文本
    * v-html：显示html内容
    * v-bind：
        * 可绑定任意属性
        ```html
            <img v-bind:src="imgurl">
            <!-- 简写  -->
            <img :src="imgurl">
        ```
        * 对style与class的绑定
            > 在将 v-bind 用于 class 和 style 时，Vue做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组
       
        ```html
            <div class="static"
                 v-bind:class="{ active: isActive, 'text-danger': hasError }"
                 v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">
            </div>
            <script>
                new Vue({
                    data: {
                        isActive: true,
                        hasError: false,
                        activeColor: 'red',
                        fontSize: 30
                    }
                })
            </script>
            <!-- 最终结果：<div class="static active" style="color:red;font-size:30px"></div> -->
        ```
        * v-bind无参数绑定对象
        ```html
            <div v-bind="{username:'laoxie',age:18,gender:'男'}"></div>
            <!-- 等效于 -->
            <div v-bind:username="laoxie" v-bind:age="18" v-bind:gender="男"></div>
        ```
* v-model双向数据绑定
    > v-model一般用于表单元素，会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源

    * v-model值绑定到value属性
        * 单行文本框text
        * 多行文本框textarea
        * 单选框radio
        * 选择框select（无value属性则与内容绑定）

    * 复选框checkbox
        * 初始值为数组，与value属性绑定
        * 初始值为其他，与checked属性绑定(true,false)
            * true-value：设置选中时的值
            * false-value：设置补选中时的值
    * 修饰符
        * lazy      input触发改成change触发
        * number    输出值为number类型
        * trim      自动清楚前后空格
    * **双向数据绑定原理**
        * Model -> View     响应式属性
        * View -> Model     事件
    * v-model的原理（替代方案）
        * v-bind:value="val"
        * v-on:input="val=$event.target.value"
            > 组件中使用v-model等效于：v-on:input="val=arguments[0]"
* 列表渲染
    * v-for
        > 可遍历Array | Object | number | string | Iterable

        * 遍历数组
        ```html
            <li v-for="(value, index) in arr">{{value}}</li>
        ```
        * 遍历对象
        ```html
            <tr v-for="(value, key, index) in obj">
                <td>{{index+1}}</td>
                <td>{{key}}-{{value}}</td>
            </tr>
        ```
    * key：Vue 识别DOM节点的一个通用机制（用于diff算法）
        > Vue对相同的元素进行展示排序等操作时，遵循“就地复用”原则，因为这样更加高效，性能更好
        > 但对于依赖子组件状态或临时 DOM 状态 (如：表单输入值、复选框选中等)的列表，会出现操作混乱的问题，
        > 指定key属性后，意为去掉“就地复用”特性（建议尽可能在使用 v-for 时提供 key）

#### 显示隐藏

* v-show
* v-if
    - v-else
    - v-else-if

#### 事件绑定

> 格式：v-on:事件类型.修饰符="事件处理函数"

* v-on
* 事件修饰符
    - stop
    - prevent
    - capture
    - self  只当在 event.target 是当前元素自身时触发处理函数(e.target === e.currentTarget)
    - once 事件将只会触发一次
    - 按键修饰符
        * 直接使用键码来作为按键修饰符
        ```html
            <!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
            <input v-on:keyup.13="submit">
        ```
        * 使用别名作为按键修饰符
            + left,up,right,down
            + enter
            + tab
            + esc
            + space

---
【案例】

* tab标签切换
* todolist
* 编写自动获得焦点指令
* 首字母大写过滤器

【练习】

* 表格操作
* 编写返回顶部指令
* 全选反选案例
* 商品列表排序
* 日期格式化过滤器



#### 源码分析

  var arrayProto = Array.prototype;

+ Array.prototype：数组的原型对象，上面有很多方法

  var arrayMethods = Object.create(arrayProto);

+ arrayMethods 相当于创建了一个新的对象，这个对象等价于Array.prototype

 var arrayKeys = Object.getOwnPropertyNames(arrayMethods); 

+ arrayKeys 数组原型对象上的每一个属性的名字，相当于以数组的形式存储每一个方法 

### vue版本

##### 完整版

+ 完整版 = 运行时版本 + 编译器（template编译成render）

##### 运行时版本(runtime-only)

