<template>
  <main-layout>
    <h1>Dashboard</h1>
    <div class="p-grid">
      <div class="p-col-3 p-md-6 p-lg-4 p-sm-12 p-xl-3" v-for="subject in subjects"
           :key="subject._id">
        <Card style="min-width: 250px; margin-bottom: 2em">
          <template #header>
          </template>
          <template #title>
            {{ subject.name }}
          </template>
          <template #subtitle>
            {{ subject.owner.name }}
          </template>
          <template #content>
            Pierwsze zajęcia: {{ toClearDate(subject.date) }} <br >
            Występowanie: {{ toClearDayName(subject.date )}}
          </template>
          <template #footer>
            <router-link :to="{ name: 'Subject', params: { id: subject._id  }}">
              <Button icon="pi pi-arrow-right" class="p-button-rounded p-button-secondary"/>
            </router-link>

          </template>
        </Card>
      </div>
    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";
import {mapState} from "vuex";
import Card from "primevue/components/card/Card";
import Button from "primevue/components/button/Button";

export default {
  name: 'SubjectDashboard',
  components: {
    MainLayout,
    Card,
    Button
  },
  data() {
    return {
      students: null
    }
  },
  methods: {
    // TODO: obecnie godzina i data pokazuje się bez jednego 0. Np. 8:00 -> 8:0. Trzeba to poprawić
    toClearDate(date){
      let newDate = new Date(date);
      return `${newDate.getDate()}/${newDate.getUTCMonth() + 1}/${newDate.getFullYear()}`
    },

    toClearHour(date){
      let newDate = new Date(date);
      return `${newDate.getUTCHours()}:${newDate.getUTCMinutes()}`
    },

    toClearDayName(date){
      let newDate = new Date(date);
      var days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
      return days[newDate.getDay()] + ", godzina: " + this.toClearHour(date);
    }
  },

  computed: {
    ...mapState({
      subjects: state => state.subjects.all
    }),
  },

  created() {
    this.$store.dispatch('subjects/getAllSubjects');
  },
}
</script>

<style>
  .p-card-header{
    width: 100%;
    height: 150px;
    background-image: url("../assets/img/notebook.jpg");
    background-size: cover;
  }
</style>
