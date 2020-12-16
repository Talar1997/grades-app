<template>
  <div class="p-grid p-fluid">
    <div class="p-col-12 p-md-12">
      <div class="p-inputgroup">
        <Chips v-model="newStudents" placeholder="Wprowadź nowych studentów oddzielając ich znakiem ',' bądź wciskając enter"
               separator=","></Chips>
      </div>
    </div>
    <div class="p-col-12 p-md-4">
      <div class="p-inputgroup">
        <Button id="addNewStudentsButton"
                class="p-button-outlined"
                icon="pi pi-check"
                label="Dodaj"
                v-bind:disabled="!isSubjectActive"
                v-on:click="confirmAction($event, addStudents)">
        </Button>
      </div>
    </div>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script>
import {notificationMixin} from "@/mixins/notificationMixin";
import {mapActions} from "vuex";
import Chips from "primevue/components/chips/Chips";
import Button from "primevue/components/button/Button";
import ConfirmPopup from "primevue/components/confirmpopup/ConfirmPopup";

export default {
  name: "AddNewStudents",

  data() {
    return {
      newStudents: [],
    }
  },

  components: {
    Button,
    Chips,
    ConfirmPopup
  },

  mixins: [
    notificationMixin
  ],

  props: {
    subject: {required: true},
    isSubjectActive: {required: true},
  },


  methods: {
    ...mapActions({
      createNewStudent: "students/createNewStudent",
    }),

    addStudents() {
      this.newStudents.forEach(newStudent => {
        const student = {
          name: newStudent.trim(),
          subject: this.subject._id,
          grades: [],
          absences: [],
        }
        this.createNewStudent(student).catch(() => {
          this.pushError("Błąd", "Coś poszło nie tak")
        })
      })

      if (this.newStudents.length > 0) this.pushSuccess("Sukces", "Pomyślnie dodano nowych studentów")
      else this.pushInfo("Brak danych", "Wprowadź dane")

      this.newStudents = []
    },
  }
}
</script>

<style scoped>

</style>