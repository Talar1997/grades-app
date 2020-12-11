<template>
  <main-layout>
    <div class="page-header">
      <h1 class="page-header-h">Użytkownicy</h1>
    </div>
    <div class=" p-grid">
      <div class="p-col-12 page-content p-shadow-2">
        <UsersTable v-bind:users="users"></UsersTable>
      </div>

      <div class="p-col-12 page-content p-shadow-2" style="overflow: auto; ">
        <UsersOrganizationChart
            v-bind:subjects="subjects"
            v-bind:users="users">
        </UsersOrganizationChart>
      </div>

    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";
import {mapActions, mapState} from "vuex";
import UsersTable from "@/components/Users/UsersTable";
import UsersOrganizationChart from "@/components/Users/UsersOrganizationChart";

export default {
  name: 'Users',
  components: {
    UsersOrganizationChart,
    UsersTable,
    MainLayout,
  },

  computed: {
    ...mapState({
      users: state => state.users.all,
      subjects: state => state.subjects.all,
    }),
  },

  methods: {
    ...mapActions('users', [
      'getAllUsers'
    ]),

    ...mapActions('subjects', [
      'getAllSubjects'
    ]),
  },

  created() {
    this.getAllUsers()
    this.getAllSubjects()
  },
}
</script>

<style scoped>
</style>
