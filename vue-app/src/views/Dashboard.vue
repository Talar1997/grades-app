<template>
  <main-layout>
    <div class="page-header">
      <h1 class="page-header-h">Twoje przedmioty</h1>
    </div>

    <div v-if="subjectsLoading" class="p-grid">
      <div v-for="n in 8"
           :key="n"
           class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3">
        <LoadingCard></LoadingCard>
      </div>
    </div>

    <div v-else class="p-grid p-ai-stretch vertical-container">
      <div v-for="subject in subjects"
           v-bind:key="subject._id"
           class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3">
        <div class="box box-stretched">
          <SubjectCard v-bind:subject="subject"></SubjectCard>
        </div>
      </div>

      <div class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3">
        <AddSubjectCard></AddSubjectCard>
      </div>
    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";
import {mapGetters} from "vuex";
import LoadingCard from "@/components/SubjectDashboard/LoadingCard";
import SubjectCard from "@/components/SubjectDashboard/SubjectCard";
import AddSubjectCard from "@/components/SubjectDashboard/AddSubjectCard";
import {subjectsMixin} from "@/mixins/subjectsMixin";

export default {
  name: 'SubjectDashboard',
  components: {
    SubjectCard,
    MainLayout,
    LoadingCard,
    AddSubjectCard
  },
  data() {
    return {
      subjects: null,
      subjectsLoading: true,
      userId: JSON.parse(localStorage.getItem('user')).data.user._id,
    }
  },

  mixins: [subjectsMixin],

  computed: {
    ...mapGetters({
      getOwnedByUser: "subjects/getOwner"
    }),
  },

  created() {
    this.getAllSubjects().then(() => {
      this.subjects = this.getOwnedByUser(this.userId);
      this.stopLoadingDocuments(150);
    });

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'subjects/pushSubject') {
        this.getAllSubjects().then(() => this.subjects = this.getOwnedByUser(this.userId))
      }
    });
  },

  beforeUnmount() {
    this.unsubscribe();
  },

}
</script>

<style>
@import '../assets/css/global.css';
</style>
