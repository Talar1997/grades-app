<template>
  <div>
    <h3>Ustawienia przedmiotu</h3>
    <SubjectEditForm v-bind:subject="subject" v-bind:students="students"></SubjectEditForm>
    <Divider/>

    <h3>Dodaj nowych studentów</h3>
    <AddNewStudents v-bind:subject="subject"></AddNewStudents>

    <Divider/>
    <h3>Lista studentów</h3>
    <div v-if="students.length === 0" class="p-p-2">Brak studentów przypisanych do przedmiotu</div>
    <StudentsDataTable v-else v-bind:subject="subject" v-bind:students="students"></StudentsDataTable>

  </div>
</template>

<script>
import Divider from "primevue/components/divider/Divider";
import SubjectEditForm from "@/components/Subject/Settings/SubjectEditForm";
import AddNewStudents from "@/components/Subject/Settings/AddNewStudents";
import StudentsDataTable from "@/components/Subject/Settings/StudentsDataTable";

export default {
  name: "SettingsTab",

  components: {
    StudentsDataTable,
    AddNewStudents,
    SubjectEditForm,
    Divider
  },

  props: {
    subject: {required: true},
    students: {required: true}
  },
}
</script>

<style scoped>
</style>