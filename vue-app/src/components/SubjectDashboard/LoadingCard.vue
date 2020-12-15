<template>
  <Card class="grades-card">
    <template #header>
      <div class="header-replace"></div>
    </template>
    <template #title>
      <Skeleton/>
    </template>
    <template #subtitle>
      <Skeleton/>
    </template>
    <template #content>
      <Skeleton/>
    </template>
    <template #footer>
      <Button class="p-button-text p-button-primary float-right" icon="pi pi-arrow-right"/>
      <div class="clear-both"></div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/components/card/Card";
import Button from "primevue/components/button/Button";
import Skeleton from 'primevue/skeleton';

export default {
  name: "LoadingCard",
  components: {
    Card,
    Button,
    Skeleton
  },
}
</script>

<style scoped>
@import "../../assets/css/cards.css";

</style>