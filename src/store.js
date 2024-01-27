import { createStore } from "vuex";


const store = createStore({
  state(){
    return {
         keyword:'',
         searchType:'A',    
    }
  },
  //수정 방법 
  mutations:{
     setKeyword(state, keyword){
       state.keyword = keyword;
     },
     setSearchType(state, searchType){
         state.searchType = searchType;
       },

  },
  actions: {//ajax요청 

  }


})

export default store;