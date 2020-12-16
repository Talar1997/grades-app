<template>
  <div class="table-wrapper">
    <DataTable id="studentsTable" columnResizeMode="expand" dataKey="_id" editMode="row" v-bind:value="students">
      <Column field="name" header="Imie i nazwisko"></Column>
      <Column bodyStyle="text-align:center" headerStyle="width:8rem">
        <template #body="slotProps">
          <Button class="p-button-rounded p-button-primary p-button-text" icon="pi pi-pencil"
                  v-on:click="editStudent(slotProps.data)"
                  v-bind:disabled="!subject.active"/>
          <Button class="p-button-rounded p-button-danger p-button-text" icon="pi pi-trash"
                  v-on:click="confirmActionWithArg($event, slotProps.data, deleteStudent)"
                  v-bind:disabled="!subject.active"/>
        </template>
      </Column>
    </DataTable>
    <ConfirmPopup></ConfirmPopup>

    <EditStudentModal></EditStudentModal>
  </div>
</template>

<script>
import Button from "primevue/components/button/Button";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import {notificationMixin} from "@/mixins/notificationMixin";
import ConfirmPopup from "primevue/components/confirmpopup/ConfirmPopup";
import {mapActions} from "vuex";
import EditStudentModal from "@/components/Subject/Settings/EditStudentModal";

export default {
  name: "StudentsDataTable",

  components: {
    EditStudentModal,
    Button,
    DataTable,
    Column,
    ConfirmPopup,
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
      this.emitter.emit('edit-student-modal', this.studentToUpdate)
    },
  },
}
</script>


<style scoped>
@import "../../../assets/css/tables.css";

h3 {
  text-transform: uppercase;
}


</style>