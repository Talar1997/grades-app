<template>
  <div>
    <Dialog v-model:visible="gradeAddDialog"
            class="p-fluid"
            header="Dodaj oceny"
            v-bind:modal="true" v-bind:style="{width: '500px'}">

      <div class="p-field">
        <label for="student">Student</label>
        <InputText id="student" value="Wszyscy studenci" disabled/>
      </div>

      <div class="p-field">
        <label for="category">Kategoria</label>
        <Dropdown id="category"
                  v-model="globalCategory"
                  v-bind:editable="true"
                  v-bind:options="categories"/>
        <small v-if="submitted && !globalCategory" class="p-invalid">Wprowadzenie kategorii jest wymagane</small>
      </div>

      <div class="p-field">
        <label for="severity">
          Waga:
          <Tag class="grade-tag" v-bind:severity="countSeverity(globalSeverity)">{{ globalSeverity }}</Tag>
        </label>
        <Slider id="severity" v-model="globalSeverity" required="true" v-bind:step="5"/>
        <small v-if="submitted && !globalSeverity" class="p-invalid">Wprowadzenie wagi jest wymagane</small>
      </div>

      <label for="grade">Oceny</label>

      <!--      TODO: pętla po każdym studencie-->
      <div class="p-field" v-for="student in students" v-bind:key="student._id">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon" style="width: 35%; justify-content: left">{{ student.name }}</span>
          <SelectButton id="grade" v-model="student.newGrade.grade" required="true" v-bind:options="grades"
                        style="width: 65%"/>
        </div>
      </div>

      <template #footer>
        <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Anuluj" v-on:click="hideDialog"/>
        <Button class="p-button" icon="pi pi-check" label="Zapisz" v-on:click="postGrades"/>
      </template>

    </Dialog>
  </div>
</template>

<script>
import {gradesMixin} from "@/mixins/gradesMixin";
import Dialog from "primevue/components/dialog/Dialog";
import Dropdown from "primevue/components/dropdown/Dropdown";
import SelectButton from "primevue/components/selectbutton/SelectButton";
import Slider from "primevue/components/slider/Slider";
import InputText from "primevue/components/inputtext/InputText";
import Tag from "primevue/components/tag/Tag";
import Button from "primevue/components/button/Button";
import {mapActions} from "vuex";
import {notificationMixin} from "@/mixins/notificationMixin";

export default {
  name: "AddMultipleGradesModal",

  components: {
    Dialog,
    Dropdown,
    SelectButton,
    Slider,
    InputText,
    Tag,
    Button
  },

  mixins: [
    gradesMixin,
    notificationMixin
  ],

  data() {
    return {
      gradeAddDialog: false,
      submitted: false,
      globalCategory: null,
      globalSeverity: 50,
      newGrade: {},
      students: []
    }
  },

  methods: {
    ...mapActions({
      updateStudent: 'students/updateOne'
    }),

    postGrades() {
      let pushedGrades = 0
      this.submitted = true

      if(!this.isValid()){
        return
      }

      this.students.forEach(student => {
        if (typeof student.newGrade.grade !== 'undefined') {
          pushedGrades++
          student.newGrade.severity = this.globalSeverity
          student.newGrade.category = this.globalCategory
          student.grades.push(student.newGrade)

          const updatedStudent = {
            _id: student._id,
            grades: [...student.grades]
          }

          this.updateStudent(updatedStudent)
              .catch(() => {
                this.pushError("Błąd", "Coś poszło nie tak!")
              })
        }
      })

      if (pushedGrades > 0) {
        this.pushSuccess("Sukces", "Pomyślnie dodano oceny")
        this.hideDialog()
      } else {
        this.pushInfo("Informacja", "Nie zaznaczono żadnej oceny")
      }
    },

    isValid() {
      return this.globalCategory !== null && this.globalCategory !== ""
    },

    hideDialog() {
      this.gradeAddDialog = false
      this.submitted = false
      this.globalSeverity = 50
      this.globalCategory = null
      this.students = []
    },
  },

  mounted() {
    this.emitter.on("add-multiple-grades-modal", students => {
      this.students = []
      this.submitted = false
      this.gradeAddDialog = true

      students.forEach(student => {
        const temporaryStudent = {
          _id: student._id,
          name: student.name,
          grades: [...student.grades],
          newGrade: {}
        }

        this.students.push(temporaryStudent)
      })
    })
  }
}
</script>

<style scoped>
.p-inputgroup-addon {
  background: white !important;
  border: none !important;
  color: black !important;
}
</style>