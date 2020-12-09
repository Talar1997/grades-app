<template>
  <main-layout>
    <div class="page-header">
      <h1 class="page-header-h">Dashboard</h1>
    </div>

    <div class="p-grid" v-if="subjectsLoading">
      <div class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3"
           v-for="n in 8"
           :key="n">
        <LoadingCard></LoadingCard>
      </div>
    </div>

    <div class="p-grid" v-else>
      <h2 v-if="isEmpty() && !subjectsLoading">Lista przedmiotów jest pusta. Utwórz nowy przedmiot.</h2>
      <div class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3"
           v-for="subject in subjects"
           v-bind:key="subject._id">
        <SubjectCard v-bind:subject="subject"></SubjectCard>
      </div>
    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";
import {mapState} from "vuex";
import LoadingCard from "@/components/SubjectDashboard/LoadingCard";
import SubjectCard from "@/components/SubjectDashboard/SubjectCard";
import {subjectsMixin} from "@/mixins/subjectsMixin";

export default {
  name: 'SubjectDashboard',
  components: {
    MainLayout,
    LoadingCard,
    SubjectCard
  },
  mixins: [subjectsMixin],
  data() {
    return {
      userId: JSON.parse(localStorage.getItem('user')).data.user._id,
    }
  },

  computed: {
    ...mapState({
      allSubjects: state => state.subjects.all,
    }),
  },

  created() {
    this.getAllSubjects().then(() => {
      this.subjects = this.allSubjects;
      this.stopLoadingDocuments(150);
    })
  },

}
</script>

<style scoped>
@import '../assets/css/global.css';
</style>
