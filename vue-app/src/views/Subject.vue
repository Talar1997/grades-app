<template>
  <h1>Przedmiot</h1>
  {{ subjectId }}
  <img alt="Vue logo" src="../assets/img/logo.png">
</template>

<script>

export default {
  name: 'SubjectDashboard',
  data(){
    return{
      subjectId: this.$route.params.id,
    }
  },
  methods:{
  },
  mounted() {
  }
}
</script>

<style>

</style>
