<template>
  <div class="p-grid p-ai-stretch vertical-container">
    <div class="p-col-2 no-margin no-padding">
      <div class="box box-stretched full-height">
        <Sidebar></Sidebar>
      </div>
    </div>
    <div class="p-col-10 no-padding no-margin">
      <div class="box box-stretched content-wrapper">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script>

import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar,
  }
}
</script>

<style scoped>
@import '../assets/css/global.css';
</style>
