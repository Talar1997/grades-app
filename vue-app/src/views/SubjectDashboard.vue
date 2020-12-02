<template>
  <img alt="Vue logo" src="../assets/img/logo.png">
</template>

<script>

import {fetchAllStudents} from "@/api/studentsApi";

export default {
  name: 'SubjectDashboard',
  data(){
    return{
      students: null
    }
  },
  methods:{
    async getStudents() {
      this.students = await fetchAllStudents()
    }
  },
  mounted() {
    this.getStudents();
    console.log(this.students);
  }
}
</script>

<style>

</style>
