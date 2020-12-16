<template>
  <Dialog v-model:visible="studentEditDialog"
          class="p-fluid"
          header="Edytuj dane"
          v-bind:modal="true" v-bind:style="{width: '450px'}">
    <div class="p-field">
      <label for="name">Nazwa</label>
      <InputText id="name" v-model="studentToUpdate.name" autofocus required="true"/>
      <small v-if="submitted && !studentToUpdate.name" class="p-invalid">Nazwa przedmiotu jest wymagana</small>
    </div>
    <template #footer>
      <Button class="p-button-text p-button-secondary"
              icon="pi pi-times" label="Anuluj"
              v-on:click="hideDialog"/>
      <Button class="p-button" icon="pi pi-check" label="Zapisz"
              v-on:click="updateStudent"/>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/components/dialog/Dialog";
import InputText from "primevue/components/inputtext/InputText";
import Button from "primevue/components/button/Button";
import {mapActions} from "vuex";
import {notificationMixin} from "@/mixins/notificationMixin";

export default {
  name: "EditStudentModal",
  components:{
    Dialog,
    InputText,
    Button
  },

  data(){
    return{
      studentToUpdate: {},
      studentEditDialog: false,
      submitted: false,
    }
  },

  mixins: [
    notificationMixin
  ],

  methods:{
    ...mapActions({
      updateOne: 'students/updateOne'
    }),

    hideDialog() {
      this.studentEditDialog = false;
    },

    updateStudent() {
      this.submitted = true
      this.updateOne(this.studentToUpdate)
          .then(() => {
            this.pushSuccess("Sukces", "Pomyślnie edytowano studenta")
            this.studentEditDialog = false
          })
          .catch(() => {
            this.pushError("Błąd", "Coś poszło nie tak")
          })
    }
  },

  mounted() {
    this.emitter.on('edit-student-modal', student => {
      this.studentToUpdate = student
      this.studentEditDialog = true
    })
  }
}
</script>

<style scoped>

</style>