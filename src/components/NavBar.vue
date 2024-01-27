<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">현지네  </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#" @click="gotoBoardlist">Home</a>
        </li>
      
      </ul>

    </div>
  </div>
</nav>
</template>

<script>
// eslint-disable-next-line
export default {
    name:'NavBar',
    methods: {
      gotoBoardlist(){
         this.$router.push('/');
         this.$emit('resetPage');

      },
    },


}
</script>

<style>

</style>