<template>
<NavBar></NavBar>
   <form novalidate>
    <div class="panel-body">

        <div class="form-group">
            <label>제목</label>
            <input  placeholder="제목을 입력하세요" class="form-control" v-model="title" ref="title" name="title">
        <div class="form-group">
            <label>내용</label>
            <textarea placeholder="내용을 입력하세요"  rows="5" cols="50" v-model="content" name="content" ref="content" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label>작성자</label>
            <input placeholder="작성자를 입력하세요  " class="form-control" v-model="writer" name="writer" ref="writer" >
        </div>
         </div>
    </div>
     <div class="col-12">
  </div>
    </form>
   <button type="button" class="btn btn-outline-primary" @click="updateBtn" v-if="$route.params.id">수정</button>  
   <button type="button" class="btn btn-outline-primary" @click="insertBtn" v-else>등록</button>

    <button type="button" class="btn btn-outline-success" @click="$router.push('/')">목록</button>  
   

</template>

<script>
import NavBar from './NavBar.vue';
import axios from 'axios';
// eslint-disable-next-line
export default {
    name:'BoardWriter',
    data() {
        return {
            id : this.$route.params.id,
            title : '',
            content : '',
            writer : '',
        }
    },
    mounted() {
        if(this.id){
            this.getBoard(this.id);
        }
    },
    
    methods: {
        getBoard(id){
            axios.get(`/api/detail/${id}`)
            .then(result=>{
                this.title = result.data.title;
                this.content = result.data.content;
                this.writer = result.data.writer;
            });

        },
        insertBtn(){
            //등록 체크
           if(this.title.trim()=="")
            {
                this.$refs.title.focus();
                return;
            }
            if(this.content.trim()=="")
            {
                this.$refs.content.focus();
                return;
            }
            if(this.writer.trim()=="")
            {
                this.$refs.writer.focus();
                return;
            }
            axios.post('/api/writer',{
                title:this.title,
                content:this.content,
                writer :this.writer,
            }).then(()=>{
                this.$router.push('/')
            })
        },
        updateBtn(){
            axios.patch(`/api/update/${this.id}`,{
                title:this.title,
                content:this.content,
                writer :this.writer,
            }).then(()=>{
                this.$router.push('/');
                alert("수정완료");
                
            })

        }
        
    },
     components:{
        NavBar
    },

}
</script>

<style>

</style>