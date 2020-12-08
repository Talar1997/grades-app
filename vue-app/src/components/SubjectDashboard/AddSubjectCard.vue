<template>
  <Card class="grades-card-add">
    <template #content>
      <div class="add-wrapper">
        IKONA PLUSA NA ŚRODKU
        ON-CLICK = MODAL
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/components/card/Card";

export default {
  name: "AddSubjectCard",
  components: {
    Card,
  },
}
</script>

<style scoped>
  @import "../../assets/css/cards.css";
</style>