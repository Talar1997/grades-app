<template>
  <main-layout>
    <EmptyTab title="Błąd 404" message="Zasób o podanym ID nie istnieje."></EmptyTab>
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