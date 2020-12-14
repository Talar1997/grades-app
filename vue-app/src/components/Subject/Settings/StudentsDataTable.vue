<template>
  <div class="table-wrapper">
    <DataTable v-bind:value="students" editMode="row" dataKey="_id" v-model:editingRows="editingRows"
               v-on:row-edit-init="onRowEditInit" v-on:row-edit-cancel="onRowEditCancel" id="studentsTable"
               columnResizeMode="expand">
      <Column field="name" header="Imie i nazwisko">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.column.props.field]"/>
        </template>
      </Column>
      <Column v-bind:rowEditor="true" headerStyle="width:7rem" bodyStyle="text-align:center"></Column>
      <Column headerStyle="width:5rem" bodyStyle="text-align:center">
        <template #body="slotProps">
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text"
                  v-on:click="confirmDeleteStudent(slotProps.data)"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import InputText from "primevue/components/inputtext/InputText";
import Button from "primevue/components/button/Button";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import {notificationMixin} from "@/mixins/notoficationMixin";

export default {
  name: "StudentsDataTable",

  components: {
    InputText,
    Button,
    DataTable,
    Column
  },

  props: {
    subject: {required: true},
    students: {required: true}
  },

  data() {
    return {
      editingRows: []
    }
  },

  mixins: [
    notificationMixin
  ],

  methods: {
    onRowEditInit(event) {
      // this.originalRows[event.index] = {...this.products3[event.index]};
      console.log(event)
    },

    onRowEditCancel(event) {
      // this.products3[event.index] = this.originalRows[event.index];
      console.log(event)
    },

    confirmDeleteStudent(data) {
      console.log(data)
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