<template>
  <router-view/>
  <Toast position="bottom-right"></Toast>
</template>

<style>
@import '~primevue/resources/themes/nova-vue/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
@import 'assets/css/global.css';
</style>

<script>
import Toast from "primevue/components/toast/Toast";

export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>

