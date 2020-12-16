<template>
  <Dialog v-model:visible="gradeAddDialog"
          class="p-fluid"
          header="Dodaj nową ocenę"
          v-bind:modal="true" v-bind:style="{width: '350px'}">

    <div class="p-field">
      <label for="student">Student</label>
      <InputText id="student" v-model="dialogStudent.name" disabled/>
    </div>

    <div class="p-field">
      <label for="category">Kategoria</label>
      <Dropdown id="category"
                v-model="newGrade.category"
                v-bind:editable="true"
                v-bind:options="categories"/>
      <small v-if="submitted && !newGrade.category" class="p-invalid">Wprowadzenie kategorii jest wymagane</small>
    </div>

    <div class="p-field">
      <label for="grade">Ocena</label>
      <SelectButton id="grade" v-model="newGrade.grade" required="true" v-bind:options="grades"/>
      <small v-if="submitted && !newGrade.grade" class="p-invalid">Wprowadzenie oceny jest wymagane</small>
    </div>

    <div class="p-field">
      <label for="severity">
        Waga:
        <Tag class="grade-tag" v-bind:severity="countSeverity(newGrade.severity)">{{ newGrade.severity }}</Tag>
      </label>
      <Slider id="severity" v-model="newGrade.severity" required="true"
              v-bind:step="severity.step"
              v-bind:min="severity.min"
              v-bind:max="severity.max"/>
      <small v-if="submitted && !newGrade.severity" class="p-invalid">Wprowadzenie wagi jest wymagane</small>
    </div>

    <template #footer>
      <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Anuluj" v-on:click="hideDialog"/>
      <Button class="p-button" icon="pi pi-check" label="Zapisz" v-on:click="postGrade"/>
    </template>

  </Dialog>
</template>

<script>
import {notificationMixin} from "@/mixins/notificationMixin";
import {gradesMixin} from "@/mixins/gradesMixin";
import {mapActions} from "vuex";
import Dialog from "primevue/components/dialog/Dialog";
import Dropdown from "primevue/components/dropdown/Dropdown";
import SelectButton from "primevue/components/selectbutton/SelectButton";
import Slider from "primevue/components/slider/Slider";
import InputText from "primevue/components/inputtext/InputText";
import Tag from "primevue/components/tag/Tag";
import Button from "primevue/components/button/Button";

export default {
  name: "AddGradeModal",

  components: {
    Dialog,
    Dropdown,
    SelectButton,
    Slider,
    InputText,
    Tag,
    Button
  },

  data() {
    return {
      gradeAddDialog: false,
      dialogStudent: {},
      submitted: false,
      newGrade: {
        grade: null,
        severity: 50,
        category: null,
      },
    }
  },

  mixins: [
    notificationMixin,
    gradesMixin
  ],

  methods: {
    ...mapActions({
      updateStudent: 'students/updateOne'
    }),

    postGrade() {
      this.submitted = true
      if (this.isValid(this.newGrade)) {

        let updatedStudent = {
          _id: this.dialogStudent._id,
          grades: [...this.dialogStudent.grades]
        }

        updatedStudent.grades.push(this.newGrade)
        this.updateStudent(updatedStudent)
            .then(() => {
              this.pushSuccess("Sukces", "Pomyślnie dodano ocenę")
              this.hideDialog()
            })
            .catch(() => {
              this.pushError("Błąd", "Coś poszło nie tak")
            })
      }
    },

    isValid(grade) {
      return grade.grade !== null && grade.category !== null && grade.category !== ""
    },

    hideDialog() {
      this.gradeAddDialog = false
      this.submitted = false
      this.newGrade.grade = null
      this.newGrade.category = null
      this.newGrade.severity = 50
    },
  },

  mounted() {
    this.emitter.on("add-grade-modal", student => {
      this.dialogStudent = student;
      this.gradeAddDialog = true;
    })
  }
}
</script>

<style scoped>

</style>