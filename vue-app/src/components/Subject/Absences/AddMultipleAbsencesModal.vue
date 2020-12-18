<template>
  <div>
    <Dialog v-model:visible="absenceAddDialog"
            class="p-fluid"
            header="Dodaj nieobecnośći"
            v-bind:modal="true" v-bind:style="{width: '500px'}">

      <div class="p-field">
        <label for="date">Data</label>
        <Dropdown id="date"
                  optionLabel="name"
                  v-model="globalDate"
                  v-bind:editable="false"
                  v-bind:options="availableDates"/>
        <small v-if="submitted && !globalDate" class="p-invalid">Wprowadzenie daty jest wymagane</small>
      </div>

      <div class="p-field" v-for="student in students" v-bind:key="student._id">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon" style="width: 35%; justify-content: left">{{ student.name }}</span>
          <SelectButton id="grade" optionLabel="name"
                        v-model="student.newAbsence"
                        required="true"
                        v-bind:options="absences"
                        style="width: 65%"/>
        </div>
      </div>
      <small v-if="submitted && !allSelected" class="p-invalid">Wprowadzenie obecności jest wymagane</small>

      <template #footer>
        <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Anuluj" v-on:click="hideDialog"/>
        <Button class="p-button" icon="pi pi-check" label="Zapisz" v-on:click="postAbsences"/>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/components/dialog/Dialog";
import Dropdown from "primevue/components/dropdown/Dropdown";
import {dateMixin} from "@/mixins/dateMixin";
import SelectButton from "primevue/components/selectbutton/SelectButton";
import Button from "primevue/components/button/Button";
import moment from 'moment'
import {mapActions} from "vuex";
import {notificationMixin} from "@/mixins/notificationMixin";


export default {
  name: "AddMultipleAbsencesModal",

  components: {
    Dialog,
    Dropdown,
    SelectButton,
    Button
  },

  mixins: [
    dateMixin,
    notificationMixin
  ],

  data() {
    return {
      absenceAddDialog: false,
      globalDate: null,
      availableDates: [],
      submitted: false,
      subject: {},
      students: [],
      absences: [
        {name: "Nieobecny", value: false},
        {name: "Obecny", value: true},
      ],
      allSelected: false,
    }
  },

  methods: {
    ...mapActions({
      updateStudent: 'students/updateOne'
    }),

    resetModal() {
      this.globalDate = null
      this.availableDates = []
      this.submitted = false
      this.students = []
      this.subject = {}
      this.allSelected = false
    },

    postAbsences() {
      let pushedAbsences = 0
      this.submitted = true

      if (!this.isValid()) return

      this.students.forEach(student => {
        if (typeof student.newAbsence.value !== 'undefined') {
          pushedAbsences++

          const newAbsence = {
            isAbsence: student.newAbsence.value,
            date: moment(this.globalDate.value).toISOString()
          }

          //TODO: check for duplicated dates in absences array and replace it by new one
          student.absences.push(newAbsence)

          const updatedStudent = {
            _id: student._id,
            absences: [...student.absences]
          }

          this.updateStudent(updatedStudent)
              .catch(() => {
                this.pushError("Błąd", "Coś poszło nie tak!")
              })
        }
      })

      if (pushedAbsences > 0) {
        this.pushSuccess("Sukces", "Pomyślnie dodano obecności")
        this.hideDialog()
      } else {
        this.pushInfo("Informacja", "Nie zaznaczono żadnego pola")
      }
    },

    hideDialog() {
      this.absenceAddDialog = false
      this.resetModal()
    },

    isValid() {
      this.allSelected = true
      this.students.forEach(student =>{
        if (typeof student.newAbsence.value === 'undefined') {
          this.allSelected = false
        }
      })

      return this.globalDate !== null && this.allSelected
    }
  }
  ,

  mounted() {
    this.emitter.on("add-multiple-absences-modal", (subjectData) => {
      this.resetModal()
      this.subject = subjectData.subject

      for (let i = 1; i <= subjectData.weeks; i++) {
        const date = this.computeDate(i, subjectData.subject.date)

        const availableDate = {
          value: moment(date).toISOString(),
          name: date.format('DD/MM/YYYY')
        }
        this.availableDates.push(availableDate)
      }

      subjectData.students.forEach(student => {
        const temporaryStudent = {
          _id: student._id,
          name: student.name,
          absences: [...student.absences],
          newAbsence: {}
        }

        this.students.push(temporaryStudent)
      })

      this.absenceAddDialog = true
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