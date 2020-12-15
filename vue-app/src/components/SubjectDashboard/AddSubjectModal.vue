<template>
  <Dialog v-model:visible="subjectDialog"
          class="p-fluid add-subject-modal"
          header="Dodaj nowy przedmiot"
          v-bind:modal="true">
    <div class="p-field">
      <label for="name">Nazwa</label>
      <InputText id="name" v-model.trim="subject.name" autofocus required="true"
                 v-bind:class="{'p-invalid': submitted && !subject.name}"/>
      <small v-if="submitted && !subject.name" class="p-invalid">Nazwa przedmiotu jest wymagana</small>
    </div>
    <div class="p-field">
      <label for="name">Data pierwszych zajęć</label>
      <Calendar id="date"
                v-model="subject.date"
                v-bind:inline="true"/>
      <small v-if="submitted && !subject.date" class="p-invalid">Data jest wymagana</small>
    </div>
    <div class="p-field">
      <label for="name">Godzina zajęć</label>
      <Calendar id="time"
                v-model="subject.hours"
                v-bind:inline="true"
                v-bind:showTime="true"
                v-bind:timeOnly="true"/>
      <small v-if="submitted && !subject.hours" class="p-invalid">Godzina jest wymagana</small>
    </div>

    <template #footer>
      <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Anuluj" v-on:click="hideDialog"/>
      <Button class="p-button" icon="pi pi-check" label="Zapisz" v-on:click="saveSubject"/>
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/components/button/Button";
import InputText from "primevue/components/inputtext/InputText";
import Dialog from "primevue/components/dialog/Dialog";
import Calendar from 'primevue/calendar';
import {mapActions} from "vuex";
import {notificationMixin} from "@/mixins/notificationMixin";

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
            this.pushSuccess("Sukces", "Utworzono nowy przedmiot");
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