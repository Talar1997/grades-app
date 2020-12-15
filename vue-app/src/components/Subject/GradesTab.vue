<template>
  <div>
    <EmptyTab v-if="students.length === 0"
              message="Brak studentów przypisanych do przedmiotu. Dodaj ich w zakładce 'Ustawienia'"
              title="Brak danych!">
    </EmptyTab>

    <div v-else>
      <DataTable id="studentsTable" columnResizeMode="expand" dataKey="_id" editMode="row" v-bind:value="students">
        <Column field="name" header="Imie i nazwisko" headerStyle="width:15%"></Column>

        <Column field="grades" header="Oceny">
          <template #body="slotProps">
          <span v-for="grade in slotProps.data.grades" v-bind:key="grade._id">
              <Tag v-tooltip.top="`${grade.category} (waga: ${grade.severity})`" class="grade-tag pointer"
                   v-bind:severity="countSeverity(grade.severity)"
                   v-on:click="editGradeModal(slotProps.data, grade)">
              {{ grade.grade }}
            </Tag>
          </span>
          </template>
        </Column>

        <Column header="Średnia" headerStyle="width:8rem" bodyStyle="text-align:center">
          <template #body="slotProps">
            <FinalGrade v-bind:student="slotProps.data"></FinalGrade>
          </template>
        </Column>

        <Column bodyStyle="text-align:center" headerStyle="width:4rem">
          <template #body="slotProps">
            <Button class="p-button-rounded p-button-primary p-button-text" icon="pi pi-plus"
                    v-on:click="addGradeModal(slotProps.data)"/>
          </template>
        </Column>

      </DataTable>
    </div>

    <AddGradeModal></AddGradeModal>
    <EditGradeModal></EditGradeModal>
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
import EditGradeModal from "@/components/Subject/EditGradeModal";
import FinalGrade from "@/components/Subject/FinalGrade";

export default {
  name: "GradesTab",

  components: {
    FinalGrade,
    EditGradeModal,
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

    editGradeModal(student, grade) {
      this.emitter.emit('edit-grade-modal', {student, grade})
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/grades.css";
</style>