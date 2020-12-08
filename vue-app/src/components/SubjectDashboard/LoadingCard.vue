<template>
  <Card class="grades-card">
    <template #header>
      <div class="header-replace"></div>
    </template>
    <template #title>
      <ProgressBar mode="indeterminate" style="height: .5em"/>
    </template>
    <template #subtitle>
      Loading...
    </template>
    <template #content>
      Loading...
    </template>
    <template #footer>
      <Button icon="pi pi-arrow-right" class="p-button-rounded p-button-secondary"/>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/components/card/Card";
import Button from "primevue/components/button/Button";
import ProgressBar from "primevue/progressbar";

export default {
  name: "LoadingCard",
  components: {
    Card,
    Button,
    ProgressBar
  },
}
</script>

<style scoped>
@import "../../assets/css/cards.css";

</style>