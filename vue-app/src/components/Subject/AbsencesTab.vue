<template>
  <div>
    <EmptyTab v-if="students.length === 0"
              message="Brak studentów przypisanych do przedmiotu. Dodaj ich w zakładce 'Ustawienia'"
              title="Brak danych!">
    </EmptyTab>
    <DataTable v-else id="studentsTable" columnResizeMode="expand" dataKey="_id" v-bind:value="students">
      <Column field="name" header="Imie i nazwisko" headerStyle="width:15%"></Column>

      <Column field="absences" header="Absencje">
        <template #body>
          test
        </template>
      </Column>

      <Column bodyStyle="text-align:center" headerStyle="width:4rem">
        <template #body="slotProps">
          <Button class="p-button-rounded p-button-primary p-button-text" icon="pi pi-plus"
                  v-on:click="slotProps"  v-bind:disabled="!isSubjectActive"/>
        </template>
      </Column>
    </DataTable>
    <Button class="p-button-outlined" icon="pi pi-plus" label="Nowe oceny" style="float: right; margin-top: 10px"
            v-on:click="null" v-bind:disabled="!isSubjectActive"/>
    <div class="clear-both"></div>
  </div>
</template>

<script>
import EmptyTab from "@/components/Subject/EmptyTab";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import Button from "primevue/components/button/Button";

export default {
  name: "AbsencesTab",
  components: {
    EmptyTab,
    DataTable,
    Column,
    Button
  },
  props: {
    students: {required: true},
    isSubjectActive: {required: true}
  }
}
</script>

<style scoped>

</style>