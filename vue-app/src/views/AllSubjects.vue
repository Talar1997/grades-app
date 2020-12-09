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
      <div class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3" v-for="subject in subjects"
           :key="subject._id">
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

export default {
  name: 'SubjectDashboard',
  components: {
    MainLayout,
    LoadingCard,
    SubjectCard
  },
  data() {
    return {
      subjects: null,
      subjectsLoading: true,
      userId: JSON.parse(localStorage.getItem('user')).data.user._id,
    }
  },

  methods: {
    isEmpty() {
      return this.subjects === null || this.subjects.length === 0;
    }
  },

  computed: {
    ...mapState({
      allSubjects: state => state.subjects.all,
    }),
  },

  created() {
    this.$store.dispatch('subjects/getAllSubjects').then(() => {
      this.subjects = this.allSubjects;
      setTimeout(() => {
        this.subjectsLoading = false;
      }, 150);

    })
  },

}
</script>

<style>
@import '../assets/css/global.css';

.p-card-header {
  width: 100%;
  height: 150px;
  background-image: url("../assets/img/notebook.jpg");
  background-size: cover;
}

.header-replace {
  width: 100%;
  height: 150px;
  background-color: rgb(240, 240, 240);
  background-image: none;
}

.lineThrough {
  text-decoration: line-through;
}
</style>
