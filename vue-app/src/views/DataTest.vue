<template>
  <main-layout>
    <ul>
      <li
          v-for="subject in subjects"
          :key="subject._id">
        {{subject.name}} - {{subject.owner.email}}
        <button v-on:click="showData(subject)">Details</button>
      </li>
    </ul>

    <Calendar v-model="test"></Calendar>



    <Button v-on:click="deleteTest()" icon="pi pi-check" label="Confirm"></Button>
    <Toast position="bottom-right"></Toast>
    <ConfirmPopup></ConfirmPopup>
  </main-layout>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import MainLayout from '@/layouts/Main';
import Button from "primevue/components/button/Button";
import Calendar from "primevue/components/calendar/Calendar";
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import {notificationMixin} from "@/mixins/notificationMixin";

export default {
  name: 'DataTest',
  components:{
    MainLayout,
    Button,
    Calendar,
    ConfirmPopup,
    Toast
  },

  mixins:[
    notificationMixin
  ],

  data(){
    return{
      display: true,
      test: null,
    }
  },
  computed: {
    // 1 sposob na pobieranie danych
    ...mapState({
      subjects: state => state.subjects.all
    }),

    // 2 sposob na pobieranie danych
    ...mapGetters({
      getAll: 'subjects/getAll',
    }),
  },

  methods: {
    // Nie jest to wymagane. Jeden z dwóch sposobów wystarczy na pobranie danych.
    // można pobrać dane zamiast  this.$store.dispatch('subjects/createNewSubject', this.subject)
    // -> this.createNewSubject(this.subject)
    ...mapActions('subjects', [
      'getAllSubjects'
    ]),

    showData(subject){
      alert(subject.name);
    },

    deleteTest() {
      this.testFunction()
      this.pushSuccess("test", "test2");
      this.pushError("test", "test2");
      this.pushInfo("test", "test2");
      /*this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          //callback to execute when user confirms the action
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });*/
    },

  },
  created () {
    this.getAllSubjects().then(()=>{
      this.subjects.forEach(el => console.log(el.name + el.active))
    })
  },

  mounted() {
    this.$toast.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000});
  }

}
</script>

<style>

</style>
