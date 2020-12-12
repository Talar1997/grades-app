<template>
  <div>
    <!--TODO: podzielić settings na 3 osobne komponenty    -->
    <h3>Ustawienia przedmiotu</h3>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-3">
        <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
          <InputText placeholder="Nazwa przedmiotu" v-model="updatedSubject.name"/>
        </div>
      </div>

      <div class="p-col-12 p-md-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon"><i class="pi pi-calendar"></i></span>

          <Calendar id="date"
                    v-model="updatedSubject.date"
                    v-bind:inline="false"/>
        </div>
      </div>

      <div class="p-col-12 p-md-3">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon"><i class="pi pi-clock"></i> </span>

          <Calendar id="time"
                    v-model="updatedSubject.hours"
                    v-bind:showTime="true"
                    v-bind:timeOnly="true"
                    v-bind:inline="false"/>
        </div>
      </div>

      <div class="p-col-12 p-md-3">
        <div class="p-inputgroup">

          <SelectButton v-bind:options="selectOptions" optionLabel="name" optionValue="value"
                        v-model="updatedSubject.active" style="width: 100%" v-on:click="updateSubject">
          </SelectButton>
        </div>
      </div>

      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <Button v-on:click="confirmAction($event, updateSubject)" icon="pi pi-check" label="Zapisz zmiany" class="p-button-outlined"></Button>
          <Button v-on:click="confirmAction($event, deleteSubject)" icon="pi pi-times" class="p-button-danger p-ml-2 p-button-outlined"
                  label="Usuń przedmiot"></Button>
        </div>
      </div>

    </div>
    <Divider/>

    <h3>Dodaj nowych studentów</h3>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-12">
        <div class="p-inputgroup">
          <Chips v-model="newStudents" separator=","
                 placeholder="Wprowadź nowych studentów oddzielając ich znakiem ',' bądź wciskając enter"></Chips>
        </div>
      </div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <Button v-on:click="confirmAction($event, addStudents)"
                  icon="pi pi-check"
                  label="Dodaj"
                  class="p-button-outlined"
                  id="addNewStudentsButton">
          </Button>
        </div>
      </div>
    </div>

    <Divider/>
    <h3>Lista studentów</h3>
    <div v-if="students.length === 0" class="p-p-2">Brak studentów przypisanych do przedmiotu</div>
    <ul v-else>
      <li v-for="student in students"
          :key="student._id">
        {{ student.name }}
      </li>
    </ul>

  </div>
  <ConfirmPopup></ConfirmPopup>
</template>

<script>
import Divider from "primevue/components/divider/Divider";
import Chips from "primevue/components/chips/Chips";
import InputText from "primevue/components/inputtext/InputText";
import Button from "primevue/components/button/Button";
import SelectButton from 'primevue/components/selectbutton/SelectButton';
import {mapActions} from "vuex";
import ConfirmPopup from "primevue/components/confirmpopup/ConfirmPopup";
import {notificationMixin} from "@/mixins/notoficationMixin";
import Calendar from "primevue/components/calendar/Calendar";

export default {
  name: "SettingsTab",

  components: {
    Divider,
    Chips,
    InputText,
    Button,
    SelectButton,
    ConfirmPopup,
    Calendar
  },

  props: {
    subject: {required: true},
    students: {required: true}
  },

  data() {
    return {
      newStudents: [],
      updatedSubject: {},
      selectOptions: [
        {name: 'Aktywny', value: true},
        {name: 'Nieaktywny', value: false},
      ],
    }
  },

  mixins: [
    notificationMixin
  ],

  methods: {
    ...mapActions({
      createNewStudent: "students/postStudent",
      removeSubject: "subject/removeSubject"
    }),

    updateSubject() {
      //TODO: dokończyć
    },

    deleteSubject() {
      if(this.students.length !== 0){
        this.pushError("Błąd", "Nie można usunąć przedmiotu jeżeli znajdują się w nim studenci")
      }
      else{
        this.removeSubject(this.subject._id)
        .then(()=>{
          this.pushSuccess("Sukces", "Pomyślnie usunięto przedmiot")
          this.$router.push("/dashboard")
        })
      }
    },

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

      if(this.newStudents.length > 0) this.pushSuccess("Sukces", "Pomyślnie dodano nowych studentów")
      else this.pushInfo("Brak danych", "Wprowadź dane")

      this.newStudents = []
    },
  },

  watch:{
    subject(newValue, oldValue){
      console.log(oldValue)

      this.updatedSubject.name = newValue.name;
      this.updatedSubject.date = new Date(newValue.date).toLocaleDateString()
      this.updatedSubject.hours = new Date(newValue.date)
      this.updatedSubject.hours.setHours(this.updatedSubject.hours.getHours() - 1)
      this.updatedSubject.hours = this.updatedSubject.hours.toLocaleTimeString()

      this.updatedSubject.active = newValue.active
    }
  }
}
</script>

<style scoped>
h3 {
  text-transform: uppercase;
}

</style>