<template>
  <div id="app">
      <helloWorld></helloWorld>
    <div class="search-input">
      <i class="iconfont iconsearch"></i>
      <input
        type="text"
        placeholder="搜索歌曲"
        v-model="searchWord"
        @input="handleToSuggest"
        @keyup.13="handleToList(searchWord)"
      />
      <!--    隐藏清空图标  当界面不是热搜列表(详细)展示-->
      <i
        class="iconfont iconguanbi"
        v-if="searchType != 1"
        @click="handleToClose"
      ></i>
    </div>
    <!-- -----------------------------------热搜列表(详细)------------------ -->
    <template v-if="searchType == 1">
      <div class="search-history">
        <div class="search-history-head">
          <span>历史记录</span>
          <i class="iconfont iconlajitong" @click="handleToClear"></i>
        </div>
        <div class="search-history-list ">
          <div
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="handleToList(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="search-hot">
        <div class="search-hot-head">热搜榜</div>
        <div
          class="search-hot-item"
          v-for="(item, index) in searchHot"
          :key="index"
        >
          <div class="search-hot-top">{{ index + 1 }}</div>
          <div class="search-hot-word">
            <div>
              <!-- 存在图片才显示   v-show="item.iconUrl"  -->
              {{ item.searchWord
              }}<img v-show="item.iconUrl" :src="item.iconUrl" alt="" />
            </div>
            <div>{{ item.content }}</div>
          </div>
          <span class="search-hot-count">{{ item.score }}</span>
        </div>
      </div>
    </template>
    <!-- ---------------------------------------------列表 -------------------------------->
    <template v-else-if="searchType == 2">
      <div class="search-result">
        <div
          class="search-result-item "
          v-for="(item, index) in searchList"
          :key="index"
        >
          <div class="search-result-word">
            <div>{{ item.name }}</div>
            <div>{{ item.artists[0].name }} - {{ item.album.name }}</div>
          </div>
          <i class="iconfont iconbofang"></i>
        </div>
      </div>
    </template>

    <!-- ----------------------------搜索列表 ---------------------->
    <template v-else-if="searchType == 3">
      <div class="search-suggest ">
        <div class="search-suggest-head ">搜索“{{ searchWord }}“</div>
        <div
          class="search-suggest-item"
          v-for="(item, index) in searchSuggest"
          :key="index"
          @click="handleToList(item.keyword)"
        >
          <i class="iconfont iconsearch"></i>{{ item.keyword }}
        </div>
      </div>
    </template>
  
   
  </div>
</template>
<script>
import "@/assets/iconfont/iconfont.css";
import axios from "axios";
import { reactive, ref, toRefs, onMounted } from "@vue/composition-api";
import HelloWorld from './components/HelloWorld.vue'
export default {
   components:{
    HelloWorld
  },
  name: "App",
  setup() {
    const searchType = ref(1);   // 判断显示界面

    const searchWord = ref("");   //输入的关键词

    const { searchHot } = useSearchHot();   // 热搜榜列表

    const { searchSuggest, handleToSuggest } = useSearchSuggest(searchType,searchWord);   // 热搜关键词 列表

    const { searchList, handleToClose, handleToList } = useSearchList(searchType,searchWord,function(word){ setToHistory(word); } );            // 搜索关键词  详细列表                                    

    const { searchHistory, handleToClear, setToHistory } = useSearchHistory();   // 历史记录

    return {
      searchType,
      searchWord,
      searchHot,
      searchSuggest,
      handleToSuggest,
      searchList,
      handleToClose,
      handleToList,
      searchHistory,
      handleToClear,
      setToHistory,
    };
  },
};

//  热搜榜 数据
function useSearchHot() {
  const state = reactive({
    searchHot: [],
  });
  // 热搜列表(详细)
  onMounted(() => {
    axios.get("/search/hot/detail").then((res) => {
      state.searchHot = res.data.data; // 赋值给 searchHot
    });
  });
  return toRefs(state); // 结构出 searchHot
}

//   搜索列表
function useSearchSuggest(searchType, searchWord) {
  const state = reactive({
    searchSuggest: [],
  });
  const { searchSuggest } = toRefs(state); // 解构

  const handleToSuggest = () => {
    if (!searchWord.value) {
      // 注意 value
      searchType.value = 1;
      return;
    }
    axios
      .get(`/search/suggest?keywords=${searchWord.value}&type=mobile`)
      .then((res) => {
        state.searchSuggest = res.data.result.allMatch;
        searchType.value = 3;
      });
  };
  return {
    searchSuggest,
    handleToSuggest,
  };
}

//   搜索结果列表
function useSearchList(searchType, searchWord,callback) {
  const state = reactive({
    searchList: [],
  });

  const { searchList } = toRefs(state); // 解构

  // 清空input
  const handleToClose = () => {
    searchWord.value = "";
    searchType.value = 1;
  };
  const handleToList = (word) => {
    // 搜索复制input  点击赋值input
    searchWord.value = word;

    callback(word)  // 回调执行  setToHistory

    // const { setToHistory } = useSearchHistory();   // use函数需要在 setup() 执行才可以  

    // setToHistory(word);

  //   热搜榜数据 调用
    getSearchList();
  };

  // 请求搜索数据
  const getSearchList = () => {
    axios.get(`/search?keywords=${searchWord.value}`).then((res) => {
      state.searchList = res.data.result.songs;
      searchType.value = 2;
    });
  };
  return {
    searchList,
    handleToClose,
    handleToList,
  };
}

//    历史记录
function useSearchHistory(){
  const state = reactive({
    searchHistory: [],
  });

  const { searchHistory } = toRefs(state); // 解构

  //清空历史记录
  const handleToClear = () => {
    removeStorage({
      key: "searchHistory",
      success: () => {
        state.searchHistory = [];
      },
    });
  };
  
  // 历史记录  本地存储
  const setToHistory = (word) => {
    state.searchHistory.unshift(word);
    state.searchHistory = [...new Set(state.searchHistory)]; // 去重
    if (state.searchHistory.length > 10) {
      state.searchHistory.length = 10;
    }

    // 本地存储
    setStorage({
      key: "searchHistory",
      data: state.searchHistory,
    });
  };

  onMounted(() => {
    getStorage({
      key: "searchHistory",
      success: (data) => {
        state.searchHistory = data;
      },
    });
  });
  return {
    searchHistory,
    handleToClear,
    setToHistory,
  };
}

// 封装的本地存储函数
function setStorage({ key, data }) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
    //  获取本地存储
function getStorage({ key, success }) {
  let data = window.localStorage.getItem(key);
  success(JSON.parse(data));
}

    //  移除本地存储
function removeStorage({ key, success }) {
  window.localStorage.removeItem(key);
  success();
}
</script>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  height: 35px;
  margin: 35px 15px 25px 15px;
  background: #f7f7f7;
  border-radius: 25px;
}

.search-input i {
  margin: 0 13px;
}

.search-input input {
  flex: 1;
  font-size: 14px;
  border: none;
  background: #f7f7f7;
  outline: none;
}

.search-history {
  margin: 0 15px 25px 15px;
  font-size: 14px;
}

.search-history-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.search-history-list {
  display: flex;
  flex-wrap: wrap;
}

.search-history-list div {
  padding: 8px 14px;
  border-radius: 20px;
  margin-right: 15px;
  margin-bottom: 15px;
  background: #f7f7f7;
}

.search-hot {
  margin: 0 15px;
  font-size: 14px;
}

.search-hot-head {
  margin-bottom: 18px;
}

.search-hot-item {
  display: flex;
  align-items: center;
  margin-bottom: 29px;
}

.search-hot-top {
  color: #fb2222;
  width: 30px;
  margin-left: 4px;
}

.search-hot-word {
  flex: 1;
}

.search-hot-word div:nth-child(1) {
  font-size: 16px;
  color: black;
}

.search-hot-word div:nth-child(2) {
  font-size: 12px;
  color: #878787;
}

.search-hot-word img {
  height: 12px;
}

.search-hot-count {
  color: #878787;
}

.search-result {
  border-top: 1px #e4e4e4 solid;
  padding: 15px;
}

.search-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px #e4e4e4 solid;
}

.search-result-word div:nth-child(1) {
  font-size: 16px;
  color: #235790;
  margin-bottom: 6px;
}

.search-result-word div:nth-child(2) {
  font-size: 14px;
  color: #898989;
}

.search-result-item i {
  font-size: 30px;
  color: #878787;
}

.search-suggest {
  border-top: 1px #e4e4e4 solid;
  padding: 15px;
  font-size: 14px;
}

.search-suggest-head {
  color: #4574a5;
  margin-bottom: 37px;
}

.search-suggest-item {
  color: #5d5d5d;
  margin-bottom: 37px;
}

.search-suggest-item i {
  color: #bdbdbd;
  margin-right: 14px;
  position: relative;
  top: 1px;
}
</style>
