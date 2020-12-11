<template>
  <div>
    <EmptyTab v-if="students.length === 0"
              title="Brak danych!"
              message="Brak studentów przypisanych do przedmiotu. Dodaj ich w zakładce 'Ustawienia'">
    </EmptyTab>
    <ul v-else>
      <li v-for="student in students"
          :key="student._id">
        {{student.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import EmptyTab from "@/components/Subject/EmptyTab";

export default {
  name: "AbsencesTab",
  components: {
    EmptyTab,
  },
  props: {
    students: {required: true}
  }
}
</script>

<style scoped>

</style>