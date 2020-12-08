<template>
  <main-layout>
    <h1>Użytkownicy</h1>
    <div class=" p-grid">
      <div class="p-col-12 page-content p-shadow-2">
        <DataTable v-bind:value="users"
                   v-bind:filters="filters"
                   v-bind:paginator="true"
                   v-bind:rows="10"
                   paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                   v-bind:rowsPerPageOptions="[10,20,50]"
                   currentPageReportTemplate="Wyniki od {first} do {last} z {totalRecords}"
                   class="p-datatable-striped p-datatable-lg">
          <template #header>
            <div class="table-header">
              <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global']" placeholder="Wyszukiwanie globalne"/>
            </span>
            </div>
          </template>
          <Column field="_id" header="ID"></Column>
          <Column field="name" header="Name" v-bind:sortable="true"></Column>
          <Column field="email" header="Email" v-bind:sortable="true"></Column>
          <Column field="role" header="Role" v-bind:sortable="true"></Column>
        </DataTable>
      </div>
    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";
import {mapState} from "vuex";
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import InputText from "primevue/components/inputtext/InputText";

export default {
  name: 'Users',
  components: {
    MainLayout,
    DataTable,
    Column,
    InputText
  },
  data() {
    return {
      filters: {},
    }
  },

  computed: {
    ...mapState({
      users: state => state.users.all
    }),
  },

  created() {
    this.$store.dispatch('users/getAllUsers');
  },


}
</script>

<style>

</style>
