<template>
  <main-layout>
    <div style="background-color: #50a3a2; height: 95vh">
      test
    </div>
  </main-layout>
</template>

<script>


import MainLayout from "@/layouts/Main";

export default {
  name: 'SubjectDashboard',
  components: {
    MainLayout
  },
  data() {
    return {
      students: null
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
          .then(() => {
            this.$router.push('login');
          })
    }
  },
}
</script>

<style>

</style>
