<template>
  <div id="app">
    <div>{{count}}</div>
    <!-- <div>{{state.count}}</div> -->
     <div>{{count}},{{double}}</div>
  </div>
</template>

<script>

import {reactive,ref, toRefs,toRef, computed,} from '@vue/composition-api';


export default {
  name: 'App',
  setup(){ // vue 3.0 的入口函数，beforeCreate之前进行触发

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

 
//  计算属性 computed
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


    const state=reactive({
      count:2,
      double:computed(()=>{
       return state.count*2
       })
    });

    return state
    // return toRefs(state) 



  }
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
  font-size: 50px  ;
}
</style>
