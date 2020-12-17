<template>
  <main-layout>
    <div class="page-header">
      <h1 class="page-header-h">
        <span v-if="!loadingSubject">Przedmiot: {{ subject.name }}</span>
        <Skeleton v-else class="skeleton-header"></Skeleton>
      </h1>
    </div>

    <Message severity="error" v-if="!loadingSubject && !subject.active">
      Ten przedmiot jest nieaktywny. Nie można w nim dodawać studentów, absencji ani ocen.
    </Message>

    <!--    TODO: zaimplementować ładowanie (żeby najpierw nie wyświetlało się 'brak danych'-->
    <div class=" p-grid">
      <div class="p-col-12 page-content p-shadow-2">
        <TabView class="tabview-custom">
          <TabPanel v-bind:disabled="isDataLoading()">
            <template #header>
              <i class="pi pi-check-square icon-spacing"></i>
              <span>Obecności</span>
            </template>
            <AbsencesTab v-bind:students="students"
                         v-bind:isSubjectActive="subject.active"
                         v-bind:subject="subject"
                         v-if="!isDataLoading()">
            </AbsencesTab>
            <SkeletonTable v-else></SkeletonTable>
          </TabPanel>
          <TabPanel v-bind:disabled="isDataLoading()">
            <template #header>
              <i class="pi pi-briefcase icon-spacing"></i>
              <span>Oceny</span>
            </template>
            <GradesTab
                v-bind:students="students"
                v-bind:isSubjectActive="subject.active">

            </GradesTab>
          </TabPanel>
          <TabPanel v-bind:disabled="isDataLoading()">
            <template #header>
              <i class="pi pi-cog icon-spacing"></i>
              <span>Ustawienia</span>
            </template>
            <SettingsTab
                v-bind:isSubjectActive="subject.active"
                v-bind:students="students"
                v-bind:subject="subject">
            </SettingsTab>
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
import Message from 'primevue/message';
import SkeletonTable from "@/components/Subject/Absences/SkeletonTable";

export default {
  name: 'SubjectDashboard',

  components: {
    SkeletonTable,
    MainLayout,
    Skeleton,
    TabView,
    TabPanel,
    GradesTab,
    AbsencesTab,
    SettingsTab,
    Message
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
    }),

    isDataLoading() {
      return this.loadingSubject && this.loadingStudents
    }
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
  },
}
</script>

<style scoped>
@import "../assets/css/subject.css";
</style>
