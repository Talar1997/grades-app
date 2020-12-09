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
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveSubject"/>
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/components/button/Button";
import InputText from "primevue/components/inputtext/InputText";
import Dialog from "primevue/components/dialog/Dialog";

export default {
  name: "AddSubjectModal",
  components: {
    Dialog,
    InputText,
    Button
  },
  data() {
    return {
      subjectDialog: false,
      submitted: false,
      subject: {},
    }
  },
  methods: {
    hideDialog() {
      this.subjectDialog = false;
      this.submitted = false;
    },

    saveSubject() {
      this.submitted = true;

      //logika tutaj

      //.subjectDialog = false;
      //this.subject = {};
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