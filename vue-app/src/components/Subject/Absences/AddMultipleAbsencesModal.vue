<template>
  <div>
    <Dialog v-model:visible="absenceAddDialog"
            class="p-fluid"
            header="Dodaj nieobecnośći"
            v-bind:modal="true" v-bind:style="{width: '500px'}">

      <div class="p-field">
        <label for="date">Data</label>
        <Dropdown id="date"
                  v-model="globalDate"
                  v-bind:editable="true"
                  v-bind:options="availableDates"/>
        <small v-if="submitted && !globalDate" class="p-invalid">Wprowadzenie daty jest wymagane</small>
      </div>

      <div class="p-field" v-for="student in students" v-bind:key="student._id">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon" style="width: 35%; justify-content: left">{{ student.name }}</span>
          <SelectButton id="grade" v-model="student.newAbsence" required="true" v-bind:options="absences"
                        style="width: 65%"/>
        </div>
      </div>

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

export default {
  name: "AddMultipleAbsencesModal",

  components: {
    Dialog,
    Dropdown,
    SelectButton,
    Button
  },

  mixins:[
      dateMixin
  ],

  data() {
    return {
      absenceAddDialog: false,
      globalDate: null,
      availableDates: [],
      submitted: false,
      subject: {},
      students: [],
      absences: ['Nieobecny', 'Obecny']
    }
  },

  methods:{
    resetModal(){
      this.globalDate = null
      this.availableDates = []
      this.submitted = false
      this.students = []
      this.subject = {}
    },

    postAbsences(){
      console.log(this.students);
    },

    hideDialog(){
      this.absenceAddDialog = false
      this.resetModal()
    }
  },

  mounted() {
    this.emitter.on("add-multiple-absences-modal", (subjectData) => {
      this.resetModal()
      this.subject = subjectData.subject

      for(let i = 1; i <= subjectData.weeks; i++){
        const availableDate = this.computeDate(i, subjectData.subject.date)
        this.availableDates.push(availableDate.format('DD/MM/YYYY'))
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

      console.log(this.availableDates)
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