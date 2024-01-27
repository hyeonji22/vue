<template>
 <NavBar @resetPage="resetPage"></NavBar>

 <button type="button" @click="$router.push('/writer')" class="btn btn-outline-primary">글작성 </button>
<div class="input-group mb-3">
  <select v-model="searchType" class="form-select" aria-label="Default select example">
    <option  value="A">전체</option>
    <option value="T">제목</option>
    <option value="W">작성자</option>
</select>

  <input @keyup.enter="getBoardSearchList" v-model="keyword" ref="keyword" type="text" class="form-control"  placeholder="검색어를 입력하세요" aria-label="Username" aria-describedby="basic-addon1">
  <button type="button" class="btn btn-primary"  @click="getBoardSearchList">검색</button>
</div>
  게시글수 : {{ totalCnt }}
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">날짜</th>
    </tr>
  </thead>

  <tr v-for="(board,i) in boardList" :key="i" @click="gotoBoardDetail(board.id)">
        <th scope="row">{{ totalCnt - (i + (currentPage - 1) * 10) }}</th>
        <td>{{ board.title }}</td>
        <td>{{ board.writer }}</td> <!-- Assuming there is an 'author' property in your data -->
        <td>{{ board.updatedate }}</td>   <!-- Assuming there is a 'date' property in your data -->
      </tr>
</table>

<!-- 페이징 시작 -->
 <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" v-if="pageMap.prev"  @click="goToPage(this.pageMap.startPage -1)"><a class="page-link" href="#">이전</a></li>
      <li class="page-item" v-for="page in pageMap.pageNumberArr" :key="page.id" >
        <a class="page-link" @click="goToPage(page)" :class="page == pageMap.currentPage? 'active': ''" href="#">{{page}}</a>
      </li>
      <li class="page-item" v-if="pageMap.next" @click="goToPage(this.pageMap.endPage +1)"><a class="page-link" href="#">다음</a></li>
    </ul>
  </nav> 
<!-- 페이징 끝 -->


</template>

<script>
import NavBar from './NavBar.vue';
import axios from 'axios';

// eslint-disable-next-line
export default {
    name:'BoardList',
    data() {
        return {
            boardList : [],
            currentPage : 1,
            totalCnt : '',
            pageMap : {},
            searchType :this.$store.state.searchType , 
            keyword : this.$store.state.keyword, 
           
        };
    },

    mounted() {
        this.currentPage = this.$route.params.page || 1;
        this.getBoardList();
    },
    methods: {
       //검색
        getBoardSearchList(){
        this.currentPage = 1; //검색시, 페이지 1로 초기화
        this.$store.commit('setKeyword', this.keyword);
        this.$store.commit('setSearchType', this.searchType);
        this.getBoardList();  //목록 호출
      },
        //목록
        getBoardList(){
            axios.get(`/api/board/${this.currentPage}`,{
              params:{
                 keyword: this.keyword,
                 searchType: this.searchType
              }
            })
            .then(result=>{
                this.boardList = result.data.boardList;
                this.totalCnt  = result.data.totalCnt;
                this.pageMap  = result.data.pageMap;
            });

        },
        //페이지버튼 페이징이동
        goToPage(page){
          this.currentPage=page;
            this.getBoardList();
        },
        //네비 home 클릭시 1페이지
        resetPage(){
          this.currentPage = 1;
          this.getBoardList();
        },
        //상세보기
        gotoBoardDetail(id){
          this.$router.push(`/detail/${id}/${this.currentPage}`)

        }
    },
    components:{
        NavBar
    },

}
</script>

<style>

</style>