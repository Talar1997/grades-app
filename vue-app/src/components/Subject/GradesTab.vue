<template>
  <div>
    <EmptyTab v-if="students.length === 0"
              title="Brak danych!"
              message="Brak studentów przypisanych do przedmiotu. Dodaj ich w zakładce 'Ustawienia'">
    </EmptyTab>

    <div v-else>
      <DataTable v-bind:value="students" editMode="row" dataKey="_id" id="studentsTable" columnResizeMode="expand">
        <Column field="name" header="Imie i nazwisko" headerStyle="width:15%">
        </Column>
        <Column field="grades" header="Oceny">
          <template #body="slotProps">
          <span v-for="grade in slotProps.data.grades" v-bind:key="grade._id">
            <Tag class="grade-tag" v-bind:severity="countSeverity(grade.severity)"
                 v-on:click="editGrade(slotProps.data, grade)"
                 v-tooltip.top="`${grade.category} (waga: ${grade.severity})`">
              {{ grade.grade }}
            </Tag>
          </span>
          </template>
        </Column>
        <Column header="Średnia" headerStyle="width:8rem">
          <template #body="slotProps">
            <span v-on:dblclick="addGradeModal(slotProps.data)">0</span>
          </template>
        </Column>
        <Column headerStyle="width:4rem" bodyStyle="text-align:center">
          <template #body="slotProps">
            <Button icon="pi pi-plus" class="p-button-rounded p-button-primary p-button-text"
                    v-on:click="addGradeModal(slotProps.data)"/>
          </template>
        </Column>
      </DataTable>
    </div>

    <AddGradeModal></AddGradeModal>
  </div>
</template>

<script>
import EmptyTab from "@/components/Subject/EmptyTab";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import Button from "primevue/components/button/Button";
import Tag from "primevue/components/tag/Tag";
import Tooltip from 'primevue/tooltip';
import {notificationMixin} from "@/mixins/notificationMixin";
import {gradesMixin} from "@/mixins/gradesMixin";
import AddGradeModal from "@/components/Subject/AddGradeModal";

export default {
  name: "GradesTab",

  components: {
    AddGradeModal,
    EmptyTab,
    DataTable,
    Column,
    Button,
    Tag,
  },

  directives: {
    'tooltip': Tooltip
  },

  mixins: [
    notificationMixin,
    gradesMixin
  ],

  data() {
    return {
      gradeAddDialog: false,
      dialogStudent: {},
    }
  },

  props: {
    students: {required: true},
  },

  methods: {
    addGradeModal(student) {
      this.emitter.emit('add-grade-modal', student)
    },

    editGrade(student, grade) {
      console.log(student)
      console.log(grade)
    },
  }
}
</script>

<style scoped>
.grade-tag {
  font-size: 16px;
  height: 25px;
  width: 25px;
  cursor: pointer;
  margin-right: 5px;
}
</style>