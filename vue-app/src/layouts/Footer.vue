<template>
  <footer id="globalFooter">
    Copyright © GradesApp 2020 - {{ currentYear }}
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data(){
    return{
      currentYear: new Date().getFullYear(),
    }
  }
}
</script>

<style scoped>

</style>