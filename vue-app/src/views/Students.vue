<template>
  <main-layout>
    <div>
      {{this.$router.currentRoute.value.fullPath}}

      <ul>
        <li
            v-for="student in students"
            :key="student._id">
          {{ student._id }}
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
  methods: {
  },

  computed: {
    ...mapState({
      students: state => state.students.all
    }),
  },

  created() {
    this.$store.dispatch('students/getAllStudents');
  },
}
</script>

<style>

</style>
