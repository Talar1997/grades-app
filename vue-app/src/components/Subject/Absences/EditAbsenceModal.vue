<template>
  <Dialog v-model:visible="absenceEditModal"
          class="p-fluid"
          header="Szczegóły obecności"
          v-bind:modal="true" v-bind:style="{width: '350px'}">

    <div class="p-field">
      <label for="student">Student</label>
      <InputText id="student" v-model="dialogStudent.name" disabled/>
    </div>

    <div class="p-field">
      <label for="ansenceDate">Nieobecność z dnia</label>
      <InputText id="ansenceDate" v-model="absence.date" disabled/>
    </div>

    <div class="p-field">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon" style="width: 40%; justify-content: left">Obecność</span>
        <SelectButton optionLabel="name"
                      v-model="absence.isAbsence"
                      required="true"
                      v-bind:options="absences"
                      style="width: 60%"/>
      </div>
    </div>

    <div class="p-field" v-if="!absence.isAbsence.value">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon" style="width: 40%; justify-content: left">Usprawiedliwione</span>
        <SelectButton optionLabel="name"
                      v-model="absence.isJustified"
                      required="true"
                      v-bind:options="justified"
                      style="width: 60%"/>
      </div>
    </div>

    <template #footer>
      <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Zamknij" v-on:click="hideDialog"/>
      <Button class="p-button p-button-primary" icon="pi pi-check" label="Zapisz" v-on:click="updateAbsence"/>
    </template>

  </Dialog>
</template>

<script>
import Dialog from "primevue/components/dialog/Dialog"
import Button from "primevue/components/button/Button"
import InputText from "primevue/components/inputtext/InputText"
import moment from 'moment'
import SelectButton from "primevue/components/selectbutton/SelectButton";
import {mapActions} from "vuex";
import {notificationMixin} from "@/mixins/notificationMixin";

export default {
  name: "EditAbsenceModal",

  components: {
    InputText,
    Button,
    Dialog,
    SelectButton
  },

  mixins: [
    notificationMixin
  ],

  data() {
    return {
      absenceEditModal: false,
      dialogStudent: {},
      absence: {},
      originalAbsence: {},
      absences: [
        {name: "Nieobecny", value: false},
        {name: "Obecny", value: true},
      ],

      justified: [
        {name: "Nie", value: false},
        {name: "Tak", value: true},
      ],
    }
  },

  methods: {
    ...mapActions({
      updateStudent: 'students/updateOne'
    }),

    hideDialog() {
      this.absenceEditModal = false
      this.absence = null
      this.originalAbsence = null
      this.dialogStudent = null
    },

    updateAbsence() {
      let newAbsences = [...this.dialogStudent.absences]
      let removeIndex = newAbsences.map(absence => absence._id).indexOf(this.absence._id)
      newAbsences.splice(removeIndex, 1)

      const newAbsence = {
        id: this.absence._id,
        isAbsence: this.absence.isAbsence.value,
        isJustified: this.absence.isJustified.value,
        date: this.originalAbsence.date
      }
      newAbsences.push(newAbsence)

      const studentToUpdate = {
        _id: this.dialogStudent._id,
        absences: newAbsences
      }

      this.updateStudent(studentToUpdate)
          .then(() => {
            this.pushSuccess("Sukces", "Pomyślnie edytowano absencję")
            this.hideDialog()
          })
          .catch(() => {
            this.pushError("Błąd", "Coś poszło nie tak")
          })
    }
  },

  mounted() {
    this.emitter.on('edit-absence-modal-open', absence => {
      this.absenceEditModal = true
      this.originalAbsence = absence.absence

      const absenceName = !absence.absence.isAbsence ? 'Nieobecny' : 'Obecny'
      const justifiedName = !absence.absence.isJustified ? 'Nie' : 'Tak'

      this.absence = {
        _id: absence.absence._id,
        isAbsence: {name: absenceName, value: absence.absence.isAbsence},
        isJustified: {name: justifiedName, value: absence.absence.isJustified},
        date: moment(absence.absence.date).format('DD/MM/YYYY')
      }

      this.dialogStudent = absence.student
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