<template>
  <main-layout>
    <div class="page-header">
      <h1 class="page-header-h">
        <span v-if="!loadingSubject">Przedmiot: {{ subject.name }}</span>
        <Skeleton class="skeleton-header" v-else></Skeleton>
      </h1>

    </div>

    <div class=" p-grid">
      <div class="p-col-12 page-content p-shadow-2">
        <TabView class="tabview-custom">
          <TabPanel>
            <template #header>
              <i class="pi pi-check-square icon-spacing"></i>
              <span>Obecności</span>
            </template>
            <AbsencesTab v-bind:students="students"></AbsencesTab>
          </TabPanel>
          <TabPanel>
            <template #header>
              <i class="pi pi-briefcase icon-spacing"></i>
              <span>Oceny</span>
            </template>
            <GradesTab v-bind:students="students"></GradesTab>
          </TabPanel>
          <TabPanel>
            <template #header>
              <i class="pi pi-cog icon-spacing"></i>
              <span>Ustawienia</span>
            </template>
            <SettingsTab v-bind:students="students"
                         v-bind:subject="subject"></SettingsTab>
          </TabPanel>
        </TabView>
      </div>
    </div>

  </main-layout>
</template>

<script>

import MainLayout from "@/layouts/Main";
import {mapActions, mapGetters} from "vuex";
import Skeleton from 'primevue/skeleton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import GradesTab from "@/components/Subject/GradesTab";
import AbsencesTab from "@/components/Subject/AbsencesTab";
import SettingsTab from "@/components/Subject/SettingsTab";


export default {
  name: 'SubjectDashboard',

  components: {
    MainLayout,
    Skeleton,
    TabView,
    TabPanel,
    GradesTab,
    AbsencesTab,
    SettingsTab,
  },

  data() {
    return {
      subjectId: this.$route.params.id,
      subject: {},
      students: [],
      loadingSubject: true,
      loadingStudents: true,
    }
  },

  computed: {
    ...mapGetters({
      getSubject: "subject/getSubject",
      getFromSubject: "students/getFromSubject"
    }),
  },

  methods: {
    ...mapActions({
      getStudentsFromSubject: "students/getStudentsFromSubject",
      getSubjectById: "subject/getSubjectById",
    })
  },


  mounted() {
  },

  created() {
    this.getSubjectById(this.subjectId)
        .then(() => {
          this.subject = this.getSubject()
          this.loadingSubject = false
        })
        .catch(() => {
          this.$router.push("/404");
        });

    this.getStudentsFromSubject(this.subjectId).then(() => {
      this.students = this.getFromSubject()
      this.loadingSubject = false
    })
  }
}
</script>

<style scoped>
@import "../assets/css/subject.css";
</style>
