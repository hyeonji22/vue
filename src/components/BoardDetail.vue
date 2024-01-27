<template>

<NavBar></NavBar>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">{{ board.id }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">제목</th>
            <td>{{ board.title }}</td>
            </tr>
            <tr>
            <th scope="row">내용</th>
            <td>{{ board.content }}</td>
            </tr>
            <th scope="row">작성자</th>
            <td>{{ board.writer }}</td>
           
            <tr>
            <th scope="row">작성날짜</th>
      <td colspan="2">{{ board.updatedate }}</td>

      
            </tr>
        </tbody>
    </table>

    <button type="button" class="btn btn-outline-primary"   @click="updateBtn(this.id)">수정</button>
    <button type="button" class="btn btn-outline-secondary" @click="deleteBtn">삭제</button>
    <button type="button" class="btn btn-outline-success"   @click="gotoBoardLisTBtn">목록</button>  


</template>

<script>
import NavBar from './NavBar.vue';
import axios from 'axios';
// eslint-disable-next-line
export default {
    name:'BoardDetail',
    data() {
        return {
            id : this.$route.params.id,
            page : this.$route.params.page,
            board :{},
        };
    },
    mounted() {
        this.getBoard();

    },
    methods: {
        getBoard(){
            axios.get(`/api/detail/${this.id}`)
            .then(result=>{
                this.board = result.data;
            });
        },
        gotoBoardLisTBtn(){
            this.$router.push(`/board/${this.page}`);
      
        },
        deleteBtn(){
            axios.delete(`/api/delete/${this.id}`)
            .then(()=>{
                this.$router.push('/');

            })
        },
        updateBtn(id){
            this.$router.push(`/writer/${id}`);
        }
        
    },
     components:{
        NavBar
    },

}
</script>

<style>

</style>