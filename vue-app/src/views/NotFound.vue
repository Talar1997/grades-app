<template>
  <main-layout>
    <EmptyTab message="Zasób o podanym ID nie istnieje." title="Błąd 404"></EmptyTab>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/Main";
import EmptyTab from "@/components/Subject/EmptyTab";

export default {
  name: "NotFound",
  components: {
    MainLayout,
    EmptyTab
  }
}
</script>

<style scoped>

</style>