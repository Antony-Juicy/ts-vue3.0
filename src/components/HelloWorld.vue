<template>
  <div class="hello">
    <h2>歌曲推荐</h2>
  </div>
</template>

<script lang="ts">
/* import { Component, Prop, Vue } from 'vue-property-decorator';

// @Component
// export default class HelloWorld extends Vue {
//   @Prop() private msg!: string;
// } */

import { defineComponent , watchEffect } from '@vue/composition-api';

// import { useStore } from '../useSearchWord';

export default defineComponent({   // 兼容语法 ts 效验
  setup(){

      // const searchWord = useStore();  

      watchEffect(()=>{            //---------------------- 副作用
        // console.log( 'this is : ' + searchWord.value );
        console.log("歌曲推荐");
        
      });

  }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  height: 10px;
  text-align: center;
}

</style>
