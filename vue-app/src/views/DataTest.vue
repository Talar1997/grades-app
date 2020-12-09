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

    <Dialog header="Header" v-model:visible="display" >
      <InputText id="email" type="text"/><br/><br/>
      <InputText id="test2" type="text"/>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" autofocus />
      </template>
    </Dialog>
  </main-layout>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import MainLayout from '@/layouts/Main';
import Dialog from "primevue/dialog";
import Button from "primevue/components/button/Button";
import InputText from "primevue/components/inputtext/InputText";

export default {
  name: 'DataTest',
  components:{
    MainLayout,
    Dialog,
    Button,
    InputText,
  },
  data(){
    return{
      display: true,
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
    }

  },
  created () {
    this.getAllSubjects().then(()=>{
      this.subjects.forEach(el => console.log(el.name + el.active))
    })
  },

}
</script>

<style>

</style>
