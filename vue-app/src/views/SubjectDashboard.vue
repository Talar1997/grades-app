<template>
  <div>
    <button v-on:click="logout">Wyloguj</button>
  </div>
</template>

<script>


export default {
  name: 'SubjectDashboard',
  data(){
    return{
      students: null
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('user/logout')
      .then(()=>{
        this.$router.push('login');
      })
    }
  },
}
</script>

<style>

</style>
