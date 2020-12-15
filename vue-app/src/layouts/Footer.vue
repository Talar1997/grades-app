<template>
  <footer class="layout-footer">
    <span class="footer-text" style="margin-right: 5px">GradesApp</span>
    <span class="footer-text" style="margin-left: 5px">Created with PrimeVue.</span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  }
}
</script>

<style scoped>
.layout-footer {
  margin-top: 15px;
  text-align: center;
}
</style>