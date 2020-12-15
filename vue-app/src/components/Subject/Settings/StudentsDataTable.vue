<template>
  <div class="table-wrapper">
    <DataTable v-bind:value="students" editMode="row" dataKey="_id" id="studentsTable" columnResizeMode="expand">
      <Column field="name" header="Imie i nazwisko"></Column>
      <Column headerStyle="width:8rem" bodyStyle="text-align:center">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-primary p-button-text"
                  v-on:click="editStudent(slotProps.data)"/>
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                  v-on:click="confirmActionWithArg($event, slotProps.data, deleteStudent)"/>
        </template>
      </Column>
    </DataTable>
    <ConfirmPopup></ConfirmPopup>

<!--    TODO: przenieść do osobnego komponentu-->
    <Dialog v-model:visible="studentEditDialog"
            v-bind:style="{width: '450px'}"
            header="Edytuj dane"
            v-bind:modal="true" class="p-fluid">
      <div class="p-field">
        <label for="name">Nazwa</label>
        <InputText id="name" v-model="studentToUpdate.name" required="true" autofocus/>
        <small class="p-invalid" v-if="submitted && !studentToUpdate.name">Nazwa przedmiotu jest wymagana</small>
      </div>
      <template #footer>
        <Button label="Anuluj" icon="pi pi-times" class="p-button-text p-button-secondary" v-on:click="hideDialog"/>
        <Button label="Zapisz" icon="pi pi-check" class="p-button" v-on:click="updateStudent"/>
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