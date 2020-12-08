<template>
  <main-layout>
    <div>
      {{ this.$router.currentRoute.value.fullPath }}

      <ul>
        <li
            v-for="user in users"
            :key="user._id">
          {{ user._id }}
        </li>
      </ul>
    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";
import {mapState} from "vuex";

export default {
  name: 'Users',
  components: {
    MainLayout
  },
  data() {
    return {

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
