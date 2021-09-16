<template>
  <div id="app">
    <div>{{ count }}</div>
    <!-- <div>{{state.count}}</div> -->
    <!-- <div>{{count}},{{double}}</div> -->
    <button @click="add">点击</button>
    <div>{{x}} , {{y}}</div>
  </div>
</template>

<script>
import { reactive , ref , toRefs , toRef , computed , watchEffect , watch , onMounted, onUpdated, onUnmounted } from '@vue/composition-api';


  export default {
    name: 'App',
    setup() { // vue 3.0 的入口函数，beforeCreate之前进行触发

      //具备数据响应式的
      // const state=reactive({
      //   count:0
      // });

      // setTimeout(()=>{
      //   state.count++;
      // },1000);

      //  return state;


      //  具备数据响应式的
      // const state=reactive({
      //   count:0
      // });

      // setTimeout(()=>{
      //   state.count++;
      // },1000);

      //  return {
      //    state
      //    };



      //具备数据响应式的
      //  const count=ref(0);

      //         setTimeout(()=>{
      //     count.value++;
      //     },1000);

      //   return {
      //   count
      //   };


      //不具备数据响应式的
      // const state=reactive({
      //   count:0
      // });

      //     setTimeout(()=>{
      //     state.count++;
      //   },1000);

      //  return {
      //    count:state.count
      //    };


      //具备数据响应式的
      // const count=ref(2);
      // const state=reactive({
      //   count
      // });

      //    setTimeout(()=>{
      //   state.count++;
      // },1000);

      //   return {
      //    count
      //    }




      //具备数据响应式的
      // const state=reactive({
      //   count:0
      // });

      // const {count}=toRefs(state); // 就是把普通的数据，转成ref()方法所对应的响应式数据

      //  setTimeout(()=>{
      //   state.count++;
      // },1000);

      // return{
      //   count
      // }


         //  具备数据响应式的
      // const state=reactive({
      //     count:0
      //   });

      // // toRefs(state) 相当于解构
      //   const {count}=toRefs(state); // 就是把普通的数据，转成ref()方法所对应的响应式数据

      //    setTimeout(()=>{
      //     state.count++;
      //   },1000);

      //   return toRefs(state)



      //  const state=reactive({
      //     count:0
      //   });

      //   const count=toRef(state,'count'); // 就是把需要的数据，转成ref()方法所对应的响应式数据

      //    setTimeout(()=>{
      //     state.count++;
      //   },1000);

      //   return{
      //     count
      //   }

      //------------------------------计算属性
      //  const count=ref(1);
      //  const double=computed(()=>{
      //    return count.value*2
      //  })

      //    setTimeout(()=>{
      //     count.value++;
      //   },1000);


      //   return{
      //     count,
      //     double
      //   }


      // const state=reactive({
      //   count:2,
      //   double:computed(()=>{
      //    return state.count*2 // 计算属性
      //    })
      // });


      // setTimeout(()=>{
      //   state.count++;
      // },1000);


      // return state
      // return toRefs(state)


      //----------------------事件

      // const count=ref(2);

      // const add=()=>{  //事件方法
      //   count.value++;
      // }

      // return {
      //   count,
      //   add
      // }


      //---------------------- 副作用

      // const count = ref(2);

      // const add = () => {   //事件方法
      //   count.value++;
      //   if (count.value == 5) {
      //     stop()
      //   }
      // };

      // const stop = watchEffect(async (cancel)=>{

      //   await new Promise(function (resolve, reject) {
      //     console.log(count.value);
      //     resolve()

      //   })

      //   cancel(()=>{    //会在异步之前进行触发 , 清除副作用
      //     console.log('cancel');
      //   });

      // });


      // return {
      //   count,
      //   add
      // }



    // const count = ref(0);

    // const add = () => {  //事件方法
    //   count.value++;
    // };

    // watch( count , (count , prevCount)=>{
    //   console.log( count , prevCount );
    //   //  count 改变后的值   prevCount  旧值
    // });

    // return {
    //   count,
    //   add
    // } 




    //----------------------生命周期

    const count = ref(0);

    const add = () => { 
       count.value++;
    }

      // useMounted();  //调用声明周期函数


        onMounted(() => {
          console.log('mounted!')    // 渲染完出发， 加载时
        })

        onUpdated(() => {
          console.log('updated!')   // 渲染完改变时出发
        })

        onUnmounted(() => {
          console.log('unmounted!')  // 组件销毁出发
        })

    const { x , y } = useMousePosition();    //调用

      return {
        count,
        add,
        x,
        y
      }

    } 
  }

// // setup外需要封装函数 在setup（）调用
// function useMounted(){
//     onMounted(() => {
//       console.log('mounted!')    // 渲染完出发， 加载时
//     })
//     onUpdated(() => {
//       console.log('updated!')   // 渲染完改变时出发
//     })
//     onUnmounted(() => {
//       console.log('unmounted!')  // 组件销毁出发
//     })
// } 



function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  // onMounted(() => {
  //   window.addEventListener('mousemove', update)  //绑定鼠标事件

  // })

  // onUnmounted(() => {
  //   window.removeEventListener('mousemove', update)  //移除鼠标事件
  // })

  return { x, y }
}


</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 50px;
  }
</style>