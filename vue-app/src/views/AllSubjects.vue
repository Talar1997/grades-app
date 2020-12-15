<template>
  <main-layout>
    <div class="page-header">
      <h1 class="page-header-h">Wszystkie przedmioty</h1>
    </div>

    <div v-if="subjectsLoading" class="p-grid">
      <div v-for="n in 8"
           :key="n"
           class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3">
        <LoadingCard></LoadingCard>
      </div>
    </div>

    <div v-else class="p-grid">
      <h2 v-if="isEmpty() && !subjectsLoading">Lista przedmiotów jest pusta. Utwórz nowy przedmiot.</h2>
      <div v-for="subject in subjects"
           v-bind:key="subject._id"
           class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3">
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
