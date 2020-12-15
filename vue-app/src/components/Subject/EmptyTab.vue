<template>
  <div class="empty-tab">
    <i class="pi pi-exclamation-triangle empty-tab-icon"></i>
    <h2>{{ title }}</h2>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
export default {
  name: "EmptyTab",
  props: {
    message: {required: true},
    title: {required: true},
  }
}
</script>

<style scoped>
.empty-tab {
  margin: 0 auto;
  width: 450px;
  text-align: center;
  padding: 25px;
  color: rgb(150, 150, 150)
}

.empty-tab h2, .empty-tab h3 {
  color: rgb(150, 150, 150)
}

.empty-tab-icon {
  font-size: 10rem;
}
</style>