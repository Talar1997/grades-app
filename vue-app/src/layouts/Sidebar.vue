<template>
  <div class="sidebar">
    <ul class="sidebar-ul">
      <RouterLinkElement id="dashboard" name="Przedmioty" icon="pi-list"></RouterLinkElement>
      <RouterLinkElement id="students" name="Studenci" icon="pi-users"></RouterLinkElement>
      <RouterLinkElement id="users" name="Użytkownicy" icon="pi-sitemap"></RouterLinkElement>
      <RouterLinkElement id="test" name="Panel testowy" icon="pi-palette"></RouterLinkElement>
      <RouterLinkElement v-on:click="logout" id="login" name="Wyloguj" icon="pi-arrow-circle-left"></RouterLinkElement>
    </ul>
  </div>
</template>

<script>
import RouterLinkElement from "@/components/Sidebar/RouterLinkElement";
export default {
  name: "Sidebar",
  components: {RouterLinkElement},

  data() {
    return {}
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

<style scoped>
.sidebar {
  height: 100vh;
  background-color: rgb(250, 250, 250);
  margin: 0 !important;
  padding: 0 !important;
}

.sidebar-ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
  height: 100%;
  overflow: auto;
}


</style>