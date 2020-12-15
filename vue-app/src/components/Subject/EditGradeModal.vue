<template>
  <Dialog v-model:visible="gradeAddDialog"
          class="p-fluid"
          header="Szczegóły oceny"
          v-bind:modal="true" v-bind:style="{width: '350px'}">

    <div class="p-field">
      <label for="student">Student</label>
      <InputText id="student" v-model="dialogStudent.name" disabled/>
    </div>

    <div class="p-field">
      <label for="category">Kategoria</label>
      <InputText id="category"
                 v-bind:value="grade.category" disabled/>
    </div>

    <div class="p-field">
      <label for="grade">Ocena</label>
      <InputText id="grade" v-model="grade.grade" disabled/>
    </div>

    <div class="p-field">
      <label for="added">Dodane</label>
      <InputText id="added" v-model="grade.added" disabled/>
    </div>

    <div class="p-field">
      <label for="severity">
        Waga: <br/>
        <Tag class="grade-tag" id="severity" v-bind:severity="countSeverity(grade.severity)">{{ grade.severity }}</Tag>
      </label>
    </div>

    <template #footer>
      <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Zamknij" v-on:click="hideDialog"/>
      <Button class="p-button p-button-danger" icon="pi pi-times" label="Usuń" v-on:click="deleteGrade"/>
    </template>

  </Dialog>
</template>

<script>
import Dialog from "primevue/components/dialog/Dialog";
import InputText from "primevue/components/inputtext/InputText";
import Tag from "primevue/components/tag/Tag";
import Button from "primevue/components/button/Button";
import {notificationMixin} from "@/mixins/notificationMixin";
import {gradesMixin} from "@/mixins/gradesMixin";
import {mapActions} from "vuex";

export default {
  name: "EditGradeModal",

  components: {
    Dialog,
    InputText,
    Tag,
    Button
  },

  mixins: [
    notificationMixin,
    gradesMixin
  ],

  data() {
    return {
      gradeAddDialog: false,
      dialogStudent: {},
      grade: {
        grade: null,
        severity: 50,
        category: null,
      },
    }
  },

  methods: {
    ...mapActions({
      updateStudent: 'students/updateOne'
    }),

    hideDialog() {
      this.gradeAddDialog = false
      this.grade = null;
    },

    deleteGrade() {
      let newGrades = [...this.dialogStudent.grades]
      let removeIndex = newGrades.map(grade => grade._id).indexOf(this.grade._id)
      newGrades.splice(removeIndex, 1)

      const studentToUpdate = {
        _id: this.dialogStudent._id,
        grades: newGrades
      }

      this.updateStudent(studentToUpdate)
          .then(() => {
            this.pushSuccess("Sukces", "Pomyślnie usunięto ocenę")
            this.hideDialog()
          })
          .catch(() => {
            this.pushError("Błąd", "Coś poszło nie tak")
          })
    }
  },

  mounted() {
    this.emitter.on("edit-grade-modal", (studentGrade) => {
      this.grade = studentGrade.grade
      this.dialogStudent = studentGrade.student
      this.gradeAddDialog = true;
    })
  }

}
</script>

<style scoped>
@import "../../assets/css/grades.css";
</style>