<template>
  <div>
    <EmptyTab v-if="students.length === 0 & loadedData"
              message="Brak studentów przypisanych do przedmiotu. Dodaj ich w zakładce 'Ustawienia'"
              title="Brak danych!">
    </EmptyTab>
    <div v-else>
      <DataTable id="studentsTable" dataKey="_id" v-bind:value="students">
        <Column field="name" header="Imie i nazwisko" headerStyle="width:15%"></Column>

        <Column field="absences" v-bind:header="weekLabel(weekNumber)" v-for="weekNumber in weeks"
                v-bind:key="weekNumber">
          <template #body="row">
          <span v-if="isAbsenceInWeek(row.data.absences, weekNumber)">
            <Absence v-bind:absence="getAbsenceData(row.data.absences, weekNumber)" v-bind:student="row.data"></Absence>
          </span>
            <span v-else></span>
          </template>
        </Column>
      </DataTable>

      <Button class="p-button-outlined" icon="pi pi-plus" label="Zarządzaj obecnościami"
              style="float: right; margin-top: 10px"
              v-on:click="manageAbsences()" v-bind:disabled="!isSubjectActive"/>
      <div class="clear-both"></div>
    </div>

    <AddMultipleAbsencesModal></AddMultipleAbsencesModal>
    <EditAbsenceModal></EditAbsenceModal>

  </div>
</template>

<script>
import EmptyTab from "@/components/Subject/EmptyTab";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import Button from "primevue/components/button/Button";
import {dateMixin} from "@/mixins/dateMixin";
import AddMultipleAbsencesModal from "@/components/Subject/Absences/AddMultipleAbsencesModal";
import Absence from "@/components/Subject/Absences/Absence";
import EditAbsenceModal from "@/components/Subject/Absences/EditAbsenceModal";

export default {
  name: "AbsencesTab",
  components: {
    AddMultipleAbsencesModal,
    EmptyTab,
    DataTable,
    Column,
    Button,
    Absence,
    EditAbsenceModal
  },

  props: {
    subject: {required: true},
    students: {required: true},
    isSubjectActive: {required: true},
  },

  mixins: [
    dateMixin
  ],

  data() {
    return {
      weeks: 20,
      manageMode: false,
      allStudents: [],
      loadedData: false
    }
  },

  methods: {
    manageAbsences() {
      this.emitter.emit('add-multiple-absences-modal', {
        students: this.students,
        subject: this.subject,
        weeks: this.weeks
      })
    },

    weekLabel(week) {
      return this.computeDate(week, this.subject.date).format('DD/MM YYYY')
    },


    isAbsenceInWeek(absenceList, week) {
      return this.getAbsenceData(absenceList, week) !== null
    },

    getAbsenceData(absenceList, week) {
      const currentDate = this.computeDate(week, this.subject.date)
      let result = null

      if (absenceList.length > 0) {
        absenceList.forEach(absence => {

          if (this.compareDates(absence.date, currentDate)) result = absence
        })
      }

      return result
    },
  },

  mounted() {
    setTimeout(()=>{
      this.loadedData = true
    }, 100)
  }
}
</script>

<style scoped>

</style>