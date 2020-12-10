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
<!--      FIXME: Błędy ze strony primevue - czekać na update albo robić ticket-->
<!--      <Calendar id="date"
                v-model="subject.date"
                v-bind:inline="true"/>-->
      <InputText type="date" v-model="subject.date" />

      <small class="p-invalid" v-if="submitted && !subject.date">Data jest wymagana</small>
    </div>
    <div class="p-field">
      <label for="name">Godzina zajęć</label>
      <!--      FIXME: Błędy ze strony primevue - czekać na update albo robić ticket-->
      <!--      <Calendar id="time"
                      v-model="subject.hours"
                      v-bind:showTime="true"
                      v-bind:timeOnly="true"
                      v-bind:inline="true"/>-->
      <InputText type="time" v-model="subject.hours"/>

      <small class="p-invalid" v-if="submitted && !subject.hours">Godzina jest wymagana</small>
    </div>

    <template #footer>
      <Button label="Anuluj" icon="pi pi-times" class="p-button-text p-button-secondary" @click="hideDialog"/>
      <Button label="Zapisz" icon="pi pi-check" class="p-button" @click="saveSubject"/>
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/components/button/Button";
import InputText from "primevue/components/inputtext/InputText";
import Dialog from "primevue/components/dialog/Dialog";
//import Calendar from 'primevue/calendar';
import {mapActions} from "vuex";
import {useToast} from "vue-toastification";

export default {
  name: "AddSubjectModal",
  components: {
    Dialog,
    InputText,
    Button,
    //Calendar
  },

  setup() {
    const toast = useToast();
    return {toast}
  },

  data() {
    return {
      subjectDialog: false,
      submitted: false,
      subject: {},
    }
  },

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

      //FIXME: tymczasowy fix
      let newDate = new Date(this.subject.date + "T" + this.subject.hours);
      newDate.setHours(newDate.getHours() + 1);
      this.subject.date = newDate;

      this.createNewSubject(this.subject)
          .then(() => {
            this.toast.success("Utworzono nowy przedmiot");
            this.subjectDialog = false;
            this.subject = {};
          })
          .catch(() => {
            this.toast.error("Wystąpił błąd podczas tworzenia nowego przedmiotu");
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