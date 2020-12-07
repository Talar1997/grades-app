<template>
  <div class="p-grid p-ai-stretch vertical-container">
    <div class="p-col-2 no-margin no-padding">
      <div class="box box-stretched">
        <Sidebar></Sidebar>
      </div>
    </div>
    <div class="p-col-10">
      <div class="box box-stretched">
        <slot></slot>
      </div>
      <AppFooter></AppFooter>
    </div>
  </div>
</template>

<script>
import AppFooter from './Footer.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar,
    AppFooter
  }
}
</script>

<style scoped>
  .no-margin {
    margin: 0 !important;
  }
  .no-padding{
    padding: 0 !important;
  }


</style>
