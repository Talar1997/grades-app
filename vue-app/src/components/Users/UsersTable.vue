<template>
  <DataTable class="p-datatable-striped p-datatable-lg"
             currentPageReportTemplate="Wyniki od {first} do {last} z {totalRecords}"
             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             v-bind:filters="filters"
             v-bind:loading="isLoaded()"
             v-bind:paginator="true"
             v-bind:rows="10"
             v-bind:rowsPerPageOptions="[10,20,50]"
             v-bind:value="users">
    <template #header>
      <div class="table-header">
              <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global']" placeholder="Wyszukiwanie globalne"/>
            </span>
      </div>
    </template>
    <Column field="_id" header="ID">
      <template #filter>
        <InputText v-model="filters['_id']" class="p-column-filter width-100" placeholder="Wyszukaj po ID"
                   type="text"/>
      </template>
    </Column>
    <Column field="name" header="Nazwa" v-bind:sortable="true">
      <template #filter>
        <InputText v-model="filters['name']" class="p-column-filter width-100" placeholder="Wyszukaj po nazwie"
                   type="text"/>
      </template>
    </Column>
    <Column field="email" header="Email" v-bind:sortable="true">
      <template #filter>
        <InputText v-model="filters['email']" class="p-column-filter width-100" placeholder="Wyszukaj po adresie email"
                   type="text"/>
      </template>
    </Column>
    <Column field="role" header="Uprawnienia" v-bind:sortable="true">
      <template #filter>
        <InputText v-model="filters['role']" class="p-column-filter width-100" placeholder="Wyszukaj po uprawnieniach"
                   type="text"/>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import InputText from "primevue/components/inputtext/InputText";

export default {
  name: "UsersTable",

  props: {
    users: {required: true}
  },

  components: {
    DataTable,
    Column,
    InputText,
  },

  data() {
    return {
      filters: {},
      tableUsers: [],
    }
  },

  methods: {
    isLoaded() {
      return this.users.length === 0;
    }
  },
}
</script>

<style scoped>
@import '../../assets/css/global.css';
</style>