<template>
  <div class="table-wrapper">
    <DataTable id="studentsTable" columnResizeMode="expand" dataKey="_id" editMode="row" v-bind:value="students">
      <Column field="name" header="Imie i nazwisko"></Column>
      <Column bodyStyle="text-align:center" headerStyle="width:8rem">
        <template #body="slotProps">
          <Button class="p-button-rounded p-button-primary p-button-text" icon="pi pi-pencil"
                  v-on:click="editStudent(slotProps.data)"/>
          <Button class="p-button-rounded p-button-danger p-button-text" icon="pi pi-trash"
                  v-on:click="confirmActionWithArg($event, slotProps.data, deleteStudent)"/>
        </template>
      </Column>
    </DataTable>
    <ConfirmPopup></ConfirmPopup>

    <!--    TODO: przenieść do osobnego komponentu-->
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
        <Button class="p-button-text p-button-secondary" icon="pi pi-times" label="Anuluj" v-on:click="hideDialog"/>
        <Button class="p-button" icon="pi pi-check" label="Zapisz" v-on:click="updateStudent"/>
      </template>
    </Dialog>
  </div>
</template>

<script>
import InputText from "primevue/components/inputtext/InputText";
import Button from "primevue/components/button/Button";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import {notificationMixin} from "@/mixins/notificationMixin";
import ConfirmPopup from "primevue/components/confirmpopup/ConfirmPopup";
import {mapActions} from "vuex";
import Dialog from "primevue/components/dialog/Dialog";

export default {
  name: "StudentsDataTable",

  components: {
    InputText,
    Button,
    DataTable,
    Column,
    ConfirmPopup,
    Dialog
  },

  props: {
    subject: {required: true},
    students: {required: true}
  },

  data() {
    return {
      studentToUpdate: {},
      studentEditDialog: false,
      submitted: false,
    }
  },

  mixins: [
    notificationMixin
  ],

  methods: {
    ...mapActions({
      removeStudent: 'students/removeStudent',
      updateOne: 'students/updateOne'
    }),


    deleteStudent(data) {
      this.removeStudent(data._id)
          .then(() => {
            this.pushSuccess("Sukces", "Pomyślnie usunięto studenta z listy")
          })
          .catch(() => {
            this.pushError("Błąd", "Coś poszło nie tak")
          })
    },

    editStudent(student) {
      this.studentToUpdate._id = student._id;
      this.studentToUpdate.name = student.name;
      this.studentEditDialog = true;
    },

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
}
</script>


<style scoped>
h3 {
  text-transform: uppercase;
}

.p-datatable-wrapper {
  background: white !important;
  border: none !important;

}

.table-wrapper {
  width: 400px
}

</style>