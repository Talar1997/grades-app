<template>
  <Dialog v-model:visible="subjectDialog"
          header="Dodaj nowy przedmiot"
          v-bind:modal="true"
          class="p-fluid add-subject-modal">
    <div class="p-field">
      <label for="name">Nazwa</label>
      <InputText id="name" v-model.trim="subject.name" required="true" autofocus
                 v-bind:class="{'p-invalid': submitted && !subject.name}"/>
      <small class="p-invalid" v-if="submitted && !subject.name">Nazwa przedmiotu jest wymagana</small>
    </div>
    <div class="p-field">
      <label for="name">Data pierwszych zajęć</label>
      <Calendar id="date"
                v-model="subject.date"
                v-bind:inline="true"/>
      <small class="p-invalid" v-if="submitted && !subject.date">Data jest wymagana</small>
    </div>
    <div class="p-field">
      <label for="name">Godzina zajęć</label>
            <Calendar id="time"
                      v-model="subject.hours"
                      v-bind:showTime="true"
                      v-bind:timeOnly="true"
                      v-bind:inline="true"/>
      <small class="p-invalid" v-if="submitted && !subject.hours">Godzina jest wymagana</small>
    </div>

    <template #footer>
      <Button label="Anuluj" icon="pi pi-times" class="p-button-text p-button-secondary" v-on:click="hideDialog"/>
      <Button label="Zapisz" icon="pi pi-check" class="p-button" v-on:click="saveSubject"/>
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/components/button/Button";
import InputText from "primevue/components/inputtext/InputText";
import Dialog from "primevue/components/dialog/Dialog";
import Calendar from 'primevue/calendar';
import {mapActions} from "vuex";
import {notificationMixin} from "@/mixins/notoficationMixin";

export default {
  name: "AddSubjectModal",
  components: {
    Dialog,
    InputText,
    Button,
    Calendar
  },

  data() {
    return {
      subjectDialog: false,
      submitted: false,
      subject: {},
    }
  },

  mixins: [
    notificationMixin
  ],

  methods: {
    ...mapActions('subjects', [
      'createNewSubject'
    ]),

    hideDialog() {
      this.subjectDialog = false;
      this.submitted = false;
    },

    saveSubject() {
      this.submitted = true;
      this.subject.owner = JSON.parse(localStorage.getItem('user')).data.user._id;

      this.subject.date.setHours(this.subject.hours.getHours() + 1)
      this.subject.date.setMinutes(this.subject.hours.getMinutes())

      this.createNewSubject(this.subject)
          .then(() => {
            this.pushSuccess("Sukces","Utworzono nowy przedmiot");
            this.subjectDialog = false;
            this.subject = {};
          })
          .catch(() => {
            this.pushError("Błąd", "Wystąpił błąd podczas tworzenia nowego przedmiotu");
          });
    }
  },
  mounted() {
    this.emitter.on("toggle-add-subject-modal", isOpen => {
      this.subjectDialog = isOpen;
      this.subject = {};
      this.submitted = false;
    });
  }
}
</script>

<style scoped>
@import "../../assets/css/modal.css";
</style>