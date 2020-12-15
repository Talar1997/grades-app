<template>
  <Dialog v-model:visible="gradeAddDialog"
          v-bind:style="{width: '350px'}"
          header="Dodaj nową ocenę"
          v-bind:modal="true" class="p-fluid">
    <div class="p-field">
      <label for="student">Student</label>
      <InputText id="student" v-model="dialogStudent.name" disabled/>
    </div>
    <div class="p-field">
      <label for="category">Kategoria</label>
      <Dropdown id="category"
                v-model="newGrade.category"
                v-bind:options="categories"

                v-bind:editable="true"/>
      <small class="p-invalid" v-if="submitted && !newGrade.category">Wprowadzenie kategorii jest wymagane</small>
    </div>
    <div class="p-field">
      <label for="grade">Ocena</label>
      <SelectButton id="grade" v-model="newGrade.grade" v-bind:options="grades" required="true"/>
      <small class="p-invalid" v-if="submitted && !newGrade.grade">Wprowadzenie oceny jest wymagane</small>
    </div>
    <div class="p-field">
      <label for="severity">
        Waga:
        <Tag class="grade-tag" v-bind:severity="countSeverity(newGrade.severity)">{{ newGrade.severity }}</Tag>
      </label>
      <Slider id="severity" v-model="newGrade.severity" v-bind:step="5" required="true"/>
      <small class="p-invalid" v-if="submitted && !newGrade.severity">Wprowadzenie wagi jest wymagane</small>
    </div>
    <template #footer>
      <Button label="Anuluj" icon="pi pi-times" class="p-button-text p-button-secondary" v-on:click="hideDialog"/>
      <Button label="Zapisz" icon="pi pi-check" class="p-button" v-on:click="postGrade"/>
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
      categories: [
        "Sprawdzian",
        "Kartkówka",
        "Kolokwium",
        "Odpowiedź ustna",
      ],
      grades: [2, 3, 4, 5],
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
        console.log(this.newGrade)
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
    //fixme: dlaczego nie działa?
    this.emitter.on("add-grade-modal", student => {
      this.dialogStudent = student;
      this.gradeAddDialog = true;
    })
  }
}
</script>

<style scoped>

</style>